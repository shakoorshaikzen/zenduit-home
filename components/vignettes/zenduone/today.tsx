"use client";

import { Kpi } from "./chrome";
import { CASES } from "./data";
import { cx } from "@/lib/cx";

/*
 * Today, the hero experience: what changed, why it matters, what happens
 * next. One case needs judgment, one is prepared and waits for approval,
 * one is already handled. The system did the first round of thinking;
 * the manager gets the decisions.
 *
 * The layout follows the real console's dashboard grammar — a stat-card row
 * over a record list, the same shape Safety Overview and Maintain Schedules
 * use — so Today reads as a view of the platform rather than a marketing
 * panel. The cards measure attention: how much coordination work the system
 * removed, not how many events it detected.
 */

const TONE_DOT = {
  alarm: "bg-alarm",
  warn: "bg-warn",
  signal: "bg-signal",
} as const;

export function TodayPane({
  approved,
  onReview,
  onApprove,
}: {
  approved: boolean;
  onReview: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="h-full overflow-y-auto p-4 lg:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[13px] font-semibold text-fg">
          Your operation, reduced to what matters
        </p>
        <p className="font-mono text-[11px] tracking-[0.05em] text-faint">
          THU AUG 20 · 07:48 · FLEET OF 5
        </p>
      </div>

      {/* Attention, measured — the console's own stat-card row */}
      <div className="mt-2.5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <Kpi
          label="Needs your judgment"
          value={approved ? "1" : "2"}
          delta={approved ? "-1" : "-4"}
          note="VS YESTERDAY"
        />
        <Kpi
          label="Handled for you"
          value={approved ? "7" : "6"}
          delta="+2"
          note="VS YESTERDAY"
        />
        <Kpi label="Time to context" value="38s" delta="-4m 20s" />
        <Kpi label="Manager time returned" value="3h 10m" delta="+40m" />
      </div>

      <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-faint">
        CASES · THIS SHIFT
      </p>

      <ul className="mt-2 space-y-2.5">
        {CASES.map((c) => {
          const done = c.kind === "handled" || (c.kind === "approve" && approved);
          return (
            <li
              key={c.id}
              className={cx(
                "overflow-hidden rounded-md border border-hairline-l bg-card",
                done && "opacity-80",
              )}
            >
              <div className="flex items-center justify-between border-b border-hairline-l px-4 py-1.5">
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-faint">
                  <span
                    aria-hidden
                    className={cx(
                      "size-1.5 rounded-full",
                      done ? "bg-signal" : TONE_DOT[c.tone],
                    )}
                  />
                  WHAT CHANGED
                </span>
                <span className="font-mono text-[10px] tracking-[0.08em] text-faint">
                  {c.kind === "review" && "NEEDS YOUR JUDGMENT"}
                  {c.kind === "approve" && (approved ? "APPROVED · SCHEDULED THU" : "PREPARED · AWAITING APPROVAL")}
                  {c.kind === "handled" && "HANDLED · NO ACTION NEEDED"}
                </span>
              </div>
              <div className="grid gap-1.5 px-4 py-2.5 lg:grid-cols-[1.1fr_1fr_1.2fr] lg:gap-4">
                <p className="text-[13px] font-medium leading-snug text-fg">{c.changed}</p>
                <p className="text-xs leading-relaxed text-muted">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-faint">WHY IT MATTERS · </span>
                  {c.matters}
                </p>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs leading-relaxed text-muted">
                    <span className="font-mono text-[10px] tracking-[0.08em] text-faint">NEXT · </span>
                    {c.next}
                  </p>
                  {c.kind === "review" && (
                    <button
                      type="button"
                      onClick={onReview}
                      className="shrink-0 cursor-pointer rounded-sm bg-accent-deep px-3 py-1.5 font-mono text-[11px] tracking-[0.05em] text-dfg transition-colors hover:bg-accent-deeper"
                    >
                      REVIEW
                    </button>
                  )}
                  {c.kind === "approve" && !approved && (
                    <button
                      type="button"
                      onClick={onApprove}
                      className="shrink-0 cursor-pointer rounded-sm bg-accent-deep px-3 py-1.5 font-mono text-[11px] tracking-[0.05em] text-dfg transition-colors hover:bg-accent-deeper"
                    >
                      APPROVE
                    </button>
                  )}
                  {(done || c.kind === "handled") && c.kind !== "review" && (
                    <span className="shrink-0 font-mono text-[11px] tracking-[0.05em] text-signal-deep">
                      ✓ DONE
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
