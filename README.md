# Allen Mechanical Inc. — website

Marketing site for Allen Mechanical Inc., a mechanical contractor in Kingston, Ontario. It is built with Next.js (App Router) and exported as a fully static site: plain HTML, CSS and JS, with no server at runtime.

The site was migrated from a generated static build. The migration kept the design pixel-identical, which [docs/verification.md](docs/verification.md) shows with the pixel, behaviour and navigation results. The site is still a **private preview**: every page is `noindex` until the owner approves launch.

## Getting started

Requires Node.js 20.9 or later. Node 26 (the current LTS) is pinned in `.nvmrc`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
npm run preview    # serve out/ locally
```

## Scripts

| Script                 | What it does                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                                  |
| `npm run build`        | Static export to `out/`, then `postbuild` fixes prefetch file names |
| `npm run preview`      | Serves `out/` with `serve` (downloaded on demand by `npx`)          |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules)                 |
| `npm run typecheck`    | Generates route types, then runs `tsc --noEmit`                     |
| `npm run format`       | Formats the repo with Prettier                                      |
| `npm run format:check` | Checks formatting without writing                                   |
| `npm run check`        | `typecheck`, `lint` and `format:check` together; CI runs this       |

`scripts/fix-export-segments.mjs` runs after every build. On Windows, Next.js writes link-prefetch files into nested folders (`__next.about/__PAGE__.txt`) instead of dotted names (`__next.about.__PAGE__.txt`), which makes prefetches 404. The script flattens them. It does nothing on Linux and macOS.

## Project structure

```
src/
  app/                    routes (one folder per page), layout, not-found, icon.svg,
                          robots.ts, sitemap.ts; capabilities/[slug] is statically generated
  components/
    layout/               Header (mobile menu), Footer, MobileBar
    sections/             shared sections: PageIntro, ProjectCta, FaqSection
    home/                 CapabilityExplorer
    start-project/        BriefBuilder (3-step form) and PresetBriefBuilder (?service= / ?type=)
    ui/                   SmartLink, ButtonLink, TextLink, Icon, Brand, Lines
    seo/                  JSON-LD
  config/
    site.ts               business details and navigation (safe for client code)
    deployment.ts         SITE_URL / SITE_INDEXABLE (server only)
  content/                typed copy: services, FAQ, brief-builder options
  lib/                    metadata helper, project-brief text and mailto builders
  styles/                 globals.css imports ordered partials (base, components, sections, pages)
  assets/                 images/ and fonts/ (Manrope + OFL licence), imported statically
scripts/                  fix-export-segments.mjs
docs/                     content-sources.md (fact provenance), verification.md
```

## Conventions

- **Server Components by default.** Only the header menu, the capability explorer and the brief builder are client components.
- **Copy lives in `src/content` and `src/config/site.ts`.** Phone, email, address and contact name are defined once in `site.ts`. Pages, the sitemap and the JSON-LD all read the same data.
- **Links:** use `SmartLink`, `ButtonLink` or `TextLink`. Site paths go through `next/link`; `tel:`, `mailto:`, `#hash` and external URLs stay plain anchors.
- **CSS order matters.** `src/styles/globals.css` imports partials in the order their rules appeared in the original stylesheet. Rules that override each other at the same specificity (for example `.wide-photo` / `.about-photo`) live in the same partial. Keep base rules first and media queries after them, in each partial.
- **Fonts:** Manrope is loaded with `next/font/local` and exposed as `--font`. Never write a literal font-family name in CSS; use `var(--font)`, `var(--serif)` or `var(--mono)`.
- **Text nodes:** where literal text meets an interpolated value, render one string (``{`${label} `}``) so the markup matches the original glyph-for-glyph. The `Lines` helper joins lines with `<br>` the same way.
- **Images:** import from `src/assets/images` and render with `next/image`. The page's hero image gets `loading="eager" fetchPriority="high"`.

## Routes

| Route                                                                                    | Page                                                                                                                |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/`                                                                                      | Home                                                                                                                |
| `/capabilities/`                                                                         | Capabilities overview                                                                                               |
| `/capabilities/mechanical-contracting/`, `/hvac/`, `/plumbing-heating/`, `/sheet-metal/` | Capability details                                                                                                  |
| `/approach/`                                                                             | Our approach                                                                                                        |
| `/about/`                                                                                | About Allen Mechanical                                                                                              |
| `/contact/`                                                                              | Contact                                                                                                             |
| `/start-project/`                                                                        | Project brief builder; accepts `?service=<slug>` and `?type=new-construction\|building-upgrade\|fabrication\|other` |
| `/privacy/`                                                                              | Privacy and preview information                                                                                     |
| any other path                                                                           | Styled 404 (`404.html`)                                                                                             |

The brief builder runs entirely in the browser. It shows a review, opens a pre-filled email draft to the company address, and downloads a `.txt` brief. **It does not send, store or upload anything.**

## Configuration

Copy `.env.example` to `.env.local` for local overrides.

| Variable         | Default                                                                | Purpose                                                                                                                |
| ---------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Origin for canonical URLs, Open Graph images, JSON-LD and the sitemap                                                  |
| `SITE_INDEXABLE` | `false`                                                                | `true` removes `noindex` and opens `robots.txt`. The build fails if this is `true` while `SITE_URL` is still localhost |

## Before launch

- [ ] Owner confirms phone, email, address, the CEO name and title, "35+ years", and the service descriptions (sources: [docs/content-sources.md](docs/content-sources.md)).
- [ ] Owner approves the proposed brand mark and decides about the AI-generated photography. Replace it with real project photos if possible; the alt text and the privacy page currently say it is illustrative.
- [ ] Review the remaining "preview" wording (privacy page, brief builder) and the privacy text with the owner.
- [ ] Decide whether the brief builder should deliver leads (it currently only drafts an email). Agree the destination and consent wording first.
- [ ] Point the production domain at Vercel and set `SITE_URL` to it.
- [ ] Set `SITE_INDEXABLE=true` for Production only, redeploy, then check `robots.txt`, `sitemap.xml` and the canonical tags.
- [ ] Submit `sitemap.xml` in Google Search Console and run Lighthouse on the live domain.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests: `npm ci` → `npm run check` → `npm run build`. It uploads `out/` as the `site` artifact. Dependabot opens weekly npm updates (Next, React and types grouped) and monthly GitHub Actions updates.

## Hosting

The site is hosted on Vercel. The framework preset is Next.js, and the static export (`out/`) is detected automatically. `vercel.json` adds security headers to every response: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, a `Permissions-Policy` that turns off camera, microphone and geolocation, and HSTS. There is no Content-Security-Policy yet; one must be tested against Next's inline scripts before it is added.

Any static host works: upload `out/` and serve `404.html` for unknown paths.

Preview deployment: _not deployed yet_
