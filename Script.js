// ==================== GLOBAL VARIABLES ====================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ==================== PRODUCT DATABASE ====================
const productsDatabase = [
    // Men's Clothing
    { id: 1, name: 'Premium Cotton T-Shirt', price: 29.99, discount: 20, rating: 4.8, category: 'men', image: 'https://source.unsplash.com/300x350/?mens,tshirt,1', description: 'Comfortable and stylish cotton t-shirt' },
    { id: 2, name: 'Slim Fit Jeans', price: 59.99, discount: 15, rating: 4.6, category: 'men', image: 'https://source.unsplash.com/300x350/?mens,jeans,1', description: 'Perfect fit slim jeans' },
    { id: 3, name: 'Casual Shirt', price: 49.99, discount: 10, rating: 4.7, category: 'men', image: 'https://source.unsplash.com/300x350/?mens,shirt,1', description: 'Casual shirt for everyday wear' },
    { id: 4, name: 'Sport Jacket', price: 89.99, discount: 25, rating: 4.9, category: 'men', image: 'https://source.unsplash.com/300x350/?mens,jacket,1', description: 'Premium sport jacket' },
    { id: 5, name: 'Polo Shirt', price: 34.99, discount: 18, rating: 4.5, category: 'men', image: 'https://source.unsplash.com/300x350/?mens,polo,1', description: 'Classic polo shirt' },
    { id: 6, name: 'Formal Trousers', price: 64.99, discount: 12, rating: 4.8, category: 'men', image: 'https://source.unsplash.com/300x350/?mens,pants,1', description: 'Formal trousers for office' },
    
    // Women's Clothing
    { id: 7, name: 'Summer Dress', price: 54.99, discount: 30, rating: 4.9, category: 'women', image: 'https://source.unsplash.com/300x350/?womens,dress,1', description: 'Beautiful summer dress' },
    { id: 8, name: 'Denim Jacket', price: 69.99, discount: 20, rating: 4.7, category: 'women', image: 'https://source.unsplash.com/300x350/?womens,jacket,1', description: 'Classic denim jacket' },
    { id: 9, name: 'Women Jeans', price: 52.99, discount: 18, rating: 4.8, category: 'women', image: 'https://source.unsplash.com/300x350/?womens,jeans,1', description: 'Trendy women jeans' },
    { id: 10, name: 'Casual Top', price: 32.99, discount: 15, rating: 4.6, category: 'women', image: 'https://source.unsplash.com/300x350/?womens,top,1', description: 'Casual comfortable top' },
    { id: 11, name: 'Evening Gown', price: 129.99, discount: 25, rating: 5.0, category: 'women', image: 'https://source.unsplash.com/300x350/?womens,gown,1', description: 'Elegant evening gown' },
    { id: 12, name: 'Blazer', price: 79.99, discount: 22, rating: 4.8, category: 'women', image: 'https://source.unsplash.com/300x350/?womens,blazer,1', description: 'Professional blazer' },
    
    // Kids' Clothing
    { id: 13, name: 'Kids T-Shirt', price: 19.99, discount: 15, rating: 4.5, category: 'kids', image: 'https://source.unsplash.com/300x350/?kids,tshirt,1', description: 'Colorful kids t-shirt' },
    { id: 14, name: 'Kids Shorts', price: 24.99, discount: 20, rating: 4.6, category: 'kids', image: 'https://source.unsplash.com/300x350/?kids,shorts,1', description: 'Comfortable kids shorts' },
    { id: 15, name: 'Kids Dress', price: 34.99, discount: 18, rating: 4.7, category: 'kids', image: 'https://source.unsplash.com/300x350/?kids,dress,1', description: 'Cute kids dress' },
    { id: 16, name: 'Kids Hoodie', price: 44.99, discount: 25, rating: 4.8, category: 'kids', image: 'https://source.unsplash.com/300x350/?kids,hoodie,1', description: 'Warm kids hoodie' },
    
    // Accessories
    { id: 17, name: 'Sports Shoes', price: 84.99, discount: 20, rating: 4.9, category: 'accessories', image: 'https://source.unsplash.com/300x350/?shoes,sports,1', description: 'Premium sports shoes' },
    { id: 18, name: 'Casual Sneakers', price: 69.99, discount: 15, rating: 4.7, category: 'accessories', image: 'https://source.unsplash.com/300x350/?sneakers,1', description: 'Casual sneakers' },
    { id: 19, name: 'Leather Belt', price: 29.99, discount: 10, rating: 4.6, category: 'accessories', image: 'https://source.unsplash.com/300x350/?belt,leather,1', description: 'Quality leather belt' },
    { id: 20, name: 'Sunglasses', price: 44.99, discount: 12, rating: 4.8, category: 'accessories', image: 'https://source.unsplash.com/300x350/?sunglasses,1', description: 'Stylish sunglasses' },
];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateWishlistCount();
    loadBestSellers();
    setupEventListeners();
});

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
}

// ==================== CART FUNCTIONS ====================
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, quantity = 1) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    saveCart();
    showNotification('Added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        saveCart();
    }
}

function clearCart() {
    cart = [];
    saveCart();
}

// ==================== WISHLIST FUNCTIONS ====================
function updateWishlistCount() {
    const count = wishlist.length;
    const wishlistCountElement = document.getElementById('wishlist-count');
    if (wishlistCountElement) {
        wishlistCountElement.textContent = count;
    }
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function addToWishlist(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;

    if (!wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        saveWishlist();
        showNotification('Added to wishlist!', 'success');
    } else {
        removeFromWishlist(productId);
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    showNotification('Removed from wishlist!', 'info');
}

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

// ==================== PRODUCT DISPLAY ====================
function loadBestSellers() {
    const container = document.getElementById('best-sellers-grid');
    if (!container) return;

    // Show top 8 best-selling products
    const bestSellers = productsDatabase.slice(0, 8);
    container.innerHTML = bestSellers.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const discountedPrice = (product.price * (100 - product.discount) / 100).toFixed(2);
    const inWishlist = isInWishlist(product.id);

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="addToWishlist(${product.id})" title="Add to wishlist">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <i class="fas fa-star"></i> ${product.rating} (${Math.floor(Math.random() * 500) + 100} reviews)
                </div>
                <div class="product-price">
                    <span class="current-price">$${discountedPrice}</span>
                    <span class="original-price">$${product.price.toFixed(2)}</span>
                    <span class="discount-badge">${product.discount}% OFF</span>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                    <button class="btn-buy-now" onclick="buyNow(${product.id})">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

function loadProducts(category = '') {
    const container = document.getElementById('product-grid');
    if (!container) return;

    let filtered = productsDatabase;
    if (category) {
        filtered = productsDatabase.filter(p => p.category === category);
    }

    container.innerHTML = filtered.map(product => createProductCard(product)).join('');
}

function filterAndSortProducts(category, sortBy) {
    let filtered = productsDatabase;

    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    switch (sortBy) {
        case 'price-low':
            filtered.sort((a, b) => (a.price * (100 - a.discount) / 100) - (b.price * (100 - b.discount) / 100));
            break;
        case 'price-high':
            filtered.sort((a, b) => (b.price * (100 - b.discount) / 100) - (a.price * (100 - a.discount) / 100));
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filtered.reverse();
            break;
    }

    return filtered;
}

// ==================== CART PAGE ==================== 
function loadCartPage() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <p style="color: #999; font-size: 1.1rem;">Your cart is empty</p>
                <a href="products.html" class="btn-primary" style="margin-top: 1rem;">Continue Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item" style="display: flex; gap: 1rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;">
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h3 style="margin: 0; margin-bottom: 0.5rem;">${item.name}</h3>
                <p style="color: #666; margin: 0;">SKU: #${item.id}</p>
                <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                    <span style="font-weight: 600; color: #667eea;">$${(item.price * (100 - item.discount) / 100).toFixed(2)}</span>
                    <input type="number" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${item.id}, this.value)" style="width: 60px; padding: 0.25rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                    <button onclick="removeFromCart(${item.id})" class="btn-secondary" style="padding: 0.5rem 1rem;">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * (100 - item.discount) / 100 * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const summaryContainer = document.getElementById('cart-summary');
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 1rem 0;">Order Summary</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                    <span>Shipping:</span>
                    <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 2px solid #e2e8f0;">
                    <span>Tax (8%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.2rem; margin-bottom: 1.5rem; color: #667eea;">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <button onclick="checkout()" class="btn-primary" style="width: 100%; padding: 1rem; display: block;">Proceed to Checkout</button>
                <a href="products.html" class="btn-secondary" style="width: 100%; padding: 1rem; margin-top: 0.5rem; text-decoration: none; display: block; text-align: center; box-sizing: border-box;">Continue Shopping</a>
            </div>
        `;
    }
}

// ==================== WISHLIST PAGE ====================
function loadWishlistPage() {
    const container = document.getElementById('wishlist-items');
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-heart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <p style="color: #999; font-size: 1.1rem;">Your wishlist is empty</p>
                <a href="products.html" class="btn-primary" style="margin-top: 1rem;">Start Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = wishlist.map(product => createProductCard(product)).join('');
}

// ==================== SEARCH FUNCTIONALITY ====================
function handleSearch() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    if (!searchQuery) return;

    const results = productsDatabase.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery)
    );

    // Redirect to products page with search results
    localStorage.setItem('searchResults', JSON.stringify(results));
    window.location.href = 'products.html?search=' + encodeURIComponent(searchQuery);
}

// ==================== CHECKOUT ====================
function buyNow(productId) {
    addToCart(productId);
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 500);
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    showNotification('Processing your order...', 'info');
    setTimeout(() => {
        showNotification('Order placed successfully! Thank you for shopping with us.', 'success');
        cart = [];
        saveCart();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;

    const colors = {
        success: '#48bb78',
        error: '#f56565',
        info: '#667eea',
        warning: '#ed8936'
    };

    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== NEWSLETTER ====================
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    e.target.reset();
    showNotification('Thanks for subscribing! Check your email.', 'success');
}

// ==================== UTILITIES ====================
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// Load products on products page
if (document.getElementById('product-grid')) {
    const category = getQueryParam('category');
    loadProducts(category);
}

// Load cart on cart page
if (document.getElementById('cart-items')) {
    loadCartPage();
}

// Load wishlist on wishlist page
if (document.getElementById('wishlist-items')) {
    loadWishlistPage();
}

// ==================== RESPONSIVE MENU ====================
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
}
