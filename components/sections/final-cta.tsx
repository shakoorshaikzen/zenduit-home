import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TopoTexture } from "@/components/ui/topo-texture";

/** Dark panel bookending the hero — same texture + the second (and last) gradient accent. */
export function FinalCta() {
  return (
    <section className="bg-paper pb-24 lg:pb-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-lg bg-ink-900 px-8 py-16 text-center lg:px-14 lg:py-24">
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

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance font-display text-display font-semibold text-dfg">
              Track smarter, not harder
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-[1.0625rem] leading-relaxed text-dmuted">
              See your whole operation in one live dashboard. Walk through it
              with a fleet specialist, on your own routes and vehicles.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button size="lg" href="#demo">
                Get a Demo
              </Button>
              <Button size="lg" variant="ghostDark" href="#pricing">
                Check Our Prices
              </Button>
            </div>
          </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
