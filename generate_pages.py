import os
import json
import re
import ast
import random

categories = {
    "birthday_specials.html": {
        "title": "Birthday specials",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["10.30pm", "Amoshi", "Autumn Summer", "Beeglee", "Blomas", "Evie Rose", "Kind inside", "Label Society", "Lea Clothing", "Mazikien", "Nef’s finds", "Nishorama", "Orange at eight", "Outcast", "Qala clothing", "Qua", "Rerunn", "Ribble", "Shop&yours", "Diris", "Shop mauve", "Summer away", "Missy co", "True West", "Meringue", "Weaving cult", "Outdated official", "The clothing factory", "Studio Picante"]
    },
    "indianwear.html": {
        "title": "Indianwear",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["10.30pm", "Blomas", "Dhora India", "Essgee", "Fancy Pastels", "Lea Clothing", "Love to bag", "Ms.Maven", "Neelmii", "Nete", "Nishorama", "Missy Co", "Core cotton", "Living in surma"]
    },
    "coords.html": {
        "title": "Co-ords",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["10.30pm", "Amoshi", "Blomas", "Essgee", "Evie Rose", "Fancy Pastels", "House of Mae", "Imsoo", "Everdion", "Choje", "Lea Clothing", "Love to bag", "Moontara", "Ms.Maven", "Muvazo", "Neelmii", "Nete", "Nishorama", "Orange at eight", "Outcast", "Poppi", "Ribelle", "Ruiaan", "Diris", "Summer away", "Missy co", "Meringue", "Weaving cult", "Endless summer", "Outzidr", "Couch days", "Core cotton", "Kuuky", "Living in surma"]
    },
    "vacation_fits.html": {
        "title": "Vacation fits",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["10.30pm", "Amoshi", "Autumn Summer", "Blomas", "Dhora India", "Essgee", "Evie Rose", "Fancy Pastels", "Lea Clothing", "Choje", "Moontara", "Muvazo", "Nef’s finds", "Orange at eight", "Outcast", "Poppi", "Qala clothing", "Qua", "Ruiaan", "Shop&yours", "Diris", "Shop mauve", "Summer away", "Sunday Love", "Missy Co", "Meringue", "Endless summer", "Outdated official", "The clothing factory", "Core cotton", "Kuuky", "Studio Picante"]
    },
    "beachwear.html": {
        "title": "Beachwear",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["Essgee", "Lea Clothing", "Nef’s finds", "Nete", "Ribelle", "Sunday love", "Missy Co", "Meringue", "Kuuky"]
    },
    "jewellery.html": {
        "title": "Jewellery",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["A little extra", "Autumn Summer", "Dhora India", "I blame beads", "Jewelsmars", "Maya bazaar", "Mnsh", "Nete", "No na me", "Upkarna"]
    },
    "footwear.html": {
        "title": "Footwear",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["Birdhouse", "Disobedience", "House of Prisca", "Pari pari life", "Summer away"]
    },
    "bags.html": {
        "title": "Bags",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["Dhora India", "Ever Pret", "Love to Bag", "Nef’s finds", "Nete", "Palay", "Rerunn", "Missy Co", "The clothing factory"]
    },
    "tops_under_3k.html": {
        "title": "Tops under 3k",
        "subtitle": "Curated picks from our favorite emerging brands",
        "brands": ["ButterBawd", "&thensome", "Autumn Summer", "Beeglee", "Blomas", "Essgee", "Evie Rose", "Fancy Pastels", "House of Mae", "Kind inside", "Label society", "Lea Clothing", "Ms. Maven", "Muvazo", "Nef’s finds", "Nishorama", "Orange at eight", "Outcast", "Qua", "Rerunn", "Shop&yours", "Diris", "Shop mauve", "Missy co", "True West", "Twelvth edit", "Weaving cult", "Endless summer", "Outdated official", "The clothing factory", "Outzidr", "Couch days", "Core cotton", "Kuuky", "Bluer"]
    }
}

def map_brand_name(name):
    n = name.strip()
    mapping = {
        "Autumn Summer": "autumn summer",
        "Label Society": "Label society",
        "Lea Clothing": "Leaclothingco",
        "Qala clothing": "Qalaclothing",
        "Ribble": "Ribble",
        "Ribelle": "Ribble",
        "Diris": "Shopdiris",
        "Shop mauve": "shopmauve.in",
        "Summer away": "Summeraway",
        "Missy co": "The missy co",
        "Missy Co": "The missy co",
        "True West": "True west fashion",
        "Dhora India": "Dhora india",
        "Fancy Pastels": "Fancypastelsindia",
        "Love to bag": "Lovetobag",
        "Love to Bag": "Lovetobag",
        "House of Mae": "House of mae",
        "Choje": "Lovechoje",
        "Poppi": "Poppiclothing",
        "Sunday Love": "sunday loveshop",
        "Sunday love": "sunday loveshop",
        "Jewelsmars": "Jewels mars",
        "Maya bazaar": "Mayabazaar jewellery",
        "Mnsh": "Mnsh.design",
        "No na me": "No Na Me",
        "Upkarna": "Upkarna jewellery store",
        "Disobedience": "Disobedience chennai",
        "Pari pari life": "Pariparilife",
        "Ever Pret": "Ever pret",
        "Ms. Maven": "Ms.maven"
    }
    return mapping.get(n, n)

with open("index.html", "r") as f:
    index_html = f.read()

head_end = index_html.find("</nav>") + 6
header_html = index_html[:head_end]

with open("app.js", "r") as f:
    js_content = f.read()

logos_dict = {}
match = re.search(r"const logos = (\{.*?\});", js_content, re.DOTALL)
if match:
    try:
        logos_json = match.group(1).replace("\n", "").replace("\r", "")
        logos_dict = ast.literal_eval(logos_json)
    except: pass

# New scraped brands don't have logos in app.js yet, use text or fetch from image? The user just wants the products for now.

product_page_html = """
        <!-- Product Page (Hidden by Default) -->
        <section id="product-page" class="product-page" style="display: none; margin-top: 2rem;">
            <div class="product-page-header">
                <button id="back-btn" class="back-btn">← Back to Brands</button>
                <div class="price-filter">
                    <label>Category:</label>
                    <select id="category-filter">
                        <option value="all">All</option>
                        <option value="tops">Tops</option>
                        <option value="bottoms">Bottoms</option>
                        <option value="dresses">Dresses</option>
                        <option value="coords">Co-ords</option>
                        <option value="footwear">Footwear</option>
                    </select>
                    <label style="margin-left: 10px;">Price:</label>
                    <input type="number" id="min-price" placeholder="Min ₹">
                    <span>-</span>
                    <input type="number" id="max-price" placeholder="Max ₹">
                    <button id="apply-filter-btn" class="filter-btn">Apply</button>
                </div>
            </div>
            <div class="product-grid" id="product-grid">
                <!-- Product placeholders injected by JS -->
            </div>
            <div class="load-more-container">
                <button id="load-more-btn" class="load-more-btn" style="display: none;">Load More</button>
            </div>
        </section>
"""

home_btn = "\n        <a href=\"index.html\" class=\"home-btn\">← Back to Bubbles</a>"

for filename, cat in categories.items():
    grid_html = ""
    for raw_name in cat["brands"]:
        file_key = map_brand_name(raw_name)
        display_name = raw_name
        
        json_file = f"{file_key}_products.json"
        image = ""
        is_missing = True
        
        if os.path.exists(json_file):
            try:
                with open(json_file, "r") as f:
                    data = json.load(f)
                    if data and len(data) > 0:
                        prod = random.choice(data[:20])
                        if "image" in prod:
                            image = prod["image"]
                        is_missing = False
            except: pass
                
        logo_url = logos_dict.get(file_key, "")
        logo_img_tag = f"<img src=\"{logo_url}\" class=\"brand-grid-logo\" alt=\"{display_name}\">" if logo_url else ""
        
        if is_missing:
            bg = f"linear-gradient(135deg, hsl(30, 30%, 80%), hsl(60, 40%, 70%))"
            grid_html += f"""
            <a href="javascript:void(0)" class="brand-grid-card" data-brand="{file_key}" style="background: {bg};">
                {logo_img_tag}
                <div class="brand-grid-name">{display_name}</div>
            </a>"""
        else:
            grid_html += f"""
            <a href="javascript:void(0)" class="brand-grid-card" data-brand="{file_key}" style="background-image: url(\"{image}\");">
                <div class="brand-grid-overlay"></div>
                {logo_img_tag}
                <div class="brand-grid-name">{display_name}</div>
            </a>"""

    # Add default filters if necessary
    grid_attributes = ""
    if filename == "tops_under_3k.html":
        grid_attributes = " data-default-category=\"tops\" data-default-max-price=\"3000\""
    elif filename == "footwear.html":
        grid_attributes = " data-default-category=\"footwear\""
        
    page_content = f"""
    <main class="content page-tops">{home_btn}
        <header class="section-header" id="grid-header">
            <h1 class="section-title">{cat["title"]}</h1>
            <p class="section-subtitle">{cat["subtitle"]}</p>
        </header>
        
        <div class="brands-grid" id="brands-grid"{grid_attributes}>
            {grid_html}
        </div>
        
{product_page_html}
    </main>
    <script src="favorites.js?v=1"></script>
    <script src="app.js?v=25"></script>
    <script src="grid.js?v=2"></script>
</body>
</html>
"""

    full_html = header_html + page_content
    with open(filename, "w") as f:
        f.write(full_html)
    print(f"Generated {filename}")
