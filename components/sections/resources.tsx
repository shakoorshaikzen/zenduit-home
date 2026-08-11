import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const RESOURCES = [
  {
    type: "WEBINAR",
    title: "One Less Disconnected Tool: ZenduELD is Here",
    copy: "Why ELD belongs inside your telematics platform, and what the switch looks like.",
    cta: "Watch the webinar",
  },
  {
    type: "WEBINAR",
    title: "New Maintenance Module: Same Platform, Faster Path from Fault Code to Fixed",
    copy: "See a fault code become a closed work order without leaving Zenduit.",
    cta: "Watch the webinar",
  },
  {
    type: "BLOG",
    title: "New Product Updates",
    copy: "What shipped this quarter, module by module.",
    cta: "Read the blog",
  },
];

export function Resources() {
  return (
    <section className="bg-paper py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading title="Latest from Zenduit" />
        </Reveal>
        <Reveal delay={0.08} className="mt-12 grid gap-5 md:grid-cols-3">
          {RESOURCES.map((r) => (
            <Card key={r.title} lift className="flex flex-col p-6">
              <span className="font-mono text-xs tracking-[0.08em] text-faint">
                {r.type}
              </span>
              <h3 className="mt-3 text-balance font-display text-[1.125rem] font-semibold leading-snug text-fg">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.copy}</p>
              <a
                href="#"
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
              >
                {r.cta}
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
              </a>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
