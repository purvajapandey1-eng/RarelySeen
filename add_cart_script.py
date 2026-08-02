import glob

html_files = glob.glob("*.html")

for f_name in html_files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'cart.js' not in content:
        # Find the closing body tag
        if '</body>' in content:
            content = content.replace('</body>', '<script src="cart.js?v=1"></script>\n</body>')
            with open(f_name, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Added cart.js to {f_name}")

