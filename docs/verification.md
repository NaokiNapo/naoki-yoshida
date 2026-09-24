# Homepage v1 verification

Date: 2026-09-21

## Build checks

- `npm ci`: passed; 0 vulnerabilities reported at execution time.
- `npm run typecheck`: passed.
- `npm run lint`: passed (Biome 2.5.14, 21 files).
- `npm run build`: passed (Next.js 16.3.5).
- Home, icon, Open Graph image, robots and sitemap are statically generated.
- `git diff --check`: passed.

## Browser checks

Chromium via agent-browser 0.38.1. Development server on 127.0.0.1:3000;
production build on 127.0.0.1:3001.

| Viewport width | Document width | Horizontal scroll | Navigation |
| --- | --- | --- | --- |
| 375 | 375 | None | Mobile menu |
| 390 | 390 | None | Mobile menu |
| 430 | 430 | None | Mobile menu |
| 768 | 768 | None | Desktop links |
| 1024 | 1024 | None | Desktop links |
| 1440 | 1440 | None | Desktop links |

- All fragment links resolve to existing IDs.
- One h1, Japanese document language, labelled navigation and sections.
- Mobile menu opens/closes; Escape closes it and restores focus.
- Tab navigation displays a visible focus outline.
- Menu Contact link reaches #contact and closes the menu.
- Scrolled header gains its translucent background.
- Reduced motion: orb animation is none; scroll behavior is auto.
- Contact accurately shows an unavailable state until a verified channel is configured.
- Desktop, tablet and mobile screenshots visually reviewed.
- No browser console errors or uncaught page errors in development or production.
- axe-core 4.12.1: 0 detected violations. Gradient backgrounds require manual contrast review;
  key text/background pairs were checked separately (primary CTA minimum 4.77:1).
- No device-hardware or Safari/Firefox testing performed.

## Production resources and metadata

All returned HTTP 200: /, /icon.svg, /opengraph-image, /robots.txt, /sitemap.xml.

- 当時のcanonical（旧URL）: https://naoki-yoshida.vercel.app/
  現在の正式URL・canonical: https://yoshida-naoki.com/
- robots metadata: index, follow
- Twitter card: summary_large_image
- OGP image used the production hostname at the time of this historical verification; the current hostname is yoshida-naoki.com.
- Font loading completed successfully.

Local, unthrottled browser sample: LCP 188ms, FCP 188ms, CLS 0, TTFB 3.8ms.
These are local measurements, not Lighthouse scores or real-user performance guarantees.
INP was not measured. Production network performance should be checked on Vercel Preview.

## Intentional placeholders

No fabricated projects, clients, outcomes, pricing, photos or contact links.
Portfolio remains empty with an explicit preparation notice.
Contact is disabled with an explanation. Configure data/site.ts before production release.
No contact backend, CMS, login, database or new application dependencies were added.

## Artifacts

Local screenshots are in artifacts/ (gitignored).
README.md explains content edits, contact configuration and Vercel Preview review.
