import {SelectOption} from "@/lib/entities/SelectOption";

export interface EventType extends SelectOption{
    iconUrl: string;
    isFiltered?:boolean;
}