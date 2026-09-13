window.buildersLanguage = (() => {
  let language = 'en';
  try { language = sessionStorage.getItem('builders.language') === 'es' ? 'es' : 'en'; } catch {}
  return {
    get: () => language,
    set(value) {
      language = value === 'es' ? 'es' : 'en';
      document.documentElement.lang = language;
      try { sessionStorage.setItem('builders.language', language); } catch {}
    }
  };
})();
