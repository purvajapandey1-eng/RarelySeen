import re

with open('app.js', 'r') as f:
    js = f.read()

# Remove sidebars hiding/showing logic
js = re.sub(r'const sbLeft = document\.getElementById\(\'sidebar-left\'\);\n\s*const sbRight = document\.getElementById\(\'sidebar-right\'\);\n\s*if\s*\(sbLeft\)\s*sbLeft\.style\.opacity\s*=\s*\'0\';\n\s*if\s*\(sbRight\)\s*sbRight\.style\.opacity\s*=\s*\'0\';', '', js)
js = re.sub(r'const sbLeft = document\.getElementById\(\'sidebar-left\'\);\n\s*const sbRight = document\.getElementById\(\'sidebar-right\'\);\n\s*if\s*\(sbLeft\)\s*sbLeft\.style\.opacity\s*=\s*\'1\';\n\s*if\s*\(sbRight\)\s*sbRight\.style\.opacity\s*=\s*\'1\';', '', js)

# Avoid calling initSidebars()
js = re.sub(r'initSidebars\(\);', '// initSidebars();', js)

new_logic = """
    // --- Rotate Brand Spotlight Logic ---
    function startBrandSpotlightRotation() {
        const updateSpotlight = () => {
            if (!window.logosData || window.logosData.length === 0) return;
            const randomBrand = window.logosData[Math.floor(Math.random() * window.logosData.length)];
            
            fetch(`${randomBrand.name}_products.json`)
                .then(res => res.json())
                .then(products => {
                    const imgEl = document.querySelector('.featured-brand-image img');
                    const nameEl = document.querySelector('.featured-brand-name');
                    const descEl = document.querySelector('.featured-brand-desc');
                    
                    if (imgEl && nameEl && descEl && products.length > 0) {
                        // Simple fade transition
                        imgEl.style.opacity = '0';
                        nameEl.style.opacity = '0';
                        descEl.style.opacity = '0';
                        
                        setTimeout(() => {
                            imgEl.src = products[0].image || '';
                            nameEl.textContent = randomBrand.name;
                            descEl.textContent = `Discover the elegant and timeless collection from our featured homegrown brand of the week. Handcrafted with love and perfect for your summer wardrobe.`;
                            
                            imgEl.style.transition = 'opacity 0.5s ease';
                            nameEl.style.transition = 'opacity 0.5s ease';
                            descEl.style.transition = 'opacity 0.5s ease';
                            
                            imgEl.style.opacity = '1';
                            nameEl.style.opacity = '1';
                            descEl.style.opacity = '1';
                        }, 500);
                    }
                })
                .catch(err => console.error('Error fetching spotlight brand:', err));
        };
        
        // Initial call
        updateSpotlight();
        // Rotate every 30 seconds
        setInterval(updateSpotlight, 30000);
    }
    
    // Call it when the DOM is ready (we can put this right after // initSidebars())
    startBrandSpotlightRotation();
"""

js = js.replace('// initSidebars();', '// initSidebars();\n' + new_logic)

with open('app.js', 'w') as f:
    f.write(js)
