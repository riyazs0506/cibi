import type { Metadata } from "next";
import { brand } from "@/data/site";
import { getFeaturedProducts } from "@/data/products";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/cards/ProductCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SolarFinder } from "@/components/SolarFinder";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  isHome: true,
  title: `${brand.name} | Solar Panels, Inverters & Water Heaters`,
  description:
    "Rooftop solar for homes and businesses - panels, inverters, batteries, water heaters and street lights, with honest sizing advice, careful installation and dependable after-sales support.",
  path: "/",
});

const heroTrust = [
  "Quality Equipment",
  "Honest Sizing",
  "Warranty Support",
];

const benefits: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Equipment That Lasts",
    description:
      "Panels and inverters chosen to still be working properly in twenty years, not just on day one.",
  },
  {
    icon: "compass",
    title: "Sized Honestly",
    description:
      "A system built around the power you actually use. If solar is a poor fit for your roof, we will say so.",
  },
  {
    icon: "support",
    title: "Clear Answers",
    description:
      "Plain explanations of what solar will and will not do, with no jargon and no pressure.",
  },
  {
    icon: "badge",
    title: "Looked After",
    description:
      "Cleaning, checks and warranty claims handled for you long after the installation is done.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <>
      {/* ================================ HERO =============================== */}
      <section className="relative overflow-hidden">
        {/* Very soft radial bloom behind the product - the only hero effect. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/4 rounded-full bg-accent/[0.07] blur-3xl lg:left-auto lg:right-0 lg:translate-x-1/4"
        />

        <div className="container-x relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <Reveal onLoad>
              <p className="eyebrow">Power You Can Trust</p>
            </Reveal>

            <Reveal onLoad delay={60}>
              <h1 style={{ fontSize: "var(--text-h1)" }} className="max-w-xl">
                Clean Power for Every Day.
              </h1>
            </Reveal>

            <Reveal onLoad delay={120}>
              <p className="max-w-lg text-lg leading-relaxed text-slate">
                Solar built around your roof and your actual usage, installed
                carefully and looked after properly.
              </p>
            </Reveal>

            <Reveal onLoad delay={180} className="flex flex-wrap gap-3">
              <Button href="/products" variant="primary" size="lg">
                Explore Products
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Us
              </Button>
            </Reveal>

            <Reveal onLoad delay={240}>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                {heroTrust.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[var(--text-small)] font-medium text-slate"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tint-mint text-mint-deep">
                      <Icon name="check" size={12} strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal onLoad delay={120} className="relative">
            {/* The one image on the page that must not be lazy-loaded: it is
                the Largest Contentful Paint element. */}
            <img
              src="/images/hero-rooftop-solar-system.svg"
              alt="A rooftop solar array with panels angled toward the sun"
              width={720}
              height={560}
              fetchPriority="high"
              decoding="async"
              className="mx-auto w-full max-w-lg lg:max-w-none"
            />
          </Reveal>
        </div>
      </section>

      {/* ============================ SOLAR FINDER =========================== */}
      <section id="solar-finder" className="section-y scroll-mt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Solar Finder"
            title="Find the Right Setup for Your Needs"
            description="Answer a few questions and we'll point you to a sensible starting point - then we'll work out the details with you."
            align="center"
            className="mb-10"
          />

          <Reveal delay={80}>
            <SolarFinder />
          </Reveal>
        </div>
      </section>

      {/* ============================= CATEGORIES ============================ */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Range"
            title="Everything a Solar Setup Needs"
            description="Panels to generate, inverters to convert, batteries to store, and solar heating and lighting for everything else."
            align="center"
            className="mb-10"
          />

          <CategoryGrid />
        </div>
      </section>

      {/* ========================== FEATURED PRODUCTS ======================== */}
      <section className="section-y">
        <div className="container-x">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured"
              title="Our Featured Products"
              description="A closer look at the equipment we most often recommend, and what each one is good for."
              className="mb-0"
            />

            <Reveal delay={80} className="shrink-0">
              <Button href="/products" variant="secondary" size="md" withArrow>
                View all products
              </Button>
            </Reveal>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => (
              <ProductCard
                key={`${product.category}-${product.slug}`}
                product={product}
                delay={index * 70}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ WHY CHOOSE US ========================== */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Solar Made Simple."
            description="From the first look at your roof to the years after it is running, we keep every step clear and dependable."
            align="center"
            className="mb-10"
          />

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Reveal as="li" key={benefit.title} delay={index * 70}>
                <div className="flex h-full flex-col gap-3.5 rounded-[var(--radius-card)] border border-line bg-canvas p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent-deep shadow-[var(--shadow-soft)]">
                    <Icon name={benefit.icon} size={21} />
                  </span>

                  <h3 className="font-display text-[1.0625rem] font-bold text-navy">
                    {benefit.title}
                  </h3>

                  <p className="text-[var(--text-small)] leading-relaxed text-slate">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ ABOUT PREVIEW ========================== */}
      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
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

          <div className="flex flex-col items-start gap-6">
            <SectionHeading
              eyebrow="About Us"
              title="Built on Reliability"
              description="We believe going solar should be a clear decision, not a leap of faith. With quality equipment, honest sizing and steady support, we help people move to solar with confidence."
              className="mb-0"
            />

            <Reveal delay={120}>
              <Button href="/about" variant="secondary" size="md" withArrow>
                About Us
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================== SERVICES PREVIEW ======================== */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Here When You Need Us"
              description="From the first roof survey to the cleaning years later, we handle the parts that make solar work."
              className="mb-0"
            />

            <Reveal delay={80} className="shrink-0">
              <Button href="/services" variant="secondary" size="md" withArrow>
                All services
              </Button>
            </Reveal>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                delay={index * 70}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* =============================== FINAL CTA =========================== */}
      <CtaBand
        title="Ready for Cleaner Power?"
        description="Send us a recent electricity bill and we'll tell you honestly what solar can do for your roof."
        primary={{ label: "Explore Products", href: "/products" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
