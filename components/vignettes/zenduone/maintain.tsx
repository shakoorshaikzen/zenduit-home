"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { SERVICE_DETAIL, SERVICES, TONE_DOT } from "./data";
import { DetailSheet, SheetGroup, SheetRow } from "./detail-sheet";

/*
 * Maintain · Schedules — the real console's service table in miniature.
 *
 * Every figure derives from SERVICES, so the tiles read 5 / 1 / 1 / 3 and the
 * rows below are the same five services. The tiles are filters and every row
 * opens its own record, because a table that looks clickable and isn't is the
 * fastest way to make a demo feel fake.
 */

const TOTAL = SERVICES.length;
const OVERDUE = SERVICES.filter((s) => s.tone === "alarm").length;
const DUE_SOON = SERVICES.filter((s) => s.tone === "warn").length;
const SCHEDULED = SERVICES.filter((s) => s.tone === "signal").length;

type Filter = "all" | "alarm" | "warn" | "signal";

const TILES: { id: Filter; label: string; value: string; tone?: keyof typeof TONE_DOT }[] = [
  { id: "all", label: "Total services", value: String(TOTAL) },
  { id: "alarm", label: "Overdue", value: String(OVERDUE), tone: "alarm" },
  { id: "warn", label: "Due soon", value: String(DUE_SOON), tone: "warn" },
  { id: "signal", label: "Scheduled", value: String(SCHEDULED), tone: "signal" },
];

const DUE_TONE = {
  alarm: "text-alarm-deep",
  warn: "text-warn-deep",
  signal: "text-muted",
} as const;

/* Shared column track: asset / service / next due / status. */
const COLS = "lg:grid-cols-[0.72fr_1.28fr_1.05fr_0.85fr]";

export function MaintainSchedules() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const rows = SERVICES.filter((s) => filter === "all" || s.tone === filter);
  const open = SERVICES.find((s) => `${s.asset}-${s.service}` === openKey) ?? null;
  const detail = openKey ? SERVICE_DETAIL[openKey] : undefined;

  return (
    <div className="relative h-full overflow-y-auto p-4 lg:p-5">
      {/* KPI tiles — also the table's filter control */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {TILES.map((t) => {
          const active = filter === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              aria-pressed={active}
              className={cx(
                "cursor-pointer rounded-md border p-4 text-left transition-colors",
                active
                  ? "border-accent/40 bg-accent/[0.06]"
                  : "border-hairline-l bg-card hover:border-fg/20",
              )}
            >
              <p className="flex items-center gap-1.5 text-xs text-muted">
                {t.tone && (
                  <span aria-hidden className={cx("size-1.5 shrink-0 rounded-full", TONE_DOT[t.tone])} />
                )}
                {t.label}
              </p>
              <p className="mt-1.5 font-mono text-[1.375rem] font-medium tabular-nums text-fg">
                {t.value}
              </p>
            </button>
          );
        })}
      </div>

      {/* Service table */}
      <div className="mt-4 overflow-hidden rounded-md border border-hairline-l">
        <div
          className={cx(
            "hidden gap-2 border-b border-hairline-l bg-paper-raised px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-faint lg:grid",
            COLS,
          )}
        >
          <span>ASSET</span>
          <span>SERVICE</span>
          <span>NEXT DUE</span>
          <span className="text-right">STATUS</span>
        </div>
        <div className="flex items-center justify-between border-b border-hairline-l bg-paper-raised px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-faint lg:hidden">
          <span>SERVICE SCHEDULE</span>
          <span className="tabular-nums">{rows.length} ITEMS</span>
        </div>

        <ul className="divide-y divide-hairline-l">
          {rows.map((s) => {
            const key = `${s.asset}-${s.service}`;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => setOpenKey(key)}
                  className={cx(
                    "group grid w-full cursor-pointer gap-1.5 px-4 py-3 text-left transition-colors hover:bg-ink-900/[0.03] lg:items-center lg:gap-2 lg:py-2.5",
                    COLS,
                  )}
                >
                  {/* Mobile row 1 / desktop cols 1 + 4 */}
                  <span className="flex items-center justify-between gap-3 lg:contents">
                    <span className="font-mono text-[11px] font-medium tracking-[0.03em] text-fg lg:order-1">
                      {s.asset}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 lg:order-4 lg:ml-auto">
                      <span className="flex items-center gap-1.5 rounded-full border border-hairline-l bg-paper-raised px-2 py-0.5 font-mono text-[11px] tracking-[0.05em] text-muted">
                        <span aria-hidden className={cx("size-1.5 shrink-0 rounded-full", TONE_DOT[s.tone])} />
                        {s.status.toUpperCase()}
                      </span>
                      <ChevronRight
                        size={13}
                        strokeWidth={1.5}
                        aria-hidden
                        className="shrink-0 text-faint/0 transition-colors group-hover:text-faint"
                      />
                    </span>
                  </span>

                  {/* Mobile row 2 / desktop cols 2 + 3 */}
                  <span className="flex items-baseline justify-between gap-3 lg:contents">
                    <span className="truncate text-[13px] text-muted lg:order-2">{s.service}</span>
                    <span
                      className={cx(
                        "shrink-0 font-mono text-[11px] tracking-[0.03em] lg:order-3 lg:truncate",
                        DUE_TONE[s.tone],
                      )}
                    >
                      {s.due}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.05em] text-faint">
        FAULT P0217 ON TRK-051 OPENED WO-1482 · PARTS IN STOCK
      </p>

      <DetailSheet
        open={open !== null}
        onClose={() => setOpenKey(null)}
        eyebrow={`SERVICE · ${open?.asset ?? ""}`}
        title={open?.service ?? ""}
        footer={
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.05em] text-faint">
            SCHEDULING AND WORK ORDERS RUN IN THE FULL CONSOLE
          </p>
        }
      >
        {open && detail && (
          <>
            <SheetGroup title="STATUS">
              <SheetRow
                label="STATE"
                value={open.status}
                tone={open.tone === "alarm" ? "alarm" : open.tone === "warn" ? "warn" : "signal"}
              />
              <SheetRow label="NEXT DUE" value={open.due} />
              <SheetRow label="TYPE" value={open.type} />
            </SheetGroup>

            <SheetGroup title="SCHEDULE">
              <SheetRow label="INTERVAL" value={detail.interval} />
              <SheetRow label="LAST DONE" value={detail.lastDone} />
            </SheetGroup>

            <SheetGroup title="WORK">
              <SheetRow label="WORK ORDER" value={detail.workOrder} />
              <SheetRow label="PARTS" value={detail.parts} />
              <SheetRow label="ESTIMATE" value={detail.estimate} />
              <SheetRow label="ASSIGNED" value={detail.assignee} />
            </SheetGroup>
          </>
        )}
      </DetailSheet>
    </div>
  );
}
