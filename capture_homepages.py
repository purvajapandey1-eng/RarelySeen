import json, urllib.request, ssl, os, time
ssl._create_default_https_context = ssl._create_unverified_context

with open('./src/lib/scraped_brands.json', 'r') as f:
    data = json.load(f)

for slug, brand in data.items():
    print(f"Fetching screenshot for {slug} ({brand['url']})")
    try:
        url = brand['url']
        thum_url = f"https://image.thum.io/get/width/1000/crop/1000/{url}"
        req = urllib.request.Request(thum_url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=15)
        
        filepath = f"./public/brands/{slug}.jpg"
        with open(filepath, 'wb') as out:
            out.write(res.read())
            
        brand['coverImage'] = f"/brands/{slug}.jpg"
        print(f"Saved {filepath}")
    except Exception as e:
        print(f"Failed {slug}: {e}")
    time.sleep(1) # Be nice to the API

with open('./src/lib/scraped_brands.json', 'w') as f:
    json.dump(data, f, indent=2)
