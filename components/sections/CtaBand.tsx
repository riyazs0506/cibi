import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export interface CtaBandProps {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/**
 * The soft navy call-to-action band that closes every page.
 * One component so the closing note is identical site-wide.
 */
export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-navy px-6 py-14 sm:px-12 md:py-20">
          {/* A single soft bloom, well inside the panel - no loud gradient. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-mint/10 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-8 text-center">
            <SectionHeading
              title={title}
              description={description}
              align="center"
              onDark
            />

            <Reveal delay={80} className="flex flex-wrap justify-center gap-3">
              <Button href={primary.href} variant="onDark" size="lg">
                {primary.label}
              </Button>

              {secondary && (
                <Button href={secondary.href} variant="onDarkGhost" size="lg">
                  {secondary.label}
                </Button>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
