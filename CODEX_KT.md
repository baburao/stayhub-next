# StayHub — Knowledge Transfer (for Codex)

> Self-contained onboarding doc. Read this fully before editing.
> The deeper reference is `CLAUDE.md` (sections 1–12). This file is the fast KT.

---

## 0. TL;DR — what you must not break

1. **No backend.** Marketing site only. No auth, no DB, no API routes. Don't add server logic unless asked.
2. **Arabic is the DEFAULT language and layout is RTL.** Every text change needs an EN *and* AR version.
3. **No emoji as icons — ever.** Use `lucide-react` only. RTL-flip directional icons.
4. **Mobile changes are scoped with `md:`/`lg:` prefixes.** Never alter desktop while fixing mobile.
5. **Deploy is manual** — pushing does NOT deploy (webhook is broken). See §9.
6. **This is Next.js 16** — App Router, breaking changes vs. older versions. Check `node_modules/next/dist/docs/` if an API surprises you.

---

## 1. Project at a glance

| | |
|---|---|
| What | Bilingual (AR-default / EN) B2B SaaS **marketing website** for a Saudi PMS (Property Management System) |
| Audience | Short-term rental hosts, property managers, hotels, multi-owner operators in Saudi Arabia |
| Purpose | Lead generation via a "Book a Demo" modal |
| Live URL | https://stayhub-next.vercel.app |
| Repo | `git@github.com:baburao/stayhub-next.git`, branch `main` |
| Local | `/Users/baburao/Desktop/works/Claude/stayhub-next`, dev on **http://localhost:3001** |

---

## 2. Stack

- **Next.js 16.2.6** (App Router + Turbopack), **React 19.2.4**, **TypeScript**
- **Tailwind CSS v4** (config via `postcss.config.mjs`, no `tailwind.config.js`)
- **Framer Motion 12** — animations, `AnimatePresence` for modal/accordion/carousel
- **lucide-react** — all icons
- Fonts: **Manrope** (Latin) + **Tajawal** (Arabic), loaded via `next/font/google` in `app/layout.tsx`
- `clsx` for conditional classNames

Run:
```bash
npm install
npm run dev      # http://localhost:3001
npm run build    # production build — run before deploy to catch type errors
```

---

## 3. Folder map (where things live)

```
app/                                 # routes (App Router)
  layout.tsx                         # Navbar + Footer + FloatingCTA + DemoModal + Providers; <main className="pt-16">
  page.tsx                           # homepage → renders HomepageClient
  globals.css                        # Tailwind base + custom utils (dot-grid, gradient-text, container-site)
  features/page.tsx                  # features list
  features/[slug]/page.tsx           # dynamic feature detail (one segment only!)
  integrations/page.tsx              # integrations list (24 items, 7 filter tabs)
  integrations/[slug]/page.tsx       # dynamic integration detail
  solutions/page.tsx + [slug]/       # solutions list + detail
  pricing/page.tsx                   # pricing page (NOTE: not linked from nav — see §6)
  demo/page.tsx                      # auto-opens the demo modal
  login/page.tsx                     # sign-in UI only (no backend)
  about,blog,careers,case-studies,help,updates,docs,privacy,terms,cookies,compliance/page.tsx

components/
  layout/Navbar.tsx                  # 1000 lines — mega menu (desktop) + native mobile nav + drawer
  layout/Footer.tsx                  # links, socials, Ministry-of-Tourism license strip
  sections/HomepageClient.tsx        # 1533 lines — all 14 homepage sections (the big file)
  sections/PricingPageClient.tsx     # ⚠ has its OWN duplicate modal (should use global context)
  sections/FeaturesPageClient.tsx
  sections/IntegrationsPageClient.tsx
  sections/SolutionsPageClient.tsx
  sections/DemoPageClient.tsx        # auto-opens modal via useEffect
  sections/LoginPageClient.tsx
  templates/FeaturePageTemplate.tsx  # reusable detail-page template
  templates/IntegrationPageTemplate.tsx
  templates/SolutionPageTemplate.tsx
  templates/ContentPageTemplate.tsx  # reusable hero + prose + cards + CTA for static pages
  ui/DemoModal.tsx                   # 503 lines — global 4-step Calendly demo flow
  ui/FloatingCTA.tsx                 # sticky WhatsApp + Book Demo
  ui/{Badge,Button,FeatureCard,SectionHeader}.tsx

data/                                # plain .js modules (EN) + .ar.js (Arabic) pairs
  features.js / features.ar.js       # allFeatures[] — drives /features/[slug]
  integrations.js / integrations.ar.js  # 25 integration detail entries
  solutions.js / solutions.ar.js

lib/
  LanguageContext.tsx                # useLanguage() → { lang, setLang, t, isAr }
  DemoModalContext.tsx               # useDemoModal() → { isOpen, openModal, closeModal }
  i18n.ts                            # all typed EN/AR strings

public/
  stayhub-logo.svg, stayhub-logo-white.svg
  logos/   # 18 OTA/integration logos (.webp/.png)
  icons/   # 13 svg icons
  hero_video_1.mp4, hero_2_banner.mp4, hero_video_3.mp4, hero-bg-1.png, hero-banner.png
```

---

## 4. The two contexts you'll use constantly

### Language — `lib/LanguageContext.tsx`
```tsx
const { lang, setLang, t, isAr } = useLanguage();
// lang: 'en' | 'ar'   isAr: boolean   t: typed strings from i18n.ts
```
- **Arabic is default.** First visit = RTL.
- Persisted in `localStorage('stayhub-lang')`. Toggling updates `html.lang` and `html.dir`.
- Two patterns for bilingual text, both fine:
  - Inline: `{isAr ? 'احجز عرضاً' : 'Book Demo'}`
  - Typed: `{t.buttons.bookDemoShort}` (string defined in `lib/i18n.ts` for both locales)
- **RTL rule for directional icons:** `<ArrowRight className={isAr ? 'rotate-180' : ''} />`

### Demo modal — `lib/DemoModalContext.tsx`
```tsx
const { openModal, closeModal, isOpen } = useDemoModal();
```
- One `<DemoModal/>` is mounted in `app/layout.tsx`. Call `openModal()` from anywhere.
- **Context functions are memoized** (`useCallback`/`useMemo`). Do NOT un-memoize — it caused a reopen-loop bug (closing reopened it because `/demo`'s effect re-fired). Keep the memoization.

---

## 5. Bilingual content — how to add/edit

- **A static page or section string** → add the EN+AR pair in `lib/i18n.ts` (it's typed; add to both `en` and `ar` objects), then reference via `t.`.
- **A feature / integration / solution detail page** → edit the matching `data/<thing>.js` (EN) AND `data/<thing>.ar.js` (Arabic). They are parallel arrays keyed by `slug`. Each entry has: `slug, h1/arabicH1, subtitle, badge, color, iconName, painPoints, benefits, workflowSteps, faq, ...`.
- **Icons in data** are stored as a string `iconName` and mapped to a Lucide component at render time via an `iconMap` (see `FeaturesPageClient.tsx`). Add new names to that map.

---

## 6. Navigation model (important gotchas)

- **Desktop:** 4-dropdown mega menu (Features, Solutions, Integrations, Resources) in `Navbar.tsx`.
- **Mobile = native-app feel:**
  - Top bar: only logo + EN/AR switcher (RTL-mirrored).
  - Fixed **bottom sticky nav**: Home · Features · Integrations · **Pricing** · **Menu**. Active tab via `usePathname()`. "Menu" toggles the drawer (icon flips Menu↔X).
  - The **Pricing tab calls `openModal()`** — it does NOT navigate. There is no pricing page in the nav, even though `/pricing` exists as a route.
- **Channel-Manager menu items** use explicit `href` to `/integrations/<slug>` (NOT `/features/channel-manager/<slug>` — that 404s because `[slug]` matches a single segment only). Keep the `href` overrides.
- Because of the fixed bottom nav, Footer has `pb-16 lg:pb-0` and FloatingCTA sits at `bottom-20 lg:bottom-6`. Preserve this clearance.

---

## 7. Design tokens

| Token | Value |
|---|---|
| Primary blue | `#25A4E8` |
| Secondary purple | `#7C69E8` |
| Dark navy | `#0F172A` |
| Light bg | `#EFF8FF` |
| Text secondary | `#64748B` (slate-500) |
| Border | `#E2E8F0` (slate-200) |
| Success | `#10B981` |
| Saudi accent | `#bef264` (lime) |
| Container width | `max-w-[1400px]` |
| Easing | `[0.22, 1, 0.36, 1]` (used everywhere) |
| fadeUp | `initial {opacity:0,y:28} → whileInView {opacity:1,y:0}, viewport once` |

Fonts: Latin → Manrope, Arabic → Tajawal (activated via `html[lang="ar"] *` in `globals.css`).

---

## 8. Known issues / open work (pick from here)

**High**
- Demo form submits nowhere — needs Resend/SendGrid/HubSpot/webhook wiring (`DemoModal.tsx`).
- `PricingPageClient.tsx` has a duplicate local modal — refactor to use global `useDemoModal()`.

**Medium**
- SEO: no `sitemap.xml`, `robots.txt`, or per-page OG images.
- No analytics (GA/Plausible/Mixpanel).
- Mobile Solutions drawer still shows the old flat list, not the 3-column structure.
- No cookie-consent banner (needed for Saudi PDPL).

**Low / cleanup**
- Unused logos in `public/logos/`: `vrbo.webp`, `elm.webp`, `nic.webp`, `sdaia.webp`.
- Navbar logo `<Image>` width-without-height console warning.
- Turbopack multi-lockfile root warning (add `turbopack.root` to `next.config.ts` to silence).

---

## 9. Git & deploy workflow

```bash
# normal change loop
npm run build                       # always build first — catches TS/type errors
git add . && git commit -m "msg"    # trailer optional
git push origin main

# ⚠ pushing does NOT deploy. The Vercel GitHub webhook is broken.
npx vercel deploy --prod --yes      # manual production deploy
# then hard-refresh the live URL (Cmd+Shift+R) to bypass CDN cache
```

- Don't deploy after every change — batch and deploy once.
- Working tree should be clean before you start. Current baseline that is live: commit `a3480fd`.

---

## 10. Conventions checklist (before you commit)

- [ ] Both EN and AR provided for any new/changed text?
- [ ] RTL verified (directional icons flipped, layout mirrors)?
- [ ] No emoji introduced — Lucide icons only?
- [ ] Mobile changes scoped with `md:`/`lg:`, desktop untouched?
- [ ] `npm run build` passes?
- [ ] Bottom-nav clearance preserved on any new full-height/footer-adjacent section?
