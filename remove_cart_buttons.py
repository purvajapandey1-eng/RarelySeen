import re

files_to_update = {
    'app.js': r'<button class="add-to-cart-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event\.stopPropagation\(\); window\.addToCart\(\'(.*?)\', \'(.*?)\', \'(.*?)\'\)">Add to Cart</button>',
    'grid.js': r'<button class="add-to-cart-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event\.stopPropagation\(\); window\.addToCart\(\'(.*?)\', \'(.*?)\', \'(.*?)\'\)">Add to Cart</button>',
    'favorites.js': r'<button class="add-to-cart-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event\.stopPropagation\(\); window\.addToCart\(\'(.*?)\', \'(.*?)\', \'(.*?)\'\)">Add to Cart</button>'
}

for fname, pattern in files_to_update.items():
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the button
    new_content = re.sub(pattern, '', content)
    # Clean up empty lines left behind
    new_content = re.sub(r'\n\s*\n\s*</div>\n\s*</div>', '\n                    </div>\n                </div>', new_content)
    
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Removed add to cart from {fname}")

