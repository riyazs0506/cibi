import type { Metadata } from "next";
import { SITE_URL, brand } from "@/data/site";

/**
 * Normalises a route into a canonical absolute URL.
 * `trailingSlash: true` in next.config.ts means every exported route ends in a
 * slash, so canonicals must match exactly or they self-conflict.
 */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const clean = `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}/`;
  return `${SITE_URL}${clean}`;
}

/** Shared social preview card, produced by scripts/generate-og-image.mjs. */
const OG_IMAGE = {
  url: "/images/og-cibi-power.png",
  type: "image/png",
  width: 1200,
  height: 630,
  alt: `${brand.name} - ${brand.tagline}`,
};

export interface SeoInput {
  /** Page title without the brand suffix - the template adds it. */
  title: string;
  description: string;
  /** Route path, e.g. "/products/car-batteries". */
  path: string;
  /** Set true only on the home page, which owns the untemplated title. */
  isHome?: boolean;
}

/**
 * Single source of page metadata: title, description, canonical, Open Graph
 * and Twitter cards. Every page calls this so nothing is ever missed.
 */
export function buildMetadata({
  title,
  description,
  path,
  isHome = false,
}: SeoInput): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = isHome ? title : `${title} | ${brand.name}`;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: brand.name,
      title: fullTitle,
      description,
      url: canonical,
      locale: "en_IN",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
