# StayHub — Session Handoff

**Written:** Jul 31, 2026 · **For:** a fresh Claude session picking this up cold.

> Read order: **this file** → `CLAUDE.md` §13 (State of Play) → the rest of `CLAUDE.md` as
> reference. `CODEX_KT.md` is the same material aimed at Codex.

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

### Google Sheet lead capture is BUILT — see §6

`85ec4b1` is what's deployed to production. Since then: a docs-refresh commit, plus the
**lead-capture implementation** (route handler, `lib/saveLead.ts`, Apps Script, setup guide).
That work is **inert until `LEADS_WEBHOOK_URL` + `LEADS_WEBHOOK_SECRET` are set**, so production
behaviour is unchanged either way.

Confirm for yourself:
```bash
cd /Users/baburao/Desktop/works/Claude/stayhub-next && git status -s && git log --oneline -4
```

> ⚠ **Parallel sessions happen.** Other sessions and the user commit to this repo. **Always
> re-check `git log` + `git status` at session start** — don't assume the tree matches this doc.

---

## 3. What shipped in the last session (Jul 31)

Eight commits, all live. Theme: **every brand logo on the site is now a real logo, correctly sized.**

| Commit | What |
|---|---|
| `cb6e9fb` | Compliance section real logos; bigger automation icons; 3D owner-portal image |
| `90199ed` | ANB wired everywhere + brand colour fix |
| `87e7473` | Cropped dead padding from 8 logo files |
| `460dc06` | Widened the integrations logo tile |
| `e6edcc7` | Detail-page hero + related-card logos |
| `8d78b64` | Header logo enlarged + aspect-ratio hint fixed |
| `0250a27` | Gathern Arabic name + 4 new brand logos |
| `85ec4b1` | Attiude logo in the Features → Channel Manager menu |

### Compliance & security section (homepage)
Flat Lucide line-icons → **real authority marks** on a uniform 80px plate that fits square
app-icons *and* wide wordmarks without distortion: ZATCA, Absher, Ejar, TTLock + Tuya, ANB.
"Arabic-First Platform" deliberately keeps a Lucide glyph — it's a platform property, not a
certification. `COMPLIANCE_LOGOS` in `HomepageClient.tsx` is the single place to add a mark.

### The logo-sizing work (the big one)
The user reported logos "looking very small" three times. Two separate root causes:

1. **The source files were mostly empty space.** `daftra.webp` etc. were wide wordmarks centred
   in a **500×500 square canvas** — actual ink filled only 46–56% of the width and as little as
   **14% of the height**. Cropped 8 files to their true ink bounds (marks untouched, ratios
   preserved, re-encoded webp q88 so total weight stayed flat at ~63.6 KB).
2. **The tile shape was wrong.** A 3.9:1 wordmark in a near-square box is width-capped, so it can
   only ever be ~22px tall. Widened the integrations tile **112×96 → 160×96** (mobile 80×64 →
   112×64). **Width only** — so square/portrait marks (pricelabs, Absher) render byte-identical
   instead of shrinking. Fill range went from 23–73% to 36–73% of tile height.

> **Lesson worth keeping:** "how big is the logo" is **% of the tile filled**, not absolute px.
> Measuring painted px alone led to a wrong "it's fixed" claim. See §8.

### Logo coverage — now complete
- `data/integrations.js`: **24 of 25** entries carry `logo` + `logoAlt` (only `expedia` lacks an asset)
- **Zero `logo: null`** left in `components/`
- **Zero letter-fallback tiles** on `/integrations`
- Detail pages render real logos in both the **hero** and the **related-integrations cards**
  (those cards previously showed a coloured square with the brand's first letter — the logo was
  never even passed through `relatedData`)
- Attiude's coming-soon page had its **own** hardcoded letter-"A" placeholder; now the real logo

### Other
- **Absher** replaced with a new *portrait* mark, and its filename case corrected (see §8 — this
  was a live-breaking bug on Linux)
- **Features → Automation**: SMS gained a real icon (`chat.svg`); Tuya/TTLock moved to
  tight-cropped assets; tiles widened 56×56 → 80×64 (desktop) and 48×48 → 64×56 (mobile)
- **Homepage problem card**: Excel pill → Google Sheets (the fabricated green "X" tile is gone)
- **Owner Portal**: lavender card mat removed, image now on the shared `TiltCard` 3D cursor-tilt
- **Header logo** 36px → 44px (56% → 69% of the 64px bar) + width/height corrected to the SVG's
  true 174:50 ratio
- **Gathern Arabic** `غثرن` → `جاذر إن` across **34 occurrences in 7 files**

---

## 4. Open follow-ups — **waiting on the user**

1. 🔴 **Arabic copy audit — 53 corrections validated, NOT applied.** See §5. Blocked on four
   terminology decisions plus a fresh export of the SITE workbook.
2. 🔴 **`mada` logo** — the compliance card copy names it beside ANB; ANB is wired, mada is not.
3. 🟡 **Expedia logo** — the only integration without an asset.
4. 🟡 **"Attitude" vs "Attiude" spelling.** The supplied logo file reads **ATTITUDE**; the codebase
   says **Attiude** everywhere — slug, display name, the live URL `/integrations/attiude`, and the
   component filename `AttiudeComingSoonClient.tsx`. Looks like a propagated typo. Options given:
   display-name-only (safe), or name + slug + a permanent redirect alongside the 8 in
   `next.config.ts`. **User has not decided.**
5. 🟡 **"NTMP Smart Lock Ready"** (compliance card) — could not verify that programme exists under
   that name, and it now sits above two real brand logos. Wording untouched pending confirmation.
6. 🟢 **Footer logo** carries the same `140×36` aspect-ratio mismatch that was fixed in the header.

---

## 5. Arabic copy audit — state of play

The content writer works in a **template workbook** (`Key (do not edit)` / Section / English /
Arabic (current) / **Arabic (corrected)** / Notes). The `Key` column maps to data paths like
`arFaq[0].a` — **it is what makes the corrections applicable**; 9 of them are un-findable by text
alone (`ثنائية` alone appears 15× across the data files).

**Received:** `StayHub_Arabic_Copy_Audit (1).xlsx` — 26 tabs, 1,132 rows, **53 corrections across
7 tabs** (airbnb 15, booking-com 11, google-vacation-rentals 9, agoda 6, qotoon 6, ejar-ota 5,
aqar 1). **All 53 "Arabic (current)" values matched the code exactly** — zero drift.

**Still needed:** a fresh export of `StayHub_Arabic_Copy_Audit_SITE.xlsx` (36 tabs, 1,219 rows —
homepage, i18n, 14 feature pages, 4 solution pages, 11 static pages). The copy on disk is the
**blank template**, 0 rows filled.

**Buckets:** 25 safe to apply · 25 blocked on terminology · 3 need orthographic fixes first
(`اضافة`→`إضافة`, `الآخرى`→`الأخرى` + missing space before an em-dash, `اردت`→`أردت`).

**The blocker — every terminology swap is partial.** The old term survives in untouched rows on
the same page, so applying as-is puts two words for one concept on 6 of 7 pages:

| Swap | Removed → Introduced | Old term still present |
|---|---|---|
| `تكامل` → `ربط` | 4 → 13 | all 6 tabs |
| `قناة` → `منصة` | 10 → 14 | 5 tabs |
| `قوائم` → `عقارات` | 12 → 11 | 5 tabs |
| `ثنائي الاتجاه` → `متبادل` | 2 → 1 | airbnb |
| `استورد` → `اربط/أضف` | 6 → 9 | **none — clean, safe to apply** |

Recommendations given: **drop** `ثنائي الاتجاه → متبادل` (one edit, contradicts itself, and it's
the standard technical term matching the English). Keep `قائمة` for Airbnb's "8M+" stat regardless
— that figure is *listings*, not properties. Decide the other three **globally**, then sweep
site-wide rather than fixing 7 pages and leaving 18 inconsistent.

Also flagged: `arStats[2].value` → `ربط ثنائي الاتجاه` is 3 words in a `text-3xl md:text-4xl`
big-number slot and will likely wrap.

Note the **Gathern rename already applied** produced 4 prefixed forms for the content team to
sanity-check: `وجاذر إن` ×2, `لجاذر إن`, `بجاذر إن`.

---

## 6. Google Sheet lead capture — ✅ BUILT, awaiting configuration

Everything agreed in the previous session is now implemented and committed. It is **inert until
two env vars are set** — no Sheet, no behaviour change, no risk in shipping it.

**Decision change (Jul 31):** the user is creating the Sheet **himself** rather than waiting on the
client. If the client later wants it in their own Google account, they repeat the setup guide and we
swap two env vars — no code change. That portability is the whole reason the sink is isolated in
`lib/saveLead.ts`.

### What exists

| File | Role |
|---|---|
| `docs/GOOGLE_SHEET_LEAD_CAPTURE.md` | **Start here.** 9-step setup walkthrough + troubleshooting table |
| `scripts/apps-script/Code.gs` | The Apps Script to paste into the Sheet's editor |
| `lib/saveLead.ts` | Server-only sink. Reads env at call time, never throws, 10s timeout |
| `app/api/lead/route.ts` | `POST /api/lead` — validation, honeypot, rate limit, phone normalisation |
| `components/ui/DemoModal.tsx` | Fires the write; `leadIdRef` + `submitDetails` + `handleScheduled` |
| `.env.example` | The two variable names (now un-ignored in `.gitignore`) |

### Design decisions worth not re-litigating

- **The browser never calls Google.** A credential in client JS is public. The route handler is the
  only thing holding the secret.
- **Fire-and-forget** (`keepalive: true`, not awaited). A slow Sheet must never stall the booking.
- **Written at "Choose a time slot", before Calendly loads** — people who give a phone number and
  then abandon are still leads. `status` distinguishes them: `details_submitted` → `slot_booked`,
  flipped on the existing `calendly.event_scheduled` listener.
- **`leadId` is the idempotency key.** Same id updates the row in place; the status flip must not
  create a second row. Apps Script does the upsert under a `LockService` lock.
- **Phone stored as text**, normalised to `+9665XXXXXXXX`. Sheets otherwise eats the leading `0`.
  `getSheet()` reapplies the `@` number format on every call.
- Honeypot is a `company` field positioned off-screen, **not** `display:none` — bots skip that.

### To switch it on

Follow `docs/GOOGLE_SHEET_LEAD_CAPTURE.md`. Roughly: create the Sheet → paste `Code.gs` →
set the `SHARED_SECRET` script property → deploy as a Web App with access **"Anyone"** →
put the URL + secret in `.env.local` → add the same two vars to production and redeploy
(env vars are baked at deploy time, so an existing deployment won't pick them up).

### ⚠ Still open

- **`PricingPageClient.tsx`'s duplicate modal does NOT save leads.** Anyone who books from
  `/pricing` is lost. Folding it into the global modal now has a real cost attached.
- **PDPL:** name + phone is personal data landing on Google's servers outside KSA, and the site
  still has no consent banner. The client should knowingly accept Google as processor.
- The in-process rate limit is **per serverless instance** — a speed bump, not a real defence.
  The shared secret is what actually protects the Sheet.

**Project will move off Vercel to the client's own server after approval.** Audited — **nothing is
Vercel-coupled**: no `@vercel/*`, no edge runtime, no `output: 'export'`; `vercel.json` is just
build commands. Route Handlers work identically under `next start`. At migration: add
`output: 'standalone'`, delete `vercel.json`, move env vars, set `engines.node` (currently unset),
and note the 8 redirects live in `next.config.ts` (i.e. in the Node server, not nginx). Also budget
time for self-hosted `next/image`: `sharp` is present (0.34.5) but glibc Linux may need
memory-allocator tuning, and the optimizer cache needs a **persistent volume**.

---

## 7. House rules — do not violate these

1. **Never push or deploy without an explicit request.** Standing instruction: *"dont push for
   every change… We will push to publish in one shot."* Batch the work.
2. **Deploy is manual.** The Vercel GitHub webhook is broken — pushing does NOT deploy:
   ```bash
   git push origin main && npx vercel deploy --prod --yes
   ```
   Then hard-refresh (`Cmd+Shift+R`).
3. **Every string needs EN *and* AR**, and RTL must work (`isAr` flips layout; directional icons
   get `className={isAr ? 'rotate-180' : ''}`). Arabic is the **default**.
4. **No emoji as icons — ever.** Lucide only.
5. **Mobile changes stay scoped** with `md:`/`lg:` prefixes. Don't disturb desktop.
6. **Every published nav item needs an explicit `href`.** Never reintroduce a blind
   `` `/features/${slug}` `` fallback — that created 24 broken links once already.
7. **Don't invent product content.** No speculative feature pages, no unverified integration or
   compliance claims. If a mapping isn't supported by existing content, hide it and report it.
8. **Never approximate an official logo.** Authority / bank / payment-scheme marks (ZATCA, mada,
   ANB…) must come from the client. A wrong official mark on a compliance section reads as a
   forged credential. Always *look* at a supplied asset before wiring it — one file named
   `Google_Sheets.png` turned out to be a generic green→cyan gradient, not the Sheets logo.
9. **Next.js 16** — APIs differ from older versions; check `node_modules/next/dist/docs/`.

---

## 8. Environment gotchas (these WILL bite you)

| Gotcha | What to do |
|---|---|
| **`next/image` caches optimized output IN MEMORY, keyed by URL** | Changing an image file *without* changing its path serves **stale bytes**. This produced three wrong measurements in one session. Fix: restart the dev server (`pkill -f "next dev"`), and `rm -rf .next/cache/images`. Same applies to Vercel after deploy → always hard-refresh. |
| **macOS is case-insensitive; Vercel/Linux is not** | A logo supplied as `Absher.png` while git tracked `absher.png` would have shipped a **404 for every Absher image** — invisible locally. Fix with `git rm --cached` + `git add` at the correct case, then grep every reference. Verified live by confirming the lowercase path now 404s. |
| **Browser pane is largely broken here** | Scrolling is dead (`window.scrollTo` no-ops), screenshots come back blank/mid-animation, and `whileInView` never fires so sections sit at `opacity: 0`. **Don't trust "opacity 0" as a bug** — verify by comparing against an already-live section as a control. |
| **To actually *see* a component**, build a small harness | Write an HTML file into `public/`, load `localhost:3001/_name.html`, screenshot, then **delete it**. Files outside the project won't load in the pane. |
| **Measuring a logo's rendered size** | `getBoundingClientRect()` on an `<img>` returns the **element box**, not the painted mark under `object-contain`. Compute `fit(natural → box)` manually. And judge by **% of tile filled**, not px. |
| **Scanning deployed JS chunks proves nothing** | Client-rendered menu data lives in chunks the page HTML doesn't list. A scan returned 0 hits for `Attitude.png` — but also 0 for QOTOON/MoT/gathern, which are provably live. Always run a known-good control before believing a negative. |
| **Bash cwd resets** to `…/works/Claude` between calls | Always `cd /Users/baburao/Desktop/works/Claude/stayhub-next && …` |
| **`npm run build` can take 7+ minutes** when cold | Run it backgrounded and poll, or it'll blow a 300s timeout. A stale `.next/lock` blocks the next run — `rm -rf .next/lock`. |
| `noUnusedLocals` is **off** | Dead code won't fail the build — clean up by hand. |
| Multi-lockfile Turbopack warning | Pre-existing, harmless. |

---

## 9. Key file map

```
components/layout/Navbar.tsx        ← mega menu + mobile drawer + FEATURE_NAV (nav source of truth)
  · FEATURE_CATEGORIES_EN/AR        — Features menu; Channel Manager items carry their OWN `logo`
  · INTEGRATIONS (line ~213)        — Integrations mega menu; separate array, keep in sync
components/sections/HomepageClient.tsx           ← ~1500 lines, all 14 homepage sections
  · COMPLIANCE_LOGOS                — compliance-card marks, keyed by item id
  · TiltCard                        — shared 3D cursor-tilt (dashboard + owner portal)
components/sections/IntegrationsPageClient.tsx   ← INTEGRATIONS array = list page source of truth
components/sections/AttiudeComingSoonClient.tsx  ← custom hero, NOT the shared template
components/templates/IntegrationPageTemplate.tsx ← detail pages; hero + related cards
components/ui/DemoModal.tsx         ← 4-step Calendly flow; line 431 = the Sheet hook point
app/integrations/[slug]/page.tsx    ← special-cases `attiude`; builds relatedData
next.config.ts                      ← 8 permanent redirects + images.dangerouslyAllowSVG
data/integrations.js                ← ARRAY of objects (slug: prop); holds arabicH1 + logo
data/integrations.ar.js             ← OBJECT keyed by slug — different shape, easy to trip on
lib/i18n.ts                         ← typed EN/AR strings
public/logos/                       ← brand assets (mixed .svg/.png/.webp, mixed case)
```

**Design tokens:** primary `#25A4E8`, purple `#7C69E8`, navy `#0F172A`, container `max-w-[1400px]`,
easing `[0.22, 1, 0.36, 1]`.

---

## 10. Older backlog (unchanged)

- 🔴 Demo form now saves to a Google Sheet, but **needs env vars to switch on** — see §6.
- 🔴 `PricingPageClient.tsx` has a **duplicate local modal** — should use global `useDemoModal()`.
  It bypasses lead capture entirely, so `/pricing` bookings are lost.
- 🟡 No `sitemap.xml` / `robots.txt` / OG images; no analytics; no cookie banner (Saudi PDPL).
- 🟡 Mobile **Solutions** drawer still shows the old flat list.
- 🟡 **14 hidden nav items** still need stakeholder decisions (incl. **`tawuniya`** — confirm what
  it is before it goes anywhere near the UI). Pricing band still says "14-Day Free Trial / No
  credit card" despite the sales-led CTA.
- 🟢 Unused logos in `public/logos/`: `vrbo.webp`, `elm.webp`, `nic.webp`, `sdaia.webp`.
- 🟢 `public/Stayhub_db.png` and `public/owners-view.png` committed but used nowhere.
- 🟢 `/pricing` route still exists though the user said "we dont have pricing page".

---

## 11. Validation

```bash
npm run build        # also runs the TypeScript check
npm run check:links  # crawls the running app; fails on any internal 404. Must stay at 0.
```

There is **no lint or test script** — don't invent one (`CLAUDE.md` §11 wrongly lists `npm run lint`).
`check:links` needs the dev server on `localhost:3001`. **Currently 0 broken internal links.**
