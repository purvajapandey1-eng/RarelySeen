import json
import time
from playwright.sync_api import sync_playwright

def run():
    target_slugs = [
        "unnisbees",
        "oyela",
        "sagebymala",
        "barse",
        "easestudio",
        "twelvthedit",
        "lovethepinkelephant",
        "truewest",
        "ruiaan",
        "shopandyours",
        "qalaclothing",
        "msmaven",
        "milecollective",
        "shopmaya",
        "mnsh"
    ]
    
    with open('./src/lib/scraped_brands.json', 'r') as f:
        data = json.load(f)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1200, 'height': 1200})
        page = context.new_page()

        for slug in target_slugs:
            if slug not in data:
                print(f"Slug not found: {slug}")
                continue
                
            brand = data[slug]
            print(f"Fetching {slug} - {brand['url']}")
            try:
                page.goto(brand['url'], timeout=60000, wait_until="load")
                
                # Scroll down further for these specific brands (1500px down)
                # to get past massive hero sections/videos
                page.evaluate("window.scrollBy(0, 1500)")
                
                # Wait a bit for lazy-loaded images
                time.sleep(4)
                
                filepath = f"./public/brands/{slug}.jpg"
                page.screenshot(path=filepath)
                
                brand['coverImage'] = f"/brands/{slug}.jpg"
                print(f"Saved better screenshot for {slug}")
            except Exception as e:
                print(f"Failed {slug}: {e}")
                
            # Periodically write to save progress
            with open('./src/lib/scraped_brands.json', 'w') as f:
                json.dump(data, f, indent=2)

        browser.close()

if __name__ == "__main__":
    run()
