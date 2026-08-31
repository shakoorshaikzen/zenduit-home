"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { X } from "lucide-react";
import type { ModuleId } from "./data";

/*
 * A short guided pass over the console: back the rest of it off, ring the one
 * thing being explained, say what it is in a sentence. Each step names the
 * module and view it needs, so the shell can put the console in the right
 * state before the spotlight lands.
 *
 * IT IS A COACH MARK, NOT A GATE. The overlay is pointer-events-none apart
 * from its own card, so the console stays fully drivable while the guide is
 * up: a visitor can ignore the steps and start clicking, or follow them and
 * click along. An ungated demo that cannot be touched until you dismiss a
 * modal is just a gate with extra steps.
 *
 * Because the visitor can navigate mid-step, the spotlight re-measures on a
 * timer and drops the ring if its target is genuinely gone, keeping the card
 * so nothing is stranded. Escape or the close button leaves at any point, and
 * the status bar keeps a control to run it again.
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
    body: "What changed, why it matters, and what happens next, so you are deciding rather than assembling context.",
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
  /* Held until the first measurement resolves, so the card does not appear at
     its fallback spot and then slide to the target. */
  const [settled, setSettled] = useState(false);

  /* The console re-renders when a step changes its module, so the target may
     not exist on the first frame. Poll a few frames rather than measuring
     once and missing. */
  const measure = useCallback((clearIfMissing = false) => {
    if (!container) return false;
    const el = container.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
    if (!el) {
      if (clearIfMissing) setBox(null);
      return false;
    }
    const c = container.getBoundingClientRect();
    const t = el.getBoundingClientRect();
    if (t.width === 0 || t.height === 0) {
      if (clearIfMissing) setBox(null);
      return false;
    }
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
      /* No clearIfMissing here: on a step change the new target may not exist
         for a frame or two, and holding the previous box lets the ring travel
         to it instead of blinking out and back. */
      if (measure() || frames > 30) {
        setSettled(true);
        return;
      }
      frames += 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [measure]);

  /* Steady state: the visitor can drive the console while the guide is up, so
     the ring has to keep up with it, and let go when its target is gone. */
  useEffect(() => {
    const id = setInterval(() => measure(true), 300);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", onResize);
    };
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

  if (!settled && !box) return null;

  const ch = container?.clientHeight ?? 0;
  const cw = container?.clientWidth ?? 0;
  const CARD_W = 300;
  const CARD_H = 178;

  /* Placement has one job beyond looking tidy: never cover the thing the
     visitor might want to click next. Dropping the card under a left-rail
     item lands it squarely on the rest of the rail, so a narrow target near
     the left edge gets the card BESIDE it instead of below it. Wide targets
     in the body keep the under/over placement, which covers nothing. */
  const beside =
    box !== null &&
    box.left + box.width < cw * 0.35 &&
    cw - (box.left + box.width) > CARD_W + 24;

  const below = box ? box.top + box.height + CARD_H + 12 < ch : false;

  let cardTop: number;
  let cardLeft: number;
  if (box && beside) {
    cardLeft = box.left + box.width + 12;
    cardTop = Math.min(Math.max(12, box.top), Math.max(12, ch - CARD_H - 12));
  } else if (box) {
    cardTop = below ? box.top + box.height + 12 : Math.max(12, box.top - CARD_H);
    cardLeft = Math.min(
      Math.max(12, box.left + box.width / 2 - CARD_W / 2),
      Math.max(12, cw - CARD_W - 12),
    );
  } else {
    /* No target left to point at: park bottom-left, still operable. */
    cardTop = Math.max(12, ch - CARD_H - 22);
    cardLeft = 12;
  }
  const last = index === total - 1;

  return (
    <div
      /* Above the demo's own layers (detail sheet is z-20), below the site
         nav. pointer-events-none is the whole point: the console underneath
         stays clickable while the guide is up. */
      className="pointer-events-none absolute inset-0 z-30"
      role="dialog"
      aria-modal="false"
      aria-label={`Guided tour, step ${index + 1} of ${total}: ${step.title}`}
    >
      {/* The spotlight: a ring on the target, with the rest of the console
          backed off by one very large shadow the window clips. */}
      {box && (
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-md ring-2 ring-accent transition-all duration-300 ease-out"
        style={{
          left: box.left - 3,
          top: box.top - 3,
          width: box.width + 6,
          height: box.height + 6,
          /* Backs the rest of the console off without switching it off. */
          boxShadow: "0 0 0 9999px rgb(6 10 20 / 0.58)",
        }}
      />
      )}

      <div
        className="pointer-events-auto absolute w-[300px] max-w-[calc(100%-24px)] rounded-md border border-hairline-l bg-card p-4 shadow-console transition-all duration-300 ease-out"
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
