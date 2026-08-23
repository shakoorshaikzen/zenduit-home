import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/*
 * The reading room — a bento of Zenduit's real publishing. Stripe's even
 * panel symmetry (2/3 editorial column + 1/3 rail, equal gutters), Linear's
 * two color moments carried in this palette: a soft accent-tint card with a
 * giant watermark logo, and one loud amber block. Every title, date, and
 * link is live on zenduit.com; nothing is drafted.
 */

const FEATURED = {
  date: "AUG 2026 · COMPLIANCE",
  title: "BC Dashcam Mandate (Bill M217): is your fleet ready?",
  href: "https://zenduit.com/bc-dashcam-mandate-bill-m217/",
  img: "/zencam-plus.webp",
  alt: "ZenCam Plus AI dash camera, the hardware the BC mandate covers",
};

const POSTS = [
  {
    date: "MAR 2026 · ELD",
    title: "ELD compliance software: what fleets actually need (and what most systems miss)",
    href: "https://zenduit.com/eld-compliance-software-what-fleets-actually-need/",
  },
  {
    date: "MAR 2026 · ASSET TRACKING",
    title: "Accurate asset visibility starts with better tracking: the BLE mesh advantage",
    href: "https://zenduit.com/ble-mesh-fleet-asset-tracking-advantage/",
  },
];

const UPDATES = [
  { label: "May / June 2026", href: "https://zenduit.com/new-product-updates-may-june-2026/" },
  { label: "April 2026", href: "https://zenduit.com/new-product-updates-april-2026/" },
  { label: "March 2026", href: "https://zenduit.com/new-product-updates-march-2026/" },
  { label: "Every release note", href: "https://zenduit.com/category/updates/" },
];

const HUBS = [
  { label: "Blog", href: "https://zenduit.com/blog" },
  { label: "Case studies", href: "https://zenduit.com/success-stories" },
  { label: "Webinars", href: "https://zenduit.com/webinars" },
];

function CornerArrow({ dark }: { dark?: boolean }) {
  return (
    <ArrowUpRight
      size={16}
      strokeWidth={1.5}
      aria-hidden
      className={
        dark
          ? "absolute right-5 top-5 text-fg/40 transition-colors duration-200 group-hover:text-fg"
          : "absolute right-5 top-5 text-faint transition-colors duration-200 group-hover:text-accent-deep"
      }
    />
  );
}

export function Resources() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="The latest from the field"
            lede="Product updates, playbooks, and customer stories, written by the team that ships them."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {/* Featured post — real cover, real URL */}
          <Reveal className="lg:col-span-2">
            <a
              href={FEATURED.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-hairline-l bg-card transition-colors duration-200 hover:border-fg/25"
            >
              <div className="flex aspect-[16/8] items-center justify-center overflow-hidden border-b border-accent/15 bg-accent/[0.07] p-10">
                <img
                  src={FEATURED.img}
                  alt={FEATURED.alt}
                  loading="lazy"
                  className="max-h-full w-auto max-w-[420px] drop-shadow-[0_28px_44px_rgb(19_27_46/0.3)]"
                />
              </div>
              <div className="relative flex-1 p-7 lg:p-8">
                <CornerArrow />
                <p className="text-[13px] font-medium tracking-[0.08em] text-accent-deep">
                  {FEATURED.date}
                </p>
                <h3 className="mt-3 max-w-xl text-balance font-display text-title-lg font-semibold text-fg">
                  {FEATURED.title}
                </h3>
              </div>
            </a>
          </Reveal>

          {/* What we shipped — soft accent tint + giant watermark (Linear's move) */}
          <Reveal delay={0.06}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-accent/25 bg-accent/[0.12]">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -right-16 opacity-10"
              >
                <Logo tone="light" className="!h-32 w-auto" />
              </div>
              <div className="relative border-b border-accent/15 px-6 py-4">
                <p className="text-[13px] font-medium tracking-[0.08em] text-accent-deep">
                  WHAT WE SHIPPED · MONTHLY
                </p>
              </div>
              <ul className="relative flex flex-1 flex-col divide-y divide-accent/15">
                {UPDATES.map((u) => (
                  <li key={u.label} className="flex flex-1">
                    <a
                      href={u.href}
                      className="group flex w-full items-center justify-between gap-4 px-6 py-4 transition-colors duration-200 hover:bg-accent/[0.08]"
                    >
                      <span className="text-[0.9375rem] font-medium text-fg">
                        {u.label}
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        aria-hidden
                        className="text-accent-deep/60 transition-colors group-hover:text-accent-deep"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Two real reads — the editorial pair */}
          {POSTS.map((p, i) => (
            <Reveal key={p.href} delay={0.06 + i * 0.04}>
              <a
                href={p.href}
                className="group relative flex h-full flex-col justify-between rounded-lg border border-hairline-l bg-card p-7 transition-colors duration-200 hover:border-fg/25 lg:p-8"
              >
                <CornerArrow />
                <div>
                  <p className="text-[13px] font-medium tracking-[0.08em] text-accent-deep">
                    {p.date}
                  </p>
                  <h3 className="mt-3 text-balance pr-6 font-display text-lg font-semibold leading-snug text-fg">
                    {p.title}
                  </h3>
                </div>
                <span className="mt-8 text-[13px] font-medium tracking-[0.08em] text-muted">
                  READ ON ZENDUIT.COM
                </span>
              </a>
            </Reveal>
          ))}

          {/* The loud block, Linear's move in brand blue: every hub, one panel */}
          <Reveal delay={0.14}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-accent-deep p-7 lg:p-8">
              <p className="text-balance font-display text-title-lg font-semibold leading-tight text-dfg">
                The rest of the library.
              </p>
              <ul className="mt-8 divide-y divide-dfg/15 border-t border-dfg/20">
                {HUBS.map((h) => (
                  <li key={h.label}>
                    <a
                      href={h.href}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span className="text-[0.9375rem] font-semibold text-dfg/80 transition-colors duration-200 group-hover:text-dfg">
                        {h.label}
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        aria-hidden
                        className="text-dfg/50 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-dfg"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
