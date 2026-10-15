import json
import urllib.request
import re
import ssl
import time
from playwright.sync_api import sync_playwright

ssl._create_default_https_context = ssl._create_unverified_context

new_brand_urls = [
    "https://www.houseofayuda.com/products.json",
    "https://www.weartag.in/products.json",
    "https://diyaribydivish.com/products.json",
    "https://muskhaveshop.com/products.json",
    "https://www.dashanddot.com/products.json",
    "https://kelin.in/products.json",
    "https://alayabystage3.com/products.json",
    "https://studiopicante.in/products.json",
    "https://oyela.in/products.json",
    "https://www.miraiindia.in/products.json",
    "https://poshakhub.com/products.json",
    "https://www.basata.co.in/products.json",
    "https://www.wabisabistyles.com/products.json",
    "https://www.qunic.co/products.json",
    "https://dionne.in/products.json",
    "https://www.pastmodern.in/products.json",
]

# Load existing scraped_brands.json
with open('./src/lib/scraped_brands.json', 'r') as f:
    output = json.load(f)

scraped_slugs = []

for u in new_brand_urls:
    try:
        match = re.search(r'https?://(?:www\.)?([^/]+)', u)
        if not match:
            continue
        domain = match.group(1)
        slug = domain.split('.')[0]

        name = slug.replace('-', ' ').title()

        base_url = f"https://{match.group(1)}"

        logo = None
        try:
            html_req = urllib.request.Request(base_url, headers={'User-Agent': 'Mozilla/5.0'})
            html_res = urllib.request.urlopen(html_req, timeout=10)
            html = html_res.read().decode('utf-8', errors='ignore')

            img_match = re.search(r'<img[^>]+class="[^"]*logo[^"]*"[^>]+src="([^"]+)"', html, re.IGNORECASE)
            if not img_match: img_match = re.search(r'<img[^>]+src="([^"]+)"[^>]+class="[^"]*logo[^"]*"', html, re.IGNORECASE)
            if not img_match: img_match = re.search(r'<meta property="og:image" content="([^"]+)"', html, re.IGNORECASE)
            if not img_match: img_match = re.search(r'<link rel="shortcut icon" href="([^"]+)"', html, re.IGNORECASE)

            if img_match:
                logo = img_match.group(1)
                if logo.startswith('//'): logo = 'https:' + logo
                elif logo.startswith('/'): logo = base_url + logo
                logo = logo.split('?')[0]
        except Exception as e:
            print(f"Logo fetch failed for {slug}: {e}")

        # Scrape products
        fetch_url = f"{base_url}/products.json?limit=250&page="
        products = []
        page = 1
        while True:
            try:
                req = urllib.request.Request(f"{fetch_url}{page}", headers={'User-Agent': 'Mozilla/5.0'})
                res = urllib.request.urlopen(req, timeout=10)
                data = json.loads(res.read())
                page_products = data.get('products', [])
                if not page_products:
                    break
                for p in page_products:
                    try:
                        price = p.get('variants', [{}])[0].get('price', "0")
                        img = p.get('images', [{}])[0].get('src') if p.get('images') else None
                        products.append({
                            'title': p['title'],
                            'price': price,
                            'image': img,
                            'handle': p['handle']
                        })
                    except Exception:
                        pass
                if len(page_products) < 250:
                    break
                page += 1
            except Exception as e:
                print(f"Product fetch failed for {slug} page {page}: {e}")
                break

        output[slug] = {
            'name': name,
            'url': base_url,
            'logo': logo,
            'products': products,
            'coverImage': None  # will be filled by screenshot step
        }
        scraped_slugs.append(slug)
        print(f"Scraped {slug} - {len(products)} products, logo: {'Yes' if logo else 'No'}")
    except Exception as e:
        print(f"Failed to scrape {u}: {e}")

# Now take screenshots with Playwright
print("\n--- Taking homepage screenshots ---")
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1200, 'height': 1200})
    page = context.new_page()

    for slug in scraped_slugs:
        brand = output.get(slug)
        if not brand:
            continue
        print(f"Screenshot for {slug} ({brand['url']})")
        try:
            page.goto(brand['url'], timeout=60000, wait_until="load")
            page.evaluate("window.scrollBy(0, 600)")
            time.sleep(3)

            filepath = f"./public/brands/{slug}.jpg"
            page.screenshot(path=filepath)
            brand['coverImage'] = f"/brands/{slug}.jpg"
            print(f"  Saved {filepath}")
        except Exception as e:
            print(f"  Failed screenshot for {slug}: {e}")

    browser.close()

# Save everything back
with open('./src/lib/scraped_brands.json', 'w') as f:
    json.dump(output, f, indent=2)

print("\nAll done! Scraped slugs:", scraped_slugs)
