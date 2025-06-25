import { initCart } from './services/cart.js';
import { initUI } from './services/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initCart();
});
