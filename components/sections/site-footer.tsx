import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

/*
 * Every link resolves to a live destination, verified against zenduit.com's
 * own navigation and support portal (2026-08-17). Items without a real page
 * were removed rather than pointed at dead anchors.
 */

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "GPS Fleet Tracking", href: "https://zenduit.com/solutions/gps-fleet-telematics/" },
      { label: "AI Cameras & Video Safety", href: "https://zenduit.com/solutions/video-based-telematics/" },
      { label: "Asset Tracking & Monitoring", href: "https://zenduit.com/solutions/gps-asset-tracking/" },
      { label: "Smart Sensors & Alerts", href: "https://zenduit.com/solutions/asset-monitoring/" },
      { label: "Routing & Dispatch", href: "https://zenduit.com/solutions/routing-dispatch-solutions-for-fleets/" },
      { label: "Maintenance", href: "https://zenduit.com/solutions/fleet-maintenance-management/" },
      { label: "Fuel Management", href: "https://zenduit.com/solutions/fuel-management-solutions/" },
      { label: "ZenduELD", href: "https://zenduit.com/solutions/eld-compliance-software/" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "All Products", href: "https://zenduit.com/products/" },
      { label: "ZenDoor", href: "https://zenduit.com/products/zendoor-door-monitoring/" },
      { label: "ZenID", href: "https://zenduit.com/products/zenid-driver-indentification/" },
      { label: "ZenTrack OBD", href: "https://zenduit.com/products/zentrack-obd/" },
      { label: "ZenTrack Power", href: "https://zenduit.com/products/zentrack-power-vehicle-tracker/" },
      { label: "ZenduConnect", href: "https://zenduconnect.com/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "https://zenduit.com/blog" },
      { label: "Webinars", href: "https://zenduit.com/webinars" },
      { label: "Case Studies", href: "https://zenduit.com/success-stories" },
      { label: "Help Center", href: "https://support.zenduit.com/portal/en/home" },
      { label: "Product Updates", href: "https://zenduit.com/category/updates/" },
      { label: "Knowledge Base", href: "https://support.zenduit.com/portal/en/kb" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "https://zenduit.com/about/" },
      { label: "Careers", href: "https://zenduit.com/careers/" },
      { label: "Become a Partner", href: "https://zenduit.com/partnership/" },
      { label: "Contact", href: "https://zenduit.com/contact/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Support", href: "https://support.zenduit.com/portal/en/home" },
      { label: "Training", href: "https://support.zenduit.com/portal/en/kb/training-enrollment" },
      { label: "Industries", href: "https://zenduit.com/industries/" },
    ],
  },
];

const SOCIALS = [
  { icon: Linkedin, label: "Zenduit on LinkedIn", href: "https://www.linkedin.com/company/zenduit/" },
  { icon: Youtube, label: "Zenduit on YouTube", href: "https://www.youtube.com/@zenduit6752" },
  { icon: Instagram, label: "Zenduit on Instagram", href: "https://www.instagram.com/zendu.it/" },
  { icon: Facebook, label: "Zenduit on Facebook", href: "https://www.facebook.com/Zenduit" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink-900">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-dmuted">
              Operational intelligence for complex fleet and equipment
              operations.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-sm border border-hairline-d text-dmuted transition-colors hover:border-dfg/25 hover:text-dfg"
                >
                  <s.icon size={15} strokeWidth={1.5} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-dfaint">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-dmuted transition-colors hover:text-dfg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Procurement-readiness signals: a public-sector buyer looks for a
            named legal entity and a registered address before starting an
            evaluation. Both are taken verbatim from Zenduit's own privacy
            policy (read 2026-08-31) — confirm the registered capitalization
            with legal, and add a Terms of Service link here as soon as one is
            published (zenduit.com has no terms page today, and a dead legal
            link is worse than a missing one). */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-hairline-d pt-6 sm:flex-row sm:items-end">
          <div className="text-[13px] leading-relaxed text-dfaint">
            <p>© 2026 Zenduit Inc. All rights reserved.</p>
            <p className="mt-1">
              102-2680 Matheson Blvd East, Mississauga, ON L4W 0A5, Canada
            </p>
          </div>
          <a
            href="https://zenduit.com/privacy-policy/"
            className="text-[13px] text-dfaint transition-colors hover:text-dfg"
          >
            Privacy Policy
          </a>
        </div>
      </Container>
    </footer>
  );
}
