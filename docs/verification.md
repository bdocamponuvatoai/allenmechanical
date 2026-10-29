# Verification — Next.js migration

Date: 2026-10-30. Baseline: the original ChatGPT-built static site (`dist/` produced by `build.py`), backed up before migration and served unchanged. Candidate: `npm run build` → `out/`.

Both sites were served locally by the same small Node static server (directory index, `404.html` fallback) and driven with `playwright-core` 1.64 using the installed Google Chrome 156 (headless). Captures used `reducedMotion: "reduce"`, device scale factor 1, every `<img>` forced to `loading="eager"` and awaited with `img.decode()`, and `document.fonts.ready`.

## Build and static checks

| Check                                                                         | Result                                                                              |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run build`                                                               | Passes; 12 routes plus `404.html`, `robots.txt`, `sitemap.xml`, `icon.svg` exported |
| `npm run check` (typegen + `tsc`, ESLint, Prettier)                           | Passes                                                                              |
| Split text nodes (`<!-- -->` markers in exported HTML)                        | 0 on every page                                                                     |
| CSS declarations, legacy vs partials                                          | 1,731 legacy − 4 `@font-face` = 1,727; partials contain 1,727                       |
| Cascade flips between equal-specificity rules that can match the same element | 0 (11,937 flipped pairs checked; 2 real flips found and fixed, see below)           |

## Pixel parity

Every route, two `?query` presets and a missing URL (404), full page, at 1600, 1280, 1024, 768, 390 and 320 px: **84 of 84 captures identical, 0 differing pixels** (pixelmatch, threshold 0.1).

Routes: `/`, `/capabilities/`, the four `/capabilities/<slug>/` pages, `/approach/`, `/about/`, `/contact/`, `/start-project/`, `/start-project/?service=hvac`, `/start-project/?type=fabrication`, `/privacy/`, `/missing-page/`.

Mismatches found and fixed along the way (each investigated by cropping both captures):

1. **Arrow glyphs (→, ←) shifted by 1 px** on the brief buttons and capability breadcrumbs. Manrope has no arrow glyphs; `next/font` routed them to its size-adjusted "Manrope Fallback" face instead of plain Arial. Fixed with `adjustFontFallback: false`.
2. **`/about/` 40 px taller at 768 px.** Splitting the CSS moved `.about-photo img { height: 470px }` after `.wide-photo img` inside `@media (max-width: 900px)`, reversing which rule won. Fixed by keeping `.about-photo` with `.wide-photo` in one partial (same for `.nav-cta` with `.button`, a flip that was invisible because `.nav-cta` is hidden at that width). A rule-pair checker then confirmed no other flip can affect any element.

No sub-pixel anti-aliasing exceptions were needed.

## Behaviour parity

The same scripted interactions ran on both sites and the JSON outcomes were diffed.

| Area                      | What was exercised                                                                                                                                                                                                                                                                                                        | Result                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Mobile menu (390 px)      | Open, Escape (focus returns to toggle), toggle twice, follow a nav link                                                                                                                                                                                                                                                   | Identical                                                          |
| Capability explorer       | Each of the four buttons: active class, `aria-pressed`, image, alt, label, description, link href and text                                                                                                                                                                                                                | Identical                                                          |
| FAQ                       | Open the third item                                                                                                                                                                                                                                                                                                       | Identical                                                          |
| Brief builder (1280, 390) | Missing-capability error and focus; missing and whitespace-only city errors and focus; step headings focused; progress states; Back keeps capabilities, type, city and company; review rows; exact `mailto:` href; download file name and text; status message; Edit returns to step 1 with values kept; Enter in a field | Identical, including the full `mailto:` string and downloaded text |
| Query presets             | `?service=hvac`, `?service=sheet-metal&type=fabrication`, `?type=fabrication`, `?type=building-upgrade`, invalid values                                                                                                                                                                                                   | Identical                                                          |
| Skip link                 | First Tab stop and target                                                                                                                                                                                                                                                                                                 | Identical                                                          |
| State screenshots         | Menu open; both validation errors and the review step at 1280 and 390 px                                                                                                                                                                                                                                                  | 0 differing pixels                                                 |

Intentional differences (requested improvements or legacy bugs):

- **Menu closes when the viewport grows to desktop width.** Legacy left it open, so it reappeared open on returning to mobile width.
- **Arrow keys, Home and End move between the capability buttons.** Legacy had no keyboard handling beyond Tab.
- **The capability link keeps its arrow after a click.** Legacy `app.js` replaced the link's `<span>↗</span>` with plain text on every click, so the arrow shrank and the explorer lost 7 px of height. With only that markup restored in legacy, all five explorer states (initial plus each button) are pixel-identical, and the Next explorer after a click matches legacy's own initial render with 0 differing pixels.

## Navigation (Next build)

Client-side clicks through nav, capability rows, the HVAC brief button, footer, brand, a home path card, Back ×3 and Forward:

- a `window` marker survived every navigation (no full reloads);
- the document title, `<h1>`, canonical URL and `aria-current` updated on every step;
- presets applied after client navigation (`?service=hvac` → HVAC ticked; `?type=fabrication` → type plus sheet metal);
- `#expertise` scrolled to the 110 px scroll padding, and `#top` returned to 0;
- **0 responses ≥ 400, 0 failed requests, 0 console errors or warnings (including hydration)**;
- 44 prefetch segment requests and 22 router `HEAD` checks, all 200;
- an unknown URL returns status 404 with the styled not-found page.

## `<head>` comparison

Title, description, viewport, theme colour, robots (`noindex, nofollow`), canonical, `og:title`, `og:description`, `og:type` and `og:image` match on every route. The origin is now `SITE_URL` instead of the old preview host, and the image is a hashed static asset.

Next additionally emits Twitter card tags, `og:image:width`/`height`, a `fetchpriority="high"` preload for each page's hero image, and an SVG icon at `/icon.svg`. The 404 page carries `noindex` and no canonical or Open Graph tags. A schema.org `HVACBusiness` JSON-LD block (name, phone, email, address, services, all from the site copy) is in the body.

## Not covered

- Real devices: phones were emulated by viewport width in desktop Chrome only. No iOS Safari, Android Chrome, Firefox or Edge runs.
- Screen readers were not tested.

## Re-run after cleanup

The concept note in the footer ("Private design concept. Proposed identity and illustrative photography…") was removed as requested during review, the footer link "Privacy & preview details" became "Privacy", and the note's bottom padding moved onto `.footer-bottom` (25 px on desktop, 12 px at ≤700 px, above the 67 px that clears the mobile bar). All other disclaimers are unchanged. Legacy build files, `.openai/`, the image-prompt log and unused assets were deleted.

- **Pixels:** for all 84 captures, everything above the footer's bottom row is identical (0 differing pixels). Below it, every page is shorter by exactly the removed note: 32–33 px on desktop, where the note was one line, and 46–47 px at 390 and 320 px, where it was two lines.
- **Behaviour:** the same 10 intentional differences as above, and no others. The state screenshots are still at 0 differing pixels.
- **Navigation:** 14 steps; 0 responses ≥ 400; 0 console errors or warnings; 44 prefetches and 22 `HEAD` checks, all 200.
- **Build, `npm run check` and `npm audit`:** pass. `npm audit` reports 0 vulnerabilities, both production-only and including dev dependencies.
