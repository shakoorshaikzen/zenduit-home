import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ZenduOneDemo } from "@/components/vignettes/zenduone";

/*
 * The platform story, shown instead of told: a working miniature of
 * ZenduONE the visitor can drive. No specs, no claims alongside it — the
 * console is the argument. The only thing under it is the note that this
 * data is synthetic; the way onward lives in the console's own status bar.
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
          <p className="mt-4 text-right text-[13px] text-faint">
            Sample data, not a live fleet
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
