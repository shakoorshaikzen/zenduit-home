// Synthetic demonstration data — not real fleet telemetry.
// Event labels count violations, so every delta reads "fewer events".

const IMPROVEMENTS = [
  { label: "HARSH BRAKING", width: "26%", delta: "-64%" },
  { label: "TAILGATING", width: "34%", delta: "-44%" },
  { label: "SPEEDING", width: "20%", delta: "-57%" },
];

/** Compact supporting column for the camera showpiece — the camera leads. */
export function SafetyPanel() {
  return (
    <div
      role="img"
      aria-label="Fleet safety score panel and in-cab coaching call (demonstration data)"
      className="space-y-4"
    >
      <div aria-hidden className="rounded-md border border-hairline-d bg-ink-850/80 p-5">
        <span className="font-mono text-xs tracking-[0.08em] text-dfaint">
          FLEET SAFETY SCORE
        </span>
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <span className="font-mono text-stat font-medium text-dfg tabular-nums">
            94
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs tracking-[0.08em] text-dmuted tabular-nums">
            <span aria-hidden className="size-1.5 rounded-full bg-signal" />
            +6 THIS QUARTER
          </span>
        </div>
        <div className="mt-5 space-y-2.5 border-t border-hairline-d pt-4">
          {IMPROVEMENTS.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 font-mono text-xs tracking-[0.05em] text-dmuted">
                {row.label}
              </span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                <span
                  className="block h-full rounded-full bg-signal/70"
                  style={{ width: row.width }}
                />
              </span>
              <span className="w-10 shrink-0 text-right font-mono text-xs text-dfg tabular-nums">
                {row.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* The coaching moment — Zenduit's own in-cab visual, unadorned. */}
      <div aria-hidden className="overflow-hidden rounded-md border border-hairline-d">
        <img src="/coaching-call.webp" alt="" loading="lazy" className="block w-full" />
      </div>
    </div>
  );
}
