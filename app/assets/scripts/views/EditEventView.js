// public/js/views/EditEventView.js
import { api } from '../api.js';
import { navigateTo } from '../router.js';

const appRoot = document.getElementById('app-root');

export async function EditEventView(params) {
    const eventId = params.id;
    if (!eventId) {
        navigateTo('#/not-found'); // No ID provided
        return;
    }

    let eventToEdit = null;
    try {
        eventToEdit = await api.getEventById(eventId);
    } catch (error) {
        console.error('Error fetching event for editing:', error);
        navigateTo('#/not-found'); // Event not found or API error
        return;
    }

    if (!eventToEdit) {
        navigateTo('#/not-found'); // Event not found after fetch
        return;
    }

    appRoot.innerHTML = `
        <section class="section">
            <div class="container">
                <h2 class="title is-2 has-text-centered mb-6">Edit Event</h2>
                <div class="columns is-centered">
                    <div class="column is-half">
                        <div class="box">
                            <form id="editEventForm">
                                <input type="hidden" id="editEventId" value="${eventToEdit.id}">
                                <div class="field">
                                    <label class="label">Event Name</label>
                                    <div class="control">
                                        <input class="input" type="text" id="editEventName" value="${eventToEdit.name}" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Date</label>
                                    <div class="control">
                                        <input class="input" type="date" id="editEventDate" value="${eventToEdit.date}" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Location</label>
                                    <div class="control">
                                        <input class="input" type="text" id="editEventLocation" value="${eventToEdit.location}" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Price</label>
                                    <div class="control">
                                        <input class="input" type="number" id="editEventPrice" value="${eventToEdit.price}" min="0" step="0.01" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Description</label>
                                    <div class="control">
                                        <textarea class="textarea" id="editEventDescription">${eventToEdit.description || ''}</textarea>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Image URL</label>
                                    <div class="control">
                                        <input class="input" type="url" id="editEventImage" value="${eventToEdit.image || ''}" placeholder="Image URL (e.g., https://example.com/image.jpg)">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Status</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select id="editEventStatus">
                                                <option value="active" ${eventToEdit.status === 'active' ? 'selected' : ''}>Active</option>
                                                <option value="inactive" ${eventToEdit.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                                                <option value="cancelled" ${eventToEdit.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Capacity</label>
                                    <div class="control">
                                        <input class="input" type="number" id="number" name="number" min="0" max="100" placeholder="Please enter the capacity of the event" required>
                                    </div>
                                </div>

                                <div class="field is-grouped is-grouped-centered mt-5">
                                    <div class="control">
                                        <button class="button is-primary" type="submit">Update Event</button>
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

    document.getElementById('editEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editEventId').value;
        const updatedEvent = {
            name: document.getElementById('editEventName').value,
            date: document.getElementById('editEventDate').value,
            location: document.getElementById('editEventLocation').value,
            price: parseFloat(document.getElementById('editEventPrice').value),
            description: document.getElementById('editEventDescription').value,
            image: document.getElementById('editEventImage').value,
            status: document.getElementById('editEventStatus').value
        };

        try {
            await api.updateEvent(id, updatedEvent);
            alert('Event updated successfully!');
            navigateTo('#dashboard'); // Redirect to dashboard after update
        } catch (error) {
            alert('Failed to update event. Please try again.');
            console.error('Error updating event:', error);
        }
    });
}