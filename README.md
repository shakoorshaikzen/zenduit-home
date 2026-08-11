# Zenduit Marketing Homepage

Production-grade marketing homepage for **Zenduit** — the fleet operations platform
(GPS telematics, AI dash cams, asset tracking, smart sensors, routing & dispatch, fuel,
maintenance, ELD). Built to the "Living Dashboard" design system: Linear's formatting
grammar in Zenduit's own materials.

## Stack

- **Next.js (App Router) + TypeScript**, static-export ready (`output: "export"`)
- **Tailwind CSS v4** — every design token is a CSS variable in
  [`app/globals.css`](app/globals.css) `@theme`
- **Motion** (`motion/react`) for scroll reveals and count-ups
- **lucide-react** icons only, 1.5px stroke
- **next/font**: Archivo (editorial grotesque) + IBM Plex Mono, self-hosted

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Structure

- `app/` — layout (fonts, metadata, design-direction contract comment), page, tokens
- `components/ui/` — Button, Container, Eyebrow, SectionHeading, Card, Logo,
  StarRating, TopoTexture, Reveal (scroll animation), CountUp
- `components/sections/` — one file per homepage section, top to bottom
- `components/vignettes/` — the hero fleet scene and the camera-showpiece safety panel.
  Any figures shown inside them are **synthetic demonstration data**, labeled in code
- `PRODUCT.md` / `DESIGN.md` / `.impeccable/design.json` — product truth and the
  design system record (any future agent or contributor should read these first)

## Accessibility & motion

WCAG AA contrast verified for every token pair in use (dark and light). Full
`prefers-reduced-motion` support: reveals render static, counters show final values,
and the marquee stops. Keyboard
navigation works across nav dropdowns, buttons, and the industries rail.

## ⚠️ Placeholders to replace before launch

Everything below is marked `[PLACEHOLDER]` in code comments. **Do not launch without
replacing these — several render as real-looking figures.**

| Item | Where | Status |
|---|---|---|
| Customer outcome metrics | `components/sections/results-band.tsx` | Fabricated percentages REMOVED; band now shows verifiable platform facts (8 products / 13 industries / 1 login). Add audited customer metrics when available |
| 3 testimonial quotes + names | `components/sections/testimonials.tsx` | Drafted — replace with approved quotes |
| 3 metric callouts beside quotes (−31%, 5→1, +11%) | `components/sections/testimonials.tsx` | Drafted — replace with audited figures |
| Customer logo usage rights | `components/sections/hero.tsx` | Seven logos verified from Zenduit's own carousel and rendered monochrome; confirm each client permits this usage/treatment |
| Integration partner chips | `components/sections/integrations.tsx` | Category names — swap for confirmed partner names |
| Six pillar one-liners | `components/sections/pillars.tsx` | Client's current site copy — sharper rewrites proposed, awaiting approval |
| Brand hexes (#2188D9 family) | `app/globals.css` | Extracted from zenduit.com — confirm with brand team |
| All nav/footer links | throughout | `href="#"` stubs — wire to real routes |

## Imagery

- `public/hero-site.webp` — **the hero.** Drone shot of an active earthworks site — a
  mixed fleet (articulated haulers, excavator, dozer, screening plant, utility pickups)
  working under one overhead view, by
  [Nikita Kachanovsky on Unsplash](https://unsplash.com/photos/EN1tF2EG-50) (Unsplash
  Licence: free for commercial use). Cropped to a 2.1:1 band and graded (desaturated,
  darkened, light navy tint) so it sits in the dark world without losing its natural
  earth tones. Chosen because the overhead perspective mirrors what the product gives
  you: your whole operation in one view.
- `public/hero-fleet.webp` — alternate: Zenduit's own fleet-lineup photograph from
  zenduit.com (their Rental & Leasing industry image), same treatment.
- `public/hero-driver.webp` — alternate hero: Zenduit's licensed driver portrait, cropped
  to a 2.4:1 band and graded the same way. Swap the `src` in
  `components/vignettes/fleet-scene.tsx`.
- ⚠️ Both hero images are Zenduit's own assets, but their stock licences were not
  verifiable from the CDN — confirm licence coverage for this placement before launch.
- `public/hero-truck.webp` — alternate hero: highway junction at dusk with semi truck, by
  [Robert Noreiko on Unsplash](https://unsplash.com/photos/qF0cxPKGQ3Y) (Unsplash License:
  free for commercial use). Mirrored, cropped, and navy-graded with ImageMagick.
- `public/hero-network.webp` — alternate: aerial interchange at night, by
  [Patrick Federi on Unsplash](https://unsplash.com/photos/XXan5vxeHPE), same treatment.
  Swap via `HERO_IMG` in `components/vignettes/fleet-scene.tsx`.
- `public/zencam-plus.webp` — **official ZenCam Plus product render from zenduit.com**
  (their own asset; closes the product-photography handoff item).
- `public/industries/*.webp` — the 13 per-industry photos are **Zenduit's own industry
  hero images from zenduit.com**, served as they publish them.
- `public/clients/*.webp` — the seven client logos from **Zenduit's own customer
  carousel**, converted to monochrome for the dark hero.
- `public/product-cargo.webp`, `public/product-facial-id.webp` — **Zenduit's own product
  marketing visuals from zenduit.com** (cargo-monitoring truck with their Load-Rate UI;
  ZenID facial-recognition frame), used in the product deep-dives.
- `public/product-live-map.webp` — **real ZenduONE dashboard screenshot from
  zenduit.com** (Maps view), used in the GPS deep-dive.
- `public/coaching-call.webp` — **Zenduit's real in-cab coaching visual from
  zenduit.com**, used in the camera showpiece.
- `public/zendoor.webp`, `public/zenid.webp` — **official hardware renders from
  zenduit.com**, used with the ZenCam render in the platform hardware strip.

## Design-direction contract

The root layout emits an HTML comment (first child of `<body>`) recording the design
thesis, world, story, first-viewport composition, and finish condition. It survives the
production build — `grep THESIS out/index.html` to audit.
