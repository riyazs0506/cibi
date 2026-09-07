"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

/**
 * Category navigation for the products area.
 *
 * Real links to real pages rather than client-side filtering, so every
 * category is crawlable, shareable and works with the back button.
 * Scrolls horizontally on narrow screens instead of wrapping into a block.
 */
export function CategoryNav() {
  const pathname = usePathname();

  const items = [
    { label: "All Products", href: "/products" },
    ...categories.map((category) => ({
      label: category.name,
      href: `/products/${category.slug}`,
    })),
  ];

  const normalised = pathname.replace(/\/$/, "") || "/";

  return (
    <nav aria-label="Product categories" className="-mx-5 md:mx-0">
      <ul className="flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = normalised === item.href;

          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex rounded-full border px-4 py-2",
                  "font-display text-[var(--text-small)] font-semibold",
                  "transition-[background-color,border-color,color,box-shadow]",
                  "duration-[var(--duration-soft)] ease-[var(--ease-soft)]",
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-surface text-slate hover:border-accent/50 hover:text-navy",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
