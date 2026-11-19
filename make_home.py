# Build the site's home page (index.html at the repo root).
# The page reads shared/toc.js in the browser and draws the contents itself,
# so adding a page only means editing shared/toc.js: this file rarely needs re-running.
head = open('shared/head.html').read()
head = head.replace(head[head.index('<title>'):head.index('</title>') + 8],
                    '<title>MathMastery: from zero to master’s-level math</title>')

# Plain string (not an f-string) so the JavaScript braces below are left alone
body = """<style>
.hch{font:700 24px/1.3 var(--serif);margin:36px 0 6px}
.htier{font:600 11px var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:14px 0 4px}
.hrow{display:flex;gap:14px;align-items:baseline;padding:9px 12px;border-radius:10px;color:var(--ink);text-decoration:none;font:16px/1.4 var(--sans)}
a.hrow:hover{background:var(--accent-bg)}
.hrow .tid{font:500 13px var(--mono);color:var(--accent);min-width:48px}
.hrow.coming{color:var(--muted)}.hrow.coming .tid{color:var(--muted)}
.hrow small{margin-left:auto;color:var(--muted)}
</style>
<div class="topbar"><div class="topbar-in"><span class="brand">Math<b>Mastery</b></span><span class="crumbs">Contents</span></div></div>
<header class="prose hero">
  <div class="kicker">An interactive math textbook</div>
  <h1>MathMastery</h1>
  <p class="dek">From counting to master’s-level mathematics, one idea at a time. Every page builds intuition with interactive tools and clear pictures before any formula.</p>
</header>
<main class="prose">
  <div id="toc"></div>
  <div class="meta" style="margin-top:40px">Every topic has three tiers: Basics, Undergraduate and Masters. Each tier builds on the one before.</div>
</main>
<script src="shared/toc.js"></script>
<script>
// Draw the contents from shared/toc.js
(function(){
  const TIERS = { B: 'Basics', U: 'Undergraduate', M: 'Masters' };
  let h = '';
  (window.MM_TOC || []).forEach(ch => {
    h += `<h2 class="hch">Chapter ${ch.ch} · ${ch.title}</h2>`;
    let tier = '';
    ch.pages.forEach(p => {
      const t = p.id.split('.')[1];
      if (t !== tier){ h += `<div class="htier">${TIERS[t] || t}</div>`; tier = t; }   // tier heading when it changes
      if (p.ext) h += `<a class="hrow" href="${p.url}"><span class="tid">${p.id}</span><span>${p.title}</span><small>explorer ↗</small></a>`;
      else if (p.built) h += `<a class="hrow" href="${p.id.replace(/\\./g, '-')}/index.html"><span class="tid">${p.id}</span><span>${p.title}</span></a>`;
      else h += `<div class="hrow coming"><span class="tid">${p.id}</span><span>${p.title}</span><small>coming</small></div>`;
    });
  });
  document.getElementById('toc').innerHTML = h;
})();
</script>
</body>
</html>
"""
open('index.html', 'w').write(head + '\n' + body)
print('home page built')
