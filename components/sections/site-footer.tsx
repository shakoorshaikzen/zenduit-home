import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      "GPS Fleet Tracking",
      "AI Cameras & Video Safety",
      "Asset Tracking & Monitoring",
      "Smart Sensors & Alerts",
      "Routing & Dispatch",
      "Maintenance",
      "Fuel Management",
      "ZenduELD",
    ],
  },
  {
    title: "Products",
    links: [
      "ZenCam Plus",
      "360° Fleet Visibility",
      "ZenTitan",
      "ZenTemp",
      "ZenDoor",
      "ZenID",
      "ZenTurbo",
      "ZenduConnect",
    ],
  },
  {
    title: "Resources",
    links: [
      "Blog",
      "Webinars",
      "Case Studies",
      "Help Center",
      "Product Updates",
      "API Documentation",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Become a Partner", "Press", "Contact"],
  },
  {
    title: "Support",
    links: ["Contact Support", "System Status", "Training", "Warranty & RMA"],
  },
];

const SOCIALS = [
  { icon: Linkedin, label: "Zenduit on LinkedIn" },
  { icon: Youtube, label: "Zenduit on YouTube" },
  { icon: Twitter, label: "Zenduit on X" },
  { icon: Facebook, label: "Zenduit on Facebook" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline-l bg-paper-raised">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-muted">
              One platform to measure, monitor, and manage your entire fleet.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-sm border border-hairline-l text-muted transition-colors hover:border-fg/20 hover:text-fg"
                >
                  <s.icon size={15} strokeWidth={1.5} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-faint">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-hairline-l pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-faint">
            © 2026 Zenduit. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[13px] text-faint transition-colors hover:text-fg"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
