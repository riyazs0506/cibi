import type { Metadata } from "next";
import Link from "next/link";
import { brand, contact } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { LegalNotice } from "@/components/sections/LegalNotice";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${brand.name} handles the information you share through this website.`,
  path: "/privacy-policy",
});

const crumbs = [{ name: "Home", href: "/" }, { name: "Privacy Policy" }];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${brand.name} handles the information you share with us through this website.`}
        crumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="prose-soft mx-auto max-w-3xl">
            <LegalNotice />

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              What this policy covers
            </h2>
            <p>
              This policy describes what happens to information you provide
              through this website. It applies to this site only, and not to any
              other website you may reach from a link here.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Information you give us
            </h2>
            <p>
              The only place this website asks for personal information is the
              enquiry form on the{" "}
              <Link
                href="/contact"
                className="font-medium text-accent-deep underline-offset-4 hover:underline"
              >
                contact page
              </Link>
              . That form asks for your name, phone number, email address, what
              you need help with, and your message.
            </p>
            <p>
              We ask for these details so we can understand your enquiry and
              reply to it. We do not use them for anything else, and we do not
              sell them.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              How the form works today
            </h2>
            <p>
              This website is currently a front-end only build. The enquiry form
              validates what you type in your own browser and nothing is
              transmitted or stored anywhere. When enquiry delivery is switched
              on, this section will be updated to name the service that receives
              and stores enquiries, and how long they are kept.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Cookies and analytics
            </h2>
            <p>
              This website does not set cookies, and does not run analytics or
              advertising trackers. Fonts are served from this site rather than
              from a third party, so loading a page does not send a request to
              any external service.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Your choices
            </h2>
            <p>
              You are never required to use the enquiry form. If you would
              rather not share details through the website, you are welcome to
              contact us directly instead.
            </p>
            <p>
              If you have sent us an enquiry and would like a copy of it, a
              correction, or its deletion, contact us and we will help.
            </p>

            <h2 className="mt-10" style={{ fontSize: "var(--text-h3)" }}>
              Contact
            </h2>
            <p>
              {contact.email ? (
                <>
                  Questions about this policy can be sent to{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-medium text-accent-deep underline-offset-4 hover:underline"
                  >
                    {contact.email}
                  </a>
                  .
                </>
              ) : (
                <>
                  Questions about this policy can be sent through the{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-accent-deep underline-offset-4 hover:underline"
                  >
                    contact page
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
