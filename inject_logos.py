import json

new_logos = {
    "10.30pm": "",
    "Twelvth edit": "",
    "shop&yours": "http://www.shopandyours.com/cdn/shopifycloud/storefront/assets/no-image-100-2a702f30_small.gif",
    "the pink elephant": "http://lovethepinkelephant.com/cdn/shop/files/RHT02314_1_1200x630.jpg?v=1752472035",
    "Moontara": "http://www.moontara.in/cdn/shop/files/Untitled_design_13_0ba30834-84e0-4b32-a8be-9ee6c293c888.png?v=1700732644",
    "Blomas": "http://blomas.in/cdn/shop/files/Blomas_wordmark_-_red.png?height=628&pad_color=ffffff&v=1714568188&width=1200",
    "Urban Suburban": "https://www.urbansuburban.in/image/catalog/lohot_top.png",
    "Weaving cult": "https://www.weavingcult.com/cdn/shop/files/Weaving_Cult_logo.png?v=1770410433&amp;width=563",
    "Dhora India": "http://dhoraindia.in/cdn/shop/files/dhorashare.jpg?v=1627291173",
    "Love to bag": "https://lovetobag.com/cdn/shop/files/cropped-NE_1.png?v=1767103975&width=360",
    "Sunday loveshop": "https://sundayloveshop.com/cdn/shop/files/1-removebg-preview.png?v=1758613635&width=170",
    "qala clothing": "http://qalaclothing.com/cdn/shop/files/QALA_SOCIAL.png?v=1680871660",
    "love choje": "http://lovechoje.com/cdn/shop/files/Typo-Symbol_16af00b4-f2e0-42a1-b901-11b29ea9a869.png?v=1761131072",
    "Truffle": "",
    "Nef's finds": "http://nefsfinds.com/cdn/shop/files/logo_f68d9d4e-825f-4efe-8e12-258942df8bae_1200x1200.jpg?v=1648281913",
    "Rerunn": "http://rerunn.com/cdn/shop/files/Rerunn_logo_1a55db7b-e61c-4e34-ae38-8bf3f0dc9cd9.png?v=1727932646",
    "Disobedience": "https://clipground.com/images/elle-logo-clipart-9.png",
    "a little extra": "http://alittleextra.co.in/cdn/shop/files/NEWMEW.png?height=628&pad_color=ffffff&v=1774585294&width=1200",
    "Core cotton": "https://www.corecotton.in/cdn/shop/files/GQ-Logo.png?crop=center&amp;height=112&amp;v=1734762940&amp;width=200",
    # Specific Mappings for existing brands inside index.html and app.js
    "Summer Soul": "",
    "Dhora india": "http://dhoraindia.in/cdn/shop/files/dhorashare.jpg?v=1627291173",
    "Qalaclothing": "http://qalaclothing.com/cdn/shop/files/QALA_SOCIAL.png?v=1680871660",
    "Lovechoje": "http://lovechoje.com/cdn/shop/files/Typo-Symbol_16af00b4-f2e0-42a1-b901-11b29ea9a869.png?v=1761131072",
    "Lazzo store": "",
    "Rok forces": "",
    "Disobedience chennai": "https://clipground.com/images/elle-logo-clipart-9.png",
    "Lovetobag": "https://lovetobag.com/cdn/shop/files/cropped-NE_1.png?v=1767103975&width=360",
    "Nef’s finds": "http://nefsfinds.com/cdn/shop/files/logo_f68d9d4e-825f-4efe-8e12-258942df8bae_1200x1200.jpg?v=1648281913"
}

with open("app.js", "r") as f:
    js = f.read()

logos_lines = []
for k, v in new_logos.items():
    if v:
        # Escape quotes
        safe_k = k.replace('"', '\\"')
        logos_lines.append(f'            "{safe_k}": "{v}"')

insertion = ",\n" + ",\n".join(logos_lines) + "\n        };\n        const logo = logos[brandName]"

js = js.replace("\n        };\n        const logo = logos[brandName]", insertion)

with open("app.js", "w") as f:
    f.write(js)
print("Updated app.js logos.")
