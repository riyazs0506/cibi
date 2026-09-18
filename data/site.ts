/* =============================================================================
 * SITE CONFIGURATION — the one file to edit when the client details arrive.
 * =============================================================================
 *
 *  ⚠  SETUP REQUIRED before going live. Replace every `null` below with real,
 *     verified information. See SETUP.md for the full checklist.
 *
 *     1. `brand.name` / `brand.legalName` — confirm the trading name.
 *     2. `contact.phone`, `contact.email`, `contact.address` — real details only.
 *     3. `NEXT_PUBLIC_SITE_URL` — set at build time to the live domain.
 *
 *  Nothing here is invented. Fields left as `null` are simply not rendered and
 *  are omitted from structured data, so the site never publishes a fake phone
 *  number, address or review. While running `next dev` a banner lists whatever
 *  is still missing; that banner never ships to production.
 * ========================================================================== */

/** Canonical origin. Override at build time: NEXT_PUBLIC_SITE_URL=https://… */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cibisolar.com"
).replace(/\/$/, "");

export const brand = {
  /** TODO(client): confirm the exact trading name. */
  name: "Cibi Solar",
  /** Registered legal entity, if it differs from the trading name. */
  legalName: "Cibi Solar",
  tagline: "Clean power for every day.",
  description:
    "Solar panels, inverters, batteries, water heaters and street lights, with honest guidance, careful installation and dependable after-sales support.",
} as const;

export interface PostalAddress {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface OpeningHours {
  /** Human label, e.g. "Monday – Saturday". */
  days: string;
  /** Human label, e.g. "9:00 AM – 7:00 PM". */
  hours: string;
  /** schema.org dayOfWeek values, used only for LocalBusiness JSON-LD. */
  schemaDays: string[];
  /** 24h "HH:MM" values for JSON-LD. Null for a closed day range. */
  opens: string | null;
  closes: string | null;
}

/**
 * All values are `null` until the client supplies verified details.
 * Every consumer must handle `null` — never substitute a sample value.
 */
export const contact: {
  phone: string | null;
  phoneHref: string | null;
  email: string | null;
  address: PostalAddress | null;
  openingHours: OpeningHours[];
  mapUrl: string | null;
} = {
  phone: null, // TODO(client): e.g. "+91 98765 43210"
  phoneHref: null, // TODO(client): E.164 form for tel: links, e.g. "+919876543210"
  email: null, // TODO(client): e.g. "hello@cibisolar.com"
  address: null, // TODO(client): full postal address
  openingHours: [], // TODO(client): real opening hours
  mapUrl: null, // TODO(client): link to the business map listing
};

/** Optional social profiles. Used for Organization `sameAs`. Empty = omitted. */
export const socialProfiles: string[] = [];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** True when at least one way to reach the business is configured. */
export const hasAnyContactChannel = (): boolean =>
  Boolean(contact.phone || contact.email || contact.address);

/** Lists what still needs filling in. Powers the dev-only setup banner. */
export function missingSiteConfig(): string[] {
  const missing: string[] = [];
  if (!contact.phone) missing.push("contact.phone");
  if (!contact.email) missing.push("contact.email");
  if (!contact.address) missing.push("contact.address");
  if (contact.openingHours.length === 0) missing.push("contact.openingHours");
  if (!process.env.NEXT_PUBLIC_SITE_URL) missing.push("NEXT_PUBLIC_SITE_URL");
  return missing;
}

/** Formats a postal address as a single line. */
export function formatAddress(address: PostalAddress): string {
  return [
    address.street,
    address.locality,
    `${address.region} ${address.postalCode}`.trim(),
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}
