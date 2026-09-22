"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

/** Where the "Design Your System" call to action points. */
export const FINDER_HREF = "/#solar-finder";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Shadow appears only once the page has moved, per the header spec. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu whenever navigation actually happens. */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* Escape closes; the page behind must not scroll while the menu is open. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color]",
        "duration-[var(--duration-soft)] ease-[var(--ease-soft)]",
        "bg-surface/95 backdrop-blur-md supports-[backdrop-filter]:bg-surface/95",
        scrolled
          ? "border-line shadow-[var(--shadow-header)]"
          : "border-transparent",
      ].join(" ")}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4 md:h-[5.5rem]">
        <Logo />

        {/* ---------------------------- Desktop nav --------------------------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative rounded-lg px-3.5 py-2 font-display text-[0.9375rem] font-semibold",
                      "transition-colors duration-[var(--duration-soft)]",
                      active
                        ? "text-navy"
                        : "text-slate hover:text-navy",
                    ].join(" ")}
                  >
                    {link.label}
                    {/* Soft underline marks the current section. */}
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent",
                        "transition-opacity duration-[var(--duration-soft)]",
                        active ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact#enquiry-form" variant="primary" size="md" withArrow>
            Let’s talk solar
          </Button>
        </div>

        {/* --------------------------- Mobile toggle -------------------------- */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex items-center gap-2 rounded-lg px-2 py-2 font-display text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-navy transition-colors duration-[var(--duration-soft)] hover:text-accent-deep lg:hidden"
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      {/* ---------------------------- Mobile menu ---------------------------- */}
      {/* Kept mounted and toggled with `hidden` so the collapse is not animated
          into an empty box, and so links stay in the DOM for the browser. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="border-t border-line bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x py-5">
          <ul className="flex flex-col">
            {primaryNav.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="border-b border-line-soft last:border-b-0">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "flex items-center justify-between py-3.5 font-display text-lg font-semibold",
                      "transition-colors duration-[var(--duration-soft)]",
                      active ? "text-accent-deep" : "text-navy",
                    ].join(" ")}
                    onClick={closeMenu}
                  >
                    {link.label}
                    <Icon name="arrow-right" size={18} className="text-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Button
            href="/contact#enquiry-form"
            variant="primary"
            size="lg"
            className="mt-5 w-full"
            onClick={closeMenu}
          >
            Let’s talk solar
          </Button>
        </nav>
      </div>
    </header>
  );
}
