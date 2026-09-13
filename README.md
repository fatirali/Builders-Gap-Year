# Builders-Gap-Year

Builders Club landing page in the selected Builders Studio direction, with English/Spanish switching.

## Build

Run `npm run build` to generate `public/` from the original design in `designs/builders-club-directions.html` and the application template in `scripts/flow-page.mjs`. The original concept alternatives remain in that source for reference; the published site uses Builders Studio without a design selector. No application dependencies are required.

For local review, run `python3 -m http.server 4173 --directory public` and open `http://localhost:4173`.

## Vercel

Create a separate Vercel project named `builders-club-designs`, using the Other framework preset. The included `vercel.json` sets the build command to `npm run build` and the output directory to `public`.

## Application preview

The hero and closing “Save your spot” buttons lead to `/apply/`, with a display-only deadline of November 30, 2026. A nonblank answer to “Why do you want to join the club?” continues to `/checkout/`, a clearly labeled Stripe placeholder. No application is submitted, no reservation is made, and no payment is collected.

English/Spanish selection and the answer use tab-scoped session storage. When storage is unavailable, the answer survives navigation between the application and checkout within the document, with a visible warning that refreshing or leaving may clear it. Both routes can be opened directly.

Publish the `feat/save-your-spot-application` branch as a Vercel **preview** deployment; do not use `--prod` for this review.

Review checklist: both landing CTAs; whitespace validation and keyboard focus; EN/ES across all pages; draft retention on refresh and back navigation; direct route loads; blocked session storage; desktop/mobile layout; and no application/payment network requests.
