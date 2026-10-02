import json
import urllib.request
import re
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

urls = [
    "https://sundayloveshop.com/products.json",
    "https://andthensome.in/products.json",
    "https://1030pm.in/products.json",
    "https://alittleextra.co.in/products.json",
    "https://amoshi.in/products.json",
    "https://www.autumnsummer.in/products.json",
    "https://www.beeglee.in/products.json",
    "https://birdhouse.life/products.json",
    "https://blomas.in/products.json",
    "https://bluer.co.in/products.json",
    "https://www.butterbawd.com/products.json",
    "https://www.corecotton.in/products.json",
    "https://couchdays.in/products.json",
    "https://dhoraindia.in/products.json",
    "https://thedisobedience.com/products.json",
    "https://www.endlesssummershop.com/products.json",
    "https://essgee.co/products.json",
    "https://everpret.com/products.json",
    "https://everdion.com/products.json",
    "https://evierose.in/products.json",
    "https://fancypastels.com/products.json",
    "https://www.houseofmae.shop/products.json",
    "https://www.houseofprisca.com/products.json",
    "https://www.iblamebeads.com/products.json",
    "https://studioimsoo.com/products.json",
    "https://jewelsmars.com/products.json",
    "https://kindinside.in/products.json",
    "https://kuuky.in/products.json",
    "https://www.labelsocietyco.com/products.json",
    "https://leaclothingco.com/products.json",
    "https://surma.in/products.json",
    "https://lovechoje.com/products.json",
    "https://lovetobag.com/products.json",
    "https://shopmaya.in/products.json",
    "https://mazikien.com/products.json",
    "https://milecollective.in/products.json",
    "https://mnsh.co/products.json",
    "https://www.moontara.in/products.json",
    "https://www.msmaven.in/products.json",
    "https://www.muvazo.com/products.json",
    "https://www.neelmii.com/products.json",
    "https://nefsfinds.com/products.json",
    "https://www.nete.in/products.json",
    "https://www.nishorama.com/products.json",
    "https://www.nonamejewelry.in/products.json",
    "https://orangeateight.com/products.json",
    "https://outcasts.in/products.json",
    "https://outdated.in/products.json",
    "https://palay.in/products.json",
    "https://pariparilife.com/products.json",
    "https://poppi.in/products.json",
    "https://qalaclothing.com/products.json",
    "https://www.qua.clothing/products.json",
    "https://rerunn.com/products.json",
    "https://ribelle.in/products.json",
    "https://www.ruiaan.com/products.json",
    "https://www.shopandyours.com/products.json",
    "https://shopdiris.com/products.json",
    "https://www.shopmauve.in/products.json",
    "https://studiopicante.in/products.json",
    "https://summeraway.in/products.json",
    "https://sundaymolly.com/products.json",
    "https://theclothingfactory.in/products.json",
    "https://themissyco.in/products.json",
    "https://lovethepinkelephant.com/products.json",
    "https://www.truewest.in/products.json",
    "https://www.shopmeringue.com/products.json",
    "https://twelvthedit.com/products.json",
    "https://www.cordstudio.in/products.json",
    "https://www.barse.in/products.json",
    "https://ontheracks.in/products.json",
    "https://easestudio.in/products.json",
    "https://sagebymala.com/products.json",
    "https://zipbypayalzinal.com/products.json",
    "https://annstudios.in/products.json",
    "https://oyela.in/products.json",
    "https://unnisbees.com/products.json",
    "https://contemponari.com/products.json",
    "https://girlsdontdressforboys.com/products.json",
    "https://freyjaworld.com/products.json",
    "https://noticeme.in/products.json",
    "https://theater.xyz/products.json",
    "https://loveviana.com/products.json",
    "https://thefuncompany.in/products.json",
    "https://sanhi.in/products.json",
    "https://upakarna.com/products.json",
    "https://www.weavingcult.com/products.json"
]

output = {}

for u in urls:
    try:
        match = re.search(r'https?://(?:www\.)?([^/]+)', u)
        if not match: continue
        domain = match.group(1)
        slug = domain.split('.')[0]
        
        name = slug.replace('-', ' ').title()
        if slug == '1030pm': name = '10:30 PM'
        
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
                logo = logo.split('?')[0] # remove query params to get a cleaner image
                if 'width=' in logo: logo = logo.replace('width=170', 'width=400') # attempt to upscale
        except Exception:
            pass

        fetch_url = f"{base_url}/products.json?limit=20" 
        
        req = urllib.request.Request(fetch_url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=10)
        data = json.loads(res.read())
        
        products = []
        for p in data.get('products', []):
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
                
        output[slug] = {
            'name': name,
            'url': base_url,
            'logo': logo,
            'products': products
        }
        print(f"Scraped {slug} - {len(products)} products, logo: {'Yes' if logo else 'No'}")
    except Exception as e:
        print(f"Failed to scrape {u}: {e}")

with open('./src/lib/scraped_brands.json', 'w') as f:
    json.dump(output, f, indent=2)
