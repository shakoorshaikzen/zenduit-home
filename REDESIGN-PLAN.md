# Zenduit Homepage Redesign Plan

_Drafted 2026-08-17, from stakeholder critique (Vishal + team) and the 2026-08-17
competitive research (Samsara rebrand, Motive/Geotab/Verizon Connect scan,
engagement-pattern study)._

## The mandate

The homepage stops being a catalogue. It answers exactly four questions, in order:

1. **What does Zendu represent?**
2. **What outcomes does it create for customers?**
3. **Who is it for?**
4. **What proof exists that it works?**

Specs, hardware imagery, camera demos, platform detail, and pricing move to
dedicated pages a visitor chooses to open. What stays must be bold, large-scale,
varied section-to-section, and interactive — the qualities Vishal singled out in
the original design and the ZenTag site.

## Target homepage structure (8 sections)

| # | Section | Answers | Status in codebase |
|---|---------|---------|--------------------|
| 1 | **Brand-led hero** — living site video, one representation line, outcome subhead, primary CTA | Q1, Q2 | HAVE — refine copy: add a "what Zendu represents" line; keep video + Get a Demo |
| 2 | **Problem → outcome** — the operational pain (blind fleet, five tabs, surprise breakdowns) and what changes; zero feature detail | Q2 | BUILD — new dark cinematic band; absorbs the energy of the removed camera showpiece |
| 3 | **Customer validation** — logos, testimonial, case-study preview + link to full story | Q4 | TRANSFORM — merge hero logo strip + Testimonials into one band; link to zenduit.com/success-stories until a native case-study page exists |
| 4 | **High-level capabilities** — five outcome categories, not a catalogue | Q2, Q3 | HAVE — the new 5-tab Platform Explorer is exactly this |
| 5 | **Interactive industries** — ZenTag-style scroll interaction; one delivered result per industry | Q3 | REBUILD — the big engagement moment (see below) |
| 6 | **Brand/platform story** — the Zendu ecosystem told conceptually: ZenduONE, open Geotab ecosystem, ZenduConnect, hands-on service | Q1 | TRANSFORM — evolve Integrations section from logo grid to narrative |
| 7 | **Conversion** — Book a demo / Contact sales / Explore solutions, visually dominant | — | HAVE — amplify FinalCta: larger scale, add "Explore solutions" tertiary path |
| 8 | **Navigation** — full menu linking to dedicated product / industry / case-study / spec / pricing pages | routing | EXTEND — mirror zenduit.com taxonomy (Astra menu work) so every deferred detail has a destination |

**Removed from homepage:** camera showpiece (→ video-safety page), Resources
grid (→ nav/footer), results-band stat tiles (returns inside §3 the day real
numbers arrive), any remaining spec-level copy.

## The industries scrollytelling (§5 — Vishal's favorite)

The one authored scroll moment on the page (everything else stays calm):

- Sticky split-frame: left column pins while industry stories scroll through —
  construction site, school bus, cold chain, waste route, government yard —
  each frame swapping Zenduit's real industry photography with a mono outcome
  line per industry ("Cold chain: every reefer in range, provably").
- 5–6 featured industries as scroll frames; all 13 in a compact index row below
  linking to industry pages.
- Built on scroll-driven CSS/IntersectionObserver like the existing Reveal
  system; fully degraded under reduced-motion (static stacked cards).

## Dedicated pages (unblocks the homepage diet)

Phase-in order: `/solutions/<x>` (5, mirroring explorer tabs) → `/industries/<x>`
(13) → `/customers` (case studies) → `/pricing`. Until each exists, homepage
links point to the matching live zenduit.com page — never to a dead anchor.

## Asset gate (unchanged, now critical-path)

§3 and any stat tiles require from marketing: the four verified results figures,
approved quotes with names/roles, and licensed customer logos. Absolutely no
invented numbers — the page ships proof-shaped sections only when proof arrives.

## Execution phases

- **P1 — Diet + rhythm (1 session):** remove showpiece/resources from the page,
  hero "represents" line, problem→outcome band, conversion amplification.
- **P2 — Validation band (0.5 session + assets):** logos/testimonial/case-study
  preview; ships behind the asset gate.
- **P3 — Industries scrollytelling (1–2 sessions):** the signature interactive.
- **P4 — Ecosystem story (0.5 session):** conceptual Zendu narrative.
- **P5 — Dedicated pages (ongoing):** solutions first, then industries.
- **P6 — Finish:** /impeccable polish + finish review, a11y + perf audit
  (LCP on the hero video, image lazy-loading), analytics events on explorer
  opens, industry-frame views, and CTA clicks to measure engagement.

## Success criteria

- Homepage word count stays under ~800 (Samsara's bar); no section over 50.
- Every visitor question (represent / outcomes / who / proof) answered within
  one viewport of its section.
- At least two genuinely interactive moments (explorer, industries) with
  measured interaction rates; demo-CTA click-through as the north star.
- Design system intact: Linear grammar, Zenduit skin, mono telemetry voice,
  reduced-motion parity everywhere.
