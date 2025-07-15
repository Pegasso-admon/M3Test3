// public/js/router.js
import { HomeView } from './views/HomeView.js';
import { LoginView } from './views/LoginView.js';
import { RegisterView } from './views/RegisterView.js';
import { CreateEventView } from './views/CreateEventView.js';
import { EditEventView } from './views/EditEventView.js';
import { NotFoundView } from './views/NotFoundView.js';
import { authGuard, adminGuard, publicOnlyGuard } from './guards.js';
import { getCurrentUser } from './auth.js';

const appRoot = document.getElementById('app-root');

const routes = {
    '#home': {
        view: HomeView,
        guards: []
    },
    '#dashboard': {
        view: HomeView, // Home view doubles as dashboard for authenticated users
        guards: [authGuard]
    },
    '#login': {
        view: LoginView,
        guards: [publicOnlyGuard],
        redirectOnFail: '#dashboard' // If publicOnlyGuard fails, redirect to dashboard
    },
    '#register': {
        view: RegisterView,
        guards: [publicOnlyGuard],
        redirectOnFail: '#dashboard'
    },
    '#dashboard/events/create': {
        view: CreateEventView,
        guards: [adminGuard]
    },
    '#dashboard/events/edit': {
        view: EditEventView,
        guards: [adminGuard]
    },
    '#/not-found': {
        view: NotFoundView,
        guards: []
    },
    '': {
        view: HomeView, // Default route when hash is empty
        guards: []
    }
};

export function setupRouter() {
    // No specific setup needed here for event listeners,
    // as main.js handles the hashchange event
}

export function handleRouteChange() {
    const path = window.location.hash || ''; // Get hash or empty string if none

    let currentRoute = routes[path];
    let routeParams = {};

    // Handle dynamic routes like #dashboard/events/edit?id=123
    if (!currentRoute) {
        const pathParts = path.split('?');
        const basePath = pathParts[0];

        // Check for base paths like #dashboard/events/edit
        for (const key in routes) {
            if (key.includes(':') && path.startsWith(key.split(':')[0])) {
                // This is a simplified dynamic route handler.
                // A more robust solution would involve regex for parameters.
                currentRoute = routes[key];
                // Extract params (for now, assume simple 'id' parameter)
                if (pathParts.length > 1) {
                    const paramsString = pathParts[1];
                    const paramsArray = paramsString.split('&');
                    paramsArray.forEach(param => {
                        const [key, value] = param.split('=');
                        routeParams[key] = value;
                    });
                }
                break;
            }
        }
    }


    if (!currentRoute) {
        currentRoute = routes['#/not-found']; // Fallback to 404
    }

    // Apply guards
    for (let guard of currentRoute.guards) {
        if (!guard()) {
            // If a guard fails, redirect
            const redirectPath = currentRoute.redirectOnFail || '#/not-found';
            window.location.hash = redirectPath;
            return;
        }
    }

    // Render the view
    // Pass routeParams to the view function if needed (e.g., for EditEventView)
    currentRoute.view(routeParams);
}

// Function to navigate programmatically
export function navigateTo(path) {
    window.location.hash = path;
}