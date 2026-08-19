"use client";

import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { cx } from "@/lib/cx";
import { CamChip } from "./chrome";
import { CityMap, Marker } from "./city-map";
import { ASSETS, ASSET_DETAIL, STATE_COUNTS, type Asset, type AssetId } from "./data";
import { DetailSheet, SheetGroup, SheetRow } from "./detail-sheet";

/* Maps · Live Map — asset list on the left, drawn city plan on the right,
   the real console's bottom status pill underneath. Selecting an asset pans
   the map; the map card then opens the full record. */

function stateDot(state: Asset["state"]) {
  if (state === "offline") return "bg-faint/50";
  if (state === "idling") return "bg-warn";
  return "bg-signal";
}

/* The highway asset (TRK-047) carries the ticking speed ahead of its line. */
function statusLine(a: Asset, speed: number) {
  return a.moving ? `${speed} KM/H · ${a.statusLine}` : a.statusLine;
}

export function MapsLive({
  sel,
  onSelect,
  speed,
}: {
  sel: AssetId | null;
  onSelect: (id: AssetId) => void;
  speed: number;
}) {
  const [record, setRecord] = useState<AssetId | null>(null);

  const selected = ASSETS.find((a) => a.id === sel) ?? null;
  const open = ASSETS.find((a) => a.id === record) ?? null;
  const detail = record ? ASSET_DETAIL[record] : undefined;

  /* The map only closes in on assets that are holding still — chasing a
     moving marker with a zoom would just fight the animation. */
  const zoomTo =
    selected && selected.state !== "moving" ? { x: selected.x, y: selected.y } : null;

  return (
    <div className="relative grid h-full grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)]">
      <div className="hidden h-full flex-col overflow-y-auto border-r border-hairline-l lg:flex">
        <div className="border-b border-hairline-l p-3">
          <div className="flex items-center gap-2 rounded-sm border border-hairline-l px-3 py-2">
            <Search size={13} strokeWidth={1.5} className="text-faint" aria-hidden />
            <span className="text-[13px] text-faint">Search assets</span>
          </div>
          <p className="mt-2.5 flex items-center justify-between font-mono text-[11px] tracking-[0.08em] text-faint">
            <span>{ASSETS.length} ASSETS · ALL GROUPS</span>
            <span>FILTER · SORT</span>
          </p>
        </div>
        <ul className="divide-y divide-hairline-l">
          {ASSETS.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => onSelect(a.id)}
                aria-pressed={sel === a.id}
                className={cx(
                  "w-full cursor-pointer px-4 py-3 text-left transition-colors",
                  sel === a.id ? "bg-accent/[0.07]" : "hover:bg-ink-900/[0.03]",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-semibold text-fg">{a.name}</span>
                  <CamChip on={a.cam} />
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted">
                  {a.driver ? `${a.driver} · ` : ""}
                  {a.model}
                </span>
                <span className="mt-1 block truncate text-xs text-muted">{a.addr}</span>
                <span className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.05em] text-faint">
                  <span aria-hidden className={cx("size-1.5 shrink-0 rounded-full", stateDot(a.state))} />
                  <span className="truncate">
                    {statusLine(a, speed)}
                    {a.beacons ? ` · ${a.beacons}` : ""}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <CityMap zoomTo={zoomTo}>
          {ASSETS.map((a) => (
            <Marker
              key={a.id}
              a={a}
              speed={speed}
              selected={sel === a.id}
              onSelect={() => onSelect(a.id)}
            />
          ))}
        </CityMap>

        {/* Selected-asset card, the console's map-pane detail popover */}
        {selected && (
          <div className="absolute bottom-14 left-3 w-60 overflow-hidden rounded-md border border-hairline-l bg-card">
            <div className="flex items-center justify-between border-b border-hairline-l px-3.5 py-2.5">
              <span className="font-mono text-xs font-medium tracking-[0.05em] text-fg">
                {selected.name}
              </span>
              <CamChip on={selected.cam} />
            </div>
            <div className="px-3.5 py-2.5">
              <p className="text-xs leading-relaxed text-muted">
                {selected.driver ? `${selected.driver} · ` : ""}
                {selected.addr}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.05em] text-faint">
                <span aria-hidden className={cx("size-1.5 shrink-0 rounded-full", stateDot(selected.state))} />
                {statusLine(selected, speed)}
              </p>
              <button
                type="button"
                onClick={() => setRecord(selected.id)}
                className="mt-2.5 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent-deep transition-colors hover:text-accent-deeper"
              >
                View full record
                <ArrowRight size={12} strokeWidth={1.5} aria-hidden />
              </button>
            </div>
          </div>
        )}

        {/* Status bar — the real console's bottom pill */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full border border-hairline-l bg-card px-4 py-2 font-mono text-[11px] tracking-[0.05em] text-muted">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full bg-signal" />
            MOVING {STATE_COUNTS.moving}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full bg-warn" />
            IDLING {STATE_COUNTS.idling}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            STOPPED {STATE_COUNTS.stopped}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full bg-faint/60" />
            OFFLINE {STATE_COUNTS.offline}
          </span>
        </div>
      </div>

      <DetailSheet
        open={open !== null}
        onClose={() => setRecord(null)}
        eyebrow={`ASSET · ${open?.model ?? ""}`}
        title={open?.name ?? ""}
        footer={
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.05em] text-faint">
            TRIP HISTORY, VIDEO AND RULES OPEN IN THE FULL CONSOLE
          </p>
        }
      >
        {open && detail && (
          <>
            <SheetGroup title="NOW">
              <SheetRow label="STATUS" value={statusLine(open, speed)} />
              <SheetRow label="LOCATION" value={open.addr} />
              <SheetRow label="DRIVER" value={open.driver ?? "Unassigned"} />
              <SheetRow label="CAMERA" value={open.cam ? "Online" : "Not installed"} />
              {open.beacons && <SheetRow label="SENSORS" value={open.beacons} />}
            </SheetGroup>

            <SheetGroup title="TODAY">
              <SheetRow label="DISTANCE" value={detail.today.km} />
              <SheetRow label="DRIVING" value={detail.today.driving} />
              <SheetRow label="STOPS" value={detail.today.stops} />
              <SheetRow label="IDLE" value={detail.today.idle} />
            </SheetGroup>

            <SheetGroup title="ASSET">
              <SheetRow label="GROUP" value={detail.group} />
              <SheetRow label="DEVICE" value={detail.device} />
              <SheetRow label="ODOMETER" value={detail.odo} />
              <SheetRow label="ENGINE" value={detail.engineHours} />
              <SheetRow label="FUEL" value={detail.fuel} />
            </SheetGroup>

            <SheetGroup title="SERVICE">
              <SheetRow label="LAST" value={detail.lastService} />
              <SheetRow
                label="NEXT"
                value={detail.nextService}
                tone={
                  detail.nextServiceTone === "alarm"
                    ? "alarm"
                    : detail.nextServiceTone === "warn"
                      ? "warn"
                      : "signal"
                }
              />
            </SheetGroup>
          </>
        )}
      </DetailSheet>
    </div>
  );
}
