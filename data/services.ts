/* =============================================================================
 * SERVICES
 * Presentation-free data for the Services page and the home-page preview.
 * ========================================================================== */

export type ServiceIcon =
  | "assessment"
  | "design"
  | "installation"
  | "paperwork"
  | "warranty"
  | "maintenance";

export interface Service {
  /** Display index, e.g. "01". Kept in data so ordering stays with the content. */
  number: string;
  slug: string;
  title: string;
  description: string;
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    number: "01",
    slug: "site-assessment",
    title: "Site Assessment",
    description:
      "We look at your roof, your shade and your usage, then tell you honestly what solar can and cannot do for you.",
    icon: "assessment",
  },
  {
    number: "02",
    slug: "system-design",
    title: "System Design",
    description:
      "A layout sized to your actual consumption and the roof you have, not a package picked off a shelf.",
    icon: "design",
  },
  {
    number: "03",
    slug: "solar-installation",
    title: "Solar Installation",
    description:
      "Careful mounting, proper cabling and safe earthing, finished tidily and commissioned before we leave.",
    icon: "installation",
  },
  {
    number: "04",
    slug: "grid-connection-support",
    title: "Grid Connection Support",
    description:
      "Net metering and approval paperwork can be slow going. We help you work through it step by step.",
    icon: "paperwork",
  },
  {
    number: "05",
    slug: "warranty-support",
    title: "Warranty Support",
    description:
      "If something needs a claim, we handle it with the manufacturer so you are not left chasing it yourself.",
    icon: "warranty",
  },
  {
    number: "06",
    slug: "maintenance-and-cleaning",
    title: "Maintenance & Cleaning",
    description:
      "Panels lose output when they are dirty. Simple scheduled cleaning and checks keep your system earning.",
    icon: "maintenance",
  },
];
