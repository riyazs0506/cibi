import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards/ProductCard";
import { PageHero } from "@/components/sections/PageHero";
import { CategoryNav } from "@/components/sections/CategoryNav";
import { CtaBand } from "@/components/sections/CtaBand";

interface RouteParams {
  params: Promise<{ category: string }>;
}

/** Every category is known at build time, so all pages are pre-rendered. */
export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) return {};

  return buildMetadata({
    title: category.name,
    description: category.intro,
    path: `/products/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: RouteParams) {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const items = getProductsByCategory(category.slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: category.name },
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Products"
        title={category.name}
        description={category.intro}
        crumbs={crumbs}
      >
        <CategoryNav />
      </PageHero>

      <section className="section-y">
        <div className="container-x">
          <div className="mb-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <Reveal>
              <h2 style={{ fontSize: "var(--text-h3)" }}>
                What makes these suitable
              </h2>

              <ul className="mt-5 flex flex-col gap-3">
                {category.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-[var(--text-small)] text-slate"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-mint text-mint-deep">
                      <Icon name="check" size={12} strokeWidth={2.4} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100} className="justify-self-center lg:justify-self-end">
              <img
                src={category.image}
                alt={category.imageAlt}
                width={640}
                height={420}
                loading="lazy"
                decoding="async"
                className="w-full max-w-sm rounded-[var(--radius-panel)] border border-line"
              />
            </Reveal>
          </div>

          <h2 className="sr-only">{category.name} range</h2>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                delay={index * 70}
                priority={index < 3}
              />
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not Sure Which One Fits?"
        description="Tell us what you drive and we'll help you choose with confidence."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Find Your Battery", href: "/#battery-finder" }}
      />
    </>
  );
}
