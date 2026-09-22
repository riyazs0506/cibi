import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export interface CtaBandProps {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <section className="closing-cta">
      <Reveal className="container-x closing-cta-inner">
        <div><h2>{title}</h2><p>{description}</p></div>
        <div className="closing-cta-actions">
          <Button href={primary.href} variant="primary" size="lg" withArrow>{primary.label}</Button>
          {secondary && <Button href={secondary.href} variant="secondary" size="lg">{secondary.label}</Button>}
        </div>
      </Reveal>
    </section>
  );
}
