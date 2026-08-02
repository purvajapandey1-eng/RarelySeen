import re

btn_html = r"""
                    <button class="explore-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event.stopPropagation(); window.open('${product.url || ''}', '_blank')">Explore on Brand's Website</button>"""

def add_to_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We find where `<div class="product-price">₹${product.price}</div>` is and add the button after it.
    if 'Explore on Brand' not in content:
        content = re.sub(
            r'(<div class="product-price">₹\$\{product\.price\}</div>\s*)\n',
            r'\1' + btn_html + '\n',
            content
        )
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added Explore button to {filepath}")

add_to_file('app.js')
add_to_file('grid.js')
add_to_file('favorites.js')
