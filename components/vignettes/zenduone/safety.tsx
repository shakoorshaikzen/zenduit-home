"use client";

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
        <Kpi label="Incidents for review" value="1" delta="-3" />
        <Kpi label="Total coached" value="2" delta="+2" />
        <Kpi label="Total incidents" value="3" delta="-5" />
        <Kpi label="Avg days to coach" value="1.2" delta="-0.4" />
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
        SAFETY SCORE 94 · PREVIOUS 91 · FLEET OF {ASSETS.length}
      </p>
    </div>
  );
}

/* ---------- Safety · Exceptions (coaching) ---------- */

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

  return (
    <div className="relative grid h-full grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)]">
      <div className="hidden h-full flex-col overflow-y-auto border-r border-hairline-l lg:flex">
        <div className="border-b border-hairline-l px-4 py-3">
          <p className="font-mono text-[11px] tracking-[0.08em] text-faint">COACHING QUEUE · THIS WEEK</p>
        </div>
        <ul className="divide-y divide-hairline-l">
          {EVENTS.map((e, i) => {
            const coached = queued.includes(e.id);
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
                  <span className="flex items-center gap-2 font-mono text-xs tracking-[0.05em] text-fg">
                    <span
                      aria-hidden
                      className={cx(
                        "size-1.5 shrink-0 rounded-full",
                        e.tone === "alarm" ? "bg-alarm" : "bg-warn",
                      )}
                    />
                    {e.label}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] tracking-[0.05em] text-faint">
                    {e.asset} · {e.driver} · {e.time}
                  </span>
                  <span
                    className={cx(
                      "mt-1 block font-mono text-[11px] tracking-[0.05em]",
                      coached ? "text-signal-deep" : "text-warn-deep",
                    )}
                  >
                    {coached ? "COACHED" : e.status}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative">
        <ClipFrame event={current} />
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRecord(true)}
            className="cursor-pointer rounded-sm border border-hairline-d bg-ink-950/85 px-3.5 py-2 font-mono text-[11px] tracking-[0.05em] text-dmuted transition-colors hover:text-dfg"
          >
            VIEW RECORD
          </button>
          <button
            type="button"
            onClick={() => onQueue(current.id)}
            disabled={inQueue}
            className={cx(
              "rounded-sm px-3.5 py-2 font-mono text-[11px] tracking-[0.05em] transition-colors",
              inQueue
                ? "cursor-default border border-hairline-d bg-ink-950/85 text-signal"
                : "cursor-pointer bg-accent-deep text-dfg hover:bg-accent-deeper",
            )}
          >
            {inQueue ? "✓ IN COACHING QUEUE" : "ADD TO COACHING QUEUE"}
          </button>
        </div>
      </div>

      <DetailSheet
        open={record}
        onClose={() => setRecord(false)}
        eyebrow={`EXCEPTION · ${current.time}`}
        title={current.label}
        footer={
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.05em] text-faint">
            FULL CLIP, AUDIO AND DRIVER HISTORY OPEN IN THE FULL CONSOLE
          </p>
        }
      >
        <SheetGroup title="EVENT">
          <SheetRow label="ASSET" value={current.asset} />
          <SheetRow label="DRIVER" value={current.driver} />
          <SheetRow label="WHERE" value={detail.location} />
          <SheetRow label="CLIP" value={detail.clip} />
        </SheetGroup>

        <SheetGroup title="READINGS">
          <SheetRow
            label="SPEED"
            value={detail.speed}
            tone={current.tone === "alarm" ? "alarm" : "warn"}
          />
          <SheetRow label="POSTED" value={detail.posted} />
        </SheetGroup>

        <SheetGroup title="WHAT THE AI SAW">
          <p className="text-[13px] leading-relaxed text-muted">{detail.note}</p>
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

/* ---------- Night-road clip frame (drawn camera imagery) ---------- */

export function ClipFrame({ event }: { event: (typeof EVENTS)[number] }) {
  /* The recording clock. A frozen timestamp is the main tell that footage is
     a still, so it advances even under reduced motion: a changing number is
     not motion anyone needs to dodge. */
  const [sec, setSec] = useState(12);
  useEffect(() => {
    setSec(12);
    const id = setInterval(() => setSec((v) => (v + 1) % 60), 1000);
    return () => clearInterval(id);
  }, [event.id]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-950">
      <svg
        viewBox="0 0 900 556"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={`Dash cam clip frame: ${event.label} on ${event.asset} at ${event.time} (demonstration)`}
      >
        <defs>
          {/* Headlight throw: a cone of light that falls off with distance,
              which is what a real dash cam sees at night. */}
          <radialGradient id="zd-throw" cx="50%" cy="100%" r="72%">
            <stop offset="0%" stopColor="#f6e7b8" stopOpacity="0.30" />
            <stop offset="45%" stopColor="#f6e7b8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f6e7b8" stopOpacity="0" />
          </radialGradient>
          {/* Sky gets lighter toward the horizon, never a flat block. */}
          <linearGradient id="zd-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#080d1a" />
            <stop offset="100%" stopColor="#141d33" />
          </linearGradient>
          <clipPath id="zd-road">
            <path d="M 196 556 L 418 326 L 482 326 L 704 556 Z" />
          </clipPath>
        </defs>

        <rect width="900" height="330" fill="url(#zd-sky)" />
        <rect y="326" width="900" height="230" fill="#10151f" />

        {/* Road surface, wide enough at the bottom to read as a lane */}
        <path d="M 196 556 L 418 326 L 482 326 L 704 556 Z" fill="#1b212e" />
        {/* Painted edges converging on the vanishing point */}
        <path d="M 214 556 L 424 328" stroke="#6f7a91" strokeWidth="3" opacity="0.5" />
        <path d="M 686 556 L 476 328" stroke="#6f7a91" strokeWidth="3" opacity="0.5" />

        {/* Lane markings running toward the camera, clipped to the surface so
            a growing dash can never spill onto the shoulder. */}
        <g clipPath="url(#zd-road)">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              className="zd-lane"
              x={444}
              y={432}
              width={12}
              height={34}
              rx={2}
              fill="#c9d2e4"
              style={{ animationDelay: `${i * -0.475}s` }}
            />
          ))}
        </g>

        {/* The light itself, over the surface */}
        <rect
          className="zd-headlight"
          y="270"
          width="900"
          height="286"
          fill="url(#zd-throw)"
        />

        {/* Horizon haze and a few stars */}
        <rect y="308" width="900" height="30" fill="#243149" opacity="0.55" />
        <circle cx="180" cy="120" r="1.5" fill="#5c6a8a" />
        <circle cx="260" cy="80" r="1" fill="#5c6a8a" />
        <circle cx="700" cy="140" r="1.5" fill="#5c6a8a" />
      </svg>

      <span className="absolute left-4 top-4 flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-dfg">
        <span aria-hidden className="size-1.5 rounded-full bg-alarm" />
        REC · {event.time}:{String(sec).padStart(2, "0")}
      </span>
      <span className="absolute right-4 top-4 font-mono text-xs tracking-[0.08em] text-dmuted">
        {event.asset} · ROAD CAM
      </span>
      <span className="absolute bottom-4 left-4 rounded-[6px] border border-hairline-d bg-ink-950/85 px-3 py-2 font-mono text-xs tracking-[0.05em] text-dmuted">
        <span
          aria-hidden
          className={cx(
            "mr-2 inline-block size-1.5 rounded-full",
            event.tone === "alarm" ? "bg-alarm" : "bg-warn",
          )}
        />
        {event.label} · AI FLAGGED
      </span>
    </div>
  );
}
