with open("index.html", "r") as f:
    index = f.read()

head_end = index.find("</nav>") + 6
header_html = index[:head_end]

page = f"""{header_html}
    <main class="content page-tops">
        <a href="javascript:history.back()" class="home-btn">← Go Back</a>
        <header class="section-header" id="grid-header">
            <h1 class="section-title">Your Favorites</h1>
            <p class="section-subtitle">A collection of styles you absolutely love</p>
        </header>
        
        <div class="product-grid" id="favorites-grid" style="margin-top: 40px; min-height: 400px;">
            <!-- Rendered by JS -->
        </div>
    </main>
    <script src="favorites.js?v=1"></script>
    <script>
        document.addEventListener("DOMContentLoaded", () => {{
            const grid = document.getElementById("favorites-grid");
            const favs = getFavorites();
            
            if (favs.length === 0) {{
                grid.innerHTML = "<p style=\\"text-align: center; width: 100%; font-size: 1.2rem;\\">You haven't liked any items yet. Start exploring!</p>";
                grid.style.display = "block";
                return;
            }}
            
            const html = favs.map(product => {{
                // Escape quotes
                const safeTitle = (product.title || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
                const safeImage = (product.image || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
                const safeUrl = (product.url || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
                
                return `
                <div class="product-item" style="opacity: 0; animation: fadeInContent 0.6s ease forwards;">
                    <img class="product-image" src="${{product.image}}" alt="${{product.title}}" onclick="window.open('${{product.url}}', '_blank')" style="cursor: pointer;">
                    <div class="product-details" onclick="window.open('${{product.url}}', '_blank')" style="cursor: pointer;">
                        <div class="product-name">${{product.title}}</div>
                        <div class="product-price">₹${{product.price}}</div>
                    </div>
                    <div class="like-btn liked" onclick="toggleLike(event, '${{safeUrl}}', '${{safeTitle}}', '${{product.price}}', '${{safeImage}}'); this.parentElement.style.display='none'">♥</div>
                </div>
                `;
            }}).join("");
            
            grid.innerHTML = html;
        }});
    </script>
</body>
</html>
"""

with open("favorites.html", "w") as f:
    f.write(page)
print("Created favorites.html")
