// public/js/views/NotFoundView.js
const appRoot = document.getElementById('app-root');

export function NotFoundView() {
    appRoot.innerHTML = `
        <section class="hero is-fullheight-with-navbar has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-1">404</h1>
                    <p class="subtitle is-3">Page Not Found or Unauthorized Access</p>
                    <p class="mb-5">The page you are looking for does not exist, or you do not have permission to view it.</p>
                    <a href="#home" class="button is-primary is-large">Go to Home</a>
                </div>
            </div>
        </section>
    `;
}