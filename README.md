# Cibi Power — website

A frontend-only marketing site for a battery retailer. It builds to plain
HTML, CSS and JavaScript with **no server and no backend**: `next build`
writes a folder you can drop on any static host or CDN.

> **Not yet live.** The build is complete, but real business details (phone,
> email, address, hours, domain) and the real product catalogue have not been
> supplied yet. See **[SETUP.md](SETUP.md)** for the go-live checklist.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| UI | React 19, TypeScript 5.8 |
| Styling | Tailwind CSS v4 |
| Fonts | Manrope + Inter, self-hosted at build time via `next/font` |
| Images | SVG illustrations generated from a script — see [IMAGES.md](IMAGES.md) |

No runtime dependencies beyond React and Next. Nothing is fetched from a third
party at page load — no analytics, no font CDN, no tracking.

## Commands

```bash
npm install       # once
npm run dev       # development server on http://localhost:3000
npm run build     # regenerates images, then exports the static site to out/
npm run start     # serves the built out/ folder locally, to check the real thing
npm run typecheck # tsc --noEmit
npm run assets    # regenerate images, OG card and icons without a full build
```

`npm run build` runs `npm run assets` first (via `prebuild`), so the images,
social card and favicons are always in step with the code that draws them.

## Deploying

The build output is the `out/` folder — static files, nothing else.

```bash
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com npm run build
```

Then upload `out/` to any static host (Netlify, Vercel, Cloudflare Pages,
S3 + CloudFront, or plain nginx). No Node process runs in production.

**Set `NEXT_PUBLIC_SITE_URL`.** It is baked in at build time and drives every
canonical URL, the sitemap and the social card links. Without it the build
falls back to a placeholder domain and the canonicals will be wrong.

`trailingSlash: true` is on, so every route is emitted as
`about/index.html` rather than `about.html`. That gives clean URLs on hosts
that don't rewrite paths for you.

## Project layout

```
app/                 routes; one folder per page, plus sitemap.ts and robots.ts
components/
  layout/            header, footer, mobile CTA bar, logo, dev-only setup banner
  sections/          page-level blocks (hero, category grid, CTA band)
  cards/             product, category and service cards
  ui/                button, icon, breadcrumb, heading, scroll reveal
  seo/               JSON-LD injection
data/                all copy and catalogue content — no presentation code
lib/                 SEO helpers, schema.org builders, enquiry submission
scripts/             image, social-card and icon generators
public/images/       generated artwork
```

**Content lives in `data/`, not in components.** Product details, categories,
services, FAQs and the battery-finder fitment table are plain TypeScript
objects. Editing copy or adding a product means touching one data file; no
component needs to change.

## What works, and what is deliberately inert

- **Battery finder** — cascading vehicle selector that suggests a product. The
  fitment mapping is illustrative, not a verified fitment chart, and the result
  card says so and points the visitor to the team.
- **Contact form** — fully built and validated client-side. It has nowhere to
  send anything yet, so on submit it says plainly that it isn't connected
  rather than pretending the message was delivered. Connect a backend by
  setting `NEXT_PUBLIC_ENQUIRY_ENDPOINT`; only `lib/enquiry.ts` needs to change.
- **Contact details** — phone, email, address and opening hours are `null`
  until real values arrive. Every block that would show them hides itself, and
  they are left out of the structured data. Nothing is invented.

## SEO

Per-page titles, descriptions and canonicals; Open Graph and Twitter cards; a
generated `sitemap.xml` and `robots.txt`; and JSON-LD for Organization,
WebSite, LocalBusiness, Product, BreadcrumbList and FAQPage. The
LocalBusiness entry deliberately omits address, phone and hours while they are
unset — publishing placeholder values would be worse than publishing none.

## Accessibility

One `<h1>` per page, a skip link, visible keyboard focus rings, labelled form
controls with errors tied to their inputs via `aria-describedby`, and
`prefers-reduced-motion` honoured throughout. Scroll animations degrade to
plain visible content without JavaScript.
