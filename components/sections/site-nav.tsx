"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@/lib/cx";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

/* Real Zenduit taxonomy — every destination live on zenduit.com or its
   support portal (verified 2026-08-17). */
type NavLink = { label: string; href: string };
const Z = "https://zenduit.com";
const MENUS: { label: string; columns: { header: string; links: NavLink[] }[] }[] = [
  {
    label: "Products",
    columns: [
      {
        header: "Platform",
        links: [
          { label: "GPS Fleet Tracking", href: `${Z}/solutions/gps-fleet-telematics/` },
          { label: "Asset Tracking & Monitoring", href: `${Z}/solutions/gps-asset-tracking/` },
          { label: "Smart Sensors & Alerts", href: `${Z}/solutions/asset-monitoring/` },
          { label: "AI Cameras & Video Safety", href: `${Z}/solutions/video-based-telematics/` },
          { label: "Routing & Dispatch", href: `${Z}/solutions/routing-dispatch-solutions-for-fleets/` },
          { label: "Maintenance", href: `${Z}/solutions/fleet-maintenance-management/` },
          { label: "Fuel Management", href: `${Z}/solutions/fuel-management-solutions/` },
          { label: "ZenduELD", href: `${Z}/solutions/eld-compliance-software/` },
        ],
      },
      {
        header: "Hardware",
        links: [
          { label: "All Products", href: `${Z}/products/` },
          { label: "ZenDoor", href: `${Z}/products/zendoor-door-monitoring/` },
          { label: "ZenID", href: `${Z}/products/zenid-driver-indentification/` },
          { label: "ZenTrack OBD", href: `${Z}/products/zentrack-obd/` },
          { label: "ZenTrack Power", href: `${Z}/products/zentrack-power-vehicle-tracker/` },
          { label: "ZenduConnect", href: "https://zenduconnect.com/" },
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
          { label: "Video Safety & Coaching", href: `${Z}/solutions/video-based-telematics/` },
          { label: "ELD Compliance", href: `${Z}/solutions/eld-compliance-software/` },
          { label: "Fuel & Cost Control", href: `${Z}/solutions/fuel-management-solutions/` },
          { label: "Cold Chain Integrity", href: `${Z}/solutions/asset-monitoring/` },
          { label: "Equipment & Theft Recovery", href: `${Z}/solutions/gps-asset-tracking/` },
          { label: "Dispatch & Routing", href: `${Z}/solutions/routing-dispatch-solutions-for-fleets/` },
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
          { label: "Construction", href: `${Z}/industries/construction-fleet-management/` },
          { label: "Transportation & Logistics", href: `${Z}/industries/transportation-logistic-fleet-management/` },
          { label: "Utilities & Field Services", href: `${Z}/industries/utility-fleet-management/` },
          { label: "Forestry", href: `${Z}/industries/` },
          { label: "Waste Management", href: `${Z}/industries/waste-management-fleet-software/` },
          { label: "Agriculture", href: `${Z}/industries/agriculture-fleet-management/` },
          { label: "Public Works & Winter Ops", href: `${Z}/industries/public-works-winter-ops/` },
        ],
      },
      {
        header: "Public & specialized",
        links: [
          { label: "Government", href: `${Z}/industries/` },
          { label: "Public & School Transportation", href: `${Z}/industries/public-school-transportation-fleet-management/` },
          { label: "Healthcare & Emergency Response", href: `${Z}/industries/healthcare-emergency-fleet-solutions/` },
          { label: "Airports & Security", href: `${Z}/industries/airports-security-fleet-management/` },
          { label: "Rental & Leasing", href: `${Z}/industries/rental-fleet-management/` },
          { label: "Food & Pharmaceutical", href: `${Z}/industries/food-pharma-fleet-management/` },
        ],
      },
    ],
  },
  {
    label: "Resources",
    columns: [
      {
        header: "Learn",
        links: [
          { label: "Blog", href: `${Z}/blog` },
          { label: "Webinars", href: `${Z}/webinars` },
          { label: "Case Studies", href: `${Z}/success-stories` },
          { label: "Product Updates", href: `${Z}/category/updates/` },
        ],
      },
      {
        header: "Support",
        links: [
          { label: "Help Center", href: "https://support.zenduit.com/portal/en/home" },
          { label: "Knowledge Base", href: "https://support.zenduit.com/portal/en/kb" },
          { label: "Training", href: "https://support.zenduit.com/portal/en/kb/training-enrollment" },
        ],
      },
    ],
  },
  {
    label: "Company",
    columns: [
      {
        header: "Company",
        links: [
          { label: "About", href: `${Z}/about/` },
          { label: "Careers", href: `${Z}/careers/` },
          { label: "Become a Partner", href: `${Z}/partnership/` },
          { label: "Contact", href: `${Z}/contact/` },
        ],
      },
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
        <a href="#main" aria-label="Zenduit home" className="rounded-sm">
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
                          <li key={link.label}>
                            <a
                              href={link.href}
                              className="block whitespace-nowrap rounded-[6px] px-2.5 py-[7px] text-[13px] text-dmuted transition-colors hover:bg-dfg/[0.05] hover:text-dfg focus-visible:bg-dfg/[0.05] focus-visible:text-dfg"
                            >
                              {link.label}
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
            href="https://zenduit.com/contact/"
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
