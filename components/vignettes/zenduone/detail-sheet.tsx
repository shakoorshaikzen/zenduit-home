"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cx } from "@/lib/cx";

/*
 * The console's detail pop-up.
 *
 * Interactive-demo research (Navattic/Storylane-class sandboxes, and Samsara's
 * own Navattic tours) lands on the same shape: free clicking is only worth
 * anything if a click PAYS OFF with real depth. This is that payoff — a sheet
 * that slides over the stage, the way a real console opens a record.
 *
 * It is scoped to the stage (absolute, not fixed) so the demo never hijacks
 * the page, and it is a real dialog: labelled, Escape-closable, focus-trapped,
 * and it returns focus to whatever row opened it.
 */

export function DetailSheet({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-20">
      {/* Scrim: dismisses, and dims the stage without hiding where you were */}
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink-950/35 backdrop-blur-[1px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${eyebrow}: ${title}`}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-[22rem] flex-col border-l border-hairline-l bg-card shadow-[-24px_0_48px_-24px_rgb(19_27_46/0.28)] outline-none"
      >
        <div className="flex items-start justify-between gap-3 border-b border-hairline-l px-4 py-3">
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.08em] text-faint">{eyebrow}</p>
            <p className="mt-1 truncate text-[15px] font-semibold text-fg">{title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="-mr-1 grid size-7 shrink-0 cursor-pointer place-items-center rounded-sm text-faint transition-colors hover:bg-ink-900/[0.04] hover:text-fg"
          >
            <X size={15} strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">{children}</div>

        {footer && (
          <div className="border-t border-hairline-l px-4 py-3">{footer}</div>
        )}
      </div>
    </div>
  );
}

/** Label/value row — the sheet's workhorse. */
export function SheetRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone?: "default" | "alarm" | "warn" | "signal";
}) {
  const toneClass = {
    default: "text-fg",
    alarm: "text-alarm-deep",
    warn: "text-warn-deep",
    signal: "text-signal-deep",
  }[tone ?? "default"];

  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-faint">
        {label}
      </span>
      <span className={cx("text-right text-[13px]", toneClass)}>{value}</span>
    </div>
  );
}

/** Section heading inside a sheet. */
export function SheetGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-hairline-l pt-3 first:border-t-0 first:pt-0 [&+&]:mt-3">
      <p className="font-mono text-[11px] tracking-[0.08em] text-faint">{title}</p>
      <div className="mt-1.5">{children}</div>
    </section>
  );
}
