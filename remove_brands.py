import re

to_remove = ["lazzo store", "live in pause", "girls dont dress for boys", "ikaari", "urban suburban", "rok forces"]

with open("app.js", "r") as f:
    js = f.read()

new_js = []
for line in js.split("\n"):
    # Avoid modifying the actual variable definitions or the logic
    if "brandNames =" in line or "scrapedBrandsList =" in line or "logos =" in line or "new_brands =" in line:
        new_js.append(line)
        continue
    
    # Simple regex to remove string literals containing these brands
    for brand in to_remove:
        # Match "Brand Name", or "Brand Name", with optional comma
        regex = r"[\"'][^\"']*?" + re.escape(brand) + r"[^\"']*?[\"']\s*:?\s*[\"'][^\"']*?[\"']\s*,?\s*|[\"'][^\"']*?" + re.escape(brand) + r"[^\"']*?[\"']\s*,?\s*"
        line = re.sub(regex, "", line, flags=re.IGNORECASE)
    
    new_js.append(line)

with open("app.js", "w") as f:
    f.write("\n".join(new_js))
print("Removed from app.js")

with open("index.html", "r") as f:
    html = f.read()

new_html = []
for line in html.split("\n"):
    skip = False
    for brand in to_remove:
        if re.search(brand, line, re.IGNORECASE) and "class=\"brand-item\"" in line:
            skip = True
            break
    if not skip:
        new_html.append(line)

with open("index.html", "w") as f:
    f.write("\n".join(new_html))
print("Removed from index.html")
