import re
import subprocess

endpoints = {
    "10.30pm": "https://1030pm.in",
    "Summer Soul": "https://summersoul.in",
    "Twelvth edit": "https://twelvthedit.com",
    "shop&yours": "https://www.shopandyours.com",
    "the pink elephant": "https://lovethepinkelephant.com",
    "Moontara": "https://moontara.in",
    "Blomas": "https://blomas.in",
    "Urban Suburban": "https://urbansuburban.in",
    "Weaving cult": "https://weavingcult.com",
    "Dhora India": "https://dhoraindia.in",
    "Love to bag": "https://lovetobag.com",
    "Sunday loveshop": "https://sundayloveshop.com",
    "qala clothing": "https://qalaclothing.com",
    "love choje": "https://lovechoje.com",
    "Lazzo store": "https://lazzo.in",
    "Truffle": "https://www.truffleindia.com",
    "Nef's finds": "https://nefsfinds.com",
    "Rerunn": "https://rerunn.com",
    "Disobedience": "https://thedisobedience.com",
    "Rok forces": "https://rokforces.com",
    "a little extra": "https://alittleextra.co.in",
    "Core cotton": "https://www.corecotton.in"
}

user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

extracted_logos = {}

for brand, url in endpoints.items():
    print(f"Fetching homepage for {brand}...")
    try:
        result = subprocess.run(["curl", "-s", "-L", "-A", user_agent, url], capture_output=True, text=True)
        if result.returncode == 0 and result.stdout:
            html = result.stdout
            
            match = re.search(r'<meta property="og:image" content="([^"]+logo[^"]+)"', html, re.IGNORECASE)
            if not match:
                match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
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
