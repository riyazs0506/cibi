"use client";

import { useEffect, useRef, useState } from "react";

export interface RevealProps {
  children: React.ReactNode;
  /** Stagger, in ms, for items revealed as a group. Keep under ~200ms. */
  delay?: number;
  className?: string;
  /** Element to render. Use "li" inside lists so markup stays valid. */
  as?: "div" | "li" | "section" | "article";
  /**
   * For content that is already on screen when the page loads - page heroes,
   * above all. Animates straight away from CSS instead of waiting to be
   * scrolled into view. See the note on JS independence below.
   */
  onLoad?: boolean;
}

/**
 * Fades content up as it scrolls into view.
 *
 * Progressive enhancement, deliberately:
 *   - Without JS the content is simply visible (the <noscript> override in
 *     app/layout.tsx lifts the hidden state), so crawlers and no-JS users
 *     lose nothing.
 *   - With `prefers-reduced-motion: reduce` the CSS never hides it either, so
 *     no observer work is wasted and nothing moves.
 *
 * Each element is unobserved once revealed - this never re-animates on scroll.
 *
 * `onLoad` exists because the scroll-triggered path is wrong for anything
 * above the fold: it paints at `opacity: 0` and only becomes visible once
 * React has hydrated and the observer has fired. Chrome does not count
 * `opacity: 0` text as painted, so using it on an <h1> pushes Largest
 * Contentful Paint out to whenever the JS bundle happens to land. `onLoad`
 * renders a class that animates purely in CSS - no hydration, no observer,
 * visible on the first frame the stylesheet is applied.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  onLoad = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    /* CSS drives the on-load variant end to end; nothing to observe. */
    if (onLoad) return;

    const node = ref.current;
    if (!node || revealed) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        }
      },
      /* Fire slightly before the element reaches the fold so the motion has
         finished by the time it is properly in view. */
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed, onLoad]);

  const motionClass = onLoad
    ? "reveal-load"
    : `reveal${revealed ? " is-visible" : ""}`;

  return (
    <Tag
      ref={ref as never}
      className={`${motionClass} ${className}`.trim()}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
