"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  collectNotes,
  finderCategories,
  parseRecommendation,
  resolveRecommendations,
  type FinderCategoryId,
  type FinderOption,
} from "@/data/finder";
import { getProduct, productPath, type Product } from "@/data/products";
import { getCategory } from "@/data/categories";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

const categoryIcons: Record<FinderCategoryId, IconName> = {
  home: "home",
  business: "business",
  "water-heating": "water-heater",
  "outdoor-lighting": "street-light",
};

/** Native select, styled. Native keeps keyboard and mobile behaviour correct. */
function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-display text-[var(--text-small)] font-semibold text-navy"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={[
            "w-full appearance-none rounded-[var(--radius-btn)] border border-line bg-surface",
            "py-3 pl-4 pr-11 text-[var(--text-small)] text-ink",
            "transition-[border-color,box-shadow] duration-[var(--duration-soft)]",
            "hover:border-muted focus:border-accent focus:outline-none",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "disabled:cursor-not-allowed disabled:bg-line-soft disabled:text-muted",
          ].join(" ")}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}

/** One recommended product in the result panel. */
function ResultRow({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <li className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-4 sm:flex-row sm:items-center sm:gap-5">
      <img
        src={product.image}
        alt={product.imageAlt}
        width={320}
        height={210}
        loading="lazy"
        decoding="async"
        className="w-full max-w-[150px] self-center rounded-xl bg-canvas sm:self-auto"
      />

      <div className="min-w-0 flex-1">
        {category && <p className="eyebrow">{category.name}</p>}

        <h4 className="mt-1.5 font-display text-lg font-bold text-navy">
          {product.name}
        </h4>

        <p className="mt-1 text-[var(--text-small)] leading-relaxed text-slate">
          {product.tagline}
        </p>

        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {[
            { label: "Type", value: product.type },
            { label: "Capacity", value: product.capacity },
            { label: "Warranty", value: product.warranty },
          ].map((spec) => (
            <div key={spec.label}>
              <dt className="text-[0.6875rem] uppercase tracking-[0.09em] text-muted">
                {spec.label}
              </dt>
              <dd className="font-display text-[var(--text-small)] font-semibold text-navy">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="shrink-0 sm:self-center">
        <Button href={productPath(product)} variant="secondary" size="md" withArrow>
          View Details
        </Button>
      </div>
    </li>
  );
}

/**
 * Frontend-only solar finder.
 *
 * Everything runs against the static dataset in data/finder.ts. The lookup is
 * isolated in `results` below, so replacing the dataset with a sizing API
 * later means changing one function, not this component's markup or state.
 */
export function SolarFinder() {
  const [categoryId, setCategoryId] = useState<FinderCategoryId>("home");
  /** Selected option value, keyed by step id. */
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const category = useMemo(
    () => finderCategories.find((entry) => entry.id === categoryId)!,
    [categoryId],
  );

  /** The chosen option object for each step, in step order, up to the first gap. */
  const selected = useMemo(() => {
    const chosen: FinderOption[] = [];
    for (const step of category.steps) {
      const option = step.options.find((o) => o.value === answers[step.id]);
      if (!option) break;
      chosen.push(option);
    }
    return chosen;
  }, [category, answers]);

  const complete = selected.length === category.steps.length;

  const results = useMemo(() => {
    if (!submitted || !complete) return { products: [] as Product[], notes: [] as string[] };

    const products = resolveRecommendations(selected)
      .map((entry) => {
        const { categorySlug, productSlug } = parseRecommendation(entry);
        return getProduct(categorySlug, productSlug);
      })
      .filter((product): product is Product => Boolean(product));

    return { products, notes: collectNotes(selected) };
  }, [submitted, complete, selected]);

  const changeCategory = (id: FinderCategoryId) => {
    setCategoryId(id);
    setAnswers({});
    setSubmitted(false);
  };

  /** Changing a step invalidates every step after it. */
  const answerStep = (stepIndex: number) => (value: string) => {
    const step = category.steps[stepIndex];
    setAnswers((current) => {
      const next = { ...current, [step.id]: value };
      for (const later of category.steps.slice(stepIndex + 1)) {
        delete next[later.id];
      }
      return next;
    });
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!complete) return;
    setSubmitted(true);
    /* Move focus to the result so keyboard and screen-reader users land on it. */
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };

  return (
    <div className="card-surface overflow-hidden rounded-[var(--radius-panel)] p-6 sm:p-8 lg:p-10">
      {/* ------------------------- Category selector ------------------------ */}
      <fieldset>
        <legend className="font-display text-[var(--text-small)] font-semibold text-navy">
          What are you looking to power?
        </legend>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {finderCategories.map((entry) => {
            const active = entry.id === categoryId;
            return (
              <label
                key={entry.id}
                className={[
                  "group relative flex cursor-pointer flex-col items-center gap-2 rounded-[var(--radius-card)]",
                  "border px-3 py-5 text-center",
                  "transition-[border-color,background-color,box-shadow,transform]",
                  "duration-[var(--duration-soft)] ease-[var(--ease-soft)]",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-deep",
                  active
                    ? "border-accent bg-tint-blue shadow-[var(--shadow-soft)]"
                    : "border-line bg-surface hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow-soft)]",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="finder-category"
                  value={entry.id}
                  checked={active}
                  onChange={() => changeCategory(entry.id)}
                  className="sr-only"
                />

                <Icon
                  name={categoryIcons[entry.id]}
                  size={26}
                  className={active ? "text-accent-deep" : "text-slate"}
                />

                <span
                  className={[
                    "font-display text-[var(--text-small)] font-semibold",
                    active ? "text-navy" : "text-ink",
                  ].join(" ")}
                >
                  {entry.label}
                </span>

                <span className="text-[0.6875rem] leading-snug text-muted">
                  {entry.helper}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* ---------------------------- Selectors ----------------------------- */}
      <form onSubmit={handleSubmit} className="mt-8">
        <div
          className={[
            "grid gap-4 sm:grid-cols-2",
            category.steps.length === 3 ? "lg:grid-cols-4" : "lg:grid-cols-3",
          ].join(" ")}
        >
          {category.steps.map((step, index) => {
            /* A step unlocks only once every step before it is answered. */
            const unlocked = index === 0 || Boolean(answers[category.steps[index - 1].id]);

            return (
              <Select
                key={`${category.id}-${step.id}`}
                id={step.id}
                label={step.label}
                value={answers[step.id] ?? ""}
                onChange={answerStep(index)}
                disabled={!unlocked}
                /* A locked step says so in a few words. Naming the previous
                   step here reads well in the markup but overflows the control
                   at narrow widths, and a clipped placeholder helps nobody. */
                placeholder={unlocked ? step.placeholder : "Answer above first"}
                options={step.options.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />
            );
          })}

          <div className="flex items-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!complete}
              className="w-full"
            >
              Find My System
            </Button>
          </div>
        </div>
      </form>

      {/* ----------------------------- Result ------------------------------- */}
      <div aria-live="polite">
        {submitted && results.products.length > 0 && (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="mt-8 rounded-[var(--radius-card)] border border-accent/25 bg-tint-blue/60 p-5 sm:p-6"
          >
            <p className="eyebrow">A good place to start</p>

            <h3 className="mt-2 font-display text-xl font-bold text-navy">
              {results.products.length === 1
                ? "Here's what we'd suggest"
                : "Here's what we'd put together"}
            </h3>

            {results.notes.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {results.notes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2.5 text-[var(--text-small)] leading-relaxed text-slate"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-mint text-mint-deep">
                      <Icon name="check" size={12} strokeWidth={2.4} />
                    </span>
                    {note}
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-5 flex flex-col gap-3">
              {results.products.map((product) => (
                <ResultRow key={`${product.category}-${product.slug}`} product={product} />
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button
                href="/contact?enquiry=system-design#enquiry-form"
                variant="primary"
                size="md"
              >
                Get a Proper Quote
              </Button>
              <Button href="/products" variant="secondary" size="md">
                Browse Everything
              </Button>
            </div>

            {/* Honest framing: a starting point, not a system design. */}
            <p className="mt-5 border-t border-accent/15 pt-4 text-[var(--text-micro)] leading-relaxed text-slate">
              This is a starting point based on typical usage, not a system
              design. Real sizing needs your actual bill, your roof and a shade
              check.{" "}
              <Link
                href="/contact"
                className="font-semibold text-accent-deep underline-offset-4 hover:underline"
              >
                Talk to us
              </Link>{" "}
              and we&apos;ll work it out with you properly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
