import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { getFeaturedProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/cards/ProductCard";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CategoryNav } from "@/components/sections/CategoryNav";

export const metadata: Metadata = buildMetadata({
  title: "Batteries for Cars, Bikes, Commercial Vehicles & Home Backup",
  description:
    "Explore our range of car, bike, commercial, heavy-duty and inverter batteries, with specifications, suitable applications and warranty details.",
  path: "/products",
});

const crumbs = [{ name: "Home", href: "/" }, { name: "Products" }];

/* Buying-guidance questions belong with the range they help you choose from. */
const productFaqs = faqs.slice(0, 5);

export default function ProductsPage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(crumbs), faqSchema(productFaqs))}
      />

      <PageHero
        eyebrow="Products"
        title="Find the Right Power for Your Vehicle."
        description="Explore our range of batteries designed for cars, bikes, commercial vehicles, and backup power needs."
        crumbs={crumbs}
      >
        <CategoryNav />
      </PageHero>

      {/* ============================= CATEGORIES ============================ */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Range"
            title="Power for Every Need"
            description="Explore reliable battery solutions designed for different vehicles and everyday power needs."
            align="center"
            className="mb-10"
          />

          <CategoryGrid />
        </div>
      </section>

      {/* ============================== FEATURED ============================= */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Featured"
            title="Our Featured Batteries"
            description="Explore our range of reliable power solutions for different vehicles and applications."
            align="center"
            className="mb-10"
          />

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => (
              <ProductCard
                key={`${product.category}-${product.slug}`}
                product={product}
                delay={index * 60}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* ================================ FAQ ================================ */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Good to Know"
            title="Choosing and Caring for a Battery"
            description="A few things worth knowing before you decide. If your question isn't here, just ask us."
            align="center"
            className="mb-10"
          />

          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={productFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Not Sure Which One You Need?"
        description="Tell us about your vehicle and we'll help you find a battery that fits."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Find Your Battery", href: "/#battery-finder" }}
      />
    </>
  );
}
