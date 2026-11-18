(() => {
  const root = document.documentElement;
  const lang = root.lang;
  // No tracker is loaded by default. Send only fixed event labels and page paths.
  // Campaign attribution belongs to the clicked entry URL, not new internal UTMs.
  const track = (name, properties = {}) => {
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
    if (window.umami?.track) window.umami.track(name, properties);
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const target = new URL(link.href, location.href);
    let name;
    if (link.hasAttribute('download')) name = 'resource_download';
    else if (target.hostname === 'linnet-builds.kit.com') name = 'newsletter_open';
    else if (target.hostname === 'github.com') name = 'github_open';
    else if (target.origin === location.origin && /\/(?:notes|notas)\/[^/]+\/index.html$/.test(target.pathname)) name = 'note_open';
    if (name) track(name, { page: location.pathname, destination: target.pathname });
  });
  const input = document.querySelector('[data-search]');
  const filters = [...document.querySelectorAll('[data-topic]')];
  const cards = [...document.querySelectorAll('[data-note]')];
  let topic = 'all';
  const normalize = value => value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const update = () => {
    const query = normalize(input?.value || '');
    let count = 0;
    for (const card of cards) {
      const match = (topic === 'all' || card.dataset.noteTopic === topic) && normalize(card.dataset.searchText).includes(query);
      card.hidden = !match;
      if (match) count++;
    }
    const total = document.querySelector('[data-count]');
    if (total) total.textContent = lang === 'es' ? `${count} ${count === 1 ? 'nota' : 'notas'}` : `${count} ${count === 1 ? 'note' : 'notes'}`;
    const empty = document.querySelector('[data-empty]');
    if (empty) empty.hidden = count > 0;
  };
  if (input) input.addEventListener('input', update);
  filters.forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.topic;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    update();
  }));
  if (input) update();
  document.querySelectorAll('pre').forEach(pre => {
    const block = document.createElement('div');
    block.className = 'code-block';
    pre.before(block);
    block.append(pre);
    const button = document.createElement('button');
    button.className = 'copy-code';
    button.type = 'button';
    button.textContent = lang === 'es' ? 'Copiar' : 'Copy';
    button.setAttribute('aria-label', lang === 'es' ? 'Copiar este bloque de código' : 'Copy this code block');
    block.prepend(button);
    button.addEventListener('click', async () => {
      button.textContent = lang === 'es' ? 'Copiando...' : 'Copying...';
      try {
        await Promise.race([
          navigator.clipboard.writeText(pre.textContent),
          new Promise((resolve, reject) => setTimeout(() => reject(new Error('Clipboard unavailable')), 1500))
        ]);
        button.textContent = lang === 'es' ? 'Copiado' : 'Copied';
        track('code_copy', { page: location.pathname });
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(pre); selection.removeAllRanges(); selection.addRange(range);
        button.textContent = lang === 'es' ? 'Seleccionado: Ctrl+C' : 'Selected: Ctrl+C';
      }
    });
  });
})();
