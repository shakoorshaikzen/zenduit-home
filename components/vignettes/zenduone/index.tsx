"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { LockedPane, Rail, TopBar } from "./chrome";
import { MODULE_TABS, RAIL, type AssetId, type ModuleId } from "./data";
import { MaintainSchedules } from "./maintain";
import { MapsLive } from "./maps-live";
import { MapsTrips } from "./maps-trips";
import { SafetyCoaching, SafetyOverview } from "./safety";

/*
 * ZenduONE — a working miniature of the real console.
 *
 * This shell owns ALL of the demo's state; every pane below is pure and
 * props-driven, so a number can only ever come from ./data. Maps, Safety and
 * Maintain are live; Work, Forms, Reports (and the secondary tabs inside the
 * live modules) render a LockedPane, exactly like a guided trial.
 */

/*
 * What each live view responds to. Interactive-demo research is consistent on
 * this: free exploration only converts if the visitor knows it is explorable,
 * so the console says so in its own status bar rather than relying on a
 * pulsing hotspot the rest of this design system bans.
 */
const HINTS: Record<string, string> = {
  "maps:live": "Click any vehicle on the map or in the list, then open its full record",
  "maps:trips": "Switch vehicle to redraw the route, or replay the trip",
  "safety:overview": "Click REVIEW on a risk factor to open that clip",
  "safety:coaching": "Pick an exception, view the record, or add it to the coaching queue",
  "maintain:schedules": "Filter by tile, then click any service to open its work order",
};

/** Live speed for TRK-047: wanders ±2 KM/H every 3s, held inside 54–68. */
const SPEED_MIN = 54;
const SPEED_MAX = 68;
const SPEED_START = 62;

export function ZenduOneDemo() {
  const [module, setModule] = useState<ModuleId>("maps");
  const [tab, setTab] = useState("live");
  const [sel, setSel] = useState<AssetId | null>("trk047");
  const [tripAsset, setTripAsset] = useState<AssetId>("trk047");
  const [playKey, setPlayKey] = useState(0);
  const [event, setEvent] = useState(0);
  const [queued, setQueued] = useState<string[]>(["e3"]);
  const [speed, setSpeed] = useState(SPEED_START);

  /* The one thing that ticks in JS. Reduced-motion freezes the CSS animations
     around it; a number quietly changing is not motion anybody has to dodge. */
  useEffect(() => {
    const id = setInterval(() => {
      setSpeed((s) =>
        Math.max(SPEED_MIN, Math.min(SPEED_MAX, s + (Math.random() > 0.5 ? 2 : -2))),
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  /* Switching module always lands on that module's first tab — locked modules
     have no tabs, so their stage falls straight through to the LockedPane. */
  const selectModule = (id: ModuleId) => {
    setModule(id);
    setTab(MODULE_TABS[id][0]?.id ?? "locked");
  };

  const railItem = RAIL.find((r) => r.id === module);
  const moduleLive = railItem?.live ?? false;
  const tabs = MODULE_TABS[module];
  const current = tabs.find((t) => t.id === tab);
  const tabLive = current?.live ?? false;
  const hint =
    moduleLive && tabLive
      ? (HINTS[`${module}:${tab}`] ?? "Explore the live modules in the rail")
      : "Maps, Safety and Maintain are live in this miniature";

  function stage() {
    if (!moduleLive) return <LockedPane label={railItem?.label ?? "This module"} />;
    if (!tabLive) return <LockedPane label={current?.label ?? "This view"} />;

    if (module === "maps" && tab === "live") {
      return <MapsLive sel={sel} onSelect={setSel} speed={speed} />;
    }
    if (module === "maps" && tab === "trips") {
      return (
        <MapsTrips
          tripAsset={tripAsset}
          onTripAsset={setTripAsset}
          playKey={playKey}
          onReplay={() => setPlayKey((k) => k + 1)}
        />
      );
    }
    if (module === "safety" && tab === "overview") {
      return (
        <SafetyOverview
          onReview={(i) => {
            setEvent(i);
            setTab("coaching");
          }}
        />
      );
    }
    if (module === "safety" && tab === "coaching") {
      return (
        <SafetyCoaching
          event={event}
          onEvent={setEvent}
          queued={queued}
          onQueue={(id) => setQueued((q) => (q.includes(id) ? q : [...q, id]))}
        />
      );
    }
    if (module === "maintain" && tab === "schedules") {
      return <MaintainSchedules />;
    }
    return <LockedPane label={current?.label ?? "This view"} />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-hairline-l bg-card shadow-ambient">
      <TopBar module={module} tab={tab} onTabChange={setTab} />

      <div className="grid grid-cols-[64px_minmax(0,1fr)] lg:grid-cols-[88px_minmax(0,1fr)]">
        <Rail module={module} onModule={selectModule} />
        <div className="relative h-[440px] overflow-hidden lg:h-[480px]">{stage()}</div>
      </div>

      {/* Console status bar: what this view responds to, and the way out */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-hairline-l bg-paper-raised px-4 py-2.5 lg:px-5">
        <p className="flex min-w-0 items-center gap-2 text-xs text-muted">
          <MousePointerClick size={13} strokeWidth={1.5} aria-hidden className="shrink-0 text-faint" />
          <span className="truncate">{hint}</span>
        </p>
        <a
          href="#demo"
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-accent-deep underline-offset-4 hover:underline"
        >
          See the full console
          <ArrowRight size={12} strokeWidth={1.5} aria-hidden />
        </a>
      </div>
    </div>
  );
}
