/* MathMastery navigation: a Contents menu in the top bar and live Previous/Next cards.
   Works in two places without edits:
   - as published Claude artifacts: links use each page's artifact url
   - on the GitHub site: a <meta name="mm-site"> tag (added by build_page.py --site) switches every link
     to a relative path like ../1-B-4/index.html */
(function(){
  const SITE = !!document.querySelector('meta[name="mm-site"]');            // which kind of build is this?
  const TIERS = { B: 'Basics', U: 'Undergraduate', M: 'Masters' };
  // Flatten the table of contents into one ordered list of pages
  const pages = [];
  (window.MM_TOC || []).forEach(ch => ch.pages.forEach(p => pages.push(Object.assign({ ch: ch.ch, chTitle: ch.title }, p))));
  const ready = p => p.ext ? !!p.url : (SITE ? !!p.built : !!p.url);          // can we link to this page?
  const href = p => (p.ext || !SITE) ? p.url : `../${p.id.replace(/\./g, '-')}/index.html`;   // explorers always use their own url
  const pidEl = document.querySelector('.pid');
  const curId = pidEl ? pidEl.textContent.trim() : '';
  const cur = pages.findIndex(p => p.id === curId);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* ---------- Contents menu in the top bar ---------- */
  const bar = document.querySelector('.topbar-in');
  if (bar){
    const btn = document.createElement('button');
    btn.className = 'tocbtn'; btn.type = 'button'; btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '☰&nbsp; Contents';
    bar.insertBefore(btn, pidEl || null);
    const panel = document.createElement('div');
    panel.className = 'tocpanel'; panel.setAttribute('role', 'menu');
    let h = '';
    (window.MM_TOC || []).forEach(ch => {
      h += `<div class="tocch">Chapter ${ch.ch} · ${esc(ch.title)}</div>`;
      let lastTier = '';
      ch.pages.forEach(p => {
        const tier = p.id.split('.')[1];
        if (tier !== lastTier){ h += `<div class="toctier">${TIERS[tier] || tier}</div>`; lastTier = tier; }
        const isCur = p.id === curId;
        const inner = `<span class="tid">${p.id}</span><span>${esc(p.title)}</span>${isCur ? '<small>you are here</small>' : (p.ext ? '<small>explorer ↗</small>' : (ready(p) ? '' : '<small>coming</small>'))}`;
        h += ready(p) && !isCur
          ? `<a class="tocrow" href="${href(p)}">${inner}</a>`
          : `<div class="tocrow ${isCur ? 'cur' : 'coming'}">${inner}</div>`;
      });
    });
    panel.innerHTML = h;
    bar.appendChild(panel);
    const setOpen = open => { panel.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', e => { e.stopPropagation(); setOpen(!panel.classList.contains('open')); });
    document.addEventListener('click', e => { if (!panel.contains(e.target)) setOpen(false); });   // click outside closes
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- Previous / Next cards ---------- */
  const pager = document.querySelector('.pager');
  if (pager && cur >= 0){
    // The nearest page in a direction that can actually be opened (for "skip ahead" links)
    const nearestReady = (from, step) => { for (let j = from; j >= 0 && j < pages.length; j += step) if (ready(pages[j])) return pages[j]; return null; };
    const card = (p, dir) => {
      const head = `<small>${dir < 0 ? '← Previous' : 'Next →'}</small>`;
      const cls = dir > 0 ? 'next' : '';
      if (!p) return `<div class="${cls} soon"><span class="dimtxt">${head}${dir < 0 ? 'Start of the book' : 'End of what’s written so far'}</span></div>`;
      if (ready(p)) return `<a class="${cls}" href="${href(p)}">${head}${p.id} ${esc(p.title)}</a>`;
      const alt = nearestReady(pages.indexOf(p) + dir, dir);
      const skip = alt ? `<a class="skip" href="${href(alt)}">${dir < 0 ? '← Back to' : 'Skip ahead to'} ${alt.id} ${esc(alt.title)}${dir > 0 ? ' →' : ''}</a>` : '';
      return `<div class="${cls} soon"><span class="dimtxt">${head}${p.id} ${esc(p.title)} (coming)</span>${skip}</div>`;
    };
    pager.innerHTML = card(pages[cur - 1], -1) + card(pages[cur + 1], 1);
  }
})();
