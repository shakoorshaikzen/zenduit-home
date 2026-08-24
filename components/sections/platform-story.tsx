import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ZenduOneDemo } from "@/components/vignettes/zenduone";

/*
 * The platform story, shown instead of told: a working miniature of
 * ZenduONE the visitor can drive. No specs, no claims alongside it — the
 * console is the argument, and the only things under it are the way out to
 * the full platform and the note that this data is synthetic.
 */
export function PlatformStory() {
  return (
    <section id="how-it-works" className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="ZenduONE, before the demo call"
            lede="A working miniature of the real console. Start in Today, where the operation is reduced to what matters, then drive the map, review a coaching clip and check maintenance."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ZenduOneDemo />
          {/* One row under the console: the way onward, and the disclosure. */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <a
              href="https://zenduit.com/products/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
            >
              Explore the full platform
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
            </a>
            <p className="text-[13px] text-faint">
              Sample data, not a live fleet
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
