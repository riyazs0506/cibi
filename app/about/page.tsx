import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "We provide dependable battery solutions with quality products, honest guidance and service you can rely on. Learn what we stand for.",
  path: "/about",
});

const crumbs = [{ name: "Home", href: "/" }, { name: "About" }];

/* Deliberately no founding year, branch count, customer numbers or awards.
   None of that has been supplied, and none of it will be invented here. */
const promises: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Quality",
    description:
      "We focus on products that meet the needs of your vehicle and everyday use.",
  },
  {
    icon: "compass",
    title: "Trust",
    description:
      "Clear information and honest guidance help you make the right choice.",
  },
  {
    icon: "support",
    title: "Support",
    description: "We're here to help before, during, and after your purchase.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="About Us"
        title="Powering Journeys. Building Trust."
        description="We are committed to providing dependable battery solutions with quality products, honest guidance, and service you can rely on."
        crumbs={crumbs}
      />

      {/* =============================== OUR STORY =========================== */}
      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Our Story"
              title="Built on Reliability"
              className="mb-0"
            />

            <Reveal delay={80} className="prose-soft max-w-xl">
              <p>
                Every vehicle depends on reliable power. Our goal is to make
                finding that power simple, convenient, and stress-free.
              </p>
              <p>
                With a focus on quality products and customer care, we help
                individuals and businesses choose battery solutions that suit
                their everyday needs.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <img
              src="/images/about-battery-fitting-service.svg"
              alt="A battery being fitted to a vehicle in a clean service bay"
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
              className="w-full rounded-[var(--radius-panel)]"
            />
          </Reveal>
        </div>
      </section>

      {/* ============================= OUR PROMISE =========================== */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Promise"
            title="Our Promise to You"
            align="center"
            className="mb-10"
          />

          <ul className="grid gap-6 md:grid-cols-3">
            {promises.map((promise, index) => (
              <Reveal as="li" key={promise.title} delay={index * 80}>
                <div className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-canvas p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-accent-deep shadow-[var(--shadow-soft)]">
                    <Icon name={promise.icon} size={22} />
                  </span>

                  <h3 className="font-display text-xl font-bold text-navy">
                    {promise.title}
                  </h3>

                  <p className="text-[var(--text-small)] leading-relaxed text-slate">
                    {promise.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Your Journey Deserves Reliable Power."
        description="And we're here to help you find it."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
