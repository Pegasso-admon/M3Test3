// public/js/components/EventCard.js
export function createEventCard(event, isAdminView = false) {
    const card = document.createElement('div');
    card.className = 'column is-one-third'; // Bulma grid system

    card.innerHTML = `
        <div class="card event-card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="${event.image}" alt="${event.name}">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">${event.name}</p>
                        <p class="subtitle is-6">${event.location}</p>
                    </div>
                </div>
                <div class="content">
                    <p>${event.description || 'No description available.'}</p>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Price:</strong> $${event.price}</p>
                    ${isAdminView ? `<p><strong>Status:</strong> <span class="tag is-${event.status === 'active' ? 'success' : event.status === 'inactive' ? 'warning' : 'danger'}">${event.status}</span></p>` : ''}
                    <br>
                    <p><strong>Capacity:</strong> ${event.capacity}</p>
                    ${isAdminView ? `
                        <div class="buttons">
                            <button class="button is-info is-small edit-event-btn" data-id="${event.id}">Edit</button>
                            <button class="button is-danger is-small delete-event-btn" data-id="${event.id}">Delete</button>
                        </div>
                    ` : `
                        <button class="button is-fullwidth">Enroll</button>
                    `}
                </div>
            </div>
        </div>
    `;

    return card;
}