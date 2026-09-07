import Link from "next/link";
import type { Crumb } from "@/lib/schema";

export interface BreadcrumbProps {
  /** Ordered trail. The last item is the current page and is not linked. */
  items: Crumb[];
  className?: string;
}

/**
 * Visible breadcrumb trail. Pair it with `breadcrumbSchema(items)` on the same
 * page so the structured data always matches what a visitor can actually see.
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--text-micro)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate transition-colors duration-[var(--duration-soft)] hover:text-accent-deep"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="font-medium text-navy" aria-current="page">
                  {item.name}
                </span>
              )}

              {!isLast && (
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
