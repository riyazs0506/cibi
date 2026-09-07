/* =============================================================================
 * NAVIGATION
 * One definition, consumed by the header, the mobile menu and the footer,
 * so a link can never drift out of sync between them.
 * ========================================================================== */

import { categories } from "./categories";

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation. Deliberately five items - nothing else belongs here. */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

/** Footer column 2 - derived from the catalogue so it can never go stale. */
export const productNav: NavLink[] = categories.map((category) => ({
  label: category.name,
  href: `/products/${category.slug}`,
}));

/** Footer column 3. */
export const companyNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

/** Footer utility row. */
export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];
