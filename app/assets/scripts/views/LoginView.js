// public/js/views/LoginView.js
import { loginUser } from '../auth.js';
import { navigateTo } from '../router.js';

const appRoot = document.getElementById('app-root');

export function LoginView() {
    appRoot.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-half">
                        <h2 class="title is-2 has-text-centered mb-6">Login</h2>
                        <div class="box">
                            <form id="loginForm">
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" type="email" id="loginEmail" placeholder="Your Email" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Password</label>
                                    <div class="control">
                                        <input class="input" type="password" id="loginPassword" placeholder="Your Password" required>
                                    </div>
                                </div>
                                <div class="field is-grouped is-grouped-centered">
                                    <div class="control">
                                        <button class="button" type="submit">Log In</button>
                                    </div>
                                </div>
                                <p class="has-text-centered mt-4">Don't have an account? <a href="#register">Register here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            await loginUser(email, password);
            alert('Login successful!');
            navigateTo('#dashboard'); // Redirect to dashboard on success
        } catch (error) {
            alert(error.message || 'Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    });
}