"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * Industries as scrollytelling — the page's one authored scroll moment.
 * Four featured industries scroll past a pinned stage; each step swaps the
 * stage to that industry's real zenduit.com photograph with a telemetry
 * chip carrying its playbook. The remaining ten index below in one line
 * each, and every entry links to its own page.
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

/*
 * The four Zenduit serves at the greatest scale, evidenced three ways: their
 * own footer industry order (Construction, Transportation & Logistics,
 * Utilities & Field Services lead it), the named customers on their logo
 * strip (Aecon, Speedy, San Antonio Water System), and their published case
 * studies (Labatt and Velocity Rail in logistics, Keystone ClearWater in
 * field operations, and Sharpsmart — the story their success-stories page
 * leads with — in waste). Everything else is one line in the index below,
 * which still links to its own page.
 */
const FEATURED: Industry[] = [
  {
    img: "construction",
    name: "Construction",
    tag: "EVERY MACHINE · EVERY SITE",
    prop: "Know which machine is on which site, who is running it, and what it cost you to get there.",
    href: "https://zenduit.com/industries/construction-fleet-management/",
  },
  {
    img: "transportation-logistics",
    name: "Transportation & Logistics",
    tag: "THE LOAD ARRIVES OR IT DOES NOT",
    prop: "Live ETAs, hours-of-service and route history in one screen, so a late load is a decision rather than a surprise.",
    href: "https://zenduit.com/industries/transportation-logistic-fleet-management/",
  },
  {
    img: "utilities-field-services",
    name: "Utilities & Field Services",
    tag: "CLOSEST CREW · PROVEN JOB",
    prop: "Dispatch the nearest qualified crew, then prove the work was done with the record already attached.",
    href: "https://zenduit.com/industries/utility-fleet-management/",
  },
  {
    img: "waste-management",
    name: "Waste & Recycling",
    tag: "PROTECT THE ROUTE · PROTECT THE MARGIN",
    prop: "Missed pickups, contamination and unbilled events surface with the evidence attached, while you can still act on them.",
    href: "https://zenduit.com/industries/waste-management-fleet-software/",
  },
];

/* The rest of the book, one line each. Order follows Zenduit's own footer,
   with the two newest offers first so they are not buried. */
const REST: Industry[] = [
  { img: "healthcare-indoor", name: "Hospitals & Senior Care", tag: "INDOOR TRACKING · ZENCARE", prop: "", href: "https://zenducare-landing.vercel.app/" },
  { img: "public-school-transportation", name: "Passenger Transport", tag: "ON TIME IS A SYSTEM", prop: "", href: "https://zenduit.com/industries/public-school-transportation-fleet-management/" },
  { img: "airports", name: "Airside & GSE", tag: "RIGHT EQUIPMENT · RIGHT NOW", prop: "", href: "https://zenduit.com/industries/airports-security-fleet-management/" },
  { img: "government", name: "Government", tag: "PUBLIC AUDIT TRAIL", prop: "", href: "https://zenduit.com/industries/" },
  { img: "public-work-winter-ops", name: "Public Works & Winter Ops", tag: "PLOW + SALT PROOF", prop: "", href: "https://zenduit.com/industries/public-works-winter-ops/" },
  { img: "rental-leasing", name: "Rental & Leasing", tag: "UTILIZATION BILLING", prop: "", href: "https://zenduit.com/industries/rental-fleet-management/" },
  { img: "healthcare-emergency", name: "Emergency Response Fleets", tag: "COLD CHAIN · RESPONSE", prop: "", href: "https://zenduit.com/industries/healthcare-emergency-fleet-solutions/" },
  { img: "forestry", name: "Forestry", tag: "OFF-GRID TRACKING", prop: "", href: "https://zenduit.com/industries/" },
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
            lede="Every industry runs a different operation. The playbook changes with it."
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
                  <p className="mt-1 text-[13px] font-medium tracking-[0.08em] text-dfaint">
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
                      "mt-2 text-[13px] font-medium tracking-[0.08em] transition-colors duration-300",
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
                    className={cx(
                      "absolute inset-0 h-full w-full object-cover",
                      ind.img === "healthcare-indoor"
                        ? "object-center"
                        : "object-[center_65%]",
                    )}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950/80 to-transparent" />
                  <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-[6px] border border-hairline-d bg-ink-950/85 px-3 py-2 text-[13px] font-medium tracking-[0.08em] text-dmuted backdrop-blur-sm">
                    <span aria-hidden className="size-1.5 rounded-full bg-signal" />
                    {ind.tag}
                  </span>
                  <span className="absolute bottom-5 right-5 text-[13px] font-medium tracking-[0.08em] text-dfg/80">
                    {String(active + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The other ten, one line each — every industry has a page. The
            gap-px grid draws its own hairlines, so two rows divide cleanly
            where divide-x/y would only have worked for a single row. */}
        <Reveal className="mt-16 overflow-hidden rounded-lg border border-hairline-d bg-hairline-d">
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-5">
            {REST.map((ind) => (
              <li key={ind.name}>
                <a
                  href={ind.href}
                  className="group flex h-full flex-col justify-between gap-4 bg-ink-900 p-4 transition-colors hover:bg-ink-850"
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
