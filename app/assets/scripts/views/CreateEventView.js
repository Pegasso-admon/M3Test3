// public/js/views/CreateEventView.js
import { api } from '../api.js';
import { navigateTo } from '../router.js';

const appRoot = document.getElementById('app-root');

export function CreateEventView() {
    appRoot.innerHTML = `
        <section class="section">
            <div class="container">
                <h2 class="title is-2 has-text-centered mb-6">Create New Event</h2>
                <div class="columns is-centered">
                    <div class="column is-half">
                        <div class="box">
                            <form id="createEventForm">
                                <div class="field">
                                    <label class="label">Event Name</label>
                                    <div class="control">
                                        <input class="input" type="text" id="eventName" placeholder="Event Name" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Date</label>
                                    <div class="control">
                                        <input class="input" type="date" id="eventDate" min="2025-07-15" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Location</label>
                                    <div class="control">
                                        <input class="input" type="text" id="eventLocation" placeholder="Event Location" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Price</label>
                                    <div class="control">
                                        <input class="input" type="number" id="eventPrice" placeholder="Price" min="0" step="0.01" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Description</label>
                                    <div class="control">
                                        <textarea class="textarea" id="eventDescription" placeholder="Event Description"></textarea>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Image URL</label>
                                    <div class="control">
                                        <input class="input" type="url" id="eventImage" placeholder="Image URL (e.g., https://example.com/image.jpg)">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Status</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select id="eventStatus">
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Capacity</label>
                                    <div class="control">
                                        <input class="input" type="number" id="eventCapacity" name="number" min="0" max="1000" placeholder="Please enter the capacity of the event (0-1000)" required>
                                    </div>
                                </div>

                                <div class="field is-grouped is-grouped-centered mt-5">
                                    <div class="control">
                                        <button class="button is-primary" type="submit">Create Event</button>
                                    </div>
                                    <div class="control">
                                        <button class="button is-light" type="button" onclick="window.location.hash='#dashboard'">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    document.getElementById('createEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newEvent = {
            name: document.getElementById('eventName').value,
            date: document.getElementById('eventDate').value,
            location: document.getElementById('eventLocation').value,
            price: parseFloat(document.getElementById('eventPrice').value),
            description: document.getElementById('eventDescription').value,
            image: document.getElementById('eventImage').value, // Default image
            status: document.getElementById('eventStatus').value,
            capacity: parseInt(document.getElementById('eventCapacity').value)
        };

        try {
            await api.createEvent(newEvent);
            alert('Event created successfully!');
            navigateTo('#dashboard'); // Redirect to dashboard after creation
        } catch (error) {
            alert('Failed to create event. Please try again.');
            console.error('Error creating event:', error);
        }
    });
}