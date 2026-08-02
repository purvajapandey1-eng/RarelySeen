
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_wc4MkzNSspRCBypkannNCjoV8gd3PuRmobhipHB5FQfJ', {api_host: 'https://us.i.posthog.com', autocapture: true});

document.addEventListener('DOMContentLoaded', () => {
    console.log('Rarely Seen D3 Physics Engine Loaded.');

    // Autocapture clicks on "Explore on Brand's Website" buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('explore-btn')) {
            let targetUrl = '';
            const onclickAttr = e.target.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/window\.open\('([^']+)'/);
                if (match) targetUrl = match[1];
            }
            posthog.capture("Explore on Brand's Website Clicked", {
                destination_url: targetUrl
            });
        }
    });

    const brandNames = [
        "Leaclothingco", "Label society", "&thensome", "Imsoo", "shopmauve.in", 
        "10.30pm", "shop&yours", "Shopdiris", "Ms.maven", "Orange at eight", 
        "Kind inside", "Summersoul", "Twelvthedit", "Neelmii", "Essgee", 
        "Qalaclothing", "Summeraway", "sunday loveshop", "Sunday molly", 
        "The pink elephant", "Ruiaan", "Lovechoje", "Poppiclothing", "Moontara", 
        "Fancypastelsindia", "The missy co", "Nef’s finds",
        "House of mae", "Blomas", "Weaving cult", 
        "Truffle", "Amoshi", "Muvazo", "Ribble", "autumn summer", 
        "Evie rose", "True west fashion", "Ever pret", "Disobedience chennai", "Mnsh.design", 
        "Pariparilife", "Lovetobag", "Dhora india", "Mayabazaar jewellery", "No Na Me", 
        "Upkarna jewellery store", "A little extra", "Jewels mars", "I blame beads",
        "Beeglee", "Palay", "Rerunn", "Outcast", 
        "Nete", "Birdhouse", "House of Prisca", "Mazikien", "Qua", "Nishorama", "ButterBawd", "Everdion", "Mile collective", "Endless summer", "Outdated official", "The clothing factory", "Couch days", "Core cotton", "Kuuky", "Studio Picante", "Bluer", "Living in surma"
    ];

    // Splash Screen Logic
    const splashOverlay = document.getElementById('splash-overlay');
    const splashBrandsContainer = document.getElementById('splash-brands');

    if (!sessionStorage.getItem('splashShown')) {
        // Pick 3 random brands
        const shuffled = [...brandNames].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        
        splashBrandsContainer.innerHTML = selected.map(b => `<div>${b}</div>`).join('');
        
        splashOverlay.addEventListener('click', () => {
            splashOverlay.style.opacity = '0';
            setTimeout(() => {
                splashOverlay.style.display = 'none';
                // Small bump to the physics engine when entering
                if (window.simulation) window.simulation.alpha(0.8).restart();
            }, 500);
            sessionStorage.setItem('splashShown', 'true');
        });
    } else {
        splashOverlay.style.display = 'none';
    }

    const container = document.getElementById('honeycomb-container');
    const width = document.querySelector('.honeycomb-container').clientWidth;
    const height = 850;
    const TOTAL_BRANDS = brandNames.length;
    const BASE_RADIUS = 60;  // 120px diameter
    const HOVER_RADIUS = 130; // 260px diameter
    const SHRINK_RADIUS = 40; // 80px diameter
    const GAP = 2;

    // --- Hero Sidebars Logic ---
    const scrapedBrandsList = [
        "Leaclothingco", "Label society", "shopmauve.in", "Neelmii", "Qalaclothing", 
        "Summeraway", "sunday loveshop", "Moontara", "Fancypastelsindia", "Ms.maven", 
        "Orange at eight", "Essgee", "Ruiaan", "10.30pm", "shop&yours", "Imsoo", 
        "&thensome", "Shopdiris", "The pink elephant", "Kind inside", "Twelvthedit", 
        "The missy co", "Lovechoje", "Sunday molly", "Poppiclothing", "Nef’s finds",
        "House of mae", "Blomas", "Weaving cult", "Truffle", "Amoshi", 
        "Muvazo", "Ribble", "autumn summer", "Evie rose", "True west fashion", 
        "Ever pret", "Disobedience chennai", "Mnsh.design", "Pariparilife", 
        "Lovetobag", "Dhora india", "Mayabazaar jewellery", "No Na Me", 
        "Upkarna jewellery store", "A little extra", "Jewels mars", "I blame beads",
        "Beeglee", "Palay", "Rerunn", "Outcast", 
        "Nete", "Birdhouse", "House of Prisca", "Mazikien", "Qua", "Nishorama", "ButterBawd", "Everdion", "Mile collective", "Endless summer", "Outdated official", "The clothing factory", "Couch days", "Core cotton", "Kuuky", "Studio Picante", "Bluer", "Living in surma"
    ];
    
    function initSidebars() {
        const shuffledBrands = [...scrapedBrandsList].sort(() => 0.5 - Math.random());
        const newArrivalBrand = shuffledBrands[0];
        const limitedEditionBrand = shuffledBrands[1];
        const spotlightBrand = shuffledBrands[2];
        const curatedBrands = shuffledBrands.slice(3, 6);

        function injectSingleCard(brand, elementId) {
            fetch(`${brand}_products.json?v=2`)
                .then(res => res.json())
                .then(products => {
                    if(products.length > 0) {
                        const randomProd = products[Math.floor(Math.random() * Math.min(20, products.length))];
                        const urlAttr = randomProd.url ? `onclick="window.open('${randomProd.url}', '_blank')" style="cursor: pointer;"` : '';
                        document.getElementById(elementId).innerHTML = `
                            <div ${urlAttr} style="height:100%; width:100%; display:flex; flex-direction:column; align-items:center;">
                                <img class="spotlight-img" src="${randomProd.image}" alt="${brand}">
                                <div class="spotlight-brand-name">${brand}</div>
                                <div class="spotlight-price">₹${randomProd.price}</div>
                            </div>
                        `;
                    }
                })
                .catch(e => console.log('Error loading', elementId, e));
        }

        // Load Top & Bottom Cards
        injectSingleCard(newArrivalBrand, 'new-arrival-card');
        injectSingleCard(limitedEditionBrand, 'limited-edition-card');
        injectSingleCard(spotlightBrand, 'spotlight-card');

        // Load Curated
        const curatedStack = document.getElementById('curated-stack');
        if (curatedStack) {
            curatedStack.innerHTML = '';
            curatedBrands.forEach((brand, index) => {
                fetch(`${brand}_products.json?v=2`)
                    .then(res => res.json())
                    .then(products => {
                        if(products.length > 0) {
                            const randomProd = products[Math.floor(Math.random() * Math.min(20, products.length))];
                            const urlAttr = randomProd.url ? `onclick="window.open('${randomProd.url}', '_blank')"` : '';
                            
                            // Zig-zag stacking logic
                            const angle = index === 0 ? -12 : index === 1 ? 8 : -6;
                            const tx = index === 0 ? -40 : index === 1 ? 30 : -20;
                            const ty = (index * 45) - 30; // Separates them vertically!
                            
                            const html = `
                                <div class="curated-polaroid-wrapper" style="transform: translate(${tx}px, ${ty}px) rotate(${angle}deg); z-index: ${index}; cursor: pointer;" ${urlAttr}>
                                    <div class="curated-polaroid">
                                        <img class="curated-polaroid-img" src="${randomProd.image}" alt="Curated">
                                        <div class="curated-polaroid-brand">${brand}</div>
                                    </div>
                                </div>
                            `;
                            curatedStack.insertAdjacentHTML('beforeend', html);
                        }
                    })
                    .catch(e => console.log('Error loading curated', e));
            });
        }
    }

    // // initSidebars();

    // --- Rotate Brand Spotlight Logic ---
    function startBrandSpotlightRotation() {
        let currentSpotlightBrand = null;
        
        
        const updateSpotlight = () => {
            const scrapedBrands = [
                "Leaclothingco", "Label society", "shopmauve.in", "Neelmii", "Qalaclothing", 
                "Summeraway", "sunday loveshop", "Moontara", "Fancypastelsindia", "Ms.maven", 
                "Orange at eight", "Essgee", "Ruiaan", "10.30pm", "shop&yours", "Imsoo", 
                "&thensome", "Shopdiris", "The pink elephant", "Kind inside", "Twelvthedit", 
                "The missy co", "Lovechoje", "Sunday molly", "Poppiclothing", "Nef’s finds",
                "House of mae", "Blomas", "Weaving cult", "Truffle", "Amoshi", 
                "Muvazo", "Ribble", "autumn summer", "Evie rose", "True west fashion", 
                "Ever pret", "Disobedience chennai", "Mnsh.design", "Pariparilife", 
                "Lovetobag", "Dhora india", "Mayabazaar jewellery", "No Na Me", 
                "Upkarna jewellery store", "A little extra", "Jewels mars", "I blame beads",
                "Beeglee", "Palay", "Rerunn", "Outcast", 
                "Nete", "Birdhouse", "House of Prisca", "Mazikien", "Qua", "Nishorama", "ButterBawd", "Everdion", "Mile collective", "Endless summer", "Outdated official", "The clothing factory", "Couch days", "Core cotton", "Kuuky", "Studio Picante", "Bluer", "Living in surma"
            ];
            const randomBrand = scrapedBrands[Math.floor(Math.random() * scrapedBrands.length)];
            currentSpotlightBrand = randomBrand;
            
            fetch(randomBrand + '_products.json')
                .then(res => {
                    if (!res.ok) throw new Error('Not found');
                    return res.json();
                })
                .then(products => {
                    const imgEl = document.querySelector('.featured-brand-image img');
                    const nameEl = document.querySelector('.featured-brand-name');
                    const descEl = document.querySelector('.featured-brand-desc');
                    
                    if (imgEl && nameEl && descEl && products.length > 0) {
                        imgEl.style.opacity = '0';
                        nameEl.style.opacity = '0';
                        descEl.style.opacity = '0';
                        
                        setTimeout(() => {
                            imgEl.src = products[0].image || '';
                            nameEl.textContent = randomBrand;
                            descEl.textContent = 'Discover the elegant and timeless collection from our featured homegrown brand of the week. Handcrafted with love and perfect for your summer wardrobe.';
                            
                            imgEl.style.transition = 'opacity 0.5s ease';
                            nameEl.style.transition = 'opacity 0.5s ease';
                            descEl.style.transition = 'opacity 0.5s ease';
                            
                            imgEl.style.opacity = '1';
                            nameEl.style.opacity = '1';
                            descEl.style.opacity = '1';
                        }, 500);
                    }
                })
                .catch(err => {
                    setTimeout(updateSpotlight, 1000);
                });
        };
        
        updateSpotlight();
        setInterval(updateSpotlight, 7000);

        
        // Wire up 'Explore Collection' button
        const exploreBtn = document.querySelector('.featured-brand-section .filter-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                if (!currentSpotlightBrand) return;
                
                // Find the bubble that corresponds to this brand and click it!
                const bubbles = document.querySelectorAll('.bubble');
                for (let b of bubbles) {
                    // In D3 data, the brand name is bound. We can check the innerText or the __data__ property
                    if (b.__data__ && b.__data__.brand === currentSpotlightBrand) {
                        // Dispatch a click event to the bubble to trigger the existing product page logic!
                        const event = new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        });
                        b.dispatchEvent(event);
                        
                        // Scroll to top to see the product page
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        break;
                    }
                }
            });
        }
    }
    
    // Call it when the DOM is ready
    startBrandSpotlightRotation();


                // State for lazy loading products
    window.allBrandProducts = [];
    window.currentProducts = [];
    window.productsLoaded = 0;

    function loadMoreProducts() {
        if (!window.currentProducts || window.currentProducts.length === 0) return;
        
        const prodGrid = document.getElementById('product-grid');
        const loadBtn = document.getElementById('load-more-btn');
        const toLoad = window.currentProducts.slice(window.productsLoaded, window.productsLoaded + 12);
        
        if (toLoad.length === 0) {
            if (loadBtn) loadBtn.style.display = 'none';
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
        }).join('');
        
        prodGrid.insertAdjacentHTML('beforeend', html);
        window.productsLoaded += 12;

        if (window.productsLoaded >= window.currentProducts.length) {
            if (loadBtn) loadBtn.style.display = 'none';
        } else {
            if (loadBtn) loadBtn.style.display = 'inline-block';
        }
    }

    // Attach click listener to load more button
    document.getElementById('load-more-btn').addEventListener('click', loadMoreProducts);

    // Filter logic
    document.getElementById('apply-filter-btn').addEventListener('click', () => {
        if (!window.allBrandProducts) return;
        const minVal = parseFloat(document.getElementById('min-price').value);
        const maxVal = parseFloat(document.getElementById('max-price').value);
        const category = document.getElementById('category-filter').value;
        
        const topsKeywords = ['top', 'shirt', 'blouse', 'tunic', 'tee', 't-shirt', 'corset', 'jacket', 'coat', 'shacket', 'kurta', 'crop'];
        const bottomsKeywords = ['bottom', 'pant', 'trouser', 'skirt', 'jean', 'short', 'legging', 'track', 'jogger', 'denim'];
        const dressesKeywords = ['dress', 'gown', 'maxi', 'midi', 'mini'];
        const coordsKeywords = ['co-ord', 'coord', 'set', 'suit', 'pair'];

        window.currentProducts = window.allBrandProducts.filter(p => {
            const priceStr = String(p.price).replace(/,/g, '');
            const price = parseFloat(priceStr);
            
            if (!isNaN(price)) {
                if (!isNaN(minVal) && price < minVal) return false;
                if (!isNaN(maxVal) && price > maxVal) return false;
            }
            
            if (category !== 'all') {
                const titleLower = (p.title || '').toLowerCase();
                let isTop = topsKeywords.some(kw => titleLower.includes(kw));
                let isBottom = bottomsKeywords.some(kw => titleLower.includes(kw));
                let isDress = dressesKeywords.some(kw => titleLower.includes(kw));
                let isCoord = coordsKeywords.some(kw => titleLower.includes(kw));
                
                if (p.isDummy) {
                   // Assign them pseudo-randomly to categories for the demo
                   isTop = p.hue1 % 4 === 0;
                   isBottom = p.hue1 % 4 === 1;
                   isDress = p.hue1 % 4 === 2;
                   isCoord = p.hue1 % 4 === 3;
                }

                if (category === 'tops' && !isTop) return false;
                if (category === 'bottoms' && !isBottom) return false;
                if (category === 'dresses' && !isDress) return false;
                if (category === 'coords' && !isCoord) return false;
            }

            return true;
        });
        
        window.productsLoaded = 0;
        document.getElementById('product-grid').innerHTML = '';
        loadMoreProducts();
    });

    // Create node data
    const nodes = d3.range(TOTAL_BRANDS).map(i => {
        const brandName = brandNames[i];
        const logos = {
            "Leaclothingco": "https://cdn.shopify.com/s/files/1/0518/6768/0952/files/LEA_LOGO_1.png",
            "shopmauve.in": "https://www.shopmauve.in/cdn/shop/files/LOGO_16.png",
            "Neelmii": "https://www.neelmii.com/cdn/shop/files/LOGO_744e7ea4-7361-4675-9554-7c909b295be1.png",
            
            "Fancypastelsindia": "https://fancypastels.com/cdn/shop/files/newlogoround_2048x2048.png",
            "Ms.maven": "https://www.msmaven.in/cdn/shop/files/final_logo_text-01.png?v=1749458046&width=600",
            "Orange at eight": "https://orangeateight.com/cdn/shop/files/Copy_of_Orange_at_Eight_logo_file-03.png?v=1773228678&width=1200",
            "Essgee": "https://essgee.co/cdn/shop/files/logo-01_140x.png?v=1651489454",
            "Ruiaan": "https://www.ruiaan.com/cdn/shop/files/No_BG_-_Ruiaan_Logo.png?v=1769758432&width=612",
            "Imsoo": "https://studioimsoo.com/cdn/shop/files/Logo.png?height=33&v=1756924662",
            "&thensome": "https://andthensome.in/cdn/shop/files/Secondary_Logo_Black_200x.png?v=1733998955",
            "Shopdiris": "https://shopdiris.com/cdn/shop/files/logo_4.webp?v=1716622489",
            "Kind inside": "https://kindinside.in/cdn/shop/files/LogoFIN.png?v=1740981168&width=600",
            "Summeraway": "https://summeraway.in/cdn/shop/files/logo.png?v=1736140549&width=320",
            "The missy co": "https://themissyco.in/cdn/shop/files/black_missy_logo.png?v=1745332586&width=600",
            "Sunday molly": "https://sundaymolly.com/cdn/shop/files/SM_Logo_White.png?v=1771171260&width=400",
            "Poppiclothing": "https://poppi.in/cdn/shop/files/Logo-New-01_150x.png?v=1727727623",
            "Nef’s finds": "https://nefsfinds.com/cdn/shop/files/logo2.png?v=1738240189",
            "House of mae": "https://www.houseofmae.shop/cdn/shop/files/Website_Logo_1_180x.png?v=1703572037",
            "Amoshi": "https://amoshi.in/cdn/shop/files/Amoshi_Logo_R_Black_3fea0cb8-f3c2-44f4-8310-487794e1f6d3.png?v=1733312611&width=2603",
            "Muvazo": "https://cdn.shopify.com/s/files/1/0651/9006/8440/files/Muvazo_Logo_1_1cce44bb-3bc8-4674-b04c-307f282a3d7e.png?v=1763035308",
            "Ribble": "https://ribelle.in/cdn/shop/files/white-logo.png?v=1669205485&width=600",
            "autumn summer": "https://www.autumnsummer.in/cdn/shop/files/Logo.png?v=1758892459&width=3840",
            "Evie rose": "https://evierose.in/cdn/shop/files/Logo_White.png?v=1721029614&width=320",
            "True west fashion": "https://www.truewest.in/cdn/shop/files/Transparent-logo2.png?v=1710062536&width=600",
            "Ever pret": "https://everpret.com/cdn/shop/files/Logo_Symbol_Cropped_Black.png?v=1713618697&width=721",
            "Mnsh.design": "https://mnsh.co/cdn/shop/files/logo-01_2_e4a528ab-501d-4d60-a78d-16cfeffc0445.png?crop=center&height=78&v=1775561847&width=280",
            "Pariparilife": "https://pariparilife.com/cdn/shop/files/logo_02cda6f1-e609-4b8c-8373-d24f6f8396aa_300x300.png?v=1619286524",
            "Mayabazaar jewellery": "https://shopmaya.in/cdn/shop/files/logo_2_1445x.png?v=1644254002",
            "No Na Me": "https://www.nonamejewelry.in/cdn/shop/files/LOGOTYPE-thicker-2-01_7051b831-719d-48f6-8e45-992bf5efdb6c.png?v=1685001334",
            "Upkarna jewellery store": "https://upakarna.com/cdn/shop/files/golden_logo_1.jpg?v=1753339450&width=300",
            "Jewels mars": "https://jewelsmars.com/cdn/shop/files/Jewelsmars_Logo.svg?v=1745510170&width=330",
            "Outcast": "https://outcasts.in/cdn/shop/files/logo_outcast_1.png?v=1735300677&width=380",
            "Nete": "https://www.nete.in/cdn/shop/files/NETELOGO_1_932ec8b3-d5c6-413b-8321-952260c2d5ca.jpg?v=1735200288&width=500",
            "Birdhouse": "https://birdhouse.life/cdn/shop/files/Birdhouse_logo_final_ed569d2e-90be-47ea-b333-0771d2ab9430.png?v=1712373266&width=390",
            "House of Prisca": "https://www.houseofprisca.com/cdn/shop/files/HoP_WordMark_Half.png?v=1679909097&width=500",
            "Mazikien": "https://mazikien.com/cdn/shop/files/Untitled_design_11.png?v=1694514726&width=500",
            "Qua": "https://www.qua.clothing/cdn/shop/files/New_logo_1-removebg-preview_70x.png?v=1683639776",
            "Nishorama": "https://www.nishorama.com/cdn/shop/files/Website_logo_280_x_80_px_300_x_66_px_350_x_66_px_550_x_70_px_1000_x_80_px_8.png?v=1768836672&width=180",
            "ButterBawd": "http://www.butterbawd.com/cdn/shop/files/Facebook_cover_1200_x_628_px.png?v=1768725472",
            "Everdion": "https://everdion.com/cdn/shop/files/logo_black.png?v=1748186571",
            "Mile collective": "http://milecollective.in/cdn/shop/files/Mile_Collective-00623_1_1f484fe5-b24e-4011-8cff-11e0850290e7.png?v=1768502930",
            "Endless summer": "http://www.endlesssummershop.com/cdn/shop/files/endless_summer_brand_doc-15.jpg?v=1682950880",
            "The clothing factory": "http://theclothingfactory.in/cdn/shop/files/Petals-and-day-dream.webp?v=1744952893&width=1024",
            "Couch days": "https://couchdays.in/cdn/shop/files/logo-removebg-preview.png?height=50&amp;v=1769236740",
            "Core cotton": "https://www.corecotton.in/cdn/shop/files/GQ-Logo.png?crop=center&amp;height=112&amp;v=1734762940&amp;width=200",
            "Kuuky": "https://kuuky.in/cdn/shop/files/logoinvert.png?height=20&amp;v=1752149774",
            "Studio Picante": "https://studiopicante.in/cdn/shop/files/picante-logo.svg?v=1741578471&amp;width=168",
            "Bluer": "http://bluer.co.in/cdn/shop/files/logo-_zelltin-08_1.png?v=1735914883&width=1024",
            "Living in surma": "http://surma.in/cdn/shop/files/WhatsApp_Image_2025-05-27_at_15.24.09_375251ba.jpg?v=1748340793",
            "shop&yours": "https://www.google.com/s2/favicons?domain=shopandyours.com&sz=128",
            "the pink elephant": "http://lovethepinkelephant.com/cdn/shop/files/RHT02314_1_1200x630.jpg?v=1752472035",
            "Moontara": "http://www.moontara.in/cdn/shop/files/Untitled_design_13_0ba30834-84e0-4b32-a8be-9ee6c293c888.png?v=1700732644",
            "Blomas": "http://blomas.in/cdn/shop/files/Blomas_wordmark_-_red.png?height=628&pad_color=ffffff&v=1714568188&width=1200",
            
            "Weaving cult": "https://www.weavingcult.com/cdn/shop/files/Weaving_Cult_logo.png?v=1770410433&amp;width=563",
            "Dhora India": "http://dhoraindia.in/cdn/shop/files/dhorashare.jpg?v=1627291173",
            "Love to bag": "https://lovetobag.com/cdn/shop/files/cropped-NE_1.png?v=1767103975&width=360",
            "Sunday loveshop": "https://sundayloveshop.com/cdn/shop/files/1-removebg-preview.png?v=1758613635&width=170",
            "qala clothing": "http://qalaclothing.com/cdn/shop/files/QALA_SOCIAL.png?v=1680871660",
            "love choje": "http://lovechoje.com/cdn/shop/files/Typo-Symbol_16af00b4-f2e0-42a1-b901-11b29ea9a869.png?v=1761131072",
            "Nef's finds": "http://nefsfinds.com/cdn/shop/files/logo_f68d9d4e-825f-4efe-8e12-258942df8bae_1200x1200.jpg?v=1648281913",
            "Rerunn": "http://rerunn.com/cdn/shop/files/Rerunn_logo_1a55db7b-e61c-4e34-ae38-8bf3f0dc9cd9.png?v=1727932646",
            "Disobedience": "https://clipground.com/images/elle-logo-clipart-9.png",
            "a little extra": "http://alittleextra.co.in/cdn/shop/files/NEWMEW.png?height=628&pad_color=ffffff&v=1774585294&width=1200",
            "Core cotton": "https://www.corecotton.in/cdn/shop/files/GQ-Logo.png?crop=center&amp;height=112&amp;v=1734762940&amp;width=200",
            "Dhora india": "http://dhoraindia.in/cdn/shop/files/dhorashare.jpg?v=1627291173",
            "Qalaclothing": "http://qalaclothing.com/cdn/shop/files/QALA_SOCIAL.png?v=1680871660",
            "Lovechoje": "http://lovechoje.com/cdn/shop/files/Typo-Symbol_16af00b4-f2e0-42a1-b901-11b29ea9a869.png?v=1761131072",
            "Disobedience chennai": "https://clipground.com/images/elle-logo-clipart-9.png",
            "Lovetobag": "https://lovetobag.com/cdn/shop/files/cropped-NE_1.png?v=1767103975&width=360",
            "Nef’s finds": "http://nefsfinds.com/cdn/shop/files/logo_f68d9d4e-825f-4efe-8e12-258942df8bae_1200x1200.jpg?v=1648281913",
            
            
            "Twelvth Edit": "https://cdn.shopify.com/s/files/1/0889/6230/2318/files/favicon.svg",
            "twelvth edit": "https://cdn.shopify.com/s/files/1/0889/6230/2318/files/favicon.svg",
            "Twelvth edit": "https://cdn.shopify.com/s/files/1/0889/6230/2318/files/favicon.svg",
            "10.30Pm": "https://1030pm.in/cdn/shop/files/icon-Consciously-Crafted.svg?v=1747512277",
            "10.30pm": "https://1030pm.in/cdn/shop/files/icon-Consciously-Crafted.svg?v=1747512277",
            
            
            "palay": "https://placehold.co/400x400/fdfbf7/333333/png?text=Palay",
            "Palay": "https://placehold.co/400x400/fdfbf7/333333/png?text=Palay",
            "Beeglee": "https://placehold.co/400x400/fdfbf7/333333/png?text=Beeglee",
            "beeglee": "https://placehold.co/400x400/fdfbf7/333333/png?text=Beeglee",
            "I Blame Beads": "https://placehold.co/400x400/fdfbf7/333333/png?text=I%20Blame%20Beads",
            "i blame beads": "https://placehold.co/400x400/fdfbf7/333333/png?text=I%20Blame%20Beads",
            "I blame beads": "https://placehold.co/400x400/fdfbf7/333333/png?text=I%20Blame%20Beads",
            "outdated official": "https://placehold.co/400x400/fdfbf7/333333/png?text=Outdated%20Official",
            "Outdated official": "https://placehold.co/400x400/fdfbf7/333333/png?text=Outdated%20Official",
            "Outdated Official": "https://placehold.co/400x400/fdfbf7/333333/png?text=Outdated%20Official",
            
            
            
            "A little extra": "http://alittleextra.co.in/cdn/shop/files/NEWMEW.png?height=628&pad_color=ffffff&v=1774585294&width=1200",
            "a little extra": "http://alittleextra.co.in/cdn/shop/files/NEWMEW.png?height=628&pad_color=ffffff&v=1774585294&width=1200",
            "A Little Extra": "http://alittleextra.co.in/cdn/shop/files/NEWMEW.png?height=628&pad_color=ffffff&v=1774585294&width=1200",
            "Truffle": "https://placehold.co/400x400/fdfbf7/333333/png?text=Truffle",
            "truffle": "https://placehold.co/400x400/fdfbf7/333333/png?text=Truffle",
            
            
            
            "summer soul": "https://placehold.co/400x400/fdfbf7/333333/png?text=Summer%20Soul",
            "Summer Soul": "https://placehold.co/400x400/fdfbf7/333333/png?text=Summer%20Soul",
            "Summer soul": "https://placehold.co/400x400/fdfbf7/333333/png?text=Summer%20Soul",
            "Twelvth Edit": "https://placehold.co/400x400/fdfbf7/333333/png?text=Twelvth%20Edit",
            "Twelvth edit": "https://placehold.co/400x400/fdfbf7/333333/png?text=Twelvth%20Edit",
            "twelvth edit": "https://placehold.co/400x400/fdfbf7/333333/png?text=Twelvth%20Edit",
            "The pink elephant": "http://lovethepinkelephant.com/cdn/shop/files/RHT02314_1_1200x630.jpg?v=1752472035",
            "the pink elephant": "http://lovethepinkelephant.com/cdn/shop/files/RHT02314_1_1200x630.jpg?v=1752472035",
            "The Pink Elephant": "http://lovethepinkelephant.com/cdn/shop/files/RHT02314_1_1200x630.jpg?v=1752472035",
            "10.30Pm": "https://1030pm.in/cdn/shop/files/LOGO_1_150x.png",
            "10.30pm": "https://1030pm.in/cdn/shop/files/LOGO_1_150x.png"
        };
        const logo = logos[brandName] || null;

        // Initial rough grid placement to help D3 settle into honeycomb faster
        const cols = 7;
        const row = Math.floor(i / cols);
        const col = i % cols;
        return {
            id: i,
            brand: brandName,
            logo: logo,
            radius: BASE_RADIUS,
            targetRadius: BASE_RADIUS,
            x: width / 2 + (col - cols/2) * (BASE_RADIUS * 2),
            y: height / 2 + (row - 2) * (BASE_RADIUS * 2)
        };
    });

    // Create D3 physics simulation
    window.simulation = d3.forceSimulation(nodes)
        .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05))
        .force('x', d3.forceX(width / 2).strength(0.005))
        .force('y', d3.forceY(height / 2).strength(0.08))
        .force('collide', d3.forceCollide().radius(d => d.radius + GAP).iterations(4))
        .force('charge', d3.forceManyBody().strength(-15))
        .alphaDecay(0.02); // Slower decay for smoother settling

    // Create DOM elements
    const bubbles = d3.select('#honeycomb-container').selectAll('.bubble')
        .data(nodes)
        .enter()
        .append('div')
        .attr('class', 'bubble')
        .html(d => {
            if (d.brand === "Leaclothingco" && d.logo) {
                // Leaclothingco explicitly allows CORS, so mask works and we color it pink
                return `<div class="bubble-logo-mask" style="background-color: #ff477e; -webkit-mask-image: url('${d.logo}'); mask-image: url('${d.logo}');"></div>`;
            } else if (d.logo) {
                // Use standard img tag because cross-origin CDNs block CSS masks
                const whiteLogos = ["Evie rose", "Ribble", "Outcast", "Sunday molly", "Jewels mars"];
                const filterStyle = whiteLogos.includes(d.brand) ? 'style="filter: invert(1) brightness(0);"' : '';
                return `<img src="${d.logo}" alt="${d.brand}" class="bubble-logo" ${filterStyle}>`;
            } else {
                return `<div class="brand-name">${d.brand}</div>`;
            }
        })
        .on('mouseenter', function(event, d) {
            // Find distances from hovered node to all other nodes
            const distances = nodes.map(n => ({
                node: n,
                dist: Math.hypot(n.x - d.x, n.y - d.y)
            }));
            
            // Sort by distance to find the closest neighbors
            distances.sort((a, b) => a.dist - b.dist);
            
            distances.forEach((item, index) => {
                if (index === 0) {
                    item.node.targetRadius = HOVER_RADIUS; // The hovered node
                } else if (index <= 6) {
                    item.node.targetRadius = SHRINK_RADIUS; // The ~6 immediate surrounding nodes
                } else {
                    item.node.targetRadius = BASE_RADIUS; // The rest of the honeycomb
                }
            });
            
            // Wake up the physics engine to resolve the new collisions
            simulation.alpha(0.6).restart();
        })
        .on('mouseleave', function(event, d) {
            // Only handle hover physics if not on product page
            if (d3.select(this).classed('selected') || document.querySelector('.top-header').classList.contains('hidden')) return;
            
            // Reset all nodes to base radius
            nodes.forEach(n => {
                n.targetRadius = BASE_RADIUS;
            });
            
            // Wake up physics engine
            window.simulation.alpha(0.6).restart();
        })
        .on('click', function(event, d) {
            const clickedBubble = d3.select(this);
            if (clickedBubble.classed('selected')) return; // Already on product page

            // --- FORWARD ANIMATION (To Product Page) ---
            // 1. Pause physics engine immediately
            window.simulation.stop();
            
            // 2. We keep top-header VISIBLE. 
            
            // 3. Drop all OTHER bubbles
            bubbles.filter(n => n.id !== d.id).classed('falling', true);
            
            // 4. Morph selected bubble to top-left via CSS transform relative to its current position
            clickedBubble.classed('selected', true);
            
            // Hide sidebars during product view
            

            // 4. Create a Fixed Clone of the bubble for scroll-proof animation
            const rect = this.getBoundingClientRect();
            const clone = this.cloneNode(true);
            clone.id = 'fixed-bubble';
            clone.style.position = 'absolute';
            clone.style.left = (rect.left + window.scrollX) + 'px';
            clone.style.top = (rect.top + window.scrollY) + 'px';
            clone.style.margin = '0'; // Strip D3 margins
            clone.style.zIndex = '2000';
            clone.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            document.body.appendChild(clone);
            
            // Hide original bubble
            clickedBubble.style('opacity', '0');
            
            // Fly clone to top left
            setTimeout(() => {
                clone.style.left = (40 + window.scrollX) + 'px';
                clone.style.top = (40 + window.scrollY) + 'px';
                clone.style.transform = 'scale(0.8)';
            }, 50);
            
            // 5. Populate and show Product Page
            const prodPage = document.getElementById('product-page');
            const prodGrid = document.getElementById('product-grid');
            
            const scrapedBrands = [
                "Leaclothingco", "Label society", "shopmauve.in", "Neelmii", "Qalaclothing", 
                "Summeraway", "sunday loveshop", "Moontara", "Fancypastelsindia", "Ms.maven", 
                "Orange at eight", "Essgee", "Ruiaan", "10.30pm", "shop&yours", "Imsoo", 
                "&thensome", "Shopdiris", "The pink elephant", "Kind inside", "Twelvthedit", 
                "The missy co", "Lovechoje", "Sunday molly", "Poppiclothing", "Nef’s finds",
                "House of mae", "Blomas", "Weaving cult", "Truffle", "Amoshi", 
                "Muvazo", "Ribble", "autumn summer", "Evie rose", "True west fashion", 
                "Ever pret", "Disobedience chennai", "Mnsh.design", "Pariparilife", 
                "Lovetobag", "Dhora india", "Mayabazaar jewellery", "No Na Me", 
                "Upkarna jewellery store", "A little extra", "Jewels mars", "I blame beads",
                "Beeglee", "Palay", "Rerunn", "Outcast", 
                "Nete", "Birdhouse", "House of Prisca", "Mazikien", "Qua", "Nishorama", "ButterBawd", "Everdion", "Mile collective", "Endless summer", "Outdated official", "The clothing factory", "Couch days", "Core cotton", "Kuuky", "Studio Picante", "Bluer", "Living in surma"
            ];

            if (scrapedBrands.includes(d.brand)) {
                // Fetch real data (which could be hundreds of products)
                fetch(`${d.brand}_products.json?v=2`)
                    .then(response => response.json())
                    .then(products => {
                        window.allBrandProducts = products;
                        window.currentProducts = products;
                        window.productsLoaded = 0;
                        prodGrid.innerHTML = ''; // Clear grid
                        
                        document.getElementById('category-filter').value = 'all';
                        document.getElementById('min-price').value = '';
                        document.getElementById('max-price').value = '';

                        loadMoreProducts(); // Load first 12
                        showProductPage();
                    });
            } else {
                // Generate beautiful dummy products for the brand
                const dummies = Array.from({length: 12}).map((_, i) => {
                    const hue1 = Math.floor(Math.random() * 360);
                    const hue2 = (hue1 + 40) % 360;
                    return {
                        isDummy: true,
                        title: `${d.brand} Edition 0${i + 1}`,
                        price: Math.floor(Math.random() * 1500) + 4500,
                        hue1: hue1,
                        hue2: hue2
                    };
                });

                window.allBrandProducts = dummies;
                window.currentProducts = dummies;
                window.productsLoaded = 0;
                prodGrid.innerHTML = '';
                
                document.getElementById('category-filter').value = 'all';
                document.getElementById('min-price').value = '';
                document.getElementById('max-price').value = '';

                loadMoreProducts();
                showProductPage();
            }

            function showProductPage() {
                prodPage.style.display = 'block';
                setTimeout(() => {
                    prodPage.classList.add('visible');
                }, 50);
            }

            // Store reference to selected node for back button
            window.selectedNode = clickedBubble;
        });

    // Back Button Handler
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'back-btn') {
            if (!window.selectedNode) return;
            
            const clickedBubble = window.selectedNode;
            
            // Hide product page immediately
            const prodPage = document.getElementById('product-page');
            prodPage.classList.remove('visible');
            
            // Clean up lazy load state
            window.allBrandProducts = [];
            window.currentProducts = [];
            window.productsLoaded = 0;
            const loadBtn = document.getElementById('load-more-btn');
            if (loadBtn) loadBtn.style.display = 'none';

            // --- REVERSE ANIMATION (Back to Honeycomb) ---
            clickedBubble.classed('selected', false);
            
            // Bring back sidebars
            

            // Scroll safely to top so the honeycomb is visible
            window.scrollTo({top: 0, behavior: 'smooth'});

            // Fly the fixed clone back to its original position
            const clone = document.getElementById('fixed-bubble');
            const rect = clickedBubble.node().getBoundingClientRect();
            if (clone) {
                clone.style.left = (rect.left + window.scrollX) + 'px';
                clone.style.top = (rect.top + window.scrollY > 0 ? rect.top + window.scrollY : 400) + 'px';
                clone.style.transform = 'scale(1)';
            }
            
            // Bring back falling bubbles
            bubbles.classed('falling', false);
            
            // Wait for bubbles to physically fly back up via CSS transition, then hand control back to D3
            setTimeout(() => {
                if (clone) clone.remove();
                clickedBubble.style('opacity', '1');
                prodPage.style.display = 'none';
                window.selectedNode = null;
                // Wake up physics engine
                window.simulation.alpha(0.6).restart();
            }, 600);
        }
    });

    // Animation Tick
    simulation.on('tick', () => {
        // Smoothly interpolate the radius of each node towards its target
        nodes.forEach(n => {
            n.radius += (n.targetRadius - n.radius) * 0.15; // 0.15 is the easing speed
        });
        
        // Update collision forces with the newly calculated radii
        simulation.force('collide').radius(d => d.radius + GAP);        
        
        nodes.forEach(d => {
            // Strictly constrain to container bounds to perfectly touch the edges
            d.x = Math.max(d.radius, Math.min(width - d.radius, d.x));
        });
        
        // Update the physical DOM elements to match the physics engine calculations
        bubbles
            .style('width', d => `${d.radius * 2}px`)
            .style('height', d => `${d.radius * 2}px`)
            .style('left', d => `${d.x - d.radius}px`)
            .style('top', d => `${d.y - d.radius}px`);
            
        // Scale text size dynamically based on radius
        bubbles.select('.brand-name')
            .style('font-size', d => {
                if (d.radius > BASE_RADIUS + 10) return '1.5rem';
                if (d.radius < BASE_RADIUS - 10) return '0.7rem';
                return '1rem';
            });
    });

    // Parallax background effect
    const watermark = document.querySelector('.watermark-bg');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if(watermark) {
            watermark.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
    });

    // Feedback Modal Logic
    const feedbackModal = document.getElementById('feedback-modal');
    const openFeedbackBtn = document.getElementById('open-feedback-btn');
    const closeFeedbackBtn = document.getElementById('close-feedback-btn');
    const submitFeedbackBtn = document.getElementById('submit-feedback-btn');

    if (openFeedbackBtn && feedbackModal && closeFeedbackBtn && submitFeedbackBtn) {
        openFeedbackBtn.addEventListener('click', () => {
            feedbackModal.style.display = 'flex';
        });

        closeFeedbackBtn.addEventListener('click', () => {
            feedbackModal.style.display = 'none';
        });

        // Close when clicking outside of modal content
        feedbackModal.addEventListener('click', (e) => {
            if (e.target === feedbackModal) {
                feedbackModal.style.display = 'none';
            }
        });

        submitFeedbackBtn.addEventListener('click', async () => {
            const q1 = document.querySelector('input[name="q1"]:checked');
            const q2 = document.querySelector('input[name="q2"]:checked');
            const q3 = document.querySelector('input[name="q3"]:checked');
            const text = document.getElementById('feedback-text').value;
            
            const q1Answer = q1 ? q1.value : "Not answered";
            const q2Answer = q2 ? q2.value : "Not answered";
            const q3Answer = q3 ? q3.value : "Not answered";

            if (text.trim() === '' && !q1 && !q2 && !q3) {
                alert("Please answer a question or enter some feedback before sending.");
                return;
            }
            
            const originalBtnText = submitFeedbackBtn.innerText;
            submitFeedbackBtn.innerText = "Sending...";
            submitFeedbackBtn.disabled = true;

            const data = {
                q1: q1Answer,
                q2: q2Answer,
                q3: q3Answer,
                feedback: text
            };

            try {
                const response = await fetch("https://formspree.io/f/mvzenyaz", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    alert("Thank you for your feedback!");
                    feedbackModal.style.display = 'none';
                    document.getElementById('feedback-text').value = '';
                    if(q1) q1.checked = false;
                    if(q2) q2.checked = false;
                    if(q3) q3.checked = false;
                } else {
                    alert("Oops! There was a problem submitting your feedback.");
                }
            } catch(error) {
                alert("Oops! There was a problem submitting your feedback.");
            } finally {
                submitFeedbackBtn.innerText = originalBtnText;
                submitFeedbackBtn.disabled = false;
            }
        });
    }
    });

function filterBrands() {
    var input, filter, div, a, i;
    input = document.getElementById("brandSearchInput");
    filter = input.value.toUpperCase();
    div = document.querySelector(".brands-dropdown .dropdown-content");
    a = div.getElementsByClassName("brand-item");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
