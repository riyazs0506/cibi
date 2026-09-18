import Link from "next/link";
import type { Product } from "@/data/products";
import { productPath } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export interface ProductCardProps {
  product: Product;
  delay?: number;
  priority?: boolean;
}

/** Label/value pair in the card's specification strip. */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.09em] text-muted">
        {label}
      </dt>
      <dd className="mt-0.5 truncate font-display text-[var(--text-small)] font-semibold text-navy">
        {value}
      </dd>
    </div>
  );
}

/**
 * Premium, restrained product card - deliberately not an e-commerce tile.
 * No price, no stock badge, no "add to cart"; the two actions are to read more
 * or to start a conversation.
 */
export function ProductCard({
  product,
  delay = 0,
  priority = false,
}: ProductCardProps) {
  const href = productPath(product);
  const enquiryHref = `/contact?product=${encodeURIComponent(product.name)}#enquiry-form`;

  return (
    <Reveal as="li" delay={delay} className="h-full">
      <article className="group card-surface flex h-full flex-col overflow-hidden transition-[box-shadow,transform,border-color] duration-[var(--duration-soft)] ease-[var(--ease-soft)] hover:-translate-y-1 hover:border-accent/35 hover:shadow-[var(--shadow-lift)]">
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="block overflow-hidden bg-gradient-to-b from-tint-blue to-surface"
        >
          <img
            src={product.image}
            alt={product.imageAlt}
            width={640}
            height={420}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            className="h-auto w-full transition-transform duration-[600ms] ease-[var(--ease-soft)] group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-bold text-navy">
            <Link
              href={href}
              className="transition-colors duration-[var(--duration-soft)] hover:text-accent-deep"
            >
              {product.name}
            </Link>
          </h3>

          <p className="mt-1.5 text-[var(--text-small)] leading-relaxed text-slate">
            {product.tagline}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-line-soft pt-5">
            <Spec label="Type" value={product.type} />
            <Spec label="Capacity" value={product.capacity} />
            <Spec label="Output" value={product.output} />
            <Spec label="Warranty" value={product.warranty} />
            <div className="col-span-2 min-w-0">
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.09em] text-muted">
                Suitable for
              </dt>
              <dd className="mt-0.5 font-display text-[var(--text-small)] font-semibold text-navy">
                {product.application}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-2.5 pt-0">
            <Button href={href} variant="primary" size="md" className="flex-1">
              View Details
            </Button>
            <Button href={enquiryHref} variant="secondary" size="md" className="flex-1">
              Enquire Now
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
