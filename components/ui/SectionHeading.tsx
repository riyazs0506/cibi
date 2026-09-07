import { Reveal } from "./Reveal";

export interface SectionHeadingProps {
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Heading level - sections use h2, sub-sections h3. Never skips a level. */
  as?: "h2" | "h3";
  align?: "left" | "center";
  /** Renders in the light-on-navy palette for the CTA band. */
  onDark?: boolean;
  className?: string;
}

/**
 * The one place section headings are styled, so type scale, spacing and
 * measure stay identical on every page.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  onDark = false,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={[
        "flex flex-col gap-3",
        centered ? "items-center text-center mx-auto max-w-2xl" : "max-w-2xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <p className={onDark ? "eyebrow text-accent" : "eyebrow"}>{eyebrow}</p>
      )}

      <Tag
        className={onDark ? "text-white" : undefined}
        style={{ fontSize: Tag === "h2" ? "var(--text-h2)" : "var(--text-h3)" }}
      >
        {title}
      </Tag>

      {description && (
        <p
          className={[
            "text-pretty leading-relaxed",
            onDark ? "text-white/75" : "text-slate",
          ].join(" ")}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
