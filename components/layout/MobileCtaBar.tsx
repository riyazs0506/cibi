import Link from "next/link";
import { contact } from "@/data/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FINDER_HREF } from "./Header";

interface BarAction {
  label: string;
  href: string;
  icon: IconName;
  /** The middle action is emphasised; the outer two stay quiet. */
  emphasis?: boolean;
  external?: boolean;
}

/**
 * Fixed bottom bar, mobile only.
 *
 * The Call action appears only once a real phone number is configured, so the
 * bar never offers a link that goes nowhere. Its height is reserved by the
 * spacer in app/layout.tsx so it never covers page content.
 */
export function MobileCtaBar() {
  const actions: BarAction[] = [];

  if (contact.phoneHref) {
    actions.push({
      label: "Call",
      href: `tel:${contact.phoneHref}`,
      icon: "phone",
      external: true,
    });
  }

  actions.push({
    label: "Find System",
    href: FINDER_HREF,
    icon: "sun",
    emphasis: true,
  });

  actions.push({ label: "Contact", href: "/contact", icon: "mail" });

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-md lg:hidden">
      <nav aria-label="Quick actions" className="mx-auto max-w-lg">
        <ul className="flex items-stretch gap-1 px-3 py-2.5">
          {actions.map((action) => {
            const inner = (
              <>
                <Icon name={action.icon} size={19} />
                <span className="font-display text-[var(--text-micro)] font-semibold">
                  {action.label}
                </span>
              </>
            );

            const classes = [
              "flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2",
              "transition-colors duration-[var(--duration-soft)]",
              action.emphasis
                ? "bg-accent text-navy"
                : "text-slate hover:bg-tint-blue hover:text-accent-deep",
            ].join(" ");

            return (
              <li key={action.label} className="flex-1">
                {action.external ? (
                  <a href={action.href} className={classes}>
                    {inner}
                  </a>
                ) : (
                  <Link href={action.href} className={classes}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
