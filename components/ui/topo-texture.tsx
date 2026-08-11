/**
 * Topographic contour texture for dark sections (ArcBest reference) —
 * pure SVG, very low opacity, purely decorative.
 */
export function TopoTexture({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g stroke="rgb(237 241 248 / 0.05)" strokeWidth="1">
        <path d="M1020 -40c150 60 260 90 300 210 40 120-60 200-180 230s-260-10-320-110 -40-180 20-250 120-110 180-80Z" />
        <path d="M1060 20c110 45 195 75 225 165 30 90-45 155-135 178s-200-8-245-83 -30-140 15-193 95-90 140-67Z" />
        <path d="M1095 80c75 30 130 55 150 115 20 60-30 105-90 120s-135-5-165-55 -20-95 10-130 65-65 95-50Z" />
        <path d="M1125 140c40 16 70 32 80 65 10 33-16 57-48 65s-73-3-89-30 -11-52 5-71 35-37 52-29Z" />
        <path d="M120 620c130-90 280-70 360 10s90 210 0 280-260 80-360 0S-10 710 120 620Z" />
        <path d="M160 665c100-68 215-52 276 8s70 160 0 213-200 60-276 0-100-153 0-221Z" />
        <path d="M205 715c70-46 145-36 188 6s48 108 0 144-136 41-188 0-70-104 0-150Z" />
        <path d="M250 762c40-26 82-20 106 4s27 61 0 81-77 23-106 0-40-59 0-85Z" />
        <path d="M-60 180C80 120 240 140 320 220s60 200-40 250-260 30-330-50 -50-160 10-220Z" />
        <path d="M-30 220c105-45 225-28 285 32s45 150-30 187-195 23-247-37 -38-137-8-182Z" />
      </g>
    </svg>
  );
}
