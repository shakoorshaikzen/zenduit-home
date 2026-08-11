import {
  ClipboardCheck,
  FileText,
  Fuel,
  Route,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const MODULES = [
  {
    icon: Route,
    name: "Routing & Dispatch",
    copy: "Plan routes and reassign them mid-shift.",
  },
  {
    icon: Wrench,
    name: "Maintenance",
    copy: "From fault code to closed work order.",
  },
  {
    icon: Fuel,
    name: "Fuel Management",
    copy: "Match every fill-up to a card and a tank.",
  },
  {
    icon: ClipboardCheck,
    name: "ZenduELD",
    copy: "Hours-of-service compliance, built in.",
    isNew: true,
  },
  {
    icon: FileText,
    name: "Forms",
    copy: "Digital DVIRs and custom inspections.",
  },
];

/** Compact module rail as a hairline-divided panel (Linear grammar). */
export function ModuleRow() {
  return (
    <section className="bg-paper pt-20 lg:pt-24">
      <Container>
        <Reveal className="overflow-hidden rounded-lg border border-hairline-l bg-card">
          <div className="border-b border-hairline-l px-6 py-3.5 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-faint">
              And the rest of the job
            </p>
          </div>
          <div className="grid divide-y divide-hairline-l sm:grid-cols-2 lg:grid-cols-5 lg:divide-y-0 lg:divide-x">
            {MODULES.map((m) => (
              <div key={m.name} className="p-5 lg:p-6">
                <div className="flex items-center gap-2">
                  <m.icon
                    size={17}
                    strokeWidth={1.5}
                    className="text-muted"
                    aria-hidden
                  />
                  {m.isNew && (
                    <span className="font-mono text-xs tracking-[0.12em] text-accent-deep">NEW</span>
                  )}
                </div>
                <h3 className="mt-3 text-[0.9375rem] font-semibold text-fg">
                  {m.name}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
                  {m.copy}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
