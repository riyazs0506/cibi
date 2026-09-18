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
  title: "Solar Panels, Inverters, Batteries, Water Heaters & Street Lights",
  description:
    "Explore our range of solar panels, inverters, batteries, water heaters and street lights, with full specifications, suitable applications and warranty details.",
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
        title="Find the Right Solar Setup for Your Roof."
        description="Panels, inverters, batteries, water heaters and street lights - for homes, businesses and the spaces in between."
        crumbs={crumbs}
      >
        <CategoryNav />
      </PageHero>

      {/* ============================= CATEGORIES ============================ */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Range"
            title="Everything a Solar Setup Needs"
            description="Grouped by what each part actually does - generate, convert, store, heat or light."
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
            title="Our Featured Products"
            description="A closer look at the equipment we most often recommend, and what each one is good for."
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
            title="Choosing and Caring for Solar"
            description="A few things worth knowing before you decide. If your question is not here, just ask us."
            align="center"
            className="mb-10"
          />

          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={productFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Not Sure Where to Start?"
        description="Send us a recent electricity bill and we'll tell you honestly what solar can do for your roof."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Design Your System", href: "/#solar-finder" }}
      />
    </>
  );
}
