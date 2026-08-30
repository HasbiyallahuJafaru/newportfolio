# Hasbiyallahu Jafaru — Portfolio

Production portfolio for [Hasbiyallahu Jafaru](https://hasbiyallahu.xyz), Web Designer & Developer. Single-page Next.js site showcasing services, work, testimonials, and pricing — purpose-built to rank and convert.

## Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) |
| Animation | [Framer Motion 11](https://www.framer.com/motion/) |
| Fonts | DM Sans (self-hosted, zero external requests) |
| Deployment | [Netlify](https://netlify.com) with `@netlify/plugin-nextjs` |

## Features

- **Single-page layout** — smooth-scroll anchor navigation across 8 sections
- **Self-hosted fonts** — no Google Fonts dependency, faster paint
- **JSON-LD structured data** — Person, WebSite, ProfessionalService, Breadcrumb, Review/aggregate rating
- **Auto-generated sitemap.xml & robots.txt** — via Next.js App Router conventions
- **Full Open Graph & Twitter Card metadata** — `summary_large_image`, canonical URL, locale
- **Accessible** — skip-to-content link, `aria-hidden` decor, prefers-reduced-motion support
- **Responsive** — mobile-first with a collapsible nav and adaptive grid layouts
- **Film grain overlay** — pure SVG noise, no external assets
- **Hero video background** — parallax-scaling, multiple gradient scrims for legibility
- **Framer Motion reveal sequences** — staggered fade-up with scroll-triggered viewport detection

## Project Structure

```
.
├── app/                  # Next.js App Router
│   ├── fonts/            # Self-hosted DM Sans (5 weights)
│   ├── globals.css       # Tailwind directives + base styles
│   ├── layout.tsx        # Root layout — metadata, fonts, skip link, structured data
│   ├── page.tsx          # Homepage composition
│   ├── robots.ts         # /robots.txt route
│   └── sitemap.ts        # /sitemap.xml route
├── components/           # React components (all sections + utilities)
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Grain.tsx         # SVG film grain overlay
│   ├── Hero.tsx          # Video background + parallax hero
│   ├── Marquee.tsx       # Infinite scroll tag strip
│   ├── Nav.tsx           # Sticky nav + mobile drawer
│   ├── Pricing.tsx       # Pricing card with gradient border
│   ├── Reveal.tsx        # Scroll-triggered reveal primitives
│   ├── SectionLabel.tsx  # Consistent eyebrow/label
│   ├── Services.tsx      # 3-column service cards
│   ├── StructuredData.tsx # JSON-LD schemas (all types)
│   ├── Testimonials.tsx  # Quote cards
│   ├── Work.tsx          # Featured + grid project cards
│   └── icons.tsx         # Inline SVG icons
├── lib/
│   └── content.ts        # Single source of truth — all copy lives here
├── public/               # Static assets (hero video, portrait, work screenshots)
├── netlify.toml          # Netlify build & plugin config
├── .nvmrc                # Node 18 pin
├── next.config.mjs       # Next.js config
├── tailwind.config.ts    # Design tokens — colors, fonts, keyframes
└── tsconfig.json         # TypeScript config with @/ path alias
```

## SEO

Every on-page lever is pulled:

| Signal | Implementation |
|---|---|
| Title & meta description | Dynamic via `metadata` export |
| Keywords | 12 targeted terms in metadata |
| Canonical URL | `metadataBase` + `alternates.canonical` |
| Open Graph | `og:title`, `og:description`, `og:image` (portrait), `og:locale` (en_NG) |
| Twitter Card | `summary_large_image` with creator handle |
| Robots directives | `index, follow, max-image-preview:large, max-snippet:-1` |
| Structured data | 5 JSON-LD schemas in `@graph` wrapper |
| Sitemap | Auto-generated at `/sitemap.xml` |
| Robots.txt | Auto-generated at `/robots.txt` |
| Semantic HTML | `nav`, `header`, `footer`, `section`, `article`, `figure`, `figcaption`, `blockquote` |
| Heading hierarchy | `h1` (hero) → `h2` (sections) → `h3` (cards) |
| Alt text | Descriptive, keyword-aware on all images |
| Skip link | First focusable element for keyboard users |
| Self-hosted fonts | Zero third-party font requests |
| `loading="lazy"` | On below-fold images |
| `preload="auto"` | On hero video |

See the [off-page SEO strategy](#off-page-seo--backlink-strategy) from the audit report for link-building, content marketing, and social proof tactics.

## Getting Started

```bash
# Install
npm install

# Develop
npm run dev        # http://localhost:3000

# Build
npm run build      # production build
npm start          # serve production build

# Lint
npm run lint
```

## Environment

| Variable | Default | Notes |
|---|---|---|
| Node.js | >= 18.17 | Pinned via `.nvmrc` |
| Next.js | 14.2.x | App Router |

No `.env` required — all content is static and lives in `lib/content.ts`.

## Deployment

Push to `main`. Netlify auto-deploys via `@netlify/plugin-nextjs`. Build command: `npm run build`, publish directory: `.next`.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## License

All rights reserved. This is a personal portfolio — design and code are proprietary.
