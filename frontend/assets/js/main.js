document.addEventListener('DOMContentLoaded', () => {

    const hamburgerButton = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburgerButton && mobileNav) {
        hamburgerButton.addEventListener('click', () => {
            mobileNav.classList.toggle('is-active');
        });
    }


    const loginLink = document.querySelector('a[href="#login"]');
    const loginModal = document.getElementById('login-modal');
    const loginModalClose = document.getElementById('login-modal-close');

    const openModal = (modal) => modal.classList.add('is-visible');
    const closeModal = (modal) => modal.classList.remove('is-visible');

    if (loginLink && loginModal && loginModalClose) {

        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal);
        });


        loginModalClose.addEventListener('click', () => {
            closeModal(loginModal);
        });


        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeModal(loginModal);
            }
        });
    }


    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartPanel = document.getElementById('cart-panel');
    const cartPanelClose = document.getElementById('cart-panel-close');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartBadge = document.getElementById('cart-badge');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const addToCartButtons = document.querySelectorAll('.js-add-to-cart');

    const updateCart = () => {
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

        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
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

    cartItemsContainer.addEventListener('click', handleCartActions);

    if (cartIcon && cartPanel && cartPanelClose) {
        cartIcon.addEventListener('click', () => {
            cartPanel.classList.toggle('is-active');
        });

        cartPanelClose.addEventListener('click', () => {
            cartPanel.classList.remove('is-active');
        });
    }


});
