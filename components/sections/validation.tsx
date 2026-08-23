import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * Customer validation in one band: featured quote with its metric, two
 * supporting voices, and the path to full case studies. Customer logos stay
 * in the hero's in-fold strip (the Samsara placement) rather than repeating.
 *
 * [PLACEHOLDER — replace with real quotes] Quotes and metric callouts are
 * realistic drafts written for layout; swap in verified customer quotes and
 * audited figures when marketing delivers them.
 */

const FEATURED = {
  quote:
    "“We went from finding out about problems on Monday to seeing them the moment they happen. The idling alerts alone paid for the system in a quarter.”",
  name: "Elma A.",
  role: "Fleet Supervisor",
  metric: "-31%",
  metricLabel: "safety incidents in year one",
};

const QUOTES = [
  {
    quote:
      "“One login instead of five. My dispatchers stopped juggling tabs, and our on-time percentage shows it.”",
    name: "Michael H.",
    role: "Operations Director",
    metric: "5 tools → 1",
    metricLabel: "platform consolidation",
  },
  {
    quote:
      "“The dash cams changed our safety meetings. We coach with the actual clip now, not with hearsay.”",
    name: "Transportation PH",
    role: "Fleet Operator",
    metric: "+11%",
    metricLabel: "on-time deliveries",
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
                {FEATURED.name}
                <span className="text-faint"> · {FEATURED.role}</span>
              </figcaption>
            </figure>
            <div className="lg:border-l lg:border-hairline-l lg:pl-10">
              <CountUp
                prefix="-"
                end={31}
                suffix="%"
                className="font-display text-stat font-bold text-accent tabular-nums"
              />
              <p className="mt-2 max-w-[180px] text-sm leading-relaxed text-muted">
                {FEATURED.metricLabel}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUOTES.map((q) => (
              <Card key={q.name} className="p-6 lg:p-7">
                <figure>
                  <blockquote className="text-[0.9375rem] leading-relaxed text-fg/85">
                    {q.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-xs font-medium text-muted">
                    {q.name}
                    <span className="text-faint"> · {q.role}</span>
                  </figcaption>
                </figure>
                <div className="mt-5 flex items-baseline gap-3 border-t border-hairline-l pt-4">
                  <span className="text-lg font-semibold font-medium text-fg tabular-nums">
                    {q.metric}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.05em] text-faint">
                    {q.metricLabel}
                  </span>
                </div>
              </Card>
            ))}

            {/* The path to the full stories — Zenduit's real case-study library */}
            <a
              href="https://zenduit.com/success-stories"
              className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-hairline-l bg-ink-900 p-6 transition-colors duration-200 hover:border-ink-600 lg:p-7"
            >
              <div>
                <p className="text-[13px] font-medium tracking-[0.08em] text-dfaint">
                  CUSTOMER STORIES
                </p>
                <p className="mt-3 text-balance font-display text-lg font-semibold leading-snug text-dfg">
                  How real fleets run on Zenduit, in their own numbers.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-hi">
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
