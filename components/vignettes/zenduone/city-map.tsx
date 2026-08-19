"use client";

import type { Asset } from "./data";

/*
 * The drawn city plan — the map pane of the real ZenduONE console, rebuilt as
 * flat SVG so it ships with zero tiles and zero network. The palette here is a
 * sanctioned fixture exception (imagery pixels, not UI colours):
 *   #e9ebee ground · #f2f4f5 blocks · #d5e8d0 parks · #bcd9f2 water
 *   #d8dbdf street casing · #ffffff street fill · #e6b95c/#f6cd7d highway
 *   #9aa6c1 offline marker
 */

const MONO = "var(--font-chivo-mono), monospace";

/* [x, y, w, h] city blocks */
const BLOCKS: [number, number, number, number][] = [
  [30, 30, 90, 90],
  [170, 30, 170, 90],
  [30, 170, 90, 170],
  [290, 290, 170, 70],
  [170, 410, 90, 70],
  [410, 30, 90, 90],
  [290, 170, 90, 70],
  [530, 170, 80, 70],
  [410, 410, 70, 70],
  [530, 530, 80, 60],
];

const STREETS = [
  "M 140 0 V 620",
  "M 260 0 V 620",
  "M 380 0 V 620",
  "M 500 0 V 620",
  "M 0 140 H 640",
  "M 0 260 H 900",
  "M 0 380 H 620",
  "M 0 500 H 660",
];

/* Matches the offset-path in .zd-drive (app/globals.css) exactly. */
const HIGHWAY = "M 0 470 C 200 430 380 470 520 380 S 760 240 900 260";

export function CityMap({
  children,
  zoomTo,
}: {
  children: React.ReactNode;
  zoomTo: { x: number; y: number } | null;
}) {
  const transform = zoomTo
    ? `translate(${450 - zoomTo.x * 1.5}px, ${310 - zoomTo.y * 1.5}px) scale(1.5)`
    : "translate(0px, 0px) scale(1)";

  return (
    <svg
      viewBox="0 0 900 620"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Fleet map with live asset positions and route traces (demonstration)"
    >
      <g
        style={{
          transform,
          transition: "transform 600ms cubic-bezier(0.21,0.47,0.32,0.98)",
        }}
      >
        <rect width="900" height="620" fill="#e9ebee" />
        {BLOCKS.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#f2f4f5" />
        ))}
        <rect x="60" y="60" width="150" height="110" rx="10" fill="#d5e8d0" />
        <rect x="520" y="430" width="130" height="100" rx="10" fill="#d5e8d0" />
        <path
          d="M 660 0 C 700 160 690 300 730 440 C 750 520 770 570 790 620 L 900 620 L 900 0 Z"
          fill="#bcd9f2"
        />
        {STREETS.map((d) => (
          <path key={`casing${d}`} d={d} stroke="#d8dbdf" strokeWidth="11" fill="none" />
        ))}
        {STREETS.map((d) => (
          <path key={`fill${d}`} d={d} stroke="#ffffff" strokeWidth="7" fill="none" />
        ))}
        <path d={HIGHWAY} stroke="#e6b95c" strokeWidth="15" fill="none" />
        <path d={HIGHWAY} stroke="#f6cd7d" strokeWidth="11" fill="none" />
        <path d="M 640 260 H 900" stroke="#ffffff" strokeWidth="7" fill="none" />
        {children}
      </g>
    </svg>
  );
}

export function Marker({
  a,
  speed,
  selected,
  onSelect,
}: {
  a: Asset;
  speed: number;
  selected: boolean;
  onSelect: () => void;
}) {
  /* `moving` marks the one asset that patrols the highway (TRK-047), so it is
     the one whose label carries the ticking speed. Others report their state. */
  const drives = a.moving === true;
  const fill = a.state === "offline" ? "#9aa6c1" : "var(--color-accent)";

  const body = (
    <>
      <circle
        r={selected ? 11 : 8}
        fill={fill}
        stroke="#ffffff"
        strokeWidth="2.5"
        className="cursor-pointer"
        onClick={onSelect}
      />
      {selected && (
        <>
          <circle
            r="17"
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
          <g transform="translate(14, -34)">
            <rect width={drives ? 128 : 112} height="26" rx="5" fill="#ffffff" stroke="#d8dbdf" />
            <text x="10" y="17" fontFamily={MONO} fontSize="11" fill="#131b2e">
              {a.name} · {drives ? `${speed} KM/H` : a.state.toUpperCase()}
            </text>
          </g>
        </>
      )}
    </>
  );

  if (drives) {
    return (
      <g className="zd-drive" onClick={onSelect}>
        {body}
      </g>
    );
  }
  return <g transform={`translate(${a.x}, ${a.y})`}>{body}</g>;
}
