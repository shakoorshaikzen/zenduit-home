import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * The original section, restored, with the one thing that was wrong about it
 * fixed: the proof is now real.
 *
 * It used to run drafted quotes from "Elma A." and "Michael H." with
 * precise-sounding percentages written for layout, which is what the audit
 * failed it on. It did not need a different design. It needed customers.
 *
 * Everything below is published by Zenduit on zenduit.com/success-stories
 * (read 2026-08-31), which settles both halves of the verification gate at
 * once: the companies are named with their own permission, the numbers are
 * already public, and every card links to the story it came from so a buyer
 * can check it. Attribution is by role title, never a named individual.
 *
 * Daniels Sharpsmart is deliberately included: it is the waste operation, and
 * waste is the flagship vertical featured further down the page.
 */

const FEATURED = {
  quote:
    "“The camera solution has been a game-changer. It’s helped us protect against false claims and cut insurance costs significantly.”",
  role: "Fleet Manager",
  company: "Trulite Glass and Aluminum Solutions",
  metric: "40%",
  metricLabel: "fewer false insurance claims, across 500+ vehicles",
  href: "https://zenduit.com/success-stories/transforming-fleet-management-at-trulite-glass-and-aluminum-solutions/",
};

const STORIES = [
  {
    company: "The Barricade Company",
    line: "Safety events down and equipment theft gone, as the fleet scaled.",
    metric: "70%",
    metricLabel: "fewer safety incidents",
    href: "https://zenduit.com/success-stories/barricade-company-scales-safely-reduces-safety-events-by-70-with-gofleets-asset-tracking-and-driver-monitoring/",
  },
  {
    company: "Keystone ClearWater",
    line: "Compliance violations cut, and a month of admin handed back.",
    metric: "50+ hrs",
    metricLabel: "reclaimed every month",
    href: "https://zenduit.com/success-stories/transforming-visibility-and-compliance-a-success-story-from-keystone-clearwater/",
  },
  {
    company: "Daniels Sharpsmart",
    line: "Less idling and calmer driving on a medical waste route.",
    metric: "25%",
    metricLabel: "lower driving risk",
    href: "https://zenduit.com/success-stories/daniels-sharpsmart-canada-limited/",
  },
];

export function Validation() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading title="Run by people who run fleets" />
        </Reveal>

        <div className="mt-12">
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
            <figure>
              <blockquote className="max-w-2xl text-balance font-display text-title-lg font-medium leading-[1.35] text-fg">
                {FEATURED.quote}
              </blockquote>
              <figcaption className="mt-5 text-xs font-medium text-muted">
                {FEATURED.role}
                <span className="text-faint"> · {FEATURED.company}</span>
              </figcaption>
            </figure>
            <div className="lg:border-l lg:border-hairline-l lg:pl-10">
              <span className="block font-display text-stat font-bold text-accent tabular-nums">
                {FEATURED.metric}
              </span>
              <p className="mt-2 max-w-[190px] text-sm leading-relaxed text-muted">
                {FEATURED.metricLabel}
              </p>
              <a
                href={FEATURED.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
              >
                Read the story
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STORIES.map((s) => (
              <a key={s.company} href={s.href} className="group">
                <Card
                  className="flex h-full flex-col justify-between p-6 transition-colors duration-200 group-hover:border-fg/25 lg:p-7"
                >
                  <div>
                    <span className="block font-display text-stat font-bold leading-none text-fg tabular-nums">
                      {s.metric}
                    </span>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {s.metricLabel}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-hairline-l pt-4">
                    <span className="block text-[0.9375rem] font-semibold text-fg">
                      {s.company}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-faint">
                      {s.line}
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </Reveal>

          {/* The rest of the library, on Zenduit's own site */}
          <Reveal delay={0.12} className="mt-5">
            <a
              href="https://zenduit.com/success-stories"
              className="group flex flex-col gap-5 overflow-hidden rounded-md border border-hairline-l bg-ink-900 p-6 transition-colors duration-200 hover:border-ink-600 sm:flex-row sm:items-center sm:justify-between lg:p-7"
            >
              <div>
                <p className="text-[13px] font-medium tracking-[0.08em] text-dfaint">
                  CUSTOMER STORIES
                </p>
                <p className="mt-2 text-balance font-display text-lg font-semibold leading-snug text-dfg">
                  Every story above, in the operator’s own numbers.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-hi">
                Read the case studies
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
