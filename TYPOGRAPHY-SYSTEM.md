# Sun Industries, Typography Spec

Transcribed from Figma (`node-id=10-2`). Source of truth for text styling going forward.

## Fonts used

| Font | Role |
|---|---|
| **Archivo** | Headings, display text, UI elements |
| **DM Sans** | Body text, descriptions, links |
| **Space Grotesk** | Labels, stat values, section tags |
| **Inter** | Testimonial roles, card titles (limited use) |

All four are loaded via Google Fonts in `BaseLayout.astro` and exposed as CSS variables in `global.css`:
`--font-sans` (Archivo), `--font-body` (DM Sans), `--font-display` (Space Grotesk), `--font-alt` (Inter).

## Text case rules

- Section labels (ABOUT, HOW IT WORKS, etc.) → UPPERCASE
- Feature titles (SPEED, WARRANTY, etc.) → UPPERCASE
- Column headers (PRODUCTS, COMPANY, etc.) → UPPERCASE
- Stat values (desktop) → UPPERCASE
- Everything else → original / sentence case

## Desktop (1440px)

| Section | Element | Font | Weight | Size | Line-height | Letter-spacing | Align |
|---|---|---|---|---|---|---|---|
| Hero | Hero Heading | Archivo | Regular | 80px | Auto | -1.5px | Left/Right |
| Hero | Hero Subtext | DM Sans | Regular | 24px | 28px | 0px | Left |
| Hero | CTA Button | DM Sans | SemiBold | 20px | Auto | 0px | Left |
| Spec Bar | Price Tag | Archivo | Bold | 16px | 24px | 0px | Center |
| Spec Bar | Spec Items | Archivo | Regular | 16px | 24px | 0px | Center |
| Services | Service Title | Archivo | Regular | 32px | Auto | -1.5px | Left |
| Services | Service Subtitle | DM Sans | Regular | 20px | 20px | 0px | Left |
| Services | Service Link | DM Sans | Medium | 14px | 20px | 0px | Left |
| About | Section Label | Space Grotesk | SemiBold | 20px | Auto | 0px | Left |
| About | Statement | Archivo | Regular | 48px | 57px | -1.5px | Left |
| About | Stat Value (20+) | Space Grotesk | Medium | 90px | Auto | — | Left |
| About | Stat Label | DM Sans | Medium | 20px | Auto | — | Center |
| How It Works | Section Label | Space Grotesk | SemiBold | 20px | Auto | 0px | Left |
| How It Works | Section Heading | Archivo | Regular | 60px | 57px | -1.5px | Left |
| How It Works | Feature Title | Space Grotesk | Bold | 32px | Auto | 0px | Left |
| How It Works | Feature Desc | DM Sans | Medium | 24px | Auto | 0px | Left |
| Recent Work | Section Label | Space Grotesk | SemiBold | 20px | Auto | 0px | Left |
| Recent Work | Section Heading | Archivo | Regular | 60px | 57px | -1.5px | Center |
| Recent Work | Link | DM Sans | Medium | 20px | 20px | 0px | Left |
| Dark Stats | Statement | Archivo | Regular | 48px | 52px | -1.5px | Left |
| Dark Stats | Card Title | Inter | Bold | 23px | 120% | 0% | Left |
| Dark Stats | Card Value | Archivo | SemiBold | 48px | 100% | — | Left |
| Dark Stats | Card Description | DM Sans | SemiBold | 20px | 145% | 0% | Left |
| Testimonials | Section Label | Space Grotesk | SemiBold | 20px | Auto | 0px | Left |
| Testimonials | Section Heading | Archivo | Regular | 60px | 57px | -1.5px | Center |
| Testimonials | Quotation Mark | Inter | Extra Bold Italic | 52px | 75% | 0% | Left |
| Testimonials | Quote Text | DM Sans | Medium | 28px | Auto | — | Left |
| Testimonials | Reviewer Name | DM Sans | Medium | 20px | Auto | 0% | Left |
| Testimonials | Reviewer Role | Inter | Regular | 16px | Auto | 0% | Left |
| Footer | Company Name | Archivo | Bold | 18px | 28px | -0.45px | Left |
| Footer | Column Header | Archivo | SemiBold | 12px | 16px | 0.3px | Left |
| Footer | Column Links | Archivo | Regular | 14px | 20px | 0px | Left |
| Footer | Reach Us Title | Archivo | SemiBold | 18px | 28px | 0px | Left |
| Footer | Phone Number | Archivo | Bold | 24px | 32px | 0px | Left |
| Footer | Body Text | Archivo | Regular | 14px | 20px | 0px | Left |
| Footer | WhatsApp Button | Archivo | Medium | 16px | 24px | 0px | Left |
| Footer | Location Text | Archivo | Regular | 14px | 20px | 0px | Left |

## Mobile (390px)

| Section | Element | Font | Weight | Size | Line-height | Letter-spacing | Align |
|---|---|---|---|---|---|---|---|
| Hero | Hero Heading | Archivo | Bold | 28px | Auto | -1px | Left |
| Hero | Hero Subtext | DM Sans | Regular | 16px | 22px | 0% | Left |
| Hero | CTA Button | DM Sans | SemiBold | 16px | Auto | 0% | Left |
| Services | Service Title | Archivo | Bold | 24px | Auto | 0% | Left |
| Services | Service Subtitle | DM Sans | Regular | 16px | Auto | 0% | Left |
| Services | Service Link | DM Sans | Medium | 14px | Auto | 0% | Left |
| About | Section Label | Space Grotesk | SemiBold | 14px | Auto | 0% | Left |
| About | Statement | Archivo | Regular | 26px | 30px | -0.5px | Left |
| About | Stat Value | Space Grotesk | Bold | 60px | Auto | 0% | Left |
| About | Stat Label | DM Sans | Medium | 16px | Auto | 0% | Center |
| How It Works | Section Label | Space Grotesk | SemiBold | 14px | Auto | 0% | Left |
| How It Works | Section Heading | Archivo | Regular/Medium | 26px | 30px | -0.5px | Left |
| How It Works | Feature Title | Space Grotesk | Bold | 22px | Auto | 0% | Left |
| How It Works | Feature Desc | DM Sans | Regular | 16px | 22px | 0% | Left |
| Recent Work | Section Label | Space Grotesk | SemiBold | 14px | Auto | 0% | Left |
| Recent Work | Section Heading | Archivo | Medium | 26px | 30px | -0.5px | Left |
| Recent Work | Link | DM Sans | Medium | 16px | Auto | 0% | Left |
| Dark Stats | Statement | Archivo | Regular | 28px | 34px | 0% | Left |
| Dark Stats | Card Title | DM Sans | Bold | 18px | Auto | 0% | Left |
| Dark Stats | Card Value | Archivo | Bold | 40px | Auto | 0% | Left |
| Dark Stats | Card Description | DM Sans | Regular | 15px | 20px | 0% | Left |
| Testimonials | Section Label | Space Grotesk | SemiBold | 14px | Auto | 0% | Left |
| Testimonials | Section Heading | Archivo | Bold | 28px | 34px | 0% | Center |
| Testimonials | Quotation Mark | DM Sans | ExtraBold Italic | 36px | Auto | 0% | Left |
| Testimonials | Quote Text | DM Sans | Regular | 16px | 22px | 0% | Left |
| Testimonials | Reviewer Name | DM Sans | SemiBold | 16px | Auto | 0% | Left |
| Testimonials | Reviewer Role | Inter | Regular | 13px | Auto | 0% | Left |
| Footer | Company Name | Archivo | Bold | 22px | Auto | 0% | Left |
| Footer | Column Header | Archivo | SemiBold | 13px | Auto | 0.5px | Left |
| Footer | Column Links | Archivo | Regular | 14px | Auto | 0% | Left |
| Footer | Reach Us Title | Archivo | SemiBold | 16px | Auto | 0% | Left |
| Footer | Phone Number | Archivo | Bold | 22px | Auto | 0% | Left |
| Footer | Body Text | Archivo | Regular | 13px | Auto | 0% | Left |
| Footer | WhatsApp Button | Archivo | Medium | 16px | Auto | 0% | Left |
| Footer | Location Text | Archivo | Regular | 13px | Auto | 0% | Left |

## Implementation status

Applied in this pass (see commit/session notes):
- Fonts loaded (DM Sans, Inter added alongside existing Archivo, Space Grotesk).
- `PillBadge` (all section-label pills: About, How it works, Our work, Sun Industries, Review) switched to Space Grotesk SemiBold, matching "Section Label" everywhere in this spec.
- Body/description/link copy switched to DM Sans in: Hero subtext + CTA, DoorCard description + link, How It Works feature descriptions, Workshop Stats card description.
- Dark Stats card value corrected to its own spec (Archivo SemiBold, 48px desktop / 40px mobile) — previously it incorrectly shared the About-section stat-value style (Space Grotesk 90px). About-section stat cards keep Space Grotesk per spec; only the dark section changed.

Not yet done (spec captured above for later work): a full pixel-exact retrofit of every row's line-height/letter-spacing/mobile breakpoint (Hero heading at exactly 80px desktop / 28px mobile with a manual breakpoint jump rather than fluid scaling, Services section, a real Testimonials section with real reviews — see the earlier note about not fabricating testimonial content). Treat this file as the reference to work from incrementally.
