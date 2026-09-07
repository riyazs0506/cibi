"use client";

import { useId, useState } from "react";
import type { Faq } from "@/data/faqs";
import { Icon } from "@/components/ui/Icon";

export interface FaqAccordionProps {
  items: Faq[];
  /** Index open on first render. Use 0 to invite interaction, -1 for all closed. */
  defaultOpen?: number;
}

/**
 * Accessible disclosure list.
 *
 * Answers stay in the DOM at all times - collapsed with `grid-template-rows`
 * rather than conditional rendering - so the text is always present for search
 * engines and in-page find, and the open/close transition needs no measured
 * height. `visibility` hides collapsed content from the tab order.
 */
export function FaqAccordion({ items, defaultOpen = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-soft)]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left transition-colors duration-[var(--duration-soft)] hover:bg-canvas sm:px-6"
              >
                <span className="font-display text-[1.0625rem] font-semibold text-navy">
                  {item.question}
                </span>

                <span
                  className={[
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    "transition-[transform,background-color,color]",
                    "duration-[var(--duration-soft)] ease-[var(--ease-soft)]",
                    isOpen
                      ? "rotate-180 bg-accent text-white"
                      : "bg-tint-blue text-accent-deep",
                  ].join(" ")}
                >
                  <Icon name="chevron-down" size={16} />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={[
                "grid transition-[grid-template-rows] duration-[420ms] ease-[var(--ease-soft)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              ].join(" ")}
            >
              <div
                className={[
                  "overflow-hidden transition-[visibility] duration-[420ms]",
                  isOpen ? "visible" : "invisible",
                ].join(" ")}
              >
                <p className="px-5 pb-6 text-[var(--text-small)] leading-relaxed text-slate sm:px-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
