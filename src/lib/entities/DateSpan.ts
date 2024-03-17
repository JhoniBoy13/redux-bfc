import {EventType} from "@/lib/entities/EventType";

export interface DateSpan {
    start: string;
    end?:  string;
    allDay: boolean;
}