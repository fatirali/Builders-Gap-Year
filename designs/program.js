(() => {
  const timeline = document.querySelector('.bc-timeline');
  if (!timeline) return;
  const list = timeline.querySelector('.bc-phase-list');
  const details = timeline.querySelector('.bc-phase-details');
  const phases = [...list.querySelectorAll('.bc-phase')];
  const buttons = phases.map(phase => phase.querySelector('button'));
  const panels = phases.map(phase => phase.querySelector('.bc-phase-panel'));
  const mobile = matchMedia('(max-width:700px)');
  const hover = matchMedia('(hover:hover) and (pointer:fine)');
  let selected = 0;
  let hoverTimer;
  let measuredWidth = 0;

  function reservePanelHeight() {
    const width = details.clientWidth;
    if (!width || width === measuredWidth) return;
    measuredWidth = width;
    let height = 0;
    // Measure both translations without altering the visible text or selected phase.
    for (const panel of panels) for (const language of ['en', 'es']) {
      const sample = panel.cloneNode(true);
      sample.removeAttribute('id');
      sample.removeAttribute('data-active');
      sample.setAttribute('aria-hidden', 'true');
      sample.inert = true;
      sample.style.cssText = 'position:absolute;width:100%;height:auto;visibility:hidden;pointer-events:none';
      sample.querySelectorAll('[data-en]').forEach(element => { element.textContent = element.dataset[language]; });
      details.append(sample);
      height = Math.max(height, sample.getBoundingClientRect().height);
      sample.remove();
    }
    details.style.minHeight = `${Math.ceil(height)}px`;
  }

  function cancelHover() { clearTimeout(hoverTimer); }
  function updateRail() {
    const centers = buttons.map(button => button.offsetTop + button.parentElement.parentElement.offsetTop + 34.5);
    const height = centers.at(-1) - centers[0];
    list.style.setProperty('--rail-top', `${centers[0]}px`);
    list.style.setProperty('--rail-height', `${height}px`);
    list.style.setProperty('--rail-progress', height ? (centers[selected] - centers[0]) / height : 0);
  }
  function select(index) {
    cancelHover();
    selected = index;
    buttons.forEach((button, i) => {
      const active = i === selected;
      button.toggleAttribute('data-active', active);
      button.tabIndex = mobile.matches || active ? 0 : -1;
      button.setAttribute(mobile.matches ? 'aria-expanded' : 'aria-selected', String(active));
      panels[i].toggleAttribute('data-active', active);
      panels[i].setAttribute('aria-hidden', String(!active));
      panels[i].inert = !active;
      panels[i].tabIndex = active && !mobile.matches ? 0 : -1;
    });
    updateRail();
  }
  function layout() {
    cancelHover();
    list.setAttribute('role', mobile.matches ? 'group' : 'tablist');
    if (mobile.matches) list.removeAttribute('aria-orientation');
    else list.setAttribute('aria-orientation', 'vertical');
    buttons.forEach((button, i) => {
      button.setAttribute('role', mobile.matches ? 'button' : 'tab');
      button.removeAttribute(mobile.matches ? 'aria-selected' : 'aria-expanded');
      phases[i].setAttribute('role', 'presentation');
      button.parentElement.setAttribute('role', mobile.matches ? 'heading' : 'presentation');
      if (mobile.matches) button.parentElement.setAttribute('aria-level', '3');
      else button.parentElement.removeAttribute('aria-level');
      panels[i].setAttribute('role', mobile.matches ? 'region' : 'tabpanel');
      (mobile.matches ? phases[i] : details).append(panels[i]);
    });
    select(selected);
    reservePanelHeight();
  }
  buttons.forEach((button, i) => {
    button.addEventListener('pointerenter', () => {
      cancelHover();
      if (hover.matches && !mobile.matches) hoverTimer = setTimeout(() => {
        // Do not hide a panel while someone is reading it with keyboard focus.
        if (!panels[selected].contains(document.activeElement)) select(i);
      }, 120);
    });
    button.addEventListener('pointerleave', cancelHover);
    button.addEventListener('focus', () => select(i));
    button.addEventListener('click', () => select(i));
    button.addEventListener('keydown', event => {
      if (mobile.matches) return;
      const destinations = {ArrowDown:(i+1)%buttons.length, ArrowUp:(i+buttons.length-1)%buttons.length, Home:0, End:buttons.length-1};
      if (!(event.key in destinations)) return;
      event.preventDefault();
      buttons[destinations[event.key]].focus();
    });
  });
  timeline.dataset.enhanced = '';
  mobile.addEventListener('change', layout);
  layout();
  new ResizeObserver(updateRail).observe(list);
  new ResizeObserver(reservePanelHeight).observe(details);
  document.fonts.ready.then(() => { measuredWidth = 0; reservePanelHeight(); });
})();
