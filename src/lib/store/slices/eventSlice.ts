import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchEvents} from "@/lib/features/api/EventAPI";
import {EventState} from "@/lib/store/states/EventState";
import {Event} from "@/lib/entities/Event";
import {DateSpan} from "@/lib/entities/DateSpan";
import {SelectOption} from "@/lib/entities/SelectOption";
import {EventType} from "@/lib/entities/EventType";


const initialState: EventState = {
    events: [],
    selectedEvent: getEmptyEvent(),
    loading: 'idle',

};

export const fetchEventsAsync = createAsyncThunk(
    'event/fetchEvents',
    async () => {
        try {
            return await fetchEvents();
        }
        catch (error) {
            throw error;
        }
    }
);

function getEmptyEvent(): Event {
    return {title: '', description: '', start: '', end: '', allDay: false, id: 0, eventType: {id: 0, color: "blue", title: "blue team", iconUrl: "https://www.w3schools.com/images/w3schools_green.jpg"}, color: "blue"};
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        resetSelectedEvent: (state) => {
            state.selectedEvent = getEmptyEvent();
        },
        addEventToStore: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload);
            console.log('added event', action.payload)

        },
        updateSelectedEventDate: (state, action: PayloadAction<DateSpan>) => {
            const {allDay, start, end} = action.payload; // Destructure from payload
            state.selectedEvent.allDay = allDay;
            state.selectedEvent.start = start;
            state.selectedEvent.end = end;
        },
        updateSelectedEventMetaData: (state, action: PayloadAction<SelectOption & { description: string, eventType: EventType }>) => {
            const {id, color, title, description, eventType} = action.payload;
            state.selectedEvent.id = id;
            state.selectedEvent.color = color;
            state.selectedEvent.title = title;
            state.selectedEvent.description = description;
            state.selectedEvent.eventType = eventType;
            // ... rest of your reducer logic
        },
        deleteEventToStore: (state, action: PayloadAction<number>) => {
            state.events = state.events.filter((event: Event) => event.id !== action.payload);
        },
        updateEventToStore: (state, action: PayloadAction<Event>) => {
            const updatedIndex = state.events.findIndex((event: Event) => event.id === action.payload.id);
            if (updatedIndex !== -1) {
                state.events[updatedIndex] = state.selectedEvent;
            }
        },
        selectEventById: (state, action: PayloadAction<string>) => {
            // Find the event by ID from the state and set it to selectedEvent
            const event: Event | undefined = state.events.find((event: Event) => event.id === Number(action.payload));

            state.selectedEvent = (event) ? {...event} : getEmptyEvent()
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<EventState>) => {
        builder
            .addCase(fetchEventsAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchEventsAsync.fulfilled, (state, action: PayloadAction<Event[]>) => {
                state.loading = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEventsAsync.rejected, (state) => {
                state.loading = 'failed';
            });
    },
});

export const {deleteEventToStore, addEventToStore, updateEventToStore, selectEventById, updateSelectedEventDate, updateSelectedEventMetaData, resetSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;