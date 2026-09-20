const t = (en, es) => `data-en="${en}" data-es="${es}"`;
export function applicationDocument(route) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <meta name="theme-color" content="#233a2a">
  <title>${route === 'apply' ? 'Apply' : 'Checkout preview'} — Builders Club</title>
  <link rel="stylesheet" href="/flow.css">
  <script src="/language.js"></script>
  <script src="/flow.js" defer></script>
</head>
<body data-step="${route === 'apply' ? 'application' : 'checkout'}">
  <header class="header">
    <a class="brand" href="/" aria-label="Builders Club"><span class="symbol" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>builders<br>club</span></a>
    <span class="header-note" ${t('A year before university', 'Un año antes de la universidad')}>A year before university</span>
    <button class="language" type="button" aria-label="Cambiar a español">EN / ES</button>
  </header>
  <main class="document">
    <a class="back" href="/" ${t('← Back to the club', '← Volver al club')}>← Back to the club</a>
    <div class="steps" aria-label="Progress"><span id="step-apply" ${t('01 / Application', '01 / Solicitud')}>01 / Application</span><span class="step-line" aria-hidden="true"></span><span id="step-checkout" ${t('02 / Checkout preview', '02 / Vista previa del pago')}>02 / Checkout preview</span></div>
    <section id="application"${route === 'checkout' ? ' hidden' : ''}>
      <div class="application-layout">
        <aside class="application-aside">
          <p class="eyebrow" ${t('BUILDERS CLUB · APPLICATION', 'BUILDERS CLUB · SOLICITUD')}>BUILDERS CLUB · APPLICATION</p>
          <h1 tabindex="-1" ${t('A little about you.', 'Cuéntanos sobre ti.')}>A little about you.</h1>
          <p class="intro" ${t('Tell us where you are in school and what you’d like to learn next.', 'Cuéntanos en qué etapa escolar estás y qué te gustaría aprender después.')}>Tell us where you are in school and what you’d like to learn next.</p>
          <div class="application-outline" aria-hidden="true"><span ${t('01 · Your details', '01 · Tus datos')}>01 · Your details</span><span ${t('02 · Your graduation', '02 · Tu graduación')}>02 · Your graduation</span><span ${t('03 · Your English', '03 · Tu inglés')}>03 · Your English</span><span ${t('04 · Why Builders Club', '04 · Por qué Builders Club')}>04 · Why Builders Club</span></div>
          <p class="deadline"><span class="dot" aria-hidden="true"></span><span ${t('Apply by November 30, 2026', 'Fecha límite: 30 de noviembre de 2026')}>Apply by November 30, 2026</span></p>
        </aside>
        <form id="application-form" novalidate>
          <fieldset class="question-group contact-group">
            <legend><span class="question-number" aria-hidden="true">01</span><span ${t('Your contact details', 'Tus datos de contacto')}>Your contact details</span></legend>
            <p class="helper" ${t('Start with your name and how we can reach you.', 'Empecemos con tu nombre y cómo podemos contactarte.')}>Start with your name and how we can reach you.</p>
            <div class="field-row contact-row">
              <div class="field"><label for="first-name" ${t('First name', 'Nombre(s)')}>First name</label><input id="first-name" type="text" autocomplete="given-name" required aria-describedby="first-name-error"><p id="first-name-error" class="error" role="alert" hidden ${t('Enter your first name.', 'Escribe tu nombre.')}>Enter your first name.</p></div>
              <div class="field"><label for="last-name" ${t('Last name', 'Apellidos')}>Last name</label><input id="last-name" type="text" autocomplete="family-name" required aria-describedby="last-name-error"><p id="last-name-error" class="error" role="alert" hidden ${t('Enter your last name.', 'Escribe tus apellidos.')}>Enter your last name.</p></div>
            </div>
            <div class="field-row contact-row">
              <div class="field"><label for="telephone" ${t('Telephone number', 'Número de teléfono')}>Telephone number</label><input id="telephone" type="tel" autocomplete="tel" required aria-describedby="telephone-help telephone-error"><p id="telephone-help" class="helper field-help" ${t('Include your country code, e.g. +52.', 'Incluye la lada del país, por ejemplo +52.')}>Include your country code, e.g. +52.</p><p id="telephone-error" class="error" role="alert" hidden ${t('Enter your telephone number.', 'Escribe tu número de teléfono.')}>Enter your telephone number.</p></div>
              <div class="field"><label for="email" ${t('Email address', 'Correo electrónico')}>Email address</label><input id="email" type="email" autocomplete="email" autocapitalize="none" spellcheck="false" required aria-describedby="email-error"><p id="email-error" class="error" role="alert" hidden ${t('Enter a valid email address.', 'Escribe un correo electrónico válido.')}>Enter a valid email address.</p></div>
            </div>
          </fieldset>
          <fieldset class="question-group">
            <legend><span class="question-number" aria-hidden="true">02</span><span ${t('When will you graduate from high school?', '¿Cuándo te gradúas de preparatoria?')}>When will you graduate from high school?</span></legend>
            <p id="graduation-help" class="helper" ${t('Choose the month and year. If you’ve already graduated, enter when you finished.', 'Elige el mes y el año. Si ya terminaste la preparatoria, indica cuándo te graduaste.')}>Choose the month and year. If you’ve already graduated, enter when you finished.</p>
            <div class="field-row">
              <div class="field"><label for="graduation-month" ${t('Month', 'Mes')}>Month</label><select id="graduation-month" required aria-describedby="graduation-help graduation-error"><option value="" ${t('Select month', 'Elige el mes')}>Select month</option></select></div>
              <div class="field"><label for="graduation-year" ${t('Year', 'Año')}>Year</label><select id="graduation-year" required aria-describedby="graduation-help graduation-error"><option value="" ${t('Select year', 'Elige el año')}>Select year</option></select></div>
            </div>
            <p id="graduation-error" class="error" role="alert" hidden ${t('Choose your graduation month and year, or select “Not sure yet”.', 'Elige el mes y el año de graduación, o selecciona “Aún no lo sé”.')}>Choose your graduation month and year, or select “Not sure yet”.</p>
          </fieldset>
          <fieldset class="question-group">
            <legend><span class="question-number" aria-hidden="true">03</span><span ${t('Have you taken an English test?', '¿Has presentado un examen de inglés?')}>Have you taken an English test?</span></legend>
            <p id="english-help" class="helper" ${t('Choose your test and the score scale shown on your report. It’s okay if you haven’t taken one yet.', 'Elige tu examen y la escala que aparece en tu reporte. Si aún no has presentado uno, puedes indicarlo aquí.')}>Choose your test and the score scale shown on your report. It’s okay if you haven’t taken one yet.</p>
            <div class="field"><label for="english-test" ${t('Test and score scale', 'Examen y escala de puntaje')}>Test and score scale</label><select id="english-test" required aria-describedby="english-help english-test-error">
              <option value="" ${t('Select an option', 'Elige una opción')}>Select an option</option>
              <option value="toefl-band" ${t('TOEFL iBT · 1–6', 'TOEFL iBT · 1–6')}>TOEFL iBT · 1–6</option>
              <option value="toefl-total" ${t('TOEFL iBT · 0–120', 'TOEFL iBT · 0–120')}>TOEFL iBT · 0–120</option>
              <option value="ielts" ${t('IELTS · 0–9', 'IELTS · 0–9')}>IELTS · 0–9</option>
              <option value="not-taken" ${t('I haven’t taken a test yet', 'Aún no he presentado un examen')}>I haven’t taken a test yet</option>
              <option value="pending" ${t('I’m waiting for my results', 'Estoy esperando mis resultados')}>I’m waiting for my results</option>
            </select></div>
            <p id="english-test-error" class="error" role="alert" hidden ${t('Select a test or tell us you haven’t received a score yet.', 'Elige un examen o indica que aún no tienes un resultado.')}>Select a test or tell us you haven’t received a score yet.</p>
            <div id="score-field" class="field score-field" hidden><label for="english-score" ${t('Overall score', 'Puntaje total')}>Overall score</label><select id="english-score" aria-describedby="score-help english-score-error"></select><p id="score-help" class="helper"></p><p id="english-score-error" class="error" role="alert" hidden ${t('Select the overall score shown on your report.', 'Elige el puntaje total que aparece en tu reporte.')}>Select the overall score shown on your report.</p></div>
          </fieldset>
          <fieldset class="question-group">
            <legend><span class="question-number" aria-hidden="true">04</span><span ${t('Why Builders Club?', '¿Por qué Builders Club?')}>Why Builders Club?</span></legend>
            <label class="answer-label" for="answer" ${t('Why do you want to join the club?', '¿Por qué quieres unirte al club?')}>Why do you want to join the club?</label>
            <p id="answer-help" class="helper" ${t('You could write about a project you’d like to try or something you want to learn.', 'Puedes contarnos sobre un proyecto que te gustaría intentar o algo que quieras aprender.')}>You could write about a project you’d like to try or something you want to learn.</p>
            <textarea id="answer" required rows="5" aria-describedby="answer-help answer-error" placeholder="Write your answer here."></textarea>
            <p id="answer-error" class="error" role="alert" hidden ${t('Please share why you’d like to join before continuing.', 'Cuéntanos por qué quieres unirte antes de continuar.')}>Please share why you’d like to join before continuing.</p>
          </fieldset>
          <div class="application-submit"><div class="application-actions"><button id="save-application" class="save-application" type="button"><span ${t('Save application', 'Guardar solicitud')}>Save application</span><span aria-hidden="true">↓</span></button><button class="primary payment-cta" type="submit"><span ${t('Proceed Payment', 'Continuar al pago')}>Proceed Payment</span><span aria-hidden="true">↗</span></button></div><p id="save-status" class="save-status" role="status" aria-live="polite"></p><p class="save-help" ${t('Save your draft to return to this page in the same browser. You can save before answering every question.', 'Guarda tu borrador para volver a esta página en el mismo navegador. Puedes guardarlo aunque falten respuestas.')}>Save your draft to return to this page in the same browser. You can save before answering every question.</p><p class="small" ${t('You can review the next step before paying.', 'Puedes revisar el siguiente paso antes de pagar.')}>You can review the next step before paying.</p></div>
          <p class="preview-note" ${t('Design preview. Saved drafts stay in this browser; no application is submitted.', 'Vista previa del diseño. Los borradores guardados se quedan en este navegador; no se envía ninguna solicitud.')}>Design preview. Saved drafts stay in this browser; no application is submitted.</p>
        </form>
      </div>
    </section>
    <section id="checkout"${route === 'apply' ? ' hidden' : ''}>
      <div class="checkout-layout">
        <aside class="payment-summary">
          <a class="brand payment-brand" href="/" aria-label="Builders Club"><span class="symbol" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>builders<br>club</span></a>
          <p class="eyebrow" ${t('YOUR APPLICATION', 'TU SOLICITUD')}>YOUR APPLICATION</p>
          <h1 tabindex="-1" ${t('One more step.', 'Un paso más.')}>One more step.</h1>
          <p class="intro" ${t('Review your details before payment.', 'Revisa tus datos antes de pagar.')}>Review your details before payment.</p>
          <div class="order-total"><span ${t('Application payment', 'Pago de la solicitud')}>Application payment</span><strong ${t('Amount to be confirmed', 'Monto por confirmar')}>Amount to be confirmed</strong></div>
          <dl class="application-review"><div><dt ${t('High school graduation', 'Graduación de preparatoria')}>High school graduation</dt><dd id="review-graduation">—</dd></div><div><dt ${t('English test', 'Examen de inglés')}>English test</dt><dd id="review-english">—</dd></div></dl>
          <a class="text-link" href="/apply/" data-flow ${t('← Edit application', '← Editar solicitud')}>← Edit application</a>
          <p class="summary-note" ${t('Design preview only. No application is submitted and no payment is collected.', 'Solo una vista previa del diseño. No se envía ninguna solicitud ni se realiza ningún cobro.')}>Design preview only. No application is submitted and no payment is collected.</p>
        </aside>
        <div class="payment-content">
          <div class="payment-heading"><h2 ${t('Payment details', 'Datos de pago')}>Payment details</h2><span class="pill" ${t('DESIGN PREVIEW', 'VISTA PREVIA')}>DESIGN PREVIEW</span></div>
          <p id="demo-help" class="helper" ${t('Try the form with sample details only. This mockup is not connected to Stripe.', 'Prueba el formulario solo con datos de ejemplo. Esta maqueta no está conectada a Stripe.')}>Try the form with sample details only. This mockup is not connected to Stripe.</p>
          <form id="payment-demo" autocomplete="off" novalidate aria-describedby="demo-help">
            <div class="field"><label for="payment-email" ${t('Email', 'Correo electrónico')}>Email</label><input id="payment-email" type="email" placeholder="you@example.com" autocomplete="off"></div>
            <fieldset class="card-fields"><legend ${t('Card information', 'Datos de la tarjeta')}>Card information</legend>
              <div class="card-number-row"><label class="visually-hidden" for="card-number" ${t('Card number', 'Número de tarjeta')}>Card number</label><input id="card-number" type="text" inputmode="numeric" placeholder="4242 4242 4242 4242" maxlength="23" autocomplete="off"><span aria-hidden="true">▰</span></div>
              <div class="card-secondary"><div><label class="visually-hidden" for="card-expiry" ${t('Expiration date', 'Fecha de vencimiento')}>Expiration date</label><input id="card-expiry" type="text" inputmode="numeric" placeholder="MM / YY" maxlength="7" autocomplete="off"></div><div><label class="visually-hidden" for="card-cvc" ${t('Security code', 'Código de seguridad')}>Security code</label><input id="card-cvc" type="text" inputmode="numeric" placeholder="CVC" maxlength="4" autocomplete="off"></div></div>
            </fieldset>
            <div class="field"><label for="card-name" ${t('Name on card', 'Nombre en la tarjeta')}>Name on card</label><input id="card-name" type="text" autocomplete="off"></div>
            <div class="field"><label for="billing-country" ${t('Country or region', 'País o región')}>Country or region</label><select id="billing-country"><option value="MX" ${t('Mexico', 'México')}>Mexico</option><option value="US" ${t('United States', 'Estados Unidos')}>United States</option><option value="CA" ${t('Canada', 'Canadá')}>Canada</option><option value="other" ${t('Other', 'Otro')}>Other</option></select></div>
            <div class="field"><label for="billing-postal" ${t('Postal code', 'Código postal')}>Postal code</label><input id="billing-postal" type="text" autocomplete="off" maxlength="12"></div>
            <button class="primary demo-pay" type="submit"><span ${t('Preview payment', 'Vista previa del pago')}>Preview payment</span><span aria-hidden="true">↗</span></button>
            <p class="demo-footnote" ${t('No charge. Payment details are not saved or sent.', 'Sin cargos. Los datos de pago no se guardan ni se envían.')}>No charge. Payment details are not saved or sent.</p>
          </form>
          <div id="payment-confirmation" class="payment-confirmation" hidden tabindex="-1" role="status"><span class="confirmation-mark" aria-hidden="true">✓</span><h2 ${t('Payment preview complete.', 'Vista previa del pago completada.')}>Payment preview complete.</h2><p ${t('This is how a confirmation could look. No payment was processed and no application was submitted.', 'Así podría verse la confirmación. No se procesó ningún pago ni se envió ninguna solicitud.')}>This is how a confirmation could look. No payment was processed and no application was submitted.</p><button type="button" class="text-link" id="reset-payment" ${t('Back to payment preview', 'Volver a la vista previa del pago')}>Back to payment preview</button></div>
        </div>
      </div>
    </section>
    <p id="storage-note" class="preview-note" role="status" hidden ${t('Your browser can’t save your answers in this tab. Copy them before refreshing or leaving.', 'Tu navegador no puede guardar tus respuestas en esta pestaña. Cópialas antes de recargar o salir.')}>Your browser can’t save your answers in this tab. Copy them before refreshing or leaving.</p>
    <noscript>This preview needs JavaScript to continue. / Esta vista previa necesita JavaScript para continuar.</noscript>
  </main>
  <footer><span>builders club · México</span><span ${t('A year before university, in Mexico.', 'Un año antes de la universidad, en México.')}>A year before university, in Mexico.</span></footer>
</body>
</html>`;
}
