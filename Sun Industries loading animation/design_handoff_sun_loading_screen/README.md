# Handoff: Sun Industries Loading Screen

## Overview
An animated brand loading screen for Sun Industries. A hairline horizon draws
across a warm off-white ground, a louvred gold sun disc assembles and rises
behind the wordmark, SUN INDUSTRIES reveals letter by letter, then the screen
holds in a "loading" state — a specular gold glare sweeping through the letters
and a scanning progress bar — until loading finishes, at which point the type
lifts away and the disc sinks back below the horizon.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes
showing the intended look and motion, not production code to copy directly.

Two files are included and they serve different purposes:

- `Sun Industries Loader.dc.html` + `sun-piece.jsx` + `animations-v3.jsx` —
  the original design prototype. It runs on a timeline/scrubbing engine built
  for design review and video export. **Do not ship this.** Use it only to watch
  the intended motion and read exact values.
- `loader-reference.html` — a dependency-free, self-contained implementation of
  the same design (plain HTML + CSS + ~80 lines of vanilla JS, no React, no
  build step). This is the one to port. It exposes the real production API the
  prototype does not have: an indefinite loading hold plus a `finish()` call.

The task is to recreate this in the target codebase's existing environment
(React, Vue, SwiftUI, native) using its established patterns. If there is no
environment yet, `loader-reference.html` can be dropped in essentially as-is.

## Fidelity
**High-fidelity.** Colors, typography, geometry, and timing below are final.
Recreate them exactly.

## Critical difference between the prototype and production
The prototype is an 8-second seamless **video loop** — it plays the whole story
including the exit, then restarts. A real loading screen cannot do that: it must
hold in the loading state for an unknown duration and only run the exit when the
app is ready.

Production sequence:

| Phase | Duration | Behavior |
|---|---|---|
| Intro | 0 → 4.4s, plays once | Horizon draws, disc assembles and rises, wordmark reveals |
| Loading hold | indefinite, loops | Glare sweep (1.6s cycle) + scan bar (1.6s cycle). Sun stays up. |
| Exit | 0.8s, on `finish()` | Letters lift, disc sinks, horizon retracts |

Never cut from the intro straight to the exit — if the app is ready before 4.4s,
let the intro finish (or hold at least ~0.6s of the loading state) so the reveal
does not read as a glitch. A minimum total display time of ~2.4s is recommended.

## Layout
Authored on a **1920 × 1080** canvas, scaled uniformly to fit the viewport
(`transform: scale()` on a fixed-size stage, centred). All values below are in
authored 1920×1080 pixels.

| Element | Geometry |
|---|---|
| Horizon rule (primary) | `left: 200, top: 720, width: 1520, height: 3`, ink, `transform-origin: 50% 50%`, animated via `scaleX` |
| Horizon rule (secondary) | `left: 200, top: 766, width: 1520, height: 1`, ink at 18% opacity, `scaleX` × 0.86 |
| Edge ticks (×2) | `width: 2, height: 52`, gold, centred at `x: 960, top: 694`, translate ±`progress × 760px` |
| Dawn glow | `left: 660, top: 716, width: 600, height: 5`, `linear-gradient(90deg, transparent, gold, transparent)`, `blur(3px)` |
| Sun disc | 472 × 472 circle, centred at `x: 960`. Rises from `cy: 1020` to `cy: 588`. Clipped by a mask spanning `top: 0 → 720` so it never appears below the horizon. |
| Outline ring | circle of diameter 540 (disc + 34px on each side), `1px solid` ink at 24% opacity, concentric with the disc |
| Wordmark | flex row, centred, `top: 472`, each glyph in a `148px`-tall `overflow: hidden` cell |
| LOADING label | `left: 200, top: 816` |
| Scan track | `left: 200, top: 858, width: 1520, height: 2`, ink at 12% opacity |
| Scan thumb | `width: 240, height: 2`, gold, translates `0 → 1280px` over 1.6s, loops |

### The louvred sun disc
The disc is not a plain circle. It is a stack of horizontal gold bars inside a
circular clip — dense and near-solid at the crown, dissolving into finer bars
with wider gaps toward the horizon. Generate the rows with this exact loop
(R = 236):

```js
const rows = [];
let y = 0, i = 0;
while (y < R * 2) {
  const t = y / (R * 2);
  const h = 3 + 15 * (1 - t) * (1 - t);   // bar height: 18px at top → 3px at bottom
  rows.push({ y, h, i });
  y += h + 2 + 20 * t * t;                 // gap: 2px at top → 22px at bottom
  i += 1;
}
```

Each row is `position: absolute; left: 0; width: 100%; height: h; top: y`,
background gold, and animates in with `scaleX(0 → 1)` from
`transform-origin: 50% 50%`. Rows stagger **bottom row first** (delay =
`(rows.length - 1 - i) × 0.045s`) so the disc assembles upward as it rises.

## Typography
- Family: **Archivo** (Google Fonts), weight **500**. Fallback: Helvetica Neue, Helvetica, sans-serif.
- Wordmark: `font-size: 94px`, `letter-spacing: 0.3em`, `line-height: 1`.
  Because trailing letter-spacing adds a gap after the last glyph, each glyph
  also carries `padding-left: 0.3em` and the word-space is a fixed `52px` box —
  this keeps the lockup optically centred. Do not replace this with a single
  text node plus letter-spacing; the per-letter animation requires per-glyph elements.
- Ink is **not flat black**. Each glyph uses a clipped gradient for depth:
  ```css
  background-image: linear-gradient(178deg, #0C0E12 0%, #2C313A 46%, #14161A 74%, #05060A 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  ```
- LOADING label: monospace stack (`ui-monospace, "SF Mono", Menlo, monospace`),
  `22px`, `letter-spacing: 0.42em`, ink. Text is `LOADING` plus 1–3 animated dots
  cycling at 2.4 Hz.

## Interactions & Behavior

### Wordmark reveal (intro)
Per glyph, staggered by `i × 0.065s`: `translateY(122% → 0)` over 0.8s with
`easeOutQuart`, plus `scale(1.05 → 1)` over 0.9s. The parent cell has
`overflow: hidden`, so the letter appears to rise out of a slot.

### Glare sweep (loading hold) — the signature effect
A specular highlight travels through the letterforms on a **1.6s** loop.
Implemented as a second copy of each glyph absolutely positioned over the base
glyph, with a gold gradient clipped to the text:

```css
background-image: linear-gradient(104deg, #B9821A 0%, #E8B93F 34%, #FBF0C6 50%, #E8B93F 66%, #B9821A 100%);
background-size: 260% 100%;
-webkit-background-clip: text; background-clip: text; color: transparent;
```

Two things animate together off one 0→1 phase value per cycle:
1. `background-position-x = (1 - phase) × 100%` — moves the cream hot-spot
   through each glyph, so the highlight has internal travel, not just a fade.
2. The overlay's opacity is a travelling Gaussian envelope across the word:
   ```js
   const head = -0.25 + 1.5 * phase;          // sweep head, in word-fraction units
   const d = (i / (letters.length - 1) - head) / 0.12;
   const opacity = Math.exp(-d * d);          // per glyph
   ```
   The 0.12 constant is the sweep width — smaller is a tighter, more jewel-like
   glint; larger washes the whole word. Do not exceed ~0.2.

The glare fades in over 0.7s as the loading hold begins and fades out over 0.35s
when `finish()` is called.

### Exit (on `finish()`)
- Letters: `translateY(0 → -128%)` over 0.4s, `easeInQuart`, staggered `i × 0.02s`.
- Disc rows: `scaleX(1 → 0)` over 0.45s, staggered `i × 0.008s`, top row first.
- Disc: sinks 432px over ~0.7s, `easeInQuart`.
- Horizon: `scaleX(1 → 0)` over 0.6s.
- Ring: fades out over 0.5s.
All exits complete within 0.8s; the container can then be unmounted or faded.

### Easing
Only three curves are used anywhere in the piece. Keep it that way.

| Name | Use | CSS equivalent |
|---|---|---|
| `easeOutCubic` | the sun's rise, glow/ring fade-ins | `cubic-bezier(0.215, 0.61, 0.355, 1)` |
| `easeOutQuart` | letter reveal, horizon draw, bar assembly | `cubic-bezier(0.165, 0.84, 0.44, 1)` |
| `easeInQuart` | every exit | `cubic-bezier(0.895, 0.03, 0.685, 0.22)` |

### Responsive behavior
Scale the whole 1920×1080 stage uniformly — never reflow the composition.
`scale = min(vw / 1920, vh / 1080)`. Recompute on `resize` and after
`document.fonts.ready` (the wordmark's width depends on Archivo having loaded).
Below ~600px wide the LOADING label and scan bar may be dropped; keep the
horizon, disc, and wordmark.

### Reduced motion
Under `@media (prefers-reduced-motion: reduce)`, render the settled loading
frame statically — disc up, wordmark in place, LOADING label visible — with no
glare sweep, no scan travel, and no dot cycling.

## State Management
Three states: `intro` → `loading` → `exiting` → unmounted.

```js
const loader = SunLoader.mount(document.body);
// ... app boots, assets load ...
await loader.finish();   // resolves once the 0.8s exit has played
loader.destroy();
```

Enforce the minimum display time inside `finish()` rather than at the call site,
so callers cannot accidentally flash the loader. `loader-reference.html`
implements this (`MIN_VISIBLE = 2.4s`).

Animation is driven from a single `requestAnimationFrame` clock and one elapsed
time value — every visible property is a pure function of that time. Keep this
model when porting: it makes the whole screen deterministic and testable, and it
is why the design has no drift between the glare and the scan bar.

## Design Tokens
| Token | Value | Use |
|---|---|---|
| `--ground` | `#F4F2ED` | Page background (warm off-white) |
| `--ink` | `#16181C` | Horizon rules, LOADING label, ring |
| `--sun` | `#D9A21B` | Disc bars, edge ticks, scan thumb, glare base |
| Ink gradient | `#0C0E12`, `#2C313A`, `#14161A`, `#05060A` | Wordmark glyph fill |
| Glare gradient | `#B9821A`, `#E8B93F`, `#FBF0C6` | Specular sweep |
| Frame margin | `200px` @1920 (10.4%) | Left/right gutters |
| Horizon | `y: 720` @1080 (66.7%) | Baseline of the composition |
| Glare / scan cycle | `1.6s` | Loading-state rhythm |
| Dot cycle | `2.4 Hz` | LOADING ellipsis |

Contrast: ink on ground is 15.6:1; ink on the gold disc is 8.4:1. Both pass
AA comfortably — preserve these pairings and do not lower the ink opacity.

## Assets
None. No images, no icons, no SVG files — the entire screen is CSS boxes,
border-radius, and clipped gradients. The only external dependency is the
Archivo webfont from Google Fonts; self-host it if the app does the same for
other fonts.

## Files
- `loader-reference.html` — **port this.** Self-contained, no dependencies.
- `Sun Industries Loader.dc.html` — original prototype entry point.
- `sun-piece.jsx` — prototype choreography; the authoritative source for exact
  numbers if anything above is ambiguous.
- `animations-v3.jsx` — the design-tool timeline engine. Reference only; it has
  no place in a production bundle.
