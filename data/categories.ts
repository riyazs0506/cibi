/* =============================================================================
 * PRODUCT CATEGORIES
 * =============================================================================
 *
 *  The five areas the catalogue is organised into. Order here is the order
 *  they appear everywhere on the site: the home grid, the products index, the
 *  category navigation and the footer.
 * ========================================================================== */

export interface Category {
  /** URL segment: /products/[slug] */
  slug: string;
  /** Full display name, used in headings and navigation. */
  name: string;
  /** Shorter label for tight spaces, e.g. "Back to Panels". */
  shortName: string;
  /** One-line card description on the home and products grids. */
  tagline: string;
  /** Longer lead paragraph for the category page hero and its meta description. */
  intro: string;
  /** What makes this range suitable - shown as a checked list. */
  highlights: string[];
  image: string;
  imageAlt: string;
}

export const categories: Category[] = [
  {
    slug: "solar-panels",
    name: "Solar Panels",
    shortName: "Panels",
    tagline: "Quiet, dependable generation on your roof.",
    intro:
      "High-efficiency solar panels for homes, businesses and farms, chosen for steady output and a long working life on Indian rooftops.",
    highlights: [
      "Monocrystalline and bifacial modules for strong output per square metre",
      "Built to hold up to heat, humidity, dust and monsoon rain",
      "Long performance warranties backed by the manufacturer",
      "Sized and laid out to suit the roof you actually have",
    ],
    image: "/images/category-solar-panels.svg",
    imageAlt:
      "A high-efficiency monocrystalline solar panel viewed at an angle",
  },
  {
    slug: "solar-inverters",
    name: "Solar Inverters",
    shortName: "Inverters",
    tagline: "The brain that turns sunlight into usable power.",
    intro:
      "On-grid, off-grid and hybrid solar inverters that convert what your panels generate into clean power your home or business can use.",
    highlights: [
      "On-grid, off-grid and hybrid options for every kind of connection",
      "MPPT tracking to pull the most from your panels through the day",
      "Clear monitoring so you can see what your system is producing",
      "Protection built in for overload, surge and reverse polarity",
    ],
    image: "/images/category-solar-inverters.svg",
    imageAlt: "A wall-mounted hybrid solar inverter with a display panel",
  },
  {
    slug: "solar-batteries",
    name: "Solar Batteries",
    shortName: "Batteries",
    tagline: "Keep the power you generate for when you need it.",
    intro:
      "Lithium and tubular storage batteries that hold the energy your panels produce, so an outage or a cloudy evening does not leave you without power.",
    highlights: [
      "Lithium and tall tubular options to suit different budgets",
      "Deep-cycle construction made for daily charge and discharge",
      "Sized to the backup hours you actually want",
      "Works with both hybrid and off-grid inverter setups",
    ],
    image: "/images/category-solar-batteries.svg",
    imageAlt: "A lithium solar storage battery for home energy backup",
  },
  {
    slug: "solar-water-heaters",
    name: "Solar Water Heaters",
    shortName: "Water Heaters",
    tagline: "Hot water from sunlight, every morning.",
    intro:
      "Evacuated tube and flat plate solar water heaters that cut the largest single electrical load in most homes, quietly and with almost no upkeep.",
    highlights: [
      "Evacuated tube and flat plate systems for different climates",
      "Insulated tanks that hold heat through the night",
      "Very little maintenance beyond an occasional clean",
      "Sized by household so you are not paying for capacity you never use",
    ],
    image: "/images/category-solar-water-heaters.svg",
    imageAlt:
      "A rooftop evacuated tube solar water heater with an insulated storage tank",
  },
  {
    slug: "solar-street-lights",
    name: "Solar Street Lights",
    shortName: "Street Lights",
    tagline: "Light where running a cable is not practical.",
    intro:
      "All-in-one and split solar street lights for roads, campuses, farms and residential layouts - no trenching, no wiring and no electricity bill.",
    highlights: [
      "Integrated panel, battery and LED in a single sealed housing",
      "Dusk-to-dawn operation with motion sensing on selected models",
      "Weather-sealed to IP65 and above for year-round outdoor use",
      "No cabling or grid connection required",
    ],
    image: "/images/category-solar-street-lights.svg",
    imageAlt:
      "An all-in-one solar street light with an integrated panel and LED head",
  },
];

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const getCategory = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);

export const categorySlugs = (): string[] =>
  categories.map((category) => category.slug);
