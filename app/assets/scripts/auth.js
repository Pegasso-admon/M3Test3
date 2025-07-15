// public/js/auth.js
import { api } from './api.js';
import { handleRouteChange } from './router.js';

const AUTH_STORAGE_KEY = 'currentUser';

export function loginUser(email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await api.getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // For simplicity, we store the whole user object (without password)
                const userSession = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    isAuthenticated: true
                };
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userSession));
                console.log('User logged in:', userSession);
                setupAuthUI(); // Update UI after login
                resolve(userSession);
            } else {
                reject(new Error('Invalid email or password.'));
            }
        } catch (error) {
            console.error('Login failed:', error);
            reject(new Error('Login failed. Please try again later.'));
        }
    });
}

export function registerUser(email, password, role) {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await api.getUsers();
            const existingUser = users.find(u => u.email === email);

            if (existingUser) {
                return reject(new Error('User with this email already exists.'));
            }

            const newUser = { email, password, role };
            const registeredUser = await api.registerUser(newUser);

            // Automatically log in the new user after registration
            const userSession = {
                id: registeredUser.id,
                email: registeredUser.email,
                role: registeredUser.role,
                isAuthenticated: true
            };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userSession));
            console.log('User registered and logged in:', userSession);
            setupAuthUI(); // Update UI after registration
            resolve(userSession);
        } catch (error) {
            console.error('Registration failed:', error);
            reject(new Error('Registration failed. Please try again later.'));
        }
    });
}

export function logoutUser() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    console.log('User logged out.');
    setupAuthUI(); // Update UI after logout
    handleRouteChange(); // Reroute after logout
}

export function isAuthenticated() {
    return localStorage.getItem(AUTH_STORAGE_KEY) !== null;
}

export function getCurrentUser() {
    const user = localStorage.getItem(AUTH_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
}

export function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Function to update the visibility of nav links and buttons based on auth status
export function setupAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const logoutBtn = document.getElementById('logout-btn');
    const dashboardNavLink = document.getElementById('dashboard-nav-link');
    const createEventNavLink = document.getElementById('create-event-nav-link');

    if (isAuthenticated()) {
        if (authButtons) authButtons.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (dashboardNavLink) dashboardNavLink.style.display = 'block';
        if (isAdmin()) {
            if (createEventNavLink) createEventNavLink.style.display = 'block';
        } else {
            if (createEventNavLink) createEventNavLink.style.display = 'none';
        }
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (dashboardNavLink) dashboardNavLink.style.display = 'none';
        if (createEventNavLink) createEventNavLink.style.display = 'none';
    }

    if (logoutBtn) {
        logoutBtn.onclick = () => logoutUser();
    }
}