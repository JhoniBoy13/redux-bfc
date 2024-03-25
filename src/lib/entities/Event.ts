import {EventType} from "@/lib/entities/EventType";
import {DateSpan} from "@/lib/entities/DateSpan";
import {SelectOption} from "@/lib/entities/SelectOption";

export interface Event extends DateSpan, SelectOption {
    eventType: EventType;
    description: string;
}

