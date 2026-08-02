import json
import urllib.request
import ssl

# Define the endpoints mapping
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

# Create a custom unverified context in case of SSL issues
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

for brand, url in endpoints.items():
    print(f"Fetching data for {brand}...")
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                
                products = []
                base_url = "/".join(url.split("/")[:3]) # e.g. https://www.butterbawd.com
                
                for item in data.get('products', []):
                    # Basic mapping
                    prod_title = item.get('title', '')
                    prod_url = f"{base_url}/products/{item.get('handle', '')}"
                    
                    # Extract price from variants
                    price = 0
                    if item.get('variants') and len(item['variants']) > 0:
                        price = item['variants'][0].get('price', 0)
                        
                    # Extract image
                    img_src = ""
                    if item.get('images') and len(item['images']) > 0:
                        img_src = item['images'][0].get('src', '')
                        
                    products.append({
                        "title": prod_title,
                        "price": str(price),
                        "image": img_src,
                        "url": prod_url
                    })
                
                # Write to local file
                out_file = f"{brand}_products.json"
                with open(out_file, 'w') as f:
                    json.dump(products, f, indent=4)
                    
                print(f"Successfully saved {len(products)} products for {brand}.")
            else:
                print(f"Failed to fetch {brand}: HTTP {response.status}")
                
    except Exception as e:
        print(f"Error processing {brand}: {e}")

print("Scraping complete.")
