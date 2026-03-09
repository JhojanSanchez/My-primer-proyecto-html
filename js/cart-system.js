/**
 * Unified Cart System
 * Manages all shopping cart logic globally.
 */

const CartSystem = {
    items: [],

    init() {
        this.loadFromStorage();
        this.updateGlobalCounters();
        this.bindEvents();
    },

    loadFromStorage() {
        const stored = localStorage.getItem('productos-en-carrito');
        this.items = stored ? JSON.parse(stored) : [];
    },

    saveToStorage() {
        localStorage.setItem('productos-en-carrito', JSON.stringify(this.items));
        this.updateGlobalCounters();
    },

    addToCart(product, size) {
        // Create a unique key for the item in the cart: product id + selected size
        const itemIdentifier = `${product.id}-${size}`;

        const existing = this.items.find(item => `${item.id}-${item.size}` === itemIdentifier);
        if (existing) {
            existing.cantidad++;
        } else {
            this.items.push({ ...product, size: size, cantidad: 1 });
        }
        this.saveToStorage();
        this.showFeedback(product, size);
    },

    updateGlobalCounters() {
        const total = this.items.reduce((acc, item) => acc + item.cantidad, 0);
        const counters = document.querySelectorAll('#numerito, .cart-count');
        counters.forEach(counter => {
            counter.textContent = total;
            counter.style.display = total > 0 ? 'flex' : 'none';
        });
    },

    showFeedback(product, size) {
        console.log(`Added ${product.titulo} (Size: ${size}) to cart`);
        // Optional: show a small toast notification to the user
    },

    bindEvents() {
        // Universal listener for elements with data-product-id
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-product-id]');
            if (btn && !btn.classList.contains('select-talla')) {
                e.preventDefault();
                const productId = btn.getAttribute('data-product-id');

                // Find size selector related to this product
                // It can be in the same container or identified by id/data
                let size = "Única";
                const container = btn.closest('.product-item, .producto, .product-info, .producto-detalles');
                if (container) {
                    const select = container.querySelector('.select-talla');
                    if (select) {
                        size = select.value;
                    }
                }

                if (typeof productos !== 'undefined') {
                    const product = productos.find(p => p.id === productId);
                    if (product) {
                        this.addToCart(product, size);
                    }
                }
            }
        });
    }
};

CartSystem.init();
window.CartSystem = CartSystem; // Global access
