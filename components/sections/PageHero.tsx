import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import type { Crumb } from "@/lib/schema";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Rendered above the heading. Pair with `breadcrumbSchema` on the page. */
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

/**
 * Shared hero for inner pages: one h1, optional breadcrumb, generous space.
 * Keeps the top of every page recognisably the same shape.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: PageHeroProps) {
  return (
    <section className="inner-page-hero relative overflow-hidden border-b border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-40 h-[26rem] w-[26rem] rounded-full bg-accent/[0.06] blur-3xl"
      />

      <div className="container-x relative py-12 md:py-16 lg:py-20">
        {crumbs && (
          <Reveal onLoad className="mb-6">
            <Breadcrumb items={crumbs} />
          </Reveal>
        )}

        <div className="flex max-w-3xl flex-col gap-5">
          {eyebrow && (
            <Reveal onLoad>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
          )}

          <Reveal onLoad delay={60}>
            <h1 style={{ fontSize: "var(--text-h1)" }}>{title}</h1>
          </Reveal>

          {description && (
            <Reveal onLoad delay={120}>
              <p className="max-w-2xl text-lg leading-relaxed text-slate">
                {description}
              </p>
            </Reveal>
          )}

          {children && <Reveal onLoad delay={180}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
