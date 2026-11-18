# Rebuild every page (artifact mode by default, or --site for the GitHub build)
import json, subprocess, sys
for pid, (title, slug) in json.load(open('pages.json')).items():
    subprocess.run(['python3', 'build_page.py', pid, title] + (['--site'] if '--site' in sys.argv else []), check=True)
