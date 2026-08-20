"use client";

import { CASES } from "./data";
import { cx } from "@/lib/cx";

/*
 * Today, the hero experience: what changed, why it matters, what happens
 * next. One case needs judgment, one is prepared and waits for approval,
 * one is already handled. The system did the first round of thinking;
 * the manager gets the decisions.
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
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-semibold text-fg">
          Your operation, reduced to what matters
        </p>
        <p className="font-mono text-[10px] tracking-[0.05em] text-faint">
          {approved ? "1 NEEDS YOU" : "2 NEED YOU"} · {approved ? "2" : "1"}{" "}
          HANDLED · 5 ASSETS QUIET
        </p>
      </div>

      <ul className="mt-3 space-y-3">
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
              <div className="flex items-center justify-between border-b border-hairline-l px-4 py-2">
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
              <div className="grid gap-2 px-4 py-3 lg:grid-cols-[1.1fr_1fr_1.2fr] lg:gap-4">
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

      <p className="mt-3 font-mono text-[10px] tracking-[0.05em] text-faint">
        SEE · UNDERSTAND · ACT · MEASURE · IMPROVE — EVERY RESOLVED CASE SHARPENS THE NEXT ONE
      </p>
    </div>
  );
}
