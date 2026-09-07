/* =============================================================================
 * BATTERY FINDER DATA
 * =============================================================================
 *
 *  NOTE: SAMPLE FITMENT DATA - replace with the client's verified fitment
 *  chart before launch.
 *
 *  Vehicle makes and models below are real and referenced only to describe
 *  what a battery fits. The mapping from a vehicle to a recommended product is
 *  illustrative, which is why the finder always presents its result as a
 *  suggestion to confirm rather than a guarantee of fitment.
 *
 *  The shape here mirrors what a fitment API would return, so this file can be
 *  swapped for a fetch without touching the BatteryFinder component.
 * ========================================================================== */

/** Latest model year offered by the selectors. Bump when the catalogue rolls. */
export const CATALOGUE_YEAR = 2026;

export type FinderCategoryId = "car" | "bike" | "commercial" | "home-backup";

export interface FinderModel {
  value: string;
  label: string;
  /** Earliest model year offered for this entry. */
  yearFrom: number;
  /** Recommended product, as `${categorySlug}/${productSlug}`. */
  recommends: string;
}

export interface FinderGroup {
  value: string;
  label: string;
  models: FinderModel[];
}

export interface FinderCategoryConfig {
  id: FinderCategoryId;
  label: string;
  /** Short line shown under the category name on the selector tile. */
  helper: string;
  /**
   * Labels for the cascading selects. `third` is null where a year is not a
   * meaningful question (home backup), and that select is then not rendered.
   */
  fieldLabels: { first: string; second: string; third: string | null };
  groups: FinderGroup[];
}

export const finderCategories: FinderCategoryConfig[] = [
  {
    id: "car",
    label: "Car",
    helper: "Hatchbacks, sedans and SUVs",
    fieldLabels: {
      first: "Vehicle Brand",
      second: "Vehicle Model",
      third: "Year",
    },
    groups: [
      {
        value: "maruti-suzuki",
        label: "Maruti Suzuki",
        models: [
          { value: "alto-k10", label: "Alto K10", yearFrom: 2022, recommends: "car-batteries/drive-35" },
          { value: "swift", label: "Swift", yearFrom: 2018, recommends: "car-batteries/drive-35" },
          { value: "baleno", label: "Baleno", yearFrom: 2019, recommends: "car-batteries/drive-45" },
          { value: "brezza", label: "Brezza", yearFrom: 2022, recommends: "car-batteries/drive-45" },
          { value: "ertiga", label: "Ertiga", yearFrom: 2018, recommends: "car-batteries/drive-45" },
        ],
      },
      {
        value: "hyundai",
        label: "Hyundai",
        models: [
          { value: "grand-i10-nios", label: "Grand i10 Nios", yearFrom: 2019, recommends: "car-batteries/drive-35" },
          { value: "i20", label: "i20", yearFrom: 2020, recommends: "car-batteries/drive-45" },
          { value: "venue", label: "Venue", yearFrom: 2019, recommends: "car-batteries/drive-45" },
          { value: "creta", label: "Creta", yearFrom: 2020, recommends: "car-batteries/drive-65" },
        ],
      },
      {
        value: "tata",
        label: "Tata",
        models: [
          { value: "tiago", label: "Tiago", yearFrom: 2019, recommends: "car-batteries/drive-35" },
          { value: "altroz", label: "Altroz", yearFrom: 2020, recommends: "car-batteries/drive-45" },
          { value: "nexon", label: "Nexon", yearFrom: 2020, recommends: "car-batteries/drive-45" },
          { value: "harrier", label: "Harrier", yearFrom: 2019, recommends: "car-batteries/drive-65" },
        ],
      },
      {
        value: "mahindra",
        label: "Mahindra",
        models: [
          { value: "xuv300", label: "XUV300", yearFrom: 2019, recommends: "car-batteries/drive-45" },
          { value: "thar", label: "Thar", yearFrom: 2020, recommends: "car-batteries/drive-65" },
          { value: "scorpio-n", label: "Scorpio-N", yearFrom: 2022, recommends: "car-batteries/drive-65" },
          { value: "xuv700", label: "XUV700", yearFrom: 2021, recommends: "car-batteries/drive-agm-60" },
        ],
      },
      {
        value: "honda",
        label: "Honda",
        models: [
          { value: "amaze", label: "Amaze", yearFrom: 2018, recommends: "car-batteries/drive-35" },
          { value: "city", label: "City", yearFrom: 2020, recommends: "car-batteries/drive-45" },
          { value: "elevate", label: "Elevate", yearFrom: 2023, recommends: "car-batteries/drive-45" },
        ],
      },
      {
        value: "toyota",
        label: "Toyota",
        models: [
          { value: "glanza", label: "Glanza", yearFrom: 2019, recommends: "car-batteries/drive-35" },
          { value: "hyryder", label: "Urban Cruiser Hyryder", yearFrom: 2022, recommends: "car-batteries/drive-agm-60" },
          { value: "innova-crysta", label: "Innova Crysta", yearFrom: 2018, recommends: "car-batteries/drive-65" },
        ],
      },
    ],
  },

  {
    id: "bike",
    label: "Bike",
    helper: "Motorcycles and scooters",
    fieldLabels: {
      first: "Vehicle Brand",
      second: "Vehicle Model",
      third: "Year",
    },
    groups: [
      {
        value: "hero",
        label: "Hero",
        models: [
          { value: "splendor-plus", label: "Splendor Plus", yearFrom: 2019, recommends: "bike-batteries/ride-5" },
          { value: "hf-deluxe", label: "HF Deluxe", yearFrom: 2019, recommends: "bike-batteries/ride-5" },
          { value: "xtreme-125r", label: "Xtreme 125R", yearFrom: 2024, recommends: "bike-batteries/ride-5" },
          { value: "xpulse-200", label: "Xpulse 200", yearFrom: 2019, recommends: "bike-batteries/ride-9" },
        ],
      },
      {
        value: "honda-two-wheeler",
        label: "Honda",
        models: [
          { value: "shine", label: "Shine", yearFrom: 2020, recommends: "bike-batteries/ride-5" },
          { value: "activa-6g", label: "Activa 6G", yearFrom: 2020, recommends: "bike-batteries/ride-5" },
          { value: "sp-125", label: "SP 125", yearFrom: 2019, recommends: "bike-batteries/ride-5" },
          { value: "unicorn", label: "Unicorn", yearFrom: 2020, recommends: "bike-batteries/ride-9" },
        ],
      },
      {
        value: "bajaj",
        label: "Bajaj",
        models: [
          { value: "pulsar-125", label: "Pulsar 125", yearFrom: 2019, recommends: "bike-batteries/ride-5" },
          { value: "pulsar-n160", label: "Pulsar N160", yearFrom: 2022, recommends: "bike-batteries/ride-9" },
          { value: "dominar-400", label: "Dominar 400", yearFrom: 2019, recommends: "bike-batteries/ride-9" },
        ],
      },
      {
        value: "tvs",
        label: "TVS",
        models: [
          { value: "jupiter", label: "Jupiter", yearFrom: 2019, recommends: "bike-batteries/ride-5" },
          { value: "ntorq-125", label: "NTorq 125", yearFrom: 2018, recommends: "bike-batteries/ride-5" },
          { value: "raider-125", label: "Raider 125", yearFrom: 2021, recommends: "bike-batteries/ride-5" },
          { value: "apache-rtr-160", label: "Apache RTR 160", yearFrom: 2018, recommends: "bike-batteries/ride-9" },
        ],
      },
      {
        value: "royal-enfield",
        label: "Royal Enfield",
        models: [
          { value: "classic-350", label: "Classic 350", yearFrom: 2021, recommends: "bike-batteries/ride-9" },
          { value: "hunter-350", label: "Hunter 350", yearFrom: 2022, recommends: "bike-batteries/ride-9" },
          { value: "himalayan", label: "Himalayan", yearFrom: 2021, recommends: "bike-batteries/ride-14" },
          { value: "interceptor-650", label: "Interceptor 650", yearFrom: 2019, recommends: "bike-batteries/ride-14" },
        ],
      },
      {
        value: "yamaha",
        label: "Yamaha",
        models: [
          { value: "fz-s-fi", label: "FZ-S FI", yearFrom: 2019, recommends: "bike-batteries/ride-9" },
          { value: "mt-15", label: "MT-15", yearFrom: 2019, recommends: "bike-batteries/ride-9" },
          { value: "r15-v4", label: "R15 V4", yearFrom: 2021, recommends: "bike-batteries/ride-9" },
        ],
      },
    ],
  },

  {
    id: "commercial",
    label: "Commercial",
    helper: "Vans, trucks and buses",
    fieldLabels: {
      first: "Vehicle Brand",
      second: "Vehicle Model",
      third: "Year",
    },
    groups: [
      {
        value: "tata-motors",
        label: "Tata Motors",
        models: [
          { value: "ace", label: "Ace", yearFrom: 2018, recommends: "commercial-batteries/haul-88" },
          { value: "intra-v30", label: "Intra V30", yearFrom: 2019, recommends: "commercial-batteries/haul-88" },
          { value: "lpt-1109", label: "LPT 1109", yearFrom: 2018, recommends: "commercial-batteries/haul-130" },
          { value: "signa-2823", label: "Signa 2823", yearFrom: 2019, recommends: "commercial-batteries/haul-150" },
        ],
      },
      {
        value: "ashok-leyland",
        label: "Ashok Leyland",
        models: [
          { value: "dost", label: "Dost", yearFrom: 2018, recommends: "commercial-batteries/haul-88" },
          { value: "partner", label: "Partner", yearFrom: 2018, recommends: "commercial-batteries/haul-88" },
          { value: "boss-1115", label: "Boss 1115", yearFrom: 2018, recommends: "commercial-batteries/haul-130" },
          { value: "haulage-3520", label: "3520 Haulage", yearFrom: 2019, recommends: "commercial-batteries/haul-150" },
        ],
      },
      {
        value: "mahindra-commercial",
        label: "Mahindra",
        models: [
          { value: "jeeto", label: "Jeeto", yearFrom: 2018, recommends: "commercial-batteries/haul-88" },
          { value: "bolero-pickup", label: "Bolero Pickup", yearFrom: 2018, recommends: "commercial-batteries/haul-88" },
          { value: "furio-7", label: "Furio 7", yearFrom: 2019, recommends: "commercial-batteries/haul-130" },
        ],
      },
      {
        value: "eicher",
        label: "Eicher",
        models: [
          { value: "pro-2049", label: "Pro 2049", yearFrom: 2018, recommends: "commercial-batteries/haul-88" },
          { value: "pro-2110", label: "Pro 2110", yearFrom: 2018, recommends: "commercial-batteries/haul-130" },
          { value: "pro-6019", label: "Pro 6019", yearFrom: 2019, recommends: "commercial-batteries/haul-150" },
        ],
      },
    ],
  },

  {
    id: "home-backup",
    label: "Home Backup",
    helper: "Inverter batteries for home and office",
    fieldLabels: {
      first: "Home Size",
      second: "What You Want to Power",
      /* A model year is not a meaningful question for backup power. */
      third: null,
    },
    groups: [
      {
        value: "studio-1bhk",
        label: "Studio or 1 BHK",
        models: [
          { value: "essentials", label: "Lights and fans", yearFrom: 0, recommends: "inverter-batteries/home-100" },
          { value: "essentials-tv", label: "Lights, fans and TV", yearFrom: 0, recommends: "inverter-batteries/home-100" },
        ],
      },
      {
        value: "2bhk",
        label: "2 BHK",
        models: [
          { value: "essentials-tv", label: "Lights, fans and TV", yearFrom: 0, recommends: "inverter-batteries/home-100" },
          { value: "with-fridge", label: "Adding a refrigerator", yearFrom: 0, recommends: "inverter-batteries/home-150" },
        ],
      },
      {
        value: "3bhk",
        label: "3 BHK",
        models: [
          { value: "essentials-tv", label: "Lights, fans and TV", yearFrom: 0, recommends: "inverter-batteries/home-150" },
          { value: "with-fridge", label: "Adding a refrigerator", yearFrom: 0, recommends: "inverter-batteries/home-150" },
          { value: "extended", label: "Extended backup time", yearFrom: 0, recommends: "inverter-batteries/home-220" },
        ],
      },
      {
        value: "large-home-office",
        label: "Large home or small office",
        models: [
          { value: "household", label: "Household essentials", yearFrom: 0, recommends: "inverter-batteries/home-220" },
          { value: "office", label: "Office equipment", yearFrom: 0, recommends: "inverter-batteries/home-220" },
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

/** Descending year options, newest first. */
export function yearsFor(yearFrom: number): string[] {
  if (yearFrom <= 0) return [];
  const years: string[] = [];
  for (let year = CATALOGUE_YEAR; year >= yearFrom; year -= 1) {
    years.push(String(year));
  }
  return years;
}

/** Splits a `recommends` value into its category and product slugs. */
export function parseRecommendation(recommends: string): {
  categorySlug: string;
  productSlug: string;
} {
  const [categorySlug, productSlug] = recommends.split("/");
  return { categorySlug, productSlug };
}
