import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * [PLACEHOLDER — replace with real quotes] All quotes and metric callouts
 * below are realistic drafts written for layout; swap in verified customer
 * quotes and audited figures.
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

export function Testimonials() {
  return (
    <section className="bg-paper pb-24 lg:pb-28">
      <Container>
        <Reveal>
          <SectionHeading title="Run by people who run fleets" />
        </Reveal>

        <div className="mt-12">
          {/* Featured quote with metric callout (Samsara customer-story pattern) */}
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
            <figure>
              <blockquote className="max-w-2xl text-balance font-display text-title-lg font-medium leading-[1.35] text-fg">
                {FEATURED.quote}
              </blockquote>
              <figcaption className="mt-5 font-mono text-xs text-muted">
                {FEATURED.name}
                <span className="text-faint"> · {FEATURED.role}</span>
              </figcaption>
            </figure>
            <div className="lg:border-l lg:border-hairline-l lg:pl-10">
              <CountUp
                prefix="-"
                end={31}
                suffix="%"
                className="font-mono text-stat font-medium text-fg tabular-nums"
              />
              <p className="mt-2 max-w-[180px] text-sm leading-relaxed text-muted">
                {FEATURED.metricLabel}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-12 grid gap-5 sm:grid-cols-2">
            {QUOTES.map((q) => (
              <Card key={q.name} className="p-6 lg:p-7">
                <figure>
                  <blockquote className="text-[0.9375rem] leading-relaxed text-fg/85">
                    {q.quote}
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-xs text-muted">
                    {q.name}
                    <span className="text-faint"> · {q.role}</span>
                  </figcaption>
                </figure>
                <div className="mt-5 flex items-baseline gap-3 border-t border-hairline-l pt-4">
                  <span className="font-mono text-lg font-medium text-fg tabular-nums">
                    {q.metric}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.05em] text-faint">
                    {q.metricLabel}
                  </span>
                </div>
              </Card>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
