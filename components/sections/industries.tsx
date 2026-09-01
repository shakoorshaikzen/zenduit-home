import {
  AlertTriangle,
  ArrowUpRight,
  Bus,
  Camera,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  FileText,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * Waste first, and visibly first (2026-08-31 redesign concepts, design ref/).
 *
 * The three-step scrollytelling gave waste, passenger and airside equal
 * weight, which is exactly the guardrail the strategy warns about: three
 * simultaneous campaigns produce generic collateral and weak proof. The doc
 * names waste as the proving ground, so waste now gets the full operating
 * model: the locked campaign line as the headline, the real crew photograph,
 * an illustrative workflow showing the hidden operational work behind one
 * completed stop, and the three outcome systems it protects. Passenger and
 * airside keep their locked lines as the next models in the sequence, and
 * every other industry keeps its one-line path in the index.
 *
 * IMAGERY: real operations only, never AI-generated and never a stand-in.
 * The waste photograph is the crew-and-rear-loader frame from zenduit.com's
 * own industry pages. The workflow card overlays it the way the Today card
 * overlays the hero: one piece of product truth over a real scene, labelled
 * illustrative because it is.
 */

/* The chain from one stop to a billable event, in the console's voice. */
const WORKFLOW = [
  { icon: CircleCheck, label: "STOP 1842", value: "SERVICE VERIFIED" },
  { icon: Camera, label: "CONTAMINATION", value: "EVIDENCE ATTACHED" },
  { icon: FileText, label: "CONTRACT RULE", value: "MATCHED" },
  { icon: ChevronRight, label: "NEXT", value: "REVIEW BILLABLE EVENT" },
];

/* The outcome systems the waste operating model protects. */
const OUTCOMES = [
  {
    icon: ShieldCheck,
    name: "Proof of service",
    line: "Every stop verified, with the record to settle a dispute.",
  },
  {
    icon: AlertTriangle,
    name: "Exception response",
    line: "Missed service surfaces while the truck is still on the route.",
  },
  {
    icon: CircleDollarSign,
    name: "Revenue assurance",
    line: "Overages and unbilled events become invoices, not write-offs.",
  },
];

/* The next operating models in the sequence, locked lines verbatim. */
const NEXT_MODELS = [
  {
    icon: Bus,
    name: "Passenger Transport",
    tag: "ON TIME IS A SYSTEM",
    href: "https://zenduit.com/industries/public-school-transportation-fleet-management/",
  },
  {
    icon: Plane,
    name: "Airside & GSE",
    tag: "RIGHT EQUIPMENT · RIGHT OPERATOR · RIGHT TASK · RIGHT NOW",
    href: "https://zenduit.com/industries/airports-security-fleet-management/",
  },
];

/* The rest of the book, one line each. Order follows Zenduit's own footer. */
const REST = [
  { name: "Construction", href: "https://zenduit.com/industries/construction-fleet-management/" },
  { name: "Transportation & Logistics", href: "https://zenduit.com/industries/transportation-logistic-fleet-management/" },
  { name: "Utilities & Field Services", href: "https://zenduit.com/industries/utility-fleet-management/" },
  { name: "Hospitals & Senior Care", href: "https://zenducare-landing.vercel.app/" },
  { name: "Government", href: "https://zenduit.com/industries/" },
  { name: "Public Works & Winter Ops", href: "https://zenduit.com/industries/public-works-winter-ops/" },
  { name: "Rental & Leasing", href: "https://zenduit.com/industries/rental-fleet-management/" },
  { name: "Emergency Response Fleets", href: "https://zenduit.com/industries/healthcare-emergency-fleet-solutions/" },
  { name: "Forestry", href: "https://zenduit.com/industries/" },
  { name: "Agriculture", href: "https://zenduit.com/industries/agriculture-fleet-management/" },
  { name: "Food & Pharmaceutical", href: "https://zenduit.com/industries/food-pharma-fleet-management/" },
];

const ALL_INDUSTRIES = {
  name: "All industries",
  href: "https://zenduit.com/industries/",
};

export function Industries() {
  return (
    <section className="bg-ink-900 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Waste & Recycling · first operating model"
            title="Protect the route. Protect the margin."
            lede="A completed stop can hide missed service, missing evidence, contamination and unbilled work. ZenduONE brings the route, customer, video and service context together while there is still time to act."
          />
          <a
            href="https://zenduit.com/industries/waste-management-fleet-software/"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-hi underline-offset-4 hover:underline"
          >
            See the waste playbook
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
          </a>
        </Reveal>

        {/* The scene and the hidden work: real crew, illustrative workflow. */}
        <Reveal delay={0.08} className="mt-12">
          <div className="relative overflow-hidden rounded-lg border border-hairline-d">
            <img
              src="/industries/waste-management.webp"
              alt="Waste collection crew loading carts into a rear loader"
              loading="lazy"
              className="h-[320px] w-full object-cover object-[center_30%] lg:h-[440px]"
            />
            {/* The scrim and the floating card are desktop treatments. On a
                phone the card would bury the crew under the UI, which is the
                exact inversion the imagery rules forbid, so there the photo
                stands alone and the workflow docks beneath it. */}
            <div
              aria-hidden
              className="absolute inset-0 hidden bg-[linear-gradient(90deg,transparent_35%,rgb(0_7_20/0.55)_70%,rgb(0_7_20/0.72)_100%)] lg:block"
            />

            <div className="border-t border-hairline-d bg-ink-950/80 backdrop-blur-md lg:absolute lg:right-8 lg:top-1/2 lg:w-[21rem] lg:-translate-y-1/2 lg:overflow-hidden lg:rounded-md lg:border">
              <ul className="divide-y divide-hairline-d">
                {WORKFLOW.map((w) => (
                  <li key={w.label} className="flex items-center gap-3 px-4 py-2.5">
                    <w.icon
                      size={15}
                      strokeWidth={1.5}
                      aria-hidden
                      className="shrink-0 text-signal"
                    />
                    <span className="text-[13px] font-medium tracking-[0.04em] text-dfg">
                      {w.label}
                      <span className="text-dmuted"> · {w.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-hairline-d bg-ink-950/60 px-4 py-1.5">
                <span className="text-[11px] font-medium tracking-[0.08em] text-dfaint">
                  ILLUSTRATIVE WORKFLOW
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The outcome systems the model protects, panel grammar. */}
        <Reveal delay={0.12} className="mt-5">
          <div className="grid overflow-hidden rounded-lg border border-hairline-d bg-ink-950/50 sm:grid-cols-3">
            {OUTCOMES.map((o) => (
              <div
                key={o.name}
                className="border-hairline-d p-6 max-sm:[&:nth-child(n+2)]:border-t sm:[&:nth-child(n+2)]:border-l lg:p-7"
              >
                <o.icon size={17} strokeWidth={1.5} aria-hidden className="text-dmuted" />
                <h3 className="mt-3 text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-dfg">
                  {o.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-dmuted">{o.line}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* The next models in the sequence, locked lines verbatim. */}
        <Reveal delay={0.16} className="mt-14">
          <p className="text-[13px] font-medium tracking-[0.08em] text-dfaint">
            NEXT OPERATING MODELS
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {NEXT_MODELS.map((m) => (
              <a
                key={m.name}
                href={m.href}
                className="group flex items-center justify-between gap-4 rounded-md border border-hairline-d bg-ink-850 p-5 transition-colors hover:border-dfg/25 lg:p-6"
              >
                <span className="flex min-w-0 items-start gap-4">
                  <m.icon
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-dmuted"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-title font-semibold text-dfg">
                      {m.name}
                    </span>
                    <span className="mt-1 block text-[13px] font-medium tracking-[0.08em] text-signal">
                      {m.tag}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden
                  className="shrink-0 text-dfaint transition-colors group-hover:text-accent-hi"
                />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Every other industry keeps its page. The gap-px grid draws its own
            hairlines, so two rows divide cleanly. */}
        <Reveal delay={0.2} className="mt-10 overflow-hidden rounded-lg border border-hairline-d bg-hairline-d">
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-6">
            {[...REST, ALL_INDUSTRIES].map((ind) => (
              <li key={ind.name}>
                <a
                  href={ind.href}
                  className="group flex h-full flex-col justify-between gap-4 bg-ink-900 p-4 transition-colors hover:bg-ink-850"
                >
                  <span className="text-[13px] font-semibold leading-snug text-dmuted transition-colors group-hover:text-dfg">
                    {ind.name}
                  </span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-dfaint transition-colors group-hover:text-accent-hi"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
