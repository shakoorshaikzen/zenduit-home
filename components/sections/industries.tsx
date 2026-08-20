"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * Industries as scrollytelling — the page's one authored scroll moment.
 * Six featured industries scroll past a pinned stage; each step swaps the
 * stage to that industry's real zenduit.com photograph with a telemetry
 * chip carrying its playbook. All thirteen industries index below, linking
 * to Zenduit's real industry pages.
 *
 * Under reduced motion the crossfade collapses to an instant swap (global
 * override); the interaction itself is scroll-driven, so nothing autoplays.
 */

type Industry = {
  img: string;
  name: string;
  tag: string;
  prop: string;
  href: string;
};

const FEATURED: Industry[] = [
  {
    img: "waste-management",
    name: "Waste & Recycling",
    tag: "PROTECT THE ROUTE · PROTECT THE MARGIN",
    prop: "Missed pickups, contamination and unbilled events surface with the evidence attached, while you can still act on them.",
    href: "https://zenduit.com/industries/waste-management-fleet-software/",
  },
  {
    img: "public-school-transportation",
    name: "Passenger Transport",
    tag: "ON TIME IS A SYSTEM",
    prop: "Driver readiness, vehicle readiness and routing coordinated before the run, so every rider is accounted for.",
    href: "https://zenduit.com/industries/public-school-transportation-fleet-management/",
  },
  {
    img: "airports",
    name: "Airside & GSE",
    tag: "RIGHT EQUIPMENT · RIGHT OPERATOR · RIGHT NOW",
    prop: "Serviceable equipment and qualified operators matched to the turnaround before the clock becomes the problem.",
    href: "https://zenduit.com/industries/airports-security-fleet-management/",
  },
  {
    img: "construction",
    name: "Construction",
    tag: "GEOFENCES · THEFT RECOVERY",
    prop: "Know where every machine is, and who is on it, across every site.",
    href: "https://zenduit.com/industries/construction-fleet-management/",
  },
  {
    img: "transportation-logistics",
    name: "Transportation & Logistics",
    tag: "LIVE ETA · HOS",
    prop: "Live ETAs, route history, and hours-of-service in one screen.",
    href: "https://zenduit.com/industries/transportation-logistic-fleet-management/",
  },
  {
    img: "government",
    name: "Government",
    tag: "PUBLIC AUDIT TRAIL",
    prop: "Fleet accountability and reporting built for public scrutiny.",
    href: "https://zenduit.com/industries/",
  },

];

const REST: Industry[] = [
  { img: "utilities-field-services", name: "Utilities & Field Services", tag: "CLOSEST-CREW DISPATCH", prop: "", href: "https://zenduit.com/industries/utility-fleet-management/" },
  { img: "forestry", name: "Forestry", tag: "OFF-GRID TRACKING", prop: "", href: "https://zenduit.com/industries/" },
  { img: "rental-leasing", name: "Rental & Leasing", tag: "UTILIZATION BILLING", prop: "", href: "https://zenduit.com/industries/rental-fleet-management/" },
  { img: "public-work-winter-ops", name: "Public Works & Winter Ops", tag: "PLOW + SALT PROOF", prop: "", href: "https://zenduit.com/industries/public-works-winter-ops/" },
  { img: "healthcare-emergency", name: "Healthcare & Emergency", tag: "COLD CHAIN · RESPONSE", prop: "", href: "https://zenduit.com/industries/healthcare-emergency-fleet-solutions/" },
  { img: "agriculture", name: "Agriculture", tag: "SEASON READINESS", prop: "", href: "https://zenduit.com/industries/agriculture-fleet-management/" },
  { img: "food-pharma", name: "Food & Pharmaceutical", tag: "TEMP-VERIFIED DELIVERY", prop: "", href: "https://zenduit.com/industries/food-pharma-fleet-management/" },
];

export function Industries() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = FEATURED[active];

  return (
    <section className="bg-ink-900 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            tone="dark"
            title="Built for how your fleet actually works"
            lede="Thirteen industries run on Zenduit, each with its own playbook."
          />
        </Reveal>
      </Container>

      {/* Mobile: compact scannable cards, every industry linked */}
      <Container className="lg:hidden">
        <ul className="mt-10 space-y-3">
          {[...FEATURED, ...REST].map((ind) => (
            <li key={ind.name}>
              <a
                href={ind.href}
                className="flex gap-4 overflow-hidden rounded-md border border-hairline-d bg-ink-850 transition-colors hover:border-dfg/25"
              >
                <img
                  src={`/industries/${ind.img}.webp`}
                  alt=""
                  loading="lazy"
                  className="h-auto w-28 shrink-0 object-cover"
                />
                <div className="min-w-0 py-3 pr-4">
                  <h3 className="text-sm font-semibold leading-snug text-dfg">
                    {ind.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs tracking-[0.05em] text-dfaint">
                    {ind.tag}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      {/* Desktop: pinned stage + scrolling industry stories */}
      <Container className="hidden lg:block">
        <div className="mt-14 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-14">
          {/* Scroll steps, metered by a minimal vertical progress rail */}
          <div className="relative pl-10">
            <div
              aria-hidden
              className="absolute bottom-[26vh] left-0 top-[26vh] w-px bg-hairline-d"
            >
              <span
                className="absolute left-0 top-0 block w-px bg-accent transition-[height] duration-500 ease-out"
                style={{ height: `${(active / (FEATURED.length - 1)) * 100}%` }}
              />
              <span
                className="absolute left-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[top] duration-500 ease-out"
                style={{ top: `${(active / (FEATURED.length - 1)) * 100}%` }}
              />
            </div>
            {FEATURED.map((ind, i) => (
              <div
                key={ind.name}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex min-h-[52vh] items-center"
              >
                <div>
                  <h3
                    className={cx(
                      "text-balance font-display text-title-lg font-semibold transition-colors duration-300",
                      i === active ? "text-dfg" : "text-dfaint",
                    )}
                  >
                    {ind.name}
                  </h3>
                  <p
                    className={cx(
                      "mt-2 font-mono text-xs tracking-[0.08em] transition-colors duration-300",
                      i === active ? "text-signal" : "text-dfaint",
                    )}
                  >
                    {ind.tag}
                  </p>
                  <p
                    className={cx(
                      "mt-3 max-w-sm text-pretty text-[0.9375rem] leading-relaxed transition-colors duration-300",
                      i === active ? "text-dmuted" : "text-dfaint/60",
                    )}
                  >
                    {ind.prop}
                  </p>
                  <a
                    href={ind.href}
                    tabIndex={i === active ? 0 : -1}
                    className={cx(
                      "mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-hi underline-offset-4 transition-opacity duration-300 hover:underline",
                      i === active ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                  >
                    See the {ind.name.split(" ")[0].toLowerCase()} playbook
                    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pinned stage */}
          <div className="relative">
            <div className="sticky top-[16vh] h-[64vh] overflow-hidden rounded-lg border border-hairline-d">
              {FEATURED.map((ind, i) => (
                <div
                  key={ind.name}
                  aria-hidden={i !== active}
                  className={cx(
                    "absolute inset-0 transition-opacity duration-500",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <img
                    src={`/industries/${ind.img}.webp`}
                    alt={ind.name}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover object-[center_65%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950/80 to-transparent" />
                  <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-[6px] border border-hairline-d bg-ink-950/85 px-3 py-2 font-mono text-xs tracking-[0.05em] text-dmuted backdrop-blur-sm">
                    <span aria-hidden className="size-1.5 rounded-full bg-signal" />
                    {ind.tag}
                  </span>
                  <span className="absolute bottom-5 right-5 font-mono text-xs tracking-[0.08em] text-dfg/80">
                    {String(active + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The other seven, one line each — every industry has a page */}
        <Reveal className="mt-16 overflow-hidden rounded-lg border border-hairline-d">
          <ul className="grid divide-y divide-hairline-d sm:grid-cols-2 sm:divide-x lg:grid-cols-7 lg:divide-y-0">
            {REST.map((ind) => (
              <li key={ind.name}>
                <a
                  href={ind.href}
                  className="group flex h-full flex-col justify-between gap-4 bg-ink-850/40 p-4 transition-colors hover:bg-ink-850"
                >
                  <span className="text-[13px] font-semibold leading-snug text-dmuted transition-colors group-hover:text-dfg">
                    {ind.name}
                  </span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-dfaint transition-colors group-hover:text-accent-hi"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
