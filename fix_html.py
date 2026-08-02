import re

with open("index.html", "r") as f:
    html = f.read()

new_spotlight_section = """
        <!-- Featured Brand Section -->
        <section class="featured-brand-section" id="featured-brand-section">
            <h2 class="featured-brand-title">Spotlight Brand</h2>
            <div class="featured-brand-content">
                <div class="featured-brand-image">
                    <img src="https://placehold.co/600x400/21755E/FFFDB5?text=Brand+Image" alt="Spotlight Brand">
                </div>
                <div class="featured-brand-info">
                    <h3 class="featured-brand-name">Evie Rose</h3>
                    <p class="featured-brand-desc">Discover the elegant and timeless collection from our featured homegrown brand of the week. Handcrafted with love and perfect for your summer wardrobe.</p>
                    <button class="filter-btn">Explore Collection</button>
                </div>
            </div>
        </section>
"""

# Try to insert it right before the <footer class="main-footer"> tag
if "<footer class=\"main-footer\">" in html:
    html = html.replace("<footer class=\"main-footer\">", new_spotlight_section + "\n    <footer class=\"main-footer\">")
    
    with open("index.html", "w") as f:
        f.write(html)
    print("Success")
else:
    print("Failed to find footer")
