# Kagunga Farms – Implementation Plan

Status: plan only. Do not implement pages until instructed.
Repo today: empty. Stack is a recommendation, not an existing constraint.

---

## 1. Project architecture

**Stack:** Astro (static) + TypeScript + native CSS custom properties. No React unless a page truly needs client state.

Why Astro: Tanzania mobile networks, mid-range phones, minimal JS, excellent images, content collections, file-based routes that match the IA.

```text
kagungasite/
├── public/                 # robots.txt, favicon, og defaults
├── src/
│   ├── assets/images/      # source photos (processed by Astro)
│   ├── content/            # typed content collections (copy, facts, SEO)
│   ├── design/tokens.css   # ONLY place for raw color/type/space values
│   ├── layouts/            # Base, Page, Story
│   ├── components/         # see §2
│   ├── pages/              # file routes = public URLs
│   └── scripts/            # tiny islands only (nav, reveal)
├── astro.config.ts
└── .cursor/rules/          # agent guardrails
```

Content lives in `src/content/` (markdown/JSON). Components never hard-code company claims.

---

## 2. Component architecture

Build these once; pages compose them. No page-specific snowflake styling that bypasses tokens.

| Component | Role |
|---|---|
| `SiteHeader` | Chapter index (desktop) + compact top bar (mobile) |
| `ChapterPanel` | Photo + 2–3 destinations; click/keyboard, not hover-only |
| `ThumbDock` | Mobile bottom bar: Home, Land, Herds, Partner |
| `SiteFooter` | Repeat IA in plain language + legal + contact |
| `Container` | Max-width + horizontal padding only |
| `Section` | Vertical rhythm wrapper (`space-*` tokens) |
| `SectionHeading` | Eyebrow + h2 + optional lede |
| `Button` | `primary` / `ghost` / `text` – rectangular, slight radius |
| `Media` | Aspect-ratio, srcset, lazy, alt required |
| `StatRow` | 3–4 facts, typographic, not dashboard cards |
| `Breadcrumbs` | Inner pages only |
| `PageHero` | Inner-page title band (not a second homepage slider) |
| `CtaBand` | Partnership close |
| `Reveal` | CSS + tiny IO observer; respects `prefers-reduced-motion` |

Do not add card grids, icon libraries, or carousel components to the homepage.

---

## 3. Page architecture

Routes stay exactly as specified. Home is a narrative, not a sitemap dump.

| URL | Page job |
|---|---|
| `/` | Visual business story: hero → scale → intro → avocado → livestock → sustainability → future → partner CTA |
| `/about` | Who, where (Njombe), what we do, how to work with us |
| `/agriculture` | Operations overview; avocado is the lead |
| `/agriculture/avocado` | 27+ ha plantation, production, supply to exporters |
| `/livestock` | Visual composition: dairy, beef/cattle, goats, poultry, by-products |
| `/livestock/dairy` | Milk / dairy enterprise |
| `/livestock/beef` | Cattle / beef |
| `/sustainability` | Responsible practices we can actually document |
| `/future` | Direction only – no invented projects |
| `/insights` | Updates when they exist; empty state is honest |
| `/contact` | Enquiries for partners, buyers, suppliers, public |

Internal links: Home sections point to the real pages. Footer mirrors this. No orphan URLs.

---

## 4. Design system

Editorial agribusiness, not a farm template and not SaaS.

- **Surfaces:** off-white page, pure white only for rare inset media frames
- **Type:** one display + one sans (see §5)
- **Chrome:** hairline dividers (`rgba(ink, 0.08)`), almost no drop shadows
- **Radius:** 2–6px on buttons/inputs. Images: 0. No 16–24px “app cards”
- **Width:** content 72rem, text measure ~38rem, full-bleed media allowed
- **Breakpoints:** 480 / 768 / 1024 / 1280
- **Motion:** 180–400ms, opacity + 8–16px translate. No bounce, no spin

Tokens live in `src/design/tokens.css`. Components consume variables. Hex values do not appear in page CSS.

---

## 5. Typography strategy

Two families, subset, self-hosted WOFF2, `font-display: swap`.

| Role | Choice | Weights |
|---|---|---|
| Display / h1–h2 | **Fraunces** (opsz variable, or 400+600 only) | max 2 |
| UI + body | **Source Sans 3** | 400 + 600 |

Scale (mobile → desktop): h1 2.25rem / 4.5rem, h2 1.75rem / 2.75rem, body 1.0625rem, small 0.875rem. Line-height 1.15 display, 1.6 body. Letter-spacing slightly tight on display, never on body.

No third font. No icon font.

---

## 6. Color system

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F6F5F1` | Page |
| `--bg-white` | `#FFFcf7` | Rare insets |
| `--ink` | `#161C14` | Text (not pure black) |
| `--ink-soft` | `#4A5246` | Secondary text |
| `--forest` | `#1C3D2E` | Brand, primary buttons, links |
| `--forest-deep` | `#10261C` | Hover / footer |
| `--earth` | `#8A734C` | Tiny accents only |
| `--line` | `rgba(22,28,20,0.10)` | Rules |
| `--focus` | `#1C3D2E` 2px offset ring | Keyboard |

Contrast: body text vs `--bg` ≥ 7:1. `--forest` on `--bg` for small text must pass AA; if it fails, darken forest, do not lighten the page. Never light-green text on white. Never white text on earth.

---

## 7. Imagery strategy

Real Kagunga photos only. Placeholders are labeled `PHOTO NEEDED:` – never Unsplash.

Treatment: consistent warm-neutral grade later; for v1, consistent crop + overlay rules.

| Use | Aspect | Notes |
|---|---|---|
| Home hero | 4/5 mobile, 16/9 desktop | One image. Ken-Burns max 1.04 scale, paused if reduced-motion |
| Story split | 4/5 or 3/4 | Object-position set per photo |
| Avocado band | Full-bleed 16/9 | Strongest photo |
| Livestock composition | Mosaic, not 4 equal cards | Dairy large; others supporting |
| Inner heroes | 21/9 desktop, 4/5 mobile | Crop for faces/trees, not dead center by default |

`Media` component: width/height attributes, `sizes`, AVIF/WebP, lazy except LCP hero.

---

## 8. Responsive strategy

Mobile is designed first, not shrunk.

- **Nav:** top wordmark + Partner; bottom `ThumbDock` (safe-area padded). No hamburger of 11 links.
- **Type:** smaller, still editorial. Do not scale h1 below readable or above wrapping into 6 lines.
- **Images:** different `object-position` on small screens when the subject would be cropped out.
- **CTA:** Partner stays reachable by thumb (dock + in-flow buttons).
- **Order:** same story; livestock mosaic stacks into a vertical sequence.
- **Touch:** 44×44px minimum.
- **Overflow:** every full-bleed element uses `overflow-x: clip` on `body`; 100vw is forbidden (scrollbar bug). Use `100%`.

Desktop: spacious, chapter index, side-by-side story, mosaic livestock.

---

## 9. Animation strategy

No AOS, GSAP, or Nivo. Zansec-style libraries are the anti-pattern here.

Allowed:

- Header entrance: fade + 12px rise, once
- Section `Reveal`: opacity 0→1, translateY 16→0, triggered once
- Image mask reveal on avocado band
- Button color/translateY(1px)
- Hero slow scale 1→1.03 over ~12s, CSS only

Forbidden: carousels in the hero, parallax stacks, bounce, marquee, page-transition libraries, animating layout (`top`/`height`).

Honor `prefers-reduced-motion: reduce` (opacity only, no scale).

---

## 10. SEO strategy

- Unique `<title>` + meta description per route
- Canonical, OG, Twitter, locale `en_TZ` (Swahili later if approved)
- `Organization` JSON-LD; `LocalBusiness` only after address/geo confirmed
- Breadcrumb JSON-LD on inner pages
- `sitemap.xml` + `robots.txt`
- h1 one per page; h2 for sections; no skipped levels
- Alt text describes the scene, not “image1”
- Copy: “supplied to export-oriented partners” – never “we export to Europe” unless confirmed
- Internal links from home narrative to `/agriculture/avocado`, `/livestock`, `/contact`

---

## 11. Accessibility strategy

- Landmark: `header`, `nav` (label “Primary”, “Chapters”, “Page”), `main`, `footer`
- Chapter panels: buttons that `aria-expanded`, focus trap not required if panels are in-flow; Escape closes
- Thumb dock: `aria-current="page"`
- Focus ring always visible (never `outline: none` without replacement)
- Contrast as §6
- Reduced motion as §9
- Forms: label + error in text, not color alone
- Skip link to `#main`

---

## 12. Performance strategy

Budget (3G-ish): LCP < 2.5s, INP < 200ms, CLS < 0.05, JS < 30KB gz on home.

- Static HTML from Astro
- One CSS bundle; no Tailwind CDN, no Bootstrap
- Hero: one optimized image, `fetchpriority="high"`, no lazy
- All other images lazy + `content-visibility` on below-fold sections
- No autoplay video
- Fonts: 2 files max, preload those two, `unicode-range` subset
- Client JS only on `SiteHeader` / `Reveal` islands (`client:visible`)
- No jQuery, WOW, AOS, Nivo, Owl, GSAP

---

## 13. Dependency recommendations

**Add:** `astro`, `@astrojs/sitemap`. Image pipeline: Astro `<Image />`.

**Do not add:** React, Tailwind (unless you later insist – tokens in CSS are enough), animation libraries, UI kits, icon fonts, Google Fonts runtime CSS (self-host instead).

---

## 14. Content / data structure

```ts
// Conceptual. Implement later as content collections.
Company { legalName, shortName, region, country, blurb }
Facts { avocadoHectares: "27+", activities: string[] } // only confirmed
Nav { chapters: [{ id, label, plainLabel, href, children }] }
PageSeo { title, description, ogImage }
Cta { primary, secondary }
```

Tone: calm, corporate, specific. Not “from farm to table” clichés. Not emoji.

---

## 15. Development phases

1. Tokens + Base layout + Header/Dock/Footer (no pages of content)
2. Home narrative with `PHOTO NEEDED` slots
3. Inner pages (avocado first, then livestock, about, contact)
4. Sustainability + future (copy locked to confirmed facts)
5. Insights shell
6. SEO/JSON-LD, sitemap, a11y pass, image pipeline
7. QA on real Android widths (360–430) + desktop

---

## 16. QA strategy

- Lighthouse mobile + desktop on Home, Avocado, Contact
- Keyboard-only full pass
- axe / WAVE on each template
- Visual: 360, 390, 768, 1024, 1440 – check overflow, dock overlap, hero crop
- `prefers-reduced-motion`
- Contrast checker on forest/ink vs bg
- Swipe/scroll: no horizontal rubber-band of the page
- Content review: zero invented export/cert/year claims

---

## 17. Risks and mistakes to avoid

- Generic top nav: Home About Contact – **forbidden** (see nav section in this repo’s rules)
- Hero carousel (Zansec Nivo pattern)
- “We export to Europe/India/Asia”
- Invented certifications, years, investors, processing plants
- Stock photos
- Card grids + emoji livestock
- Light green on white, gray on gray
- `width: 100vw`, negative margins without clip
- Mixing hex in components
- Heavy JS animation libraries “for premium feel”
- 11-link hamburger on mobile
- Building all pages before photos/copy confirmation

---

## Navigation (creative, still obvious)

**Not** a strip of About / Contact links.

**Desktop – Chapter index:** wordmark left; three chapters center (Agriculture, Livestock, Company) with a one-word hint under each; **Partner with us** as the only button on the right. Clicking a chapter opens a **preview panel** (photo + 2–3 large destinations). Same action for keyboard. Feels like a journal contents page, works like a normal website.

**Mobile – Thumb dock** (what non-IT people already know from apps):

| Item | Plain label | Goes to |
|---|---|---|
| Home | Home | `/` |
| Land | Agriculture | `/agriculture` |
| Herds | Livestock | `/livestock` |
| Partner | Partner | `/contact` |

Top bar is only **Kagunga** + Partner. About, Future, Insights live under Company (desktop panel) and in the footer (always). No mystery icons without text.

---

## Missing before build (do not invent)

- Logo (SVG) + usage
- Phone, email, WhatsApp, physical address, maps pin
- Registration / year founded (if they want it public)
- Real photo set (hero, plantation, cattle, dairy, goats, poultry, people, Njombe)
- Direct-export confirmation (assume **no** until confirmed)
- Any certification, buyer names, volumes, revenue
- Languages: EN only vs EN+SW
- Insights: do they have posts now?
- Preferred headline if not “Growing with the land…”
- Domain / analytics / hosting
