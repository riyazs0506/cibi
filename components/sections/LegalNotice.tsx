/**
 * Review notice shown at the top of the legal pages.
 *
 * The privacy and terms text describes how this website actually behaves,
 * which is accurate and useful. It is not legal advice, and the specifics that
 * only the business can supply - trading entity, jurisdiction, warranty terms -
 * still need a review before launch. Saying so plainly is more honest than
 * presenting an unreviewed template as settled policy.
 */
export function LegalNotice() {
  return (
    <div className="rounded-[var(--radius-card)] border border-accent/25 bg-tint-blue p-5">
      <p className="text-[var(--text-small)] leading-relaxed text-slate">
        <strong className="font-display font-bold text-navy">
          Please review before launch.
        </strong>{" "}
        This page describes how the website behaves and is a starting point, not
        legal advice. It should be checked against the business&apos;s actual
        practices and local requirements before the site goes live.
      </p>
    </div>
  );
}
