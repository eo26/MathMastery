# Build the site's home page (index.html at the repo root) from the shared table of contents.
import json, re, subprocess
head = open('shared/head.html').read()
head = head.replace(head[head.index('<title>'):head.index('</title>') + 8], '<title>MathMastery: from zero to master’s-level math</title>')
toc_js = open('shared/toc.js').read()
# Pull the TOC data out of toc.js by running it through node (keeps toc.js the single source of truth)
data = json.loads(subprocess.check_output(['node', '-e', toc_js.replace('window.MM_TOC', 'globalThis.MM_TOC') + ';console.log(JSON.stringify(MM_TOC))']))
TIERS = {'B': 'Basics', 'U': 'Undergraduate', 'M': 'Masters'}
rows = ''
for ch in data:
    rows += f'<h2 class="hch">Chapter {ch["ch"]} · {ch["title"]}</h2>'
    tier = ''
    for p in ch['pages']:
        t = p['id'].split('.')[1]
        if t != tier:
            rows += f'<div class="htier">{TIERS.get(t, t)}</div>'; tier = t
        if p.get('ext'):
            rows += f'<a class="hrow" href="{p["url"]}"><span class="tid">{p["id"]}</span><span>{p["title"]}</span><small>explorer ↗</small></a>'
        elif p.get('built'):
            rows += f'<a class="hrow" href="{p["id"].replace(".", "-")}/index.html"><span class="tid">{p["id"]}</span><span>{p["title"]}</span></a>'
        else:
            rows += f'<div class="hrow coming"><span class="tid">{p["id"]}</span><span>{p["title"]}</span><small>coming</small></div>'
css = """<style>
.hch{font:700 24px/1.3 var(--serif);margin:36px 0 6px}
.htier{font:600 11px var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:14px 0 4px}
.hrow{display:flex;gap:14px;align-items:baseline;padding:9px 12px;border-radius:10px;color:var(--ink);text-decoration:none;font:16px/1.4 var(--sans)}
a.hrow:hover{background:var(--accent-bg)}
.hrow .tid{font:500 13px var(--mono);color:var(--accent);min-width:48px}
.hrow.coming{color:var(--muted)}.hrow.coming .tid{color:var(--muted)}
.hrow small{margin-left:auto;color:var(--muted)}
</style>"""
body = f"""{css}
<div class="topbar"><div class="topbar-in"><span class="brand">Math<b>Mastery</b></span><span class="crumbs">Contents</span></div></div>
<header class="prose hero">
  <div class="kicker">An interactive math textbook</div>
  <h1>MathMastery</h1>
  <p class="dek">From counting to master’s-level mathematics, one idea at a time. Every page builds intuition with interactive tools and clear pictures before any formula.</p>
</header>
<main class="prose">{rows}<div class="meta" style="margin-top:40px">Every topic has three tiers: Basics, Undergraduate and Masters. Each tier builds on the one before.</div></main>
</body>
</html>"""
open('index.html', 'w').write(head + '\n' + body)
print('home page built')
