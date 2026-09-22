import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/data/site";
import { categories } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SolarFinder } from "@/components/SolarFinder";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  isHome: true,
  title: `${brand.name} | Solar Panels, Inverters & Water Heaters`,
  description: "A brighter everyday starts with solar. Explore solar panels, inverters, batteries, water heating and lighting, with careful installation and dependable support.",
  path: "/",
});

const solutions: { icon: IconName; title: string; description: string; href: string }[] = [
  { icon: "home", title: "For your home", description: "Put your roof to work. Make room for cleaner energy and a more independent everyday.", href: "/contact?enquiry=residential-solar#enquiry-form" },
  { icon: "business", title: "For your business", description: "Energy that works as hard as you do. Solar designed around your space and operations.", href: "/contact?enquiry=commercial-solar#enquiry-form" },
  { icon: "sun", title: "For everyday living", description: "From a warm morning shower to well-lit outdoor spaces. Let sunlight do more.", href: "/products/solar-water-heaters" },
];

const process = [
  { title: "Let’s understand your needs", text: "We start with your electricity use, your space and what you want solar to do." },
  { title: "A system that fits", text: "A site assessment helps us recommend the right equipment, layout and capacity." },
  { title: "Installed with care", text: "From mounting to commissioning, every part comes together with attention to detail." },
  { title: "Support for the long run", text: "Maintenance, system checks and warranty guidance keep you moving forward." },
];

export default function HomePage() {
  return (
    <>
      <section className="solar-hero" aria-labelledby="hero-title">
        <img className="solar-hero-image" src="/images/solar-landscape.jpg" alt="Rows of solar panels collecting sunlight beneath an open sky" width={2200} height={1467} fetchPriority="high" decoding="async" />
        <div className="solar-hero-shade" />
        <div className="container-x solar-hero-content">
          <div className="hero-layout">
          <Reveal onLoad className="hero-copy">
            <p className="hero-kicker"><span /> ENERGY FOR A BETTER TOMORROW</p>
            <h1 id="hero-title">A brighter future.<br />Powered by <span>you.</span></h1>
            <p className="hero-description">Turn everyday sunlight into lasting possibilities.<br className="hidden sm:block" /> Thoughtful solar solutions for your home, your business, and your future.</p>
            <div className="hero-actions">
              <Button href="/contact#enquiry-form" size="lg" withArrow>Start your solar journey</Button>
              <Button href="/products" variant="onDarkGhost" size="lg">Explore our solutions</Button>
            </div>
          </Reveal>
          <Reveal onLoad delay={180} className="hero-plan-card">
            <p className="hero-plan-eyebrow">MAKE THE FIRST MOVE</p>
            <h2>Your solar<br />starting point.</h2>
            <p>Tell us what you want to power. We’ll help you begin with a clear, practical direction.</p>
            <ul>
              <li><Icon name="home" size={18} /><span>Home rooftop solar</span><Icon name="arrow-right" size={16} /></li>
              <li><Icon name="business" size={18} /><span>Business solar planning</span><Icon name="arrow-right" size={16} /></li>
              <li><Icon name="water-heater" size={18} /><span>Solar water heating</span><Icon name="arrow-right" size={16} /></li>
            </ul>
            <Link href="#solar-finder" className="hero-plan-link">Find your system <Icon name="arrow-right" size={18} /></Link>
          </Reveal>
          </div>
          <div className="hero-footnote"><span>BETTER ENERGY. GREATER POSSIBILITIES.</span><a href="#solutions" aria-label="Discover our solar solutions"><Icon name="arrow-right" size={19} /></a></div>
        </div>
      </section>

      <div className="assurance-strip">
        <div className="container-x assurance-grid">
          {([{ icon: "compass", title: "Designed around you", text: "Your space. Your energy needs." }, { icon: "shield", title: "Quality at every step", text: "Carefully selected equipment." }, { icon: "support", title: "Here for the long run", text: "Dependable after-sales support." }] as const).map((item) => (
            <div className="assurance-item" key={item.title}><Icon name={item.icon} size={29} /><div><strong>{item.title}</strong><span>{item.text}</span></div></div>
          ))}
        </div>
      </div>

      <section id="solutions" className="section-y solutions-section">
        <div className="container-x">
          <Reveal className="section-intro"><div><p className="eyebrow">THE WAY FORWARD IS SOLAR</p><h2>Different needs.<br />One brighter direction.</h2></div><p>From the roof over your head to the business you’re building, we help you make the most of the sun.</p></Reveal>
          <div className="solutions-grid">
            {solutions.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <Link href={item.href} className="solution-tile group"><div className="solution-top"><Icon name={item.icon} size={34} /><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="solution-link">Discover the possibilities <Icon name="arrow-right" size={20} /></span></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y about-editorial">
        <div className="container-x about-grid">
          <Reveal className="about-visual"><img src="/images/electrical-installation.jpg" alt="An electrical professional carefully working on an installation" width={1000} height={1500} loading="lazy" /><div className="about-image-note"><Icon name="sun" size={36} /><span>Good energy.<br /><strong>From the ground up.</strong></span></div></Reveal>
          <Reveal delay={100} className="about-copy"><p className="eyebrow">MEET CIBI SOLAR</p><h2>Big on possibilities.<br />Grounded in trust.</h2><p>Going solar is a meaningful step. We make it a clear one, with honest advice, thoughtfully chosen equipment and people who care about getting it right.</p><p>From understanding your first electricity bill to looking after your system, we bring every part of your solar journey together.</p><div className="about-principles"><span><Icon name="check" size={17} /> Honest recommendations</span><span><Icon name="check" size={17} /> Careful installation</span><span><Icon name="check" size={17} /> Ongoing support</span></div><Button href="/about" variant="secondary" withArrow>Get to know us</Button></Reveal>
        </div>
      </section>

      <section className="section-y product-showcase">
        <div className="container-x">
          <Reveal className="section-intro"><div><p className="eyebrow">OUR SOLAR ECOSYSTEM</p><h2>Everything connects.<br />Everything works together.</h2></div><div><p>Generate. Convert. Store. Put clean energy to work with a complete range of solar essentials.</p><Button href="/products" variant="quiet" withArrow className="mt-5">Explore all products</Button></div></Reveal>
          <div className="ecosystem-grid">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 60} className={index === 0 ? "ecosystem-featured" : ""}>
                <Link href={`/products/${category.slug}`} className={`ecosystem-card ${index === 0 ? "ecosystem-card-featured" : ""}`}>
                  <div className="ecosystem-label"><span>0{index + 1} / {["GENERATE", "CONVERT", "STORE", "HEAT", "ILLUMINATE"][index]}</span><Icon name="arrow-right" size={21} /></div>
                  <img src={category.image} alt={category.imageAlt} width={640} height={420} loading="lazy" />
                  <div><h3>{category.name}</h3><p>{category.tagline}</p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="solar-finder" className="section-y finder-section">
        <div className="container-x">
          <Reveal className="finder-heading"><div><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Let’s find your<br />kind of solar.</h2></div><p>A few simple questions. A sensible starting point.<br />Discover what could work for your space, then we’ll help you work out the details.</p></Reveal>
          <Reveal delay={80}><SolarFinder /></Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Reveal className="section-intro"><div><p className="eyebrow">WITH YOU, EVERY STEP</p><h2>A clear path to<br />cleaner energy.</h2></div><Button href="/services" variant="secondary" withArrow>How we help</Button></Reveal>
          <div className="process-grid">{process.map((step, index) => <Reveal key={step.title} delay={index * 70} className="process-step"><div className="process-marker"><span className="process-number">0{index + 1}</span><i /></div><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</div>
        </div>
      </section>

      <CtaBand title="The sun is ready. Are you?" description="A better energy future starts with a conversation. Tell us about your space, and let’s explore what’s possible." primary={{ label: "Let’s talk solar", href: "/contact#enquiry-form" }} secondary={{ label: "Find your system", href: "/#solar-finder" }} />
    </>
  );
}
