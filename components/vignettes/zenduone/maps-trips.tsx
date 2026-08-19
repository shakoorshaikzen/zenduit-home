"use client";

import { Play } from "lucide-react";
import { cx } from "@/lib/cx";
import { CityMap } from "./city-map";
import { ASSETS, type AssetId } from "./data";

/* Maps · Trips — one day of history per asset, replayed as a dot running the
   route. Only the three driven assets have trips; the reefer and the offline
   pickup never left their docks. */

const TRIPPED = ASSETS.filter((a) => a.trip);

export function MapsTrips({
  tripAsset,
  onTripAsset,
  playKey,
  onReplay,
}: {
  tripAsset: AssetId;
  onTripAsset: (id: AssetId) => void;
  playKey: number;
  onReplay: () => void;
}) {
  const current = ASSETS.find((a) => a.id === tripAsset);
  const trip = current?.trip;

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)]">
      <div className="hidden h-full flex-col overflow-y-auto border-r border-hairline-l lg:flex">
        <div className="border-b border-hairline-l px-4 py-3">
          <p className="font-mono text-[11px] tracking-[0.08em] text-faint">
            TRIPS · TODAY · BY ASSET
          </p>
        </div>
        <ul className="divide-y divide-hairline-l">
          {TRIPPED.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                aria-pressed={tripAsset === a.id}
                onClick={() => {
                  onTripAsset(a.id);
                  onReplay();
                }}
                className={cx(
                  "w-full cursor-pointer px-4 py-3 text-left transition-colors",
                  tripAsset === a.id ? "bg-accent/[0.07]" : "hover:bg-ink-900/[0.03]",
                )}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-[13px] font-semibold text-fg">{a.name}</span>
                  <span className="font-mono text-[11px] text-faint">{a.trip!.label}</span>
                </span>
                <span className="mt-1.5 grid grid-cols-3 gap-2 font-mono text-[11px] tracking-[0.05em] text-muted tabular-nums">
                  <span>{a.trip!.km} KM</span>
                  <span>{a.trip!.driving}</span>
                  <span>{a.trip!.stops} STOPS</span>
                </span>
                <span
                  className={cx(
                    "mt-1 block font-mono text-[11px] tracking-[0.05em]",
                    a.trip!.exceptions ? "text-warn-deep" : "text-signal-deep",
                  )}
                >
                  {a.trip!.exceptions
                    ? `${a.trip!.exceptions} EXCEPTION${a.trip!.exceptions > 1 ? "S" : ""}`
                    : "CLEAN TRIP"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <CityMap zoomTo={null}>
          {trip && (
            <>
              {/* Dotted trace under a hairline spine: the console's route style */}
              <path
                d={trip.d}
                stroke="var(--color-accent)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1 9"
                opacity="0.55"
              />
              <path
                d={trip.d}
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
              {/* key={playKey} remounts the circle, which restarts the CSS run */}
              <circle
                key={playKey}
                r="7"
                fill="var(--color-signal)"
                stroke="#ffffff"
                strokeWidth="2"
                className="zd-playhead"
                style={{ offsetPath: `path("${trip.d}")` }}
              />
            </>
          )}
        </CityMap>

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-md border border-hairline-l bg-card/95 px-3 py-2 backdrop-blur-sm">
          <span className="font-mono text-[11px] tracking-[0.05em] text-muted tabular-nums">
            {current?.name} · {trip?.km} KM · {trip?.stops} STOPS
          </span>
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-accent-deep px-3 py-1.5 font-mono text-[11px] tracking-[0.05em] text-dfg transition-colors hover:bg-accent-deeper"
          >
            <Play size={11} strokeWidth={2} aria-hidden />
            REPLAY
          </button>
        </div>
      </div>
    </div>
  );
}
