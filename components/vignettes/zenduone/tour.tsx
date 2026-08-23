"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { X } from "lucide-react";
import type { ModuleId } from "./data";

/*
 * A short guided pass over the console: dim everything, ring the one thing
 * being explained, say what it is in a sentence. Each step names the module
 * and view it needs, so the shell can put the console in the right state
 * before the spotlight lands.
 *
 * Escape or the close button leaves at any point, and the status bar keeps a
 * control to run it again, so nobody is trapped and nobody has to reload to
 * see it twice.
 */

export type TourStep = {
  target: string;
  title: string;
  body: string;
  module: ModuleId;
  tab: string;
};

export const TOUR: TourStep[] = [
  {
    target: "rail-today",
    module: "today",
    tab: "cases",
    title: "Today is where the day starts",
    body: "Not a wall of dashboards. The system takes the first pass and leaves you the decisions that need a human.",
  },
  {
    target: "case-review",
    module: "today",
    tab: "cases",
    title: "Every case answers three questions",
    body: "What changed, why it matters, and what happens next — so you are deciding, not assembling context.",
  },
  {
    target: "case-approve",
    module: "today",
    tab: "cases",
    title: "The work is already prepared",
    body: "A fault became a drafted work order with parts checked and a slot open. Approving it is one click, right here.",
  },
  {
    target: "rail-maps",
    module: "maps",
    tab: "live",
    title: "Maps is the live picture",
    body: "Every vehicle and asset, where it is and what it is doing. Click any one of them to open its record.",
  },
  {
    target: "rail-safety",
    module: "safety",
    tab: "coaching",
    title: "Safety arrives with the footage",
    body: "Each exception carries the camera's own clip and its readings, playing on arrival, so you coach from evidence instead of argument.",
  },
  {
    target: "rail-maintain",
    module: "maintain",
    tab: "schedules",
    title: "Maintain closes the loop",
    body: "Faults and service intervals become scheduled work before they become a breakdown on a route.",
  },
];

type Box = { left: number; top: number; width: number; height: number };

export function TourOverlay({
  step,
  index,
  total,
  container,
  onNext,
  onBack,
  onExit,
}: {
  step: TourStep;
  index: number;
  total: number;
  container: HTMLElement | null;
  onNext: () => void;
  onBack: () => void;
  onExit: () => void;
}) {
  const [box, setBox] = useState<Box | null>(null);

  /* The console re-renders when a step changes its module, so the target may
     not exist on the first frame. Poll a few frames rather than measuring
     once and missing. */
  const measure = useCallback(() => {
    if (!container) return false;
    const el = container.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
    if (!el) return false;
    const c = container.getBoundingClientRect();
    const t = el.getBoundingClientRect();
    if (t.width === 0 || t.height === 0) return false;
    setBox({
      left: t.left - c.left,
      top: t.top - c.top,
      width: t.width,
      height: t.height,
    });
    return true;
  }, [container, step.target]);

  useLayoutEffect(() => {
    let frames = 0;
    let raf = 0;
    const tick = () => {
      if (measure() || frames > 30) return;
      frames += 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [measure]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  /* Escape leaves; arrows move. A guide you cannot dismiss from the keyboard
     is a trap for anyone not using a mouse. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onBack, onExit]);

  if (!box) return null;

  const ch = container?.clientHeight ?? 0;
  const cw = container?.clientWidth ?? 0;
  const below = box.top + box.height + 190 < ch;
  const cardTop = below ? box.top + box.height + 12 : Math.max(12, box.top - 178);
  /* Keep the card inside the window on both edges. */
  const cardLeft = Math.min(Math.max(12, box.left + box.width / 2 - 150), Math.max(12, cw - 312));
  const last = index === total - 1;

  return (
    <div
      className="absolute inset-0 z-40"
      role="dialog"
      aria-modal="false"
      aria-label={`Guided tour, step ${index + 1} of ${total}: ${step.title}`}
    >
      {/* The spotlight: a ring on the target, with the rest of the console
          dimmed by one very large shadow the window clips. */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-md ring-2 ring-accent transition-all duration-300 ease-out"
        style={{
          left: box.left - 3,
          top: box.top - 3,
          width: box.width + 6,
          height: box.height + 6,
          boxShadow: "0 0 0 9999px rgb(6 10 20 / 0.76)",
        }}
      />

      <div
        className="absolute w-[300px] rounded-md border border-hairline-l bg-card p-4 shadow-console transition-all duration-300 ease-out"
        style={{ left: cardLeft, top: cardTop }}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.08em] text-accent-deep">
            STEP {index + 1} OF {total}
          </p>
          <button
            type="button"
            onClick={onExit}
            aria-label="Close the guide"
            className="-mr-1 -mt-1 cursor-pointer rounded-sm p-1 text-faint transition-colors hover:text-fg"
          >
            <X size={14} strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        <p className="mt-2 text-[13px] font-semibold leading-snug text-fg">{step.title}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.body}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onExit}
            className="cursor-pointer font-mono text-[11px] tracking-[0.05em] text-faint transition-colors hover:text-muted"
          >
            SKIP
          </button>
          <div className="flex items-center gap-2">
            {index > 0 && (
              <button
                type="button"
                onClick={onBack}
                className="cursor-pointer rounded-sm border border-hairline-l px-2.5 py-1.5 font-mono text-[11px] tracking-[0.05em] text-muted transition-colors hover:text-fg"
              >
                BACK
              </button>
            )}
            <button
              type="button"
              onClick={last ? onExit : onNext}
              className="cursor-pointer rounded-sm bg-accent-deep px-3 py-1.5 font-mono text-[11px] tracking-[0.05em] text-dfg transition-colors hover:bg-accent-deeper"
            >
              {last ? "DONE" : "NEXT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
