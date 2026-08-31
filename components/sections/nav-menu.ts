import {
  Boxes,
  Cpu,
  LayoutGrid,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";

/*
 * Navigation, built to the four megamenu comps in `nav bar/`.
 *
 * Every href was HTTP-verified against zenduit.com on 2026-08-19. Where the
 * comp names a page Zenduit has not published yet (Today, Zentelligence, ROI
 * calculator, Glossary, Guides, White-label, Build with us), the link points
 * at the nearest live page rather than a 404 — each one is marked `approx`
 * below so marketing can swap in the real URL the moment it exists.
 *
 * "Who we serve" had no comp in the folder; it is built from Zenduit's own
 * live industry pages (11 of 13 exist; forestry and government fall back to
 * the industries hub).
 */

const Z = "https://zenduit.com";
const SUPPORT = "https://support.zenduit.com/portal/en";

export type NavItem = {
  label: string;
  desc?: string;
  href: string;
  icon?: LucideIcon;
  /** Destination is the nearest live page, not a dedicated one yet. */
  approx?: boolean;
};

export type NavColumn = {
  header: string;
  /** featured = icon cards · detailed = title+desc · plain = title only */
  variant?: "featured" | "detailed" | "plain";
  items: NavItem[];
  cta?: NavItem;
};

export type NavPromo = {
  badge: string;
  kicker?: string;
  title: string;
  desc?: string;
  href: string;
  cta?: string;
  img?: string;
};

export type NavMenu = {
  label: string;
  columns: NavColumn[];
  promo?: NavPromo;
};

export const NAV_MENUS: NavMenu[] = [
  {
    label: "Products",
    columns: [
      {
        header: "Featured",
        variant: "featured",
        items: [
          {
            label: "Today",
            desc: "What changed enough to need you today",
            href: `${Z}/zenduone/`,
            icon: Sun,
            approx: true,
          },
          {
            label: "Zentelligence",
            desc: "Turns signals into cases, and cases into finished work",
            href: `${Z}/zenduone/`,
            icon: Sparkles,
            approx: true,
          },
          {
            label: "Platform overview",
            desc: "How the whole system fits together",
            href: `${Z}/zenduone/`,
            icon: LayoutGrid,
          },
          {
            label: "Integrations",
            desc: "Connect the systems you already run",
            href: `${Z}/marketplace/`,
            icon: Boxes,
          },
        ],
      },
      {
        header: "Capabilities",
        variant: "detailed",
        items: [
          {
            label: "Safety and driver intelligence",
            desc: "Cameras that assist the driver, not just record them",
            href: `${Z}/solutions/video-based-telematics/`,
          },
          {
            label: "Incidents and claims",
            desc: "A collision starts the response, not a search for footage",
            href: `${Z}/solutions/video-based-telematics/`,
            approx: true,
          },
          {
            label: "Qualifications and readiness",
            desc: "Know who is authorised before the work is assigned",
            href: `${Z}/solutions/eld-compliance-software/`,
            approx: true,
          },
          {
            label: "Maintenance and availability",
            desc: "Faults prioritised by what tomorrow depends on",
            href: `${Z}/solutions/fleet-maintenance-management/`,
          },
          {
            label: "Routing and predictive operations",
            desc: "See service risk before the schedule breaks",
            href: `${Z}/solutions/routing-dispatch-solutions-for-fleets/`,
          },
          {
            label: "Utilisation and lifecycle",
            desc: "Redeploy or replace with evidence rather than guesswork",
            href: `${Z}/solutions/gps-asset-tracking/`,
          },
          {
            label: "Customer portal and voice",
            desc: "Routine status questions answer themselves",
            href: `${Z}/solutions/gps-fleet-telematics/`,
            approx: true,
          },
        ],
      },
      {
        header: "Software and devices",
        variant: "plain",
        items: [
          { label: "Fleet management platform", href: `${Z}/zenduone/` },
          { label: "Driver app", href: `${Z}/products/mobile-tracking-drivers/` },
          { label: "AI dash cameras", href: `${Z}/products/?product-category=video-telematics` },
          { label: "Vehicle and asset trackers", href: `${Z}/products/?product-category=asset-monitoring` },
          { label: "Bluetooth asset tags", href: `${Z}/products/?product-category=asset-monitoring`, approx: true },
          { label: "Door and cargo sensors", href: `${Z}/products/zendoor-door-monitoring/` },
          { label: "Temperature sensors", href: `${Z}/products/?product-category=connected-sensors` },
          { label: "Heavy equipment trackers", href: `${Z}/products/?product-category=asset-monitoring`, approx: true },
          { label: "Driver ID readers", href: `${Z}/products/zenid-driver-indentification/` },
        ],
        cta: { label: "See all products", href: `${Z}/products` },
      },
    ],
    promo: {
      badge: "On demand",
      kicker: "Watch the recording",
      title: "One Less Disconnected Tool: ZenduELD is Here",
      href: `${Z}/webinars`,
      cta: "Watch now",
      img: "/zencam-plus.webp",
    },
  },
  {
    label: "Who we serve",
    columns: [
      {
        header: "By industry",
        variant: "plain",
        items: [
          { label: "Construction", href: `${Z}/industries/construction/` },
          { label: "Transportation and logistics", href: `${Z}/industries/transportation-logistics/` },
          { label: "Utilities and field services", href: `${Z}/industries/utilities-field-services/` },
          { label: "Public and school transportation", href: `${Z}/industries/public-school-transportation/` },
          { label: "Waste management", href: `${Z}/industries/waste-management/` },
          { label: "Public works and winter ops", href: `${Z}/industries/public-works/` },
          { label: "Forestry", href: `${Z}/industries/`, approx: true },
        ],
      },
      {
        header: "Also serving",
        variant: "plain",
        items: [
          { label: "Government", href: `${Z}/industries/`, approx: true },
          { label: "Healthcare and emergency response", href: `${Z}/industries/healthcare-emergency-response/` },
          { label: "Airports and security", href: `${Z}/industries/airports-security/` },
          { label: "Rental and leasing", href: `${Z}/industries/rental-leasing/` },
          { label: "Agriculture", href: `${Z}/industries/agriculture/` },
          { label: "Food and pharmaceutical", href: `${Z}/industries/food-pharma/` },
        ],
        cta: { label: "All industries", href: `${Z}/industries/` },
      },
      {
        header: "By outcome",
        variant: "detailed",
        items: [
          {
            label: "Cut fuel and idling cost",
            desc: "Where the spend actually goes, by vehicle",
            href: `${Z}/solutions/fuel-management-solutions/`,
          },
          {
            label: "Coach drivers with evidence",
            desc: "The clip, not the argument",
            href: `${Z}/solutions/video-based-telematics/`,
          },
          {
            label: "Stay ELD compliant",
            desc: "Hours of service without the scramble",
            href: `${Z}/solutions/eld-compliance-software/`,
          },
          {
            label: "Protect equipment on site",
            desc: "Know what moved, and who moved it",
            href: `${Z}/solutions/gps-asset-tracking/`,
          },
        ],
      },
    ],
    promo: {
      badge: "Proof",
      kicker: "Customer stories",
      title: "What changed for fleets that switched",
      desc: "Real operations, before and after, in their own words.",
      href: `${Z}/success-stories`,
      cta: "Read the stories",
    },
  },
  {
    label: "Resources",
    columns: [
      {
        header: "Learn",
        variant: "detailed",
        items: [
          { label: "Blog", desc: "Field notes on running a fleet", href: `${Z}/blog` },
          { label: "Guides", desc: "Practical how-tos, start to finish", href: `${Z}/blog`, approx: true },
          { label: "Webinars", desc: "Live sessions and recordings", href: `${Z}/webinars` },
          { label: "Glossary", desc: "Plain language fleet terms", href: `${Z}/blog`, approx: true },
        ],
      },
      {
        header: "Proof",
        variant: "detailed",
        items: [
          {
            label: "Customer stories and reviews",
            desc: "What changed for real operations",
            href: `${Z}/success-stories`,
          },
          {
            label: "ROI calculator",
            desc: "Model the case for your own fleet",
            href: `${Z}/contact/`,
            approx: true,
          },
          {
            label: "How we prove it",
            desc: "The evidence behind what we claim",
            href: `${Z}/success-stories`,
            approx: true,
          },
        ],
      },
      {
        header: "Support",
        variant: "detailed",
        items: [
          {
            label: "Help centre and training",
            desc: "Answers, troubleshooting and enablement",
            href: `${SUPPORT}/home`,
          },
          {
            label: "Product updates",
            desc: "What shipped this month",
            href: `${Z}/category/updates/`,
          },
        ],
      },
      {
        header: "Company",
        variant: "detailed",
        items: [
          { label: "Zenduit overview", desc: "Who we are and how we got here", href: `${Z}/about/` },
          { label: "Careers", desc: "Open roles across four countries", href: `${Z}/careers/` },
          { label: "Contact", desc: "Talk to a person, not a form", href: `${Z}/contact/` },
        ],
      },
    ],
    promo: {
      badge: "New",
      title: "Is your fleet ready for BC's dash cam mandate?",
      desc: "Canada's first province to require dash cams on heavy trucks, and what Bill M217 means for you.",
      href: `${Z}/bc-dashcam-mandate-bill-m217/`,
      cta: "Read the breakdown",
      img: "/coaching-call.webp",
    },
  },
  {
    label: "Partners",
    columns: [
      {
        header: "Systems we connect",
        variant: "detailed",
        items: [
          {
            label: "App Marketplace",
            desc: "Add-ons that extend the platform",
            href: `${Z}/marketplace/`,
          },
          {
            label: "OEM and device partners",
            desc: "The hardware we read and support",
            href: `${Z}/partners/`,
          },
          {
            label: "Integration partners",
            desc: "The systems we connect into",
            href: `${Z}/marketplace/`,
            approx: true,
          },
        ],
      },
      {
        header: "Work with us",
        variant: "detailed",
        items: [
          {
            label: "Become a reseller",
            desc: "Sell Zenduit in your market",
            href: `${Z}/partnership/`,
          },
          {
            label: "White-label program",
            desc: "Ship it under your own brand",
            href: `${Z}/partnership/`,
            approx: true,
          },
          {
            label: "Build with us",
            desc: "Build on the platform and the API",
            href: `${Z}/partnership/`,
            approx: true,
          },
        ],
      },
    ],
    promo: {
      badge: "For partners",
      title: "What wins fleet contracts in 2026",
      desc: "The features buyers ask for, and how the reseller program helps you win them.",
      href: `${Z}/partnership/`,
      cta: "See the program",
    },
  },
];

/** Right-hand CTA — the same primary label as the hero and the closer.
    "Get a demo" is retired: the motion is diagnose-before-demo, and a nav
    button that offers the demo first argues against it. */
export const NAV_CTA = {
  label: "Get an Operations Diagnostic",
  /* Below 640px the bar physically cannot hold the full label beside the
     wordmark and the menu toggle. The offer name is what has to survive the
     trim; the full label still appears at the foot of the mobile drawer. */
  shortLabel: "Get a Diagnostic",
  /* Same label, same destination as the hero and the closer. It used to point
     at #demo, which meant one label resolved to two different places — the
     exact collision the CTA taxonomy is supposed to remove. */
  href: "https://zenduit.com/contact/",
};
