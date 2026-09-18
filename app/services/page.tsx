import type { Metadata } from "next";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Solar Services",
  description:
    "Site assessment, system design, solar installation, grid connection support, warranty help and maintenance - we make going solar simple.",
  path: "/services",
});

const crumbs = [{ name: "Home", href: "/" }, { name: "Services" }];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Services"
        title="From First Survey to Long After."
        description="Going solar is more than buying panels. These are the parts we take care of so the system you end up with actually works."
        crumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-x">
          <h2 className="sr-only">What we help with</h2>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                delay={index * 70}
              />
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Need a Little Help?"
        description="Tell us what you need, and we will help you find the right solution."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
