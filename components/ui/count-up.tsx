"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Stat count-up (Ramp vocabulary), built so the FINAL VALUE IS THE DEFAULT.
 *
 * The rule: the number rendered in markup is always the real one. Server
 * render, hydration, reduced motion, a failed observer, a stalled animation
 * frame — every one of those paths shows the true figure. The count-up is a
 * progressive enhancement layered on top, never the thing that produces the
 * value. (Rendering 0 until an animation fires is how a page whose thesis is
 * reliability ends up printing "0M+" to a buyer.)
 *
 * The animation also only runs for stats that ENTER the viewport after mount.
 * Anything already on screen when the page loads keeps its final value rather
 * than snapping back to zero to count up again.
 */
export function CountUp({
  end,
  prefix = "",
  suffix = "",
  className,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  /* null = "show the real value"; a number only while an animation is running. */
  const [animated, setAnimated] = useState<number | null>(null);
  const eligible = useRef(false);

  useEffect(() => {
    if (reduce) return; // final value stands
    if (!inView) {
      // Off screen at mount → this one has a count-up to earn.
      eligible.current = true;
      return;
    }
    if (!eligible.current) return; // was already visible: no snap-back to 0
    setAnimated(0);
    const controls = animate(0, end, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setAnimated(Math.round(v)),
      onComplete: () => setAnimated(null),
    });
    return () => {
      controls.stop();
      setAnimated(null);
    };
  }, [inView, reduce, end]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {animated ?? end}
      {suffix}
    </span>
  );
}
