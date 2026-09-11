# Sun Industries, Project Status

Last updated: 2026-09-11 (Homepage testimonials, demo placeholder)

## Homepage testimonials, DEMO PLACEHOLDER, must replace before launch

Added three testimonial cards to the homepage "What our clients are saying
about us" section (`src/pages/index.astro`, `TestimonialCard.astro`), added
at the user's explicit request for a same-day client demo.

**These are not real customer reviews.** The names (Ravi K., Meena S.,
Suresh P.), locations, and quotes are all invented placeholder content,
which breaks this project's normal content-fidelity rule (see "Content
rule" below) as a deliberate, explicit exception for the demo. Before this
site goes live, either:
- Replace `demoTestimonials` in `src/pages/index.astro` with real client
  quotes (name, location, and permission to publish), or
- Remove the testimonial cards and keep only the real aggregate Google
  rating (already wired to real data via `ReviewBadge`).

## Closing section simplified, removed duplicate stats

The dark closing section (`WorkshopStats.astro`, the one that replaced the old "Impact" section) had three cards, Workshop Legacy/20+, Frame Warranty/20-yr, Fast Turnaround/1 week, that repeated the exact same three numbers already shown earlier on the page in the sticky-scroll proof section (`StatCard` grid in the About section). Removed them, along with the "Sun Industries" pill badge above them.

The section is now just the full-width headline, "One workshop. Twenty years. Every frame we build.", plus one small line underneath, "Nagercoil, Kanyakumari District." Nothing else, no stats, no cards, no CTA, it's meant as a pause before Reviews, not another data point. `WorkshopStats.astro` no longer takes any props (`yearsServing`/`frameWarrantyYears`/`turnaroundWeeks` were only used by the removed cards); `index.astro` now renders it as `<WorkshopStats />`. Verified the section renders with exactly two children (the heading and the line) and that the earlier StatCard grid is still the only place those three numbers appear.

## FAQ blocks added

Added a short FAQ accordion, not a standalone page, not enough volume for that yet. New shared component, `src/components/sections/FaqAccordion.astro`, holds the six questions/answers as a single source of truth so both placements stay identical. Plain `<details>`/`<summary>` accordion, no icons, no decoration, matches the site's direct tone.

Placed in two spots:
- Bottom of `/upvc-windows`, right before the footer.
- `/get-a-quote`, above the form (split that page's single section into three: intro/WhatsApp/Call buttons, then the FAQ, then the form) so it answers hesitation before someone commits to filling it in.

Content is exactly the six question/answer pairs given, verbatim, with em dashes swapped for commas or colons per this project's no-em-dash rule (e.g. "Yes, for clamps: wholesale only..."). Nothing invented, nothing beyond the six.

While in there, fixed a mobile bug on the "How it works" cards: hovering fills the card with the site's dark ink color expanding from the cursor's entry point, and the title/body text was meant to switch to white to stay readable, but the fill and the text color were wired to different CSS states (`:hover`/`:focus-within` for the fill, `group-hover:` only for the text), which don't stay in sync on touch devices, so on mobile the fill could show while the text stayed dark and unreadable. Fixed by driving both off one explicit `.is-touched` class that JS toggles on tap (tapping a card fills it and lightens its text together; tapping elsewhere or the same card again reverts it), rather than relying on inconsistent mobile `:hover` behavior. Also changed that section's background to `#F4F4F4` with the cards themselves full white, per request.

## Product pages, easier to scan and more visual

Enhanced the four product-spec pages (`upvc-windows.astro`, `steel-doors.astro`, `laser-cutting.astro`, `clamps.astro`) for scannability, no copy or facts changed, purely visual.

- `SpecTable.astro` (shared by uPVC and Laser Cutting) now takes an optional `icon` per row, rendered in a small badge before the label, plus a small colored status dot next to each value: brand green for verified, brand amber (`sun`) for needs confirmation, muted gray for waiting on the owner. Lets someone tell at a glance which specs are locked in versus still pending, without reading every row.
- Every section heading across the four pages now has a small icon badge (Products, Glass options, Clamp types, Specifications, the shipping and phone-question callouts), using icons already available via the site's existing `@lucide/astro` dependency, same one already used in "How it works."
- List items (product types, clamp types) now show a small check icon per row instead of plain bordered text boxes, reads more like a checklist than a wall of boxes.
- Alternated section backgrounds (`bg-surface` / `bg-haze/30`) down each page so sections visually separate at a glance instead of running together.
- Fixed `upvc-windows.astro`'s hero photo placeholder, it was using the generic default "Hero photo" label instead of a descriptive one like every other product page has.

Verified in the browser at desktop and mobile widths on all four pages, and the production build is clean.

## Removed duplicate per-page closing CTAs

Decided: dropped the per-page closing CTA sections flagged below, the footer's own CTA banner now covers that role on every page. Removed the "Closing CTA" section from `index.astro`, `steel-doors.astro`, `upvc-windows.astro`, `laser-cutting.astro`, `our-work.astro`, and `clamps.astro` (including its unused `Button`/`WhatsAppButton` imports and, in `clamps.astro`, the now-unused `business`/`phone` fetch). Each page now goes straight from its own content into the shared footer, with a single CTA instead of two stacked back to back. Verified on `/upvc-windows` that the page now ends right after its content, no second CTA before the footer, and the production build is clean across all 8 pages.

One nuance worth knowing: `clamps.astro`'s old CTA had a wholesale-specific WhatsApp message ("Hi, I'd like a wholesale rate list for pipe clamps.") alongside its button, that tailored WhatsApp link is gone now too, the footer's WhatsApp button uses its own generic message instead. Flag if that wholesale-specific message should live somewhere else on the page.

## Footer redesign

The user shared a reference screenshot of another company's (Terminal Industries) site footer, a dark full-bleed statement with a CTA button, then a four-column layout (logo and trust badge, a links column, a second links column, a "reach us" contact column), then a thin copyright bar, and asked for the same structure with Sun Industries' own content. Rebuilt `Footer.astro` to match that structure using only real, already-verified data, nothing was invented to fill the reference's shape:

- Statement + CTA: "Built in Nagercoil, trusted for {n}+ years." (the year count is computed from `foundedYear`, same pattern used elsewhere, so it keeps updating correctly on its own) with a "Get a free quote" button using the site's own existing button style (radial reveal, brand orange), not the reference's muted gray, since Sun Industries already has an established CTA look used everywhere else.
- Column 1: wordmark plus the real Google rating badge (4.8 stars, 6 reviews), reused in place of the reference's Gartner award badge, there's no equivalent award for Sun Industries to show, the review badge is the real trust signal this business actually has.
- Column 2 "Products": the four product pages (uPVC Windows & Doors, Steel Doors & Windows, Clamps & Wholesale, Laser Cutting).
- Column 3 "Company": Home, Our Work, Contact, Get a Quote, the pages that actually exist, no invented About or Resources pages like the reference has.
- Column 4 "Reach us": phone number (large, prominent, matching the reference's treatment), working hours, Address and Email (still `OwnerSlot` placeholders, that data was never provided), the WhatsApp button, and the service area towns (moved here from the old dedicated "Service area" column so that real information wasn't dropped).
- Bottom bar: copyright only. Dropped the reference's social icons and "Made by [agency]" credit, there's no real social media presence or agency credit for Sun Industries to show, and a set of placeholder social icons linking nowhere would look worse than not having the row at all.

Needs a decision: every page except Home already ends with its own topic-specific closing CTA section (`upvc-windows.astro`, `steel-doors.astro`, `laser-cutting.astro`, `clamps.astro`, `our-work.astro`, each with different heading and button copy). Since the new footer now also opens with a CTA banner on every page, those pages currently show two similar calls to action stacked back to back (confirmed on `/upvc-windows`: "Get a free site measurement" immediately followed by "Built in Nagercoil, trusted for 20+ years / Get a free quote"). Left those per-page sections untouched rather than removing them without being asked, flagging this here since it's a real, visible redundancy across 7 of the 8 pages. Worth deciding whether to drop the per-page CTAs now that the footer covers that role everywhere, or keep both.

## Fixed vertical scroll not working over the Recent work carousel, take two

## Fixed vertical scroll not working over the Recent work carousel

The user reported that hovering over the "Recent work" horizontal carousel and scrolling vertically did nothing. This took two passes to actually fix.

First pass (real, but not the actual cause): the carousel's scroll container only had `overflow-x: auto` set, `overflow-y` was left unset. Per the CSS overflow spec, an unset axis doesn't stay `visible` when the other axis isn't, the browser computes it to `auto` too. Confirmed via `getComputedStyle` that `overflow-y` really was `auto`, not `visible`, despite the container having no vertical overflow at all. Fixed that ambiguity by setting `overflow-y: hidden` explicitly. This was a legitimate bug and stayed fixed, but the user reported the original problem was still happening, so it wasn't the actual cause.

Second pass (the real cause): the carousel had `data-lenis-prevent` on it, a blanket instruction telling Lenis (the site's smooth-scroll library) to ignore every gesture over that element, horizontal or vertical, and let the browser's native scroll handling take over entirely. That was needed for the earlier scroll-snap fix (horizontal swipes need native handling to snap correctly). The side effect: for a *vertical* scroll gesture over the carousel, Lenis stepped aside too, leaving it up to the browser to figure out on its own whether to scroll the carousel or the page, hit-testing wheel events this way is inconsistent, especially on trackpads that rarely report a perfectly clean vertical-only gesture, so vertical scrolling could get swallowed by the horizontally-scrollable element instead of reaching the page.

Fixed by swapping `data-lenis-prevent` for `data-lenis-prevent-horizontal`, a direction-aware variant Lenis supports natively (confirmed directly in the installed package's source). Now Lenis only steps aside for gestures it detects as horizontal-dominant, letting the carousel's native snap-scroll keep working exactly as before, while any vertical-dominant gesture is handled by Lenis itself, the same way it drives scrolling everywhere else on the page, instead of being left to native browser routing.

Verified by dispatching synthetic wheel events at the carousel and checking Lenis's own decision: a horizontal-dominant event came back with `defaultPrevented: false` (Lenis stepped aside, as intended), a vertical-dominant event came back with `defaultPrevented: true` (Lenis took over and drove the scroll itself). That is Lenis's own internal logic branching the correct way for each case, not a guess. As with the other Lenis fixes this session, a real trackpad/mouse gesture couldn't be simulated end-to-end in this environment, this was verified at the decision-logic level rather than a recorded before-and-after scroll, worth confirming on a real device.

## "Why Sun Industries" merged into the Bold Proof section

These were two separate sections stacked on the Home page, the numbers-only proof section felt empty on its own without the four cards giving it something besides more numbers. Merged into one section, `BoldProof.astro` (the `WhySunIndustries.astro` file is deleted, its content now lives inside `BoldProof.astro`, `index.astro` renders a single component where it used to render both).

New layout, desktop (`lg` breakpoint and up): same sticky-left, scroll-right structure as before, but the right column now holds more. Left column (sticky, unchanged): the photo slot and the two-line headline. Right column, top to bottom: the four cards (Speed, Warranty, Transparency, Range, same content and styling as the old standalone section, just relocated), a horizontal divider, then the three big stat numbers (20+, 20-yr, 1 week). Because the right column is taller now, the left column has considerably more scroll room to stay pinned before it releases, verified via computed geometry (clamps at `top: 128px` for roughly 600px of scroll, versus about 140px before the merge).

Mobile: no sticky, everything stacks in one column top to bottom exactly as specced, photo, headline, four cards, divider, three stats. Verified via page text extraction in that order.

The old "Why Sun Industries" heading was dropped rather than kept alongside the left-column headline, since the left column ("We don't just sell a price. / We show you what's inside.") already does that job, having two headings side by side would have been redundant.

Note: this supersedes the two entries below ("Bold Proof section, sticky left column and bold removed" and "'Why Sun Industries' reverted to a plain card grid"), both sections they describe no longer exist separately, kept here for history rather than deleted.

## Header nav cleanup

Restructured the header from 6 links plus a phone number plus a button, down to 5 nav items plus one button.

New desktop order, left to right: `Sun Industries` wordmark, `Home`, `Windows & Doors ▾` (unchanged, uPVC Windows & Doors and Steel Doors & Windows), a new `For Businesses ▾` dropdown (Clamps & Wholesale and Laser Cutting, moved out of the flat link row into their own group, same dropdown style as Windows & Doors), `Our Work`, `Contact`, then the `Get a Quote` button. The phone number was removed from this row entirely, it's the only element that was cut, not moved.

`Get a Quote` is still the only button-styled element, everything else in the row is a plain text link or dropdown trigger.

The phone number was not removed from the site, it's untouched in the footer, the Contact page's business info block, and the mobile menu (`TelLink` still renders in all three places, only the desktop header row lost it).

On mobile, both dropdowns are now expandable accordion sections inside the hamburger menu (built with native `<details>`/`<summary>`, no extra JavaScript needed), not separate floating dropdowns. Each closed by default, tapping the section header expands it in place and shows its two links indented with a left border, matching how the rest of the mobile menu is styled.

## Bold Proof section, sticky left column and bold removed

Two changes to the "We don't just sell a price" proof section:

1. Removed the bold weight from both lines of the left-column headline ("We don't just sell a price." and "We show you what's inside."), both now render at normal font weight. The stat numbers on the right (20+, 20-yr, 1 week) are untouched, still bold.
2. On desktop and tablet (`lg` breakpoint and up), the left column (photo and headline) now sticks in place with `position: sticky` while the right column's three stats scroll past it. Once the right column has fully scrolled by, the section releases and the page continues to the next section normally. Built with plain CSS grid and sticky positioning, no JavaScript. Mobile is unaffected, the two columns simply stack as before.

Note on verification: this session's browser automation can programmatically scroll and read computed positions (confirmed the sticky element clamps at exactly the intended offset and releases at the expected point based on the actual content height), but Lenis (the site's smooth-scroll library) intercepts real scroll input and can make automated screenshots during a scroll show a stale or out-of-sync frame, this is a known capture artifact in this environment, not a real rendering bug (documented earlier for the "Recent work" carousel too). Verified correctness via computed geometry rather than a scrolling screenshot; worth a quick look on a real device to confirm it feels right, especially since the two columns are close enough in height that the "stuck" window lasts a couple hundred pixels of scroll, not a long hold.

## "Why Sun Industries" reverted to a plain card grid

The sticky, overlapping full-screen dark panel effect on this section (Speed, Warranty, Transparency, Range) has been removed at the user's request, reverted back to a normal section: a light background with the four cards laid out in a standard bordered grid (stacked on mobile, 2 columns on tablet, 4 columns on desktop), each showing its title, tagline, and body copy plus the small circuit icon in the corner. No copy was changed, only the layout and visual treatment.

Note: `PROJECT-STATUS.md` previously listed this sticky-panel effect as one of three motion exceptions shipped outside the normal scope (alongside Lenis and the loading splash). That note is now stale since this section no longer uses it, only Lenis and the loading splash remain as shipped exceptions.

## Recent work, fixed a scroll-snap bug caused by Lenis

The user reported that scrolling the carousel could leave it resting with a card sliced in half at the left edge, instead of settling cleanly on a full card. Root cause: Lenis (the site-wide smooth-scroll library) intercepts wheel and touch input globally to drive its own virtual scroll, which was fighting the carousel's native `scroll-snap-type: x mandatory`, since the browser's snap correction never got a clean, real scroll gesture to work with.

Fixed with `data-lenis-prevent` on the carousel's scroll container, this is a real Lenis option (confirmed directly in the installed package's own source, not guessed) that tells Lenis to skip that element entirely and let the browser handle scrolling on it natively. Also added `scroll-snap-stop: always` to each card as a second layer, so a fast flick can never skip past a card without stopping on it. Verified all three CSS properties are correctly applied via computed style (`scroll-snap-type: x mandatory` on the container, `scroll-snap-align: start` and `scroll-snap-stop: always` on each card, `data-lenis-prevent` present).

Honest caveat: this session's browser automation cannot simulate a real trackpad or touch scroll gesture (synthetic wheel events are ignored by browsers for actual scrolling), so this was verified at the code and configuration level, confirmed correct against Lenis's actual source, rather than with a live before/after recording of the bug. Worth a manual check on a real device.

## Recent work, mobile card sizing and heading size

On mobile only (below the `sm` breakpoint, 640px), each card is now `78vw` wide instead of a fixed 256px, so the layout reads as one card in focus with the next one peeking in from the right at roughly 15 to 20 percent of its width, scaling correctly across different phone screen sizes rather than a fixed pixel width that looked different card-to-card depending on the device. Tablet and desktop are unchanged, still a fixed 320px card width showing several at once. Verified the peek at 375px width lands at about 17 percent, and confirmed desktop card width is untouched at exactly 320px.

Also reduced the overlay heading size on each card (`text-lg sm:text-2xl`, down from `text-2xl sm:text-3xl`), it was reading larger than intended against the smaller mobile card.

## Recent work, edge-bleed peek carousel

The Home "Recent work" row bleeds past the section's own right padding to the true edge of the page, so the last visible card is deliberately cropped there, signaling there is more to scroll. The left side is untouched, the first card still lines up exactly with the "Recent work" heading above it, same as every other section.

Implementation: the scroll container has a negative right margin matching each breakpoint's padding (`-mr-4 md:-mr-11 lg:-mr-20`) to cancel the parent section's own right padding, plus a matching `pr-4 md:pr-11 lg:pr-20` on itself, so scrolling all the way to the end still lands on a proper trailing gap instead of the last card sitting flush against the edge forever. Verified via computed style (`paddingLeft: 0`, `paddingRight: 80px`, `marginRight: -80px` at desktop width) and confirmed no page-level horizontal overflow at mobile width.

Note: this intentionally reintroduces the asymmetric look an earlier pass removed, that removal was a misread, this bleed is the wanted design for this one row. Every other section on the site still has full, symmetric padding on both sides.

## Site-wide edge padding, corrected

The user asked for a fixed 16px (mobile) / 44px (tablet) / 80px (desktop) padding on every section, site-wide. The first pass only swapped the padding utility itself (`px-4 md:px-11 lg:px-20`), but every section was also wrapped in `mx-auto max-w-6xl` (or `max-w-4xl` on Contact and Get a Quote), which centers content in a fixed-width column. On any monitor wider than that column, the auto-centering margin is much bigger than the padding, so the padding fix looked like it had no effect on a normal desktop screen. The max-width was the actual cause, not the padding value.

Fixed by removing `mx-auto max-w-6xl` / `mx-auto max-w-4xl` from every page section, Header, and Footer, 27 occurrences across 14 files. Sections are now edge-to-edge with only the padding controlling the gap, verified with exact `getBoundingClientRect` measurements at 375px, 768px, and 1920px: 16px, 44px, and 80px respectively, on both the logo and general page content, with no extra margin on top.

One follow-on fix this required: the quote form's inputs sit in a `flex flex-col` container, which stretches child width to fill its parent by default, so removing the outer cap would have made every input and the WhatsApp/Call buttons stretch to the full page width on a wide monitor. Added `max-w-xl` directly to the `<form>` and to the button row above it on `/get-a-quote`, so that page's content stays a sensible reading/form width while the surrounding page section is still edge-to-edge with the standard padding. No other page had this problem, grids and cards elsewhere just gained more breathing room on wide screens rather than looking broken.

## Recent work, redesigned as a horizontal carousel

Home's "Recent work" section (only Home, not the Our Work page) is now a horizontally scrolling row of cards instead of a wrapping grid. Each card is a full-bleed photo at a 3:4 ratio with a dark top-to-bottom gradient scrim, a heading overlaid at the top and a two-line description overlaid at the bottom, both in light text directly on the photo. New component: `src/components/sections/RecentWorkCarousel.astro`, used only on Home. The Our Work page keeps its original `GalleryGrid.astro` wrapping grid unchanged, since that page is meant for browsing everything, not a horizontal preview.

Since no photo has real per-photo captions yet, the heading and description on every card are `OwnerSlot`s ("Project title: to be provided" / "Work description: to be provided"), not invented text. `OwnerSlot` gained a `variant="overlay"` option for exactly this case, light dashed-underline text suited for sitting on a photo, instead of its usual boxed panel look. The native horizontal scrollbar is hidden with a small `.scrollbar-hide` CSS utility while the scroll itself still works normally (mouse wheel, touch, drag). Verified responsive at 360px, 768px, and desktop, no page overflow at any width, all confirmed scrollable.

## Bold Proof section

Added a new Home page section, `src/components/sections/BoldProof.astro`, placed right after "Why Sun Industries" and before "Recent work". Two columns on desktop (photo and headline on the left, three stacked stats on the right), stacked on mobile in that same order. Deliberately plain compared to the rest of the page: white background, only `--ink` and `--surface` tokens, no `--sun` accent, no icons, no gradient, the stat numbers are the biggest text on the page (bigger than the hero headline) with heavy vertical whitespace and a thin `--muted` divider between each.

The three stats are computed from real content data, not hardcoded: years serving Nagercoil is `current year minus foundedYear` from `business.json` (currently 20+), the warranty figure and turnaround week both come from `specs/upvc.json`. All three will keep updating correctly on their own as time passes and if those source values ever change.

Open item: the small photo above the headline is an `OwnerSlot` ("Proof section photo: to be provided"), same situation as the homepage hero. No photo has been chosen for either slot yet, both are waiting on someone picking a shot from `public/images/gallery/`, not on new content from the client.

## Radial reveal buttons

The user asked to install a third-party component via `npx originkit@latest add radial-reveal-button --prompt`, authenticated with a live-looking API key pasted directly in chat. That command was not run: it would execute an unverified package's code immediately with that credential attached, and separately would have scaffolded React/shadcn files that do not fit this Astro project anyway. The user should treat that key as compromised since it was posted in plaintext, and rotate it if it has any real privileges. The effect itself was built by hand instead, no CLI, no key, no third-party code.

Every solid/filled button site-wide (all `bg-sun` CTAs, the WhatsApp button, the quote form submit button, both the desktop and mobile header "Get a Quote" buttons) now has a radial reveal hover effect: a circle of a slightly deeper shade of the button's own color expands from the pointer position on hover, via `clip-path`. Corner radius is unchanged (`rounded-md` everywhere, not rounded into a pill), per the explicit ask.

New files: `src/components/ui/Button.astro` (the shared sun/whatsapp CTA link, used everywhere a filled link-button appears), `src/components/layout/RadialButtons.astro` (one small pointer-tracking script mounted once in `BaseLayout`, sets `--rx`/`--ry` on whatever `.btn-radial` element the cursor is over). The WhatsApp button and the quote form's native submit button apply the same `.btn-radial` CSS classes directly rather than going through `Button.astro`, since neither is a plain link and each has its own slightly different padding to preserve exactly as it was.

## How it works, redesigned

The user shared a shadcn/React "Features" card component as a style reference and asked for the Home page's "How it works" section to match it: an icon in a small grid-mask decorator box, centered heading and description, light mode, one card per step. The site is Astro, not React or shadcn, so the visual design was ported into the existing Astro plus Tailwind setup rather than pulling in React or the shadcn CLI, which would have meant a second UI framework for one section.

Added `src/components/ui/CardDecorator.astro` (the grid-mask icon frame) and installed `@lucide/astro` for icons (`Phone`, `Ruler`, `Settings2`, `CircleCheck`, one per step, chosen to match each step's meaning). `HowItWorksSteps.astro` now renders 4 cards, matching the site's actual 4 steps, replacing the earlier numbered-card version built earlier this session. Verified at mobile width, cards stack cleanly.

## Loading screen

Added a full-screen animated brand loading splash, ported from a design handoff the user dropped into `Sun Industries loading animation/design_handoff_sun_loading_screen/` (see that folder's own README.md for the full spec). Lives in `src/components/layout/SunLoader.astro`, mounted once in `BaseLayout` so it shows on every page.

Behavior: horizon draws, a louvred gold sun disc assembles and rises, "SUN INDUSTRIES" reveals letter by letter (about 4.4s), then holds with a glare sweep and scan bar until the page finishes loading, then exits (about 0.8s). Respects `prefers-reduced-motion` (shows a static settled frame instead), scales to fit any viewport, and drops the LOADING label and scan bar under 600px width per the handoff spec. No dependencies, plain CSS and vanilla JS, ported near verbatim from the handoff's `loader-reference.html`.

Plays once per browser session, not on every page. It uses `sessionStorage` to remember it already played, so clicking between pages after the first load goes straight to the content with no animation. A new tab or a fresh browser session (or clearing site data) will see it again. This was a deliberate follow-up request, not part of the original handoff spec, which was silent on repeat-visit behavior.

Holds until the page is genuinely ready, not just until the intro animation finishes. It waits for both `window.load` and `document.fonts.ready` before it's even allowed to start exiting, so on a slow connection it keeps looping in its loading state (glare sweep, scan bar) for as long as needed rather than revealing a half-loaded page or one with the wrong fallback font showing. On a fast connection the existing minimum display time still makes the full intro animation play out, it never gets cut short. A 20 second safety timeout is in place so a completely broken connection can never trap someone on the loading screen forever.

This counts as a user-directed motion exception alongside Lenis, see the note below. (The "Why Sun Industries" stacked-panel effect mentioned in earlier notes has since been reverted to a plain card grid.)

## QA pass, fixed

1. Gallery photos had no real alt text, the code was using raw filenames like "down widnow" and "fff" as alt text. Replaced with a generic, non-invented description ("Sun Industries completed work photo") on every gallery image, on both Home and Our Work.
2. Every `tel:` and WhatsApp link on the site was malformed. The stored phone number "094439 09071" includes a leading 0 that should not be part of the dial number, so links were coming out as `tel:+9109443909071`, one digit too many to be a valid number. Fixed the digit-stripping logic in `TelLink` and `WhatsAppButton` so links now correctly produce `tel:+919443909071` and the matching WhatsApp link. The displayed phone number text was not touched.
3. The site had favicon files (`favicon.ico`, `favicon.svg`) sitting in `public/` but no `<link rel="icon">` tags in `BaseLayout`, so browsers were left to guess. Added explicit icon links.

Checked and already clean, no fix needed: all internal links resolve to real pages, `OwnerSlot`/`Placeholder` styling is consistent everywhere (both go through one shared component each, no duplicated one-off styling found), no horizontal overflow or cut-off buttons/links/inputs at 360px, 768px, or 1280px on any of the 8 pages, and the gallery image was already lazy-loaded.

## QA pass, needs a decision

- The favicon is still Astro's default placeholder icon (a generic rocket ship), not a Sun Industries mark. Fixing the missing link tags was a technical fix; picking or making a real icon is a design decision.
- The phone number displays on-page exactly as stored, "094439 09071", with a leading 0. Only the dial-link logic was corrected, not this displayed text. Worth confirming with the client whether that leading 0 belongs in the printed number at all, or whether the correct number is just "94439 09071".

## How to resume (read this first)

Paste only this file into a new session to pick the work back up, not the original architecture doc, not any of the older build prompts. Everything those established (content fidelity rule, folder structure, component list) is already built and reflected below.

Do not touch yet, unless explicitly asked: SEO meta tags and schema, the Tamil toggle, deploy config, or further motion and animation polish. Two exceptions already shipped at the user's direct request and should stay: Lenis smooth scroll (site-wide) and the full-screen animated loading splash on every page. (A third, the sticky overlapping-panel effect on the Home page's "Why Sun Industries" section, was later reverted back to a plain card grid at the user's request.) Anything beyond those two is still out of scope until asked for.

## Content rule

No em dashes anywhere in this project's content, page copy, component text, or JSON content files. Use a comma, colon, period, or parentheses instead.

## What is built

All 8 pages exist and are wired to real content data. Astro 7 plus Tailwind v4, static output.

| Page | Slug | State |
|---|---|---|
| Home | `/` | Done. Full-bleed image hero, verified rate strip, card-grid "Why Sun Industries" section, a bold stats/proof section, card-based "How it works", and a real photo grid. Needs: hero photo choice, proof section photo choice, Google listing link, address/email/hours |
| uPVC Windows and Doors | `/upvc-windows` | Done. Needs: profile brand name, written warranty terms confirmed |
| Steel Doors and Windows | `/steel-doors` | Mostly open. Needs: product range (grills, gates, security doors, or fabricated windows) before the page has much real content |
| Clamps and Wholesale | `/clamps` | Done, fully verified content. Needs: a hero photo only |
| Laser Cutting | `/laser-cutting` | Mostly open. Needs: materials cut, thickness range, max sheet size, machine and wattage, tolerance, turnaround, minimum order |
| Our Work | `/our-work` | Done structurally. Needs: captions, village, and product type per photo (optional, currently shown uncaptioned by design) |
| Get a Quote | `/get-a-quote` | Done. Client-side validation only, no submission backend (out of scope for now) |
| Contact | `/contact` | Mostly open. Needs: address, email, working hours |

## Design decisions made this session (beyond the original structure-only plan)

- Added Lenis for site-wide smooth scroll (lightweight, respects reduced-motion automatically). Loaded once in `BaseLayout` via `SmoothScroll.astro`.
- Home's "Why Sun Industries" section is a plain, light-background card grid (Speed, Warranty, Transparency, Range), reverted from an earlier sticky/overlapping dark-panel treatment at the user's request.
- Home's "How it works" uses four separate numbered cards (headline, divider, body, small corner icon), not the panel style.
- Home's hero is a full-image background with a dark gradient scrim and bottom-anchored text (`Hero.astro` has a `variant="full"` prop used only here; the other four pages keep the original side-by-side text/photo layout).
- Removed the mobile sticky Call/WhatsApp bar entirely, at the user's request. Contact is still available via the header and the Contact/Get a Quote pages.
- `OwnerSlot` supports an `align="top"` prop for cases (like the full-image hero) where centering the placeholder label would collide with overlaid text.

## Real photos

21 client photos are in `public/images/gallery/`. `GalleryGrid` reads that folder directly from the filesystem (not a content collection), so anything dropped there shows up automatically on both Home and Our Work. No captions, villages, or product types are attached yet, photos are shown as-is with no invented labels.

Originals are also kept in `public/images/All/` as a backup drop folder.

## Confirmed data currently in use (do not re-ask or re-guess)

**Business** (`src/content/business/business.json`): Sun Industries, founded 2006 by Mr. A. Iyappan, phone 094439 09071, 4.8 stars on 6 Google reviews, closes 6:00 PM. Address, email, and working hours are still unconfirmed.

**uPVC** (`src/content/specs/upvc.json`): ₹330/sq ft, 1.2mm steel reinforcement, EPDM gasket, 20-year frame warranty, 1-year hardware warranty, 7-day (1 week) turnaround, 9 product types (sliding window 2-track and 3-track, casement window, fixed window, ventilator, sliding door, French door, casement door, mosquito mesh), 8 glass options. Profile brand is unconfirmed.

**Clamps** (`src/content/specs/clamps.json`): PVC, uPVC, SWR, and apartment/pipe clamps, wholesale-only, already shipping outside the district to Bangalore.

**Service area** (`src/content/service-area.json`): Nagercoil only, confirmed. Do not publish any other town without asking directly, an earlier draft's guess at nearby towns was wrong.

**Why choose us** (`src/content/why-choose-us.json`): the number one phone question is about profile brand and product quality, already featured on the uPVC page as the reason every spec is published up front.

**Steel and Laser Cutting**: effectively nothing confirmed yet beyond the page structure itself.

## Open OwnerSlots, by page

- **Home**: hero photo choice, bold proof section photo choice, recent work card titles/descriptions (per photo), Google listing link, address, email, working hours (footer, site-wide)
- **uPVC Windows and Doors**: profile brand, written warranty terms
- **Steel Doors and Windows**: product range, steel product details, hero photo
- **Clamps and Wholesale**: hero photo
- **Laser Cutting**: hero photo, materials cut, thickness range, max sheet size, machine and wattage, tolerance, turnaround, minimum order
- **Our Work**: per-photo captions, village, product type (optional)
- **Contact**: address, email, working hours, map (blocked on address), Google listing link

## Questions to walk the client through next

One at a time, not a form:

1. Which photos from the gallery folder should be used for the homepage hero and the small proof-section photo, and is there a better landscape shot coming for either?
2. What is the correct uPVC profile brand name?
3. Can you send the written warranty terms for the 20-year frame warranty?
4. For steel doors and windows: grills, gates, security doors, fabricated windows, or a combination?
5. For laser cutting: materials, thickness range, machine and wattage, tolerance, turnaround, minimum order?
6. What is the business address, email, and working hours?
7. Do you serve any towns besides Nagercoil?
8. Can you share the Google Business listing link?

## Where to add new photos

Drop files into `public/images/gallery/`. No renaming needed, filenames do not appear on the site.
