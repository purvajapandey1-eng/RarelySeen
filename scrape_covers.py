import json, urllib.request, re, ssl
ssl._create_default_https_context = ssl._create_unverified_context

with open('./src/lib/scraped_brands.json', 'r') as f:
    data = json.load(f)

for slug, brand in data.items():
    print("Fetching", brand['url'])
    try:
        req = urllib.request.Request(brand['url'], headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=5)
        html = res.read().decode('utf-8', errors='ignore')
        
        cover_img = None
        og_match = re.search(r'<meta property="og:image" content="([^"]+)"', html, re.IGNORECASE)
        if og_match:
            cover_img = og_match.group(1)
            if cover_img.startswith('//'): cover_img = 'https:' + cover_img
            elif cover_img.startswith('/'): cover_img = brand['url'] + cover_img
            cover_img = cover_img.split('?')[0]
            
        brand['coverImage'] = cover_img
    except Exception as e:
        print("Failed", slug, e)

with open('./src/lib/scraped_brands.json', 'w') as f:
    json.dump(data, f, indent=2)
