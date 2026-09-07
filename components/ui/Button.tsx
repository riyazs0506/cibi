import Link from "next/link";
import { Icon } from "./Icon";

export type ButtonVariant =
  | "primary" /* navy fill, white text - the default action */
  | "secondary" /* white fill, navy border - the paired action */
  | "onDark" /* white fill on the navy CTA band */
  | "onDarkGhost" /* transparent with a light border, on navy */
  | "quiet"; /* text-only, used for inline "View products ->" links */

export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold " +
  "rounded-[var(--radius-btn)] transition-[background-color,color,border-color,box-shadow,transform] " +
  "duration-[var(--duration-soft)] ease-[var(--ease-soft)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 " +
  /* Hover lift is 1px - present enough to feel responsive, never bouncy. */
  "hover:-translate-y-px active:translate-y-0 disabled:opacity-55 " +
  "disabled:pointer-events-none whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white shadow-[var(--shadow-soft)] hover:bg-navy-soft hover:shadow-[var(--shadow-lift)]",
  secondary:
    "bg-surface text-navy border border-line hover:border-accent hover:text-accent-deep hover:shadow-[var(--shadow-soft)]",
  onDark:
    "bg-white text-navy hover:bg-tint-blue shadow-[0_10px_30px_-16px_rgba(0,0,0,0.6)]",
  onDarkGhost:
    "bg-transparent text-white border border-white/30 hover:border-white/70 hover:bg-white/10",
  quiet:
    "text-accent-deep hover:text-navy px-0 hover:translate-y-0 hover:gap-3 underline-offset-4 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  md: "text-[0.9375rem] px-5 py-2.5",
  lg: "text-base px-6 py-3.5",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Appends a right arrow that nudges on hover. */
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type NativeButtonProps = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Renders a real <a> when given an href and a real <button> otherwise, so
 * keyboard behaviour and assistive-technology semantics are always correct.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className = "",
    children,
  } = props;

  const classes = [
    base,
    variants[variant],
    variant === "quiet" ? "" : sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {withArrow && (
        <Icon
          name="arrow-right"
          size={18}
          className="transition-transform duration-[var(--duration-soft)] ease-[var(--ease-soft)] group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, withArrow: _a, className: _c, children: _ch, ...rest } =
      props as AnchorProps;

    if (external) {
      return (
        <a
          href={href}
          className={`group ${classes}`}
          rel="noopener noreferrer"
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={`group ${classes}`} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, withArrow: _a, className: _c, children: _ch, ...rest } =
    props as NativeButtonProps;

  return (
    <button className={`group ${classes}`} {...rest}>
      {content}
    </button>
  );
}
