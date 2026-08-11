import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * Zenduit's own framing (Measure · Monitor · Manage, and the three reductions
 * it buys you), set as two editorial lists rather than six identical icon
 * cards. Title left, plain sentence right, hairline between rows.
 */
const GROUPS = [
  {
    label: "Run the day-to-day",
    items: [
      {
        title: "Measure",
        copy: "Cost per kilometre and idle hours, broken out by vehicle instead of averages.",
      },
      {
        title: "Monitor",
        copy: "Every vehicle and asset on one live map, with status that updates in seconds.",
      },
      {
        title: "Manage",
        copy: "Dispatch jobs and close work orders from a single login.",
      },
    ],
  },
  {
    label: "Protect the budget",
    items: [
      {
        title: "Less risk",
        copy: "AI cameras flag risky driving before it becomes a claim.",
      },
      {
        title: "Less complexity",
        copy: "One system replaces the five tabs your dispatchers juggle.",
      },
      {
        title: "Lower costs",
        copy: "Cut idling, fuel theft, and the downtime you did not plan for.",
      },
    ],
  },
];

export function Pillars() {
  return (
    <section className="bg-paper pt-20 lg:pt-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="One platform, six jobs"
            lede="Run the day-to-day and protect the budget: the two halves of every fleet job."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-xs uppercase tracking-[0.05em] text-faint">
                {group.label}
              </p>
              <dl className="mt-5 border-t border-hairline-l">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-1 border-b border-hairline-l py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="font-display text-[1.0625rem] font-semibold text-fg">
                      {item.title}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-muted">
                      {item.copy}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
