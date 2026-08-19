import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ZenduOneDemo } from "@/components/vignettes/zenduone";

/*
 * The platform story, shown instead of told: a working miniature of
 * ZenduONE the visitor can drive, framed by one conceptual line about the
 * ecosystem it runs on. No specs — the console is the argument.
 */
export function PlatformStory() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="ZenduONE, before the demo call"
            lede="A working miniature of the real console. Drive the live map, replay a trip, review a coaching clip, and check the maintenance queue."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ZenduOneDemo />
          <p className="mt-3 text-right font-mono text-xs tracking-[0.08em] text-faint">
            SYNTHETIC DEMO DATA · NOT A LIVE FLEET
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-lg border border-hairline-l bg-paper-raised px-7 py-6">
          <p className="max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-muted">
            ZenduONE runs on the open Geotab ecosystem. ZenduConnect brings
            your hardware and data in, and our team wires it to how you run.
            Nothing to rip out, nothing locked in.
          </p>
          <a
            href="https://zenduit.com/products/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            Explore the full platform
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
