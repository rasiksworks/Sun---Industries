# Sun Industries, Color System Audit

Prepared so a real brand palette can be dropped in with one prompt later. Everything below is the full color surface of the site today, all placeholder values, not the actual brand.

## Source of truth: `src/styles/global.css`

```css
@theme {
  --color-ink: #0e2e33;          /* near-black teal, all body text, headings, dark section backgrounds */
  --color-ink-dark: #081b1f;     /* darker shade, was used by the old stacked-panel section (now unused, safe to keep or drop) */
  --color-ink-darker: #040f11;   /* same as above, unused since the panel redesign */
  --color-ink-darkest: #020808;  /* same as above, unused since the panel redesign */
  --color-surface: #ffffff;      /* white, page background, light text on dark backgrounds */
  --color-haze: #e6ebea;         /* light gray-green, borders, muted section backgrounds, dividers */
  --color-muted: #5a6e71;        /* mid gray, secondary/muted text */
  --color-sun: #c98a16;          /* brand accent, orange/gold. Buttons, links, active states, highlights */
  --color-sun-deep: #a8730f;     /* darker accent, hover fill for the radial-reveal button effect */
  --color-whatsapp: #25d366;     /* WhatsApp green, used only for the WhatsApp CTA button and "verified" status dots */
  --color-whatsapp-deep: #1c9e51;/* darker WhatsApp green, hover fill for that button */
}
```

Nearly everything on the site (text, borders, buttons, backgrounds, the spec-table status dots, footer, header) pulls from these nine tokens via Tailwind classes (`bg-ink`, `text-sun`, `border-haze`, etc.) or `var(--color-*)` in a few inline styles. Confirmed via a full grep: **no page or component uses a raw hex code or a default Tailwind color** (no `bg-blue-500`, no stray `#hexcode`) outside the two places below. Changing the palette is, for 95% of the site, just editing this one block.

## The one place that does NOT use these tokens: `SunLoader.astro`

The full-screen loading animation has its own, separately hardcoded mini-palette, because it's plain CSS custom properties scoped to `#sun-loader`, not Tailwind:

```css
#sun-loader {
  --ground: #f4f2ed;   /* loader background */
  --ink: #16181c;      /* loader's own "ink" color, close to but not equal to --color-ink above */
  --sun: #d9a21b;      /* loader's own accent color, close to but not equal to --color-sun above */
}
```

Plus two hardcoded gradients further down in the same file, not tied to any variable:

```css
.sl-glyph  { background-image: linear-gradient(178deg, #0C0E12 0%, #2C313A 46%, #14161A 74%, #05060A 100%); }  /* the wordmark's base fill */
.sl-glare  { background-image: linear-gradient(104deg, #B9821A 0%, #E8B93F 34%, #FBF0C6 50%, #E8B93F 66%, #B9821A 100%); }  /* the gold glare sweep across the wordmark */
```

These five values need to move in lockstep with the main palette or the loader will visibly mismatch the rest of the site after a rebrand (slightly different near-black, slightly different gold). Flagging this now so it isn't missed later.

## Two things NOT wired to brand color (probably fine, noting anyway)

- `public/favicon.svg`: plain black, switching to white in dark mode. Not brand-colored at all.
- `public/favicon.ico`: unknown content, wasn't regenerated as part of this project, likely also not brand-colored.

If the new brand identity wants the favicon to carry brand color, that's a separate small task, not just a CSS variable swap.

## What happens when the real palette arrives

Give the new palette (ideally as: brand primary/accent, an ink/text color, a background or two, and whether WhatsApp green stays as-is since that one is a platform convention, not a brand choice). From that I will:

1. Replace the 9 values in the `@theme` block in `global.css`.
2. Replace the 5 matching values in `SunLoader.astro` so the loader stays in sync.
3. Rebuild and spot-check contrast (the radial-reveal button fill, the status dots, and text-on-dark spots like the footer and hero are the places most likely to need a contrast check with a genuinely different hue).

Everything else on the site updates automatically since it's all token-driven, no per-component color hunting needed.
