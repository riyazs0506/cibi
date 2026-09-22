import Link from "next/link";
import { brand } from "@/data/site";

export interface LogoProps {
  /** Renders the light-on-navy treatment used in the footer. */
  onDark?: boolean;
  className?: string;
  /** Set false inside a link that already exists (e.g. the footer heading). */
  asLink?: boolean;
}

/**
 * Brand mark plus wordmark. The mark is a solar module in perspective with a
 * sun resting above it - read as one shape at small sizes, restrained enough
 * not to look like a clip-art sunburst.
 */
export function Logo({ onDark = false, className = "", asLink = true }: LogoProps) {
  const ink = "var(--color-navy)";
  const accent = "var(--color-navy)";

  const mark = (
    <span className="flex items-center gap-2.5">
      <svg
        width="42"
        height="42"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <rect
          width="34"
          height="34"
          rx="5"
          fill="var(--color-accent)"
        />

        {/* Sun - the single accent touch */}
        <circle cx="17" cy="11.4" r="3.9" fill={accent} />

        {/* Module, in the same three-quarter perspective as the product art */}
        <path
          d="M7.6 25.4 10.4 18h13.2l2.8 7.4z"
          stroke={ink}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M9.2 21.7h15.6M17 18v7.4"
          stroke={ink}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <span
        className={[
          "font-display text-[1.375rem] font-extrabold tracking-[-0.04em]",
          onDark ? "text-white" : "text-navy",
        ].join(" ")}
      >
        {brand.name}
      </span>
    </span>
  );

  if (!asLink) {
    return <span className={className}>{mark}</span>;
  }

  return (
    <Link
      href="/"
      className={`inline-flex items-center rounded-lg ${className}`}
      aria-label={`${brand.name} - home`}
    >
      {mark}
    </Link>
  );
}
