import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { LegalNotice } from "@/components/sections/LegalNotice";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: `The terms that apply when you use the ${brand.name} website.`,
  path: "/terms",
});

const crumbs = [{ name: "Home", href: "/" }, { name: "Terms" }];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description={`The terms that apply when you use the ${brand.name} website.`}
        crumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="prose-soft mx-auto max-w-3xl">
            <LegalNotice />

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Using this website
            </h2>
            <p>
              This website is provided so you can learn about our battery range
              and services, and get in touch with us. You are welcome to browse
              it and to contact us about anything you see here.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Product information
            </h2>
            <p>
              We aim to keep product descriptions and specifications accurate
              and up to date. Figures such as capacity, dimensions and weight
              are nominal and may vary slightly between production batches.
            </p>
            <p>
              Nothing on this website is an offer to sell. Availability and
              terms are confirmed when you contact us.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              The battery finder
            </h2>
            <p>
              The battery finder is a guide based on typical fitment. It is
              helpful for narrowing down a choice, but it is not a guarantee
              that a given battery fits your vehicle. Physical size, terminal
              layout and capacity requirements vary between variants and model
              years.
            </p>
            <p>
              Please confirm the exact fitment with us before purchasing. If you
              are unsure,{" "}
              <Link
                href="/contact"
                className="font-medium text-accent-deep underline-offset-4 hover:underline"
              >
                ask us
              </Link>{" "}
              and we will check it with you.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Warranty
            </h2>
            <p>
              Warranty periods shown against each product refer to cover against
              manufacturing defects. The full terms, including what is and is
              not covered and how commercial use differs from private use, are
              set out in the warranty documentation supplied with the product.
              Keep your purchase invoice, as it is needed for any assessment.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Safety
            </h2>
            <p>
              Batteries store a large amount of energy and contain corrosive
              material. Please follow the safety instructions supplied with your
              battery, and have it fitted by someone competent to do so if you
              are not confident doing it yourself.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Content and links
            </h2>
            <p>
              The text, images and design on this website belong to us. Where we
              refer to vehicle makes and models, we do so only to describe what
              a battery is suitable for; those names remain the property of
              their respective owners, and no association or endorsement is
              implied.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Changes
            </h2>
            <p>
              We may update these terms as the website and our services develop.
              The version published here is the one that applies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
