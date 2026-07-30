# StayHub — Session Handoff

**Written:** Jul 30, 2026 · **For:** a fresh Claude session picking this up cold.

> Read order: **this file** → `CLAUDE.md` §13 (State of Play) + §6f (recent changes) → the rest of
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

### ✅ Clean slate — everything committed, pushed, and LIVE

`main` is **clean**, in sync with `origin/main`, and `dd87a89` is **deployed to production**
(verified live: `/`, `/pricing`, `/integrations/attiude`, `/features/channel-manager` all 200;
redirects returning 308 → correct destination).

| Commit | What | State |
|---|---|---|
| `dd87a89` | Real channel/automation logos in Features menu, Attiude coming-soon page, homepage polish | LIVE |
| `7d34701` | Footer address, hi-res channel logos, large hero logo layout | LIVE |
| `262fd64` | Prevent hero text/video overlap on ultra-wide screens | LIVE |
| `4ba2f55` | Align Booking.com / Agoda / Google VR / Qotoon integration content | LIVE |

Confirm for yourself:
```bash
cd /Users/baburao/Desktop/works/Claude/stayhub-next && git status -s && git log --oneline -4
```

> ⚠ **Parallel sessions happen.** Commits `7d34701`, `262fd64`, `4ba2f55` came from other
> sessions / the user working in the same repo while a session was open. **Always re-check
> `git log` + `git status` at session start** — don't assume the tree matches what a doc says.

---

## 3. What shipped in the last session (Jul 29–30)

### Navigation 404 cleanup (the big one)
The Features mega-menu derived links with a blind `` `/features/${slug}` `` fallback, but only 14
feature pages exist in `data/features.js` — so **22 menu links 404'd**, in both desktop and mobile
(plus `/contact` and `/signup` on the pricing page = 24 total). Fixed by making every destination
explicit:

- New **`FEATURE_NAV`** map + **`resolveFeatureHref()`** + **`visibleFeatureCats`** in `Navbar.tsx`
  — the single source of truth for desktop **and** mobile. No blind slug fallback remains.
- 4 feature→feature remaps (channel-management→channel-manager, unified-calendar→
  availability-calendar, website-builder→direct-booking-website, pay-link→payment-collection) and
  4 feature→integration remaps (ttlock / tuya / whatsapp-sms / sms-notifications).
- **14 unresolved items hidden** pending stakeholder confirmation (see §5). The whole **CRM
  category** is now empty and no longer renders in either menu.
- **8 permanent redirects** added in `next.config.ts` for the old, possibly-indexed URLs.
- Pricing CTAs: `/contact` → `/demo` ("Talk to sales" / "تحدث مع فريق المبيعات"), `/signup` →
  `/demo` ("Book a tailored demo" / "احجز عرضاً مخصصاً"). **No** `/contact` or `/signup` route was
  created, and `/signup` was deliberately *not* redirected to `/login`.
- Homepage integrations grid: removed the stray **Vrbo** card (no page), fixed the
  **`qoyod` → `quyood`** slug typo.
- **Result: 0 clickable internal 404 links** (verified by crawler — see §7).

### Attiude coming-soon page
Attiude isn't a live channel, so `/integrations/attiude` no longer renders the "connect today"
template. New `components/sections/AttiudeComingSoonClient.tsx` (bilingual, matches the integration
template's design language) with: hero + waitlist email capture, status bar, "what the integration
will include", "why join the waitlist", CTA, live-integration cards, FAQ + JSON-LD. Wired via a
`slug === 'attiude'` special-case in `app/integrations/[slug]/page.tsx` plus its own coming-soon
metadata. No fake stats, no `[PENDING]` placeholders, no demo CTA.

### Brand logos
Real logos now render in the Features menu — Channel Manager (AQAR, Ejar, Airbnb, Booking.com,
Agoda, Google VR, Qotoon) and Automation (WhatsApp, Tuya, TTLock) — on enlarged white tiles,
desktop + mobile, with a Lucide fallback for items without an asset (Attiude, SMS). The homepage
"5+ apps" pills use real Airbnb / Booking.com / WhatsApp marks.

### Other homepage work
Hero left-text no longer overlaps the video panel on wide screens (video's inner edge pinned to the
centered container, `lg:` only, RTL-mirrored). `owner_DB.png` wired into the Owner Portal section.
Features **mobile drawer** rebuilt as collapsible category groups mirroring the desktop mega-menu.

---

## 4. Open follow-ups — **waiting on the user**

1. 🔴 **Square channel app-icons.** The channel logos we have are *wide wordmarks* (Booking.com is
   6:1, Airbnb 3.2:1) — in square tiles they read small no matter how big the tile is. The user
   said **they will provide square app-icon files**. Drop into `public/logos/` (suggested:
   `airbnb-icon.svg`, `booking-icon.svg`, `agoda-icon.svg`, `aqar-icon.svg`, `ejar-icon.svg`,
   `qotoon-icon.svg`; SVG preferred, 1:1). Then wire them in **bigger** at: Features → Channel
   Manager (desktop + mobile), the homepage "5+ apps" pills, and optionally the integration heroes.
   WhatsApp / Google VR / Tuya / TTLock are already square — leave them.
2. 🟡 **SMS icon.** No VFirst/SMS asset exists anywhere; SMS still uses a Lucide fallback. User
   hasn't decided: supply a logo, use a styled Lucide glyph, or leave it.
3. 🟡 **Attiude waitlist has no backend.** The form captures client-side and shows a success state.
   On launch it must be wired to a real endpoint with leads tagged **"Attiude waitlist"** in the
   CRM. A code comment marks the spot.
4. 🟡 **Attiude launch-day task.** When the channel goes live, replace the coming-soon page with the
   standard integration template (use Qotoon as the model) and email the waitlist.
5. 🟢 `public/Stayhub_db.png` and `public/owners-view.png` are committed but **used nowhere**. Ask
   before wiring in or deleting.

---

## 5. Stakeholder decisions still required (14 hidden nav items)

These were removed from the Features menu because they have no destination. Each needs: is it a
real capability, what category, and should a page be authored (then add to `data/features.js` +
`.ar.js` and un-hide in `FEATURE_NAV`) or mapped to an existing integration?

`campaigns` · `coupons-discounts` · `e-sign-contracts` · `expenses-model` · `extras-upsells` ·
`guest-journey` · `guest-profiles` · `payout` · `security-deposit` · `segmentation` ·
`task-management` · **`tawuniya`** · `unified-inbox` · `vat-model`

⚠ **Tawuniya** is the sensitive one — confirm whether it's an integration, an insurance workflow, a
partner, or a planned capability before it goes anywhere near the UI.

Minor copy note: the pricing bottom band still reads "Start Your 14-Day Free Trial / No credit card
required," which implies self-service that doesn't exist now that the CTA is sales-led.

---

## 6. House rules — do not violate these

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
6. **Every published nav item needs an explicit `href`.** Never reintroduce a blind
   `` `/features/${slug}` `` fallback — that is exactly what created the 24 broken links.
7. **Don't invent product content.** No speculative feature pages, no unverified integration or
   compliance claims. If a mapping isn't supported by existing content, hide it and report it.
8. **Next.js 16** — APIs differ from older versions; check `node_modules/next/dist/docs/` if
   something surprises you.

---

## 7. Validation — how to check your work

```bash
npm run build        # also runs the TypeScript check (no lint/test scripts exist — don't invent any)
npm run check:links  # crawls the running app; fails on any internal 404. Must stay at 0.
```

`scripts/check-links.mjs` is a zero-dependency crawler (Node global `fetch`) added last session. It
needs the dev server running at `localhost:3001`. **Current state: 0 broken internal links — keep
it there.** It caught two 404s that manual review missed, so run it after any nav/link change.

---

## 8. Environment gotchas (these will bite you)

| Gotcha | What to do |
|---|---|
| **Bash cwd resets** to `…/works/Claude` between calls | Always `cd /Users/baburao/Desktop/works/Claude/stayhub-next && …`, else `npm error ENOENT … package.json` |
| **Dev servers die / go stale between turns** | Symptom: assets 404 while `/` still returns 200. Fix: `pkill -f "next dev"; lsof -ti:3001 \| xargs kill -9`, then restart. **Always restart after editing `next.config.ts`** or redirects won't load. |
| **Browser-pane screenshots are unreliable here** | Blank or mid-animation captures are common (fadeUp + `whileInView`). Verify via `javascript_tool` DOM reads instead — check `img.complete && naturalWidth>0`, computed styles, rendered `href`s. Screenshot only once the element has settled. |
| Synthetic hover/click on the desktop mega-menu is flaky | The panel closes or won't switch category under scripted events. The **mobile drawer** renders items inline and is the more reliable DOM to assert against. |
| `noUnusedLocals` is **off** (only `strict: true`) | Dead code won't fail the build — clean up by hand. |
| Multi-lockfile Turbopack warning; `next/image` logo aspect-ratio warning | Pre-existing, harmless. The logo warning is what shows as the dev overlay's "1 Issue" badge. |
| `package-lock.json` shows a spurious diff | npm reordering the optional `@next/swc-win32-x64-msvc` entry. Harmless — leave it. |

---

## 9. Key file map (the short version)

```
components/layout/Navbar.tsx        ← mega menu + mobile drawer + FEATURE_NAV (nav source of truth)
  · FEATURE_NAV / resolveFeatureHref() — explicit destinations; `hidden: true` removes an item
  · visibleFeatureCats                — drops hidden items, then drops emptied categories
components/sections/HomepageClient.tsx           ← ~1500 lines, all 14 homepage sections
components/sections/AttiudeComingSoonClient.tsx  ← coming-soon + waitlist (Attiude only)
components/sections/PricingPageClient.tsx        ← ⚠ still has its OWN duplicate demo modal
components/templates/IntegrationPageTemplate.tsx ← standard integration page (the design reference)
app/integrations/[slug]/page.tsx    ← special-cases `attiude`, else renders the template
next.config.ts                      ← 8 permanent redirects
scripts/check-links.mjs             ← internal-link crawler (`npm run check:links`)
lib/LanguageContext.tsx             ← useLanguage() → { lang, setLang, t, isAr }
lib/DemoModalContext.tsx            ← useDemoModal() → { isOpen, openModal, closeModal } (memoized — keep it)
lib/i18n.ts                         ← typed EN/AR strings
data/*.js + *.ar.js                 ← features (14) / integrations (25) / solutions (4), EN+AR pairs
public/                             ← images served from root: public/foo.png → /foo.png
```

**Design tokens:** primary `#25A4E8`, purple `#7C69E8`, navy `#0F172A`, container `max-w-[1400px]`,
easing `[0.22, 1, 0.36, 1]`. Attiude teal `#00897B`.

---

## 10. Older backlog (unchanged)

- 🔴 Demo form submits **nowhere** — needs Resend/SendGrid/HubSpot/webhook.
- 🔴 `PricingPageClient.tsx` has a **duplicate local modal** — should use global `useDemoModal()`.
- 🟡 No `sitemap.xml` / `robots.txt` / OG images; no analytics; no cookie banner (Saudi PDPL).
- 🟡 Mobile **Solutions** drawer still shows the old flat list (Features was fixed last session;
  Solutions was not).
- 🟢 Unused logos in `public/logos/`: `vrbo.webp`, `elm.webp`, `nic.webp`, `sdaia.webp`.
- 🟢 `/pricing` route still exists though the user said "we dont have pricing page" (mobile nav's
  Pricing tab opens the demo modal instead).
