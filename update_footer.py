import glob

html_files = glob.glob("*.html")
old_text = "Rarely Seen is dedicated to unearthing the hidden gems of the fashion world. We bring you exclusive, high-quality pieces from emerging and independent brands that you won't find anywhere else."
new_text = "We are here to cure your shopping fatigue. We are cutting through the boring fast fashion and the endless scrolling to bring you a curated catalogue of the hardest homegrown brands, all in one place."

for f_name in html_files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(f_name, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated footer in {f_name}")

