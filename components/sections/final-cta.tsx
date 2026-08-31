import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TopoTexture } from "@/components/ui/topo-texture";

/*
 * Dark panel bookending the hero — same texture + the second (and last)
 * gradient accent.
 *
 * The heading is the locked executive line and the offer is the one the
 * strategy names as the first GTM motion, so neither moves. What changed is
 * the count: this panel used to run "Book a demo" against "Get an operations
 * diagnostic", which reads as two offers when it is one, and undercuts the
 * whole diagnose-before-demo sequence by putting the demo first. One primary
 * label now appears identically in the nav, the hero and here.
 *
 * The three steps under it exist because a consultative offer nobody can
 * picture converts worse than the same offer explained. Each step is a real
 * commitment out of the sales motion — structured assessment, findings and a
 * priority map, then a bounded pilot with a baseline and a decision gate.
 */

const STEPS = [
  { step: "01", title: "A working session", body: "We walk your operation and find where work falls between systems." },
  { step: "02", title: "Findings, ranked", body: "The leaks in order of what they cost, with the baseline written down." },
  { step: "03", title: "One bounded pilot", body: "Fixed scope, one metric, 30 to 60 days, then a decision." },
];

export function FinalCta() {
  return (
    <section id="demo" className="bg-paper pb-24 lg:pb-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-lg bg-ink-900 px-8 pb-14 pt-16 text-center lg:px-14 lg:pb-16 lg:pt-24">
          <TopoTexture opacity={0.7} />
          {/* Signature brand gradient — use 2 of 2. Same linear top wash as the hero. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[260px] bg-[linear-gradient(180deg,rgb(92_179_248/0.08),transparent)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgb(92_179_248/0.4),transparent)]"
          />

          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-balance font-display text-hero font-bold text-dfg">
              Grow without growing complexity
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-[1.0625rem] leading-relaxed text-dmuted">
              Start with an Operations Diagnostic: a fleet specialist maps
              where your operation leaks time, money or service, on your own
              routes and vehicles.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" href="https://zenduit.com/contact/">
                Get an Operations Diagnostic
              </Button>
              <Button size="lg" variant="ghostDark" href="#how-it-works">
                See how it works
              </Button>
            </div>
          </div>

          {/* What happens next, said in three lines. A consultative offer
              nobody can picture converts worse than the same offer explained,
              but this is the closer: it gets a hairline and three short lines,
              not a second content panel. */}
          <div className="relative mx-auto mt-14 grid max-w-3xl gap-8 border-t border-hairline-d pt-10 text-left sm:grid-cols-3 sm:gap-10">
            {STEPS.map((s) => (
              <div key={s.step}>
                <span className="block text-[13px] font-medium tracking-[0.08em] text-dfaint tabular-nums">
                  {s.step}
                </span>
                <h3 className="mt-2.5 font-display text-title font-semibold text-dfg">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-dmuted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
