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
 * Footage: professionally shot native-4K aerial of an active earthworks
 * site (Pexels free licence, video 33360034 — commercial use permitted, no
 * attribution required), untouched apart from the loop hold; the scrims
 * below do the grading. Served as a codec ladder (AV1 / HEVC / H.264): the
 * clip plays through, holds its final frame for a beat, and restarts. The
 * poster is the clip's own first frame at 4K (responsive srcSet), so the
 * fade-in is seamless and reduced-motion users see the same site at rest.
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
        srcSet="/hero-site.webp 1920w, /hero-site-4k.webp 3840w"
        sizes="100vw"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* The same frame in motion: poster and video share frame one and the
          same center crop, so the fade-in lands without any reframe. */}
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
        {/* Resolution + codec ladder. The browser takes the first source
            whose media query matches AND whose codec it can decode, so each
            screen gets the best master it can actually resolve: phones pull
            the 1080p AV1 (a 4K decode they cannot display is wasted
            bandwidth and battery), everything larger pulls native
            3840x2160 via AV1 (Chrome/Firefox/Edge) or HEVC (Safari). The
            1080p H.264 is the universal floor: any browser reaching it
            supports neither modern codec, so it predates 4K displays and
            gains nothing from a 4K master. */}
        <source
          src="/hero-site-loop-1080.webm"
          type="video/webm"
          media="(max-width: 768px)"
        />
        <source src="/hero-site-loop-4k.webm" type="video/webm" />
        <source src="/hero-site-loop-4k-hevc.mp4" type='video/mp4; codecs="hvc1"' />
        <source src="/hero-site-loop.mp4" type="video/mp4" />
      </video>

      {/* Type scrim: navy holds the left column, the driver stays vivid right */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(6_10_20/0.96)_0%,rgb(6_10_20/0.88)_34%,rgb(6_10_20/0.45)_56%,rgb(6_10_20/0.12)_78%,transparent_100%)]" />
      {/* Small screens: the copy stacks over the frame, so it needs its own wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_10_20/0.72)_0%,rgb(6_10_20/0.86)_45%,rgb(6_10_20/0.94)_100%)] lg:hidden" />
      {/* Grounding: the photograph settles into the page rather than stopping */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />

      {/* One piece of product truth: Today reading THIS site. Every row
          names a machine visible in the footage, and the card shows the
          attention triage rather than raw monitoring: one decision waiting,
          the rest already handled. Synthetic-plausible values. */}
      <div className="absolute right-[4.5%] top-1/2 hidden w-[19rem] -translate-y-1/2 overflow-hidden rounded-md border border-hairline-d bg-ink-950/65 shadow-console backdrop-blur-md lg:block">
        <div className="flex items-center justify-between border-b border-hairline-d px-3.5 py-2.5">
          <span className="text-[13px] font-semibold tracking-[0.04em] text-dfg">
            TODAY · SITE 12
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] text-dmuted">
            <span className="size-1.5 rounded-full bg-signal" />
            LIVE
          </span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-hairline-d border-b border-hairline-d">
          {[
            ["NEEDS YOU", "1"],
            ["HANDLED", "6"],
            ["IDLE", "4%"],
          ].map(([k, v]) => (
            <div key={k} className="px-3 py-2.5">
              <span className="block text-[10px] font-medium tracking-[0.08em] text-dfaint">
                {k}
              </span>
              <span className="mt-0.5 block text-[13px] font-semibold text-dfg tabular-nums">
                {v}
              </span>
            </div>
          ))}
        </div>
        <div className="divide-y divide-hairline-d">
          {[
            ["EXC-114", "TRENCHING · ON PLAN"],
            ["TRK-032", "BRAKE WEAR · WO DRAFTED"],
            ["LDR-05", "STAGING · HANDLED"],
          ].map(([unit, status]) => (
            <div
              key={unit}
              className="flex items-center justify-between px-3.5 py-2"
            >
              <span className="whitespace-nowrap text-[11px] font-semibold tracking-[0.04em] text-dfg">
                {unit}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.04em] text-dmuted">
                <span
                  className={
                    status.includes("DRAFTED")
                      ? "size-1 rounded-full bg-warn"
                      : "size-1 rounded-full bg-signal"
                  }
                />
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-hairline-d px-3.5 py-2">
          <span className="text-[10px] font-medium tracking-[0.08em] text-dfaint">
            1 DECISION WAITING
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] text-dmuted">
            <span className="size-1 rounded-full bg-signal" />
            REST IS HANDLED
          </span>
        </div>
      </div>
    </div>
  );
}
