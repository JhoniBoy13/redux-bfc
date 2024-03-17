import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchEvents} from "@/lib/features/api/EventAPI";
import {EventState} from "@/lib/store/states/EventState";
import {Event} from "@/lib/entities/Event";
// @ts-ignore
import {WritableDraft} from 'immer/src/types/types-external';
import {DateSpan} from "@/lib/entities/DateSpan";


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
    return {title: '', description: '', start: '', allDay: false, id: 0, eventType: {id: 0, color: "blue", title: "blue team", iconUrl: "https://www.w3schools.com/images/w3schools_green.jpg"}, color: "blue", isInCalendar: true};
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        resetSelectedEvent: (state: WritableDraft<EventState>) => {
            state.selectedEvent = getEmptyEvent();
        },
        addEventToStore: (state: WritableDraft<EventState>, action: PayloadAction<Event>) => {
            state.events.push(action.payload);
        },
        setNewEventDate: (state: WritableDraft<EventState>, action: PayloadAction<DateSpan>) => {
            const {allDay, start, end} = action.payload; // Destructure from payload
            state.selectedEvent.allDay = allDay;
            state.selectedEvent.start = start;
            state.selectedEvent.end = end;
        },
        deleteEventToStore: (state: WritableDraft<EventState>, action: PayloadAction<number>) => {
            state.events = state.events.filter((event: Event) => event.id !== action.payload);
        },
        updateEventToStore: (state: WritableDraft<EventState>, action: PayloadAction<Event>) => {
            const updatedIndex = state.events.findIndex((event: Event) => event.id === action.payload.id);
            if (updatedIndex !== -1) {
                state.events[updatedIndex] = action.payload;
            }
        },
        selectEventById: (state: WritableDraft<EventState>, action: PayloadAction<string>) => {
            // Find the event by ID from the state and set it to selectedEvent
            const event: Event = state.events.find((event: Event) => event.id === Number(action.payload));
            state.selectedEvent = (event) ? event : getEmptyEvent()
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<EventState>) => {
        builder
            .addCase(fetchEventsAsync.pending, (state: WritableDraft<EventState>) => {
                state.loading = 'pending';
            })
            .addCase(fetchEventsAsync.fulfilled, (state: WritableDraft<EventState>, action: PayloadAction<Event[]>) => {
                state.loading = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEventsAsync.rejected, (state: WritableDraft<EventState>) => {
                state.loading = 'failed';
            });
    },
});

export const {deleteEventToStore, addEventToStore, updateEventToStore, selectEventById, setNewEventDate, resetSelectedEvent} = eventSlice.actions;
export default eventSlice.reducer;