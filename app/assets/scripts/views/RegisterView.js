// public/js/views/RegisterView.js
import { registerUser } from '../auth.js';
import { navigateTo } from '../router.js';

const appRoot = document.getElementById('app-root');

export function RegisterView() {
    appRoot.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-half">
                        <h2 class="title is-2 has-text-centered mb-6">Register</h2>
                        <div class="box">
                            <form id="registerForm">
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" type="email" id="registerEmail" placeholder="Your Email" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Password</label>
                                    <div class="control">
                                        <input class="input" type="password" id="registerPassword" placeholder="Your Password" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Confirm Password</label>
                                    <div class="control">
                                        <input class="input" type="password" id="confirmPassword" placeholder="Confirm Password" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Role</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select id="registerRole" required>
                                                <option value="visitor">Visitor</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-grouped is-grouped-centered">
                                    <div class="control">
                                        <button class="button" type="submit">Register</button>
                                    </div>
                                </div>
                                <p class="has-text-centered mt-4">Already have an account? <a href="#login">Log in here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = document.getElementById('registerRole').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Validate Password field
        if (passwordInput.value.trim() === '') {
            showError(passwordError, 'Password is required.');
            isValid = false;
        } else if (passwordInput.value.length < 6) { 
            showError(passwordError, 'Password must be at least 6 characters long.');
            isValid = false;
        }

        try {
            await registerUser(email, password, role);
            alert('Registration successful! You are now logged in.');
            navigateTo('#dashboard'); // Redirect to dashboard on success
        } catch (error) {
            alert(error.message || 'Registration failed.');
            console.error('Registration error:', error);
        }
    }
    );
}