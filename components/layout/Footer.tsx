import Link from "next/link";
import { brand } from "@/data/site";
import { companyNav, legalNav, productNav } from "@/data/navigation";
import { Logo } from "./Logo";
import { ContactChannels } from "./ContactChannels";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-[var(--text-small)] font-bold uppercase tracking-[0.12em] text-white">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-[var(--text-small)] text-white/70 transition-colors duration-[var(--duration-soft)] hover:text-white"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-8">
          {/* Column 1 - identity */}
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-xs text-[var(--text-small)] leading-relaxed text-white/70">
              {brand.tagline}
            </p>
          </div>

          {/* Column 2 - products */}
          <FooterColumn title="Products">
            <FooterLinks links={productNav} />
          </FooterColumn>

          {/* Column 3 - company */}
          <FooterColumn title="Company">
            <FooterLinks links={companyNav} />
          </FooterColumn>

          {/* Column 4 - contact */}
          <FooterColumn title="Contact">
            <ContactChannels variant="footer" />
          </FooterColumn>
        </div>
      </div>

      {/* Utility row */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col-reverse items-center gap-4 py-6 sm:flex-row sm:justify-between">
          <p className="text-[var(--text-micro)] text-white/55">
            &copy; {year} {brand.legalName}. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  {/* sitemap.xml is a generated file, not an app route. */}
                  {link.href.endsWith(".xml") ? (
                    <a
                      href={link.href}
                      className="text-[var(--text-micro)] text-white/55 transition-colors duration-[var(--duration-soft)] hover:text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[var(--text-micro)] text-white/55 transition-colors duration-[var(--duration-soft)] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
