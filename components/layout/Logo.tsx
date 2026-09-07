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
 * Brand mark plus wordmark. The mark is a battery cell whose terminal reads as
 * a soft power arc - restrained rather than a literal lightning bolt.
 */
export function Logo({ onDark = false, className = "", asLink = true }: LogoProps) {
  const mark = (
    <span className="flex items-center gap-2.5">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <rect
          width="34"
          height="34"
          rx="10"
          fill={onDark ? "#ffffff" : "#102a43"}
        />
        {/* Battery body */}
        <rect
          x="9"
          y="10.5"
          width="16"
          height="14"
          rx="3.2"
          stroke={onDark ? "#102a43" : "#ffffff"}
          strokeWidth="1.7"
          fill="none"
        />
        {/* Terminal nub */}
        <path
          d="M14.4 10.5V8.6a1 1 0 0 1 1-1h3.2a1 1 0 0 1 1 1v1.9"
          stroke={onDark ? "#102a43" : "#ffffff"}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        {/* Charge level - the single accent touch */}
        <rect
          x="11.6"
          y="16.4"
          width="10.8"
          height="5.6"
          rx="1.6"
          fill={onDark ? "#3d82ea" : "#5b9dff"}
        />
      </svg>

      <span
        className={[
          "font-display text-[1.0625rem] font-extrabold tracking-[-0.02em]",
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
