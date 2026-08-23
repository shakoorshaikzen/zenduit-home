"use client";

import { Check } from "lucide-react";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import { Kpi } from "./chrome";
import { ASSETS, EVENTS, EVENT_DETAIL, RISKS } from "./data";
import { DetailSheet, SheetGroup, SheetRow } from "./detail-sheet";

/*
 * Safety module — Overview (KPI cards + risk factors) and Exceptions
 * (coaching queue + night-road clip frame), in the grammar of the real
 * ZenduONE console. Every number ties back to the one synthetic fleet in
 * ./data: three events, three risk rules, a fleet of five.
 */

/* ---------- Safety · Overview ---------- */

export function SafetyOverview({ onReview }: { onReview: (eventIndex: number) => void }) {
  return (
    <div className="h-full overflow-y-auto p-4 lg:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[13px] font-semibold text-fg">Safety overview for drivers</p>
        <p className="font-mono text-[11px] tracking-[0.05em] text-faint">
          AUG 16 – AUG 22 · 1,284 KM DRIVEN
        </p>
      </div>

      {/* All four deltas are improvements — teal, per the week's numbers. */}
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Needs review" value="1" delta="-3" />
        <Kpi label="Needs coaching" value="1" delta="-2" />
        <Kpi label="Exceptions this week" value="3" delta="-5" />
        <Kpi label="Avg days to close" value="1.2" delta="-0.4" />
      </div>

      <div className="mt-4 overflow-hidden rounded-md border border-hairline-l">
        <div className="flex items-center justify-between gap-3 border-b border-hairline-l bg-paper-raised px-4 py-2.5">
          <p className="font-mono text-[11px] tracking-[0.08em] text-faint">RISK FACTORS · THIS WEEK</p>
          <p className="hidden font-mono text-[11px] tracking-[0.08em] text-faint sm:block">
            RULE · COUNT · RATE · IMPACT · ACTION
          </p>
        </div>
        <ul className="divide-y divide-hairline-l">
          {RISKS.map((r) => (
            <li
              key={r.rule}
              className="grid grid-cols-[1.3fr_0.7fr_0.9fr_0.6fr_0.6fr] items-center gap-2 px-4 py-2.5"
            >
              <span className="text-[13px] font-medium text-fg">{r.rule}</span>
              <span className="font-mono text-[11px] tabular-nums text-muted">{r.count}</span>
              <span className="font-mono text-[11px] tabular-nums text-muted">{r.rate}</span>
              <span className="font-mono text-[11px] tabular-nums text-fg">{r.impact}</span>
              <button
                type="button"
                onClick={() => onReview(Math.min(r.eventIndex, EVENTS.length - 1))}
                aria-label={`Review ${r.rule} exception clip`}
                className="cursor-pointer text-right font-mono text-[11px] text-accent-deep underline-offset-2 hover:underline"
              >
                REVIEW
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 font-mono text-[11px] tracking-[0.05em] text-faint">
        SAFETY SCORE 94 · PREVIOUS 91 · {EVENTS.length} EXCEPTIONS ACROSS {ASSETS.length} ASSETS
      </p>
    </div>
  );
}

/* ---------- Safety · Exceptions (coaching) ---------- */

/* Severity pill and status chip, coloured the way the real Exceptions view
   colours them: amber while a human still owes it something, blue once a
   review has closed it, teal once it is in coaching. */
const SEVERITY_STYLE = {
  HIGH: "bg-alarm/15 text-alarm-deep",
  MEDIUM: "bg-warn/20 text-warn-deep",
  LOW: "bg-accent/10 text-accent-deep",
} as const;

function statusStyle(status: string) {
  if (status === "REVIEWED") return "bg-accent/10 text-accent-deep";
  if (status === "COACHED") return "bg-signal/15 text-signal-deep";
  return "bg-warn/20 text-warn-deep";
}

export function SafetyCoaching({
  event,
  onEvent,
  queued,
  onQueue,
}: {
  event: number;
  onEvent: (i: number) => void;
  queued: string[];
  onQueue: (id: string) => void;
}) {
  const [record, setRecord] = useState(false);

  const current = EVENTS[event] ?? EVENTS[0];
  const inQueue = queued.includes(current.id);
  const detail = EVENT_DETAIL[current.id];
  const status = inQueue ? "COACHED" : current.status;

  return (
    <div className="relative grid h-full grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* The queue, carrying the same columns the real list does */}
      <div className="hidden h-full flex-col overflow-y-auto border-r border-hairline-l lg:flex">
        <div className="flex items-center justify-between border-b border-hairline-l px-4 py-3">
          <p className="text-[13px] font-medium tracking-[0.06em] text-faint">
            EXCEPTIONS
          </p>
          <p className="text-[13px] font-medium text-faint">{EVENTS.length}</p>
        </div>
        <ul className="divide-y divide-hairline-l">
          {EVENTS.map((e, i) => {
            const coached = queued.includes(e.id);
            const rowStatus = coached ? "COACHED" : e.status;
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => onEvent(i)}
                  aria-current={event === i ? "true" : undefined}
                  className={cx(
                    "w-full cursor-pointer px-4 py-3.5 text-left transition-colors",
                    event === i ? "bg-accent/[0.07]" : "hover:bg-ink-900/[0.03]",
                  )}
                >
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-fg">
                    <span
                      aria-hidden
                      className={cx(
                        "size-1.5 shrink-0 rounded-full",
                        e.tone === "alarm"
                          ? "bg-alarm"
                          : e.tone === "warn"
                            ? "bg-warn"
                            : "bg-accent",
                      )}
                    />
                    {e.label}
                  </span>
                  <span className="mt-1 block text-[13px] text-muted">
                    {e.asset} · {e.driver}
                  </span>
                  <span className="mt-1.5 flex items-center gap-2">
                    <span
                      className={cx(
                        "rounded-pill px-2 py-0.5 text-[13px] font-medium",
                        statusStyle(rowStatus),
                      )}
                    >
                      {rowStatus === "NEEDS REVIEW"
                        ? "Needs review"
                        : rowStatus === "NEEDS COACHING"
                          ? "Needs coaching"
                          : rowStatus === "COACHED"
                            ? "Coached"
                            : "Reviewed"}
                    </span>
                    <span className="text-[13px] text-faint">{e.time}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The exception itself: header, the real clip, then its record */}
      <div className="flex min-w-0 flex-col overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-hairline-l px-4 py-3 lg:px-5">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[13px] font-semibold text-fg">
              {current.label}
              <span
                className={cx(
                  "rounded-pill px-2 py-0.5 text-[13px] font-medium",
                  SEVERITY_STYLE[current.severity],
                )}
              >
                {current.severity}
              </span>
            </p>
            <p className="mt-0.5 text-[13px] text-faint">{detail.when}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cx(
                "rounded-pill px-2.5 py-1 text-[13px] font-medium",
                statusStyle(status),
              )}
            >
              {status === "COACHED"
                ? "Coached"
                : status === "REVIEWED"
                  ? "Reviewed"
                  : status === "NEEDS REVIEW"
                    ? "Needs review"
                    : "Needs coaching"}
            </span>
            <span className="text-[13px] text-faint">
              {event + 1} of {EVENTS.length}
            </span>
          </div>
        </div>

        {/* The clip, exactly as the camera exported it. preload="none" keeps a
            21 MB export off the wire until someone actually presses play, and
            the poster means the frame is never blank. key= forces the element
            to pick up the new source when the selection changes. */}
        <div className="relative bg-ink-950">
          <video
            key={current.id}
            controls
            playsInline
            muted
            preload="none"
            poster={detail.poster}
            aria-label={`${current.label} on ${current.asset}, ${detail.when} (${detail.channels})`}
            className="mx-auto block h-[212px] w-full bg-ink-950 object-contain"
          >
            <source src={detail.video} type="video/mp4" />
          </video>
          <span className="pointer-events-none absolute left-3 top-3 rounded-[6px] bg-ink-950/80 px-2 py-1 text-[13px] font-medium text-dmuted">
            {detail.channels}
          </span>
        </div>

        {/* Event details, the fields the real record leads with */}
        <div className="grid shrink-0 grid-cols-2 gap-x-5 gap-y-2.5 border-t border-hairline-l px-4 py-3 sm:grid-cols-3 lg:px-5">
          {[
            ["Vehicle & driver", `${current.asset} · ${current.driver}`],
            ["Speed", detail.speed],
            ["Duration", detail.duration],
            ["Location", detail.place],
            ["GPS", detail.coords],
            ["Rule", current.label],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[13px] font-medium tracking-[0.06em] text-faint">
                {k.toUpperCase()}
              </p>
              <p className="mt-0.5 truncate text-[13px] font-medium text-fg" title={v}>
                {v}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline-l px-4 py-3 lg:px-5">
          <p className="max-w-sm text-[13px] leading-snug text-muted">
            {detail.description}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setRecord(true)}
              className="cursor-pointer rounded-sm border border-hairline-l px-3 py-1.5 text-[13px] font-medium text-muted transition-colors hover:text-fg"
            >
              View record
            </button>
            <button
              type="button"
              onClick={() => onQueue(current.id)}
              disabled={inQueue}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[13px] font-medium transition-colors",
                inQueue
                  ? "cursor-default bg-signal/15 text-signal-deep"
                  : "cursor-pointer bg-accent-deep text-dfg hover:bg-accent-deeper",
              )}
            >
              {inQueue && <Check size={13} strokeWidth={2} aria-hidden />}
              {inQueue ? "In coaching queue" : "Add to coaching queue"}
            </button>
          </div>
        </div>
      </div>

      <DetailSheet
        open={record}
        onClose={() => setRecord(false)}
        eyebrow={`EXCEPTION · ${current.severity}`}
        title={current.label}
        footer={
          <p className="text-[13px] leading-relaxed tracking-[0.04em] text-faint">
            AUDIO, TRIP REPLAY AND DRIVER HISTORY OPEN IN THE FULL CONSOLE
          </p>
        }
      >
        <SheetGroup title="EVENT">
          <SheetRow label="ASSET" value={current.asset} />
          <SheetRow label="DRIVER" value={current.driver} />
          <SheetRow label="WHEN" value={detail.when} />
          <SheetRow label="WHERE" value={detail.place} />
          <SheetRow label="GPS" value={detail.coords} />
        </SheetGroup>

        <SheetGroup title="READINGS">
          <SheetRow
            label="SPEED"
            value={detail.speed}
            tone={current.tone === "alarm" ? "alarm" : current.tone === "warn" ? "warn" : "signal"}
          />
          <SheetRow label="CHANNELS" value={detail.channels} />
          <SheetRow label="CLIP" value={detail.duration} />
        </SheetGroup>

        <SheetGroup title="WHY IT WAS FLAGGED">
          <p className="text-[13px] leading-relaxed text-muted">{detail.description}</p>
        </SheetGroup>

        <SheetGroup title="COACHING">
          <SheetRow
            label="STATUS"
            value={inQueue ? "In coaching queue" : current.status}
            tone={inQueue ? "signal" : "warn"}
          />
        </SheetGroup>
      </DetailSheet>
    </div>
  );
}
