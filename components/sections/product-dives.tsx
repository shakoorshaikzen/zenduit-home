import {
  ArrowRight,
  BatteryCharging,
  BellRing,
  Boxes,
  DoorOpen,
  History,
  KeyRound,
  MapPin,
  ShieldAlert,
  ThermometerSnowflake,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";


/* Real product visuals from zenduit.com — framed, unadorned. No caption
   chrome: the photograph carries itself. */
function ProductPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-hairline-l bg-card shadow-ambient">
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  );
}

const DIVES = [
  {
    title: "GPS tracking: every vehicle, live to the second",
    copy: "The map your dispatchers keep open all day: second-by-second GPS, with route replay for when a customer disputes an arrival.",
    features: [
      { icon: MapPin, text: "Live map with 1-second refresh" },
      { icon: History, text: "Route replay and trip history" },
      { icon: BellRing, text: "Geofence, idle, and ETA alerts" },
    ],
    cta: "Explore GPS tracking",
    vignette: (
      <ProductPhoto
        src="/product-live-map.webp"
        alt="ZenduONE platform live map: asset list with temperatures and beacon counts beside a continental map with vehicle clusters"
      />
    ),
  },
  {
    title: "Asset tracking: trailers and equipment that report in",
    copy: "Solar and long-life trackers report on every asset you own, powered or not, down to the trailer that has not moved in three days.",
    features: [
      { icon: Boxes, text: "ZenTitan equipment tracking" },
      { icon: BatteryCharging, text: "Solar and multi-year battery trackers" },
      { icon: ShieldAlert, text: "Theft recovery and idle-asset reports" },
    ],
    cta: "Explore asset tracking",
    vignette: (
      <ProductPhoto
        src="/product-cargo.webp"
        alt="Open box truck with Zenduit cargo sensor callout showing load rate and remaining volume"
      />
    ),
  },
  {
    title: "Smart sensors: alerts with a next step attached",
    copy: "ZenTemp, ZenDoor, and ZenID turn sensor readings into rules that act, not emails you ignore.",
    features: [
      { icon: ThermometerSnowflake, text: "Cold chain range rules (ZenTemp)" },
      { icon: DoorOpen, text: "Door and cargo events (ZenDoor)" },
      { icon: KeyRound, text: "Driver ID and key tracking (ZenID)" },
    ],
    cta: "Explore sensors & alerts",
    vignette: (
      <ProductPhoto
        src="/product-facial-id.webp"
        alt="Equipment operator in cab with ZenID facial recognition overlay reading Facial ID Recognized"
      />
    ),
  },
];

export function ProductDives() {
  return (
    <section className="bg-paper pb-24 lg:pb-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="Watch the platform work"
            lede="From live map to alert rule, every part of the fleet reports into one screen."
          />
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-24">
          {DIVES.map((dive, i) => (
            <Reveal
              key={dive.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={cx(i % 2 === 1 && "lg:order-last")}>
                {/* stepped heading: module name on its own line, benefit below */}
                <h3 className="font-display text-title-lg font-semibold text-fg">
                  <span className="block">{dive.title.split(": ")[0]}:</span>
                  <span className="block text-balance">
                    {dive.title.split(": ")[1]}
                  </span>
                </h3>
                <p className="mt-3 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted">
                  {dive.copy}
                </p>
                <ul className="mt-6 space-y-3">
                  {dive.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      <f.icon
                        size={15}
                        strokeWidth={1.5}
                        className="shrink-0 text-muted"
                        aria-hidden
                      />
                      <span className="text-sm text-fg/80">{f.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
                >
                  {dive.cta}
                  <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
                </a>
              </div>
              <div>{dive.vignette}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
