import glob
import re

html_files = glob.glob("*.html")

about_link = '''
            <a href="about.html" class="nav-liked-btn" style="text-decoration: none; display: flex; align-items: center; gap: 5px;">
                About Us
            </a>'''

for f_name in html_files:
    if f_name == 'about.html':
        continue
        
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'about.html' not in content:
        # Find the Liked link block
        pattern = r'(<a href="javascript:void\(0\)" onclick="openFavoritesOverlay\(\); return false;" class="nav-liked-btn".*?</a>)'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            new_content = content[:match.end()] + about_link + content[match.end():]
            with open(f_name, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Added About Us link to {f_name}")
        else:
            print(f"Could not find Liked link in {f_name}")

