/* =============================================================================
 * ICONS
 * Inline stroke icons on a shared 24x24 grid. Hand-rolled rather than pulled
 * from an icon package: this ships a few hundred bytes instead of a dependency,
 * and keeps every icon on the same weight so the set reads as one family.
 * ========================================================================== */

export type IconName =
  /* Navigation and controls */
  | "menu"
  | "close"
  | "arrow-right"
  | "chevron-down"
  | "check"
  /* Contact */
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  /* Finder categories */
  | "home"
  | "business"
  | "water-heater"
  | "street-light"
  /* Product motifs */
  | "sun"
  | "panel"
  /* Why choose us */
  | "shield"
  | "compass"
  | "support"
  | "badge"
  /* Services */
  | "assessment"
  | "design"
  | "installation"
  | "paperwork"
  | "warranty"
  | "maintenance";

/** Path data only - stroke, size and colour come from the wrapper. */
const paths: Record<IconName, React.ReactNode> = {
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  "arrow-right": <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,

  phone: (
    <path d="M6.2 3.5h3l1.6 4-2 1.4a12.5 12.5 0 0 0 6.3 6.3l1.4-2 4 1.6v3a1.7 1.7 0 0 1-1.9 1.7A16.8 16.8 0 0 1 4.5 5.4 1.7 1.7 0 0 1 6.2 3.5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 8 7.1 5a1.6 1.6 0 0 0 1.8 0L20 8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4-4.4 6-7.7 6-10.3A6 6 0 0 0 6 10.7C6 13.3 8 16.6 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),

  /* -- Finder categories -------------------------------------------------- */
  home: (
    <>
      <path d="M4 10.4 12 4l8 6.4V19a1.4 1.4 0 0 1-1.4 1.4H5.4A1.4 1.4 0 0 1 4 19Z" />
      <path d="M9.8 20.4v-5.6h4.4v5.6" />
    </>
  ),
  business: (
    <>
      <path d="M4.2 20.5V6.4a1.2 1.2 0 0 1 .85-1.15l6.6-2a1.2 1.2 0 0 1 1.55 1.15V20.5" />
      <path d="M13.2 10h5.4a1.2 1.2 0 0 1 1.2 1.2v9.3" />
      <path d="M2.6 20.5h18.8" />
      <path d="M7.4 8.6v.01M10.2 8.6v.01M7.4 12.4v.01M10.2 12.4v.01M7.4 16.2v.01M10.2 16.2v.01M16.4 13.6v.01M16.4 16.9v.01" />
    </>
  ),
  "water-heater": (
    <>
      {/* Insulated tank over a bank of evacuated tubes */}
      <rect x="3.2" y="4" width="17.6" height="6.6" rx="3.3" />
      <path d="M6.6 10.6v8.2M10 10.6v8.2M14 10.6v8.2M17.4 10.6v8.2" />
      <path d="M5.4 20.4h13.2" />
    </>
  ),
  "street-light": (
    <>
      {/* Pole, lamp head, and a panel tilted toward the sun */}
      <path d="M11.4 21V9.6" />
      <path d="M8 9.6h6.8l-1.2-2.8H9.2z" />
      <path d="M8.6 21h5.6" />
      <path d="m14.4 5 5.4-1.6.9 3.1-5.4 1.6z" />
      <path d="M11.4 6.8V5.6" />
    </>
  ),

  /* -- Product motifs ----------------------------------------------------- */
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2M5.5 5.5l1.6 1.6M16.9 16.9l1.6 1.6M18.5 5.5l-1.6 1.6M7.1 16.9l-1.6 1.6" />
    </>
  ),
  panel: (
    <>
      <path d="M2.8 17.4 5.9 6.6h12.2l3.1 10.8z" />
      <path d="M4.6 13.4h14.8M6.4 10h11.2M12 6.6v10.8" />
    </>
  ),

  /* -- Why choose us ------------------------------------------------------ */
  shield: (
    <>
      <path d="M12 3.5 19 6v6c0 4-2.9 7.1-7 8.5-4.1-1.4-7-4.5-7-8.5V6Z" />
      <path d="m9 12 2.2 2.2L15.3 10" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.5 4.1-4.1 1.5 1.5-4.1z" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <path d="M4.5 13.2h1.6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5.9a1.4 1.4 0 0 1-1.4-1.4z" />
      <path d="M19.5 13.2h-1.6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h.2a1.4 1.4 0 0 0 1.4-1.4z" />
      <path d="M18 18.2v.6a2.2 2.2 0 0 1-2.2 2.2H13" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9.8" r="5.8" />
      <path d="m8.6 14.8-1.1 5.6 4.5-2.3 4.5 2.3-1.1-5.6" />
      <path d="m10 9.8 1.6 1.6 2.8-2.8" />
    </>
  ),

  /* -- Services ----------------------------------------------------------- */
  assessment: (
    <>
      {/* A roof, surveyed */}
      <path d="M2.8 11.4 12 4.2l5.6 4.4" />
      <path d="M5.4 13.2v6.2a1 1 0 0 0 1 1h4.2" />
      <circle cx="16.4" cy="15.6" r="3.9" />
      <path d="m19.2 18.4 2.2 2.2" />
    </>
  ),
  design: (
    <>
      {/* A layout plan with one module picked out */}
      <rect x="3.2" y="4.4" width="17.6" height="15.2" rx="2.2" />
      <path d="M3.2 9.6h17.6M9.8 9.6v10" />
      <rect x="12.4" y="12.2" width="5.6" height="4.6" rx="1" />
    </>
  ),
  installation: (
    <>
      <path d="m14.6 6.4 3-3a4 4 0 0 1-5.2 5.2l-6 6a2.1 2.1 0 1 1-3-3l6-6a4 4 0 0 1 5.2-5.2z" />
      <path d="m14.8 14.2 5.4 5.4a1.9 1.9 0 0 1-2.6 2.6l-5.4-5.4" />
    </>
  ),
  paperwork: (
    <>
      <path d="M6.4 3.4h7.1l5 5v11.9a1.3 1.3 0 0 1-1.3 1.3H6.4a1.3 1.3 0 0 1-1.3-1.3V4.7a1.3 1.3 0 0 1 1.3-1.3Z" />
      <path d="M13.5 3.4v5.2h5" />
      <path d="m8.4 14.6 1.8 1.8 4-4.2" />
    </>
  ),
  warranty: (
    <>
      <path d="M12 3.5 19 6v6c0 4-2.9 7.1-7 8.5-4.1-1.4-7-4.5-7-8.5V6Z" />
      <path d="M12 8.4v4.2m0 2.8h.01" />
    </>
  ),
  maintenance: (
    <>
      {/* A panel being kept clean */}
      <path d="M2.8 16.4 5.6 7.2h9.6l2.8 9.2z" />
      <path d="M4.4 12.8h11.4M10.4 7.2v9.2" />
      <path d="M19.4 4.2s2.2 2.5 2.2 3.9a2.2 2.2 0 0 1-4.4 0c0-1.4 2.2-3.9 2.2-3.9Z" />
    </>
  ),
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  /** Pixel size for both axes. */
  size?: number;
}

/**
 * Decorative by default: `aria-hidden` unless the caller supplies a label,
 * so screen readers are never read a duplicate of the adjacent text.
 */
export function Icon({ name, size = 24, className, ...rest }: IconProps) {
  const labelled = Boolean(rest["aria-label"]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={labelled ? undefined : true}
      role={labelled ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
