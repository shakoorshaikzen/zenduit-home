"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { cx } from "@/lib/cx";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NAV_CTA, NAV_MENUS, type NavColumn, type NavItem, type NavPromo } from "./nav-menu";

/*
 * Site navigation, built to the four megamenu comps in `nav bar/`.
 *
 * The comps put a light panel under a near-black bar, so the panel uses the
 * system's own paper surfaces rather than a new palette. Opens on hover for
 * pointers and on Enter/Space for keyboards; Escape closes and hands focus
 * back to the trigger; a click outside closes it.
 */

const CLOSE_DELAY = 120;

/* ---------- Desktop panel pieces ---------- */

function ItemLink({ item, variant }: { item: NavItem; variant: NavColumn["variant"] }) {
  const Icon = item.icon;

  if (variant === "featured") {
    return (
      <a
        href={item.href}
        className="group flex gap-3 rounded-md border border-transparent px-3 py-2.5 transition-colors hover:border-hairline-l hover:bg-paper-raised"
      >
        {Icon && (
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[6px] bg-accent/[0.10] text-accent-deep">
            <Icon size={14} strokeWidth={1.5} aria-hidden />
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-semibold text-fg">{item.label}</span>
          {item.desc && (
            <span className="mt-0.5 block text-[13px] leading-snug text-muted">{item.desc}</span>
          )}
        </span>
      </a>
    );
  }

  if (variant === "detailed") {
    return (
      <a href={item.href} className="group block rounded-md px-3 py-2 transition-colors hover:bg-paper-raised">
        <span className="block text-[0.9375rem] font-semibold text-fg transition-colors group-hover:text-accent-deep">
          {item.label}
        </span>
        {item.desc && (
          <span className="mt-0.5 block text-[13px] leading-snug text-muted">{item.desc}</span>
        )}
      </a>
    );
  }

  return (
    <a
      href={item.href}
      className="block rounded-md px-3 py-1.5 text-[0.9375rem] text-fg transition-colors hover:bg-paper-raised hover:text-accent-deep"
    >
      {item.label}
    </a>
  );
}

function Column({ col }: { col: NavColumn }) {
  return (
    <div className="min-w-0">
      <p className="px-3 text-xs font-medium uppercase tracking-[0.08em] text-faint">{col.header}</p>
      <div className="mt-2 space-y-0.5">
        {col.items.map((item) => (
          <ItemLink key={item.label} item={item} variant={col.variant} />
        ))}
      </div>
      {col.cta && (
        <a
          href={col.cta.href}
          className="mt-2 inline-flex items-center gap-1.5 px-3 text-[0.9375rem] font-medium text-accent-deep underline-offset-4 hover:underline"
        >
          {col.cta.label}
          <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
        </a>
      )}
    </div>
  );
}

function Promo({ promo }: { promo: NavPromo }) {
  return (
    <a
      href={promo.href}
      className="group flex w-[17.5rem] shrink-0 flex-col overflow-hidden rounded-md border border-hairline-d bg-ink-950 transition-colors hover:border-dfg/25"
    >
      {promo.img && (
        <span className="flex h-32 items-center justify-center overflow-hidden border-b border-hairline-d bg-ink-900 p-5">
          <img src={promo.img} alt="" loading="lazy" className="max-h-full w-auto" />
        </span>
      )}
      <span className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-[4px] bg-dfg/10 px-2 py-1 text-xs font-medium uppercase tracking-[0.08em] text-dmuted">
          {promo.badge}
        </span>
        {promo.kicker && (
          <span className="mt-3 block text-[13px] font-medium text-accent-hi">{promo.kicker}</span>
        )}
        <span className="mt-1.5 block text-[0.9375rem] font-semibold leading-snug text-dfg">
          {promo.title}
        </span>
        {promo.desc && (
          <span className="mt-2 block text-[13px] leading-relaxed text-dmuted">{promo.desc}</span>
        )}
        {promo.cta && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-dfg">
            {promo.cta}
            <ArrowRight size={13} strokeWidth={1.5} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </span>
    </a>
  );
}

/* ---------- Nav ---------- */

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes whatever is open; focus returns to the trigger the browser
     already has, so we only clear state. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* A click anywhere outside the bar closes the panel. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  }, [cancelClose]);

  return (
    <header
      ref={barRef}
      className={cx(
        /* Layer scale: skip link 100 > nav 50 > demo tour 30 > detail sheet 20.
           The dropdown below sets z-50 inside THIS element, so its level against
           the page is the nav's, not its own — the nav must outrank the page. */
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled || open
          ? "border-hairline-d bg-ink-950/85 backdrop-blur-xl"
          : "border-transparent bg-ink-950",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[75rem] items-center justify-between gap-6 px-5 py-3.5 sm:px-8"
      >
        <a href="#main" aria-label="Zenduit home" className="shrink-0 rounded-sm">
          <Logo tone="dark" />
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={scheduleClose}>
          {NAV_MENUS.map((menu) => {
            const isOpen = open === menu.label;
            return (
              <li key={menu.label} className="static">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpen(menu.label);
                  }}
                  onClick={() => setOpen(isOpen ? null : menu.label)}
                  className={cx(
                    "inline-flex cursor-pointer items-center gap-1 rounded-[6px] px-3 py-2 text-sm transition-colors",
                    isOpen ? "bg-dfg/[0.08] text-dfg" : "text-dmuted hover:text-dfg",
                  )}
                >
                  {menu.label}
                  <ChevronDown
                    size={13}
                    strokeWidth={1.5}
                    aria-hidden
                    className={cx(
                      "text-dfaint transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {isOpen && (
                  <div
                    onMouseEnter={cancelClose}
                    className="absolute left-1/2 top-full z-50 w-[min(76rem,calc(100vw-3rem))] -translate-x-1/2 pt-2"
                  >
                    <div className="flex gap-8 rounded-lg border border-hairline-l bg-card p-6 shadow-[0_32px_64px_-24px_rgb(2_6_18/0.55)]">
                      <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-6">
                        {menu.columns.map((col) => (
                          <Column key={col.header} col={col} />
                        ))}
                      </div>
                      {menu.promo && <Promo promo={menu.promo} />}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" href={NAV_CTA.href}>
            <span className="sm:hidden">{NAV_CTA.shortLabel}</span>
            <span className="max-sm:hidden">{NAV_CTA.label}</span>
          </Button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid size-9 cursor-pointer place-items-center rounded-[6px] text-dmuted transition-colors hover:bg-dfg/[0.06] hover:text-dfg lg:hidden"
          >
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer — same destinations, collapsed into native disclosures */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-hairline-d bg-ink-950 lg:hidden">
          <div className="px-5 py-4 sm:px-8">
            {NAV_MENUS.map((menu) => (
              <details key={menu.label} className="group border-b border-hairline-d py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[0.9375rem] font-medium text-dfg [&::-webkit-details-marker]:hidden">
                  {menu.label}
                  <ChevronDown
                    size={15}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-dfaint transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="pb-3">
                  {menu.columns.map((col) => (
                    <div key={col.header} className="mt-3 first:mt-0">
                      <p className="text-xs font-medium uppercase tracking-[0.08em] text-dfaint">
                        {col.header}
                      </p>
                      <ul className="mt-1.5 space-y-0.5">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              className="block rounded-[6px] py-2 text-[0.9375rem] text-dmuted transition-colors hover:text-dfg"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                        {col.cta && (
                          <li>
                            <a
                              href={col.cta.href}
                              className="inline-flex items-center gap-1.5 py-2 text-[0.9375rem] font-medium text-accent-hi"
                            >
                              {col.cta.label}
                              <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))}

            {/* The canonical label, full length, where there is room for it */}
            <Button size="lg" href={NAV_CTA.href} className="mt-5 w-full">
              {NAV_CTA.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
