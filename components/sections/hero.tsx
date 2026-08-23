import { cx } from "@/lib/cx";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FleetScene } from "@/components/vignettes/fleet-scene";

/*
 * Clients verified against zenduit.com's own customer carousel (2026-08-05).
 * Logos are their published files, rendered monochrome for the dark ground.
 * Do not add a name here that is not on their site.
 */
/* Their original full-color marks (zenduit.b-cdn.net), re-graded for the
   navy ground: near-black elements lifted to off-white, brand colors kept
   and brightened. Heights are tuned per mark so the row sits evenly:
   optical balance, not uniform pixels. */
const CLIENTS = [
  { file: "emirates", name: "Emirates", h: "h-9" },
  { file: "oregon-department-of-transportation", name: "Oregon Department of Transportation", h: "h-8" },
  { file: "city-of-columbus", name: "City of Columbus", h: "h-7" },
  { file: "san-antonio-water-system", name: "San Antonio Water System", h: "h-10" },
  { file: "aecon", name: "Aecon", h: "h-5" },
  { file: "tolko", name: "Tolko", h: "h-5" },
  { file: "speedy", name: "Speedy", h: "h-6" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <FleetScene />

      <Container className="relative">
        <div className="pb-20 pt-20 lg:min-h-[600px] lg:pb-28 lg:pt-28">
          <Reveal>
            <h1 className="max-w-[45rem] font-display text-hero font-bold text-dfg">
              <span className="block text-balance">Your entire fleet.</span>
              <span className="block text-balance">From signal to done.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-dfg/80">
              ZenduONE connects your vehicles, systems and people to surface
              what matters, coordinate the response and measure the result.
            </p>
            <p className="mt-5 text-[13px] font-medium tracking-[0.08em] text-dfaint">
              SEE · UNDERSTAND · ACT · MEASURE · IMPROVE
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" href="#how-it-works">
                See how it works
              </Button>
              <Button size="lg" variant="ghostDark" href="https://zenduit.com/contact/">
                Book an operations review
              </Button>
            </div>
          </Reveal>
        </div>

        {/* In-fold proof: real customers, their own logos. */}
        <Reveal delay={0.24}>
          <div className="border-t border-hairline-d pb-10 pt-8">
            <p className="text-[13px] font-medium tracking-[0.08em] text-dfaint">
              TRUSTED BY FLEETS AT
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6 lg:gap-x-12">
              {CLIENTS.map((c) => (
                <li key={c.file}>
                  <img
                    src={`/clients/dark/${c.file}.webp`}
                    alt={c.name}
                    loading="lazy"
                    className={cx("w-auto opacity-90 transition-opacity duration-200 hover:opacity-100", c.h)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
