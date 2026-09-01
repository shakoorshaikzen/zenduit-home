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
            {/* The category, named once, where the page starts. It carries
                real information (the umbrella the strategy claims), so it
                clears the eyebrow rule. */}
            <p className="mb-5 text-[13px] font-medium tracking-[0.08em] text-dfaint">
              OPERATIONAL INTELLIGENCE
            </p>
            {/* One headline, both beats (design ref, hero comp): complaint
                and answer share the display size, and `text-balance` keeps
                the four-line rag even at every width. */}
            {/* One step below the display token, and each sentence set as
                its own balanced block so lines break at phrase boundaries
                ("doesn't need more / alerts" was the free-flow rag). The
                comp's contraction is kept deliberately: as two words, the
                balancer splits "does / not" across lines. */}
            <h1 className="max-w-[48rem] font-display text-[clamp(2.5rem,4.4vw,3.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-dfg">
              <span className="block text-balance">
                Your operation doesn&rsquo;t need more alerts.
              </span>
              {/* The answer steps down a size from the complaint, in em so
                  it tracks the headline through every clamp width. */}
              <span className="mt-2 block text-balance text-[0.85em]">
                It needs to know what to do next.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-lg text-pretty text-[1.0625rem] leading-relaxed text-dfg/80">
              ZenduONE connects the systems, people, vehicles and equipment
              behind your operation to surface what matters, coordinate the
              next action and measure the result.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            {/* The diagnostic stays the one primary everywhere; the second
                action names the surface it lands on (design ref, hero comp).
                Both resolve to the same destinations as before. */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" href="https://zenduit.com/contact/">
                Get an Operations Diagnostic
              </Button>
              <Button size="lg" variant="ghostDark" href="#how-it-works">
                See Today in action
              </Button>
            </div>
            {/* The product signature and its mechanism, under the actions in
                the comp's order. "No form" moved to the demo section's own
                lede, where the walkthrough actually is. */}
            <p className="mt-6 text-[13px] font-medium tracking-[0.08em] text-dfaint">
              FROM SIGNAL TO DONE · SEE · UNDERSTAND · ACT · MEASURE · IMPROVE
            </p>
          </Reveal>
        </div>

        {/* In-fold proof: real customers, their own logos, and a path to the
            named results further down so the wall is connected to outcomes
            instead of standing silent. */}
        <Reveal delay={0.24}>
          <div className="border-t border-hairline-d pb-10 pt-8">
            <p className="text-[13px] font-medium tracking-[0.08em] text-dfaint">
              PROVEN IN COMPLEX OPERATIONS
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
            <p className="mt-7 text-center">
              <a
                href="#customer-results"
                className="text-[13px] font-medium tracking-[0.04em] text-dmuted underline-offset-4 transition-colors hover:text-dfg hover:underline"
              >
                Named outcomes and case studies →
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
