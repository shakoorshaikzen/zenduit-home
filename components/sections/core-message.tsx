import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { TopoTexture } from "@/components/ui/topo-texture";

/*
 * The core message, said once and said large: the Monday insight as a
 * declarative headline, then four numbers that are all real — counted on
 * zenduit.com's own pages or stated on geotab.com — with their provenance
 * printed underneath, the way this system labels every stat. Counters
 * animate on first view (CountUp resolves instantly under reduced motion).
 */

const STATS = [
  {
    end: 6,
    suffix: "M+",
    label: "Vehicles & assets",
    sub: "on the open Geotab ecosystem Zenduit builds on",
    source: "GEOTAB.COM",
  },
  {
    end: 15,
    suffix: "",
    label: "Solutions",
    sub: "from live GPS to ELD, feeding one operating picture",
    source: "ZENDUIT.COM/SOLUTIONS",
  },
  {
    end: 13,
    suffix: "",
    label: "Industries",
    sub: "each running its own playbook",
    source: "ZENDUIT.COM/INDUSTRIES",
  },
  {
    end: 1,
    suffix: "",
    label: "Login",
    sub: "where the next action starts",
    source: "ZENDUONE",
  },
] as const;

export function CoreMessage() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <TopoTexture opacity={0.6} />

      <Container className="relative">
        <Reveal className="max-w-3xl">
          <h2 className="text-balance font-display text-hero font-bold text-dfg">
            Stop finding out on Monday.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-dmuted">
            The idling, the hard brake, the trailer nobody can place. Zenduit
            catches it the moment it happens, assembles the context and moves
            the response to done. Nothing waits for Friday's report.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14 lg:mt-16">
          <div className="grid overflow-hidden rounded-lg border border-hairline-d bg-ink-900/70 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="border-hairline-d p-7 max-lg:[&:nth-child(n+2)]:border-t sm:max-lg:[&:nth-child(2)]:border-t-0 sm:max-lg:[&:nth-child(even)]:border-l lg:border-t-0 lg:p-9 lg:[&:nth-child(n+2)]:border-l"
              >
                <CountUp
                  end={s.end}
                  suffix={s.suffix}
                  className="block font-mono text-stat font-medium text-dfg tabular-nums"
                />
                <span className="mt-3 block font-mono text-xs uppercase tracking-[0.08em] text-dmuted">
                  {s.label}
                </span>
                <span className="mt-2 block max-w-[15rem] text-sm leading-relaxed text-dfaint">
                  {s.sub}
                </span>
                <span className="mt-4 block font-mono text-xs tracking-[0.08em] text-dfaint/70">
                  {s.source}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
