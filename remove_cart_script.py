import glob

html_files = glob.glob("*.html")

for f_name in html_files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'cart.js' in content:
        content = content.replace('<script src="cart.js?v=1"></script>\n', '')
        with open(f_name, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed cart.js from {f_name}")

