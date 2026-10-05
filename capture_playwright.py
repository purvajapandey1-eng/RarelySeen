import json
import time
from playwright.sync_api import sync_playwright

def run():
    with open('./src/lib/scraped_brands.json', 'r') as f:
        data = json.load(f)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1200, 'height': 1200})
        page = context.new_page()

        # Handle hardcoded naina-jain separately
        try:
            print("Fetching okhai (naina-jain)")
            page.goto("https://okhai.org", timeout=60000, wait_until="load")
            page.evaluate("window.scrollBy(0, 600)")
            time.sleep(3) # Wait for images to load
            page.screenshot(path="./public/brands/naina-jain.jpg")
            print("Saved naina-jain")
        except Exception as e:
            print("Failed naina-jain", e)

        for slug, brand in data.items():
            print(f"Fetching {slug} - {brand['url']}")
            try:
                page.goto(brand['url'], timeout=60000, wait_until="load")
                
                # Scroll down 600px to skip pure headers/videos and see styles
                page.evaluate("window.scrollBy(0, 600)")
                
                # Wait a bit for lazy-loaded images
                time.sleep(3)
                
                filepath = f"./public/brands/{slug}.jpg"
                page.screenshot(path=filepath)
                
                brand['coverImage'] = f"/brands/{slug}.jpg"
                print(f"Saved {filepath}")
            except Exception as e:
                print(f"Failed {slug}: {e}")
                
            # Periodically write to save progress
            with open('./src/lib/scraped_brands.json', 'w') as f:
                json.dump(data, f, indent=2)

        browser.close()

if __name__ == "__main__":
    run()
