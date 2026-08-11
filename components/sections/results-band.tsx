import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { TopoTexture } from "@/components/ui/topo-texture";

/*
 * Platform facts, each verifiable against zenduit.com: eight products in the
 * platform nav, thirteen industry pages, one login.
 *
 * This band previously carried customer-outcome percentages (fewer incidents,
 * lower fuel cost, hours saved). Those were drafted, not audited, so they were
 * removed. When marketing supplies AUDITED customer metrics, they belong here
 * and should replace these facts.
 */
const FACTS = [
  { end: 8, suffix: "", label: "products in one platform, from GPS tracking to ELD" },
  { end: 13, suffix: "", label: "industries served, each with its own playbook" },
  { end: 1, suffix: "", label: "login for the whole operation" },
];

export function ResultsBand() {
  return (
    <section className="bg-paper py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-lg bg-ink-900 px-8 py-12 lg:px-14 lg:py-16">
            <TopoTexture opacity={0.6} />
            <div className="relative">
              <Eyebrow tone="dark">One system, not five</Eyebrow>
              <ul className="mt-9 grid gap-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-hairline-d">
                {FACTS.map((f) => (
                  <li key={f.label} className="lg:px-10 lg:first:pl-0 lg:last:pr-0">
                    <CountUp
                      end={f.end}
                      suffix={f.suffix}
                      className="block font-mono text-stat font-medium text-dfg tabular-nums"
                    />
                    <span className="mt-3 block max-w-[15rem] text-sm leading-relaxed text-dmuted">
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
