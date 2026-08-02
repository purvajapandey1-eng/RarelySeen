import re
import glob

files = glob.glob("*.html")
files.append("generate_brand_pages.py")

for f_name in files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(r'app\.js\?v=\d+', 'app.js?v=28', content)

    if new_content != content:
        with open(f_name, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Bumped app.js version in {f_name}")

