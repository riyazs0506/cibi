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
 *  Deliberately absent: prices, subsidy amounts, ratings, reviews and stock
 *  counts. None are invented here, and none appear in the Product structured
 *  data. Generation and savings figures depend entirely on location, roof and
 *  usage, so the site describes equipment rather than promising an outcome.
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

  /* -- The five headline attributes shown on every product card ----------- *
   * Named generically on purpose: the same five slots have to read sensibly
   * for a panel, an inverter, a battery, a water heater and a street light.  */
  /** Underlying technology, e.g. "Monocrystalline PERC". */
  type: string;
  /** Headline size, e.g. "550 W", "5 kW", "200 LPD". */
  capacity: string;
  /** What it delivers, e.g. "41.8 V (Vmp)", "230 V AC", "6,000 lm". */
  output: string;
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
  /* ---------------------------- SOLAR PANELS ---------------------------- */
  {
    slug: "ray-400",
    name: "Cibi Ray 400",
    category: "solar-panels",
    tagline: "A dependable module for compact rooftops.",
    summary:
      "A 400 W monocrystalline half-cut panel sized for homes where roof space is limited but output still matters.",
    type: "Monocrystalline half-cut",
    capacity: "400 W",
    output: "37.2 V (Vmp)",
    warranty: "12 yr product / 25 yr performance",
    application: "Homes with limited roof space",
    featured: true,
    image: "/images/product-cibi-ray-400-solar-panel.svg",
    imageAlt: "Cibi Ray 400 monocrystalline solar panel, angled front view",
    overview: [
      "Not every roof is a wide open terrace. Parapets, water tanks, stairwell housings and shade from a neighbouring building all eat into the space you actually have to work with.",
      "The Ray 400 is a physically smaller module that still carries a strong output per square metre, which makes it easier to fit a worthwhile system onto an awkward roof.",
      "Half-cut cell construction reduces resistive losses and keeps more of the array producing when part of it falls into shade.",
    ],
    specs: [
      { label: "Cell technology", value: "Monocrystalline PERC, half-cut" },
      { label: "Rated power (Pmax)", value: "400 W" },
      { label: "Module efficiency", value: "20.6%" },
      { label: "Voltage at max power (Vmp)", value: "37.2 V" },
      { label: "Current at max power (Imp)", value: "10.75 A" },
      { label: "Open circuit voltage (Voc)", value: "44.8 V" },
      { label: "Number of cells", value: "108 (6 x 18)" },
      { label: "Approximate dimensions", value: "1,722 x 1,134 x 30 mm" },
      { label: "Approximate weight", value: "21.5 kg" },
      { label: "Frame", value: "Anodised aluminium alloy" },
      { label: "Front glass", value: "3.2 mm tempered, anti-reflective" },
      { label: "Operating temperature", value: "-40 °C to +85 °C" },
      { label: "Product warranty", value: "12 years" },
      { label: "Performance warranty", value: "25 years to 84.8% output" },
    ],
    applications: [
      "Homes with small or interrupted roof areas",
      "Rooftops with parapets, tanks or partial shading",
      "Extending an existing array where space is tight",
    ],
    warrantyNote:
      "Covered by a 12-year product warranty against manufacturing defects and a 25-year linear performance warranty. Keep your purchase invoice and installation record - both are needed for any claim.",
  },
  {
    slug: "ray-550",
    name: "Cibi Ray 550",
    category: "solar-panels",
    tagline: "The everyday workhorse for rooftop systems.",
    summary:
      "A 550 W monocrystalline half-cut panel that balances output, cost and handling - the module most rooftop systems are built around.",
    type: "Monocrystalline half-cut",
    capacity: "550 W",
    output: "41.8 V (Vmp)",
    warranty: "12 yr product / 25 yr performance",
    application: "Homes and small businesses",
    featured: true,
    image: "/images/product-cibi-ray-550-solar-panel.svg",
    imageAlt: "Cibi Ray 550 monocrystalline solar panel, angled front view",
    overview: [
      "The Ray 550 is the module most residential and small commercial systems end up using, and for good reason: it produces enough that you need fewer panels, while staying light enough for two people to handle safely on a roof.",
      "Fewer panels means fewer mounting points, less cabling and a quicker installation - which shows up in the total cost of the system, not just the price of the module.",
      "A 25-year linear performance warranty means output is guaranteed to decline slowly and predictably rather than falling off a cliff.",
    ],
    specs: [
      { label: "Cell technology", value: "Monocrystalline PERC, half-cut" },
      { label: "Rated power (Pmax)", value: "550 W" },
      { label: "Module efficiency", value: "21.3%" },
      { label: "Voltage at max power (Vmp)", value: "41.8 V" },
      { label: "Current at max power (Imp)", value: "13.16 A" },
      { label: "Open circuit voltage (Voc)", value: "49.9 V" },
      { label: "Number of cells", value: "144 (6 x 24)" },
      { label: "Approximate dimensions", value: "2,278 x 1,134 x 35 mm" },
      { label: "Approximate weight", value: "27.5 kg" },
      { label: "Frame", value: "Anodised aluminium alloy" },
      { label: "Front glass", value: "3.2 mm tempered, anti-reflective" },
      { label: "Operating temperature", value: "-40 °C to +85 °C" },
      { label: "Product warranty", value: "12 years" },
      { label: "Performance warranty", value: "25 years to 84.8% output" },
    ],
    applications: [
      "Residential rooftop systems",
      "Small commercial and shop rooftops",
      "Ground-mounted arrays with room to spread out",
    ],
    warrantyNote:
      "Covered by a 12-year product warranty against manufacturing defects and a 25-year linear performance warranty. Keep your purchase invoice and installation record - both are needed for any claim.",
  },
  {
    slug: "ray-bifacial-585",
    name: "Cibi Ray Bifacial 585",
    category: "solar-panels",
    tagline: "Generates from both faces on the right roof.",
    summary:
      "A 585 W bifacial module with a glass back sheet that also picks up light reflected from the surface beneath it.",
    type: "Bifacial monocrystalline",
    capacity: "585 W",
    output: "42.6 V (Vmp)",
    warranty: "15 yr product / 30 yr performance",
    application: "Elevated and ground-mounted arrays",
    featured: false,
    image: "/images/product-cibi-ray-bifacial-585-solar-panel.svg",
    imageAlt:
      "Cibi Ray Bifacial 585 dual-glass solar panel showing its transparent rear face",
    overview: [
      "A bifacial panel has glass on both faces instead of a plastic back sheet, so light bouncing off the surface underneath is also converted into power.",
      "How much that adds depends entirely on what the panel sits above and how far it is raised. A pale terrace or an elevated ground mount can gain meaningfully; a panel lying flat against a dark roof will gain almost nothing.",
      "Because of that, this module is worth specifying when the mounting suits it - which is something we will tell you honestly after looking at your site.",
    ],
    specs: [
      { label: "Cell technology", value: "Bifacial monocrystalline, dual glass" },
      { label: "Rated power, front (Pmax)", value: "585 W" },
      { label: "Bifaciality factor", value: "70% ± 5%" },
      { label: "Module efficiency", value: "22.6%" },
      { label: "Voltage at max power (Vmp)", value: "42.6 V" },
      { label: "Current at max power (Imp)", value: "13.73 A" },
      { label: "Open circuit voltage (Voc)", value: "50.8 V" },
      { label: "Approximate dimensions", value: "2,278 x 1,134 x 30 mm" },
      { label: "Approximate weight", value: "32.4 kg" },
      { label: "Glass", value: "2.0 mm tempered front and rear" },
      { label: "Operating temperature", value: "-40 °C to +85 °C" },
      { label: "Product warranty", value: "15 years" },
      { label: "Performance warranty", value: "30 years to 87.4% output" },
    ],
    applications: [
      "Elevated ground-mounted arrays",
      "Raised structures over light-coloured terraces",
      "Carport and canopy installations",
    ],
    warrantyNote:
      "Covered by a 15-year product warranty and a 30-year linear performance warranty on front-side output. Rear-side gain depends on mounting height and the surface below, and is not warranted as a fixed figure.",
  },

  /* --------------------------- SOLAR INVERTERS -------------------------- */
  {
    slug: "flow-3kw-ongrid",
    name: "Cibi Flow 3kW On-Grid",
    category: "solar-inverters",
    tagline: "A straightforward start for a home system.",
    summary:
      "A single-phase 3 kW grid-tied inverter for homes that want to cut their bill without adding battery storage.",
    type: "On-grid (grid-tied)",
    capacity: "3 kW",
    output: "230 V AC, single phase",
    warranty: "5 years",
    application: "Small homes on a grid connection",
    featured: true,
    image: "/images/product-cibi-flow-3kw-ongrid-solar-inverter.svg",
    imageAlt: "Cibi Flow 3kW on-grid solar inverter, wall mounted",
    overview: [
      "An on-grid inverter is the simplest kind of solar system. Your panels feed the house directly, anything left over goes back to the grid, and the grid covers you at night - there is no battery to buy, maintain or eventually replace.",
      "The trade-off is that a grid-tied system shuts down during a power cut for the safety of anyone working on the line. If outages are a concern where you live, a hybrid inverter is the better fit.",
      "Dual MPPT trackers let you run panels on two different roof faces without one dragging down the other.",
    ],
    specs: [
      { label: "Inverter type", value: "On-grid (grid-tied), transformerless" },
      { label: "Rated AC output", value: "3,000 W" },
      { label: "Maximum DC input", value: "4,500 W" },
      { label: "MPPT trackers", value: "2" },
      { label: "MPPT voltage range", value: "80 - 550 V" },
      { label: "Maximum efficiency", value: "97.6%" },
      { label: "AC output", value: "230 V, 50 Hz, single phase" },
      { label: "Monitoring", value: "Wi-Fi, with mobile app" },
      { label: "Protection rating", value: "IP65" },
      { label: "Cooling", value: "Natural convection, fanless" },
      { label: "Behaviour in a power cut", value: "Shuts down (anti-islanding)" },
      { label: "Warranty", value: "5 years" },
    ],
    applications: [
      "Homes with a reliable grid connection",
      "Systems built to reduce the monthly bill",
      "Net-metering and gross-metering connections",
    ],
    warrantyNote:
      "Covered by a 5-year manufacturer warranty against defects. Warranty assumes installation by a competent installer and correct earthing and surge protection.",
  },
  {
    slug: "flow-5kw-hybrid",
    name: "Cibi Flow 5kW Hybrid",
    category: "solar-inverters",
    tagline: "Solar by day, stored power when the grid fails.",
    summary:
      "A single-phase 5 kW hybrid inverter that runs your home from solar, charges a battery, and keeps essentials alive through a power cut.",
    type: "Hybrid (grid + battery)",
    capacity: "5 kW",
    output: "230 V AC, single phase",
    warranty: "5 years",
    application: "Homes wanting backup as well as savings",
    featured: true,
    image: "/images/product-cibi-flow-5kw-hybrid-solar-inverter.svg",
    imageAlt: "Cibi Flow 5kW hybrid solar inverter with status display",
    overview: [
      "A hybrid inverter does two jobs at once. Through the day it runs the house from solar and puts the surplus into a battery; when the grid drops, it switches over fast enough that most equipment never notices.",
      "That makes it the right choice where outages are common, or where you simply do not want to think about them. You can start without a battery and add one later - the inverter is ready for it.",
      "Which loads stay up during an outage is decided at installation, so you can prioritise lights, fans, a fridge and a router over things that would drain the battery quickly.",
    ],
    specs: [
      { label: "Inverter type", value: "Hybrid, grid-interactive with storage" },
      { label: "Rated AC output", value: "5,000 W" },
      { label: "Maximum DC input", value: "7,500 W" },
      { label: "MPPT trackers", value: "2" },
      { label: "MPPT voltage range", value: "120 - 500 V" },
      { label: "Battery voltage", value: "48 V / 51.2 V nominal" },
      { label: "Maximum efficiency", value: "97.8%" },
      { label: "Transfer time to backup", value: "Under 10 ms" },
      { label: "AC output", value: "230 V, 50 Hz, single phase" },
      { label: "Monitoring", value: "Wi-Fi, with mobile app" },
      { label: "Protection rating", value: "IP65" },
      { label: "Warranty", value: "5 years" },
    ],
    applications: [
      "Homes in areas with frequent power cuts",
      "Systems with battery storage, now or added later",
      "Households that want backup and bill savings together",
    ],
    warrantyNote:
      "Covered by a 5-year manufacturer warranty against defects. Battery compatibility should be confirmed before purchase - we will check this with you.",
  },
  {
    slug: "flow-10kw-ongrid",
    name: "Cibi Flow 10kW On-Grid",
    category: "solar-inverters",
    tagline: "Three-phase capacity for commercial rooftops.",
    summary:
      "A three-phase 10 kW grid-tied inverter for shops, offices, workshops and larger homes running a three-phase connection.",
    type: "On-grid, three phase",
    capacity: "10 kW",
    output: "400 V AC, three phase",
    warranty: "5 years",
    application: "Commercial and larger rooftops",
    featured: false,
    image: "/images/product-cibi-flow-10kw-ongrid-solar-inverter.svg",
    imageAlt: "Cibi Flow 10kW three-phase on-grid solar inverter",
    overview: [
      "Commercial premises usually run a three-phase supply, and a three-phase inverter keeps the load balanced across all three rather than pushing everything down one.",
      "For a business, the value of solar is straightforward: the highest generation happens during the working day, which is exactly when consumption is highest too, so most of what is produced is used on site.",
      "Four MPPT trackers make it practical to cover a rooftop that faces several directions or is broken up by plant and skylights.",
    ],
    specs: [
      { label: "Inverter type", value: "On-grid (grid-tied), transformerless" },
      { label: "Rated AC output", value: "10,000 W" },
      { label: "Maximum DC input", value: "15,000 W" },
      { label: "MPPT trackers", value: "4" },
      { label: "MPPT voltage range", value: "160 - 850 V" },
      { label: "Maximum efficiency", value: "98.4%" },
      { label: "AC output", value: "400 V, 50 Hz, three phase" },
      { label: "Monitoring", value: "Wi-Fi and Ethernet, with portal access" },
      { label: "Protection rating", value: "IP66" },
      { label: "Cooling", value: "Smart forced-air cooling" },
      { label: "Warranty", value: "5 years" },
    ],
    applications: [
      "Shops, showrooms and offices",
      "Small workshops and light manufacturing",
      "Large homes on a three-phase connection",
    ],
    warrantyNote:
      "Covered by a 5-year manufacturer warranty against defects. Commercial installations should be commissioned and documented properly - we will guide you through what your connection requires.",
  },

  /* --------------------------- SOLAR BATTERIES -------------------------- */
  {
    slug: "store-li-5",
    name: "Cibi Store Li 5.1",
    category: "solar-batteries",
    tagline: "Compact lithium storage for essential loads.",
    summary:
      "A 5.12 kWh lithium iron phosphate battery that stores a day's surplus and carries a household's essentials through an evening outage.",
    type: "Lithium iron phosphate (LFP)",
    capacity: "5.12 kWh",
    output: "51.2 V nominal",
    warranty: "10 years",
    application: "Homes backing up essential loads",
    featured: true,
    image: "/images/product-cibi-store-li-5-solar-battery.svg",
    imageAlt: "Cibi Store Li 5.1 wall-mounted lithium solar battery",
    overview: [
      "Lithium iron phosphate is the chemistry most home storage has settled on: it tolerates daily cycling, holds a usable charge for years, needs no topping up and can be safely discharged far deeper than a lead-acid battery.",
      "At 5.12 kWh this unit is sized for the things that actually matter during an outage - lights, fans, a refrigerator, a router and phone charging - rather than for running the whole house.",
      "A built-in battery management system watches cell voltage, current and temperature, and talks to a compatible hybrid inverter so the two work as one system.",
    ],
    specs: [
      { label: "Cell chemistry", value: "Lithium iron phosphate (LiFePO4)" },
      { label: "Usable capacity", value: "5.12 kWh" },
      { label: "Nominal voltage", value: "51.2 V" },
      { label: "Depth of discharge", value: "Up to 90%" },
      { label: "Rated cycle life", value: "6,000 cycles at 80% DoD" },
      { label: "Maximum charge / discharge", value: "50 A" },
      { label: "Battery management", value: "Integrated BMS with CAN / RS485" },
      { label: "Mounting", value: "Wall mounted or floor standing" },
      { label: "Approximate dimensions", value: "650 x 450 x 160 mm" },
      { label: "Approximate weight", value: "48 kg" },
      { label: "Protection rating", value: "IP54" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "10 years" },
    ],
    applications: [
      "Backing up lights, fans, a refrigerator and a router",
      "Storing daytime solar surplus for evening use",
      "Pairing with a 3 kW to 5 kW hybrid inverter",
    ],
    warrantyNote:
      "Covered by a 10-year warranty against manufacturing defects, subject to the stated cycle and depth-of-discharge limits. Warranty assumes use with a compatible inverter and correct commissioning.",
  },
  {
    slug: "store-li-10",
    name: "Cibi Store Li 10.2",
    category: "solar-batteries",
    tagline: "Whole-evening storage for a family home.",
    summary:
      "A 10.24 kWh lithium battery for households that want more than essentials backed up, or a longer run through repeated outages.",
    type: "Lithium iron phosphate (LFP)",
    capacity: "10.24 kWh",
    output: "51.2 V nominal",
    warranty: "10 years",
    application: "Family homes and small offices",
    featured: false,
    image: "/images/product-cibi-store-li-10-solar-battery.svg",
    imageAlt: "Cibi Store Li 10.2 high-capacity lithium solar battery",
    overview: [
      "Doubling the storage changes what the system is for. Instead of keeping a few essentials alive, a 10.24 kWh battery can carry most of a family home through an evening, including loads a smaller battery would not sensibly cover.",
      "It also lets more of your generation be used rather than exported, which matters where export is credited at a lower rate than what you pay to import.",
      "The unit is modular, so a second one can be added later if your needs grow, without replacing what you already have.",
    ],
    specs: [
      { label: "Cell chemistry", value: "Lithium iron phosphate (LiFePO4)" },
      { label: "Usable capacity", value: "10.24 kWh" },
      { label: "Nominal voltage", value: "51.2 V" },
      { label: "Depth of discharge", value: "Up to 90%" },
      { label: "Rated cycle life", value: "6,000 cycles at 80% DoD" },
      { label: "Maximum charge / discharge", value: "100 A" },
      { label: "Battery management", value: "Integrated BMS with CAN / RS485" },
      { label: "Expandable", value: "Yes - parallel stacking supported" },
      { label: "Approximate dimensions", value: "650 x 450 x 290 mm" },
      { label: "Approximate weight", value: "94 kg" },
      { label: "Protection rating", value: "IP54" },
      { label: "Maintenance", value: "None required - sealed unit" },
      { label: "Warranty", value: "10 years" },
    ],
    applications: [
      "Family homes backing up more than the essentials",
      "Small offices and clinics that cannot pause for an outage",
      "Maximising self-consumption of daytime generation",
    ],
    warrantyNote:
      "Covered by a 10-year warranty against manufacturing defects, subject to the stated cycle and depth-of-discharge limits. Warranty assumes use with a compatible inverter and correct commissioning.",
  },
  {
    slug: "store-150-tubular",
    name: "Cibi Store 150 Tubular",
    category: "solar-batteries",
    tagline: "Proven tubular storage at a lower entry cost.",
    summary:
      "A 150 Ah tall tubular solar battery for systems where a lower upfront cost matters more than compactness or cycle life.",
    type: "Tall tubular, solar-rated",
    capacity: "150 Ah",
    output: "12 V nominal",
    warranty: "5 years",
    application: "Budget-conscious off-grid systems",
    featured: false,
    image: "/images/product-cibi-store-150-tubular-solar-battery.svg",
    imageAlt: "Cibi Store 150 tall tubular solar battery",
    overview: [
      "Lithium is not always the right answer. Where the budget is the deciding factor, or where the system is a modest off-grid setup rather than a daily-cycled home battery, a tubular battery remains a sensible choice.",
      "This one is built for solar duty specifically: thicker tubular plates and a higher electrolyte reserve to cope with the slow, partial charging that a solar system delivers on an overcast day.",
      "It does need occasional attention. Electrolyte levels should be checked at the recommended interval, and it will not tolerate deep discharge the way lithium does.",
    ],
    specs: [
      { label: "Battery technology", value: "Tall tubular, flooded lead-acid" },
      { label: "Nominal capacity (C10)", value: "150 Ah" },
      { label: "Nominal voltage", value: "12 V" },
      { label: "Recommended depth of discharge", value: "Up to 50%" },
      { label: "Rated cycle life", value: "1,500 cycles at 50% DoD" },
      { label: "Approximate dimensions", value: "505 x 190 x 410 mm" },
      { label: "Approximate weight", value: "52 kg" },
      { label: "Maintenance", value: "Periodic electrolyte check required" },
      { label: "Warranty", value: "5 years" },
    ],
    applications: [
      "Entry-level off-grid systems",
      "Farm and outbuilding installations",
      "Installations where upfront cost is the priority",
    ],
    warrantyNote:
      "Covered by a 5-year warranty against manufacturing defects. Warranty assumes electrolyte levels have been maintained and the recommended depth of discharge respected.",
  },

  /* ------------------------ SOLAR WATER HEATERS ------------------------- */
  {
    slug: "warm-100-etc",
    name: "Cibi Warm 100 ETC",
    category: "solar-water-heaters",
    tagline: "Hot water for a small household.",
    summary:
      "A 100 litre per day evacuated tube solar water heater, sized for two to three people and almost entirely self-sufficient.",
    type: "Evacuated tube collector (ETC)",
    capacity: "100 LPD",
    output: "60 - 75 °C outlet",
    warranty: "5 years",
    application: "Households of 2 - 3 people",
    featured: true,
    image: "/images/product-cibi-warm-100-etc-solar-water-heater.svg",
    imageAlt:
      "Cibi Warm 100 evacuated tube solar water heater with storage tank",
    overview: [
      "Water heating is usually the single largest electrical load in a home, and it is also the easiest one to hand over to the sun entirely.",
      "Evacuated tubes work by holding a vacuum between two glass walls, which stops the heat escaping once it is captured. That is why they keep performing on cool and partly cloudy days when a simpler collector would struggle.",
      "The insulated tank holds its temperature overnight, so water drawn in the morning is still hot without any electrical backup running.",
    ],
    specs: [
      { label: "Collector type", value: "Evacuated tube, borosilicate glass" },
      { label: "Daily capacity", value: "100 litres per day" },
      { label: "Number of tubes", value: "10" },
      { label: "Tube dimensions", value: "58 mm x 1,800 mm" },
      { label: "Typical outlet temperature", value: "60 - 75 °C" },
      { label: "Inner tank", value: "Stainless steel SS 304" },
      { label: "Outer tank", value: "Powder-coated steel" },
      { label: "Insulation", value: "50 mm PUF" },
      { label: "Working pressure", value: "Non-pressurised (gravity fed)" },
      { label: "Electrical backup", value: "Optional 2 kW immersion heater" },
      { label: "Warranty", value: "5 years on the system" },
    ],
    applications: [
      "Households of two to three people",
      "Replacing a daily-use electric geyser",
      "Homes with terrace space and good sun exposure",
    ],
    warrantyNote:
      "Covered by a 5-year system warranty against manufacturing defects. Warranty assumes correct installation, water quality within the recommended hardness range, and periodic cleaning of the tubes.",
  },
  {
    slug: "warm-200-etc",
    name: "Cibi Warm 200 ETC",
    category: "solar-water-heaters",
    tagline: "Enough hot water for a full family.",
    summary:
      "A 200 litre per day evacuated tube system for families of four to six, covering morning and evening use from one tank.",
    type: "Evacuated tube collector (ETC)",
    capacity: "200 LPD",
    output: "60 - 75 °C outlet",
    warranty: "5 years",
    application: "Households of 4 - 6 people",
    featured: true,
    image: "/images/product-cibi-warm-200-etc-solar-water-heater.svg",
    imageAlt:
      "Cibi Warm 200 evacuated tube solar water heater with a larger storage tank",
    overview: [
      "A family home draws hot water twice a day and rarely in a tidy order. Two hundred litres gives enough headroom that the last person in the morning is not left with a cold shower.",
      "The system runs on gravity, so there is no pump and nothing to fail. Water rises through the tubes as it heats and collects in the insulated tank above.",
      "An optional electrical backup element can be fitted for long spells of monsoon weather - it only draws power when you switch it on.",
    ],
    specs: [
      { label: "Collector type", value: "Evacuated tube, borosilicate glass" },
      { label: "Daily capacity", value: "200 litres per day" },
      { label: "Number of tubes", value: "20" },
      { label: "Tube dimensions", value: "58 mm x 1,800 mm" },
      { label: "Typical outlet temperature", value: "60 - 75 °C" },
      { label: "Inner tank", value: "Stainless steel SS 304" },
      { label: "Outer tank", value: "Powder-coated steel" },
      { label: "Insulation", value: "50 mm PUF" },
      { label: "Working pressure", value: "Non-pressurised (gravity fed)" },
      { label: "Electrical backup", value: "Optional 2 kW immersion heater" },
      { label: "Warranty", value: "5 years on the system" },
    ],
    applications: [
      "Families of four to six people",
      "Homes with two or more bathrooms in daily use",
      "Replacing multiple electric geysers",
    ],
    warrantyNote:
      "Covered by a 5-year system warranty against manufacturing defects. Warranty assumes correct installation, water quality within the recommended hardness range, and periodic cleaning of the tubes.",
  },
  {
    slug: "warm-300-fpc",
    name: "Cibi Warm 300 FPC",
    category: "solar-water-heaters",
    tagline: "Pressurised flat plate for demanding use.",
    summary:
      "A 300 litre per day flat plate system built for pressurised plumbing, hard water and continuous commercial demand.",
    type: "Flat plate collector (FPC)",
    capacity: "300 LPD",
    output: "55 - 70 °C outlet",
    warranty: "7 years",
    application: "Large homes and small commercial use",
    featured: false,
    image: "/images/product-cibi-warm-300-fpc-solar-water-heater.svg",
    imageAlt:
      "Cibi Warm 300 flat plate solar water heater with a pressurised tank",
    overview: [
      "Flat plate collectors use a copper absorber sheet under toughened glass rather than glass tubes. They handle pressure well, cope better with hard water, and there is no glass tube to replace if something strikes the roof.",
      "That makes them the right answer for a guest house, a canteen, a salon or a large home with pressurised plumbing feeding multiple outlets.",
      "They are heavier and cost more than an equivalent evacuated tube system, and they lose slightly more heat on cold mornings. Where the water is hard or the demand is constant, that trade is usually worth making.",
    ],
    specs: [
      { label: "Collector type", value: "Flat plate, copper absorber" },
      { label: "Daily capacity", value: "300 litres per day" },
      { label: "Collector area", value: "6.0 m² (3 panels)" },
      { label: "Absorber coating", value: "Selective black chrome" },
      { label: "Glazing", value: "4 mm toughened low-iron glass" },
      { label: "Typical outlet temperature", value: "55 - 70 °C" },
      { label: "Inner tank", value: "Stainless steel SS 316L" },
      { label: "Insulation", value: "50 mm PUF" },
      { label: "Working pressure", value: "Pressurised, up to 3 bar" },
      { label: "Hard water suitability", value: "Suitable" },
      { label: "Electrical backup", value: "Optional 3 kW immersion heater" },
      { label: "Warranty", value: "7 years on the system" },
    ],
    applications: [
      "Large homes with pressurised plumbing",
      "Guest houses, canteens and salons",
      "Areas with hard water where tubes scale up quickly",
    ],
    warrantyNote:
      "Covered by a 7-year system warranty against manufacturing defects. Warranty assumes correct installation and that working pressure stays within the stated limit.",
  },

  /* ------------------------ SOLAR STREET LIGHTS ------------------------- */
  {
    slug: "beam-20",
    name: "Cibi Beam 20",
    category: "solar-street-lights",
    tagline: "Pathway and compound lighting, no wiring.",
    summary:
      "A 20 W all-in-one solar street light for driveways, pathways and compound walls, with panel, battery and LED in one sealed unit.",
    type: "All-in-one integrated LED",
    capacity: "20 W",
    output: "2,400 lm",
    warranty: "3 years",
    application: "Pathways, driveways and compounds",
    featured: false,
    image: "/images/product-cibi-beam-20-solar-street-light.svg",
    imageAlt:
      "Cibi Beam 20 all-in-one solar street light with integrated panel and LED",
    overview: [
      "Getting mains power to the far end of a compound means trenching, conduit, cable and an electrician - often for a single light.",
      "An all-in-one unit avoids all of that. The panel, battery, controller and LED sit in one sealed housing that bolts to a pole or a wall, and it starts working the evening it is fitted.",
      "A motion sensor holds the light at low output when nothing is moving and brings it to full brightness when someone approaches, which stretches the battery through longer nights.",
    ],
    specs: [
      { label: "Light source", value: "Integrated LED array" },
      { label: "LED power", value: "20 W" },
      { label: "Luminous output", value: "2,400 lm" },
      { label: "Colour temperature", value: "6,500 K (cool white)" },
      { label: "Solar panel", value: "30 W monocrystalline, integrated" },
      { label: "Battery", value: "LiFePO4, 12.8 V / 12 Ah" },
      { label: "Autonomy", value: "2 - 3 rainy days" },
      { label: "Control", value: "Dusk-to-dawn with PIR motion sensing" },
      { label: "Mounting height", value: "3 - 4 m recommended" },
      { label: "Protection rating", value: "IP65" },
      { label: "Warranty", value: "3 years" },
    ],
    applications: [
      "Driveways, pathways and garden lighting",
      "Compound walls and boundary lighting",
      "Locations with no nearby mains supply",
    ],
    warrantyNote:
      "Covered by a 3-year warranty against manufacturing defects. Warranty assumes the panel is mounted with clear sky exposure and kept reasonably clean.",
  },
  {
    slug: "beam-40",
    name: "Cibi Beam 40",
    category: "solar-street-lights",
    tagline: "Road and campus lighting that runs itself.",
    summary:
      "A 40 W all-in-one solar street light for internal roads, parking areas and campuses, with dusk-to-dawn operation and motion sensing.",
    type: "All-in-one integrated LED",
    capacity: "40 W",
    output: "4,800 lm",
    warranty: "3 years",
    application: "Internal roads and parking areas",
    featured: true,
    image: "/images/product-cibi-beam-40-solar-street-light.svg",
    imageAlt:
      "Cibi Beam 40 all-in-one solar street light mounted on a pole",
    overview: [
      "Forty watts of LED covers an internal road or a parking area properly - enough spread that the pools of light join up rather than leaving dark gaps between poles.",
      "For a layout, a campus or a factory perimeter, the appeal is that each light is independent. There is no cable run to damage, no single fault that takes out a whole row, and no monthly bill.",
      "A lithium iron phosphate battery is used rather than lead-acid, because a light that sits outdoors through Indian summers needs a chemistry that tolerates heat.",
    ],
    specs: [
      { label: "Light source", value: "Integrated LED array" },
      { label: "LED power", value: "40 W" },
      { label: "Luminous output", value: "4,800 lm" },
      { label: "Colour temperature", value: "6,500 K (cool white)" },
      { label: "Solar panel", value: "60 W monocrystalline, integrated" },
      { label: "Battery", value: "LiFePO4, 12.8 V / 24 Ah" },
      { label: "Autonomy", value: "3 - 4 rainy days" },
      { label: "Control", value: "Dusk-to-dawn with PIR motion sensing" },
      { label: "Mounting height", value: "5 - 6 m recommended" },
      { label: "Pole spacing", value: "18 - 22 m typical" },
      { label: "Protection rating", value: "IP65" },
      { label: "Warranty", value: "3 years" },
    ],
    applications: [
      "Internal roads and residential layouts",
      "Campuses, factories and parking areas",
      "Village and rural road lighting",
    ],
    warrantyNote:
      "Covered by a 3-year warranty against manufacturing defects. Warranty assumes the panel is mounted with clear sky exposure and kept reasonably clean.",
  },
  {
    slug: "beam-60-split",
    name: "Cibi Beam 60 Split",
    category: "solar-street-lights",
    tagline: "Separate panel for shaded or awkward sites.",
    summary:
      "A 60 W split solar street light whose panel mounts separately, so the light can sit where it is needed and the panel where the sun is.",
    type: "Split system, separate panel",
    capacity: "60 W",
    output: "7,200 lm",
    warranty: "3 years",
    application: "Main roads and shaded locations",
    featured: false,
    image: "/images/product-cibi-beam-60-split-solar-street-light.svg",
    imageAlt:
      "Cibi Beam 60 split solar street light with a separately mounted solar panel",
    overview: [
      "An all-in-one light has one weakness: the panel has to go wherever the light goes. Under a tree, beside a tall building or on a north-facing stretch of road, that is a problem.",
      "A split system separates the two. The panel goes on a mast or a nearby roof where it gets clear sun, and the light head goes where the light is actually needed.",
      "It takes longer to install and needs a short cable run between the two, but it is the only sensible option on a site where shade would otherwise make solar lighting unworkable.",
    ],
    specs: [
      { label: "Light source", value: "LED array, separate luminaire" },
      { label: "LED power", value: "60 W" },
      { label: "Luminous output", value: "7,200 lm" },
      { label: "Colour temperature", value: "6,500 K (cool white)" },
      { label: "Solar panel", value: "100 W monocrystalline, separately mounted" },
      { label: "Battery", value: "LiFePO4, 12.8 V / 40 Ah" },
      { label: "Autonomy", value: "3 - 4 rainy days" },
      { label: "Control", value: "Dusk-to-dawn, programmable dimming" },
      { label: "Mounting height", value: "6 - 8 m recommended" },
      { label: "Pole spacing", value: "24 - 28 m typical" },
      { label: "Protection rating", value: "IP66 luminaire" },
      { label: "Warranty", value: "3 years" },
    ],
    applications: [
      "Main roads and highway service lanes",
      "Sites where the light position is shaded",
      "Installations needing higher output per pole",
    ],
    warrantyNote:
      "Covered by a 3-year warranty against manufacturing defects. Warranty assumes the panel is sited with clear sky exposure and the interconnecting cable is correctly rated and protected.",
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
