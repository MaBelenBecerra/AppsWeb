import { $, $$ } from '../utils/dom.js';

let cart = [];
const cartItemsContainer = $('#cart-items-container');
const cartBadge = $('#cart-badge');
const cartSubtotal = $('#cart-subtotal');
const addToCartButtons = $$('.js-add-to-cart');

const updateCart = () => {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-panel__empty-message">Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="https://source.unsplash.com/random/80x80/?sushi,${item.id}" alt="${item.name}" class="cart-item__image">
                <div class="cart-item__details">
                    <p class="cart-item__name">${item.name}</p>
                    <div class="cart-item__quantity-controls">
                        <button class="cart-item__quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="cart-item__quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
                <p class="cart-item__price">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="cart-item__remove-btn" data-id="${item.id}" data-action="remove">🗑️</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
            totalItems += item.quantity;
        });
    }

    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
};

const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
};

const handleCartActions = (e) => {
    const target = e.target;
    const action = target.dataset.action;
    const id = target.dataset.id;

    if (!action || !id) return;

    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex === -1) return;

    switch (action) {
        case 'increase':
            cart[itemIndex].quantity++;
            break;
        case 'decrease':
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
            break;
        case 'remove':
            cart.splice(itemIndex, 1);
            break;
    }
    updateCart();
};

export const initCart = () => {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseFloat(button.dataset.price)
            };
            addToCart(product);
        });
    });

    if(cartItemsContainer) {
        cartItemsContainer.addEventListener('click', handleCartActions);
    }
    
        updateCart();
};
