import {
  Inbox,
  Map as MapIcon,
  Shield,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/*
 * ZenduONE demo — the single source of truth.
 *
 * One synthetic fleet powers every pane, so the numbers agree everywhere:
 * five assets, three drivers, three safety events (tied 1:1 to the risk
 * rows), five maintenance services. Maps, Safety and Maintain are live;
 * Work, Forms and Reports are visible but demo-locked, like a guided trial.
 *
 * Pure data — no "use client" needed; the icon refs below are component
 * references consumed by the client chrome.
 */

/* ---------- Shared vocabulary ---------- */

export type ModuleId = "today" | "maps" | "safety" | "maintain";

export type AssetId = "trk047" | "van112" | "trk051" | "reef09" | "pkp08";

/** Status tone shared by dots, chips and due-text. */
type Tone = "signal" | "warn" | "alarm";

/** Live vehicle state — drives the map dots and the status pill counts. */
type AssetState = "moving" | "idling" | "stopped" | "offline";

type Trip = {
  /** SVG path in the 900×620 city-map viewBox. */
  d: string;
  label: string;
  km: number;
  driving: string;
  stops: number;
  exceptions: number;
};

export type Asset = {
  id: AssetId;
  name: string;
  model: string;
  driver: string | null;
  addr: string;
  cam: boolean;
  /** Marker position in the 900×620 city-map viewBox. */
  x: number;
  y: number;
  /** Rides the `.zd-drive` highway animation and shows a live KM/H label. */
  moving?: boolean;
  /** Extra sensor line appended in the asset list (REEF-09 only). */
  beacons?: string;
  state: AssetState;
  statusLine: string;
  /** Only assets with trips appear in Maps · Trips. */
  trip?: Trip;
};

type SafetyEvent = {
  id: string;
  /** Rule name, as the real Exceptions list titles each row. */
  label: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  asset: string;
  driver: string;
  time: string;
  tone: Tone;
  status: string;
};

type Risk = {
  rule: string;
  count: string;
  rate: string;
  impact: string;
  /** Index into EVENTS that the REVIEW link deep-links to. */
  eventIndex: number;
};

type Service = {
  asset: string;
  service: string;
  type: string;
  due: string;
  status: string;
  tone: Tone;
};

type ModuleTab = { id: string; label: string; live: boolean };

type RailItem = { id: ModuleId; icon: LucideIcon; label: string; live: boolean };

/* ---------- The fleet ---------- */

export const ASSETS: Asset[] = [
  {
    id: "trk047",
    name: "TRK-047",
    model: "Freightliner M2",
    driver: "D. Kowalski",
    addr: "Route 7 N, Winnipeg MB",
    cam: true,
    x: 520,
    y: 380,
    moving: true,
    state: "moving",
    statusLine: "ROUTE 7 · ON TIME",
    trip: {
      d: "M 80 470 C 200 430 380 470 520 380 S 760 240 900 260",
      label: "06:12 – now",
      km: 342,
      driving: "6h 12m",
      stops: 8,
      exceptions: 2,
    },
  },
  {
    id: "van112",
    name: "VAN-112",
    model: "Transit 350",
    driver: "M. Hale",
    addr: "Gastonia Rd, Brampton ON",
    cam: true,
    x: 300,
    y: 140,
    state: "moving",
    statusLine: "44 KM/H · DELIVERIES",
    trip: {
      d: "M 140 560 L 140 380 L 260 260 L 380 260 L 500 140 L 640 140",
      label: "07:02 – now",
      km: 186,
      driving: "4h 05m",
      stops: 12,
      exceptions: 1,
    },
  },
  {
    id: "trk051",
    name: "TRK-051",
    model: "Hino 268",
    driver: "J. Patel",
    addr: "172 Bay St Yard",
    cam: true,
    x: 500,
    y: 500,
    state: "idling",
    statusLine: "IDLE 14 MIN · YARD",
    trip: {
      d: "M 80 560 L 140 500 L 260 500 L 380 380 L 500 500",
      label: "05:48 – 07:28",
      km: 58,
      driving: "1h 40m",
      stops: 3,
      exceptions: 0,
    },
  },
  {
    id: "reef09",
    name: "REEF-09",
    model: "Reefer trailer",
    driver: null,
    addr: "Dock 4, Cold Storage",
    cam: true,
    x: 140,
    y: 500,
    beacons: "3.0°C · IN RANGE",
    state: "stopped",
    statusLine: "REEFER OK",
  },
  {
    id: "pkp08",
    name: "PKP-08",
    model: "F-150",
    driver: null,
    addr: "Yard B, Row 14",
    cam: false,
    x: 380,
    y: 260,
    state: "offline",
    statusLine: "OFFLINE FOR 2D",
  },
];

/** Live-map status pill — derived, never hand-typed: MOVING 2 · IDLING 1 · STOPPED 1 · OFFLINE 1. */
export const STATE_COUNTS: Record<AssetState, number> = {
  moving: ASSETS.filter((a) => a.state === "moving").length,
  idling: ASSETS.filter((a) => a.state === "idling").length,
  stopped: ASSETS.filter((a) => a.state === "stopped").length,
  offline: ASSETS.filter((a) => a.state === "offline").length,
};

/* ---------- Safety ---------- */

/*
 * Three real dash-cam exports from ZenduONE, in the demo's own fleet.
 * The speed, timestamp, duration and channel count on each record are the
 * values burnt into that clip's own overlay, so the panel beside the player
 * can never contradict what the viewer is watching.
 */
export const EVENTS: readonly SafetyEvent[] = [
  {
    id: "e1",
    label: "Hard braking",
    severity: "HIGH",
    asset: "TRK-047",
    driver: "D. Kowalski",
    time: "16:06",
    tone: "alarm",
    status: "NEEDS REVIEW",
  },
  {
    id: "e2",
    label: "Rolling stop warning",
    severity: "MEDIUM",
    asset: "TRK-051",
    driver: "J. Patel",
    time: "11:30",
    tone: "warn",
    status: "NEEDS COACHING",
  },
  {
    id: "e3",
    label: "Manual video request",
    severity: "LOW",
    asset: "VAN-112",
    driver: "M. Hale",
    time: "22:41",
    tone: "signal",
    status: "REVIEWED",
  },
];

/** Risk factors — each REVIEW link opens Exceptions at `eventIndex`. */
export const RISKS: readonly Risk[] = [
  { rule: "Hard braking", count: "1 event", rate: "0.08 / 100 km", impact: "96 pts", eventIndex: 0 },
  { rule: "Rolling stop warning", count: "1 event", rate: "0.08 / 100 km", impact: "61 pts", eventIndex: 1 },
];

/* ---------- Maintain ---------- */

/** KPIs read off this list: Total 5 · Overdue 1 · Due soon 1 · Scheduled 3. */
export const SERVICES: readonly Service[] = [
  {
    asset: "TRK-051",
    service: "Oil & filter change",
    type: "Preventive",
    due: "500 km remaining · 12d overdue",
    status: "Overdue",
    tone: "alarm",
  },
  {
    asset: "REEF-09",
    service: "Reefer unit service",
    type: "Preventive",
    due: "Due in 6 days",
    status: "Due Soon",
    tone: "warn",
  },
  {
    asset: "TRK-047",
    service: "Brake inspection",
    type: "Preventive",
    due: "Aug 26, 2026",
    status: "Scheduled",
    tone: "signal",
  },
  {
    asset: "VAN-112",
    service: "Tire rotation",
    type: "Preventive",
    due: "Sep 02, 2026",
    status: "Scheduled",
    tone: "signal",
  },
  {
    asset: "PKP-08",
    service: "Annual safety",
    type: "Compliance",
    due: "Sep 14, 2026",
    status: "Scheduled",
    tone: "signal",
  },
];

/* ---------- Console chrome ---------- */

export const RAIL: RailItem[] = [
  { id: "today", icon: Inbox, label: "Today", live: true },
  { id: "maps", icon: MapIcon, label: "Maps", live: true },
  { id: "safety", icon: Shield, label: "Safety", live: true },
  { id: "maintain", icon: Wrench, label: "Maintain", live: true },
];

/**
 * Tab sets per module. Every module and tab in the demo is live; nothing
 * renders locked or inert.
 */
export const MODULE_TABS: Record<ModuleId, ModuleTab[]> = {
  today: [{ id: "cases", label: "What matters now", live: true }],
  maps: [
    { id: "live", label: "Live Map", live: true },
    { id: "trips", label: "Trips", live: true },
        ],
  safety: [
    { id: "overview", label: "Overview", live: true },
    { id: "coaching", label: "Exceptions", live: true },
  ],
  maintain: [
    { id: "schedules", label: "Schedules", live: true },
        ],
};

/** Tone → dot background utility, shared by status chips and event rows. */
export const TONE_DOT: Record<Tone, string> = {
  signal: "bg-signal",
  warn: "bg-warn",
  alarm: "bg-alarm",
};

/* ---------- Record depth ----------
 *
 * What a click opens. Every figure below reconciles with the fleet above:
 * today's distance matches each trip, the maintenance lines match SERVICES,
 * and the safety notes match EVENTS. Kept in separate maps so the list panes
 * stay lean and only the detail sheets pay for the extra weight.
 */

export type AssetDetail = {
  group: string;
  device: string;
  odo: string;
  engineHours: string;
  fuel: string;
  today: { km: string; driving: string; stops: string; idle: string };
  lastService: string;
  nextService: string;
  nextServiceTone: Tone;
};

export const ASSET_DETAIL: Record<AssetId, AssetDetail> = {
  trk047: {
    group: "Linehaul · MB",
    device: "GO9 + ZenCam Plus",
    odo: "184,320 km",
    engineHours: "6,412 h",
    fuel: "68%",
    today: { km: "342 km", driving: "6h 12m", stops: "8", idle: "22 min" },
    lastService: "Oil & filter · Jul 14, 2026",
    nextService: "Brake inspection · Aug 26, 2026",
    nextServiceTone: "signal",
  },
  van112: {
    group: "Delivery · GTA",
    device: "GO9 + ZenCam Plus",
    odo: "96,845 km",
    engineHours: "3,190 h",
    fuel: "41%",
    today: { km: "186 km", driving: "4h 05m", stops: "12", idle: "35 min" },
    lastService: "Brake pads · Jun 28, 2026",
    nextService: "Tire rotation · Sep 02, 2026",
    nextServiceTone: "signal",
  },
  trk051: {
    group: "Regional · ON",
    device: "GO9 + ZenCam Plus",
    odo: "212,704 km",
    engineHours: "7,880 h",
    fuel: "54%",
    today: { km: "58 km", driving: "1h 40m", stops: "3", idle: "14 min" },
    lastService: "Oil & filter · Mar 02, 2026",
    nextService: "Oil & filter · 12 days overdue",
    nextServiceTone: "alarm",
  },
  reef09: {
    group: "Trailers · Cold chain",
    device: "ZenTemp + ZenDoor",
    odo: "n/a",
    engineHours: "Reefer 2,140 h",
    fuel: "Reefer 74%",
    today: { km: "0 km", driving: "None", stops: "1", idle: "None" },
    lastService: "Reefer service · Feb 09, 2026",
    nextService: "Reefer service · due in 6 days",
    nextServiceTone: "warn",
  },
  pkp08: {
    group: "Supervisor · Yard",
    device: "GO9",
    odo: "58,190 km",
    engineHours: "1,640 h",
    fuel: "Last read 22%",
    today: { km: "0 km", driving: "None", stops: "0", idle: "None" },
    lastService: "Annual safety · Sep 20, 2025",
    nextService: "Annual safety · Sep 14, 2026",
    nextServiceTone: "signal",
  },
};

export type EventDetail = {
  speed: string;
  /** Verbatim from the clip's own GPS overlay. */
  coords: string;
  place: string;
  when: string;
  channels: string;
  duration: string;
  description: string;
  video: string;
  poster: string;
};

export const EVENT_DETAIL: Record<string, EventDetail> = {
  e1: {
    speed: "48 km/h",
    coords: "3.3152092N 76.16.49554W",
    place: "Palmira, Valle del Cauca",
    when: "Mon, Aug 17 2026, 4:06 PM",
    channels: "CH 1 · road",
    duration: "11 seconds",
    description:
      "Deceleration crossed the hard-braking threshold on a tree-lined approach. The road channel covers the full 11 seconds either side of the trigger.",
    video: "/exceptions/hard-brake.mp4",
    poster: "/exceptions/hard-brake.jpg",
  },
  e2: {
    speed: "50 km/h",
    coords: "3.30.6074N 76.26.54433W",
    place: "Palmira, Valle del Cauca",
    when: "Sun, Aug 16 2026, 11:30 AM",
    channels: "CH 1 · road",
    duration: "11 seconds",
    description:
      "ADAS flagged a rolling stop: the vehicle slowed but never came to a complete stop. Wet surface and lane work in frame, so the clip is worth coaching from rather than dismissing.",
    video: "/exceptions/rolling-stop.mp4",
    poster: "/exceptions/rolling-stop.jpg",
  },
  e3: {
    speed: "51 mph",
    coords: "40.49.59367N 74.7.39402W",
    place: "New Jersey, US",
    when: "Fri, Oct 10 2025, 10:41 PM",
    channels: "CH 1 + CH 2 · road and cabin",
    duration: "11 seconds",
    description:
      "Footage pulled on request rather than by a rule, so both channels came back. Nothing to coach, and the review closed it.",
    video: "/exceptions/manual-request.mp4",
    poster: "/exceptions/manual-request.jpg",
  },
};

export type ServiceDetail = {
  interval: string;
  lastDone: string;
  parts: string;
  workOrder: string;
  estimate: string;
  assignee: string;
};

/** Keyed by `${asset}-${service}` so a row can look up its own record. */
export const SERVICE_DETAIL: Record<string, ServiceDetail> = {
  "TRK-051-Oil & filter change": {
    interval: "Every 20,000 km or 6 months",
    lastDone: "Mar 02, 2026 · 192,180 km",
    parts: "15W-40 (12L), filter LF9080 · in stock",
    workOrder: "WO-1482 · open",
    estimate: "1.5 h · $310",
    assignee: "Yard shop · R. Singh",
  },
  "REEF-09-Reefer unit service": {
    interval: "Every 2,000 reefer hours",
    lastDone: "Feb 09, 2026 · 1,980 h",
    parts: "Belt kit, coolant · on order",
    workOrder: "Not yet raised",
    estimate: "3 h · $640",
    assignee: "Cold-chain vendor",
  },
  "TRK-047-Brake inspection": {
    interval: "Every 25,000 km",
    lastDone: "Apr 18, 2026 · 161,400 km",
    parts: "None expected",
    workOrder: "Not yet raised",
    estimate: "1 h · $140",
    assignee: "Yard shop",
  },
  "VAN-112-Tire rotation": {
    interval: "Every 12,000 km",
    lastDone: "Jun 28, 2026 · 85,600 km",
    parts: "None",
    workOrder: "Not yet raised",
    estimate: "0.75 h · $90",
    assignee: "Yard shop",
  },
  "PKP-08-Annual safety": {
    interval: "Annual · compliance",
    lastDone: "Sep 20, 2025",
    parts: "None expected",
    workOrder: "Not yet raised",
    estimate: "2 h · $260",
    assignee: "Certified inspector",
  },
};

/*
 * Today: the operation reduced to what matters. Three cases spanning the
 * guide's attention triage: one needing human judgment, one already
 * prepared and awaiting approval, one handled with no action required.
 */
export type TodayCase = {
  id: string;
  kind: "review" | "approve" | "handled";
  tone: "alarm" | "warn" | "signal";
  changed: string;
  matters: string;
  next: string;
};

export const CASES: TodayCase[] = [
  {
    id: "c1",
    kind: "review",
    tone: "alarm",
    changed: "Hard braking, TRK-047 on Route 7",
    matters: "High severity · D. Kowalski",
    next: "11s road-channel clip ready to review",
  },
  {
    id: "c2",
    kind: "approve",
    tone: "warn",
    changed: "Fault P0217 on TRK-051 in the yard",
    matters: "Oil service already 12 days overdue",
    next: "WO-1482 drafted · parts in stock",
  },
  {
    id: "c3",
    kind: "handled",
    tone: "signal",
    changed: "Reefer temp dip on REEF-09 at Dock 4",
    matters: "Spec 2–4°C · recovered in 6 min",
    next: "Logged to the cold-chain record",
  },
];
