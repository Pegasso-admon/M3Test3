// public/js/views/HomeView.js
import { api } from '../api.js';
import { isAuthenticated, isAdmin } from '../auth.js';
import { createEventCard } from '../components/EventCard.js';
import { navigateTo } from '../router.js';

const appRoot = document.getElementById('app-root');

export async function HomeView() {
    const userIsAdmin = isAdmin();

    appRoot.innerHTML = `
        <section class="hero is-medium has-background-dark-green has-text-centered is-relative">
            <div class="hero-body">
                <p class="title is-1 has-text-white">Innovate, Connect, Inspire</p>
                <p class="subtitle is-3 has-text-white is-italic">Your gateway to the future of innovation events</p>
                ${!isAuthenticated() ? `<a href="#register" class="button is-large">Join Us</a>` : ''}
            </div>
        </section>

        <section id="events-section" class="section">
            <div class="container">
                <h2 class="title is-2 has-text-centered mb-6">${userIsAdmin ? 'Manage Events' : 'Upcoming Events'}</h2>
                ${userIsAdmin ? `
                    <div class="has-text-centered mb-5">
                        <a href="#dashboard/events/create" class="button is-success is-large">Create New Event</a>
                    </div>
                ` : ''}
                <div id="events-container" class="columns is-multiline is-centered">
                    </div>
            </div>
        </section>
    `;

    await displayEvents(userIsAdmin);
    setupContactForm();
    // setupSubscriptionForm is called in main.js as it's in the static footer
}

async function displayEvents(isAdminView) {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    try {
        const events = await api.getEvents();
        eventsContainer.innerHTML = ''; // Clear previous content

        const eventsToDisplay = isAdminView ? events : events.filter(event => event.status === 'active');

        if (eventsToDisplay.length === 0) {
            eventsContainer.innerHTML = `<div class="column is-full has-text-centered"><p>${isAdminView ? 'No events to manage.' : 'No active events found at the moment.'}</p></div>`;
            return;
        }

        eventsToDisplay.forEach(event => {
            const eventCard = createEventCard(event, isAdminView);
            eventsContainer.appendChild(eventCard);
        });

        if (isAdminView) {
            setupAdminEventActions();
        }

    } catch (error) {
        console.error(`Error fetching or displaying events: ${error}`);
        eventsContainer.innerHTML = '<div class="column is-full has-text-centered"><p class="has-text-danger">Error loading events.</p></div>';
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const content = document.getElementById('contactContent').value;
            const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

            try {
                await api.sendContactMessage({ name, date, content, email });
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                alert('Failed to send message.');
                console.error('Error sending contact message:', error);
            }
        });
    }
}

export function setupSubscriptionForm() {
    const subscribeButton = document.getElementById('subscribeButton');
    const subscribedEmailInput = document.getElementById('subscribedEmail');

    if (subscribeButton && subscribedEmailInput) {
        subscribeButton.addEventListener('click', async () => {
            const email = subscribedEmailInput.value;
            if (email) {
                try {
                    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
                    await api.subscribeEmail({ email, date });
                    alert('Subscription successful!');
                    subscribedEmailInput.value = ''; // Clear input
                } catch (error) {
                    alert('Subscription failed. Please try again.');
                    console.error('Error subscribing:', error);
                }
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

function setupAdminEventActions() {
    document.querySelectorAll('.edit-event-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const eventId = e.target.dataset.id;
            navigateTo(`#dashboard/events/edit?id=${eventId}`);
        });
    });

    document.querySelectorAll('.delete-event-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const eventId = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this event?')) {
                try {
                    await api.deleteEvent(eventId);
                    alert('Event deleted successfully!');
                    displayEvents(true); // Re-render events after deletion
                } catch (error) {
                    alert('Failed to delete event.');
                    console.error('Error deleting event:', error);
                }
            }
        });
    });
}