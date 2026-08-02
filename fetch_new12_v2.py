import json
import subprocess
import time

endpoints = {
    "ButterBawd": "https://www.butterbawd.com/products.json",
    "Everdion": "https://everdion.com/products.json",
    "Mile collective": "https://milecollective.in/products.json",
    "Endless summer": "https://www.endlesssummershop.com/products.json",
    "Outdated official": "https://outdated.in/products.json",
    "The clothing factory": "https://theclothingfactory.in/products.json",
    "Couch days": "https://couchdays.in/products.json",
    "Core cotton": "https://www.corecotton.in/products.json",
    "Kuuky": "https://kuuky.in/products.json",
    "Studio Picante": "https://studiopicante.in/products.json",
    "Bluer": "https://bluer.co.in/products.json",
    "Living in surma": "https://surma.in/products.json"
}

user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

for brand, url in endpoints.items():
    print(f"Fetching {brand}...")
    try:
        result = subprocess.run(["curl", "-s", "-A", user_agent, url], capture_output=True, text=True)
        if result.returncode == 0 and result.stdout:
            data = json.loads(result.stdout)
            products = []
            base_url = "/".join(url.split("/")[:3])
            for item in data.get("products", []):
                price = 0
                if item.get("variants") and len(item["variants"]) > 0:
                    price = item["variants"][0].get("price", 0)
                img_src = ""
                if item.get("images") and len(item["images"]) > 0:
                    img_src = item["images"][0].get("src", "")
                
                handle = item.get("handle", "")
                products.append({
                    "title": item.get("title", ""),
                    "price": str(price),
                    "image": img_src,
                    "url": f"{base_url}/products/{handle}"
                })
            out_file = f"{brand}_products.json"
            with open(out_file, "w") as f:
                json.dump(products, f, indent=4)
            print(f"Saved {len(products)} products for {brand}.")
        else:
            print(f"Failed {brand}")
    except Exception as e:
        print(f"Error {brand}: {e}")
    time.sleep(1)
