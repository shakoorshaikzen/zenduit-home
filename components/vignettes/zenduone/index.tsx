"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, MousePointerClick, PlayCircle } from "lucide-react";
import { Rail, TopBar } from "./chrome";
import { MODULE_TABS, type AssetId, type ModuleId } from "./data";
import { MaintainSchedules } from "./maintain";
import { MapsLive } from "./maps-live";
import { MapsTrips } from "./maps-trips";
import { SafetyCoaching, SafetyOverview } from "./safety";
import { TodayPane } from "./today";
import { TOUR, TourOverlay } from "./tour";

/*
 * ZenduONE — a working miniature of the real console.
 *
 * This shell owns ALL of the demo's state; every pane below is pure and
 * props-driven, so a number can only ever come from ./data. Maps, Safety and
 * Maintain are live; Work, Forms, Reports (and the secondary tabs inside the
 * every module and view in the miniature is live and interactive.
 */

/*
 * What each live view responds to. Interactive-demo research is consistent on
 * this: free exploration only converts if the visitor knows it is explorable,
 * so the console says so in its own status bar rather than relying on a
 * pulsing hotspot the rest of this design system bans.
 */
const HINTS: Record<string, string> = {
  "today:cases": "Review the coaching case, approve the drafted work order, and see what was handled for you",
  "maps:live": "Click any vehicle on the map or in the list, then open its full record",
  "maps:trips": "Switch vehicle to redraw the route, or replay the trip",
  "safety:overview": "Click REVIEW on a risk factor to open its exception",
  "safety:coaching": "Pick an exception, watch its clip loop, then add it to the coaching queue",
  "maintain:schedules": "Filter by tile, then click any service to open its work order",
};

/** Live speed for TRK-047: wanders ±2 KM/H every 3s, held inside 54–68. */
const SPEED_MIN = 54;
const SPEED_MAX = 68;
const SPEED_START = 62;

export function ZenduOneDemo() {
  const [module, setModule] = useState<ModuleId>("today");
  const [tab, setTab] = useState("cases");
  const [sel, setSel] = useState<AssetId | null>("trk047");
  const [tripAsset, setTripAsset] = useState<AssetId>("trk047");
  const [playKey, setPlayKey] = useState(0);
  const [event, setEvent] = useState(0);
  const [queued, setQueued] = useState<string[]>(["e3"]);
  const [woApproved, setWoApproved] = useState(false);
  /* null = the guide is not running. */
  const [tourStep, setTourStep] = useState<number | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [windowEl, setWindowEl] = useState<HTMLElement | null>(null);
  const autoStarted = useRef(false);
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

  /* The overlay measures against the console frame, so it needs the node
     itself rather than just the ref. */
  useEffect(() => setWindowEl(windowRef.current), []);

  /* Offer the guide the first time the console is actually on screen, once
     per session. Auto-running it on every visit would be nagging; never
     running it means nobody discovers what the console does. */
  useEffect(() => {
    const el = windowRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (sessionStorage.getItem("zd-tour-seen") === "1") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !autoStarted.current) {
            autoStarted.current = true;
            sessionStorage.setItem("zd-tour-seen", "1");
            setTourStep(0);
            io.disconnect();
          }
        }
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Each step declares the state it needs; put the console there first so the
     spotlight has something to land on. */
  useEffect(() => {
    if (tourStep === null) return;
    const step = TOUR[tourStep];
    setModule(step.module);
    setTab(step.tab);
  }, [tourStep]);

  const startTour = useCallback(() => setTourStep(0), []);
  const exitTour = useCallback(() => setTourStep(null), []);
  const nextStep = useCallback(
    () => setTourStep((i) => (i === null ? null : Math.min(i + 1, TOUR.length - 1))),
    [],
  );
  const prevStep = useCallback(
    () => setTourStep((i) => (i === null ? null : Math.max(i - 1, 0))),
    [],
  );

  /* Switching module always lands on that module's first tab. */
  const selectModule = (id: ModuleId) => {
    setModule(id);
    setTab(MODULE_TABS[id][0]?.id ?? "locked");
  };


  const tabs = MODULE_TABS[module];
  const hint = HINTS[`${module}:${tab}`] ?? "Every view in this miniature is live";

  function stage() {
    if (module === "today" && tab === "cases") {
      return (
        <TodayPane
          approved={woApproved}
          onApprove={() => setWoApproved(true)}
          onReview={() => {
            setModule("safety");
            setTab("coaching");
            setEvent(0);
          }}
        />
      );
    }
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
    return null;
  }

  return (
    <div
      ref={windowRef}
      className="relative overflow-hidden rounded-lg border border-hairline-l bg-card shadow-ambient"
    >
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
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={startTour}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-fg"
          >
            <PlayCircle size={13} strokeWidth={1.5} aria-hidden />
            {tourStep === null ? "Show me around" : "Restart guide"}
          </button>
          <a
            href="#demo"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            See the full console
            <ArrowRight size={12} strokeWidth={1.5} aria-hidden />
          </a>
        </div>
      </div>

      {tourStep !== null && (
        <TourOverlay
          step={TOUR[tourStep]}
          index={tourStep}
          total={TOUR.length}
          container={windowEl}
          onNext={nextStep}
          onBack={prevStep}
          onExit={exitTour}
        />
      )}
    </div>
  );
}
