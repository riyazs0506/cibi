import type { Service } from "@/data/services";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export interface ServiceCardProps {
  service: Service;
  delay?: number;
}

export function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  return (
    <Reveal as="li" delay={delay} className="h-full">
      <article className="card-surface flex h-full flex-col gap-4 p-7 transition-[box-shadow,transform,border-color] duration-[var(--duration-soft)] ease-[var(--ease-soft)] hover:-translate-y-1 hover:border-accent/35 hover:shadow-[var(--shadow-lift)]">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint-blue text-accent-deep">
            <Icon name={service.icon} size={22} />
          </span>

          {/* The number is decoration, not content - hidden from screen readers. */}
          <span
            aria-hidden="true"
            className="font-display text-[var(--text-small)] font-bold tracking-[0.1em] text-line"
          >
            {service.number}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-navy">
          {service.title}
        </h3>

        <p className="text-[var(--text-small)] leading-relaxed text-slate">
          {service.description}
        </p>
      </article>
    </Reveal>
  );
}
