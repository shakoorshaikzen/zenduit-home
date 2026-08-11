"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Stat count-up on first view (Ramp vocabulary); instant final value under reduced motion. */
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
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reduced motion: final values immediately, no in-view gating.
    if (reduce) {
      setValue(end);
      return;
    }
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, end]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
