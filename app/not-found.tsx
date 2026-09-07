import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you were looking for could not be found. Browse our battery range or get in touch and we will help.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tint-blue text-accent-deep">
            <Icon name="compass" size={30} />
          </span>

          <p className="eyebrow">Error 404</p>

          <h1 style={{ fontSize: "var(--text-h2)" }}>
            We couldn&apos;t find that page.
          </h1>

          <p className="text-lg leading-relaxed text-slate">
            The link may be out of date, or the page may have moved. Let&apos;s
            get you back to something useful.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>

          {/* Internal links out of a dead end, rather than a bare apology. */}
          <div className="mt-6 w-full border-t border-line pt-8">
            <h2 className="font-display text-[var(--text-small)] font-bold uppercase tracking-[0.12em] text-muted">
              Browse our range
            </h2>

            <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Button
                    href={`/products/${category.slug}`}
                    variant="secondary"
                    size="md"
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
