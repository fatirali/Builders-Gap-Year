# Builders-Gap-Year

Builders Club landing page in the selected Builders Studio direction, with English/Spanish switching.

## Build

Run `npm run build` to generate `public/` from the original design in `designs/builders-club-directions.html` and the application template in `scripts/flow-page.mjs`. The original concept alternatives remain in that source for reference; the published site uses Builders Studio without a design selector. No application dependencies are required.

For local review, run `python3 -m http.server 4173 --directory public` and open `http://localhost:4173`.

## Vercel

Create a separate Vercel project named `builders-club-designs`, using the Other framework preset. The included `vercel.json` sets the build command to `npm run build` and the output directory to `public`.

## Application preview

The hero and closing “Apply to the club” / “Quiero postularme” buttons lead to `/apply/`, with a display-only deadline of November 30, 2026. The form asks for first name, last name, telephone number, email address, graduation month/year (including an unsure option), English test/score, and a nonblank answer about joining. “Proceed Payment” / “Continuar al pago” opens `/checkout/`, a separate payment design mockup using the existing Builders Club logo.

English-test options distinguish TOEFL iBT 1–6 in half-point increments, TOEFL iBT 0–120 in whole points, and IELTS 0–9 in half bands. Applicants can also indicate they have not taken a test or are awaiting results. No admission threshold is applied. Sources: [ETS scores](https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html) and [IELTS scores](https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail).

English/Spanish selection and ongoing application answers use tab-scoped session storage, with existing answer drafts retained. “Save application” / “Guardar solicitud” explicitly saves a partial draft in localStorage for return visits to the same preview URL in the same browser. A saved draft is restored when no nonempty tab draft exists; saved, restored, unsaved-change, and storage-failure states are shown in both languages. No backend or cross-device saving is connected. Only application fields are included; payment details are excluded. When storage is unavailable, answers survive navigation between application and checkout within the document; a warning explains that refresh or leaving may clear them. Both routes can be opened directly.

The checkout fields are for sample data only. Its button displays a demo confirmation and clears the payment fields. No payment details are saved or sent; no application is submitted, reservation made, or payment collected. The amount remains unconfigured. This is not a Stripe integration.

The user has approved the application/payment design, contact fields, and browser-only Save application feature for production. Promote the verified preview deployment to the existing project; for future design changes, use preview deployments unless production publishing is requested. Production still has no application backend, cross-device draft saving, or real payment processing.

Copy uses a direct, student-facing voice and natural Mexican Spanish. Describe existing activities, avoid repeated motivational slogans, and add program details only when confirmed. Edit source templates and runtime translations, then rebuild `public/`.

## Program timeline

The timeline maps Phase 1 to leadership and communication, Phase 2 to software/AI/products, and Phase 3 to working across cultures. Exact timing has not been decided, so no month ranges are displayed. Edit each phase’s labels and bilingual content together in `designs/builders-club-directions.html`.

`designs/program.css` and `designs/program.js` provide desktop hover tabs and an inline mobile view at 700 px or less. Hover selects after 120 ms; focus and click select immediately. Arrow keys, Home, and End navigate desktop tabs. The selected phase survives language and viewport changes. Reduced motion disables animations, and all details remain readable without JavaScript.

Review checklist: both landing CTAs; whitespace validation and keyboard focus; EN/ES across all pages; draft retention on refresh and back navigation; direct route loads; blocked session storage; desktop/mobile layout; and no application/payment network requests.
