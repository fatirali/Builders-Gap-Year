(() => {
  const answer = document.querySelector('#answer');
  const error = document.querySelector('#answer-error');
  const storageNote = document.querySelector('#storage-note');
  const language = window.buildersLanguage;
  let storageAvailable = true;
  try {
    sessionStorage.setItem('builders.storage-test', '1');
    sessionStorage.removeItem('builders.storage-test');
    answer.value = sessionStorage.getItem('builders.answer') || '';
  } catch { storageAvailable = false; }
  storageNote.hidden = storageAvailable;
  function translate() {
    const lang = language.get();
    language.set(lang);
    document.querySelectorAll('[data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
    answer.placeholder = lang === 'en' ? 'Start anywhere. This is your space.' : 'Empieza por donde quieras. Este es tu espacio.';
    document.querySelector('.language').textContent = lang === 'en' ? 'EN / ES' : 'ES / EN';
    document.querySelector('.language').setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    document.querySelector('.steps').setAttribute('aria-label', lang === 'en' ? 'Progress' : 'Progreso');
    document.title = `${location.pathname.startsWith('/checkout') ? (lang === 'en' ? 'Checkout preview' : 'Vista previa del pago') : (lang === 'en' ? 'Apply' : 'Solicitud')} — Builders Club`;
  }
  function showStep(focus = false) {
    const checkout = location.pathname.startsWith('/checkout');
    document.querySelector('#application').hidden = checkout;
    document.querySelector('#checkout').hidden = !checkout;
    document.querySelector('#step-apply').setAttribute('aria-current', checkout ? 'false' : 'step');
    document.querySelector('#step-checkout').setAttribute('aria-current', checkout ? 'step' : 'false');
    translate();
    if (focus) {
      document.querySelector(checkout ? '#checkout h1' : '#application h1').focus();
      window.scrollTo(0, 0);
    }
  }
  function navigate(path) { history.pushState(null, '', path); showStep(true); }
  answer.addEventListener('input', () => {
    if (answer.value.trim()) { error.hidden = true; answer.removeAttribute('aria-invalid'); }
    try { sessionStorage.setItem('builders.answer', answer.value); }
    catch { storageAvailable = false; storageNote.hidden = false; }
  });
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    if (!answer.value.trim()) {
      error.hidden = false;
      answer.setAttribute('aria-invalid', 'true');
      answer.focus();
      return;
    }
    navigate('/checkout/');
  });
  document.querySelector('[data-flow]').addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); navigate('/apply/');
  });
  document.querySelector('.language').addEventListener('click', () => {
    language.set(language.get() === 'en' ? 'es' : 'en'); translate();
  });
  window.addEventListener('popstate', () => showStep(true));
  showStep();
})();
