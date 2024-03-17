import {Event} from "@/lib/entities/Event";
import {LoadingState} from "@/lib/store/states/LoadingState";
import {EventType} from "@/lib/entities/EventType";

export interface EventState extends LoadingState {
    events: Event[];
    selectedEvent: Event;
    // eventTypes: EventType[];
}