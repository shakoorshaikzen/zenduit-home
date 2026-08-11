"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";

/*
 * The hero scene, composed on the reference class's shared principle: ONE
 * dominant image, full-bleed, with nothing floating over it except a single
 * piece of genuine product truth.
 *
 *  - Samsara: photograph edge-to-edge, type at scale, no decoration
 *  - Motive: one authentic product moment rather than a collage of chips
 *  - Apple/Linear: depth from grading and a single light source
 *
 * Photography: an active earthworks site shot from a drone (Unsplash, free licence),
 * graded to sit in the dark world. A mixed fleet working under one god's-eye view —
 * the same view the product gives you.
 */

export function FleetScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 transition-opacity duration-1000",
        mounted ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Full-bleed photograph — no boxing, no edge fades on the sides */}
      <img
        src="/hero-site.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[58%_50%]"
      />

      {/* Type scrim: navy holds the left column, the driver stays vivid right */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(6_10_20/0.96)_0%,rgb(6_10_20/0.88)_34%,rgb(6_10_20/0.45)_56%,rgb(6_10_20/0.12)_78%,transparent_100%)]" />
      {/* Small screens: the copy stacks over the frame, so it needs its own wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_10_20/0.72)_0%,rgb(6_10_20/0.86)_45%,rgb(6_10_20/0.94)_100%)] lg:hidden" />
      {/* Grounding: the photograph settles into the page rather than stopping */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />

      {/* One piece of product truth — the unit this driver is running. */}
      <div className="absolute bottom-[13%] right-[5%] hidden w-64 overflow-hidden rounded-md border border-hairline-d bg-ink-950/70 shadow-console backdrop-blur-xl lg:block">
        <div className="flex items-center justify-between border-b border-hairline-d px-3.5 py-2.5">
          <span className="font-mono text-xs font-medium tracking-[0.05em] text-dfg">
            TRK-047
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-dmuted">
            <span className="size-1.5 rounded-full bg-signal" />
            IN TRANSIT
          </span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-hairline-d">
          {[
            ["SPEED", "62 km/h"],
            ["FUEL", "71%"],
            ["ETA", "14:32"],
          ].map(([k, v]) => (
            <div key={k} className="px-3 py-2.5">
              <span className="block font-mono text-xs tracking-[0.08em] text-dfaint">
                {k}
              </span>
              <span className="mt-0.5 block font-mono text-xs text-dfg tabular-nums">
                {v}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-hairline-d px-3.5 pb-2.5 pt-2">
          <div className="h-0.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full w-[68%] rounded-full bg-accent" />
          </div>
          <div className="mt-1.5 flex items-center justify-between font-mono text-xs tracking-[0.05em] text-dfaint">
            <span>ROUTE 7</span>
            <span className="flex items-center gap-1.5 text-dmuted">
              <span className="size-1 rounded-full bg-signal" />
              ON TIME
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
