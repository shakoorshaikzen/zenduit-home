# Claude Code — Zenduit Homepage Rebuild Kit

Two parts: **(1) skills to install first**, **(2) the prompt to paste into Claude Code**.

---

# Part 1 — Install These Skills First

These load design judgment into Claude Code before it writes a line of code. The first two matter most.

| Skill | What it does for you | Priority |
|---|---|---|
| **frontend-design** (Anthropic official) | The anti-"AI look" skill. Pushes distinctive typography, bold non-default palettes, asymmetric composition, layered depth — and explicitly avoids generic system fonts, predictable purple gradients, and cookie-cutter components. 867k+ installs, Anthropic-verified. | Must have |
| **webapp-testing** (Anthropic official) | Lets Claude Code drive Playwright: run the site, take screenshots at multiple viewports, see its own work, and iterate. This self-review loop is the single biggest quality multiplier. | Must have |
| **web-artifacts-builder** (Anthropic official) | Patterns for complex React/TypeScript single-page builds. Useful supporting context for a rich marketing page. | Nice to have |
| **theme-factory** (Anthropic official) | Consistent color/type theming utilities. Optional. | Nice to have |
| **Custom: `zenduit-brand`** | A small skill you create containing your design system: brand hexes, fonts, logo rules, spacing/radius tokens, voice. Claude Code then applies YOUR system automatically instead of inventing one. I can generate this file for you from your design system — just share it. | High value |

### Install commands (run inside Claude Code)

```
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

The `example-skills` bundle includes `frontend-design`, `webapp-testing`, `web-artifacts-builder`, and `theme-factory`. The standalone **Frontend Design** plugin is also in the official directory (claude.com/plugins/frontend-design) — installable from the `/plugin` marketplace browser.

**Manual alternative** (project-scoped, no plugin system):

```
git clone https://github.com/anthropics/skills /tmp/skills
mkdir -p .claude/skills
cp -r /tmp/skills/skills/frontend-design .claude/skills/
cp -r /tmp/skills/skills/webapp-testing .claude/skills/
```

Restart Claude Code after installing so the skills register. The prompt below explicitly tells Claude to use them.

---

# Part 2 — The Prompt

Copy everything below this line into Claude Code (ideally in a fresh project directory, and consider running it in plan mode first so you can approve the approach).

---

Build a complete, production-grade marketing homepage for **Zenduit** (current site: https://zenduit.com/) — a fleet management platform unifying GPS fleet telematics, AI dash cameras & video safety, asset tracking & monitoring, smart fleet sensors & alerts, routing & dispatch, fuel management, maintenance, and ELD compliance. Audience: fleet managers, ops directors, and safety leads — practical, ROI-driven, non-technical. Conversion: demo-led ("Get a Demo" primary, "Check Our Prices" secondary).

**Use the `frontend-design` skill for every design decision, and the `webapp-testing` skill to screenshot and critique your own output** (workflow defined at the end). The quality bar is a site indistinguishable from one shipped by Linear's or Ramp's design team.

## Tech Stack

- **Next.js (App Router) + TypeScript**, static-export friendly
- **Tailwind CSS v4** with all design tokens defined as CSS variables in the theme (colors, radii, spacing, type scale) — no magic values inline
- **Motion (framer-motion)** for all animation
- **lucide-react** for iconography — one icon set only, consistent 1.5px stroke
- Fonts via `next/font` (self-hosted, no layout shift)
- Component structure: one file per section in `components/sections/`, shared primitives (Button, Container, Eyebrow, SectionHeading, Card) in `components/ui/`

## Reference Sites — Exact Element Mapping

Study these; each contributes one specific ingredient. Do not blend into a mashup — the synthesis below is the single voice.

1. **Linear — https://linear.app** → overall design language and simplicity: typographic precision, restrained color, generous whitespace, calm section rhythm, hairline borders, zero clutter. This is the polish bar for the whole page.
2. **Anduril — https://www.anduril.com** → visual layout of the hero and hardware moments: cinematic, full-bleed, dark, stark oversized headlines, hardware that looks state-of-the-art.
3. **Stripe — https://stripe.com** → visual layout and message clarity: a category-defining headline in ~5 words, one signature animated gradient accent used sparingly, disciplined grid.
4. **Attio — https://attio.com** → format: the product UI itself is the visual star — staged, beautifully-rendered dashboard interfaces in hero and feature sections (built as real DOM, not images).
5. **Ramp — https://ramp.com** → animations: scroll-triggered staggered reveals, stat count-ups, smooth logo marquee, snappy hover micro-interactions.
6. **ArcBest — https://www.arcb.com** → structure: dark navy hero with subtle topographic line texture, multi-CTA hero, dark-hero→light-body page flow, clean audience segmentation.
7. **project44 — https://www.project44.com** → structure: a living, animated map/data visualization as the hero — the product demos itself before any click.
8. **Motive — https://gomotive.com** → structure: how a fleet competitor composes dashcam hardware + dashboard software in one hero and sequences sections for fleet buyers. Match the logic, beat the craft.

Competitive bar (context only): **Samsara — https://www.samsara.com** — make Zenduit feel one generation more modern than this.

## Art Direction (the single voice)

**"Linear's restraint, Anduril's cinematic darkness, Stripe's clarity — applied to fleet operations."** Dark cinematic hero containing a living fleet-telemetry animation and staged product UI, one restrained gradient accent, transitioning into clean light content sections, animated with Ramp's motion vocabulary. One type system, one accent language, one motion vocabulary, top to bottom.

### Design tokens

- **Palette:** near-black navy base for dark sections (not pure black, not gray-800 — a designed dark like `#0A0F1E`-family), warm off-white for light sections (not pure `#FFF`), ONE brand accent drawn from Zenduit's existing brand blue (extract from the logo/site at zenduit.com; use a placeholder token `--accent` and note it for replacement), plus a single supporting signal color for telemetry moments (e.g. a green for "healthy/live"). Semantic tokens only. No purple-to-blue defaults.
- **Typography:** display = a characterful grotesk (pick one: Space Grotesk, Bricolage Grotesque, or Instrument Sans — NOT plain Inter for headlines), tight tracking (-2% to -4%) on display sizes; body = Inter or Geist; **mono accent = IBM Plex Mono or Geist Mono for all telemetry data, stats, labels, and eyebrows** (`font-feature-settings: tabular-nums`) — this mono-for-data detail is what makes an ops product feel technical and credible. Max 2 families + mono. Full modular type scale.
- **Surfaces:** hairline 1px low-alpha borders (Linear-style) instead of heavy shadows; one soft ambient shadow tier for lifted cards; consistent radius scale (e.g. 8/12/16); subtle noise or topographic SVG line texture in dark sections (ArcBest) at very low opacity.

## Page Build — Section by Section (use this real content; never invent lorem ipsum)

**1. Announcement bar** (dismissible, one line): "New: ZenduELD is here — one less disconnected tool →"

**2. Nav** — slim, sticky, translucent blur on scroll (Linear). Items: Products, Solutions, Industries, Resources, Company + persistent primary "Get a Demo" button and quiet "Check Our Prices" link. Simple dropdown stubs are fine; do not build full mega-menus.

**3. HERO — the most important section on the page.** Must pass a 5-second test with zero scrolling: what Zenduit is (one platform to run an entire fleet), why it matters (safer drivers, fewer surprises, lower costs), the value (see everything live, act before problems get expensive).

- Eyebrow (mono, uppercase, tracked): "MEASURE · MONITOR · MANAGE"
- Headline (~8 words max, Stripe clarity — pick the strongest): "The AI-Powered Fleet Operations Platform" / "Your Entire Fleet. One Living Dashboard." / "See Every Vehicle. Stop Every Surprise."
- Subhead (one sentence): "GPS tracking, AI dash cams, dispatch, maintenance, and ELD compliance in one platform — so your fleet is safer, cheaper to run, and never a mystery."
- CTAs: primary "Get a Demo", secondary/ghost "Check Our Prices"
- **Hero visual — build it, don't fake it with an image:** a living fleet-ops scene on the dark background. Custom SVG/DOM animation: a stylized dark map (abstract road network as SVG paths, ArcBest topographic texture behind) with 4–6 vehicle dots animating along the paths (Motion `offsetPath` / SVG path animation), small telemetry cards popping in and out (mono font: "TRUCK-047 · 62 km/h · Fuel 71%", "ENGINE FAULT · P0217 · Unit 112"), and one AI-camera safety-event card with a tiny mock video frame ("Harsh braking detected · Coached"). Compose it with a staged slice of a Zenduit-style dashboard UI built as real DOM (Attio) — sidebar, live map panel, event feed. Entrance choreography: headline resolves first (fade+rise, 300ms stagger), UI panel slides in, then the map animates alive. Loop the telemetry subtly forever.
- In-fold proof: auto-scrolling logo marquee (Ramp) — Emirates, Oregon Department of Transportation, Nevada DOT, City of Columbus, San Antonio Water System, Texas Instruments, Tolko, AECon, Speedy — rendered as styled text wordmarks (consistent grayscale treatment, since we lack logo files) + compact 5-star badges: G2, Capterra, Trustpilot, Google.

**4. Six solution pillars** — two Linear-style triads with consistent icons. Triad A "Run the fleet": **Measure** ("Gain insights to improve performance and make better decisions"), **Monitor** ("Keep track of your fleet's health, operations, and activity in real time"), **Manage** ("Simplify daily tasks and streamline your fleet workflows"). Triad B "Protect the bottom line": **Reduce Risk** ("Identify potential issues early to ensure your fleet stays safe"), **Reduce Complexity** ("Make operations simple with automated and smart processes"), **Reduce Costs** ("Save time, money, downtime, and valuable resources with ease").

**5. Product deep-dives** — alternating split sections (Attio format), each with a staged product-UI vignette built in DOM: **GPS Fleet Tracking** (live map UI), **Asset Tracking & Monitoring** (asset list + status chips), **Smart Fleet Sensors & Alerts** (alert feed UI). Then **AI Cameras & Video Safety gets the showpiece**: a full-bleed dark cinematic band (Anduril) — dramatic headline, a CSS-built dashcam device render (gradients/borders, no stock photo), event thumbnails, safety-score UI. Close with a compact module row: Routing & Dispatch · Maintenance · Fuel Management · ELD · Forms.

**6. Results band** — dark panel, Ramp-style count-up stats in mono with tabular-nums: "[X]K vehicles connected · [X]% fewer safety incidents · [X]% lower fuel costs · [X] hrs saved weekly" — clearly marked `[PLACEHOLDER]` in code comments for real figures.

**7. Industries** — all 13 as a clean interactive grid or horizontal rail (ArcBest segmentation): Construction · Transportation & Logistics · Utilities & Field Services · Public & School Transportation · Forestry · Waste Management · Rental & Leasing · Public Works & Winter Ops · Government · Healthcare & Emergency Response · Airports & Security · Agriculture · Food & Pharmaceutical. Hover state reveals a one-line value prop per industry.

**8. Testimonials + reviews** — quote cards (Elma A., Michael H., Transportation PH — write realistic fleet-manager quotes marked `[PLACEHOLDER — replace with real quote]`) beside the four 5-star platform ratings.

**9. Integrations & expandability** — brief band: ZenduConnect + open-platform integrations, restrained logo/chip grid.

**10. Resources** — three cards: webinar "One Less Disconnected Tool: ZenduELD is Here", webinar "New Maintenance Module: Same Platform, Faster Path from Fault Code to Fixed", blog "New Product Updates".

**11. Final CTA** — dark panel bookending the hero (same texture + gradient accent): "Track Smarter, Not Harder" + "Get a Demo" / "Check Our Prices".

**12. Footer** — full sitemap: Solutions, Products, Resources, Company, Support, Careers, Become a Partner, Contact, legal, socials.

## Motion Spec (Ramp vocabulary, Motion library)

Scroll-triggered staggered fade-up reveals (`whileInView`, once, 40–60ms stagger, 500ms ease-out); stat count-ups on first view; continuous CSS-transform logo marquee (pause on hover); hover lift + hairline glow on cards; subtle scale (1.02) on primary CTAs; gentle parallax on hero map layers; transform/opacity only, 60fps; **full `prefers-reduced-motion` support** — everything visible and static, marquee stopped, counters at final values.

## Anti-"AI-Look" Rules (hard requirements)

1. No emoji as icons — lucide-react only, one stroke weight.
2. No purple/violet gradients, no rainbow mesh blobs, no glassmorphism cards. One brand-accent gradient, used exactly twice (hero + final CTA).
3. Vary section rhythm — never three identical 3-column card grids in a row. Alternate: split layouts, full-bleed bands, offset grids, a rail.
4. No pure `#FFF`/`#000`; designed neutrals. Dark sections get depth from hairline borders + subtle tint layers, not elevation-gray cards.
5. Typographic craft: tight-tracked display, `text-balance` on headlines, `tabular-nums` on all numbers, real quotes ("") in testimonials, no widowed words in headlines.
6. All product UI vignettes are real DOM with plausible fleet data (unit numbers, km/h, fault codes, driver names) — never gray placeholder rectangles, never stock screenshots.
7. No stock photography at all. Hardware is CSS/SVG-rendered; scenes are built, not pasted.
8. Buttons/links: designed hover + active + `focus-visible` states, cursor feedback, no default browser blue anywhere.
9. Spacing on a strict 8px grid; consistent max-width container (~1200px); dark→light section transitions deliberate (no abrupt background jumps).
10. Copy: every headline passes the "could a competitor claim this too?" test — concrete over buzzwords. No "Unlock", "Empower", "Seamlessly", "Revolutionize".

## Self-Review Loop (do this before calling it done)

1. `npm run dev`, then use the **webapp-testing** skill (Playwright) to screenshot at **1440px, 768px, and 390px** widths — full page plus a dedicated above-the-fold shot at 1440×900.
2. Critique your own screenshots against: the 5-second hero test, the reference-site mapping, and every Anti-AI-Look rule. Write the critique, then fix.
3. Repeat for **at least 3 iterations** — expect the first pass to be mediocre; the gap between pass 1 and pass 3 is the point.
4. Check: zero console errors/warnings, keyboard-only navigation works, `prefers-reduced-motion` verified, semantic heading order (one `h1`), alt text, WCAG AA contrast in both dark and light sections, Lighthouse ≥ 90 performance and accessibility.
5. Final deliverable: running app + README (setup, where `[PLACEHOLDER]` items live: brand hex, stats, quotes, real logos/screenshots to swap in).

## Acceptance Checklist

- Hero passes the 5-second what/why/value test with zero scrolling, and the fleet map is alive.
- "Get a Demo" + "Check Our Prices" in nav, hero, and final CTA.
- All 12 sections present; all 6 pillars, all 13 industries, all 4 product families, testimonials, 4 review badges, integrations, resources, "Track Smarter, Not Harder" closer.
- Each reference influence is traceable on the page (Linear polish, Anduril cinema, Stripe clarity, Attio UI staging, Ramp motion, ArcBest structure, project44 living map, Motive composition).
- One coherent system hero→footer, in Zenduit's brand direction, AA contrast, flawless at 390/768/1440, reduced-motion safe.