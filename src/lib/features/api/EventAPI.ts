import axios from 'axios';
import {Event} from "@/lib/entities/Event";
import {EventType} from "@/lib/entities/EventType";
import {mockEvents, mockEventsTypes} from "@/lib/features/mock/mockData";

const baseURL = '/api/events'; // Assuming events API endpoints are under /api/events

// export async function fetchEvents(): Promise<Event[]> {
//     try {
//         const response = await axios.get<Event[]>(baseURL);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         throw error;
//     }
// }

export async function fetchEventTypes():  Promise<EventType[]>  {
    return new Promise<EventType[]>((resolve) => {
        setTimeout(() => {
            resolve(mockEventsTypes);
        }, 1000);
    });
}

export async function fetchEvents():  Promise<Event[]>  {
    return new Promise<Event[]>((resolve) => {
        setTimeout(() => {
            resolve(mockEvents);
        }, 1000);
    });
}

export async function updateEvent(event: Event): Promise<void> {
    try {
        await axios.put(`${baseURL}/${event.id}`, event);
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}

export async function createEvent(event: Event): Promise<Event> {
    try {
        const response = await axios.post<Event>(baseURL, event);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}