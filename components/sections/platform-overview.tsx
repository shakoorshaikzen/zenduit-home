import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TopoTexture } from "@/components/ui/topo-texture";

/*
 * Formatted on Stripe's card grammar: an asymmetric grid so the flagship gets
 * hero scale, the visual filling its own half of the card rather than sitting
 * in a letterboxed strip, and one plain question per device instead of three
 * interchangeable paragraphs. No mono micro-tags: no live telemetry here.
 */

const SUPPORTING = [
  {
    src: "/zendoor.webp",
    name: "ZenDoor",
    question: "Was the trailer opened?",
    copy: "Wireless door and cargo sensor. Logs every open and close with a time and a place.",
  },
  {
    src: "/zenid.webp",
    name: "ZenID",
    question: "Who was driving?",
    copy: "Driver identification tag. Ties each trip, event, and safety score to a real person.",
  },
];

const FIELD = [
  "AI dash cameras on the road and in the cab",
  "GPS and OBD trackers on every vehicle",
  "Cold chain sensors on refrigerated loads",
  "Door and cargo sensors on trailers",
  "Long-life trackers on unpowered equipment",
];

const OPS = [
  "A live map your dispatchers keep open all day",
  "A safety coaching queue with the video attached",
  "Maintenance work orders, opened automatically",
  "Hours-of-service logs ready for an audit",
  "Fuel and cost reports on a schedule",
];

const PIPELINE = [
  { step: "Ingest", copy: "Every reading, the second it happens" },
  { step: "Evaluate", copy: "Against the rules you set" },
  { step: "Act", copy: "An alert, a work order, or a report" },
];

function FlowColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-7 lg:p-9">
      <h3 className="text-[0.9375rem] font-semibold text-fg">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="text-[0.9375rem] leading-relaxed text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PlatformOverview() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="From the field to the ops desk"
            lede="Hardware in your vehicles and on your assets streams into one cloud, and comes back out as work that is already assigned."
          />
        </Reveal>

        {/* Flagship: the device fills its own half of the card. */}
        <Reveal delay={0.08} className="mt-14">
          <article className="grid overflow-hidden rounded-lg border border-hairline-l bg-card lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex min-h-[19rem] items-center justify-center bg-paper-raised p-10 lg:min-h-[22rem] lg:p-12">
              <img
                src="/zencam-plus.webp"
                alt="ZenCam Plus device"
                loading="lazy"
                className="w-full max-w-[380px] drop-shadow-[0_26px_40px_rgb(19_27_46/0.22)]"
              />
            </div>
            <div className="flex flex-col justify-center border-t border-hairline-l p-8 lg:border-l lg:border-t-0 lg:p-10">
              <h3 className="font-display text-title-lg font-semibold text-fg">
                ZenCam Plus
              </h3>
              <p className="mt-3 text-balance font-display text-title font-medium leading-snug text-accent-deep">
                What actually happened out there?
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                Road and in-cab AI camera. It flags harsh braking, tailgating,
                and distraction as they happen, then uploads the clip on its own
                so the answer is waiting for you.
              </p>
            </div>
          </article>
        </Reveal>

        {/* Supporting pair: same grammar, half the scale. */}
        <Reveal delay={0.14} className="mt-5 grid gap-5 sm:grid-cols-2">
          {SUPPORTING.map((d) => (
            <article
              key={d.name}
              className="grid overflow-hidden rounded-lg border border-hairline-l bg-card sm:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="flex min-h-[12rem] items-center justify-center bg-paper-raised p-8">
                <img
                  src={d.src}
                  alt={`${d.name} device`}
                  loading="lazy"
                  className="max-h-36 w-auto drop-shadow-[0_18px_28px_rgb(19_27_46/0.2)]"
                />
              </div>
              <div className="flex flex-col justify-center border-t border-hairline-l p-6 sm:border-l sm:border-t-0 lg:p-7">
                <h3 className="font-display text-[1.125rem] font-semibold text-fg">
                  {d.name}
                </h3>
                <p className="mt-2 font-display text-[0.9375rem] font-medium text-accent-deep">
                  {d.question}
                </p>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {d.copy}
                </p>
              </div>
            </article>
          ))}
        </Reveal>

        {/* Where it all goes. */}
        <Reveal
          delay={0.2}
          className="mt-5 overflow-hidden rounded-lg border border-hairline-l bg-card"
        >
          <div className="grid items-stretch lg:grid-cols-[1fr_minmax(272px,0.8fr)_1fr]">
            <FlowColumn title="In the field" items={FIELD} />

            {/* The cloud, shown as a pipeline rather than a paragraph. */}
            <div className="relative overflow-hidden bg-ink-900 px-8 py-12">
              <TopoTexture opacity={0.55} />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(92_179_248/0.5),transparent)]"
              />

              <div className="relative mx-auto max-w-[15rem]">
                <Logo tone="dark" className="mx-auto h-7" />
                <p className="mt-3 text-center text-[0.9375rem] font-semibold text-dfg">
                  Zenduit Cloud
                </p>

                <ol className="mt-8">
                  {PIPELINE.map((p, i) => (
                    <li key={p.step} className="relative flex gap-3.5 pb-6 last:pb-0">
                      {i < PIPELINE.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute left-[5px] top-3.5 h-full w-px bg-hairline-d"
                        />
                      )}
                      <span
                        aria-hidden
                        className="relative mt-1 grid size-[11px] shrink-0 place-items-center rounded-full bg-ink-900 ring-1 ring-signal/40"
                      >
                        <span className="size-[5px] rounded-full bg-signal" />
                      </span>
                      <span>
                        <span className="block text-[0.9375rem] font-semibold text-dfg">
                          {p.step}
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-dmuted">
                          {p.copy}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <FlowColumn title="At the ops desk" items={OPS} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
