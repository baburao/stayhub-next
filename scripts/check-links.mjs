#!/usr/bin/env node
/**
 * Lightweight internal-link checker — zero dependencies (Node 18+ global fetch).
 *
 * Crawls the running app starting from a few seed pages, collects internal links
 * (ignoring external URLs, mailto:, tel:, #anchors and asset files), and fails
 * with exit code 1 if any published internal link returns 404 (or any non-OK,
 * non-redirect status). Redirects are followed, so intentional 308s that resolve
 * to a 200 are treated as healthy.
 *
 * Usage:
 *   BASE_URL=http://localhost:3001 node scripts/check-links.mjs
 *   npm run check:links            (BASE_URL defaults to http://localhost:3001)
 *
 * Requires the app to be running (dev or `next start`) at BASE_URL.
 */

const BASE = (process.env.BASE_URL || "http://localhost:3001").replace(/\/$/, "");
const SEEDS = ["/", "/features", "/integrations", "/solutions", "/pricing", "/about"];
const MAX_PAGES = 400;
const ASSET_RE = /\.(png|jpe?g|webp|svg|gif|ico|mp4|webm|css|js|woff2?|ttf|pdf|xml|txt)$/i;

const isInternal = (href) =>
  href &&
  href.startsWith("/") &&
  !href.startsWith("//") &&
  !href.startsWith("/#") &&
  !ASSET_RE.test(href.split("?")[0]);

const clean = (href) => href.split("#")[0].replace(/\/$/, "") || "/";

async function extractLinks(html) {
  const out = new Set();
  for (const m of html.matchAll(/href=["']([^"']+)["']/g)) {
    const href = m[1];
    if (isInternal(href)) out.add(clean(href));
  }
  return out;
}

async function main() {
  const queue = [...SEEDS.map(clean)];
  const seen = new Set(queue);
  const status = new Map(); // path -> http status
  let visited = 0;

  while (queue.length && visited < MAX_PAGES) {
    const path = queue.shift();
    visited++;
    let res;
    try {
      res = await fetch(BASE + path, { redirect: "follow" });
    } catch (err) {
      status.set(path, `ERR ${err.code || err.message}`);
      continue;
    }
    status.set(path, res.status);
    if (res.ok && (res.headers.get("content-type") || "").includes("text/html")) {
      const links = await extractLinks(await res.text());
      for (const l of links) {
        if (!seen.has(l)) { seen.add(l); queue.push(l); }
      }
    }
  }

  const broken = [...status.entries()].filter(([, s]) => s === 404 || (typeof s === "number" && s >= 400) || String(s).startsWith("ERR"));
  console.log(`Checked ${status.size} internal links at ${BASE}`);
  if (broken.length) {
    console.error(`\n✗ ${broken.length} broken internal link(s):`);
    for (const [p, s] of broken) console.error(`  ${s}  ${p}`);
    process.exit(1);
  }
  console.log("✓ 0 broken internal links");
}

main();
