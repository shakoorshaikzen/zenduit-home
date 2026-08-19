# ZenduONE Demo — Implementation Spec

_Authored by Fable (planning only). All code is written by Opus agents. Source of
truth for fidelity: the 28 real-console screenshots in `zenduonepage/`._

## Goal

A working miniature of the real ZenduONE console embedded in the homepage's
"ZenduONE, before the demo call" section: faithful to the real app's chrome and
grammar, interactive where a fleet-manager prospect cares (Maps, Safety,
Maintain), visibly demo-locked elsewhere (Work, Forms, Reports), and powered by
ONE consistent synthetic fleet so every number agrees across every view.

## Architecture

New package `components/vignettes/zenduone/`:

| File | Exports | Owner |
|---|---|---|
| `data.ts` | types + `ASSETS`, `EVENTS`, `RISKS`, `SERVICES`, `STATE_COUNTS`, `RAIL`, `MODULE_TABS`, `TONE_DOT` | Agent A |
| `chrome.tsx` | `TopBar`, `Rail`, `LockedPane`, `CamChip`, `Kpi` | Agent B |
| `city-map.tsx` | `CityMap`, `Marker` | Agent C |
| `maps-live.tsx` | `MapsLive` | Agent C |
| `maps-trips.tsx` | `MapsTrips` | Agent C |
| `safety.tsx` | `SafetyOverview`, `SafetyCoaching`, `ClipFrame` | Agent D |
| `maintain.tsx` | `MaintainSchedules` | Agent E |
| `index.tsx` | `ZenduOneDemo` (state shell) | Integrator |

Every `.tsx` file starts with `"use client"`. The old
`components/vignettes/zenduone-demo.tsx` is DELETED by the integrator, and
`components/sections/platform-story.tsx` imports
`{ ZenduOneDemo } from "@/components/vignettes/zenduone"`.

State lives ONLY in `index.tsx`:
`module` (ModuleId), `tab` (string), `sel` (AssetId|null), `tripAsset`
(AssetId), `playKey` (number), `event` (number), `queued` (string[], initial
`["e3"]`), `speed` (number, initial 62, ±2 wander every 3s within 54–68).
Panes are pure props-driven components.

### Component contracts (exact)

```ts
type ModuleId = "maps" | "safety" | "maintain" | "work" | "forms" | "reports";
TopBar:   { module: ModuleId; tab: string; onTabChange: (id: string) => void }
Rail:     { module: ModuleId; onModule: (id: ModuleId) => void }
LockedPane: { label: string }
CamChip:  { on: boolean }
Kpi:      { label: string; value: string; delta: string }
CityMap:  { children: React.ReactNode; zoomTo: { x: number; y: number } | null }
Marker:   { a: Asset; speed: number; selected: boolean; onSelect: () => void }
MapsLive: { sel: AssetId | null; onSelect: (id: AssetId) => void; speed: number }
MapsTrips:{ tripAsset: AssetId; onTripAsset: (id: AssetId) => void; playKey: number; onReplay: () => void }
SafetyOverview: { onReview: (eventIndex: number) => void }
SafetyCoaching: { event: number; onEvent: (i: number) => void; queued: string[]; onQueue: (id: string) => void }
MaintainSchedules: {}
ClipFrame: { event: (typeof EVENTS)[number] }
```

## The fleet (single source of truth — numbers must agree EVERYWHERE)

Assets (id, name, model, driver, address, camera, map x/y, state, status line):
1. `trk047` TRK-047 · Freightliner M2 · D. Kowalski · "Route 7 N, Winnipeg MB" · cam ON · (520,380) · **moving** (patrols highway via `.zd-drive`; label shows live `speed` KM/H) · "ROUTE 7 · ON TIME"
2. `van112` VAN-112 · Transit 350 · M. Hale · "Gastonia Rd, Brampton ON" · cam ON · (300,140) · **moving** · "44 KM/H · DELIVERIES"
3. `trk051` TRK-051 · Hino 268 · J. Patel · "172 Bay St Yard" · cam ON · (500,500) · **idling** · "IDLE 14 MIN · YARD"
4. `reef09` REEF-09 · Reefer trailer · no driver · "Dock 4, Cold Storage" · cam ON · (140,500) · **stopped** · "REEFER OK · 3.0°C" · beacons "3.0°C · IN RANGE"
5. `pkp08` PKP-08 · F-150 · no driver · "Yard B, Row 14" · cam OFF · (380,260) · **offline** · "OFFLINE FOR 2D"

Status-bar counts derive from data: MOVING 2 · IDLING 1 · STOPPED 1 · OFFLINE 1.

Trips (only assets 1–3 have trips; REEF-09/PKP-08 excluded from Trips list):
- TRK-047: path `M 80 470 C 200 430 380 470 520 380 S 760 240 900 260`, "06:12 – now", 342 km, 6h 12m, 8 stops, 2 exceptions
- VAN-112: path `M 140 560 L 140 380 L 260 260 L 380 260 L 500 140 L 640 140`, "07:02 – now", 186 km, 4h 05m, 12 stops, 1 exception
- TRK-051: path `M 80 560 L 140 500 L 260 500 L 380 380 L 500 500`, "05:48 – 07:28", 58 km, 1h 40m, 3 stops, 0 exceptions

Safety events (tie 1:1 to risk rows and to assets/drivers above):
- e1 HARSH ACCELERATION · TRK-047 · D. Kowalski · 07:42 · tone alarm · NEEDS REVIEW
- e2 TAILGATING · VAN-112 · M. Hale · 09:15 · tone warn · NEEDS COACHING
- e3 DISTRACTION · TRK-051 · J. Patel · 11:03 · tone warn · COACHED (pre-queued)

Risk factors (REVIEW link opens Exceptions tab at the matching event index):
Hard Acceleration · 4 events · 0.31 / 100 km · 233 pts → e1
Tailgating · 2 events · 0.16 / 100 km · 148 pts → e2
Distraction · 1 event · 0.08 / 100 km · 61 pts → e3

Safety KPIs (week AUG 16 – AUG 22, 1,284 KM DRIVEN):
Incidents for review 1 (-3) · Total coached 2 (+2) · Total incidents 3 (-5) ·
Avg days to coach 1.2 (-0.4). All four deltas render teal (`text-signal-deep`)
with "VS LAST WEEK" suffix — every one is an improvement.
Footer line: "SAFETY SCORE 94 · PREVIOUS 91 · FLEET OF 5".

Maintain services (5 rows; KPIs MUST read: Total services 5 · Overdue 1 ·
Due soon 1 · Scheduled 3):
- TRK-051 · Oil & filter change · Preventive · "500 km remaining · 12d overdue" · Overdue (alarm)
- REEF-09 · Reefer unit service · Preventive · "Due in 6 days" · Due Soon (warn)
- TRK-047 · Brake inspection · Preventive · "Aug 26, 2026" · Scheduled (signal)
- VAN-112 · Tire rotation · Preventive · "Sep 02, 2026" · Scheduled (signal)
- PKP-08 · Annual safety · Compliance · "Sep 14, 2026" · Scheduled (signal)
Footer line: "FAULT P0217 ON TRK-051 OPENED WO-1482 · PARTS IN STOCK"
(P0217/WO-1482 intentionally matches the platform-explorer telemetry chip.)

## Chrome fidelity (from the screenshots)

- **Top bar** (light, hairline-b): left = ZENDUONE wordmark (`font-display`
  bold sm: "ZENDU" in `text-accent`, "ONE" in `text-fg`) + module tab pills.
  Active tab: `bg-accent/[0.09] text-accent-deep` rounded 6px; locked tabs show
  a 10px Lock icon and open a LockedPane. Right (aria-hidden, sm+): Bell with
  red badge "3" (alarm bg, 8px mono), Settings gear, avatar circle "ZF"
  (accent-deep bg), ChevronDown.
- **Rail** (dark `bg-ink-950`, like the real console): 6 modules stacked, icon
  in an 8×8 rounded square (active: `bg-accent/20 text-accent-hi`) + 10px
  label; locked modules dimmer (`text-dfaint/70`) with an 8px Lock beside the
  label. Widths 64px mobile / 88px desktop.
- **Module tab sets**: maps → Live Map*, Trips*, Assets, Drivers, Locations;
  safety → Overview*, Exceptions*; maintain → Schedules*, Issues, Work Orders,
  Parts; work/forms/reports → module itself locked. (* = live.)
- **LockedPane**: centered lock in a bordered circle over `bg-paper-raised/60`,
  copy: "«Label» is part of the full ZenduONE platform. See it live on your
  demo."
- **Stage height**: `h-[440px] lg:h-[480px]`. List panes 270–300px, hidden
  below `lg`. Grid: `[64px|88px rail] + [stage]`.

## View specs

**Maps · Live Map** — left pane: search field (decorative), meta row
"5 ASSETS · ALL GROUPS / FILTER · SORT" (10px mono), asset cards (name bold
13px + CamChip; driver · model; address; status line w/ dot: signal for
moving, warn idling, `bg-faint/50` offline; REEF-09 appends beacons).
Selecting a card or marker selects the asset. Map: drawn city plan (palette
below); markers = accent circles w/ white ring (offline = `#9aa6c1`);
selected marker grows + halo ring + white SVG label pill "NAME · NN KM/H"
(or state). TRK-047 rides `.zd-drive`; zoom (scale 1.5, 600ms ease) only when
a NON-moving asset is selected. Bottom-left: selected-asset card
(name/cam/driver/addr/status). Bottom-center: rounded-full status pill —
"MOVING 2 · IDLING 1 · STOPPED 1 · OFFLINE 1" with matching dots.

**Maps · Trips** — left pane header "TRIPS · TODAY · BY ASSET"; rows per
tripped asset: name + window label; 3-col mono grid "342 KM / 6h 12m /
8 STOPS"; exceptions line (`text-warn-deep` "2 EXCEPTIONS" or
`text-signal-deep` "CLEAN TRIP"). Row click sets tripAsset AND restarts
replay. Stage: route drawn twice (dasharray "1 9" width 4 @55% + solid width 2
@50%, accent) + `.zd-playhead` signal dot (key=playKey to restart). Bottom
strip: "TRK-047 · 342 KM · 8 STOPS" + REPLAY button (accent-deep, Play icon).

**Safety · Overview** — header "Safety overview for drivers" + right mono
"AUG 16 – AUG 22 · 1,284 KM DRIVEN"; 4 Kpi cards (grid 2/4); Risk Factors
panel: mono header row, 3 rows `rule / count / rate / REVIEW`; REVIEW is an
accent-deep mono link that switches to Exceptions with the mapped event
selected. Footer mono line (score).

**Safety · Exceptions** — left queue "COACHING QUEUE · THIS WEEK": event rows
(severity dot + label mono 12px; asset · driver · time 10px; status line:
teal "COACHED" when queued, else amber status text). Stage: `ClipFrame` =
night-road SVG (sky `#0b1122`, ground `#141a28`, road `#1d2434` trapezoid,
dashed centerline `#8b93a8` fading, headlight ellipses `#f6e7b8` 14–18%,
3 stars `#5c6a8a`; `preserveAspectRatio="xMidYMid slice"`), overlays: "REC ·
{time}:12" w/ pulsing alarm dot, "{asset} · ROAD CAM", bottom-left chip
"{label} · AI FLAGGED". Button bottom-right: "ADD TO COACHING QUEUE"
(accent-deep) → disabled "✓ IN COACHING QUEUE" (ink-950/85 + signal text).

**Maintain · Schedules** — 4 KPI tiles (plain, no delta); table: mono header
"ASSET / SERVICE / NEXT DUE / STATUS", 5 rows, due-text colored by tone
(alarm-deep / warn-deep / muted), status chip = dot + mono uppercase.
Footer mono line (P0217/WO-1482).

## Visual constraints

- Design tokens ONLY, with two sanctioned fixture exceptions: (1) drawn-map
  plan palette `#e9ebee #f2f4f5 #d5e8d0 #bcd9f2 #d8dbdf #ffffff #e6b95c
  #f6cd7d` and offline-marker `#9aa6c1`; (2) night-clip palette above. These
  are imagery pixels, not UI colors.
- Micro-type 10–13px is expected in this fixture (miniature app UI). The
  design hook flags these; leave them, they are reported as fixture waivers.
- Mono text uses the `font-mono` utility; SVG `<text>` uses
  `fontFamily="var(--font-chivo-mono), monospace"` (see font task).
- Keep existing `.zd-drive` / `.zd-playhead` classes from `app/globals.css`.
- Reduced motion: all movement is CSS-animation-driven (frozen by the global
  override); the 3s speed tick may keep updating text.
- A11y: module tabs are `role=tablist/tab` with `aria-selected`; rail is a
  `<nav aria-label="Console modules">`; both SVG scenes carry `role="img"` +
  descriptive `aria-label` ending "(demonstration)"; all controls are real
  `<button>`s.

## Font task (Agent F — completes an outstanding user request)

Swap IBM Plex Mono → **Chivo Mono** (Archivo's sibling from Omnibus-Type):
- `app/layout.tsx`: import `Chivo_Mono` from `next/font/google`, weights
  400/500/600, `variable: "--font-chivo-mono"`, replace `plexMono` usage on
  `<html>`.
- `app/globals.css` `@theme inline`: `--font-mono: var(--font-chivo-mono);`
- Replace remaining `var(--font-plex-mono)` references repo-wide.
- `DESIGN.md`: mechanical rename "IBM Plex Mono" → "Chivo Mono" (all
  occurrences, including the label/mono font line).

## Copy change (Integrator)

`platform-story.tsx` lede becomes:
"A working miniature of the real console. Drive the live map, replay a trip,
review a coaching clip, and check the maintenance queue."

## Acceptance criteria (verifier + final Fable QA)

1. `npx tsc --noEmit` clean; homepage 200; zero console errors.
2. Module switching works; Work/Forms/Reports and locked tabs show LockedPane.
3. Live Map: asset select from list AND marker; zoom on stopped assets;
   status pill shows 2/1/1/1; TRK-047 label speed ticks.
4. Trips: row click swaps route + restarts playhead; REPLAY restarts.
5. Safety: REVIEW deep-links to the right event; queue button transitions;
   e3 starts COACHED.
6. Maintain renders 5 rows with correct tones; KPIs read 5/1/1/3.
7. Every cross-view number matches this spec's fleet (spot-check list above).
8. Mobile 390px: rail + stage usable, no horizontal scroll, tabs swipeable.
9. Mono everywhere renders Chivo Mono (computed font-family check).
