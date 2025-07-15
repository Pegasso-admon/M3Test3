// public/js/guards.js
import { isAuthenticated, isAdmin } from './auth.js';

export function authGuard() {
    if (!isAuthenticated()) {
        console.warn('AuthGuard: Not authenticated. Redirecting to #/not-found');
        return false;
    }
    return true;
}

export function adminGuard() {
    if (!isAuthenticated()) {
        console.warn('AdminGuard: Not authenticated. Redirecting to #/not-found');
        return false;
    }
    if (!isAdmin()) {
        console.warn('AdminGuard: Not an admin. Redirecting to #/not-found');
        return false;
    }
    return true;
}

export function publicOnlyGuard() {
    if (isAuthenticated()) {
        console.warn('PublicOnlyGuard: Authenticated. Redirecting to #dashboard');
        return false; // Indicate that redirection is needed
    }
    return true;
}