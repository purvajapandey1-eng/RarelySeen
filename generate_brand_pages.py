import urllib.parse
import json
import glob
import re
import html
import os

with open('tops_under_3k.html', 'r', encoding='utf-8') as f:
    template_html = f.read()

head_end = template_html.find('</nav>') + 6
header_html = template_html[:head_end]

json_files = glob.glob("*_products.json")

for json_file in json_files:
    brand_name = json_file.replace('_products.json', '')
    output_html = f"{brand_name}.html"
    
    products = []
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            products = json.load(f)
    except Exception as e:
        pass
    
    grid_items = ""
    for prod in products:
        title = html.escape(prod.get('title', ''))
        price = html.escape(str(prod.get('price', '')))
        image = prod.get('image', '')
        url = prod.get('url', '')
        
        safe_title = title.replace("'", "\\'").replace('"', '&quot;')
        safe_url = url.replace("'", "\\'").replace('"', '&quot;')
        safe_image = image.replace("'", "\\'").replace('"', '&quot;')
        
        like_btn = f'''<div class="like-btn" style="cursor: pointer; z-index: 20;" onclick="toggleLike(event, '{safe_url}', '{safe_title}', '{price}', '{safe_image}')">♡</div>'''
        
        
        
        explore_btn = f'''<button class="explore-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event.stopPropagation(); window.open('{url}', '_blank')">Explore on Brand\\'s Website</button>'''

        url_attr = f'''onclick="window.open('{url}', '_blank')" style="cursor: pointer;"''' if url else ""
        
        grid_items += f'''
        <div class="product-item" {url_attr}>
            <img class="product-image" src="{image}" alt="{title}">
            <div class="product-details">
                <div class="product-name">{title}</div>
                <div class="product-price">₹{price}</div>
                {explore_btn}
            </div>
            {like_btn}
        </div>
        '''
        
    if not products:
        grid_items = f"<p style='text-align: center; width: 100%; grid-column: 1/-1; color: white;'>No products found for {brand_name}.</p>"
        
    page_content = f'''
    <main class="main-content" style="padding: 100px 4rem 4rem 4rem; background-color: #670527; min-height: 100vh;">
        <h1 class="main-title" style="text-align: center; margin-bottom: 3rem; color: white; font-family: 'Montserrat', sans-serif;">{brand_name}</h1>
        
        <div class="product-grid" id="product-grid">
            {grid_items}
        </div>
    </main>
    <script src="favorites.js?v=1"></script>
    <script src="app.js?v=28"></script>
    <script>
        document.addEventListener("DOMContentLoaded", () => {{
            try {{
                const favs = JSON.parse(localStorage.getItem("rarelySeenFavorites")) || [];
                const buttons = document.querySelectorAll('.like-btn');
                buttons.forEach(btn => {{
                    // Hydration could go here
                }});
            }} catch(e) {{}}
        }});
    </script>
</body>
</html>
'''
    
    header = re.sub(r'<title>.*?</title>', f'<title>{brand_name} - Rarely Seen</title>', header_html)
    
    full_html = header + page_content
    with open(output_html, 'w', encoding='utf-8') as f:
        f.write(full_html)
        
print("Successfully regenerated brand pages with Cart logic.")
