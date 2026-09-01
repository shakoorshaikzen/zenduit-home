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
 *
 * LOAD POLICY: the poster is the LCP element and is fetched at high priority;
 * the video masters are never requested until after mount, and then only on a
 * connection that can carry them. Fleet managers are on field connections —
 * a 25 MB 4K master must never sit in front of the headline. Reduced motion,
 * Save-Data, and 2g/3g all resolve to the photograph, which is the same frame.
 */

/* Does this connection get the motion master? Unknown connections are
   treated as capable (the API is Chromium-only); anything that reports
   Save-Data or a pre-4g effective type keeps the photograph. */
function connectionCanCarryVideo() {
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  const type = conn.effectiveType;
  return !type || type === "4g";
}

export function FleetScene() {
  const [mounted, setMounted] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoLive, setVideoLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => setMounted(true), []);

  // Decide once, after mount, whether the masters get requested at all.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!connectionCanCarryVideo()) return;
    setLoadVideo(true);
  }, []);

  // Play only for users who accept motion, and surface the video only once
  // frames are actually rendering — on any failure the photo simply remains.
  useEffect(() => {
    if (!loadVideo) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (media.matches) {
        video.pause();
        setVideoLive(false);
      } else {
        video.load();
        video.play().catch(() => {});
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [loadVideo]);

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
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* The same frame in motion: poster and video share frame one and the
          same center crop, so the fade-in lands without any reframe. */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setVideoLive(true)}
        onError={() => setVideoLive(false)}
        className={cx(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
          videoLive ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Sources mount only once the connection has been cleared, so a
            field connection never even opens the request.
            Resolution + codec ladder. The browser takes the first source
            whose media query matches AND whose codec it can decode, so each
            screen gets the best master it can actually resolve: phones pull
            the 1080p AV1 (a 4K decode they cannot display is wasted
            bandwidth and battery), everything larger pulls native
            3840x2160 via AV1 (Chrome/Firefox/Edge) or HEVC (Safari). The
            1080p H.264 is the universal floor: any browser reaching it
            supports neither modern codec, so it predates 4K displays and
            gains nothing from a 4K master. */}
        {loadVideo && (
          <>
            <source
              src="/hero-site-loop-1080.webm"
              type="video/webm"
              media="(max-width: 768px)"
            />
            <source src="/hero-site-loop-4k.webm" type="video/webm" />
            <source src="/hero-site-loop-4k-hevc.mp4" type='video/mp4; codecs="hvc1"' />
            <source src="/hero-site-loop.mp4" type="video/mp4" />
          </>
        )}
      </video>

      {/* Type scrim: navy holds the left column, the driver stays vivid right */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(6_10_20/0.96)_0%,rgb(6_10_20/0.88)_34%,rgb(6_10_20/0.45)_56%,rgb(6_10_20/0.12)_78%,transparent_100%)]" />
      {/* Small screens: the copy stacks over the frame, so it needs its own wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_10_20/0.72)_0%,rgb(6_10_20/0.86)_45%,rgb(6_10_20/0.94)_100%)] lg:hidden" />
      {/* Grounding: the photograph settles into the page rather than stopping */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />

      {/* One piece of product truth: Today reading THIS site as the comp
          draws it — the attention triage, not raw monitoring. One decision
          waiting; twenty things that never needed a manager. Synthetic-
          plausible values, and the card says so on its last line. */}
      <div className="absolute right-[4.5%] top-1/2 hidden w-[21rem] -translate-y-1/2 overflow-hidden rounded-md border border-hairline-d bg-ink-950/65 shadow-console backdrop-blur-md lg:block">
        <div className="flex items-center justify-between border-b border-hairline-d px-3.5 py-2.5">
          <span className="text-[13px] font-semibold tracking-[0.04em] text-dfg">
            TODAY · SITE 12
          </span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium tracking-[0.04em] text-dmuted">
            <span className="size-1.5 rounded-full bg-signal" />
            LIVE
          </span>
        </div>
        {/* The comp's card (design ref): the triage alone, at reading size.
            Each state carries the demo's own vocabulary and a telemetry dot
            in its meaning: amber for a decision waiting, sky for prepared
            work, teal for handled. The machine rows moved out with the comp;
            what remains is the one number a manager actually opens the day
            with, and the count that says everything else took care of
            itself. */}
        <div className="grid grid-cols-3 divide-x divide-hairline-d border-b border-hairline-d">
          {[
            ["NEEDS YOU", "1", "Action needed", "bg-warn"],
            ["PREPARED", "6", "Ready for action", "bg-accent-hi"],
            ["HANDLED", "14", "Completed today", "bg-signal"],
          ].map(([k, v, sub, tone]) => (
            <div key={k} className="px-3.5 py-3">
              <span className="block text-[13px] font-medium tracking-[0.06em] text-dfaint">
                {k}
              </span>
              <span className="mt-1 block font-display text-[22px] font-semibold leading-none text-dfg tabular-nums">
                {v}
              </span>
              <span className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium tracking-[0.02em] text-dmuted">
                <span aria-hidden className={`size-1 shrink-0 rounded-full ${tone}`} />
                {sub}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-3.5 py-2">
          <span className="text-[13px] font-medium tracking-[0.04em] text-accent-hi">
            View all
          </span>
          <span className="text-[13px] font-medium tracking-[0.04em] text-dmuted tabular-nums">
            21 total
          </span>
        </div>
        {/* Says what it is. A visitor has no other way to know these values
            are illustrative, and the demo further down the page already
            carries the same disclaimer — the hero should not be the one
            surface that leaves it ambiguous. */}
        <div className="border-t border-hairline-d bg-ink-950/40 px-3.5 py-1.5">
          <span className="text-[13px] font-medium tracking-[0.06em] text-dfaint/80">
            SAMPLE DATA, NOT A LIVE FLEET
          </span>
        </div>
      </div>
    </div>
  );
}
