import { missingSiteConfig } from "@/data/site";

/**
 * Development-only reminder of what still needs real client data.
 *
 * This exists so the placeholders in data/site.ts cannot be forgotten, while
 * guaranteeing nothing resembling a placeholder reaches a visitor: the whole
 * component is compiled out of a production build by the NODE_ENV check.
 */
export function DevSetupBanner() {
  if (process.env.NODE_ENV === "production") return null;

  const missing = missingSiteConfig();
  if (missing.length === 0) return null;

  return (
    <div className="border-b border-amber-300 bg-amber-50 text-amber-900">
      <div className="container-x py-2.5">
        <p className="text-[var(--text-micro)] leading-relaxed">
          <strong className="font-display font-bold">Setup required</strong>{" "}
          (development only, never shown in production) &mdash; still awaiting
          real values for{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">
            {missing.join(", ")}
          </code>
          . See <span className="font-semibold">SETUP.md</span>.
        </p>
      </div>
    </div>
  );
}
