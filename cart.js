// headless cart system

const STOREFRONT_ACCESS_TOKEN = 'cc1d9bfaf07185da0670a6ca6f0fa444';
let SHOPIFY_DOMAIN = 'rarely-seen-2.myshopify.com'; 

// State
let cart = JSON.parse(localStorage.getItem('rs_cart')) || [];

function saveCart() {
    localStorage.setItem('rs_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Ensure the UI exists
function initCartUI() {
    if (document.getElementById('cart-sidebar')) return;

    const cartHTML = `
        <div id="cart-sidebar" class="cart-sidebar">
            <div class="cart-header">
                <h2>Your Cart</h2>
                <button class="close-cart" onclick="toggleCart()">✕</button>
            </div>
            <div class="cart-items" id="cart-items-container">
                <!-- Items go here -->
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span id="cart-total-price">₹0.00</span>
                </div>
                <button class="checkout-btn" onclick="checkout()">Checkout</button>
            </div>
        </div>
        <div id="cart-overlay" class="cart-overlay" onclick="toggleCart()"></div>
        
        <!-- Cart Icon for Nav -->
        <div id="cart-icon-container" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
            <button onclick="toggleCart()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-main);">
                🛒 <span id="cart-badge" style="background: #e30a5c; color: white; border-radius: 50%; padding: 2px 6px; font-size: 0.8rem; vertical-align: top;">0</span>
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', cartHTML);
    renderCart();
    updateCartCount();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

window.addToCart = function(title, price, image, variantId = null) {
    // If no variantId is provided, we can't properly checkout via Shopify. 
    // We will use a dummy ID just to demonstrate the UI if needed, but it will fail at Shopify's API layer.
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: title,
            price: parseFloat(price) || 0,
            image: image,
            quantity: 1,
            variantId: variantId || 'gid://shopify/ProductVariant/DUMMY_ID' // Requires real Shopify Global ID
        });
    }
    saveCart();
    
    // Open the cart automatically when adding
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar.classList.contains('open')) {
        toggleCart();
    }
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
};

window.updateQuantity = function(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            saveCart();
        }
    }
};

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge');
    if(badge) badge.innerText = count;
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-price');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; margin-top: 2rem; opacity: 0.7;">Your cart is empty.</p>';
        totalEl.innerText = '₹0.00';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, i) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity(${i}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${i}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${i})">🗑</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    totalEl.innerText = `₹${total.toFixed(2)}`;
}

window.checkout = async function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const hasDummyIds = cart.some(item => item.variantId.includes('DUMMY'));
    if (hasDummyIds) {
        console.warn("Warning: Some items in your cart do not have valid Shopify Variant IDs. The Storefront API requires exact IDs mapped to your Shopify backend to create a checkout session. The API call will likely return an error unless valid IDs are provided.");
    }

    const btn = document.querySelector('.checkout-btn');
    btn.innerText = "Processing...";
    btn.disabled = true;

    // GraphQL Mutation for Shopify Storefront Cart API
    const query = `
        mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
                cart {
                    id
                    checkoutUrl
                }
                userErrors {
                    code
                    field
                    message
                }
            }
        }
    `;

    const lines = cart.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
    }));

    const variables = {
        input: {
            lines: lines
        }
    };

    try {
        const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN
            },
            body: JSON.stringify({ query, variables })
        });

        const json = await response.json();

        if (json.errors) {
            console.error(json.errors);
            alert("Shopify GraphQL Error: " + json.errors[0].message);
            return;
        }

        const cartData = json.data.cartCreate;
        
        if (cartData.userErrors.length > 0) {
            console.error(cartData.userErrors);
            alert("Checkout Error: " + cartData.userErrors[0].message);
            return;
        }

        // Redirect to Shopify Checkout!
        const checkoutUrl = cartData.cart.checkoutUrl;
        window.location.href = checkoutUrl;

    } catch (error) {
        console.error("Failed to create checkout:", error);
        alert("Failed to connect to Shopify. Check console for details.");
    } finally {
        btn.innerText = "Checkout";
        btn.disabled = false;
    }
};

document.addEventListener('DOMContentLoaded', initCartUI);
