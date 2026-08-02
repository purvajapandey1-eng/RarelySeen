// Favorites System

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("rarelySeenFavorites")) || [];
    } catch (e) {
        return [];
    }
}

function saveFavorites(favs) {
    localStorage.setItem("rarelySeenFavorites", JSON.stringify(favs));
}

function toggleLike(event, url, title, price, image) {
    // Prevent the click from bubbling up to the product link
    event.stopPropagation();
    event.preventDefault();

    if (!url) {
        alert("This is a dummy product and cannot be saved!");
        return;
    }

    let favs = getFavorites();
    const btn = event.currentTarget;
    
    const existsIndex = favs.findIndex(f => f.url === url);
    
    if (existsIndex > -1) {
        // Remove from favorites
        favs.splice(existsIndex, 1);
        btn.classList.remove("liked");
        btn.innerHTML = "♡";
        // If we are currently in the favorites overlay, hide the product item visually immediately
        if (btn.closest("#favorites-modal-grid")) {
            const productItem = btn.closest(".product-item");
            if (productItem) {
                productItem.style.display = "none";
            }
        }
    } else {
        // Add to favorites
        favs.push({ url, title, price, image });
        btn.classList.add("liked");
        btn.innerHTML = "♥";
    }
    
    saveFavorites(favs);
}

// Function to determine if a product is liked when generating HTML
function isLiked(url) {
    if (!url) return false;
    const favs = getFavorites();
    return favs.some(f => f.url === url);
}

// Global function to return the like button HTML
function getLikeButtonHTML(product) {
    if (product.isDummy || !product.url) return "";
    
    const liked = isLiked(product.url);
    const cls = liked ? "like-btn liked" : "like-btn";
    const icon = liked ? "♥" : "♡";
    
    // Escape quotes in title
    const safeTitle = (product.title || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
    const safeImage = (product.image || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
    const safeUrl = (product.url || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
    
    return `<div class="${cls}" style="cursor: pointer; z-index: 20;" onclick="toggleLike(event, '${safeUrl}', '${safeTitle}', '${product.price}', '${safeImage}')">${icon}</div>`;
}

// --- Favorites Overlay Logic ---
function openFavoritesOverlay() {
    let overlay = document.getElementById("favorites-overlay");
    if (!overlay) {
        // Create the overlay container
        overlay = document.createElement("div");
        overlay.id = "favorites-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "#fff";
        overlay.style.zIndex = "9999";
        overlay.style.overflowY = "auto";
        overlay.style.display = "none"; // hidden initially

        overlay.innerHTML = `
            <div style="padding: 2rem;">
                <a href="javascript:void(0)" onclick="closeFavoritesOverlay()" class="home-btn" style="position: absolute; top: 2rem; left: 2rem;">← Go Back</a>
                <header class="section-header" style="margin-top: 60px;">
                    <h1 class="section-title">Your Favorites</h1>
                    <p class="section-subtitle">A collection of styles you absolutely love</p>
                </header>
                <div class="product-grid" id="favorites-modal-grid" style="margin-top: 40px; min-height: 400px; padding: 2rem;">
                    <!-- Rendered by JS -->
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    
    const grid = document.getElementById("favorites-modal-grid");
    const favs = getFavorites();
    
    if (favs.length === 0) {
        grid.innerHTML = "<p style='text-align: center; width: 100%; font-size: 1.2rem;'>You haven't liked any items yet. Start exploring!</p>";
    } else {
        grid.innerHTML = favs.map(product => {
            const safeTitle = (product.title || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
            const safeImage = (product.image || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
            const safeUrl = (product.url || "").replace(/'/g, "\\\\'").replace(/"/g, "&quot;");
            
            return `
            <div class="product-item" style="opacity: 0; animation: fadeInContent 0.6s ease forwards; position: relative;">
                <img class="product-image" src="${product.image}" alt="${product.title}" onclick="window.open('${product.url}', '_blank')" style="cursor: pointer;">
                <div class="product-details" onclick="window.open('${product.url}', '_blank')" style="cursor: pointer;">
                    <div class="product-name">${product.title}</div>
                    <div class="product-price">₹${product.price}</div>
                    
                    <button class="explore-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event.stopPropagation(); window.open('${product.url || ''}', '_blank')">Explore on Brand's Website</button>
                </div>
                <div class="like-btn liked" style="cursor: pointer; z-index: 20;" onclick="toggleLike(event, '${safeUrl}', '${safeTitle}', '${product.price}', '${safeImage}')">♥</div>
            </div>
            `;
        }).join("");
    }
    
    overlay.style.display = "block";
}

function closeFavoritesOverlay() {
    const overlay = document.getElementById("favorites-overlay");
    if (overlay) {
        overlay.style.display = "none";
        // Also refresh the background page products to reflect unliked status!
        const applyBtn = document.getElementById("apply-filter-btn");
        const prodPage = document.getElementById("product-page");
        if (applyBtn && prodPage && prodPage.style.display === "block") {
            applyBtn.click();
        }
    }
}
