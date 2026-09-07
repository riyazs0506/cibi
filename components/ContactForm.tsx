"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/data/site";
import {
  ENQUIRY_ENDPOINT,
  enquiryReasons,
  submitEnquiry,
  type EnquiryResult,
} from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type FieldName = "name" | "phone" | "email" | "need" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialValues: Values = {
  name: "",
  phone: "",
  email: "",
  need: "",
  message: "",
};

/* -------------------------------------------------------------------------- */
/* Validation - deliberately forgiving, and worded as help rather than telling
   the visitor off.                                                            */
/* -------------------------------------------------------------------------- */

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  }

  const digits = values.phone.replace(/[^\d]/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Please add a phone number we can reach you on.";
  } else if (digits.length < 7 || digits.length > 15) {
    errors.phone = "That phone number looks a little short. Could you check it?";
  }

  if (!values.email.trim()) {
    errors.email = "Please add an email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "That email address doesn't look quite right.";
  }

  if (!values.need) {
    errors.need = "Let us know what you need help with.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "A sentence or two helps us point you in the right direction.";
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/* Field shell                                                                */
/* -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-display text-[var(--text-small)] font-semibold text-navy"
      >
        {label}
      </label>

      {children}

      {hint && !error && (
        <p id={`${id}-hint`} className="text-[var(--text-micro)] text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-[var(--text-micro)] text-[#b4443a]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const controlClasses = (hasError: boolean) =>
  [
    "w-full rounded-[var(--radius-btn)] border bg-surface px-4 py-3",
    "text-[var(--text-small)] text-ink placeholder:text-muted",
    "transition-[border-color,box-shadow] duration-[var(--duration-soft)]",
    "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
    hasError
      ? "border-[#e0a9a3] focus:border-[#b4443a]"
      : "border-line hover:border-muted focus:border-accent",
  ].join(" ");

/* -------------------------------------------------------------------------- */

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [product, setProduct] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  /* Pre-fill from an "Enquire Now" button. Read from the URL directly rather
     than useSearchParams, which would force this subtree into a Suspense
     boundary under static export for no benefit. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("product");
    if (!requested) return;

    setProduct(requested);
    setValues((current) => ({
      ...current,
      need: current.need || "Choosing the right battery",
      message:
        current.message || `I'd like to know more about the ${requested}.`,
    }));
  }, []);

  const setField = (field: FieldName) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    /* Clear an error as soon as the visitor starts fixing it. */
    if (attempted) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: FieldName) => () => {
    if (!attempted) return;
    const fieldErrors = validate(values);
    setErrors((current) => ({ ...current, [field]: fieldErrors[field] }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAttempted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      /* Send focus to the first problem so it is never missed. */
      const firstField = Object.keys(nextErrors)[0] as FieldName;
      document.getElementById(firstField)?.focus();
      return;
    }

    setPending(true);
    const outcome = await submitEnquiry({
      ...values,
      product: product ?? undefined,
      sourcePath: window.location.pathname,
    });
    setPending(false);
    setResult(outcome);

    if (outcome.status === "sent") {
      setValues(initialValues);
      setAttempted(false);
    }

    window.requestAnimationFrame(() => statusRef.current?.focus());
  };

  /* ---------------------------- Success states --------------------------- */

  if (result?.status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        className="card-surface flex flex-col items-start gap-4 p-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tint-mint text-mint-deep">
          <Icon name="check" size={24} />
        </span>
        <h3 className="font-display text-xl font-bold text-navy">
          Thank you! We&apos;ll get back to you soon.
        </h3>
        <p className="text-[var(--text-small)] leading-relaxed text-slate">
          We have your enquiry and someone from our team will be in touch.
        </p>
      </div>
    );
  }

  /* The form is built and validated but has no destination in this build.
     Saying so is the honest outcome - claiming delivery would not be. */
  if (result?.status === "not-configured") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        className="card-surface flex flex-col items-start gap-4 p-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tint-blue text-accent-deep">
          <Icon name="mail" size={24} />
        </span>

        <h3 className="font-display text-xl font-bold text-navy">
          Almost there &mdash; this form isn&apos;t connected yet.
        </h3>

        <p className="text-[var(--text-small)] leading-relaxed text-slate">
          Your details were checked and are ready to send, but enquiry delivery
          has not been switched on for this site yet, so nothing has been
          submitted.
          {contact.phone || contact.email
            ? " Please reach us directly in the meantime and we will help straight away."
            : " Please try again once contact details are published."}
        </p>

        <div className="flex flex-wrap gap-2.5">
          {contact.phoneHref && (
            <Button href={`tel:${contact.phoneHref}`} external variant="primary" size="md">
              Call us
            </Button>
          )}
          {contact.email && (
            <Button
              href={`mailto:${contact.email}`}
              external
              variant="secondary"
              size="md"
            >
              Email us
            </Button>
          )}
          <Button
            onClick={() => setResult(null)}
            variant="secondary"
            size="md"
          >
            Back to the form
          </Button>
        </div>

        {process.env.NODE_ENV !== "production" && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-[var(--text-micro)] text-amber-900">
            <strong className="font-semibold">Developer note:</strong> set{" "}
            <code className="font-mono">NEXT_PUBLIC_ENQUIRY_ENDPOINT</code> or
            edit <code className="font-mono">lib/enquiry.ts</code> to connect a
            backend. Once connected, this becomes the
            &ldquo;Thank you!&rdquo; confirmation.
          </p>
        )}
      </div>
    );
  }

  /* ------------------------------- The form ------------------------------ */

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {product && (
        <p className="rounded-[var(--radius-btn)] border border-accent/25 bg-tint-blue px-4 py-3 text-[var(--text-small)] text-navy">
          Enquiring about <strong className="font-semibold">{product}</strong>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setField("name")(event.target.value)}
            onBlur={handleBlur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
            className={controlClasses(Boolean(errors.name))}
          />
        </Field>

        <Field id="phone" label="Phone Number" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => setField("phone")(event.target.value)}
            onBlur={handleBlur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="Where we can reach you"
            className={controlClasses(Boolean(errors.phone))}
          />
        </Field>
      </div>

      <Field id="email" label="Email Address" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => setField("email")(event.target.value)}
          onBlur={handleBlur("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="you@example.com"
          className={controlClasses(Boolean(errors.email))}
        />
      </Field>

      <Field id="need" label="What do you need?" error={errors.need}>
        <div className="relative">
          <select
            id="need"
            name="need"
            value={values.need}
            onChange={(event) => setField("need")(event.target.value)}
            onBlur={handleBlur("need")}
            aria-invalid={Boolean(errors.need)}
            aria-describedby={errors.need ? "need-error" : undefined}
            className={`${controlClasses(Boolean(errors.need))} appearance-none pr-11`}
          >
            <option value="">Choose what fits best</option>
            {enquiryReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>

          <Icon
            name="chevron-down"
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </Field>

      <Field
        id="message"
        label="Message"
        error={errors.message}
        hint="Your vehicle or what you're trying to power helps us answer properly."
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => setField("message")(event.target.value)}
          onBlur={handleBlur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "message-error" : "message-hint"
          }
          placeholder="Tell us what you need"
          className={`${controlClasses(Boolean(errors.message))} resize-y`}
        />
      </Field>

      {result?.status === "error" && (
        <p
          role="alert"
          className="rounded-[var(--radius-btn)] border border-[#e0a9a3] bg-[#fdf3f2] px-4 py-3 text-[var(--text-small)] text-[#b4443a]"
        >
          {result.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send Message"}
        </Button>

        {!ENQUIRY_ENDPOINT && process.env.NODE_ENV !== "production" && (
          <span className="text-[var(--text-micro)] text-muted">
            No enquiry endpoint configured &mdash; see lib/enquiry.ts
          </span>
        )}
      </div>
    </form>
  );
}
