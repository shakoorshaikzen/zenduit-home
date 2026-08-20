"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  MapPin,
  Plug,
  Route,
  Video,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cx } from "@/lib/cx";

/*
 * The platform as a segmented tab switcher over one stage (the Stripe /
 * Fleetio product-switcher grammar): five labeled tabs up top, and below
 * them a split panel pairing the story with Zenduit's own solution
 * photography and a telemetry chip. Five tabs cover every solution on
 * zenduit.com/solutions; merged aspects are named in each tab's mono tag
 * line, and Learn more goes to the real solution page.
 */

type Solution = {
  key: string;
  name: string;
  icon: typeof MapPin;
  copy: string;
  tags: string;
  href: string;
  image: { src: string; alt: string; position?: string };
  chip: { label: string; tone: "signal" | "warn" | "alarm" };
};

const SOLUTIONS: Solution[] = [
  {
    key: "tracking",
    name: "Fleet & Asset Tracking",
    icon: MapPin,
    copy: "Second-by-second GPS for every vehicle, and solar or long-life trackers for every asset, down to the trailer that has not moved in three days.",
    tags: "FLEET TELEMATICS · ASSET TRACKING · ASSET MONITORING · ASSET MANAGEMENT",
    href: "https://zenduit.com/solutions/gps-fleet-telematics/",
    image: {
      src: "/solutions/telematics.webp",
      alt: "White semi truck on a highway curve through autumn hills",
    },
    chip: { label: "TRK-047 · 62 KM/H · LIVE", tone: "signal" },
  },
  {
    key: "video-safety",
    name: "Video Safety",
    icon: Video,
    copy: "A camera should help the driver and save the manager time. ZenCam Plus coaches in the moment, recognizes good driving, and escalates with the clip already attached.",
    tags: "VIDEO BASED SAFETY · DRIVER EMPOWERMENT · IN-CAB ALERTS",
    href: "https://zenduit.com/solutions/video-based-telematics/",
    image: {
      src: "/solutions/video-safety.webp",
      alt: "Aerial view of a transport truck on a sweeping highway interchange",
    },
    chip: { label: "HARSH BRAKE · CLIP READY", tone: "alarm" },
  },
  {
    key: "operations",
    name: "Routing, Fuel & Maintenance",
    icon: Route,
    copy: "Plan routes and reassign them mid-shift, match every fill-up to a card and a tank, and let fault codes open their own work orders.",
    tags: "ROUTING & DISPATCH · OPTIMIZATION · FUEL MANAGEMENT · MAINTENANCE",
    href: "https://zenduit.com/solutions/routing-dispatch-solutions-for-fleets/",
    image: {
      src: "/solutions/routing.webp",
      alt: "Aerial view of city bridge traffic at dusk",
    },
    chip: { label: "ROUTE 7 · ON TIME", tone: "signal" },
  },
  {
    key: "compliance",
    name: "ELD & Forms",
    icon: ClipboardCheck,
    copy: "ZenduELD keeps hours-of-service current and digital DVIRs signed, so the audit becomes an export instead of a scramble.",
    tags: "ZENDUELD · SMART FORMS · DVIR",
    href: "https://zenduit.com/solutions/eld-compliance-software/",
    image: {
      src: "/solutions/eld.webp",
      alt: "Semi truck driving into the sunset on an open highway",
    },
    chip: { label: "HOS · 6:12 LEFT", tone: "signal" },
  },
  {
    key: "integrations",
    name: "Integrations",
    icon: Plug,
    copy: "Built on the open Geotab ecosystem: your hardware, your data, and ZenduConnect to grow without rip-and-replace.",
    tags: "GEOTAB MARKETPLACE · ZENDUCONNECT · MY INSTALL HUB",
    href: "https://zenduit.com/solutions/integration/",
    image: {
      src: "/product-live-map.webp",
      alt: "ZenduONE platform live map with asset list and continental vehicle clusters",
      position: "object-left-top",
    },
    chip: { label: "GEOTAB · CONNECTED", tone: "signal" },
  },
];

const CHIP_TONE = {
  signal: "bg-signal",
  warn: "bg-warn",
  alarm: "bg-alarm",
} as const;

function TelemetryChip({ chip }: { chip: Solution["chip"] }) {
  return (
    <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-[6px] border border-hairline-d bg-ink-950/85 px-3 py-2 font-mono text-xs tracking-[0.05em] text-dmuted backdrop-blur-sm">
      <span
        aria-hidden
        className={cx("size-1.5 rounded-full", CHIP_TONE[chip.tone])}
      />
      {chip.label}
    </span>
  );
}

export function PlatformExplorer() {
  const [active, setActive] = useState(0);
  const current = SOLUTIONS[active];

  return (
    <section id="solutions" className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="The work after the signal"
            lede="Five jobs where a signal becomes finished work. Pick one and see it happen."
          />
        </Reveal>

        {/* One panel, three zones: vertical tab rail, story, photography */}
        <Reveal delay={0.08} className="mt-12">
          <div className="grid overflow-hidden rounded-lg border border-hairline-l bg-card lg:grid-cols-[minmax(210px,0.45fr)_minmax(0,0.7fr)_minmax(0,0.95fr)]">
            {/* The rail — vertical on desktop, a scrollable row on mobile */}
            <div
              role="tablist"
              aria-label="Platform solutions"
              aria-orientation="vertical"
              className="flex min-w-0 overflow-x-auto border-b border-hairline-l [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r [&::-webkit-scrollbar]:hidden"
            >
              {SOLUTIONS.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.key}
                    role="tab"
                    id={`solution-tab-${s.key}`}
                    aria-selected={selected}
                    aria-controls={`solution-panel-${s.key}`}
                    onClick={() => setActive(i)}
                    className={cx(
                      "relative flex shrink-0 cursor-pointer items-center gap-3 px-5 py-4 text-left text-sm font-medium transition-colors duration-200 lg:flex-1 lg:border-b lg:border-hairline-l lg:py-5 lg:last:border-b-0",
                      selected
                        ? "bg-accent/[0.07] text-fg"
                        : "text-muted hover:bg-paper-raised hover:text-fg",
                    )}
                  >
                    {selected && (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-px bg-accent lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-px"
                      />
                    )}
                    <s.icon
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden
                      className={cx(
                        "shrink-0 transition-colors duration-200",
                        selected ? "text-accent-deep" : "text-faint",
                      )}
                    />
                    <span className="whitespace-nowrap lg:whitespace-normal">
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* The story */}
            <div
              role="tabpanel"
              id={`solution-panel-${current.key}`}
              aria-labelledby={`solution-tab-${current.key}`}
              className="flex flex-col justify-center border-b border-hairline-l p-7 lg:border-b-0 lg:border-r lg:p-9"
            >
              <p className="font-mono text-xs tracking-[0.08em] text-accent-deep">
                {current.tags}
              </p>
              <h3 className="mt-4 text-balance font-display text-title-lg font-semibold text-fg">
                {current.name}
              </h3>
              <p className="mt-4 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted">
                {current.copy}
              </p>
              <div className="mt-7">
                <Button size="md" href={current.href}>
                  Learn more
                </Button>
              </div>
            </div>

            {/* The photography */}
            <div className="relative min-h-[280px] lg:min-h-[460px]">
              {SOLUTIONS.map((s, i) => (
                <div
                  key={s.key}
                  aria-hidden={i !== active}
                  className={cx(
                    "absolute inset-0 transition-opacity duration-500",
                    i === active ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <img
                    src={s.image.src}
                    alt={s.image.alt}
                    loading={s.key === "tracking" ? "eager" : "lazy"}
                    className={cx(
                      "absolute inset-0 h-full w-full object-cover",
                      s.image.position,
                    )}
                  />
                  <TelemetryChip chip={s.chip} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
