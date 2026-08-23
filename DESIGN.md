---
name: Zenduit Homepage
description: Fleet operations platform marketing site — Linear grammar in Zenduit's skin
colors:
  ink-950: "#000714"
  ink-900: "#000f2b"
  ink-850: "#06183a"
  ink-800: "#0a1c40"
  ink-700: "#0e2247"
  ink-600: "#122b55"
  paper: "#f8fafd"
  paper-raised: "#f2f5fa"
  card: "#ffffff"
  fg: "#000f2b"
  muted: "#3d4a60"
  faint: "#66748c"
  dfg: "#e6ecf5"
  dmuted: "#a8b5cc"
  dfaint: "#6e7e9a"
  accent: "#136ab6"
  accent-hi: "#5ba0d6"
  accent-deep: "#0f569a"
  accent-deeper: "#0a406e"
  signal: "#68c8b4"
  signal-deep: "#14735f"
  warn: "#ffc466"
  warn-deep: "#8a5a00"
  alarm: "#f4674f"
  alarm-deep: "#b23a2c"
  hairline-d: "#1e3260"
  hairline-l: "#d8dee9"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.85rem, 5.2vw, 4.45rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.033em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.15rem, 3.6vw, 3.2rem)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  title-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.008em"
  lede:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  sub:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
  stat:
    fontFamily: "ui-monospace, monospace"
    fontSize: "clamp(2.4rem, 3.6vw, 3.3rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.dfg}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deeper}"
  button-ghost-dark:
    backgroundColor: "rgb(255 255 255 / 0.03)"
    textColor: "{colors.dfg}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 20px"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.md}"
  telemetry-chip:
    backgroundColor: "{colors.ink-850}"
    textColor: "{colors.dmuted}"
    rounded: "6px"
    padding: "6px 10px"
---

# Design System: Zenduit Homepage

> **Aligned to the Zenduit Marketing Collaterals Design System** (Claude Design
> project `019e2241-3384-7014-806b-bbe97abe5b3c`, read 2026-08-21). That system's
> `colors_and_type.css` is the single source of truth for palette, type,
> spacing, radii, shadows and motion; the values below mirror it. Two
> deliberate deviations are recorded in the Colors and Typography sections.

## Overview

**Creative North Star: "The Living Dashboard"**

The page is the product. Every surface behaves like a fleet console that never sleeps:
telemetry set in mono, status carried by small colored dots, panels divided by hairlines,
and one full-bleed photograph above the fold — a drone view of an active earthworks site
where a mixed fleet is working, graded into the dark world; the overhead angle is the
point, because it is the view the product itself gives you,
with a type-scrim holding the left column and exactly ONE piece of product truth over
it (the TRK-047 tracking card). The reference class's shared rule: one dominant image, type at scale,
no floating chip collage. The grammar is Linear's — quiet
neutral labels, hairline-divided panels, tight Archivo, restrained color — worn over
Zenduit's own materials: designed navy darks, warm paper lights, and a telemetry palette
drawn from the company's real brand family.

Chrome stays silent so data can speak. Color is never decoration; it marks something a
visitor can click or a vehicle's live condition. Dark sections (hero, camera showpiece,
results, closer) are cinematic moments; the light body between them carries reading and
comparison work.

**Key Characteristics:**
- Real photography where it earns its place: the brand-graded hero, Zenduit's own
  per-industry photos on the rail, and the official ZenCam product render
- Photographs ship unadorned — framed by a hairline and radius, never overlaid or
  captioned with fake UI status chrome; supporting text lives in the card body below
- Frosted glass on dark sections only: bg-ink-850/60–70 + backdrop-blur-md/xl +
  hairline-d border (hero telemetry cards, nav bar, industries cards, rail controls)
- Hairline-divided panel grammar for every feature group
- Mono voice (Chivo Mono, tabular) for every number, label, and telemetry string
- Hybrid rhythm: dark cinema at the edges, warm paper for the body
- One accent (Zenduit blue) that appears only where something acts

## Colors

A designed navy dark family, a warm paper light family, and Zenduit's extracted brand
palette used as telemetry semantics.

### Primary
- **Zenduit Blue** (#136ab6): brand accent, extracted from zenduit.com. Non-text accents,
  the followed route on maps, live selection states. Text-safe variants: **Sky** (#5ba0d6)
  on dark surfaces, **Harbor** (#0f569a) for buttons and links on light.

### Secondary
- **Signal Teal** (#68c8b4): "healthy / live" telemetry only — pulse dots, LIVE badges,
  improvement deltas, and the fleet-scene vehicle dots. Deep variant #14735f for chips
  on light cards.

### Tertiary
- **Caution Amber** (#ffc466) and **Fault Coral** (#f4674f): telemetry warning and fault
  states inside product vignettes only. Deep variants (#8a5a00, #b23a2c) for AA text on
  light chips. Never used as page decoration.

### Neutral
- **Ink family** (#000714 → #122b55): dark section backgrounds and console chrome; ink-900
  (#000f2b) is the canonical dark ground.
- **Paper family** (#f8fafd / #f2f5fa / #ffffff): light grounds and panel fills; never pure white.
- **Text on light**: fg #000f2b, muted #3d4a60, faint #66748c (all AA ≥4.5 on paper and card).
- **Text on dark**: dfg #e6ecf5, dmuted #a8b5cc, dfaint #6e7e9a (all AA ≥4.5 on ink-800→950).
- **Hairlines**: rgb(237 241 248 / 0.08) on dark, rgb(19 27 46 / 0.1) on light.

### Named Rules
**The No-Pill Rule.** Badges and labels are never pill-shaped containers. A label is
type — mono, tracked, colored if it must signal. Circles are reserved for telemetry
status dots and nothing else.

**The Color Earns Its Place Rule.** Color appears in exactly three roles: interactive
elements (links, primary CTA), the brand route/selection accent, and telemetry status dots.
Labels, icons, eyebrows, and badges stay neutral.

**The Two Gradients Rule.** Exactly two gradient moments exist on the page — the faint
top-center light in the hero and in the final CTA panel. No other gradients, ever.

## Typography

**Display Font:** Archivo (editorial grotesque — sturdy stems, tight apertures,
slightly condensed; not on any AI-monoculture font list), fallback system-ui
**Body Font:** Archivo (same family)
**Label/Mono Font:** Chivo Mono (400/500/600) — Archivo's monospace sibling from the same foundry

**Character:** Linear's precision — tight-tracked Archivo at medium-large sizes,
never oversized; paired with a telemetry mono that makes every number feel instrumented.

### Hierarchy
- **Display** (700, clamp(2.85rem, 5.2vw, 4.45rem), 1.04, -0.033em): hero h1 only —
  cinematic scale accepted by the user via live variant (2026-08-05); runs directly over
  the living fleet map, Anduril-style, never boxed into a column.
- **Headline** (600, clamp(2.15rem, 3.6vw, 3.2rem), 1.07, -0.028em): section h2.
- **Title** (600, 1.3125rem, 1.3, -0.012em): panel and card titles; title-lg
  (clamp(1.6rem, 2.4vw, 1.95rem)) for split-section h3; title-sm (600, 1.125rem)
  for compact card headings like resource cards.
- **Body** (400, 1rem, 1.5): reading copy. **Lede** 1.0625rem for section intros, **Sub**
  0.9375rem for split-section copy and card text, **Caption** 0.8125rem for footnotes and
  legal; max width ~36rem.
- **Label** (500, 0.75rem/12px, +0.08em, UPPERCASE, mono): the single mono label size —
  panel headers, provenance labels, telemetry meta, chips, table headers.
- **Stat** (500, clamp(2.4rem, 3.6vw, 3.3rem), 1, tabular, mono): results figures, metric callouts.

### Named Rules
**The Data-Emphasis Rule** (was Mono-for-Data; superseded by the DS, which specifies Inter as the only family). Every number, unit ID, timestamp, percentage, and status string
is Chivo Mono with `tabular-nums`. If it could appear in a terminal, it's mono.

**The Heading Stands Alone Rule.** Section headings carry their own weight — no decorative
eyebrow above them. Product deep-dive headings carry the module name inline in the sentence
("GPS tracking: every vehicle, live to the second"), not as a label above. The only mono
labels above content are informational: the hero live-status tagline and stat provenance.

## Layout

Max-width 75rem (1200px) container, 20px padding mobile / 32px desktop. Spacing on an 8px
grid. Feature content lives in **panels**: rounded-lg (16px) hairline-bordered containers
whose cells divide with internal 1px hairlines (`divide-x` / `divide-y`), each panel led by
a mono label header row. Section rhythm alternates deliberately: dark hero (frameless
living map under the display type) → light panels → split deep-dives → full-bleed dark
showpiece → light panels → dark results panel → light rail → quotes → dark closer panel.
Vertical section padding 80–112px; panel cell padding 24–32px. The industries rail is the
one horizontal-scroll moment (snap, edge-padded to the container line); each 236×160px
cell shows its mono playbook datum (10px, +0.08em) by default and reveals the value prop
on hover/focus — statically on touch devices.

## Elevation & Depth

Flat by default. Depth comes from hairline borders and background tint steps
(paper → paper-raised → card on light; ink-900 → ink-850 → ink-800 on dark), not shadows.

### Shadow Vocabulary
- **ambient** (`0 1px 2px rgb(19 27 46 / 0.04), 0 16px 40px -16px rgb(19 27 46 / 0.14)`):
  resting lift for app-window vignettes and cards that need separation from paper.
- **lift** (`0 2px 4px rgb(19 27 46 / 0.05), 0 24px 56px -20px rgb(19 27 46 / 0.18)`):
  reserved; hover states brighten borders instead of adding shadow.
- **console** (`inset 0 1px 0 rgb(237 241 248 / 0.07), 0 32px 80px -32px rgb(2 6 18 / 0.85)`):
  console vignettes and hardware renders only — one inset top light + deep soft drop.

### Named Rules
**The Hairline Rule.** Separation is a 1px low-alpha border before it is ever a shadow.
Hover feedback on surfaces = border brightens + background tint shifts; cards and panels
never translate or grow. (Buttons are the one exception: the primary CTA scales to 1.02 on
hover and dips 1px on press.)

## Shapes

Radius scale 8 / 12 / 16px: 8px for buttons, inputs, and small chips; 12px for cards;
16px for panels and consoles. Status chips and the NEW badge are full pills. No other
corner treatments; no zero-radius elements; no border thicker than 1px.

## Components

### Buttons
- **Shape:** rounded-sm (8px), heights 36/44/48px (sm/md/lg)
- **Primary:** Harbor blue (#0f569a) fill, near-white text (#e6ecf5), inset top highlight
  (`inset 0 1px 0 rgb(255 255 255 / 0.14)`)
- **Hover / Focus:** darkens to #0a406e and scales to 1.02 (150ms); `:active` translates
  down 1px at scale 1; global `:focus-visible` = 2px #136ab6 outline, 2px offset
- **Ghost (dark):** 1px dark hairline, rgb(255 255 255 / 0.03) fill, brightens on hover
- **Ghost (light):** 1px light hairline, transparent, tint on hover

### Chips
- **Status chips (vignettes):** pill, mono 9.5–10px, tinted fill at 15–20% + deep text
  variant of the same hue (e.g. `bg signal/15` + #14735f)
- **NEW badge:** neutral pill — hairline border + low-alpha fg tint + muted text
- **Floating telemetry chips (fleet scene):** 6px radius, ink-850/95 fill, dark hairline,
  mono 0.6875rem dmuted text with a status dot; float on the `chip-float` cycle

### Cards / Containers
- **Corner Style:** 12px (cards), 16px (panels)
- **Background:** #ffffff on light; ink-850/ink-800 on dark
- **Shadow Strategy:** none by default; ambient only for app-window vignettes
- **Border:** 1px hairline always
- **Internal Padding:** 24px, 28–32px in panels

### Inputs / Fields
Not yet built (no forms on the homepage). Follow button shape (8px) and hairline
treatment when they arrive.

### Logo
The official ZenduIT wordmark — vector paths taken verbatim from zenduit.com's header SVG
(components/ui/logo.tsx), never a text stand-in or redrawing. Fill via currentColor:
near-white (dfg) on dark grounds (their header treatment), brand blue (accent #136ab6) on
light grounds (their footer treatment). Default height 22px, w-auto; scale via height only.

### Navigation
- Sticky, ink-900; gains 80% opacity + backdrop blur + bottom hairline after 8px scroll.
- Items: 14px Inter, dmuted → dfg on hover; chevron rotates 180° on open.
- Dropdown panels: ink-850/95 + blur, 1px dark hairline, 12px radius, two mono-labeled
  columns of 13px links with 6px-radius hover tint.

### The Living Fleet Scene (signature)
The hero IS the map: a frameless abstract road network across the full hero — no window
chrome, no fake app frame. SMIL vehicle dots (signal teal, one sky blue on the followed
route) drive their routes on 24–44s loops; floating mono telemetry chips and an AI-camera
event card pin in space. SSR renders the static scene; vehicles start driving after
hydration, so the map "comes alive" right after the headline resolves. Under reduced
motion, vehicles render as static dots at fixed positions. All data is synthetic and
plausible.

### The Vignette Family (signature imagery)
Staged product UI as real DOM: app-window vignettes (chrome bar, window dots, LIVE badge,
hairline-divided feeds), console panels, and built night-road SVG frames for camera
imagery — surface fills, lane markings, light sources, and a lens vignette so clips read
as footage stills without photography. Unit IDs, km/h, fault codes, and Zen* product names
throughout. This family is the page's imagery; extend it rather than adding pictures.

### Motion (component behaviors)
- **Reveal:** scroll-triggered fade-up (opacity 0 / y 22px → resolved), once, 500ms,
  exponential ease-out `cubic-bezier(0.21, 0.47, 0.32, 0.98)`, -70px viewport margin.
  Under reduced motion the content renders static and fully visible via a post-mount swap
  (the hydration tree must match the server first).
- **CountUp:** stats animate 0 → final over 1.4s (`cubic-bezier(0.16, 1, 0.3, 1)`) on
  first view; reduced motion shows final values immediately, no in-view gating.
- **CSS loops:** marquee (46s linear, pauses on hover), pulse-dot (2.4s), chip-float (7s);
  all killed by the global reduced-motion override.

## Do's and Don'ts

### Do:
- **Do** set every number, ID, and timestamp in Chivo Mono with `tabular-nums`.
- **Do** build feature groups as hairline-divided panels with a mono label header row.
- **Do** keep icons lucide-react at 1.5px stroke, neutral-colored (muted/dmuted).
- **Do** use Zenduit's real product names (ZenCam Plus, ZenTemp, ZenDoor, ZenID, ZenTitan,
  ZenTurbo, ZenduELD, ZenduConnect) in vignettes and copy.
- **Do** respect `prefers-reduced-motion` on every animation — Reveal and CountUp resolve
  to static/final states, SMIL vehicles become fixed dots, marquee and pulse dots stop.
- **Do** keep the font tokens in a `@theme inline` block: `--font-display/sans/mono` map to
  next/font variables defined on `<html>`, and a non-inline `@theme` emits the var() chain
  onto `:root` where it cannot resolve — every font utility silently falls back to the
  system stack.
- **Do** build camera/footage imagery as night-road SVG scenes (surface fills, lane
  markings, light sources, lens vignette), never photographs.

### Don't:
- **Don't** add gradients beyond the two sanctioned moments (hero + final CTA top-light).
- **Don't** color labels, eyebrows, icons, or badges — color marks action and telemetry only.
- **Don't** use #000 anywhere. Pure #ffffff IS the DS surface colour for cards; the canvas stays the DS off-white (#f8fafd).
- **Don't** use photography or stock imagery; imagery is built product UI, SVG scenes, and
  CSS hardware.
- **Don't** put an eyebrow label above a section heading unless it carries real information;
  deep-dive headings carry their module name inline instead.
- **Don't** exceed 1px borders or add colored left-borders to cards, alerts, or list items.
