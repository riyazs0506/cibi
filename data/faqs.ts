/* =============================================================================
 * FAQs
 * Answers common informational questions and backs the FAQPage structured data.
 *
 * Keep answers factual and general. Nothing here promises a payback period, a
 * subsidy amount, a generation figure or a saving - all of those depend on
 * location, roof, tariff and usage, and stating them as fact would be wrong.
 * ========================================================================== */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How much roof space do I need for solar?",
    answer:
      "As a working rule, each kilowatt of panels needs roughly 60 to 80 square feet of clear, shade-free roof. A 3 kW system therefore wants somewhere around 200 to 250 square feet. What matters as much as the area is the shape of it and whether anything shades it during the middle of the day.",
  },
  {
    question: "What size solar system does my home need?",
    answer:
      "Start from your electricity bill rather than your roof. Look at the units consumed per month, divide by 30 for a daily average, and size the system to cover that. Your tariff, whether you have net metering, and how much of your usage happens during daylight all shift the answer, which is why we prefer to look at an actual bill with you.",
  },
  {
    question: "What is the difference between on-grid, off-grid and hybrid?",
    answer:
      "An on-grid system feeds your home and exports the surplus to the grid, but shuts down during a power cut for the safety of line workers. An off-grid system runs entirely on panels and batteries with no grid connection at all. A hybrid system does both: it uses the grid normally and switches to battery when the supply fails.",
  },
  {
    question: "Will solar work during a power cut?",
    answer:
      "Only if your system is built for it. A standard on-grid system stops when the grid stops. If you want power during an outage you need a hybrid inverter and a battery, and the loads you want backed up are decided when the system is installed.",
  },
  {
    question: "How long do solar panels last?",
    answer:
      "Panels are generally warranted to still produce around 85% of their original output after 25 years, and most keep working beyond that. Inverters have a shorter life and are usually the first component to be replaced, typically somewhere between 8 and 15 years depending on the unit and how hard it works.",
  },
  {
    question: "Do solar panels need cleaning and maintenance?",
    answer:
      "Panels themselves have no moving parts, but dust, bird droppings and pollen do reduce output, and in dusty conditions the drop can be significant. A rinse every few weeks through the dry season and a proper clean two to four times a year is usually enough. We also recommend an annual check of the mounting, cabling and earthing.",
  },
  {
    question: "Is a solar water heater better than a solar power system?",
    answer:
      "They solve different problems, and a water heater is often the cheaper first step. Water heating is usually the single biggest electrical load in a home, so a solar water heater removes a large, predictable cost for a much smaller outlay than a full rooftop system. Many households end up with both.",
  },
  {
    question: "Can I add more panels or a battery later?",
    answer:
      "Often yes, but it depends on what was installed first. The inverter sets the ceiling, so if expansion is likely we would usually suggest sizing it with headroom from the start. Hybrid inverters are generally battery-ready even if you do not buy the battery on day one. Tell us your plans and we will design for them.",
  },
];
