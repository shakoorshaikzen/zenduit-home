import { cx } from "@/lib/cx";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FleetScene } from "@/components/vignettes/fleet-scene";

/*
 * The hero carries the MARKET TENSION, not the product signature.
 *
 * The messaging house assigns "From signal to done" to demos, product pages
 * and event creative; the homepage slot belongs to the tension the whole
 * strategy exists to own — "your people should not have to be the integration
 * layer," expressed in the operator's words as the alert-fatigue line. It is
 * also the only problem-led hero in a category where every competitor now
 * leads with AI or with scale, and it refuses the fleet vocabulary Samsara
 * owns outright.
 *
 * Copy is the strategy doc's own homepage direction (Aug 2026), minus the
 * internal architecture layer: the external simplicity rule says a customer
 * should remember one company idea, one product and one hero experience.
 */

/*
 * Clients verified against zenduit.com's own customer carousel (2026-08-05).
 * Logos are their published files, rendered monochrome for the dark ground.
 * Do not add a name here that is not on their site.
 *
 * NOTE (2026-08-31): publishing a logo on our own carousel is not the same as
 * per-customer naming permission for a campaign page. Marketing owns that
 * gate; if any of these are not permissioned, delete the row — do not soften
 * the label.
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
            {/* Two beats: the complaint, then the turn. The turn is the
                promise, so it gets the second line to itself at title-lg —
                display type stays reserved for the tension. */}
            {/* The two-line break is an authored beat at desktop scale; below
                lg the sentence flows and `text-balance` evens the rag, which
                beats forcing a 23-character line onto a phone. */}
            <h1 className="max-w-[52rem] text-balance font-display text-hero font-bold text-dfg">
              <span className="lg:block">Your operation does not</span>{" "}
              <span className="lg:block">need more alerts.</span>
            </h1>
            <p className="mt-5 max-w-xl text-balance font-display text-title-lg font-medium text-dfg/90">
              It needs to know what to do next.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-lg text-pretty text-[1.0625rem] leading-relaxed text-dfg/80">
              ZenduONE connects the systems, people and equipment behind your
              operation to identify what matters, coordinate the response and
              measure the result.
            </p>
            <p className="mt-5 text-[13px] font-medium tracking-[0.08em] text-dfaint">
              SEE · UNDERSTAND · ACT · MEASURE · IMPROVE
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            {/* Two CTAs, the doc's pair, in the doc's order of priority —
                the same two labels appear at the closer and in the nav. */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" href="https://zenduit.com/contact/">
                Get an Operations Diagnostic
              </Button>
              <Button size="lg" variant="ghostDark" href="#how-it-works">
                See how it works
              </Button>
            </div>
            <p className="mt-4 text-[13px] font-medium tracking-[0.08em] text-dfaint">
              NO FORM · WALK THROUGH IT NOW
            </p>
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
