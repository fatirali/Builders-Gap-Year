(() => {
  const $ = selector => document.querySelector(selector);
  const form = $('#application-form');
  const fields = {firstName:$('#first-name'), lastName:$('#last-name'), telephone:$('#telephone'), email:$('#email'), month:$('#graduation-month'), year:$('#graduation-year'), test:$('#english-test'), score:$('#english-score'), answer:$('#answer')};
  const language = window.buildersLanguage;
  const storageNote = $('#storage-note');
  const scales = {
    'toefl-band': {min:1, max:6, step:.5, en:'TOEFL iBT overall score: 1–6, in half-point steps.', es:'Puntaje total de TOEFL iBT: de 1 a 6, en incrementos de medio punto.'},
    'toefl-total': {min:0, max:120, step:1, en:'Enter your reported total on the 0–120 scale.', es:'Indica el puntaje total de tu reporte en la escala de 0 a 120.'},
    ielts: {min:0, max:9, step:.5, en:'IELTS overall band: 0–9, including half bands such as 7.5.', es:'Banda global de IELTS: de 0 a 9, incluidos medios puntos como 7.5.'}
  };
  let draft = {};
  let saveState = '';
  let lastSaved = '';
  try {
    sessionStorage.setItem('builders.storage-test', '1');
    sessionStorage.removeItem('builders.storage-test');
    const saved = JSON.parse(sessionStorage.getItem('builders.application') || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) draft = saved;
    if (typeof draft.answer !== 'string') draft.answer = sessionStorage.getItem('builders.answer') || '';
  } catch { storageNote.hidden = false; }
  try {
    const saved = JSON.parse(localStorage.getItem('builders.saved-application') || 'null');
    if (saved?.values && typeof saved.values === 'object' && !Array.isArray(saved.values)) {
      lastSaved = JSON.stringify(saved.values);
      if (!Object.values(draft).some(value => typeof value === 'string' && value)) {
        draft = saved.values;
        saveState = 'restored';
        if (saved.language === 'en' || saved.language === 'es') language.set(saved.language);
      }
    }
  } catch { /* Saving reports unavailable storage when the applicant tries it. */ }
  const snapshot = () => Object.fromEntries(Object.entries(fields).map(([key,field])=>[key,field.value]));
  function renderSaveState() {
    const es=language.get()==='es';
    const messages = {
      saved: es?'✓ Solicitud guardada en este navegador. Puedes volver después.':'✓ Application saved in this browser. You can come back later.',
      restored: es?'Tu borrador guardado está listo para continuar.':'Your saved draft is ready to continue.',
      edited: es?'Tienes cambios sin guardar. Guarda de nuevo antes de salir.':'You have unsaved changes. Save again before leaving.',
      error: es?'No se pudo guardar el borrador. Este navegador no permite guardarlo; mantén esta pestaña abierta o copia tus respuestas.':'Couldn’t save your draft. This browser isn’t allowing it; keep this tab open or copy your answers.'
    };
    $('#save-status').textContent=messages[saveState]||'';
    $('#save-status').classList.toggle('error',saveState==='error');
  }
  function options(select, rows, value) {
    select.replaceChildren(...rows.map(([key,label]) => new Option(label,key)));
    select.value = value;
    if (select.selectedIndex < 0) select.value = '';
  }
  function updateScore(value = fields.score.value) {
    const scale = scales[fields.test.value];
    const es = language.get() === 'es';
    $('#score-field').hidden = !scale;
    fields.score.required = !!scale;
    fields.score.disabled = !scale;
    const rows = [['',es?'Elige tu puntaje':'Select your score']];
    if (scale) {
      for (let n=scale.min;n<=scale.max;n+=scale.step) rows.push([String(n),String(n)]);
      $('#score-help').textContent = scale[es?'es':'en'];
    } else value = '';
    options(fields.score,rows,value);
  }
  function translate() {
    const lang = language.get();
    const es = lang === 'es';
    language.set(lang);
    document.querySelectorAll('[data-en]').forEach(el => {el.textContent=el.dataset[lang]});
    const months = [['',es?'Elige el mes':'Select month']];
    for (let month=0;month<12;month++) months.push([String(month+1),new Intl.DateTimeFormat(es?'es-MX':'en',{month:'long'}).format(new Date(2026,month,1))]);
    months.push(['unsure',es?'Aún no lo sé':'Not sure yet']);
    options(fields.month, months, fields.month.value);
    const years = [['',es?'Elige el año':'Select year']];
    const current = new Date().getFullYear();
    for(let year=current-10;year<=current+10;year++) years.push([String(year),String(year)]);
    years.push(['unsure',es?'Aún no lo sé':'Not sure yet']);
    options(fields.year,years,fields.year.value);
    updateScore();
    fields.answer.placeholder = es?'Escribe tu respuesta aquí.':'Write your answer here.';
    $('#payment-email').placeholder=es?'tu@ejemplo.com':'you@example.com';
    $('#card-expiry').placeholder=es?'MM / AA':'MM / YY';
    $('.language').textContent = es?'ES / EN':'EN / ES';
    $('.language').setAttribute('aria-label',es?'Switch to English':'Cambiar a español');
    $('.steps').setAttribute('aria-label',es?'Progreso':'Progress');
    document.title = `${location.pathname.startsWith('/checkout')?(es?'Vista previa del pago':'Checkout preview'):(es?'Solicitud':'Apply')} — Builders Club`;
    updateReview();
    renderSaveState();
  }
  function updateReview() {
    const es=language.get()==='es';
    const chosen=field=>field.value?field.selectedOptions[0]?.textContent:'';
    const graduation=[chosen(fields.month),chosen(fields.year)].filter(Boolean).join(' · ');
    $('#review-graduation').textContent=graduation||(es?'Aún no se ha indicado':'Not provided yet');
    const test=chosen(fields.test);
    $('#review-english').textContent=test?`${test}${fields.score.value?' · '+fields.score.value:''}`:(es?'Aún no se ha indicado':'Not provided yet');
  }
  function persist() {
    try {
      sessionStorage.setItem('builders.application',JSON.stringify(snapshot()));
      sessionStorage.setItem('builders.answer',fields.answer.value);
    } catch {storageNote.hidden=false}
    if(lastSaved){saveState=JSON.stringify(snapshot())===lastSaved?'saved':'edited';renderSaveState()}
  }
  function validate(show = true) {
    const errors = [
      ['first-name-error',[fields.firstName]],
      ['last-name-error',[fields.lastName]],
      ['telephone-error',[fields.telephone]],
      ['email-error',[fields.email]],
      ['graduation-error',[fields.month,fields.year]],
      ['english-test-error',[fields.test]],
      ['english-score-error',fields.score.required?[fields.score]:[]],
      ['answer-error',[fields.answer]]
    ];
    let first;
    for(const [id,group] of errors){
      const missing = group.filter(field=>!field.value.trim() || !field.validity.valid);
      if(show || !missing.length) $('#'+id).hidden=!missing.length;
      for(const field of group){
        if(show && missing.includes(field)) field.setAttribute('aria-invalid','true');
        else if(!missing.includes(field)) field.removeAttribute('aria-invalid');
      }
      first ||= missing[0];
    }
    if(!fields.score.required){$('#english-score-error').hidden=true;fields.score.removeAttribute('aria-invalid')}
    return first;
  }
  function showStep(focus = false) {
    const checkout=location.pathname.startsWith('/checkout');
    $('#application').hidden=checkout;$('#checkout').hidden=!checkout;
    document.body.dataset.step=checkout?'checkout':'application';
    $('#step-apply').setAttribute('aria-current',checkout?'false':'step');
    $('#step-checkout').setAttribute('aria-current',checkout?'step':'false');
    translate();
    if(focus){$(checkout?'#checkout h1':'#application h1').focus();window.scrollTo(0,0)}
  }
  function navigate(path){history.pushState(null,'',path);showStep(true)}
  translate();
  for(const key of ['firstName','lastName','telephone','email','month','year','test','answer']) if(typeof draft[key]==='string')fields[key].value=draft[key];
  updateScore(typeof draft.score==='string'?draft.score:'');
  if(lastSaved && saveState!=='restored')saveState=JSON.stringify(snapshot())===lastSaved?'saved':'edited';
  $('#save-application').addEventListener('click',()=>{
    try {
      const values=snapshot();
      const serialized=JSON.stringify({values,language:language.get()});
      localStorage.setItem('builders.saved-application',serialized);
      if(localStorage.getItem('builders.saved-application')!==serialized)throw Error('Draft not saved');
      lastSaved=JSON.stringify(values);
      saveState='saved';
      persist();
    } catch {saveState='error'}
    renderSaveState();
  });
  form.addEventListener('input',()=>{persist();validate(false)});
  fields.test.addEventListener('change',()=>{updateScore('');fields.score.removeAttribute('aria-invalid');$('#english-score-error').hidden=true;persist();validate(false)});
  form.addEventListener('change',()=>{persist();validate(false)});
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const invalid=validate();if(invalid){invalid.focus();return}
    persist();navigate('/checkout/');
  });
  $('[data-flow]').addEventListener('click',event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();resetPayment();navigate('/apply/');
  });
  function resetPayment() {
    $('#payment-demo').reset();
    $('#payment-demo').hidden=false;
    $('#payment-confirmation').hidden=true;
  }
  $('#payment-demo').addEventListener('submit',event=>{
    event.preventDefault();
    $('#payment-demo').reset();
    $('#payment-demo').hidden=true;
    $('#payment-confirmation').hidden=false;
    $('#payment-confirmation').focus();
  });
  $('#reset-payment').addEventListener('click',()=>{resetPayment();$('#payment-email').focus()});
  $('.language').addEventListener('click',()=>{language.set(language.get()==='en'?'es':'en');translate()});
  window.addEventListener('popstate',()=>{resetPayment();showStep(true)});
  showStep();
})();
