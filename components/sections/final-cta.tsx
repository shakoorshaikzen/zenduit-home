import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TopoTexture } from "@/components/ui/topo-texture";

/** Dark panel bookending the hero — same texture + the second (and last) gradient accent. */
export function FinalCta() {
  return (
    <section id="demo" className="bg-paper pb-24 lg:pb-28">
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
                Book a demo
              </Button>
              <Button size="lg" variant="ghostDark" href="https://zenduit.com/contact/">
                Get an operations diagnostic
              </Button>
            </div>
            <a
              href="#solutions"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.08em] text-dfaint underline-offset-4 transition-colors hover:text-dmuted hover:underline"
            >
              OR EXPLORE THE SOLUTIONS FIRST
              <ArrowUp size={13} strokeWidth={1.5} aria-hidden />
            </a>
          </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
