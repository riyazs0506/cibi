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
              This website is provided so you can learn about our solar range
              and services, and get in touch with us. You are welcome to browse
              it and to contact us about anything you see here.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Product information
            </h2>
            <p>
              We aim to keep product descriptions and specifications accurate
              and up to date. Figures such as rated power, capacity, dimensions
              and weight are nominal, measured under standard test conditions,
              and may vary slightly between production batches. Real-world
              output is always lower than a standard-test rating, and nothing on
              this website predicts what a particular roof will generate or
              save.
            </p>
            <p>
              Nothing on this website is an offer to sell. Availability and
              terms are confirmed when you contact us.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              The solar finder
            </h2>
            <p>
              The solar finder is a starting point based on typical usage. It is
              useful for getting a sense of scale, but it is not a system design
              and it does not predict what you will generate or save. Output
              depends on your location, roof orientation, tilt, shading and the
              weather, and none of those are known from a few dropdown answers.
            </p>
            <p>
              Please treat its suggestion as a conversation starter rather than
              a quotation. If you are unsure,{" "}
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
              Warranty periods shown against each product refer to cover
              provided by the manufacturer. Panels carry a separate product
              warranty and performance warranty, and these run for different
              lengths of time. The full terms are set out in the documentation
              supplied with the equipment. Keep your purchase invoice and
              installation record, as both are needed for any claim.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Safety
            </h2>
            <p>
              Solar installations involve working at height and with DC wiring
              that stays live whenever there is daylight, even when the system
              is switched off. Panels, inverters and batteries should only be
              installed, altered or removed by someone competent to do so.
              Please follow the safety instructions supplied with your
              equipment.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Content and links
            </h2>
            <p>
              The text, images and design on this website belong to us. Where we
              refer to other manufacturers by name, we do so only to describe
              equipment and compatibility; those names remain the property of
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
