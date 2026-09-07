"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  finderCategories,
  parseRecommendation,
  yearsFor,
  type FinderCategoryId,
} from "@/data/finder";
import { getProduct, productPath } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

const categoryIcons: Record<FinderCategoryId, IconName> = {
  car: "car",
  bike: "bike",
  commercial: "truck",
  "home-backup": "home",
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

/**
 * Frontend-only battery finder.
 *
 * Everything runs against the static dataset in data/finder.ts. The lookup is
 * isolated in `result` below, so replacing the dataset with a fitment API call
 * later means changing one function, not this component's markup or state.
 */
export function BatteryFinder() {
  const [categoryId, setCategoryId] = useState<FinderCategoryId>("car");
  const [groupValue, setGroupValue] = useState("");
  const [modelValue, setModelValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const category = useMemo(
    () => finderCategories.find((entry) => entry.id === categoryId)!,
    [categoryId],
  );

  const group = useMemo(
    () => category.groups.find((entry) => entry.value === groupValue),
    [category, groupValue],
  );

  const model = useMemo(
    () => group?.models.find((entry) => entry.value === modelValue),
    [group, modelValue],
  );

  const needsYear = category.fieldLabels.third !== null;
  const years = useMemo(() => (model ? yearsFor(model.yearFrom) : []), [model]);

  const canSubmit = Boolean(model) && (!needsYear || Boolean(yearValue));

  const result = useMemo(() => {
    if (!submitted || !model) return null;
    const { categorySlug, productSlug } = parseRecommendation(model.recommends);
    return getProduct(categorySlug, productSlug) ?? null;
  }, [submitted, model]);

  /* Each change invalidates everything downstream of it. */
  const changeCategory = (id: FinderCategoryId) => {
    setCategoryId(id);
    setGroupValue("");
    setModelValue("");
    setYearValue("");
    setSubmitted(false);
  };

  const changeGroup = (value: string) => {
    setGroupValue(value);
    setModelValue("");
    setYearValue("");
    setSubmitted(false);
  };

  const changeModel = (value: string) => {
    setModelValue(value);
    setYearValue("");
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    /* Move focus to the result so keyboard and screen-reader users land on it. */
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };

  return (
    <div className="card-surface overflow-hidden rounded-[var(--radius-panel)] p-6 sm:p-8 lg:p-10">
      {/* ------------------------- Category selector ------------------------ */}
      <fieldset>
        <legend className="font-display text-[var(--text-small)] font-semibold text-navy">
          What do you need power for?
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
            needsYear ? "lg:grid-cols-4" : "lg:grid-cols-3",
          ].join(" ")}
        >
          <Select
            id="finder-group"
            label={category.fieldLabels.first}
            value={groupValue}
            onChange={changeGroup}
            placeholder={`Select ${category.fieldLabels.first.toLowerCase()}`}
            options={category.groups.map((entry) => ({
              value: entry.value,
              label: entry.label,
            }))}
          />

          <Select
            id="finder-model"
            label={category.fieldLabels.second}
            value={modelValue}
            onChange={changeModel}
            disabled={!group}
            placeholder={
              group
                ? `Select ${category.fieldLabels.second.toLowerCase()}`
                : `Choose a ${category.fieldLabels.first.toLowerCase()} first`
            }
            options={(group?.models ?? []).map((entry) => ({
              value: entry.value,
              label: entry.label,
            }))}
          />

          {needsYear && (
            <Select
              id="finder-year"
              label={category.fieldLabels.third!}
              value={yearValue}
              onChange={(value) => {
                setYearValue(value);
                setSubmitted(false);
              }}
              disabled={!model}
              placeholder={model ? "Select year" : "Choose a model first"}
              options={years.map((year) => ({ value: year, label: year }))}
            />
          )}

          <div className="flex items-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!canSubmit}
              className="w-full"
            >
              Find Battery
            </Button>
          </div>
        </div>
      </form>

      {/* ----------------------------- Result ------------------------------- */}
      <div aria-live="polite" className="mt-2">
        {result && (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="mt-6 rounded-[var(--radius-card)] border border-accent/25 bg-tint-blue/60 p-5 sm:p-6"
          >
            <p className="eyebrow">Suggested match</p>

            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
              <img
                src={result.image}
                alt={result.imageAlt}
                width={320}
                height={210}
                loading="lazy"
                decoding="async"
                className="w-full max-w-[190px] self-center rounded-xl bg-surface sm:self-auto"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-bold text-navy">
                  {result.name}
                </h3>

                <p className="mt-1.5 text-[var(--text-small)] leading-relaxed text-slate">
                  {result.summary}
                </p>

                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    { label: "Type", value: result.type },
                    { label: "Capacity", value: result.capacity },
                    { label: "Voltage", value: result.voltage },
                    { label: "Warranty", value: result.warranty },
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

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Button href={productPath(result)} variant="primary" size="md">
                    View Details
                  </Button>
                  <Button
                    href={`/contact?product=${encodeURIComponent(result.name)}#enquiry-form`}
                    variant="secondary"
                    size="md"
                  >
                    Enquire Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Honest framing: a suggestion from a fitment guide, not a promise. */}
            <p className="mt-5 border-t border-accent/15 pt-4 text-[var(--text-micro)] leading-relaxed text-slate">
              This is a guide based on typical fitment.{" "}
              <Link
                href="/contact"
                className="font-semibold text-accent-deep underline-offset-4 hover:underline"
              >
                Confirm with our team
              </Link>{" "}
              before you buy, so we can check the exact size and terminal layout
              your vehicle needs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
