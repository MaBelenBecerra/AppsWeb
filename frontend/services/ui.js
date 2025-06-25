import { $ } from '../utils/dom.js';

const openModal = (modal) => modal.classList.add('is-visible');
const closeModal = (modal) => modal.classList.remove('is-visible');

export const initUI = () => {

    const hamburgerButton = $('#hamburger-menu');
    const mobileNav = $('#mobile-nav');
    if (hamburgerButton && mobileNav) {
        hamburgerButton.addEventListener('click', () => {
            mobileNav.classList.toggle('is-active');
        });
    }


    const loginLink = $('a[href="#login"]');
    const loginModal = $('#login-modal');
    const loginModalClose = $('#login-modal-close');
    const registerModal = $('#register-modal');
    const registerModalClose = $('#register-modal-close');
    const showRegisterLink = $('#show-register');
    const showLoginLink = $('#show-login');

    if (loginLink && loginModal) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal);
        });
    }
    if (loginModalClose) {
        loginModalClose.addEventListener('click', () => closeModal(loginModal));
    }
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) closeModal(loginModal);
        });
    }

    if (registerModalClose) {
        registerModalClose.addEventListener('click', () => closeModal(registerModal));
    }
    if (registerModal) {
        registerModal.addEventListener('click', (e) => {
            if (e.target === registerModal) closeModal(registerModal);
        });
    }

    if (showRegisterLink && showLoginLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(registerModal);
        });
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(registerModal);
            openModal(loginModal);
        });
    }


    const cartIcon = $('#cart-icon');
    const cartPanel = $('#cart-panel');
    const cartPanelClose = $('#cart-panel-close');
    if (cartIcon && cartPanel && cartPanelClose) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartPanel.classList.toggle('is-active');
        });
        cartPanelClose.addEventListener('click', () => {
            cartPanel.classList.remove('is-active');
        });
    }
};
