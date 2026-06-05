@AGENTS.md

# StayHub — Project Knowledge Base

---

## 1. Project Overview

**StayHub** is a bilingual (Arabic/English) B2B SaaS marketing website for a Saudi Arabia–focused
Property Management System (PMS). It targets short-term rental hosts, property managers, hotels,
and multi-owner operators in the Saudi market.

- **Live URL:** https://stayhub-next.vercel.app
- **Production domain (future):** https://www.stayhub.sa
- **Local dev:** http://localhost:3001 — always use this, NOT the network IP
- **Default language:** Arabic (AR) — RTL layout. User can toggle EN ↔ AR.

The site is a **marketing/landing site only** — no auth, no backend, no database. All content is
static/client-side. The goal is lead generation via a "Book a Free Demo" modal.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Manrope (Latin) + **Tajawal** (Arabic) via next/font/google |
| Images | next/image (WebP logos, SVG icons) |
| Deployment | Vercel (auto-deploy on push to main) |
| Package manager | npm |

**Key dependencies:**
- `framer-motion` — page/section animations, AnimatePresence for modal + accordion
- `clsx` — conditional classnames in Navbar
- `lucide-react` — all iconography

---

## 3. Folder Structure

```
stayhub-next/
├── app/
│   ├── layout.tsx                  → Root layout (Navbar, Footer, FloatingCTA, DemoModal, Providers)
│   ├── page.tsx                    → Homepage → renders HomepageClient
│   ├── globals.css                 → Tailwind base + custom styles (dot-grid, gradient-text, container-site)
│   ├── pricing/page.tsx            → Pricing page
│   ├── features/
│   │   ├── page.tsx                → Features list page
│   │   └── [slug]/page.tsx         → Dynamic feature detail page
│   ├── integrations/
│   │   ├── page.tsx                → Integrations list page
│   │   └── [slug]/page.tsx         → Dynamic integration detail page
│   └── solutions/
│       ├── page.tsx                → Solutions list page
│       └── [slug]/page.tsx         → Dynamic solution detail page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              → Fixed top navbar with 4-item mega menu + mobile drawer
│   │   └── Footer.tsx              → Site footer with links, socials, logo
│   ├── sections/
│   │   ├── HomepageClient.tsx      → All 14 homepage sections (1444 lines)
│   │   ├── PricingPageClient.tsx   → Pricing tiers + FAQ + CTA
│   │   ├── FeaturesPageClient.tsx  → Features grid list page
│   │   ├── IntegrationsPageClient.tsx → Integrations list page (rebuilt — see section 5)
│   │   └── SolutionsPageClient.tsx → Solutions list page
│   ├── templates/
│   │   ├── FeaturePageTemplate.tsx → Reusable template for /features/[slug]
│   │   ├── IntegrationPageTemplate.tsx → Reusable template for /integrations/[slug]
│   │   └── SolutionPageTemplate.tsx → Reusable template for /solutions/[slug]
│   └── ui/
│       ├── DemoModal.tsx           → Global 3-step demo modal (Email → Details → Success)
│       ├── FloatingCTA.tsx         → Sticky floating CTA button
│       ├── Badge.tsx               → Reusable badge component
│       ├── Button.tsx              → Reusable button component
│       ├── FeatureCard.tsx         → Feature card component
│       └── SectionHeader.tsx       → Reusable section header
│
├── data/
│   ├── features.js                 → All feature data (EN) — drives [slug] pages
│   ├── features.ar.js              → Arabic translations for features
│   ├── integrations.js             → Integration detail data for [slug] pages (6 OTAs with full content)
│   ├── integrations.ar.js          → Arabic translations for integrations
│   ├── solutions.js                → All solution data (EN)
│   └── solutions.ar.js             → Arabic translations for solutions
│
├── lib/
│   ├── LanguageContext.tsx         → EN/AR context: lang, setLang, t, isAr
│   ├── DemoModalContext.tsx        → Global modal state: isOpen, openModal, closeModal
│   └── i18n.ts                     → Full EN + AR translation strings (typed)
│
└── public/
    ├── stayhub-logo.svg            → Primary logo (dark)
    ├── stayhub-logo-white.svg      → White logo for dark backgrounds
    ├── logos/                      → OTA & integration logos (.webp, .png)
    └── icons/                      → SVG icons (WhatsApp, step indicators, check, etc.)
```

---

## 4. Architecture Notes

### Language System
- Default language is **Arabic (AR)** — RTL on first visit
- Persisted in `localStorage` as `stayhub-lang`
- `html.lang` and `html.dir` updated dynamically on toggle
- `useLanguage()` hook exposes: `lang`, `setLang`, `t` (typed translations), `isAr` (boolean)
- All bilingual strings use `isAr ? arabicString : englishString` pattern inline in components

### Arabic Font — Tajawal
- Font changed from Noto Kufi Arabic → **Tajawal** in `app/layout.tsx`
- Weights loaded: 200, 300, 400, 500, 700, 800, 900
- CSS variable: `--font-arabic`
- Activates via `html[lang="ar"] *` selector in `globals.css`

### Container Width
- All page containers use `max-w-[1400px]` (previously `max-w-7xl` = 1280px)
- A `.container-site` utility class is also defined in `globals.css` for future use
- To change site-wide width: update `max-w-[1400px]` values OR the `.container-site` class

### Demo Modal
- Global state in `DemoModalContext` — `openModal()` can be called from anywhere
- `DemoModal.tsx` renders once in `app/layout.tsx`
- 3 steps: Step 1 (Email) → Step 2 (Name + Phone + Properties) → Step 3 (Success screen)
- **⚠ Duplicate:** `PricingPageClient.tsx` has its own local copy of the modal — should be
  refactored to use the global `DemoModal` + context

### Hydration Fix
- `<body>` has `suppressHydrationWarning` in `app/layout.tsx`
- Reason: Grammarly browser extension injects `data-gr-*` attributes causing server/client mismatch

### Navbar Mega Menu — Structure
- 4 dropdowns: Features, Solutions, Integrations, Resources
- All panels are: Left column | Divider | Center (items) | Divider | Right (Promo card)
- Hover activates; animated with `AnimatePresence`
- Mobile: full-screen drawer with accordion, slides in from right (EN) or left (AR)

#### Solutions mega menu (redesigned — Guesty-style 3-column)
| Column 1 — By Portfolio Size | Column 2 — By Need | Column 3 — By Property Type |
|---|---|---|
| Independent Host (1–7) | New to PMS | Vacation Rentals |
| Property Manager (8–50) | Switching Platforms | Serviced Apartments |
| Multi-Owner Operator | Managing for Owners | Villas & Luxury Homes |
| Enterprise (50+) | Growing Direct Bookings | Hotels & Boutique |

#### Integrations mega menu
- Left: 7 category tabs (OTA, Government, Dynamic Pricing, Smart Home, Accounting, Bank, Communication)
- Center: **3-column grid** (changed from 2-column) of filtered integration items
- Right: Promo card

### Data Files
- `data/features.js` exports `allFeatures` array — each item has slug, h1, arabicH1, subtitle,
  badge, color, iconName, painPoints, benefits, workflowSteps, relatedFeatures, faq
- `data/integrations.js` has **full content** for 6 OTAs only (Airbnb, Booking.com, Agoda, Expedia,
  Google VR, Gathern) — these drive the `/integrations/[slug]` detail pages
- The `/integrations` list page uses its own `INTEGRATIONS` array defined inline in
  `IntegrationsPageClient.tsx` — this is the complete list of all 24 integrations

---

## 5. What's Been Built

### ✅ Completed Pages
| Page | Status | Notes |
|---|---|---|
| `/` Homepage | ✅ Done | 14 sections, fully bilingual |
| `/pricing` | ✅ Done | 3 tiers (Starter/Growth/Enterprise), FAQ, CTA |
| `/features` | ✅ Done | Grid list of all features |
| `/features/[slug]` | ✅ Done | Template-driven detail pages |
| `/integrations` | ✅ Rebuilt | All 24 integrations, 7 category filter tabs |
| `/integrations/[slug]` | ✅ Done | Template-driven detail pages (6 OTAs with full content) |
| `/solutions` | ✅ Done | Grid list of all solutions |
| `/solutions/[slug]` | ✅ Done | Template-driven detail pages |

### ✅ Homepage Sections (14 total)
1. **Hero** — 2-column layout, floating dashboard mockup cards, animated stats chip
2. **Stats bar** — 500+ managers, 10K+ units, 6+ OTAs, 24% revenue uplift
3. **Problem bento grid** — 7 pain-point cards (5+ apps, double bookings, WhatsApp chaos, etc.)
4. **Automation workflow** — 7-step flow with integration chip panel
5. **Feature Ecosystem carousel** — Horizontal scroll, 3D-tilt glassy cards, auto-scroll
6. **Dashboard Showcase** — Dark section, tabbed mock UI (Analytics / Calendar / Inbox)
7. **Compliance & Security** — 6 Saudi-specific items (ZATCA, Absher, Ejar, etc.)
8. **Revenue Engine** — Stats grid + copy + link
9. **Owner Portal** — Copy + mock portal card
10. **Branding & Direct Booking** — 3 feature cards
11. **Integrations grid** — 12 logo cards with links
12. **Testimonials** — 3 cards (EN + AR)
13. **FAQ** — Accordion, 5 questions
14. **Final CTA** — Gradient section, 2 CTA buttons

### ✅ Integrations Page — All 24 integrations across 7 categories
| Category | Integrations |
|---|---|
| OTA (11) | AQAR, Ejar, Airbnb, Booking.com, AGODA, Google VR, Qotoon, Attiude + Almosafer/Darent/Gathern (Soon) |
| Government (4) | Absher, Shmoos, Ministry of Tourism, Ejar |
| Dynamic Pricing (1) | PriceLabs |
| Smart Home (2) | Tuya, TTLock |
| Accounting (3) | Odoo, Quyood, Daftra |
| Bank (1) | ANB |
| Communication (2) | WhatsApp, VFirst SMS |

### ✅ Global Components
- Navbar with mega menu (4 dropdowns) + mobile drawer
- Footer with links, socials (LinkedIn, X, Instagram, TikTok)
- Floating CTA button
- Global Demo Modal (3-step form)
- Language switcher (EN/AR toggle)

---

## 6. Changes Made in Session (Jun 2, 2026)

| Change | File(s) | Details |
|---|---|---|
| Container width increased | All section files | `max-w-7xl` (1280px) → `max-w-[1400px]` across all 17 instances |
| `.container-site` utility added | `globals.css` | Central place to control site width in future |
| Integrations page rebuilt | `IntegrationsPageClient.tsx` | Was 6 cards → now 24 integrations with 7 category filter tabs, "Soon" badges, animated transitions |
| Arabic font changed | `app/layout.tsx`, `globals.css` | Noto Kufi Arabic → **Tajawal** (rounder, modern, better for SaaS UI) |
| Hydration error fixed | `app/layout.tsx` | Added `suppressHydrationWarning` to `<body>` — was caused by Grammarly extension |
| Solutions mega menu redesigned | `Navbar.tsx` | Single column list → **3-column Guesty-style** layout (By Portfolio Size / By Need / By Property Type) |
| Integrations mega menu grid | `Navbar.tsx` | 2 columns → **3 columns** per row (less scrolling, more compact) |

## 6b. Changes Made in Session (Jun 4, 2026)

| Change | File(s) | Details |
|---|---|---|
| Demo modal fully redesigned | `DemoModal.tsx` | 4-step flow: (1) Unit count cards → (2) Name + Phone → (3) Calendly slot picker → (4) Success. Old email-first flow replaced. |
| Calendly integrated | `DemoModal.tsx` | Real Calendly URL wired: `https://calendly.com/stayhub-info/30min`. Step 3 is a two-column layout: dark summary panel + inline Calendly embed. `calendly.event_scheduled` postMessage auto-advances to success. |
| Integration mega menu icons enlarged | `Navbar.tsx` | Cards changed from horizontal `w-10 h-10` row layout → vertical centered `w-14 h-14` card layout. "Soon" badges now amber. |
| Hero section | `HomepageClient.tsx` | Reverted to original floating mockup cards design — new design attempt was discarded. |
| `hero-banner.png` added | `/public/hero-banner.png` | Integration diagram image stored in public/ for future use. |
| Hero left copy updated | `HomepageClient.tsx` | New headline "Run Your Entire Hospitality Business From One Platform" (gradient), new subtext, two CTAs (Book a Demo + Watch Platform Tour). |
| Integrations page cards redesigned | `IntegrationsPageClient.tsx` | Vertical iOS-style cards: 96px centered icon box, bold name, coloured badge. Grid changed from 4-col → 3-col. |
| Automation flow hover interactions | `HomepageClient.tsx` | Step cards: lift + scale on hover, per-step colour wash gradient, glow border with shadow, connector dot between cards, spring physics via Framer Motion. |
| Hero right-side background image | `HomepageClient.tsx`, `/public/hero-bg-1.png` | Replaced plain `bg-[#f5f6f8]` grey panel with `hero-bg-1.png` as `cover` background image, rounded left edge preserved. |
| Hero converted to 3-slide carousel | `HomepageClient.tsx` | Auto-slides every 5s. Left arrow, right arrow, dot indicators, linear progress bar. AnimatePresence slide transitions (x-axis). 3 slides: (1) One Platform, (2) Guest Journey Automation, (3) Built for Saudi Arabia. Right side (floating cards + bg image) stays fixed. `heroSlide`, `heroDir`, `heroTimerRef` state added. |
| Hero bg + step cards | `HomepageClient.tsx` | Triple video loop: video_1→video_2_banner→video_3→video_1. Step cards fixed: removed AnimatePresence wrapper, direct conditional render per slide. Layout matches reference: cards peek from left edge. Slide1:3cards Slide2:2cards Slide3:2cards.. Step cards per slide: Slide1→01,02,03 Slide2→04,05 Slide3→06,07. `HeroCard3D` component: 3D tilt on hover, per-card float animation, AnimatePresence between slides. Cards offset outside panel boundary. |

---

## 7. Current Tasks / What's Pending

### 🔴 High Priority
- [ ] **Wire demo form to backend** — form submissions go nowhere; needs Resend/SendGrid/HubSpot/webhook
- [ ] **Fix pricing modal duplication** — `PricingPageClient.tsx` has local modal copy; refactor to use global `useDemoModal()`
- [x] **Deployed to Vercel** — via `npx vercel deploy --prod` (Jun 2, 2026)

### 🟡 Medium Priority
- [ ] **Missing pages** — `/blog`, `/help`, `/docs`, `/case-studies`, `/updates`, `/login`, `/signup`, `/demo`, `/contact` all 404
- [ ] **SEO** — Add `sitemap.xml`, `robots.txt`, Open Graph images per page
- [ ] **Analytics** — No tracking yet (Google Analytics / Mixpanel / Plausible)
- [ ] **Integration detail pages** — Only 6 OTAs have full content in `data/integrations.js`; remaining 18 need content
- [ ] **FloatingCTA** — Review and polish the sticky CTA component
- [ ] **Mobile drawer for Solutions** — Drawer still shows old flat list, not the new 3-column structure

### 🟢 Nice to Have
- [ ] **Blog/Content pages** — Static MDX blog
- [ ] **About / Team page**
- [ ] **Contact page** with form
- [ ] **Cookie consent banner** (required for Saudi PDPL compliance)
- [ ] **Dark mode** — Not planned but foundation is clean

---

## 8. Known Issues

| Issue | Location | Severity | Notes |
|---|---|---|---|
| Demo modal duplicated | `PricingPageClient.tsx` | Medium | Has own local modal state instead of global `DemoModalContext` |
| Form submits nowhere | `DemoModal.tsx` + `PricingPageClient.tsx` | High | Step 3 shows success but no data sent anywhere |
| Multiple 404 pages | Nav + Footer links | Medium | `/blog`, `/help`, `/docs`, `/login`, `/signup`, `/demo`, `/contact` all 404 |
| Logo image warning | `Navbar.tsx` | Low | `width` set but no `height: auto` style — Next.js console warning |
| Turbopack workspace root warning | `next.config.ts` | Low | Multiple lockfiles; add `turbopack.root` to silence |
| `vrbo.webp` logo unused | `/public/logos/` | Low | Exists in public/ but not in Navbar INTEGRATIONS array |
| `elm.webp`, `nic.webp`, `sdaia.webp` | `/public/logos/` | Low | Exist in public/ but not used anywhere in codebase |
| Solutions mobile drawer | `Navbar.tsx` | Low | Mobile accordion still shows old flat list, not new 3-column layout |
| 18 integration detail pages missing content | `data/integrations.js` | Medium | Only Airbnb, Booking.com, Agoda, Expedia, Google VR, Gathern have full content |

---

## 9. Design System

| Token | Value |
|---|---|
| Primary blue | `#25A4E8` |
| Secondary purple | `#7C69E8` |
| Dark navy | `#0F172A` |
| Light bg | `#EFF8FF` |
| Section bg | `#F3F2FA` |
| Text primary | `#0F172A` |
| Text secondary | `#64748B` (slate-500) |
| Border default | `#E2E8F0` (slate-200) |
| Success green | `#10B981` |
| Warning amber | `#F59E0B` |
| Saudi compliance accent | `#bef264` (lime) |

**Typography:**
- Latin text → **Manrope** (weights: 400, 500, 600, 700, 800)
- Arabic text → **Tajawal** (weights: 200, 300, 400, 500, 700, 800, 900)
- Both loaded via `next/font/google` with `display: swap`

**Animation standard:**
```ts
ease: [0.22, 1, 0.36, 1]   // custom spring-like easing used everywhere
fadeUp: { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
```

---

## 10. Git History

```
0d03c34  Force redeploy — trigger fresh Vercel build (empty commit)
8ab9c2d  UI improvements: Tajawal font, wider container, integrations page rebuild, Solutions mega menu redesign
b33176f  Replace placeholder icons with real logos from stayhub.sa
f7bf0bc  Set Arabic as default language + redesign pricing to per-property model
02f8b94  Redesign mega menu → 3-column layout with animated category switcher
43d295b  Redesign automation section to match Figma (node 2662:115)
e9ff1c9  Fix package-lock.json: remove stub entry with missing version field
5526698  Add vercel.json: use npm ci to fix canary Next.js 16 semver issue
fd50556  Add full StayHub marketing site — bilingual EN/AR Next.js build
0ef8d2a  Initial commit from Create Next App
```

---

## 11. Dev Commands

```bash
npm run dev          # Start dev server on port 3001 (see .claude/launch.json)
npm run build        # Production build
npm run lint         # ESLint
```

**Always open** http://localhost:3001 — do NOT use network IP (192.168.x.x:3001),
client-side JS may not load correctly via network IP in local dev.

---

## 12. Deployment

- Vercel project connected to GitHub `main` branch — auto-deploys on every push
- `.vercel/project.json` contains project + org IDs
- `vercel.json` sets build command to `npm ci` (fixes canary Next.js semver issue)
- After making changes: `git add . && git commit -m "message" && git push origin main`

### ⚠️ Vercel GitHub Webhook Issue (known)
The GitHub → Vercel auto-deploy webhook **reliably does NOT trigger** on push (confirmed broken Jun 2 + Jun 4, 2026).
**Deploy workflow:**
1. Make all changes across the session
2. When ready to go live, do one combined push:
```bash
git add . && git commit -m "message" && git push origin main
npx vercel deploy --prod
```
Also do a hard refresh (`Cmd + Shift + R`) on the live URL to bypass CDN cache.

> ⚠️ **Do NOT push/deploy after every individual change — batch all changes and push once.**
