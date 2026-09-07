/* =============================================================================
 * SERVICES
 * Presentation-free data for the Services page and the home-page preview.
 * ========================================================================== */

export type ServiceIcon =
  | "replacement"
  | "installation"
  | "inspection"
  | "guidance"
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
    slug: "battery-replacement",
    title: "Battery Replacement",
    description:
      "Need a new battery? We help you find a suitable replacement for your vehicle and make the process simple.",
    icon: "replacement",
  },
  {
    number: "02",
    slug: "battery-installation",
    title: "Battery Installation",
    description:
      "Get your battery installed correctly and get back on the road with confidence.",
    icon: "installation",
  },
  {
    number: "03",
    slug: "battery-inspection",
    title: "Battery Inspection",
    description:
      "Not sure what's causing the problem? A battery inspection can help identify what your vehicle needs.",
    icon: "inspection",
  },
  {
    number: "04",
    slug: "battery-guidance",
    title: "Battery Guidance",
    description:
      "Choosing the right battery doesn't have to be complicated. Our team can help you make the right choice.",
    icon: "guidance",
  },
  {
    number: "05",
    slug: "warranty-support",
    title: "Warranty Support",
    description:
      "Need help with your battery warranty? We're here to guide you through the process.",
    icon: "warranty",
  },
  {
    number: "06",
    slug: "maintenance-support",
    title: "Maintenance Support",
    description:
      "Simple guidance to help you get dependable performance and longer battery life.",
    icon: "maintenance",
  },
];
