import Link from "next/link";
import type { Category } from "@/data/categories";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export interface CategoryCardProps {
  category: Category;
  /** Stagger delay for grid reveals. */
  delay?: number;
  /** Images above the fold should load eagerly; the rest stay lazy. */
  priority?: boolean;
}

export function CategoryCard({
  category,
  delay = 0,
  priority = false,
}: CategoryCardProps) {
  const href = `/products/${category.slug}`;

  return (
    <Reveal as="li" delay={delay} className="h-full">
      {/* The whole card is one link: a single tab stop, and the entire surface
          is clickable rather than just the small text call to action. */}
      <Link
        href={href}
        className="group card-surface flex h-full flex-col overflow-hidden transition-[box-shadow,transform,border-color] duration-[var(--duration-soft)] ease-[var(--ease-soft)] hover:-translate-y-1 hover:border-accent/35 hover:shadow-[var(--shadow-lift)]"
      >
        <div className="relative overflow-hidden bg-gradient-to-b from-tint-blue to-surface">
          <img
            src={category.image}
            alt={category.imageAlt}
            width={640}
            height={420}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            className="h-auto w-full transition-transform duration-[600ms] ease-[var(--ease-soft)] group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-6">
          <h3 className="font-display text-lg font-bold text-navy">
            {category.name}
          </h3>

          <p className="text-[var(--text-small)] leading-relaxed text-slate">
            {category.tagline}
          </p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-display text-[var(--text-small)] font-semibold text-accent-deep">
            View Products
            <Icon
              name="arrow-right"
              size={16}
              className="transition-transform duration-[var(--duration-soft)] ease-[var(--ease-soft)] group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
