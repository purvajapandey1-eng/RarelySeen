document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".brand-grid-card");
    const grid = document.getElementById("brands-grid");
    const gridHeader = document.getElementById("grid-header");
    const defaultCat = grid.getAttribute("data-default-category") || "all";
    const defaultMax = grid.getAttribute("data-default-max-price") || "";
    const prodPage = document.getElementById("product-page");
    const prodGrid = document.getElementById("product-grid");
    const backBtn = document.getElementById("back-btn");
    
    // Lazy load state
    let allBrandProducts = [];
    let currentProducts = [];
    let productsLoaded = 0;

    function loadMoreProducts() {
        if (!currentProducts || currentProducts.length === 0) return;
        
        const loadBtn = document.getElementById("load-more-btn");
        const toLoad = currentProducts.slice(productsLoaded, productsLoaded + 12);
        
        if (toLoad.length === 0) {
            if (loadBtn) loadBtn.style.display = "none";
            return;
        }
        
        const html = toLoad.map(product => {
            if (product.isDummy) {
                return `
                <div class="product-item">
                    <div class="product-image-ph" style="background: linear-gradient(135deg, hsl(${product.hue1}, 20%, 85%), hsl(${product.hue2}, 30%, 75%));"></div>
                    <div class="product-details">
                        <div class="product-name">${product.title}</div>
                        <div class="product-price">₹${product.price}</div>
                    <button class="explore-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event.stopPropagation(); window.open('${product.url || ''}', '_blank')">Explore on Brand's Website</button>
                    </div>
                </div>
                `;
            }

            const urlAttr = product.url ? `onclick="window.open('${product.url}', '_blank')" style="cursor: pointer; opacity: 0; animation: fadeInContent 0.6s ease forwards;"` : `style="opacity: 0; animation: fadeInContent 0.6s ease forwards;"`;
            return `
            <div class="product-item" ${urlAttr}>
                <img class="product-image" src="${product.image}" alt="${product.title}">
                <div class="product-details">
                    <div class="product-name">${product.title}</div>
                    <div class="product-price">₹${product.price}</div>
                    
                    <button class="explore-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #670527; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 20; position: relative;" onclick="event.stopPropagation(); window.open('${product.url || ''}', '_blank')">Explore on Brand's Website</button>
                </div>
                ${getLikeButtonHTML(product)}
            </div>
            `;
        }).join("");
        
        prodGrid.insertAdjacentHTML("beforeend", html);
        productsLoaded += 12;

        if (productsLoaded >= currentProducts.length) {
            if (loadBtn) loadBtn.style.display = "none";
        } else {
            if (loadBtn) loadBtn.style.display = "inline-block";
        }
    }

    const loadMoreBtn = document.getElementById("load-more-btn");
    if(loadMoreBtn) loadMoreBtn.addEventListener("click", loadMoreProducts);

    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            const brand = card.getAttribute("data-brand");
            if (!brand) return;
            
            // Hide Grid
            grid.style.display = "none";
            gridHeader.style.display = "none";
            
            // Attempt to load products
            fetch(`${brand}_products.json?v=2`)
                .then(response => {
                    if(!response.ok) throw new Error("No data");
                    return response.json();
                })
                .then(products => {
                    allBrandProducts = products;
                    currentProducts = products;
                    productsLoaded = 0;
                    prodGrid.innerHTML = ""; 
                    
                    document.getElementById("category-filter").value = defaultCat;
                    document.getElementById("min-price").value = "";
                    document.getElementById("max-price").value = defaultMax;

                    document.getElementById("apply-filter-btn").click();
                    showProductPage();
                })
                .catch(() => {
                    // Generate dummies for brands with no JSON
                    const dummies = Array.from({length: 12}).map((_, i) => {
                        const hue1 = Math.floor(Math.random() * 360);
                        return {
                            isDummy: true,
                            title: `${brand} Edition 0${i + 1}`,
                            price: Math.floor(Math.random() * 1500) + 4500,
                            hue1: hue1,
                            hue2: (hue1 + 40) % 360
                        };
                    });
                    allBrandProducts = dummies;
                    currentProducts = dummies;
                    productsLoaded = 0;
                    prodGrid.innerHTML = "";
                    
                    document.getElementById("category-filter").value = defaultCat;
                    document.getElementById("min-price").value = "";
                    document.getElementById("max-price").value = defaultMax;

                    document.getElementById("apply-filter-btn").click();
                    showProductPage();
                });
        });
    });
    
    function showProductPage() {
        prodPage.style.display = "block";
        setTimeout(() => {
            prodPage.classList.add("visible");
        }, 50);
    }
    
    backBtn.addEventListener("click", () => {
        prodPage.classList.remove("visible");
        setTimeout(() => {
            prodPage.style.display = "none";
            grid.style.display = "grid";
            gridHeader.style.display = "block";
            window.scrollTo(0,0);
        }, 300);
    });
    
    document.getElementById("apply-filter-btn").addEventListener("click", () => {
        if (!allBrandProducts) return;
        const minVal = parseFloat(document.getElementById("min-price").value);
        const maxVal = parseFloat(document.getElementById("max-price").value);
        const category = document.getElementById("category-filter").value;
        
        const topsKeywords = ["top", "shirt", "blouse", "tunic", "tee", "t-shirt", "corset", "jacket", "coat", "shacket", "kurta", "crop"];
        const bottomsKeywords = ["bottom", "pant", "trouser", "skirt", "jean", "short", "legging", "track", "jogger", "denim"];
        const dressesKeywords = ["dress", "gown", "maxi", "midi", "mini"];
        const coordsKeywords = ["co-ord", "coord", "set", "suit", "pair"];
        const footwearKeywords = ["shoe", "sandal", "heel", "boot", "flat", "sneaker", "footwear", "slipper", "slider", "wedge"];

        currentProducts = allBrandProducts.filter(p => {
            const priceStr = String(p.price).replace(/,/g, "");
            const price = parseFloat(priceStr);
            
            if (!isNaN(price)) {
                if (!isNaN(minVal) && price < minVal) return false;
                if (!isNaN(maxVal) && price > maxVal) return false;
            }
            
            if (category !== "all") {
                const titleLower = (p.title || "").toLowerCase();
                let isTop = topsKeywords.some(kw => titleLower.includes(kw));
                let isBottom = bottomsKeywords.some(kw => titleLower.includes(kw));
                let isDress = dressesKeywords.some(kw => titleLower.includes(kw));
                let isCoord = coordsKeywords.some(kw => titleLower.includes(kw));
                let isFootwear = footwearKeywords.some(kw => titleLower.includes(kw));
                
                if (p.isDummy) {
                   isTop = p.hue1 % 5 === 0;
                   isBottom = p.hue1 % 5 === 1;
                   isDress = p.hue1 % 5 === 2;
                   isCoord = p.hue1 % 5 === 3;
                   isFootwear = p.hue1 % 5 === 4;
                }

                if (category === "tops" && !isTop) return false;
                if (category === "bottoms" && !isBottom) return false;
                if (category === "dresses" && !isDress) return false;
                if (category === "coords" && !isCoord) return false;
                if (category === "footwear" && !isFootwear) return false;
            }
            return true;
        });
        
        productsLoaded = 0;
        prodGrid.innerHTML = "";
        loadMoreProducts();
    });
});
