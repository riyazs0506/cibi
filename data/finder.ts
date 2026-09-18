/* =============================================================================
 * SOLAR FINDER DATA
 * =============================================================================
 *
 *  NOTE: SAMPLE SIZING GUIDE - replace with the client's own sizing rules.
 *
 *  The finder narrows a visitor towards a sensible starting point. It is not a
 *  design tool and does not pretend to be one: real sizing needs the actual
 *  bill, the actual roof and a shade study, which is exactly what the result
 *  card says.
 *
 *  Shape mirrors what a sizing API would return, so this file can be swapped
 *  for a fetch without touching the SolarFinder component.
 * ========================================================================== */

export type FinderCategoryId =
  | "home"
  | "business"
  | "water-heating"
  | "outdoor-lighting";

export interface FinderOption {
  value: string;
  label: string;
  /**
   * Products this choice implies, as `${categorySlug}/${productSlug}`.
   * Empty means the choice adds no product of its own.
   */
  recommends: string[];
  /**
   * Optional line surfaced in the result - used for sizing guidance that is a
   * range rather than a product, e.g. "roughly a 3 to 5 kW system".
   */
  note?: string;
}

export interface FinderStep {
  /** Used for the select id and name. Unique within a category. */
  id: string;
  label: string;
  placeholder: string;
  options: FinderOption[];
}

export interface FinderCategoryConfig {
  id: FinderCategoryId;
  label: string;
  /** Short line under the category name on the selector tile. */
  helper: string;
  /** Two or three cascading steps. */
  steps: FinderStep[];
}

export const finderCategories: FinderCategoryConfig[] = [
  /* -------------------------------- HOME -------------------------------- */
  {
    id: "home",
    label: "Home",
    helper: "Rooftop solar for your house",
    steps: [
      {
        id: "home-size",
        label: "Home Size",
        placeholder: "Select home size",
        options: [
          {
            value: "1bhk",
            label: "1 BHK or small home",
            recommends: ["solar-panels/ray-400"],
          },
          {
            value: "2bhk",
            label: "2 BHK",
            recommends: ["solar-panels/ray-550"],
          },
          {
            value: "3bhk",
            label: "3 BHK",
            recommends: ["solar-panels/ray-550"],
          },
          {
            value: "villa",
            label: "Villa or large home",
            recommends: ["solar-panels/ray-550"],
          },
        ],
      },
      {
        id: "monthly-bill",
        label: "Monthly Electricity Bill",
        placeholder: "Select your usual bill",
        options: [
          {
            value: "under-1500",
            label: "Under ₹1,500",
            recommends: ["solar-inverters/flow-3kw-ongrid"],
            note: "Usage at this level usually suits a system of roughly 1 to 2 kW.",
          },
          {
            value: "1500-3000",
            label: "₹1,500 - ₹3,000",
            recommends: ["solar-inverters/flow-3kw-ongrid"],
            note: "Usage at this level usually suits a system of roughly 2 to 3 kW.",
          },
          {
            value: "3000-6000",
            label: "₹3,000 - ₹6,000",
            recommends: ["solar-inverters/flow-5kw-hybrid"],
            note: "Usage at this level usually suits a system of roughly 3 to 5 kW.",
          },
          {
            value: "over-6000",
            label: "Over ₹6,000",
            recommends: ["solar-inverters/flow-10kw-ongrid"],
            note: "Usage at this level usually suits a system of roughly 5 to 10 kW.",
          },
        ],
      },
      {
        id: "backup",
        label: "Backup During Power Cuts",
        placeholder: "Select what you need",
        options: [
          {
            value: "none",
            label: "Not needed - just lower bills",
            /* Adds nothing: the on-grid inverter chosen above stands. */
            recommends: [],
          },
          {
            value: "essentials",
            label: "Essentials only",
            /* A later step overrides the same category, so this swaps the
               on-grid inverter for a hybrid one and adds storage. */
            recommends: [
              "solar-inverters/flow-5kw-hybrid",
              "solar-batteries/store-li-5",
            ],
          },
          {
            value: "most-of-house",
            label: "Most of the house",
            recommends: [
              "solar-inverters/flow-5kw-hybrid",
              "solar-batteries/store-li-10",
            ],
          },
          {
            value: "off-grid",
            label: "Fully off-grid, no connection",
            recommends: [
              "solar-inverters/flow-5kw-hybrid",
              "solar-batteries/store-li-10",
            ],
            note: "An off-grid system needs careful sizing - we will work through your loads with you before recommending anything.",
          },
        ],
      },
    ],
  },

  /* ------------------------------ BUSINESS ------------------------------ */
  {
    id: "business",
    label: "Business",
    helper: "Solar for shops, offices and units",
    steps: [
      {
        id: "business-type",
        label: "Type of Premises",
        placeholder: "Select premises type",
        options: [
          {
            value: "shop",
            label: "Shop or showroom",
            recommends: ["solar-panels/ray-550"],
          },
          {
            value: "office",
            label: "Office",
            recommends: ["solar-panels/ray-550"],
          },
          {
            value: "workshop",
            label: "Workshop or small unit",
            recommends: ["solar-panels/ray-550"],
          },
          {
            value: "ground-mount",
            label: "Open land or carport",
            recommends: ["solar-panels/ray-bifacial-585"],
            note: "Raised and ground-mounted arrays can use bifacial modules, which also generate from light reflected off the surface below.",
          },
        ],
      },
      {
        id: "business-bill",
        label: "Monthly Electricity Bill",
        placeholder: "Select your usual bill",
        options: [
          {
            value: "under-10k",
            label: "Under ₹10,000",
            recommends: ["solar-inverters/flow-5kw-hybrid"],
            note: "Usage at this level usually suits a system of roughly 5 kW.",
          },
          {
            value: "10k-25k",
            label: "₹10,000 - ₹25,000",
            recommends: ["solar-inverters/flow-10kw-ongrid"],
            note: "Usage at this level usually suits a system of roughly 10 kW.",
          },
          {
            value: "over-25k",
            label: "Over ₹25,000",
            recommends: ["solar-inverters/flow-10kw-ongrid"],
            note: "Above this level a system is usually built from several inverters. We will size it properly against your load profile.",
          },
        ],
      },
    ],
  },

  /* ---------------------------- WATER HEATING --------------------------- */
  {
    id: "water-heating",
    label: "Water Heating",
    helper: "Solar hot water for your home",
    steps: [
      {
        id: "household-size",
        label: "People in the Household",
        placeholder: "Select household size",
        options: [
          {
            value: "2-3",
            label: "2 - 3 people",
            recommends: ["solar-water-heaters/warm-100-etc"],
          },
          {
            value: "4-6",
            label: "4 - 6 people",
            recommends: ["solar-water-heaters/warm-200-etc"],
          },
          {
            value: "7-plus",
            label: "7 or more people",
            recommends: ["solar-water-heaters/warm-300-fpc"],
          },
          {
            value: "commercial",
            label: "Guest house or commercial use",
            recommends: ["solar-water-heaters/warm-300-fpc"],
          },
        ],
      },
      {
        id: "water-type",
        label: "Your Water Supply",
        placeholder: "Select water type",
        options: [
          {
            value: "normal",
            label: "Normal water",
            recommends: [],
          },
          {
            value: "hard",
            label: "Hard water",
            /* Overrides the heater chosen above: flat plate collectors cope
               with scaling far better than evacuated tubes. */
            recommends: ["solar-water-heaters/warm-300-fpc"],
            note: "Hard water scales up evacuated tubes quickly, so a flat plate system is usually the better long-term choice.",
          },
          {
            value: "pressurised",
            label: "Pressurised plumbing",
            recommends: ["solar-water-heaters/warm-300-fpc"],
            note: "Pressurised plumbing needs a pressure-rated system rather than a gravity-fed one.",
          },
        ],
      },
    ],
  },

  /* --------------------------- OUTDOOR LIGHTING ------------------------- */
  {
    id: "outdoor-lighting",
    label: "Outdoor Lighting",
    helper: "Solar street and area lights",
    steps: [
      {
        id: "lighting-area",
        label: "Where You Need Light",
        placeholder: "Select the location",
        options: [
          {
            value: "pathway",
            label: "Pathway, driveway or compound",
            recommends: ["solar-street-lights/beam-20"],
          },
          {
            value: "internal-road",
            label: "Internal road or parking area",
            recommends: ["solar-street-lights/beam-40"],
          },
          {
            value: "campus",
            label: "Campus, factory or layout",
            recommends: ["solar-street-lights/beam-40"],
          },
          {
            value: "main-road",
            label: "Main road or highway lane",
            recommends: ["solar-street-lights/beam-60-split"],
          },
        ],
      },
      {
        id: "lighting-shade",
        label: "Sunlight at the Pole Position",
        placeholder: "Select the conditions",
        options: [
          {
            value: "clear",
            label: "Clear sky above the pole",
            recommends: [],
          },
          {
            value: "shaded",
            label: "Shaded by trees or buildings",
            /* Overrides with a split unit so the panel can be sited apart. */
            recommends: ["solar-street-lights/beam-60-split"],
            note: "Where the pole itself is shaded, a split system lets the panel be mounted separately in clear sun.",
          },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const getFinderCategory = (
  id: FinderCategoryId,
): FinderCategoryConfig | undefined =>
  finderCategories.find((category) => category.id === id);

/** Splits a `recommends` entry into its category and product slugs. */
export function parseRecommendation(recommends: string): {
  categorySlug: string;
  productSlug: string;
} {
  const [categorySlug, productSlug] = recommends.split("/");
  return { categorySlug, productSlug };
}

/**
 * Resolves the selected options into a product shortlist.
 *
 * Rule: a later step overrides an earlier one **within the same product
 * category**, and adds to it across categories. That is what lets "I want
 * backup" swap an on-grid inverter for a hybrid one without the visitor ever
 * seeing two contradictory inverters in the result.
 */
export function resolveRecommendations(selected: FinderOption[]): string[] {
  const byCategory = new Map<string, string>();

  for (const option of selected) {
    for (const entry of option.recommends) {
      const { categorySlug } = parseRecommendation(entry);
      byCategory.set(categorySlug, entry);
    }
  }

  return [...byCategory.values()];
}

/** Guidance notes attached to the selected options, in step order. */
export const collectNotes = (selected: FinderOption[]): string[] =>
  selected.map((option) => option.note).filter((note): note is string => Boolean(note));
