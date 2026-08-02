import re

with open("index.html", "r") as f:
    html = f.read()

urls = {}
for match in re.finditer(r"<a href=\"([^\"]+)\"[^>]*class=\"brand-item\">([^<]+)</a>", html):
    url, name = match.groups()
    urls[name.strip().lower()] = url
    urls[name.strip()] = url

requested = [
    "10.30pm", "Summer Soul", "Twelvth edit", "shop&yours", "the pink elephant",
    "Moontara", "Blomas", "Urban Suburban", "Weaving cult", "Dhora India",
    "Love to bag", "Sunday loveshop", "qala clothing", "love choje", "Lazzo store",
    "Truffle", "Nef's finds", "Rerunn", "Disobedience", "Rok forces", "a little extra", "Core cotton"
]

found_urls = {}
for req in requested:
    req_lower = req.lower()
    
    # Try exact match
    if req_lower in urls:
        found_urls[req] = urls[req_lower]
        continue
        
    # Try partial match
    matched = False
    for k, v in urls.items():
        if req_lower in k.lower() or k.lower() in req_lower:
            found_urls[req] = v
            matched = True
            break
            
    if not matched:
        print(f"Could not find URL in index.html for {req}")

print("\nFound URLs:")
for k, v in found_urls.items():
    print(f"{k}: {v}")
