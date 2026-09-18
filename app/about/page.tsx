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
    "We help homes and businesses move to solar with quality equipment, honest sizing and service you can rely on. Learn what we stand for.",
  path: "/about",
});

const crumbs = [{ name: "Home", href: "/" }, { name: "About" }];

/* Deliberately no founding year, installation count, capacity installed or
   awards. None of that has been supplied, and none of it will be invented. */
const promises: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Quality",
    description:
      "We fit equipment we would be happy to put on our own roof, and we can tell you why we chose it.",
  },
  {
    icon: "compass",
    title: "Trust",
    description:
      "Clear numbers, realistic expectations, and a straight answer if solar is a poor fit for your roof.",
  },
  {
    icon: "support",
    title: "Support",
    description:
      "We are here before, during and long after the install - including the paperwork and the warranty claims.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="About Us"
        title="Clean Power. Built on Trust."
        description="We are committed to making solar simple and dependable, with quality equipment, honest guidance, and service you can rely on."
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
                Going solar should be a straightforward decision, and too often
                it is not. Our goal is to make working out what you need simple,
                clear and free of pressure.
              </p>
              <p>
                With a focus on quality equipment and careful installation, we
                help homes and businesses move to solar in a way that suits the
                roof they have and the power they actually use.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <img
              src="/images/about-solar-installation.svg"
              alt="Solar panels being installed on a clean residential rooftop"
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
        title="Your Roof Could Be Doing More."
        description="And we're here to help you work out exactly how much."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
