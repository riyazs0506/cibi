/* =============================================================================
 * PRODUCT CATALOGUE
 * =============================================================================
 *
 *  NOTE: SAMPLE CATALOGUE - replace with the client's real product range.
 *
 *  This is a structured, technically plausible range used to build and prove
 *  the UI. Every field maps 1:1 to what a real catalogue (or a future CMS /
 *  API response) would provide, so swapping the data changes nothing else.
 *
 *  Deliberately absent: prices, ratings, reviews and stock counts. None of
 *  those are invented here, and none appear in the Product structured data.
 * ========================================================================== */

export interface SpecRow {
  label: string;
  value: string;
}

export interface Product {
  /** URL segment: /products/[category]/[slug] */
  slug: string;
  name: string;
  /** Parent category slug - see data/categories.ts */
  category: string;
  /** One-line positioning statement for cards. */
  tagline: string;
  /** 1-2 sentence description used on cards and in meta descriptions. */
  summary: string;

  /* -- The five headline attributes shown on every product card ----------- */
  type: string;
  capacity: string;
  voltage: string;
  warranty: string;
  application: string;

  featured: boolean;
  image: string;
  imageAlt: string;

  /* -- Detail page content ------------------------------------------------ */
  overview: string[];
  specs: SpecRow[];
  applications: string[];
  warrantyNote: string;
}

export const products: Product[] = [
  /* ------------------------------- CAR ---------------------------------- */
  {
    slug: "drive-35",
    name: "Cibi Drive 35",
    category: "car-batteries",
    tagline: "Everyday starting power for compact cars.",
    summary:
      "A maintenance-free battery sized for hatchbacks and compact cars, built for dependable starts on short daily trips.",
    type: "Maintenance-Free (MF)",
    capacity: "35 Ah",
    voltage: "12 V",
    warranty: "36 months",
    application: "Hatchbacks and compact cars",
    featured: true,
    image: "/images/product-cibi-drive-35-car-battery.svg",
    imageAlt: "Cibi Drive 35 maintenance-free car battery, front three-quarter view",
    overview: [
      "The Drive 35 is built for the way most cars are actually used: short trips, frequent stops and a long wait on the driveway overnight. Its sealed, maintenance-free design means there is no topping up to remember and no routine checks to schedule.",
      "Calcium-alloy plates help the battery hold charge between drives, so it starts confidently on cold mornings and after a weekend at rest.",
    ],
    specs: [
      { label: "Battery technology", value: "Maintenance-free, calcium-alloy flooded" },
      { label: "Nominal capacity (C20)", value: "35 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "300 CCA" },
      { label: "Terminal layout", value: "Standard, right-hand positive" },
      { label: "Approximate dimensions", value: "197 x 129 x 227 mm (L x W x H)" },
      { label: "Approximate weight", value: "9.8 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "36 months" },
    ],
    applications: [
      "Petrol and diesel hatchbacks",
      "Compact sedans used for city commuting",
      "Vehicles doing frequent short journeys",
    ],
    warrantyNote:
      "Covered by a 36-month warranty against manufacturing defects. Keep your purchase invoice - it is needed for any warranty assessment.",
  },
  {
    slug: "drive-45",
    name: "Cibi Drive 45",
    category: "car-batteries",
    tagline: "Balanced power for sedans and compact SUVs.",
    summary:
      "A mid-capacity maintenance-free battery for sedans and compact SUVs, with headroom for air-conditioning, infotainment and daily electrical load.",
    type: "Maintenance-Free (MF)",
    capacity: "45 Ah",
    voltage: "12 V",
    warranty: "48 months",
    application: "Sedans and compact SUVs",
    featured: true,
    image: "/images/product-cibi-drive-45-car-battery.svg",
    imageAlt: "Cibi Drive 45 maintenance-free car battery, front three-quarter view",
    overview: [
      "Modern cars ask more of a battery than they used to. Between climate control, infotainment and a growing list of electronics, there is a steady draw even before the engine turns over.",
      "The Drive 45 carries enough reserve capacity to take that in its stride, while staying within the fitment most sedans and compact SUVs expect.",
    ],
    specs: [
      { label: "Battery technology", value: "Maintenance-free, calcium-alloy flooded" },
      { label: "Nominal capacity (C20)", value: "45 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "380 CCA" },
      { label: "Terminal layout", value: "Standard, right-hand positive" },
      { label: "Approximate dimensions", value: "232 x 173 x 222 mm (L x W x H)" },
      { label: "Approximate weight", value: "12.4 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "48 months" },
    ],
    applications: [
      "Mid-size petrol and diesel sedans",
      "Compact SUVs and crossovers",
      "Vehicles with higher accessory load",
    ],
    warrantyNote:
      "Covered by a 48-month warranty against manufacturing defects. Keep your purchase invoice - it is needed for any warranty assessment.",
  },
  {
    slug: "drive-65",
    name: "Cibi Drive 65",
    category: "car-batteries",
    tagline: "Higher reserve for larger vehicles.",
    summary:
      "A high-capacity car battery for SUVs and premium sedans that carry more electronics and spend longer between drives.",
    type: "Maintenance-Free (MF)",
    capacity: "65 Ah",
    voltage: "12 V",
    warranty: "60 months",
    application: "SUVs and premium sedans",
    featured: false,
    image: "/images/product-cibi-drive-65-car-battery.svg",
    imageAlt: "Cibi Drive 65 high-capacity car battery, front three-quarter view",
    overview: [
      "Larger engines need more to turn them over, and larger vehicles tend to carry more electronics that keep drawing quietly after the key is out.",
      "The Drive 65 answers both with additional reserve capacity and a higher cranking figure, without asking anything of you in the way of maintenance.",
    ],
    specs: [
      { label: "Battery technology", value: "Maintenance-free, calcium-alloy flooded" },
      { label: "Nominal capacity (C20)", value: "65 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "540 CCA" },
      { label: "Terminal layout", value: "Standard, right-hand positive" },
      { label: "Approximate dimensions", value: "242 x 175 x 190 mm (L x W x H)" },
      { label: "Approximate weight", value: "16.2 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "60 months" },
    ],
    applications: [
      "Full-size SUVs and MPVs",
      "Premium sedans with high electrical load",
      "Vehicles left parked for several days at a time",
    ],
    warrantyNote:
      "Covered by a 60-month warranty against manufacturing defects. Keep your purchase invoice - it is needed for any warranty assessment.",
  },
  {
    slug: "drive-agm-60",
    name: "Cibi Drive AGM 60",
    category: "car-batteries",
    tagline: "Made for start-stop driving.",
    summary:
      "An absorbent glass mat battery for vehicles with start-stop systems, built to handle repeated restarts in stop-go traffic.",
    type: "Absorbent Glass Mat (AGM)",
    capacity: "60 Ah",
    voltage: "12 V",
    warranty: "60 months",
    application: "Start-stop equipped vehicles",
    featured: true,
    image: "/images/product-cibi-drive-agm-60-car-battery.svg",
    imageAlt: "Cibi Drive AGM 60 start-stop car battery, front three-quarter view",
    overview: [
      "A start-stop system can restart an engine dozens of times on a single commute. That pattern wears out a conventional battery far faster than ordinary driving does.",
      "AGM construction holds the electrolyte in a glass mat rather than as free liquid, which suits frequent partial-charge cycling and makes the battery more tolerant of vibration. If your vehicle was supplied with an AGM battery, it should be replaced with one.",
    ],
    specs: [
      { label: "Battery technology", value: "Absorbent Glass Mat (AGM), valve-regulated" },
      { label: "Nominal capacity (C20)", value: "60 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "600 CCA" },
      { label: "Terminal layout", value: "Standard, right-hand positive" },
      { label: "Approximate dimensions", value: "242 x 175 x 190 mm (L x W x H)" },
      { label: "Approximate weight", value: "17.5 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "60 months" },
    ],
    applications: [
      "Vehicles with automatic start-stop",
      "Cars with regenerative braking systems",
      "Heavy stop-go city driving",
    ],
    warrantyNote:
      "Covered by a 60-month warranty against manufacturing defects. AGM batteries should be fitted and registered to the vehicle correctly - we can help with this.",
  },

  /* ------------------------------- BIKE --------------------------------- */
  {
    slug: "ride-5",
    name: "Cibi Ride 5",
    category: "bike-batteries",
    tagline: "Compact starting power for commuters.",
    summary:
      "A sealed, spill-resistant battery for commuter motorcycles, sized for daily starts and short city rides.",
    type: "Valve-Regulated Lead Acid (VRLA)",
    capacity: "5 Ah",
    voltage: "12 V",
    warranty: "24 months",
    application: "Commuter motorcycles",
    featured: true,
    image: "/images/product-cibi-ride-5-bike-battery.svg",
    imageAlt: "Cibi Ride 5 sealed commuter motorcycle battery",
    overview: [
      "Commuter motorcycles ask for a small battery that simply works: enough to spin the starter every morning, and enough to run lights and indicators without complaint.",
      "The Ride 5 is fully sealed, so there is nothing to top up and no risk of spillage as the bike leans and moves.",
    ],
    specs: [
      { label: "Battery technology", value: "Sealed VRLA, absorbent glass mat" },
      { label: "Nominal capacity (C10)", value: "5 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Approximate dimensions", value: "113 x 70 x 105 mm (L x W x H)" },
      { label: "Approximate weight", value: "1.9 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "24 months" },
    ],
    applications: [
      "100cc-150cc commuter motorcycles",
      "Self-start bikes used daily",
      "Bikes parked outdoors overnight",
    ],
    warrantyNote:
      "Covered by a 24-month warranty against manufacturing defects. Keep your purchase invoice for any warranty assessment.",
  },
  {
    slug: "ride-9",
    name: "Cibi Ride 9",
    category: "bike-batteries",
    tagline: "Steady power for scooters and mid-size bikes.",
    summary:
      "A mid-capacity sealed battery for scooters and mid-size motorcycles carrying extra lighting and electrical accessories.",
    type: "Valve-Regulated Lead Acid (VRLA)",
    capacity: "9 Ah",
    voltage: "12 V",
    warranty: "30 months",
    application: "Scooters and mid-size motorcycles",
    featured: false,
    image: "/images/product-cibi-ride-9-bike-battery.svg",
    imageAlt: "Cibi Ride 9 sealed scooter and motorcycle battery",
    overview: [
      "Scooters and mid-size motorcycles often run more electrical load than their smaller siblings - brighter headlamps, digital consoles and occasionally a phone charger.",
      "The Ride 9 carries the extra capacity to support that while still starting reliably after a few days standing still.",
    ],
    specs: [
      { label: "Battery technology", value: "Sealed VRLA, absorbent glass mat" },
      { label: "Nominal capacity (C10)", value: "9 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Approximate dimensions", value: "150 x 87 x 105 mm (L x W x H)" },
      { label: "Approximate weight", value: "3.1 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "30 months" },
    ],
    applications: [
      "125cc-200cc scooters",
      "Mid-size motorcycles with digital consoles",
      "Bikes fitted with auxiliary lighting",
    ],
    warrantyNote:
      "Covered by a 30-month warranty against manufacturing defects. Keep your purchase invoice for any warranty assessment.",
  },
  {
    slug: "ride-14",
    name: "Cibi Ride 14",
    category: "bike-batteries",
    tagline: "Higher capacity for larger motorcycles.",
    summary:
      "A higher-capacity sealed battery for larger-displacement motorcycles with heavier starting demands.",
    type: "Valve-Regulated Lead Acid (VRLA)",
    capacity: "14 Ah",
    voltage: "12 V",
    warranty: "36 months",
    application: "Higher-capacity motorcycles",
    featured: false,
    image: "/images/product-cibi-ride-14-bike-battery.svg",
    imageAlt: "Cibi Ride 14 high-capacity motorcycle battery",
    overview: [
      "Larger motorcycles need noticeably more current to turn over, particularly when the engine is cold or the bike has been standing for a week.",
      "The Ride 14 provides that headroom in a sealed, vibration-tolerant case suited to touring and higher-displacement machines.",
    ],
    specs: [
      { label: "Battery technology", value: "Sealed VRLA, absorbent glass mat" },
      { label: "Nominal capacity (C10)", value: "14 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Approximate dimensions", value: "150 x 87 x 145 mm (L x W x H)" },
      { label: "Approximate weight", value: "4.6 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "36 months" },
    ],
    applications: [
      "250cc and above motorcycles",
      "Touring bikes used on long rides",
      "Motorcycles stored between weekend use",
    ],
    warrantyNote:
      "Covered by a 36-month warranty against manufacturing defects. Keep your purchase invoice for any warranty assessment.",
  },

  /* ---------------------------- COMMERCIAL ------------------------------ */
  {
    slug: "haul-88",
    name: "Cibi Haul 88",
    category: "commercial-batteries",
    tagline: "Dependable starts for light commercial use.",
    summary:
      "A maintenance-free battery for light commercial vehicles making repeated stops through a working day.",
    type: "Maintenance-Free (MF)",
    capacity: "88 Ah",
    voltage: "12 V",
    warranty: "24 months",
    application: "Light commercial vehicles",
    featured: true,
    image: "/images/product-cibi-haul-88-commercial-battery.svg",
    imageAlt: "Cibi Haul 88 commercial vehicle battery with carry handles",
    overview: [
      "A delivery vehicle may start and stop twenty times before lunch. Each restart draws heavily on the battery, and there is rarely a long run afterwards to put the charge back.",
      "The Haul 88 is built around that duty cycle, with the reserve capacity to keep a working vehicle working.",
    ],
    specs: [
      { label: "Battery technology", value: "Maintenance-free, calcium-alloy flooded" },
      { label: "Nominal capacity (C20)", value: "88 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "680 CCA" },
      { label: "Terminal layout", value: "Standard commercial, left-hand positive" },
      { label: "Approximate dimensions", value: "306 x 175 x 225 mm (L x W x H)" },
      { label: "Approximate weight", value: "21.5 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "24 months" },
    ],
    applications: [
      "Delivery vans and pickups",
      "Small passenger transport vehicles",
      "Fleet vehicles with frequent restarts",
    ],
    warrantyNote:
      "Covered by a 24-month commercial warranty against manufacturing defects. Commercial use terms differ from private use - we will explain what applies to you.",
  },
  {
    slug: "haul-130",
    name: "Cibi Haul 130",
    category: "commercial-batteries",
    tagline: "Sustained power for trucks and buses.",
    summary:
      "A high-capacity commercial battery for trucks and buses running long shifts with substantial electrical load.",
    type: "Maintenance-Free (MF)",
    capacity: "130 Ah",
    voltage: "12 V",
    warranty: "24 months",
    application: "Trucks and buses",
    featured: false,
    image: "/images/product-cibi-haul-130-commercial-battery.svg",
    imageAlt: "Cibi Haul 130 high-capacity truck and bus battery",
    overview: [
      "Trucks and buses run more than an engine. Lighting, refrigeration, tail lifts and cabin electronics all draw from the same source, often while the vehicle is stationary.",
      "The Haul 130 provides the capacity to support that load across a full shift and still turn a large engine over at the end of it.",
    ],
    specs: [
      { label: "Battery technology", value: "Maintenance-free, calcium-alloy flooded" },
      { label: "Nominal capacity (C20)", value: "130 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "900 CCA" },
      { label: "Terminal layout", value: "Standard commercial, left-hand positive" },
      { label: "Approximate dimensions", value: "410 x 175 x 225 mm (L x W x H)" },
      { label: "Approximate weight", value: "32.0 kg" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "24 months" },
    ],
    applications: [
      "Medium and heavy goods vehicles",
      "Passenger buses and coaches",
      "Vehicles with auxiliary electrical equipment",
    ],
    warrantyNote:
      "Covered by a 24-month commercial warranty against manufacturing defects. Commercial use terms differ from private use - we will explain what applies to you.",
  },
  {
    slug: "haul-150",
    name: "Cibi Haul 150",
    category: "commercial-batteries",
    tagline: "Long-haul capacity for demanding routes.",
    summary:
      "A serviceable flooded battery for long-haul transport, built for high daily mileage and extended idling.",
    type: "Flooded lead-acid, serviceable",
    capacity: "150 Ah",
    voltage: "12 V",
    warranty: "30 months",
    application: "Long-haul trucks",
    featured: false,
    image: "/images/product-cibi-haul-150-commercial-battery.svg",
    imageAlt: "Cibi Haul 150 long-haul truck battery with removable vent caps",
    overview: [
      "Long-distance transport puts a battery through wide temperature swings, long idle periods and constant vibration.",
      "The Haul 150 uses a thicker-plate flooded construction that tolerates that treatment, and remains serviceable so electrolyte levels can be checked and topped up during routine maintenance.",
    ],
    specs: [
      { label: "Battery technology", value: "Flooded lead-acid, serviceable vent caps" },
      { label: "Nominal capacity (C20)", value: "150 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "1000 CCA" },
      { label: "Terminal layout", value: "Standard commercial, left-hand positive" },
      { label: "Approximate dimensions", value: "510 x 220 x 225 mm (L x W x H)" },
      { label: "Approximate weight", value: "42.0 kg" },
      { label: "Maintenance", value: "Periodic electrolyte check recommended" },
      { label: "Warranty", value: "30 months" },
    ],
    applications: [
      "Long-haul freight vehicles",
      "Tippers and construction transport",
      "Vehicles with long idling periods",
    ],
    warrantyNote:
      "Covered by a 30-month commercial warranty against manufacturing defects. Warranty assumes electrolyte levels have been maintained as recommended.",
  },

  /* ---------------------------- HEAVY-DUTY ------------------------------ */
  {
    slug: "force-180",
    name: "Cibi Force 180",
    category: "heavy-duty-batteries",
    tagline: "Built for construction and earth-moving.",
    summary:
      "A tubular-plate heavy-duty battery for construction and earth-moving equipment working in dust, heat and constant vibration.",
    type: "Tubular flooded",
    capacity: "180 Ah",
    voltage: "12 V",
    warranty: "30 months",
    application: "Construction and earth-moving equipment",
    featured: true,
    image: "/images/product-cibi-force-180-heavy-duty-battery.svg",
    imageAlt: "Cibi Force 180 heavy-duty tubular battery for construction equipment",
    overview: [
      "Site machinery is hard on batteries. Vibration loosens plates, dust finds every opening, and equipment often sits idle for days between jobs.",
      "The Force 180 uses tubular plates and a reinforced case to withstand that, holding up to repeated deep discharge better than a conventional starting battery.",
    ],
    specs: [
      { label: "Battery technology", value: "Tubular plate, flooded lead-acid" },
      { label: "Nominal capacity (C20)", value: "180 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "1100 CCA" },
      { label: "Terminal layout", value: "Heavy-duty threaded posts" },
      { label: "Approximate dimensions", value: "513 x 223 x 223 mm (L x W x H)" },
      { label: "Approximate weight", value: "48.5 kg" },
      { label: "Maintenance", value: "Periodic electrolyte check recommended" },
      { label: "Warranty", value: "30 months" },
    ],
    applications: [
      "Excavators and loaders",
      "Site generators and compressors",
      "Equipment left idle between jobs",
    ],
    warrantyNote:
      "Covered by a 30-month warranty against manufacturing defects. Warranty assumes correct installation and recommended electrolyte maintenance.",
  },
  {
    slug: "force-200",
    name: "Cibi Force 200",
    category: "heavy-duty-batteries",
    tagline: "Deep reserve for machinery and generator sets.",
    summary:
      "A high-capacity tubular battery for agricultural machinery and standby generator sets that need dependable power on demand.",
    type: "Tubular flooded",
    capacity: "200 Ah",
    voltage: "12 V",
    warranty: "36 months",
    application: "Agricultural machinery and generator sets",
    featured: false,
    image: "/images/product-cibi-force-200-heavy-duty-battery.svg",
    imageAlt: "Cibi Force 200 high-capacity tubular battery for generator sets",
    overview: [
      "A standby generator is judged on a single moment: whether it starts when everything else has stopped. That places unusual demands on a battery which may have been sitting for months.",
      "The Force 200 combines high capacity with tubular plates that hold charge well over long idle periods, making it equally suited to agricultural machinery used seasonally.",
    ],
    specs: [
      { label: "Battery technology", value: "Tubular plate, flooded lead-acid" },
      { label: "Nominal capacity (C20)", value: "200 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Cold cranking amps", value: "1200 CCA" },
      { label: "Terminal layout", value: "Heavy-duty threaded posts" },
      { label: "Approximate dimensions", value: "518 x 276 x 242 mm (L x W x H)" },
      { label: "Approximate weight", value: "56.0 kg" },
      { label: "Maintenance", value: "Periodic electrolyte check recommended" },
      { label: "Warranty", value: "36 months" },
    ],
    applications: [
      "Tractors and harvesters",
      "Standby and prime generator sets",
      "Seasonal or intermittently used machinery",
    ],
    warrantyNote:
      "Covered by a 36-month warranty against manufacturing defects. Warranty assumes correct installation and recommended electrolyte maintenance.",
  },

  /* ----------------------------- INVERTER ------------------------------- */
  {
    slug: "home-100",
    name: "Cibi Home 100",
    category: "inverter-batteries",
    tagline: "Steady backup for smaller homes.",
    summary:
      "A tall tubular inverter battery sized for apartments and smaller homes running lights, fans and a few essentials.",
    type: "Tall tubular",
    capacity: "100 Ah",
    voltage: "12 V",
    warranty: "36 months",
    application: "Apartments and smaller homes",
    featured: true,
    image: "/images/product-cibi-home-100-inverter-battery.svg",
    imageAlt: "Cibi Home 100 tall tubular inverter battery for home backup",
    overview: [
      "Backup power is mostly about the essentials - keeping lights on, fans running and a router alive until the supply returns.",
      "The Home 100 is sized for exactly that in an apartment or smaller home, with tubular plates built for the daily charge-and-discharge cycle that inverter use involves.",
    ],
    specs: [
      { label: "Battery technology", value: "Tall tubular, flooded lead-acid" },
      { label: "Nominal capacity (C20)", value: "100 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Typical use", value: "Lights, fans, television, router" },
      { label: "Approximate dimensions", value: "260 x 180 x 400 mm (L x W x H)" },
      { label: "Approximate weight", value: "28.0 kg" },
      { label: "Maintenance", value: "Periodic electrolyte check recommended" },
      { label: "Warranty", value: "36 months" },
    ],
    applications: [
      "Studio apartments and 1-2 BHK homes",
      "Backup for lights, fans and a router",
      "Areas with short, regular power cuts",
    ],
    warrantyNote:
      "Covered by a 36-month warranty against manufacturing defects. Warranty assumes use with a compatible inverter and recommended electrolyte maintenance.",
  },
  {
    slug: "home-150",
    name: "Cibi Home 150",
    category: "inverter-batteries",
    tagline: "Longer backup for family homes.",
    summary:
      "A tall tubular inverter battery for family homes needing longer backup across more rooms and appliances.",
    type: "Tall tubular",
    capacity: "150 Ah",
    voltage: "12 V",
    warranty: "48 months",
    application: "Family homes",
    featured: true,
    image: "/images/product-cibi-home-150-inverter-battery.svg",
    imageAlt: "Cibi Home 150 tall tubular inverter battery for family homes",
    overview: [
      "A family home draws more, and for longer. More rooms to light, more fans running and often a refrigerator that should not be left off.",
      "The Home 150 adds meaningful capacity over the Home 100, extending backup time without needing a larger inverter in most cases.",
    ],
    specs: [
      { label: "Battery technology", value: "Tall tubular, flooded lead-acid" },
      { label: "Nominal capacity (C20)", value: "150 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Typical use", value: "Lights, fans, television, router, refrigerator" },
      { label: "Approximate dimensions", value: "505 x 190 x 410 mm (L x W x H)" },
      { label: "Approximate weight", value: "42.0 kg" },
      { label: "Maintenance", value: "Periodic electrolyte check recommended" },
      { label: "Warranty", value: "48 months" },
    ],
    applications: [
      "2-3 BHK family homes",
      "Backup including a refrigerator",
      "Areas with longer or frequent power cuts",
    ],
    warrantyNote:
      "Covered by a 48-month warranty against manufacturing defects. Warranty assumes use with a compatible inverter and recommended electrolyte maintenance.",
  },
  {
    slug: "home-220",
    name: "Cibi Home 220",
    category: "inverter-batteries",
    tagline: "Extended backup for large homes and offices.",
    summary:
      "A high-capacity tall tubular battery for large homes and small offices that need extended backup through long outages.",
    type: "Tall tubular",
    capacity: "220 Ah",
    voltage: "12 V",
    warranty: "60 months",
    application: "Large homes and small offices",
    featured: false,
    image: "/images/product-cibi-home-220-inverter-battery.svg",
    imageAlt: "Cibi Home 220 high-capacity tall tubular inverter battery",
    overview: [
      "Where outages run long, capacity is what buys time. A small office also has less tolerance for interruption than a home does - work simply stops.",
      "The Home 220 is the largest battery in the Home range, intended for extended backup and paired with a correspondingly sized inverter.",
    ],
    specs: [
      { label: "Battery technology", value: "Tall tubular, flooded lead-acid" },
      { label: "Nominal capacity (C20)", value: "220 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Typical use", value: "Whole-home essentials, office equipment" },
      { label: "Approximate dimensions", value: "505 x 190 x 495 mm (L x W x H)" },
      { label: "Approximate weight", value: "58.0 kg" },
      { label: "Maintenance", value: "Periodic electrolyte check recommended" },
      { label: "Warranty", value: "60 months" },
    ],
    applications: [
      "Large homes and duplexes",
      "Small offices and clinics",
      "Areas with extended power cuts",
    ],
    warrantyNote:
      "Covered by a 60-month warranty against manufacturing defects. Warranty assumes use with a compatible inverter and recommended electrolyte maintenance.",
  },
];

/* -------------------------------------------------------------------------- */
/* Selectors - the only way pages should reach into the catalogue.            */
/* -------------------------------------------------------------------------- */

export const getProductsByCategory = (categorySlug: string): Product[] =>
  products.filter((product) => product.category === categorySlug);

export const getProduct = (
  categorySlug: string,
  productSlug: string,
): Product | undefined =>
  products.find(
    (product) => product.category === categorySlug && product.slug === productSlug,
  );

export const getFeaturedProducts = (): Product[] =>
  products.filter((product) => product.featured);

/** Other products in the same category, for the "Related products" rail. */
export const getRelatedProducts = (product: Product, limit = 3): Product[] =>
  products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);

export const productPath = (product: Product): string =>
  `/products/${product.category}/${product.slug}`;
