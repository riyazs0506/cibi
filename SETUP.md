# Setup checklist — before this site goes live

Everything below is unset on purpose. The site is built so that anything
missing **hides itself** rather than showing a placeholder: no invented phone
number, no fake address, no made-up review score. That keeps the site honest
while it waits, but it also means a few blocks stay invisible until you fill
these in.

While `npm run dev` is running, a yellow banner at the top of every page lists
what is still missing. It is development-only and never appears in a build.

---

## 1. Business details — `data/site.ts`

This is the one file to edit. Replace each `null` with a real, verified value.

| Field | Example | What appears once it is set |
|---|---|---|
| `contact.phone` | `"+91 98765 43210"` | Header and footer call links, contact page, mobile CTA bar |
| `contact.phoneHref` | `"+919876543210"` | The `tel:` link target — E.164, no spaces |
| `contact.email` | `"hello@example.com"` | Footer and contact page email links |
| `contact.address` | full postal address | Contact page address block, LocalBusiness structured data |
| `contact.openingHours` | see below | Opening-hours table and structured data |
| `contact.mapUrl` | map listing URL | "Get directions" link |
| `socialProfiles` | array of profile URLs | Footer social links, `sameAs` in structured data |

Opening hours take both a human label and machine-readable values, because the
first is for visitors and the second is for search engines:

```ts
openingHours: [
  {
    days: "Monday – Saturday",
    hours: "9:00 AM – 7:00 PM",
    schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  {
    days: "Sunday",
    hours: "Closed",
    schemaDays: ["Sunday"],
    opens: null,
    closes: null,
  },
],
```

### Confirm the trading name

`brand.name` is currently **"Cibi Power"**, which was inferred, not supplied.
Confirm it or replace it — along with `brand.legalName` if the registered
entity differs. It appears in every page title, the logo, the footer and the
structured data.

---

## 2. The live domain

`NEXT_PUBLIC_SITE_URL` is read at build time and baked into every canonical
URL, the sitemap and the social card. Set it or the site will publish
canonicals pointing at a placeholder domain.

```bash
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com npm run build
```

Set it in your host's environment-variable settings, not in a committed file.

---

## 3. The enquiry form

The contact form is fully built and validated, but has nowhere to send
anything. Until an endpoint exists it tells the visitor plainly that it isn't
connected — it never claims a message was sent.

To connect it, set an endpoint that accepts a JSON `POST`:

```bash
NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://your-form-service.example/submit
```

The posted body is:

```json
{
  "name": "…", "phone": "…", "email": "…",
  "need": "…", "message": "…",
  "product": "…",      // only when the visitor came from an "Enquire Now" button
  "sourcePath": "/products/car-batteries/drive-45/"
}
```

Anything that accepts a JSON POST works — a form service, a serverless
function, or your own API. If the API expects a different shape, adjust the
`fetch` in **`lib/enquiry.ts`**; nothing in the form component needs to change.

> Since this is a static site with no backend, the endpoint URL is visible in
> the page source. Use a service that expects public submissions and does its
> own spam filtering and rate limiting — don't point it at an unprotected
> internal API.

---

## 4. The product catalogue — `data/products.ts`

The 15 products in this build are **plausible samples, not the real
catalogue**. The file header says so. Names, capacities, dimensions, weights,
warranty periods and prices all need to come from the client.

Each product needs an image at a matching path — see [IMAGES.md](IMAGES.md).

Categories live in `data/categories.ts`, services in `data/services.ts`, and
FAQ content in `data/faqs.ts`.

---

## 5. The battery finder — `data/finder.ts`

The finder uses **real vehicle makes and models**, but the mapping from
vehicle to recommended battery is **illustrative**. It has not been checked
against a fitment chart.

The result card already tells the visitor this is a guide and asks them to
confirm with the team before buying. Either replace the mapping with a
verified fitment table, or keep that wording. Do not present unverified
fitment as authoritative — the wrong battery size or terminal layout is a real
problem for a customer.

---

## 6. Before you publish

- [ ] `data/site.ts` — every `null` replaced, trading name confirmed
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain
- [ ] Real product catalogue in `data/products.ts`, with images
- [ ] Fitment mapping verified, or the guidance wording kept
- [ ] Enquiry endpoint connected and a test submission received
- [ ] Legal pages reviewed — `app/privacy-policy/` and `app/terms/` are
      general-purpose drafts and should be checked by someone qualified,
      especially if you add analytics or collect any personal data
- [ ] `npm run build` clean, then check `out/` with `npm run start`
- [ ] The dev-only setup banner no longer lists anything missing
