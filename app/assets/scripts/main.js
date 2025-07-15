// public/js/main.js
import { setupRouter, handleRouteChange } from './router.js';
import { setupAuthUI } from './auth.js';
import { setupThemeToggle } from './components/Utils.js'; // A new utility component for common UI functions
import { setupSubscriptionForm } from './views/HomeView.js'; // Import the subscription form setup

document.addEventListener('DOMContentLoaded', () => {
    // Make elements visible after JS loads
    document.body.classList.remove('js-disabled');

    // Setup Theme Toggle
    setupThemeToggle();

    // Setup Auth UI (login/logout buttons, nav links)
    setupAuthUI();

    // Initialize the router
    setupRouter();

    // Handle initial route load
    handleRouteChange();

    // Listen for hash changes to re-route
    window.addEventListener('hashchange', handleRouteChange);

    // Setup Subscription Form (from HomeView as it's part of the static footer)
    setupSubscriptionForm();

    // Navbar burger functionality
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});