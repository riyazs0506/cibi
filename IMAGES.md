# Images

Every illustration on the site is an **SVG stand-in for real photography**,
drawn by `scripts/generate-images.mjs` from one parametric template so the
whole set shares a single light source, palette and perspective. The complete
set is about 97 KB.

They exist so the site can be built, reviewed and shipped before a photo shoot
happens. They are not pretending to be photographs, and they should be
replaced with real product photography when it exists.

## Replacing an image

Two ways, both simple:

1. **Drop a file at the same path.** Every image path is an explicit string in
   `data/products.ts` or `data/categories.ts`. Save your file over the
   existing one and nothing else changes.
2. **Point the data at a new file.** Change the `image` field to your new
   path. Use this when the extension changes — `.svg` to `.webp`, say.

Either way, **update `imageAlt` too**. It sits beside `image` in the same
object. Alt text describes the product for someone who cannot see it, and it
is the one part of an image swap that is easy to forget.

Because this is a static export, images are not optimised at request time
(`images: { unoptimized: true }`). Compress photographs before adding them —
aim for under ~150 KB each, and prefer WebP or AVIF over JPEG.

## What each slot expects

| Path | Size | Ratio | Used by |
|---|---|---|---|
| `/images/hero-premium-car-battery.svg` | 720 × 560 | 9:7 | Home hero. The LCP element — keep it light |
| `/images/product-*.svg` | 640 × 420 | ~3:2 | Product cards, category listings, product pages, finder result |
| `/images/category-*.svg` | 640 × 420 | ~3:2 | Category cards and category page headers |
| `/images/about-battery-fitting-service.svg` | 640 × 480 | 4:3 | About page |
| `/images/cibi-power-logo.svg` | 512 × 512 | 1:1 | Header and footer logo |
| `/images/og-cibi-power.png` | 1200 × 630 | 1.91:1 | Social preview card |

The `width` and `height` attributes in the components match these numbers.
They reserve space before the image loads, which stops the page jumping about.
**Keep the aspect ratio** when you swap a file — a different ratio will letterbox
or crop inside the reserved box. If you must change a ratio, change the
`width`/`height` attributes in the component to match.

Product images sit on a light surface with room around the product. Photographs
shot on white or very light grey drop in cleanly; busy backgrounds will not
match the rest of the page.

## Naming

Product and category files are named after what they show:

```
product-cibi-drive-45-car-battery.svg
category-inverter-battery.svg
```

Nothing derives a path from a slug, so a name that does not follow the pattern
still works as long as the `image` field points at it. Following it anyway
keeps the folder readable.

## Regenerating

```bash
npm run assets    # images, social card and icons
```

This runs automatically before `npm run build`. The three generators are:

| Script | Writes |
|---|---|
| `scripts/generate-images.mjs` | the product, category and scene SVGs |
| `scripts/generate-og-image.mjs` | `public/images/og-cibi-power.png` |
| `scripts/generate-icons.mjs` | favicons, app icons and `site.webmanifest` |

> Regenerating **overwrites** everything in `public/images` that the script
> draws. Once you replace a stand-in with a real photograph, remove that
> product's entry from the generator so it stops being overwritten — or stop
> running `npm run assets` once all the artwork is real. The favicon and social
> card generators are safe to keep running; they don't touch product images.

## The palette

The generators mirror the colour tokens in `app/globals.css` — navy `#102a43`,
accent blue `#5b9dff`, mint `#65c9a5` on a warm white `#f8fafc`. If you change
the brand colours, change them in both places, or the artwork will drift out of
step with the site.

## Icons

`scripts/generate-icons.mjs` renders the brand mark into every icon a browser
or phone asks for:

| File | Size | Purpose |
|---|---|---|
| `public/icon.svg` | vector | Modern browsers, crisp at any size |
| `public/favicon.ico` | 16, 32, 48 | Older browsers, tab icons |
| `public/apple-touch-icon.png` | 180 × 180 | iOS home screen |
| `public/icon-192.png` | 192 × 192 | Android and the web manifest |
| `public/icon-512.png` | 512 × 512 | Android, splash screen |

The rounded mark is used for the SVG and `.ico`, where the platform draws the
icon as-is. A full-bleed square is used for the Apple and manifest icons,
because iOS and Android apply their own rounded mask and would otherwise clip
an already-rounded corner twice.

These are written as real files with real extensions rather than through Next's
file-based metadata conventions, which emit extension-less routes under
`output: "export"` that static hosts serve with the wrong `Content-Type`.
