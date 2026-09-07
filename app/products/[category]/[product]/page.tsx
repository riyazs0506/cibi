import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/data/categories";
import {
  getProduct,
  getRelatedProducts,
  products,
  productPath,
} from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph, productSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/cards/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";

interface RouteParams {
  params: Promise<{ category: string; product: string }>;
}

/** Every product gets its own pre-rendered HTML page. */
export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { category, product: productSlug } = await params;
  const product = getProduct(category, productSlug);

  if (!product) return {};

  return buildMetadata({
    title: `${product.name} - ${product.capacity} ${product.voltage} Battery`,
    description: product.summary,
    path: `/products/${product.category}/${product.slug}`,
  });
}

/** The five headline attributes, shown as a scannable strip. */
function HeadlineSpecs({
  entries,
}: {
  entries: { label: string; value: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:grid-cols-3">
      {entries.map((entry) => (
        <div key={entry.label}>
          <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.09em] text-muted">
            {entry.label}
          </dt>
          <dd className="mt-1 font-display text-[var(--text-small)] font-semibold text-navy">
            {entry.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default async function ProductPage({ params }: RouteParams) {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProduct(categorySlug, productSlug);
  const category = getCategory(categorySlug);

  if (!product || !category) notFound();

  const related = getRelatedProducts(product);
  const enquiryHref = `/contact?product=${encodeURIComponent(product.name)}#enquiry-form`;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: category.name, href: `/products/${category.slug}` },
    { name: product.name },
  ];

  return (
    <>
      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(crumbs), productSchema(product))}
      />

      {/* ============================== OVERVIEW ============================= */}
      <section className="border-b border-line bg-surface">
        <div className="container-x py-10 md:py-14">
          <Breadcrumb items={crumbs} className="mb-8" />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-gradient-to-b from-tint-blue to-surface">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  width={640}
                  height={420}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full"
                />
              </div>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal>
                <p className="eyebrow">{category.name}</p>
                <h1
                  style={{ fontSize: "var(--text-h2)" }}
                  className="mt-3"
                >
                  {product.name}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-slate">
                  {product.summary}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <HeadlineSpecs
                  entries={[
                    { label: "Battery Type", value: product.type },
                    { label: "Capacity", value: product.capacity },
                    { label: "Voltage", value: product.voltage },
                    { label: "Warranty", value: product.warranty },
                    { label: "Suitable Application", value: product.application },
                  ]}
                />
              </Reveal>

              <Reveal delay={140} className="flex flex-wrap gap-3">
                <Button href={enquiryHref} variant="primary" size="lg">
                  Enquire Now
                </Button>
                <Button
                  href={`/products/${category.slug}`}
                  variant="secondary"
                  size="lg"
                >
                  Back to {category.shortName}
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ DETAIL BODY =========================== */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-12">
            {/* -- Product overview -- */}
            <Reveal>
              <h2 style={{ fontSize: "var(--text-h3)" }}>Product Overview</h2>
              <div className="prose-soft mt-5">
                {product.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {/* -- Specifications: a real table, always in the HTML -- */}
            <Reveal>
              <h2 style={{ fontSize: "var(--text-h3)" }}>Specifications</h2>

              <div className="mt-5 overflow-x-auto rounded-[var(--radius-card)] border border-line">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Technical specifications for the {product.name}
                  </caption>
                  <tbody>
                    {product.specs.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={index % 2 === 1 ? "bg-canvas" : "bg-surface"}
                      >
                        <th
                          scope="row"
                          className="w-1/2 border-b border-line-soft px-5 py-3.5 text-[var(--text-small)] font-medium text-slate"
                        >
                          {spec.label}
                        </th>
                        <td className="border-b border-line-soft px-5 py-3.5 font-display text-[var(--text-small)] font-semibold text-navy">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8">
            {/* -- Suitable applications -- */}
            <Reveal>
              <div className="card-surface p-7">
                <h2 style={{ fontSize: "var(--text-h3)" }}>
                  Suitable Applications
                </h2>

                <ul className="mt-5 flex flex-col gap-3">
                  {product.applications.map((application) => (
                    <li
                      key={application}
                      className="flex items-start gap-3 text-[var(--text-small)] leading-relaxed text-slate"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-mint text-mint-deep">
                        <Icon name="check" size={12} strokeWidth={2.4} />
                      </span>
                      {application}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* -- Warranty -- */}
            <Reveal delay={80}>
              <div className="rounded-[var(--radius-card)] border border-accent/25 bg-tint-blue p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-accent-deep">
                    <Icon name="warranty" size={20} />
                  </span>
                  <h2 style={{ fontSize: "var(--text-h3)" }}>
                    Warranty Information
                  </h2>
                </div>

                <p className="mt-4 text-[var(--text-small)] leading-relaxed text-slate">
                  {product.warrantyNote}
                </p>

                <Button
                  href="/services"
                  variant="quiet"
                  withArrow
                  className="mt-4"
                >
                  See how warranty support works
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================== RELATED PRODUCTS ======================== */}
      {related.length > 0 && (
        <section className="section-y bg-surface">
          <div className="container-x">
            <SectionHeading
              eyebrow="Related"
              title={`More ${category.name}`}
              description={`Other options in the ${category.name.toLowerCase()} range.`}
              className="mb-10"
            />

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ProductCard key={item.slug} product={item} delay={index * 70} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title="Have a Question About This Battery?"
        description="Tell us about your vehicle and we'll confirm the right fit before you buy."
        primary={{ label: "Enquire Now", href: enquiryHref }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
