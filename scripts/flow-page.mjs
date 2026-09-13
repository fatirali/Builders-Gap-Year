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
<body>
  <header class="header">
    <a class="brand" href="/" aria-label="Builders Club"><span class="symbol" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>builders<br>club</span></a>
    <span class="header-note" ${t('A little curiosity goes a long way.', 'La curiosidad te lleva lejos.')}>A little curiosity goes a long way.</span>
    <button class="language" type="button" aria-label="Cambiar a español">EN / ES</button>
  </header>
  <main class="document">
    <a class="back" href="/" ${t('← Back to the club', '← Volver al club')}>← Back to the club</a>
    <div class="steps" aria-label="Progress"><span id="step-apply" ${t('01 / Application', '01 / Solicitud')}>01 / Application</span><span class="step-line" aria-hidden="true"></span><span id="step-checkout" ${t('02 / Save your spot', '02 / Reserva tu lugar')}>02 / Save your spot</span></div>
    <section id="application"${route === 'checkout' ? ' hidden' : ''}>
      <div class="page-mark" aria-hidden="true">↗</div>
      <p class="eyebrow" ${t('BUILDERS CLUB · APPLICATION', 'BUILDERS CLUB · SOLICITUD')}>BUILDERS CLUB · APPLICATION</p>
      <h1 tabindex="-1" ${t('Your next chapter starts here.', 'Tu siguiente capítulo empieza aquí.')}>Your next chapter starts here.</h1>
      <p class="intro" ${t('Big things begin with a simple question. Let’s start with yours.', 'Las grandes cosas empiezan con una pregunta sencilla. Empecemos contigo.')}>Big things begin with a simple question. Let’s start with yours.</p>
      <p class="deadline"><span class="dot" aria-hidden="true"></span><span ${t('Apply by November 30, 2026', 'Postúlate antes del 30 de noviembre de 2026')}>Apply by November 30, 2026</span></p>
      <form novalidate>
        <label for="answer" ${t('Why do you want to join the club?', '¿Por qué quieres unirte al club?')}>Why do you want to join the club?</label>
        <p id="answer-help" class="helper" ${t('Tell us what you’re curious about, what you’d like to build, and what you hope to get out of the year.', 'Cuéntanos qué te da curiosidad, qué te gustaría crear y qué esperas aprender durante el año.')}>Tell us what you’re curious about, what you’d like to build, and what you hope to get out of the year.</p>
        <textarea id="answer" required rows="7" aria-describedby="answer-help answer-error" placeholder="Start anywhere. This is your space."></textarea>
        <p id="answer-error" class="error" role="alert" hidden ${t('Please share why you’d like to join before continuing.', 'Cuéntanos por qué quieres unirte antes de continuar.')}>Please share why you’d like to join before continuing.</p>
        <div class="form-bottom"><span class="small" ${t('Your words. Your reasons.', 'Tus palabras. Tus motivos.')}>Your words. Your reasons.</span><button class="primary" type="submit"><span ${t('Submit application', 'Enviar solicitud')}>Submit application</span><span aria-hidden="true">↗</span></button></div>
      </form>
      <p class="preview-note" ${t('Preview only. Your answer stays in this tab and isn’t sent.', 'Solo una vista previa. Tu respuesta se queda en esta pestaña y no se envía.')}>Preview only. Your answer stays in this tab and isn’t sent.</p>
    </section>
    <section id="checkout"${route === 'apply' ? ' hidden' : ''}>
      <div class="page-mark" aria-hidden="true">↗</div>
      <p class="eyebrow" ${t('BUILDERS CLUB · NEXT STEP', 'BUILDERS CLUB · SIGUIENTE PASO')}>BUILDERS CLUB · NEXT STEP</p>
      <h1 tabindex="-1" ${t('Next: save your spot', 'Ahora: reserva tu lugar')}>Next: save your spot</h1>
      <p class="intro" ${t('A little closer to your next chapter.', 'Un poco más cerca de tu siguiente capítulo.')}>A little closer to your next chapter.</p>
      <div class="checkout-card"><span class="pill" ${t('CHECKOUT PREVIEW', 'VISTA PREVIA DEL PAGO')}>CHECKOUT PREVIEW</span><h2 ${t('Room for what comes next.', 'Espacio para lo que viene.')}>Room for what comes next.</h2><p ${t('Stripe checkout will appear here. This preview hasn’t submitted an application or reserved a spot.', 'Aquí aparecerá el pago con Stripe. Esta vista previa no ha enviado una solicitud ni reservado un lugar.')}>Stripe checkout will appear here. This preview hasn’t submitted an application or reserved a spot.</p><div class="checkout-foot" ${t('No payment is collected in this preview.', 'No se realizan cobros en esta vista previa.')}>No payment is collected in this preview.</div></div>
      <div class="checkout-actions"><a class="primary" href="/apply/" data-flow><span ${t('Back to application', 'Volver a la solicitud')}>Back to application</span><span aria-hidden="true">↗</span></a><a class="text-link" href="/" ${t('Return home', 'Volver al inicio')}>Return home</a></div>
    </section>
    <p id="storage-note" class="preview-note" role="status" hidden ${t('Tab storage is unavailable. Your answer stays here while you move between these two steps, but refreshing or leaving this page may clear it.', 'El almacenamiento de la pestaña no está disponible. Tu respuesta se conserva entre estos dos pasos, pero puede borrarse al recargar o salir de esta página.')}>Tab storage is unavailable. Your answer stays here while you move between these two steps, but refreshing or leaving this page may clear it.</p>
    <noscript>This preview needs JavaScript to continue. / Esta vista previa necesita JavaScript para continuar.</noscript>
  </main>
  <footer><span>builders club · México</span><span ${t('Made of curiosity. Built by you.', 'Hecho de curiosidad. Creado por ti.')}>Made of curiosity. Built by you.</span></footer>
</body>
</html>`;
}
