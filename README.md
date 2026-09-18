# Cibi Solar

A frontend-only marketing site for a solar company: panels, inverters,
batteries, water heaters and street lights.

Built with **Next.js 16 + React 19 + TypeScript + Tailwind v4**, exported as
static HTML. There is no server, no database and no API — but the code is
structured so a backend can be added later without rebuilding the frontend.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into out/
npm start            # serve out/ at http://localhost:4000
npm run typecheck
npm run assets       # regenerate illustrations + social card
```

> **Before going live, work through [SETUP.md](SETUP.md).** The brand name,
> contact details, product catalogue and sizing rules are all placeholders or
> samples, and are clearly marked as such.

---

## How it is organised

```
app/                      One folder per route; every page is pre-rendered
  layout.tsx              Fonts, header/footer, site-wide structured data
  page.tsx                Home
  about/ services/        Static pages
  products/               Index, [category], [category]/[product]
  contact/                Contact details + enquiry form
  privacy-policy/ terms/  Legal
  not-found.tsx           404
  sitemap.ts robots.ts    Generated at build time
  globals.css             Design tokens — the single source of the palette

data/                     Content, fully separated from presentation
  site.ts                 Brand + contact  ← edit this first
  categories.ts           The five product categories
  products.ts             The catalogue (sample)
  services.ts  faqs.ts    Services and FAQs
  finder.ts               Solar finder sizing rules (sample)
  navigation.ts           Header/footer links, derived from categories

components/
  ui/                     Button, Icon, Reveal, SectionHeading, Breadcrumb
  layout/                 Header, Footer, Logo, MobileCtaBar, ContactChannels
  cards/                  ProductCard, CategoryCard, ServiceCard
  sections/               PageHero, CtaBand, CategoryGrid, CategoryNav
  SolarFinder.tsx         The interactive finder
  ContactForm.tsx         Validated enquiry form
  FaqAccordion.tsx        Accessible disclosure list

lib/
  seo.ts                  buildMetadata() — every page's title/canonical/OG
  schema.ts               JSON-LD builders
  enquiry.ts              The single backend integration point

scripts/
  generate-images.mjs     Product/category/scene illustrations
  generate-og-image.mjs   Social preview card
  generate-icons.mjs      Favicon, app icons, web manifest
  flatten-rsc-payloads.mjs  Post-build fix, see below
```

`npm run build` runs these automatically: `prebuild` regenerates the assets and
`postbuild` applies the RSC payload fix.

**Data never lives in components.** Adding a product means editing
`data/products.ts` and adding one line to the image generator — the routes,
sitemap, category pages, finder and footer all pick it up automatically.

## Routes

```
/                                     /products/[category]
/about                                /products/[category]/[product]
/services                             /privacy-policy
/products                             /terms
/contact                              404
```

31 pages in total: 5 categories × their products, plus the static pages.

## Notable decisions

**Static export, not a SPA.** Every route is real HTML on disk. Product
specifications are in the markup, not behind JavaScript, so they are indexable.

**Nothing is invented.** Unset contact details are not rendered and are omitted
from structured data. `Product` schema carries no `offers`, `aggregateRating`
or `review`, because none of those exist yet. `LocalBusiness` is only emitted
once a real address is configured. The finder presents a starting point, never
a promise about generation or savings.

**The form does not lie.** It validates fully, then says plainly that enquiry
delivery is not connected yet and offers direct contact instead. Wire up
`lib/enquiry.ts` and it switches to a normal thank-you.

**Progressive enhancement.** Scroll-reveal animations hide content only when
JavaScript is available — a `<noscript>` override in the layout keeps
everything visible otherwise. Above-the-fold content uses a CSS-only animation
so it is never held back by hydration (which would otherwise delay LCP).

**Accessibility is not optional.** Semantic landmarks, one `h1` per page, real
`<button>` and `<a>` elements, labelled form controls, visible focus rings, a
skip link, `aria-live` on the finder result, and a global
`prefers-reduced-motion` override that strips every transition.

**No runtime dependencies beyond React and Next.** Icons are inline SVG,
illustrations are generated vectors, fonts are self-hosted by `next/font`. No
tracking, no cookies, no third-party requests at runtime.

**One upstream workaround.** Next 16.3.4's static export writes route prefetch
payloads to a path its own client router does not ask for, so every `<Link>`
coming into view 404s — about seventy failed requests and a console full of
errors on the home page alone. `scripts/flatten-rsc-payloads.mjs` runs after
the build and copies each payload to the path the router actually requests.
It reports how many files it wrote; when a future Next release reports **zero**,
the script is no longer needed and can be removed along with the `postbuild`
entry in `package.json`.

## Deploying

The `out/` folder is a plain static site. Upload it to any static host —
Netlify, Vercel, Cloudflare Pages, S3, or ordinary shared hosting.

Set the domain at build time so canonicals and the sitemap are correct:

```bash
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com npm run build
```

`trailingSlash` is enabled, so routes are served as `/about/` and canonical
URLs match exactly.
