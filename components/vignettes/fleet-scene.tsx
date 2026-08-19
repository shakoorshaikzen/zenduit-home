"use client";

import { useEffect, useRef, useState } from "react";
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
 *
 * The photograph is alive: /hero-site-loop.mp4 is an AI image-to-video render
 * of this exact frame (machines working, dust, heat shimmer), cut into a
 * seamless 9s crossfade loop. The still remains the poster, the fallback,
 * and the whole experience for anyone preferring reduced motion.
 */

export function FleetScene() {
  const [mounted, setMounted] = useState(false);
  const [videoLive, setVideoLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => setMounted(true), []);

  // Play only for users who accept motion, and surface the video only once
  // frames are actually rendering — on any failure the photo simply remains.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (media.matches) {
        video.pause();
        setVideoLive(false);
      } else {
        video.play().catch(() => {});
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 transition-opacity duration-1000",
        mounted ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Full-bleed photograph — no boxing, no edge fades on the sides.
          Always rendered: poster, reduced-motion state, and fallback. */}
      <img
        src="/hero-site.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[58%_50%]"
      />

      {/* The same frame in motion. The render was generated from the 58%-
          biased crop, so its own center already matches the photo's focal
          point; the 1s fade-in absorbs the small reframe between the two. */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setVideoLive(true)}
        onError={() => setVideoLive(false)}
        className={cx(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
          videoLive ? "opacity-100" : "opacity-0",
        )}
      >
        <source src="/hero-site-loop.mp4" type="video/mp4" />
      </video>

      {/* Type scrim: navy holds the left column, the driver stays vivid right */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(6_10_20/0.96)_0%,rgb(6_10_20/0.88)_34%,rgb(6_10_20/0.45)_56%,rgb(6_10_20/0.12)_78%,transparent_100%)]" />
      {/* Small screens: the copy stacks over the frame, so it needs its own wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_10_20/0.72)_0%,rgb(6_10_20/0.86)_45%,rgb(6_10_20/0.94)_100%)] lg:hidden" />
      {/* Grounding: the photograph settles into the page rather than stopping */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />

      {/* One piece of product truth: the dashboard reading THIS site. Every
          row names a machine visible in the footage (excavator loading,
          dump truck hauling, crusher running). Synthetic-plausible values. */}
      <div className="absolute right-[4.5%] top-1/2 hidden w-[17rem] -translate-y-1/2 overflow-hidden rounded-md border border-hairline-d bg-ink-950/65 shadow-console backdrop-blur-md lg:block">
        <div className="flex items-center justify-between border-b border-hairline-d px-3.5 py-2.5">
          <span className="font-mono text-xs font-medium tracking-[0.05em] text-dfg">
            SITE 12 · EARTHWORKS
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-dmuted">
            <span className="size-1.5 rounded-full bg-signal" />
            LIVE
          </span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-hairline-d border-b border-hairline-d">
          {[
            ["UNITS", "7"],
            ["LOADS", "27"],
            ["IDLE", "4%"],
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
        <div className="divide-y divide-hairline-d">
          {[
            ["EXC-114", "LOADING"],
            ["TRK-047", "HAUL CYCLE 9"],
            ["CRH-02", "CRUSHER RUNNING"],
          ].map(([unit, status]) => (
            <div
              key={unit}
              className="flex items-center justify-between px-3.5 py-2"
            >
              <span className="font-mono text-xs tracking-[0.05em] text-dfg">
                {unit}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs tracking-[0.05em] text-dmuted">
                <span className="size-1 rounded-full bg-signal" />
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-hairline-d px-3.5 py-2">
          <span className="font-mono text-xs tracking-[0.08em] text-dfaint">
            GEOFENCE ACTIVE
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-dmuted">
            <span className="size-1 rounded-full bg-signal" />
            ON SCHEDULE
          </span>
        </div>
      </div>
    </div>
  );
}
