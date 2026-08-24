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
 * The ecosystem note is three named claims, one line each — the shortest
 * form that still says why you keep what you already own.
 */
const ECOSYSTEM = [
  { term: "Open Geotab ecosystem", detail: "Nothing to rip out." },
  { term: "ZenduConnect", detail: "Your devices, whoever supplied them." },
  { term: "Wired by our team", detail: "Nothing locked in." },
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

        <Reveal delay={0.12} className="mt-10">
          <dl className="grid divide-y divide-hairline-l overflow-hidden rounded-lg border border-hairline-l bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {ECOSYSTEM.map((item) => (
              <div key={item.term} className="px-6 py-5">
                <dt className="text-[0.9375rem] font-semibold text-fg">
                  {item.term}
                </dt>
                <dd className="mt-1 text-[13px] text-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
          <a
            href="https://zenduit.com/products/"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            Explore the full platform
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
