import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ZenduOneDemo } from "@/components/vignettes/zenduone";

/*
 * The platform story, shown instead of told: a working miniature of
 * ZenduONE the visitor can drive, then the ecosystem it runs on. No specs —
 * the console is the argument.
 *
 * That ecosystem note used to be one paragraph making three claims in a
 * single breath. Separated, each is its own reason to keep what you already
 * own, and the panel matches the hairline-divided grammar DESIGN.md sets
 * for a feature group.
 */
const ECOSYSTEM = [
  {
    term: "Open Geotab ecosystem",
    detail:
      "ZenduONE runs on the platform your hardware already speaks, so nothing gets ripped out to get started.",
  },
  {
    term: "ZenduConnect",
    detail:
      "Brings the devices and data you already run into one place, whoever supplied them.",
  },
  {
    term: "Wired by our team",
    detail:
      "Configured to how your operation actually works, and yours to leave with. Nothing is locked in.",
  },
];

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
          <p className="mt-3 text-right text-[13px] text-faint">
            Sample data, not a live fleet
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 overflow-hidden rounded-lg border border-hairline-l bg-card">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-hairline-l bg-paper-raised px-6 py-3.5">
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-faint">
              Runs on what you already have
            </p>
            <a
              href="https://zenduit.com/products/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
            >
              Explore the full platform
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
            </a>
          </div>
          <dl className="grid divide-y divide-hairline-l sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {ECOSYSTEM.map((item) => (
              <div key={item.term} className="p-6">
                <dt className="text-[0.9375rem] font-semibold text-fg">
                  {item.term}
                </dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
