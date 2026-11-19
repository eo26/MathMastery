# Assemble one MathMastery page from shared parts + the page's own body.
#   python3 build_page.py 1-B-4 "1.B.4 Equivalent Ratios · MathMastery"          -> artifact build (links to Claude artifacts)
#   python3 build_page.py 1-B-4 "1.B.4 Equivalent Ratios · MathMastery" --site   -> GitHub site build (relative links)
import sys

pid, title = sys.argv[1], sys.argv[2]                         # page folder (1-B-4) and browser-tab title
site = '--site' in sys.argv                                   # site mode switches every nav link to ../<id>/index.html

head = open('shared/head.html').read()                         # fonts, MathJax, book-wide CSS, ends with <body>
head = head.replace(head[head.index('<title>'):head.index('</title>') + 8], f'<title>{title}</title>')
nav_css = open('shared/nav.css').read()
if site:
    # GitHub build: every page links the SAME shared files, so a contents change is one edit to shared/toc.js
    extra = '<meta name="mm-site" content="1">\n<link rel="stylesheet" href="../shared/nav.css">\n'
else:
    # Claude-artifact build: artifacts can't share files, so the nav is inlined into each page
    extra = f'<style>\n{nav_css}</style>\n'
head = head.replace('</head>', extra + '</head>')

body = open(f'{pid}/body.html').read()
assert body.rstrip().endswith('</html>'), 'body.html must end with </body></html>'
if site:
    nav_tags = '<script src="../shared/toc.js"></script>\n<script src="../shared/nav.js"></script>\n'
else:
    nav_tags = '<script>\n' + open('shared/toc.js').read() + '\n' + open('shared/nav.js').read() + '</script>\n'
body = body.replace('</body>', nav_tags + '</body>')   # navigation runs after the page's own script

# Site builds go in the page folder (committed to GitHub); artifact builds go in _artifact/ (ignored by git)
import os
out = f'{pid}/index.html' if site else f'_artifact/{pid}/index.html'
os.makedirs(os.path.dirname(out), exist_ok=True)
open(out, 'w').write(head + '\n' + body)
print('built', out)
