import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/* [PLACEHOLDER] — swap category chips for real partner names once marketing confirms
   which integrations may be named publicly (only Geotab is verifiable today). */
const CHIPS = [
  "Geotab Marketplace",
  "OEM telematics feeds",
  "Fuel card imports",
  "TMS & dispatch sync",
  "Maintenance system sync",
  "Open API & webhooks",
];

export function Integrations() {
  return (
    <section className="border-y border-hairline-l bg-paper-raised py-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="text-balance font-display text-title-lg font-semibold text-fg">
            Plays well with what you already run
          </h2>
          <p className="mt-3 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted">
            Zenduit is an open platform: what you already run flows in through
            ZenduConnect and back out through open APIs.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="grid grid-cols-2 gap-3">
          {CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-sm border border-hairline-l bg-card px-4 py-3"
            >
              <span className="font-mono text-xs text-muted">{chip}</span>
            </li>
          ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
