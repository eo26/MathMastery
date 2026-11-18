# Assemble one MathMastery page from shared parts + the page's own body.
#   python3 build_page.py 1-B-4 "1.B.4 Equivalent Ratios · MathMastery"          -> artifact build (links to Claude artifacts)
#   python3 build_page.py 1-B-4 "1.B.4 Equivalent Ratios · MathMastery" --site   -> GitHub site build (relative links)
import sys

pid, title = sys.argv[1], sys.argv[2]                         # page folder (1-B-4) and browser-tab title
site = '--site' in sys.argv                                   # site mode switches every nav link to ../<id>/index.html

head = open('shared/head.html').read()                         # fonts, MathJax, book-wide CSS, ends with <body>
head = head.replace(head[head.index('<title>'):head.index('</title>') + 8], f'<title>{title}</title>')
nav_css = open('shared/nav.css').read()
extra = f'<style>\n{nav_css}</style>\n'
if site:
    extra = '<meta name="mm-site" content="1">\n' + extra       # nav.js looks for this tag
head = head.replace('</head>', extra + '</head>')

body = open(f'{pid}/body.html').read()
nav = open('shared/toc.js').read() + '\n' + open('shared/nav.js').read()
assert body.rstrip().endswith('</html>'), 'body.html must end with </body></html>'
body = body.replace('</body>', f'<script>\n{nav}</script>\n</body>')   # navigation runs after the page's own script

open(f'{pid}/index.html', 'w').write(head + '\n' + body)
print('built', pid, '(site)' if site else '(artifact)')
