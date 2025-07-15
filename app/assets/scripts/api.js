// public/js/api.js
const API_BASE_URL = 'http://localhost:3000';

// Generic fetch function for handling responses
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// User related API calls
export const api = {
    // Users
    registerUser: (userData) => fetchData(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }),
    getUsers: () => fetchData(`${API_BASE_URL}/users`),

    // Events
    getEvents: () => fetchData(`${API_BASE_URL}/events`),
    getEventById: (id) => fetchData(`${API_BASE_URL}/events/${id}`),
    createEvent: (eventData) => fetchData(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    }),
    updateEvent: (id, eventData) => fetchData(`${API_BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    }),
    deleteEvent: (id) => fetchData(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE'
    }),

    // Enroll Email
    enrollEmail: (emailData) => fetchData(`${API_BASE_URL}/enrolledEmail`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
    })
};