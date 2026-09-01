import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ZenduOneDemo } from "@/components/vignettes/zenduone";

/*
 * The platform story, shown instead of told: a working miniature of
 * ZenduONE the visitor can drive. No specs, no claims alongside it — the
 * console is the argument. The only thing under it is the note that this
 * data is synthetic; the way onward lives in the console's own status bar.
 *
 * Today is introduced here BY NAME, with its locked line as the heading.
 * It is the signature manager-attention experience in the architecture and
 * the most ownable asset the brand has; treating it as a tab label inside a
 * widget wastes it. The eyebrow carries real information (which product,
 * and where it lives), which is the only kind of eyebrow this system allows.
 *
 * "No form" is said out loud: an ungated walkthrough is a real difference
 * against a field where the demo is a lead-gen gate, and a difference nobody
 * notices is not a difference.
 *
 * No bottom padding: this section shares its background with the one after
 * it, so the seam should read as a single section break rather than two
 * stacked ones. The note's own margin gives it room, and the next section's
 * top padding owns the gap.
 */
export function PlatformStory() {
  return (
    <section id="how-it-works" className="bg-paper pt-20 lg:pt-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Today · inside ZenduONE"
            title="Your operation, reduced to what matters"
            lede="Thousands of signals a day. Today ranks the few that could cost you service, revenue or safety, and brings them with the evidence attached. This is the real console, working. No form, no call."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ZenduOneDemo />
          {/* The product signature lives with the demo, which is where the
              messaging house assigns it. */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[13px] font-medium tracking-[0.08em] text-faint">
              FROM SIGNAL TO DONE
            </p>
            <p className="text-[13px] text-faint">Sample data, not a live fleet</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
