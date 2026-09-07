/* =============================================================================
 * PRODUCT CATEGORIES
 * Presentation-free data. Swap in the client's real range without touching UI.
 * ========================================================================== */

export interface Category {
  /** URL segment: /products/[slug] */
  slug: string;
  name: string;
  /** One-line card description. */
  tagline: string;
  /** Longer intro used on the category page and in meta descriptions. */
  intro: string;
  /** Short label for filters and breadcrumbs. */
  shortName: string;
  image: string;
  imageAlt: string;
  /** Bullet points shown on the category page. */
  highlights: string[];
}

export const categories: Category[] = [
  {
    slug: "car-batteries",
    name: "Car Batteries",
    shortName: "Car",
    tagline: "Reliable power for everyday drives.",
    intro:
      "Batteries suited to hatchbacks, sedans and SUVs, chosen to start dependably in daily traffic, short trips and long weekends alike.",
    image: "/images/category-car-battery.svg",
    imageAlt: "Maintenance-free car battery with navy casing and blue terminal caps",
    highlights: [
      "Maintenance-free and AGM options",
      "Suited to hatchbacks, sedans and SUVs",
      "Sizes matched to your vehicle's fitment",
    ],
  },
  {
    slug: "bike-batteries",
    name: "Bike Batteries",
    shortName: "Bike",
    tagline: "Compact power for every ride.",
    intro:
      "Small, sealed batteries for motorcycles and scooters, built to handle frequent starts and everyday commuting without fuss.",
    image: "/images/category-bike-battery.svg",
    imageAlt: "Compact sealed motorcycle battery with mint accent label",
    highlights: [
      "Sealed, spill-resistant construction",
      "Fits commuter bikes and scooters",
      "Steady starting in daily use",
    ],
  },
  {
    slug: "commercial-batteries",
    name: "Commercial Batteries",
    shortName: "Commercial",
    tagline: "Dependable power for vehicles that work harder.",
    intro:
      "Higher-capacity batteries for light commercial vehicles, trucks and buses that spend long hours on the road and cannot afford downtime.",
    image: "/images/category-commercial-battery.svg",
    imageAlt: "High-capacity commercial vehicle battery with reinforced handles",
    highlights: [
      "Built for long operating hours",
      "Higher reserve capacity",
      "Suited to fleets and transport use",
    ],
  },
  {
    slug: "heavy-duty-batteries",
    name: "Heavy-Duty Batteries",
    shortName: "Heavy-Duty",
    tagline: "Strong power for demanding applications.",
    intro:
      "Rugged batteries for construction equipment, agricultural machinery and generator sets working in tough conditions.",
    image: "/images/category-heavy-duty-battery.svg",
    imageAlt: "Rugged heavy-duty tubular battery with thick terminal posts",
    highlights: [
      "Tubular plates for deeper cycling",
      "Vibration-resistant construction",
      "For machinery and generator sets",
    ],
  },
  {
    slug: "inverter-batteries",
    name: "Inverter Batteries",
    shortName: "Inverter",
    tagline: "Reliable backup power for your home.",
    intro:
      "Tall tubular batteries designed for home and small-office inverters, giving steady backup through routine power cuts.",
    image: "/images/category-inverter-battery.svg",
    imageAlt: "Tall tubular inverter battery for home backup power",
    highlights: [
      "Tall tubular design for long backup",
      "Suited to homes and small offices",
      "Steady performance through daily cuts",
    ],
  },
];

export const getCategory = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);
