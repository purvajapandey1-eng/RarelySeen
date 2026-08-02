with open('generate_brand_pages.py', 'r', encoding='utf-8') as f:
    content = f.read()

btn_html = r"""
        explore_btn = f'''<button class="explore-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event.stopPropagation(); window.open('{url}', '_blank')">Explore on Brand\\'s Website</button>'''
"""

# Insert it before url_attr = 
if 'explore_btn =' not in content:
    content = content.replace(
        'url_attr = ',
        btn_html + '\n        url_attr = '
    )

# Now add {explore_btn} after {price}</div>
if '{explore_btn}' not in content:
    content = content.replace(
        '<div class="product-price">₹{price}</div>',
        '<div class="product-price">₹{price}</div>\n                {explore_btn}'
    )

with open('generate_brand_pages.py', 'w', encoding='utf-8') as f:
    f.write(content)

