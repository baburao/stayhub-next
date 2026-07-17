# StayHub — Session Handoff

**Written:** Jul 3, 2026 · **For:** a fresh Claude session picking this up cold.

> Read order: **this file** → `CLAUDE.md` §13 (State of Play) + §6f (what changed) → the rest of
> `CLAUDE.md` as reference. `CODEX_KT.md` is the same material aimed at Codex.

---

## 1. Thirty-second orientation

**StayHub** = bilingual (Arabic-default, RTL) **B2B SaaS marketing site** for a Saudi Property
Management System. Next.js 16.2.6 App Router + TS + Tailwind v4 + Framer Motion + Lucide.
**No backend, no auth, no DB** — it's a lead-gen site; the goal is the "Book a Demo" modal.

- Repo: `git@github.com:baburao/stayhub-next.git`, branch `main`
- Local: `/Users/baburao/Desktop/works/Claude/stayhub-next`
- Dev: `cd` in, then `PORT=3001 npm run dev` → http://localhost:3001
- Live: https://stayhub-next.vercel.app

---

## 2. Where things stand RIGHT NOW

### ✅ Clean slate — nothing pending

`main` is **clean**, in sync with `origin/main`, and the latest commit is **deployed to
production**. There is no uncommitted work, no untracked file, nothing awaiting review.

| Commit | What | State |
|---|---|---|
| `<HEAD>` | "Everything at a glance" light redesign + WebP image + docs | LIVE |
| `c23fdb2` | Problem cards: 3D cursor-tilt, parallax, micro-animations | LIVE |
| `2c770ed` | Problem section redesigned as a polished bento | LIVE |
| `1921c9b` | Codex KT doc + AGENTS.md pointer | LIVE |

Start by confirming for yourself:
```bash
cd /Users/baburao/Desktop/works/Claude/stayhub-next && git status -s && git log --oneline -4
```

---

## 3. What changed in the last session (detail in `CLAUDE.md` §6f)

All in `components/sections/HomepageClient.tsx` — **all of it is live**.

1. **Problem section → bento redesign.** 12-col bento; each of the 6 pain-point cards got a
   pure-markup illustration (brand-pill stack, mini calendar + warning, chat bubbles, phone with
   call-waves, ZATCA invoice, occupancy chart); purple gradient promo card with Sparkles.
2. **3D interactivity.** New reusable **`TiltCard`** component — cursor-tracking tilt with spring
   physics, hover lift + purple glow, `translateZ` depth layers, plus always-on micro-animations
   (pulsing badge, bouncing typing dots, rippling call-waves, self-drawing chart line).
3. **"Everything at a glance" rewrite.** Flipped dark → light to match a reference; bullets became
   icon tiles (`Calendar`/`RefreshCw`/`BarChart2`/`Mail`); **deleted ~180 lines** of the old tabbed
   mock dashboard and its constants; right side is now the `Stayhub_calendar.webp` screenshot
   inside a `TiltCard`.
4. **Image optimised.** The supplied 118 KB PNG → **64 KB lossless WebP** (46% smaller,
   pixel-perfect). Lossy was rejected: `-q 90` saved only 2% and risked artifacts on the
   dashboard's small text. **The `.png` was deleted — the WebP is the only copy.**

---

## 4. House rules — do not violate these

1. **Never push or deploy without an explicit request.** Standing instruction from the user:
   *"dont push for every change… We will push to publish in one shot."* Batch the work.
2. **Deploy is manual.** The Vercel GitHub webhook is broken — pushing does NOT deploy:
   ```bash
   git push origin main && npx vercel deploy --prod --yes
   ```
   Then hard-refresh (`Cmd+Shift+R`) to beat the CDN cache.
3. **Every string needs EN *and* AR**, and RTL must work (`isAr` flips layout; directional icons
   get `className={isAr ? 'rotate-180' : ''}`). Arabic is the **default**.
4. **No emoji as icons — ever.** Lucide only.
5. **Mobile changes stay scoped** with `md:`/`lg:` prefixes. Don't disturb desktop.
6. **Next.js 16** — APIs differ from older versions; check `node_modules/next/dist/docs/` if
   something surprises you.

---

## 5. Environment gotchas (these will bite you)

| Gotcha | What to do |
|---|---|
| **Preview MCP is broken** — `preview_start` → `spawn …/Helpers/disclaimer ENOENT` | No screenshots available. Verify with `npm run build` + `curl -o /dev/null -w "%{http_code}" http://localhost:3001/`. Tell the user to look rather than claiming you saw it. |
| **Bash cwd resets** to `…/works/Claude` between calls | Always `cd /Users/baburao/Desktop/works/Claude/stayhub-next && …`, else `npm error ENOENT … package.json` |
| **Background dev server gets killed** between turns | Just restart `PORT=3001 npm run dev` |
| Multi-lockfile Turbopack warning; `next/image` width/height warnings | Pre-existing, harmless, ignore |
| `noUnusedLocals` is **off** (only `strict: true`) | Dead code won't fail the build — clean up by hand |

---

## 6. Suggested next steps

**Ask the user first** — open, not agreed:
- Where should `public/Stayhub_db.png` go? It's committed but used nowhere.
- Remove the unused `/pricing` route? (they said "we dont have pricing page", but the route and
  `PricingPageClient.tsx` still exist)

**Known backlog** (from `CLAUDE.md` §7–8, unchanged this session):
- 🔴 Demo form submits **nowhere** — needs Resend/SendGrid/HubSpot/webhook.
- 🔴 `PricingPageClient.tsx` has a **duplicate local modal** — should use global `useDemoModal()`.
- 🟡 No `sitemap.xml` / `robots.txt` / OG images; no analytics; no cookie banner (Saudi PDPL).
- 🟡 Mobile Solutions drawer still shows the old flat list, not the 3-column structure.
- 🟢 Unused logos in `public/logos/`: `vrbo.webp`, `elm.webp`, `nic.webp`, `sdaia.webp`.
- 🟢 `/pricing` route still exists though the user said "we dont have pricing page" (mobile nav's
  Pricing tab opens the demo modal instead).

---

## 7. Key file map (the short version)

```
components/sections/HomepageClient.tsx  ← ~1500 lines, all 14 homepage sections. Most work lands here.
  · TiltCard              — reusable 3D tilt wrapper (near FaqItem)
  · DashboardShowcase     — "Everything at a glance" (rewritten, uncommitted)
  · section 3             — problem bento (redesigned, live)
components/layout/Navbar.tsx    — mega menu + mobile bottom nav
components/ui/DemoModal.tsx     — 4-step Calendly demo flow
lib/LanguageContext.tsx         — useLanguage() → { lang, setLang, t, isAr }
lib/DemoModalContext.tsx        — useDemoModal() → { isOpen, openModal, closeModal }  (memoized — keep it)
lib/i18n.ts                     — typed EN/AR strings
data/*.js + *.ar.js             — features (14) / integrations (25) / solutions (4), EN+AR pairs
public/                         — images served from root: public/foo.png → /foo.png
```

**Design tokens:** primary `#25A4E8`, purple `#7C69E8`, navy `#0F172A`, container `max-w-[1400px]`,
easing `[0.22, 1, 0.36, 1]`.
