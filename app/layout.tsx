import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/* Archivo — grotesque drawn for editorial headlines: sturdy stems, tight
   apertures, slightly condensed. Engineered character rather than the neutral
   SaaS default, and absent from every AI-monoculture font list. */
/* Inter is the ONLY typeface in the Zenduit system — display, body, UI and
   numerals. Weights 300-800 per the brand README; no secondary or display
   family, and --font-mono resolves to the generic ui-monospace stack. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

/*
 * CRAWL SWITCH — read this before launch.
 *
 * Set NEXT_PUBLIC_SITE_URL to the production origin (https://zenduit.com/...)
 * and this page becomes indexable with a canonical pointing at it. Leave it
 * unset and the build ships `noindex`, because a staging origin that Google
 * can reach competes with the real site for its own keywords and splits every
 * bit of SEO equity the page earns. One variable, one switch, no other code
 * path depends on it.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const isPublic = Boolean(SITE_URL);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL ?? "https://zenduit-home.vercel.app"),
  title: "Zenduit: Operational Intelligence for Complex Operations",
  description:
    "Your operation does not need more alerts. ZenduONE connects the systems, people, vehicles and equipment behind your operation to identify what matters, coordinate the response and measure the result.",
  alternates: { canonical: "/" },
  robots: isPublic
    ? { index: true, follow: true }
    : { index: false, follow: false },
  /* Shared links used to render as a bare URL with no title, description or
     image. The card image is the hero's own frame, unadorned. */
  openGraph: {
    type: "website",
    siteName: "Zenduit",
    title: "Zenduit: Operational Intelligence for Complex Operations",
    description:
      "Your operation does not need more alerts. It needs to know what to do next.",
    url: "/",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Aerial view of an active earthworks site with a mixed fleet working",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenduit: Operational Intelligence for Complex Operations",
    description:
      "Your operation does not need more alerts. It needs to know what to do next.",
    images: ["/og-cover.jpg"],
  },
};

export const viewport: Viewport = {
  /* ink-900 — the canonical dark ground, matching the nav the browser chrome
     sits against. */
  themeColor: "#000f2b",
};

/*
 * Organization schema only. Product and FAQ schema can follow once there are
 * product/FAQ pages to describe, and Review schema stays off the site until a
 * verified, permissioned customer result exists to mark up — structured data
 * for an unverified testimonial is the same claim with a machine reading it.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zenduit",
  url: "https://zenduit.com/",
  description:
    "Operational intelligence for complex fleet, equipment and frontline operations.",
  sameAs: [
    "https://www.linkedin.com/company/zenduit/",
    "https://www.youtube.com/@zenduit6752",
    "https://www.instagram.com/zendu.it/",
    "https://www.facebook.com/Zenduit",
  ],
};

const directionContract = `<!--
THESIS: The OPERATOR is the hero. The page opens on the tension they live with
(more alerts than answers), shows the coordination work disappearing, and ends on
them back in control. The console appears in the middle of that story as the
mechanism, never as the object of admiration. Refuses both the stock-photo-truck
feature grid of fleet marketing AND the dashboard-as-centerpiece it replaced.
OWN-WORLD: Linear's grammar in Zenduit's skin: designed navy (#000f2b family) dark
moments, cool paper body, hairline-divided panels, Inter (optical) display set tight,
mono voice for every number and label; color appears only on interactive elements,
the primary CTA, and telemetry status dots; topographic hairline texture in dark
sections; 8/12/20 radii.
STORY: An operations leader recognizes their own week in the first line, walks Today
without asking anyone's permission, sees three flagship playbooks proven rather than
thirteen promised, and books an Operations Diagnostic.
FIRST VIEWPORT: Left, the market tension at display scale, the turn beneath it, one
supporting sentence, the See/Understand/Act/Measure/Improve mechanism, then Get an
Operations Diagnostic + See how it works with "no form" said out loud; the hero is a
full-bleed graded aerial of a working site with ONE piece of product truth over it
(the Today card); bottom edge, the customer logo strip.
CLAIMS: no number, quote or metric on this page without a source line or a stated
mechanism behind it. Proof is a baseline and a measured result, never a percentage
written for layout.
FORM: User-pinned direction (2026-08-04): Linear formatting/polish/look, hybrid
dark-light per user choice, Samsara section parity; supersedes seed roll. Messaging
realigned to the Aug 2026 Brand/Product/GTM operating system (2026-08-31).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, and DESIGN.md.
-->`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <span hidden aria-hidden dangerouslySetInnerHTML={{ __html: directionContract }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent-deep focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
