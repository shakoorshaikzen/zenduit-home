"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-ink-950">
      <div className="mx-auto flex max-w-[75rem] items-center justify-center px-12 py-2.5">
        <a
          href="https://zenduit.com/solutions/eld-compliance-software/"
          className="group inline-flex items-center gap-2.5 rounded-sm font-mono text-xs tracking-[0.02em] text-dmuted transition-colors hover:text-dfg"
        >
          <span className="text-xs tracking-[0.08em] text-accent-hi">NEW</span>
          ZenduELD is here: hours-of-service compliance, built in
          <ArrowRight
            size={12}
            strokeWidth={1.5}
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          />
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm p-1.5 text-dfaint transition-colors hover:text-dfg"
        >
          <X size={13} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
