import re
import urllib.request
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "ikaari": "https://ikaari.com",
    "Palay": "https://palay.in",
    "beeglee": "https://www.beeglee.in",
    "i blame beads": "https://www.iblamebeads.com",
    "outdated official": "https://outdated.in",
    "rok forces": "https://rokforces.com",
    "truffle": "https://www.truffleindia.com",
    "lazzo store": "https://lazzo.in",
    "summer soul": "https://summersoul.in",
    "twelvth edit": "https://twelvthedit.com",
    "10.30pm": "https://1030pm.in",
    # Added exact keys from app.js to map properly
    "the pink elephant": "http://lovethepinkelephant.com/cdn/shop/files/RHT02314_1_1200x630.jpg?v=1752472035",
    "a little extra": "http://alittleextra.co.in/cdn/shop/files/NEWMEW.png?height=628&pad_color=ffffff&v=1774585294&width=1200"
}

logos = {}

for brand, url in urls.items():
    if url.endswith(".jpg") or url.endswith(".png") or url.endswith(".gif"):
        logos[brand] = url
        continue
        
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        html = urllib.request.urlopen(req, context=ctx, timeout=5).read().decode("utf-8")
        
        # Aggressive logo regex
        match = re.search(r'src=["\']([^"\']*(?:logo|icon)[^"\']*)["\']', html, re.IGNORECASE)
        if match:
            logo = match.group(1)
            if logo.startswith("//"): logo = "https:" + logo
            elif logo.startswith("/"): logo = url + logo
            logos[brand] = logo
            print(f"Found {brand}: {logo}")
        else:
            print(f"Missing {brand}")
            logos[brand] = ""
    except Exception as e:
        print(f"Error {brand}: {e}")
        logos[brand] = ""

# Now read app.js and inject these!
with open("app.js", "r") as f:
    js = f.read()

logos_lines = []
for k, v in logos.items():
    if v:
        # Also map to title case and other variants just to be safe
        variants = [k, k.lower(), k.capitalize(), k.title()]
        # special case for 10.30pm
        if k == "10.30pm":
            variants.append("10.30pm")
        
        for var in set(variants):
            safe_k = var.replace('"', '\\"')
            logos_lines.append(f'            "{safe_k}": "{v}"')

insertion = ",\n" + ",\n".join(logos_lines) + "\n        };\n        const logo = logos[brandName]"

js = js.replace("\n        };\n        const logo = logos[brandName]", insertion)

with open("app.js", "w") as f:
    f.write(js)
print("Updated app.js logos.")
