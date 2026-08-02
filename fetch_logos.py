import re
import subprocess

endpoints = {
    "ButterBawd": "https://www.butterbawd.com",
    "Everdion": "https://everdion.com",
    "Mile collective": "https://milecollective.in",
    "Endless summer": "https://www.endlesssummershop.com",
    "Outdated official": "https://outdated.in",
    "The clothing factory": "https://theclothingfactory.in",
    "Couch days": "https://couchdays.in",
    "Core cotton": "https://www.corecotton.in",
    "Kuuky": "https://kuuky.in",
    "Studio Picante": "https://studiopicante.in",
    "Bluer": "https://bluer.co.in",
    "Living in surma": "https://surma.in"
}

user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

extracted_logos = {}

for brand, url in endpoints.items():
    print(f"Fetching homepage for {brand}...")
    try:
        result = subprocess.run(["curl", "-s", "-L", "-A", user_agent, url], capture_output=True, text=True)
        if result.returncode == 0 and result.stdout:
            html = result.stdout
            
            # Look for common logo patterns
            # 1. Look for meta property og:image containing 'logo'
            match = re.search(r'<meta property="og:image" content="([^"]+logo[^"]+)"', html, re.IGNORECASE)
            if not match:
                match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
                
            # 2. Look for img tag with id/class logo
            if not match:
                match = re.search(r'<img[^>]+(?:class|id)=["\'][^"\']*logo[^"\']*["\'][^>]+src=["\']([^"\']+)["\']', html, re.IGNORECASE)
                
            if not match:
                match = re.search(r'<img[^>]+src=["\']([^"\']+logo[^"\']+)["\']', html, re.IGNORECASE)

            if match:
                logo_url = match.group(1)
                if logo_url.startswith("//"):
                    logo_url = "https:" + logo_url
                elif logo_url.startswith("/"):
                    logo_url = url + logo_url
                extracted_logos[brand] = logo_url
                print(f"Found logo for {brand}: {logo_url}")
            else:
                print(f"Could not find logo for {brand}")
                extracted_logos[brand] = ""
    except Exception as e:
        print(f"Error {brand}: {e}")

print("\n--- JSON OUTPUT ---")
print(extracted_logos)
