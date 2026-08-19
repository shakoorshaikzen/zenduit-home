import {
  BarChart3,
  Briefcase,
  ClipboardList,
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

export type ModuleId = "maps" | "safety" | "maintain" | "work" | "forms" | "reports";

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
  label: string;
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
    statusLine: "REEFER OK · 3.0°C",
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

export const EVENTS: readonly SafetyEvent[] = [
  {
    id: "e1",
    label: "HARSH ACCELERATION",
    asset: "TRK-047",
    driver: "D. Kowalski",
    time: "07:42",
    tone: "alarm",
    status: "NEEDS REVIEW",
  },
  {
    id: "e2",
    label: "TAILGATING",
    asset: "VAN-112",
    driver: "M. Hale",
    time: "09:15",
    tone: "warn",
    status: "NEEDS COACHING",
  },
  {
    id: "e3",
    label: "DISTRACTION",
    asset: "TRK-051",
    driver: "J. Patel",
    time: "11:03",
    tone: "warn",
    status: "COACHED",
  },
];

/** Risk factors — each REVIEW link opens Exceptions at `eventIndex`. */
export const RISKS: readonly Risk[] = [
  { rule: "Hard Acceleration", count: "4 events", rate: "0.31 / 100 km", impact: "233 pts", eventIndex: 0 },
  { rule: "Tailgating", count: "2 events", rate: "0.16 / 100 km", impact: "148 pts", eventIndex: 1 },
  { rule: "Distraction", count: "1 event", rate: "0.08 / 100 km", impact: "61 pts", eventIndex: 2 },
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
  { id: "maps", icon: MapIcon, label: "Maps", live: true },
  { id: "safety", icon: Shield, label: "Safety", live: true },
  { id: "maintain", icon: Wrench, label: "Maintain", live: true },
  { id: "work", icon: Briefcase, label: "Work", live: false },
  { id: "forms", icon: ClipboardList, label: "Forms", live: false },
  { id: "reports", icon: BarChart3, label: "Reports", live: false },
];

/**
 * Tab sets per module. Locked modules keep an (empty) entry so indexing by
 * ModuleId is always safe — their stage is a LockedPane, no tabs to render.
 */
export const MODULE_TABS: Record<ModuleId, ModuleTab[]> = {
  maps: [
    { id: "live", label: "Live Map", live: true },
    { id: "trips", label: "Trips", live: true },
    { id: "assets", label: "Assets", live: false },
    { id: "drivers", label: "Drivers", live: false },
    { id: "locations", label: "Locations", live: false },
  ],
  safety: [
    { id: "overview", label: "Overview", live: true },
    { id: "coaching", label: "Exceptions", live: true },
  ],
  maintain: [
    { id: "schedules", label: "Schedules", live: true },
    { id: "issues", label: "Issues", live: false },
    { id: "workorders", label: "Work Orders", live: false },
    { id: "parts", label: "Parts", live: false },
  ],
  work: [],
  forms: [],
  reports: [],
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
    odo: "—",
    engineHours: "Reefer 2,140 h",
    fuel: "Reefer 74%",
    today: { km: "0 km", driving: "—", stops: "1", idle: "—" },
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
    today: { km: "0 km", driving: "—", stops: "0", idle: "—" },
    lastService: "Annual safety · Sep 20, 2025",
    nextService: "Annual safety · Sep 14, 2026",
    nextServiceTone: "signal",
  },
};

export type EventDetail = {
  speed: string;
  posted: string;
  location: string;
  clip: string;
  note: string;
};

export const EVENT_DETAIL: Record<string, EventDetail> = {
  e1: {
    speed: "74 km/h",
    posted: "70 km/h",
    location: "Route 7 N @ Oak Point Hwy",
    clip: "12s · road + cab",
    note: "Throttle from 41 to 74 km/h in 8s leaving the yard exit.",
  },
  e2: {
    speed: "61 km/h",
    posted: "60 km/h",
    location: "Gastonia Rd @ Kennedy",
    clip: "12s · road + cab",
    note: "Followed 0.6s behind the vehicle ahead for 14s in wet conditions.",
  },
  e3: {
    speed: "0 km/h",
    posted: "50 km/h",
    location: "172 Bay St Yard",
    clip: "12s · cab only",
    note: "Handheld device detected for 6s while stationary in the yard.",
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
