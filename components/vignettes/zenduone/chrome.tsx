"use client";

import { Bell, ChevronDown, Settings, Video, VideoOff } from "lucide-react";
import { cx } from "@/lib/cx";
import { MODULE_TABS, RAIL, type ModuleId } from "./data";

/*
 * Console chrome, recreated from the real ZenduONE screenshots: the light top
 * bar (wordmark + module tab pills + notification/avatar cluster), the dark
 * module rail, the demo-lock pane, and the two atoms that repeat across panes
 * (camera chip, KPI card). Layout/state lives in index.tsx; these are pure.
 */

/* ---------- Top bar ---------- */

export function TopBar({
  module,
  tab,
  onTabChange,
}: {
  module: ModuleId;
  tab: string;
  onTabChange: (id: string) => void;
}) {
  const tabs = MODULE_TABS[module] ?? [];

  return (
    <div className="flex items-center justify-between gap-4 border-b border-hairline-l px-4 py-2.5 lg:px-5">
      <div className="flex min-w-0 items-center gap-4">
        <span className="shrink-0 font-display text-sm font-bold tracking-tight text-accent">
          ZENDU<span className="text-fg">ONE</span>
        </span>
        <div
          role="tablist"
          aria-label={`${module} views`}
          className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => onTabChange(t.id)}
              className={cx(
                "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-[13px] font-medium transition-colors",
                tab === t.id ? "bg-accent/[0.09] text-accent-deep" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div aria-hidden className="hidden items-center gap-3 text-muted sm:flex">
        <span className="relative">
          <Bell size={15} strokeWidth={1.5} />
          <span className="absolute -right-1.5 -top-1.5 grid size-3.5 place-items-center rounded-full bg-alarm font-mono text-[8px] font-semibold text-white">
            3
          </span>
        </span>
        <Settings size={15} strokeWidth={1.5} />
        <span className="grid size-7 place-items-center rounded-full bg-accent-deep font-mono text-[11px] text-dfg">
          ZF
        </span>
        <ChevronDown size={13} strokeWidth={1.5} />
      </div>
    </div>
  );
}

/* ---------- Module rail (dark, like the real console) ---------- */

export function Rail({ module, onModule }: { module: ModuleId; onModule: (id: ModuleId) => void }) {
  return (
    <nav aria-label="Console modules" className="h-full bg-ink-950 py-2">
      {RAIL.map((item) => {
        const active = module === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onModule(item.id)}
            title={item.live ? item.label : `${item.label} (demo locked)`}
            className={cx(
              "flex w-full cursor-pointer flex-col items-center gap-1 px-1 py-2.5 transition-colors",
              active
                ? "text-accent-hi"
                : item.live
                  ? "text-dmuted hover:text-dfg"
                  : "text-dfaint/70 hover:text-dfaint",
            )}
          >
            <span className={cx("grid size-8 place-items-center rounded-[6px]", active && "bg-accent/20")}>
              <item.icon size={16} strokeWidth={1.5} aria-hidden />
            </span>
            <span className="flex items-center gap-0.5 text-[11px] font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ---------- Demo lock ---------- */


/* ---------- Atoms shared by the panes ---------- */

export function CamChip({ on }: { on: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.05em] text-faint">
      {on ? (
        <Video size={11} strokeWidth={1.5} className="text-accent-deep" aria-hidden />
      ) : (
        <VideoOff size={11} strokeWidth={1.5} aria-hidden />
      )}
      {on ? "ON" : "OFF"}
    </span>
  );
}

export function Kpi({
  label,
  value,
  delta,
  note = "VS LAST WEEK",
}: {
  label: string;
  value: string;
  delta: string;
  note?: string;
}) {
  return (
    <div className="rounded-md border border-hairline-l bg-card p-3.5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-[1.25rem] font-medium text-fg tabular-nums">{value}</p>
      <p className="mt-1 font-mono text-[11px] tracking-[0.05em] text-signal-deep">
        {delta}{note ? ` ${note}` : ""}
      </p>
    </div>
  );
}
