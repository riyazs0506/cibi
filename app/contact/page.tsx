import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { hasAnyContactChannel } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { ContactChannels } from "@/components/layout/ContactChannels";
import { ContactForm } from "@/components/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Have a question about a battery, service or replacement? Send us a message and our team will help you find the right solution.",
  path: "/contact",
});

const crumbs = [{ name: "Home", href: "/" }, { name: "Contact" }];

/* Support-shaped questions, rather than the buying guidance on /products. */
const contactFaqs = faqs.slice(5);

export default function ContactPage() {
  const hasChannels = hasAnyContactChannel();

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Contact"
        title="We're Here to Help."
        description="Have a question about a battery, service, or replacement? Get in touch with us."
        crumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* --------------------------- Details --------------------------- */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              as="h2"
              eyebrow="Reach Us"
              title="Contact Details"
              description={
                hasChannels
                  ? "Call, email or visit us - whichever suits you best."
                  : "Our full contact details are being finalised. Send us a message and we will come back to you."
              }
              className="mb-0"
            />

            <Reveal delay={80}>
              <ContactChannels variant="page" />
            </Reveal>
          </div>

          {/* ---------------------------- Form ------------------------------ */}
          <div id="enquiry-form" className="scroll-mt-28">
            <Reveal>
              <div className="card-surface p-6 sm:p-8 lg:p-10">
                <h2 style={{ fontSize: "var(--text-h3)" }}>
                  Tell us what you need
                </h2>
                <p className="mt-2 text-[var(--text-small)] leading-relaxed text-slate">
                  Share a few details and we&apos;ll get back to you with the
                  right advice.
                </p>

                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================ FAQ ================================ */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Common Questions"
            title="Before You Get in Touch"
            description="A few answers that might save you a call. If not, we're happy to hear from you."
            align="center"
            className="mb-10"
          />

          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={contactFaqs} defaultOpen={-1} />
          </div>
        </div>
      </section>
    </>
  );
}
