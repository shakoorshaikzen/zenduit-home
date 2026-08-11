"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * Industries rail — real industry photography from zenduit.com (their own
 * per-industry hero images), frosted-glass card bodies, and an engineered
 * scroll: arrow controls, live progress bar, position counter. Samsara-grade
 * industry storytelling in the Zenduit system.
 */

const INDUSTRIES = [
  { img: "construction", name: "Construction", tag: "GEOFENCES · THEFT RECOVERY", prop: "Know where every machine is, and who is on it, across every site." },
  { img: "transportation-logistics", name: "Transportation & Logistics", tag: "LIVE ETA · HOS", prop: "Live ETAs, route history, and hours-of-service in one screen." },
  { img: "utilities-field-services", name: "Utilities & Field Services", tag: "CLOSEST-CREW DISPATCH", prop: "Dispatch the closest crew and prove the job was done." },
  { img: "public-school-transportation", name: "Public & School Transportation", tag: "STOP-BY-STOP TIMING", prop: "Every stop on time, every rider accounted for." },
  { img: "forestry", name: "Forestry", tag: "OFF-GRID TRACKING", prop: "Track equipment deep off-road, beyond cell coverage." },
  { img: "waste-management", name: "Waste Management", tag: "PICKUP VERIFICATION", prop: "Verify every pickup and cut missed-bin callbacks." },
  { img: "rental-leasing", name: "Rental & Leasing", tag: "UTILIZATION BILLING", prop: "Utilization, location, and condition for every unit on rent." },
  { img: "public-work-winter-ops", name: "Public Works & Winter Ops", tag: "PLOW + SALT PROOF", prop: "Plow routes, salt usage, and proof-of-service maps." },
  { img: "government", name: "Government", tag: "PUBLIC AUDIT TRAIL", prop: "Fleet accountability and reporting built for public scrutiny." },
  { img: "healthcare-emergency", name: "Healthcare & Emergency Response", tag: "COLD CHAIN · RESPONSE TIME", prop: "Cold chain integrity and response times you can audit." },
  { img: "airports", name: "Airports & Security", tag: "RAMP + RESTRICTED ZONES", prop: "Ground-vehicle visibility across ramps and restricted zones." },
  { img: "agriculture", name: "Agriculture", tag: "SEASON READINESS", prop: "Season-ready equipment, tracked from field to barn." },
  { img: "food-pharma", name: "Food & Pharmaceutical", tag: "TEMP-VERIFIED DELIVERY", prop: "Temperature-verified delivery, documented end to end." },
];

export function Industries() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 scroll position
  const [frac, setFrac] = useState(0.3); // visible fraction
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setFrac(el.clientWidth / el.scrollWidth);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
  }, []);

  useEffect(() => {
    measure();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? (card.getBoundingClientRect().width + 16) * 2 : 600;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-ink-900 py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="dark"
            title="Built for how your fleet actually works"
            lede="Thirteen industries run on Zenduit, each with its own playbook."
          />
          <div className="mb-2 hidden items-center gap-4 md:flex">
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Scroll industries back"
                onClick={() => nudge(-1)}
                disabled={atStart}
                className="grid size-9 cursor-pointer place-items-center rounded-sm border border-hairline-d bg-ink-850/60 text-dmuted backdrop-blur-md transition-colors hover:border-dfg/25 hover:text-dfg disabled:cursor-default disabled:opacity-30 disabled:hover:border-hairline-d disabled:hover:text-dmuted"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Scroll industries forward"
                onClick={() => nudge(1)}
                disabled={atEnd}
                className="grid size-9 cursor-pointer place-items-center rounded-sm border border-hairline-d bg-ink-850/60 text-dmuted backdrop-blur-md transition-colors hover:border-dfg/25 hover:text-dfg disabled:cursor-default disabled:opacity-30 disabled:hover:border-hairline-d disabled:hover:text-dmuted"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Mobile: compact vertical list — no horizontal text bleed, all 13 scannable */}
      <Container className="md:hidden">
        <ul className="mt-8 space-y-3">
          {INDUSTRIES.map((ind) => (
            <li
              key={ind.name}
              className="flex gap-4 overflow-hidden rounded-md border border-hairline-d bg-ink-850"
            >
              <img
                src={`/industries/${ind.img}.webp`}
                alt=""
                loading="lazy"
                className="h-auto w-28 shrink-0 object-cover"
              />
              <div className="min-w-0 py-3 pr-4">
                <h3 className="text-sm font-semibold leading-snug text-dfg">{ind.name}</h3>
                <p className="mt-1 font-mono text-xs tracking-[0.05em] text-dfaint">
                  {ind.tag}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <Reveal delay={0.08} className="hidden md:block">
        <div
          ref={railRef}
          className="mt-12 snap-x snap-mandatory overflow-x-auto [scroll-padding-left:max(1.25rem,calc((100vw-75rem)/2+2rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex w-max gap-4 px-[max(1.25rem,calc((100vw-75rem)/2+2rem))]">
            {INDUSTRIES.map((ind) => (
              <li key={ind.name} className="snap-start">
                <div className="group w-72 overflow-hidden rounded-md border border-hairline-d bg-ink-850 transition-colors duration-200 hover:border-dfg/25">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={`/industries/${ind.img}.webp`}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="border-t border-hairline-d px-5 pb-5 pt-4">
                    <p className="font-mono text-xs tracking-[0.05em] text-dfaint">
                      {ind.tag}
                    </p>
                    <h3 className="mt-2 text-[0.9375rem] font-semibold leading-snug text-dfg">
                      {ind.name}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-dmuted">
                      {ind.prop}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* live scroll progress */}
      <Container>
        <div className="relative mt-10 hidden h-px w-full bg-hairline-d md:block">
          <div
            className="absolute -top-px h-[3px] rounded-full bg-accent transition-[left] duration-75"
            style={{
              width: `${Math.max(6, frac * 100)}%`,
              left: `${progress * (100 - Math.max(6, frac * 100))}%`,
            }}
          />
        </div>
      </Container>
    </section>
  );
}
