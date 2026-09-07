/* =============================================================================
 * JSON-LD STRUCTURED DATA
 * =============================================================================
 *
 *  Rule for this file: only ever describe things that are true and visible on
 *  the page. Where the client has not yet supplied a detail (phone, address,
 *  opening hours) the property is omitted entirely rather than guessed.
 *
 *  Deliberately never emitted: aggregateRating, review, offers/price. None of
 *  those exist for this business yet, and inventing them is both dishonest and
 *  a structured-data policy violation.
 * ========================================================================== */

import { brand, contact, socialProfiles, formatAddress } from "@/data/site";
import type { Product } from "@/data/products";
import type { Faq } from "@/data/faqs";
import { absoluteUrl } from "./seo";

/** Loose JSON-LD node type - the shape varies per schema.org type. */
type JsonLdNode = Record<string, unknown>;

/** Strips keys whose value is undefined, so no empty properties are emitted. */
function compact(node: JsonLdNode): JsonLdNode {
  return Object.fromEntries(
    Object.entries(node).filter(([, value]) => value !== undefined),
  );
}

const ORGANIZATION_ID = `${absoluteUrl("/")}#organization`;
const WEBSITE_ID = `${absoluteUrl("/")}#website`;

/** schema.org PostalAddress, or undefined while the address is unknown. */
function addressNode(): JsonLdNode | undefined {
  if (!contact.address) return undefined;
  return {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  };
}

/** schema.org OpeningHoursSpecification list, or undefined while unknown. */
function openingHoursNode(): JsonLdNode[] | undefined {
  const specs = contact.openingHours
    .filter((entry) => entry.opens && entry.closes)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.schemaDays,
      opens: entry.opens,
      closes: entry.closes,
    }));
  return specs.length > 0 ? specs : undefined;
}

/* -------------------------------------------------------------------------- */

export function organizationSchema(): JsonLdNode {
  return compact({
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: brand.name,
    legalName: brand.legalName,
    url: absoluteUrl("/"),
    description: brand.description,
    logo: {
      "@type": "ImageObject",
      url: `${absoluteUrl("/")}images/cibi-power-logo.svg`,
    },
    telephone: contact.phone ?? undefined,
    email: contact.email ?? undefined,
    address: addressNode(),
    sameAs: socialProfiles.length > 0 ? socialProfiles : undefined,
  });
}

export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: brand.name,
    url: absoluteUrl("/"),
    description: brand.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

/**
 * LocalBusiness requires a real address to be meaningful and is only emitted
 * once the client has supplied one.
 */
export function localBusinessSchema(): JsonLdNode | null {
  const address = addressNode();
  if (!address) return null;

  return compact({
    "@type": "AutoPartsStore",
    "@id": `${absoluteUrl("/")}#localbusiness`,
    name: brand.name,
    url: absoluteUrl("/"),
    description: brand.description,
    image: `${absoluteUrl("/")}images/cibi-power-logo.svg`,
    address,
    telephone: contact.phone ?? undefined,
    email: contact.email ?? undefined,
    openingHoursSpecification: openingHoursNode(),
    hasMap: contact.mapUrl ?? undefined,
    parentOrganization: { "@id": ORGANIZATION_ID },
  });
}

export interface Crumb {
  name: string;
  /** Route path. Omitted on the current page, which is not a link. */
  href?: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) =>
      compact({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.href ? absoluteUrl(crumb.href) : undefined,
      }),
    ),
  };
}

/**
 * Product schema without offers or ratings - this site publishes neither a
 * price nor a review, so claiming either in structured data would be false.
 * Specifications are exposed as additionalProperty, which is the honest way to
 * make them machine-readable.
 */
export function productSchema(product: Product): JsonLdNode {
  const url = absoluteUrl(`/products/${product.category}/${product.slug}`);

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.summary,
    url,
    image: `${absoluteUrl("/").replace(/\/$/, "")}${product.image}`,
    category: product.application,
    brand: { "@type": "Brand", name: brand.name },
    manufacturer: { "@id": ORGANIZATION_ID },
    additionalProperty: [
      { name: "Battery type", value: product.type },
      { name: "Capacity", value: product.capacity },
      { name: "Voltage", value: product.voltage },
      { name: "Warranty", value: product.warranty },
      { name: "Suitable application", value: product.application },
    ].map((property) => ({
      "@type": "PropertyValue",
      name: property.name,
      value: property.value,
    })),
  };
}

/** Only emit for pages that actually render these questions and answers. */
export function faqSchema(items: Faq[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Wraps one or more nodes into a single @graph document. */
export function jsonLdGraph(...nodes: (JsonLdNode | null)[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter((node): node is JsonLdNode => node !== null),
  });
}
