"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@/lib/cx";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

/* Real Zenduit taxonomy (verified on zenduit.com) — link stubs for the homepage build. */
const MENUS: { label: string; columns: { header: string; links: string[] }[] }[] = [
  {
    label: "Products",
    columns: [
      {
        header: "Platform",
        links: [
          "GPS Fleet Tracking",
          "Asset Tracking & Monitoring",
          "Smart Sensors & Alerts",
          "AI Cameras & Video Safety",
          "Routing & Dispatch",
          "Maintenance",
          "Fuel Management",
          "ZenduELD",
        ],
      },
      {
        header: "Hardware",
        links: [
          "ZenCam Plus",
          "360° Fleet Visibility",
          "ZenTitan",
          "ZenTemp",
          "ZenDoor",
          "ZenID",
          "ZenTurbo",
          "Vehicle Trackers",
        ],
      },
    ],
  },
  {
    label: "Solutions",
    columns: [
      {
        header: "By outcome",
        links: [
          "Video Safety & Coaching",
          "ELD Compliance",
          "Fuel & Cost Control",
          "Cold Chain Integrity",
          "Equipment & Theft Recovery",
          "Dispatch & Routing",
        ],
      },
    ],
  },
  {
    label: "Industries",
    columns: [
      {
        header: "Operations",
        links: [
          "Construction",
          "Transportation & Logistics",
          "Utilities & Field Services",
          "Forestry",
          "Waste Management",
          "Agriculture",
          "Public Works & Winter Ops",
        ],
      },
      {
        header: "Public & specialized",
        links: [
          "Government",
          "Public & School Transportation",
          "Healthcare & Emergency Response",
          "Airports & Security",
          "Rental & Leasing",
          "Food & Pharmaceutical",
        ],
      },
    ],
  },
  {
    label: "Resources",
    columns: [
      { header: "Learn", links: ["Blog", "Webinars", "Case Studies", "Product Updates"] },
      {
        header: "Support",
        links: ["Help Center", "API Documentation", "Training", "System Status"],
      },
    ],
  },
  {
    label: "Company",
    columns: [
      { header: "Company", links: ["About", "Careers", "Become a Partner", "Press", "Contact"] },
    ],
  },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        // At rest: solid black, continuous with the announcement bar above it.
        // Once content slides underneath: frosted glass over it.
        scrolled
          ? "border-hairline-d bg-ink-950/85 backdrop-blur-xl"
          : "border-transparent bg-ink-950",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[75rem] items-center justify-between px-5 py-3.5 sm:px-8"
      >
        <a href="#" aria-label="Zenduit home" className="rounded-sm">
          <Logo tone="dark" />
        </a>

        {/* Hover/focus dropdown panels — CSS-driven so keyboard works without JS state */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {MENUS.map((menu) => (
            <li key={menu.label} className="group relative">
              <button
                aria-haspopup="menu"
                className="inline-flex cursor-pointer items-center gap-1 rounded-sm px-3 py-2 text-sm text-dmuted transition-colors group-hover:text-dfg group-focus-within:text-dfg"
              >
                {menu.label}
                <ChevronDown
                  size={13}
                  strokeWidth={1.5}
                  className="text-dfaint transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  aria-hidden
                />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="dropdown-panel flex gap-6 rounded-md border border-hairline-d bg-ink-850/95 p-3 shadow-[0_24px_48px_-16px_rgb(2_6_18/0.85)] backdrop-blur-md">
                  {menu.columns.map((col) => (
                    <div key={col.header} className="min-w-[190px]">
                      <p className="px-2.5 pb-1.5 pt-1 font-mono text-xs uppercase tracking-[0.08em] text-dfaint">
                        {col.header}
                      </p>
                      <ul>
                        {col.links.map((link) => (
                          <li key={link}>
                            <a
                              href="#"
                              className="block whitespace-nowrap rounded-[6px] px-2.5 py-[7px] text-[13px] text-dmuted transition-colors hover:bg-dfg/[0.05] hover:text-dfg focus-visible:bg-dfg/[0.05] focus-visible:text-dfg"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href="#pricing"
            className="hidden rounded-sm px-3 py-2 text-sm text-dmuted transition-colors hover:text-dfg sm:block"
          >
            Check Our Prices
          </a>
          <Button size="sm" href="#demo">
            Get a Demo
          </Button>
        </div>
      </nav>
    </header>
  );
}
