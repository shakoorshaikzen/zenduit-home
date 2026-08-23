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
              "inline-flex items-center gap-1.5 rounded-sm px-3.5 py-2 font-mono text-[11px] tracking-[0.05em] transition-colors",
              inQueue
                ? "cursor-default border border-hairline-d bg-ink-950/85 text-signal"
                : "cursor-pointer bg-accent-deep text-dfg hover:bg-accent-deeper",
            )}
          >
            {inQueue && <Check size={12} strokeWidth={2} aria-hidden />}
            {inQueue ? "IN COACHING QUEUE" : "ADD TO COACHING QUEUE"}
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

/*
 * The three clips are three different scenes, because the event records say
 * they are: a 74 km/h highway pull at 07:42, a 0.6s follow on a wet urban
 * street at 09:15, and a handheld-device detection at 0 km/h in the yard.
 * The last one is cab-only in the record, so it renders the driver-facing
 * camera rather than a road that cannot be moving.
 */

/*
 * What separates footage from illustration: a wide-angle lens vignette,
 * sensor grain, haze that softens distance, and bloom around anything
 * bright. Defined once and laid over whichever scene is playing.
 */
function CameraOptics() {
  return (
    <>
      <defs>
        <radialGradient id="zd-vig" cx="50%" cy="48%" r="72%">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.42" />
        </radialGradient>
        <filter id="zd-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      {/* Sensor grain: the single biggest tell between video and vector */}
      <rect
        width="900"
        height="556"
        filter="url(#zd-grain)"
        opacity="0.085"
        style={{ mixBlendMode: "overlay" }}
      />
      {/* Lens falloff toward the corners */}
      <rect width="900" height="556" fill="url(#zd-vig)" />
    </>
  );
}

/* Morning highway and wet urban street share the road geometry and differ in
   grade, weather and whether there is a vehicle close ahead. */
function RoadScene({ wet, lead, laneSeconds }: { wet: boolean; lead: boolean; laneSeconds: number }) {
  return (
    <>
      <defs>
        <linearGradient id={wet ? "zd-sky-wet" : "zd-sky-dawn"} x1="0" y1="0" x2="0" y2="1">
          {wet ? (
            <>
              <stop offset="0%" stopColor="#7f8794" />
              <stop offset="100%" stopColor="#b6bcc4" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#5b7fa8" />
              <stop offset="70%" stopColor="#b9c6cf" />
              <stop offset="100%" stopColor="#e8d9bd" />
            </>
          )}
        </linearGradient>
        <radialGradient id="zd-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffeec4" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#ffe0a4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffe0a4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="zd-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfe6ee" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#dfe6ee" stopOpacity="0" />
        </linearGradient>
        <filter id="zd-far" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <filter id="zd-bloom" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="zd-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8cfd8" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#c8cfd8" stopOpacity="0" />
        </linearGradient>
        <clipPath id="zd-road">
          <path d="M 196 556 L 418 326 L 482 326 L 704 556 Z" />
        </clipPath>
      </defs>

      <rect width="900" height="330" fill={`url(#${wet ? "zd-sky-wet" : "zd-sky-dawn"})`} />

      {/* Low morning sun, sitting on the horizon behind the road. Drawn
          before the ground so it reads as sky light, not a road stain. */}
      {!wet && <ellipse cx="466" cy="322" rx="300" ry="150" fill="url(#zd-sun)" />}

      <rect y="326" width="900" height="230" fill={wet ? "#4d535c" : "#6d6f6b"} />

      {/* Urban edge: a few blocks and poles say city without drawing a city. */}
      {wet && (
        <g opacity="0.42" filter="url(#zd-far)">
          <rect x="40" y="196" width="120" height="132" fill="#5d646e" />
          <rect x="176" y="232" width="86" height="96" fill="#68707a" />
          <rect x="712" y="180" width="132" height="148" fill="#5d646e" />
          <rect x="656" y="240" width="46" height="88" fill="#68707a" />
        </g>
      )}

      <rect y="300" width="900" height="72" fill="url(#zd-haze)" />
      <path d="M 196 556 L 418 326 L 482 326 L 704 556 Z" fill={wet ? "#2f343c" : "#54565a"} />
      {/* Wet asphalt throws a sheen back at the lens. */}
      {wet && <path d="M 196 556 L 418 326 L 482 326 L 704 556 Z" fill="url(#zd-sheen)" />}
      <path d="M 214 556 L 424 328" stroke="#d3d8df" strokeWidth="3" opacity="0.52" />
      <path d="M 686 556 L 476 328" stroke="#d3d8df" strokeWidth="3" opacity="0.52" />

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
            fill="#dee3ea"
            style={{
              animationDuration: `${laneSeconds}s`,
              animationDelay: `${(i * -laneSeconds) / 4}s`,
            }}
          />
        ))}
      </g>

      {/* The vehicle being followed — the whole point of a tailgating clip. */}
      {lead && (
        <g>
          <ellipse cx="450" cy="484" rx="104" ry="12" fill="#14181e" opacity="0.55" />
          <rect x="352" y="330" width="196" height="150" rx="10" fill="#2b3038" />
          <rect x="366" y="344" width="168" height="74" rx="6" fill="#3a4149" />
          <g filter="url(#zd-bloom)">
            <rect className="zd-brake" x="364" y="440" width="34" height="15" rx="4" fill="#d43a28" />
            <rect className="zd-brake" x="502" y="440" width="34" height="15" rx="4" fill="#d43a28" />
          </g>
          <rect x="418" y="462" width="64" height="14" rx="3" fill="#1d2229" />
        </g>
      )}
    </>
  );
}

/* Driver-facing camera: stationary cab, so the only motion is the detection
   box re-fitting, which is what in-cab AI actually does. */
function CabScene() {
  return (
    <>
      <defs>
        <filter id="zd-far2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="zd-bloom2" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="zd-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d5dee7" />
          <stop offset="100%" stopColor="#9aa6b3" />
        </linearGradient>
      </defs>

      {/* Cab interior */}
      <rect width="900" height="556" fill="#1c222b" />

      {/* Windshield. The driver is backlit by it, which is exactly what an
          in-cab camera sees and what makes the silhouette readable. */}
      <rect x="88" y="26" width="724" height="306" rx="10" fill="url(#zd-glass)" />
      {/* Yard beyond the glass, blown out and slightly soft the way a cabin
          camera sees daylight through a windscreen */}
      <g filter="url(#zd-far2)">
        <rect x="88" y="250" width="724" height="82" fill="#8b97a4" />
        <rect x="150" y="188" width="150" height="62" fill="#7e8a97" />
        <rect x="600" y="176" width="176" height="74" fill="#7e8a97" />
        <rect x="88" y="246" width="724" height="4" fill="#6f7a86" />
      </g>

      {/* Dashboard, distinctly lighter than the cab shell so shapes separate */}
      <rect y="332" width="900" height="224" fill="#252c37" />
      <rect y="332" width="900" height="6" fill="#2f3742" />

      {/* A-pillars */}
      <path d="M 56 0 L 122 0 L 96 556 L 0 556 Z" fill="#171c24" />
      <path d="M 844 0 L 778 0 L 804 556 L 900 556 Z" fill="#171c24" />
      <rect width="900" height="34" fill="#171c24" />

      {/* Steering wheel: only the top of the rim rises into frame */}
      <path
        d="M 300 556 C 316 470 386 436 468 436 C 550 436 620 470 636 556"
        fill="none"
        stroke="#12161d"
        strokeWidth="26"
        strokeLinecap="round"
      />

      {/* The driver, in silhouette against the glass, head tipped to a device */}
      <g>
        <path
          d="M 352 436 C 360 372 402 340 468 340 C 534 340 576 372 584 436 Z"
          fill="#191f27"
        />
        <circle cx="464" cy="250" r="48" fill="#191f27" />
        <ellipse cx="482" cy="282" rx="30" ry="18" fill="#151a21" />
        <rect x="500" y="292" width="26" height="40" rx="4" fill="#0e1218" />
        <rect
          x="504"
          y="297"
          width="18"
          height="26"
          rx="2"
          fill="#5cb3f8"
          opacity="0.9"
          filter="url(#zd-bloom2)"
        />
      </g>

      {/* Driver-monitoring detection box, re-fitting around the face */}
      <g className="zd-track">
        <rect
          x="410"
          y="196"
          width="110"
          height="108"
          rx="6"
          fill="none"
          stroke="#ffc466"
          strokeWidth="3"
        />
        {[
          [410, 196],
          [520, 196],
          [410, 304],
          [520, 304],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" fill="#ffc466" />
        ))}
      </g>
    </>
  );
}

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

  const detail = EVENT_DETAIL[event.id];
  /* The record decides the view: a cab-only clip cannot show a road, and a
     0 km/h clip cannot show one moving. */
  const cabOnly = detail.clip.includes("cab only");
  const wet = detail.note.includes("wet");
  const lead = event.label === "TAILGATING";
  /* Lane cadence tracks the recorded speed rather than being decorative. */
  const laneSeconds = event.id === "e1" ? 1.5 : 2.3;

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-950">
      <svg
        viewBox="0 0 900 556"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={
          cabOnly
            ? `Driver-facing camera frame: ${event.label} on ${event.asset} at ${event.time}, vehicle stationary (demonstration)`
            : `Road camera frame: ${event.label} on ${event.asset} at ${event.time} (demonstration)`
        }
      >
        {cabOnly ? (
          <CabScene />
        ) : (
          <RoadScene wet={wet} lead={lead} laneSeconds={laneSeconds} />
        )}
        <CameraOptics />
      </svg>

      <span className="absolute left-4 top-4 flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-dfg [text-shadow:0_1px_3px_rgb(6_10_20/0.8)]">
        <span aria-hidden className="size-1.5 rounded-full bg-alarm" />
        REC · {event.time}:{String(sec).padStart(2, "0")}
      </span>
      <span className="absolute right-4 top-4 font-mono text-xs tracking-[0.08em] text-dfg/90 [text-shadow:0_1px_3px_rgb(6_10_20/0.8)]">
        {event.asset} · {cabOnly ? "DRIVER CAM" : "ROAD CAM"}
      </span>

      {/* The measurement that made this an exception */}
      <span className="absolute left-4 top-12 rounded-[6px] border border-hairline-d bg-ink-950/80 px-2.5 py-1.5 font-mono text-xs tracking-[0.05em] text-dmuted">
        {lead
          ? "HEADWAY 0.6s · LIMIT 1.5s"
          : cabOnly
            ? "EYES OFF ROAD 6s · 0 KM/H"
            : `${detail.speed} · POSTED ${detail.posted}`}
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
