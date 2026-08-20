import type { Metadata, Viewport } from "next";
import { Archivo, Chivo_Mono } from "next/font/google";
import "./globals.css";

/* Archivo — grotesque drawn for editorial headlines: sturdy stems, tight
   apertures, slightly condensed. Engineered character rather than the neutral
   SaaS default, and absent from every AI-monoculture font list. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/* Chivo Mono — the monospace sibling of Archivo's grotesque family
   (Omnibus-Type): same skeleton as the display face, so labels and telemetry
   read as one voice with the headlines rather than a borrowed terminal font. */
const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-chivo-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenduit: Your Entire Fleet. From Signal to Done.",
  description:
    "Operational intelligence for fleet and equipment operations. ZenduONE surfaces what matters, coordinates the response and measures the result.",
};

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
};

const directionContract = `<!--
THESIS: The dashboard is the hero — a live fleet console proves "see everything, act early"
before any claim is made; refuses the stock-photo-truck + feature-grid template of fleet marketing.
OWN-WORLD: Linear's grammar in Zenduit's skin — designed navy (#0A0F1E family) dark moments,
warm paper body, hairline-divided panels, Inter (optical) display set tight, Chivo Mono for
every number and label; color appears only on interactive elements, the primary CTA, and
telemetry status dots; topographic hairline texture in dark sections; 8/12/16 radii.
STORY: A fleet manager sees their whole operation alive in one screen, believes surprises are
preventable, and books a demo.
FIRST VIEWPORT: Left — quiet mono eyebrow, two-line display headline, one-sentence subhead,
Get a Demo + Check Our Prices; the hero itself is a frameless living fleet map (vehicles
driving routes, floating telemetry callouts, AI-camera event card) — no fake app window;
bottom edge — grayscale customer marquee + monochrome review badges.
FORM: User-pinned direction (2026-08-04): Linear formatting/polish/look, hybrid dark-light
per user choice, Samsara section parity; supersedes seed roll.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review,
the verdict, and DESIGN.md.
-->`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${chivoMono.variable}`}>
      <body className="font-sans">
        <span hidden aria-hidden dangerouslySetInnerHTML={{ __html: directionContract }} />
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
