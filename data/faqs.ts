/* =============================================================================
 * FAQs
 * Answers common informational questions and backs the FAQPage structured data.
 * Keep answers factual and general - nothing here should promise a specific
 * outcome, price or timeline on the client's behalf.
 * ========================================================================== */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How do I choose the right car battery?",
    answer:
      "Three things matter most: the physical size that fits your battery tray, the terminal layout so the cables reach correctly, and enough capacity and cranking current for your engine. Your vehicle handbook lists the specification it was built around. If you would rather not work through it alone, tell us your vehicle and we will help you match it.",
  },
  {
    question: "How long does a car battery usually last?",
    answer:
      "Most car batteries give somewhere between three and five years of service, though this varies a great deal with climate, driving pattern and how the vehicle is used. Frequent short trips, long periods parked, and sustained high temperatures all shorten that span.",
  },
  {
    question: "When should I replace my battery?",
    answer:
      "Common signs are slow or laboured cranking, headlights that dim noticeably at idle, needing a jump start more than once, or a battery warning light on the dashboard. If your battery is already past three years old and showing any of these, it is worth having it inspected before it leaves you stranded.",
  },
  {
    question: "How can I make my battery last longer?",
    answer:
      "Keep the terminals clean and free of corrosion, make sure the battery is clamped down firmly so it does not vibrate, and try to take a longer drive occasionally rather than only short trips. If the vehicle will stand unused for several weeks, a maintenance charger helps. For serviceable batteries, check electrolyte levels at the recommended interval.",
  },
  {
    question: "What is the difference between a maintenance-free and an AGM battery?",
    answer:
      "A maintenance-free battery is a sealed flooded battery that needs no topping up. An AGM battery holds its electrolyte in a glass mat instead of as free liquid, which suits vehicles with start-stop systems and frequent partial charging. If your vehicle was supplied with an AGM battery, it should be replaced with an AGM battery.",
  },
  {
    question: "What does the battery warranty cover?",
    answer:
      "Warranties cover manufacturing defects for the stated period, and the exact terms differ by product and between private and commercial use. Keep your purchase invoice, as it is needed for any assessment. If you think you have a warranty issue, get in touch and we will guide you through what happens next.",
  },
  {
    question: "Which inverter battery size do I need for my home?",
    answer:
      "It depends on what you want to keep running and for how long. Lights, fans and a router need far less than a household that also wants a refrigerator on backup. Tell us which appliances matter to you and roughly how long your power cuts last, and we can point you to a suitable capacity.",
  },
  {
    question: "Can you help if I am not sure what is wrong?",
    answer:
      "Yes. A starting problem is not always the battery - it can also be the alternator, the wiring or a parasitic drain. A battery inspection helps identify what your vehicle actually needs before you spend anything on a replacement.",
  },
];
