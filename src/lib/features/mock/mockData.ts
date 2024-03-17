import {EventType} from "@/lib/entities/EventType";
import {Event} from "@/lib/entities/Event";

export const mockEventsTypes: EventType[] = [
    { id: 0, color: "blue", title: "blue team", iconUrl: "https://www.w3schools.com/images/w3schools_green.jpg" },
    { id: 1, color: "green", title: "green team", iconUrl: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png" },
    { id: 2, color: "red", title: "red team", iconUrl: "https://docs.snap.com/assets/images/creating-an-icon_creating_an_icon_world_example-a831f0c2b967e422d37120d99c9959e0.png" },
    { id: 3, color: "yellow", title: "yellow team", iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHX6I512gcFArlxwiw0Z7L9ilOTlRk9aQQA&usqp=CAU" },
];

// Mock data for events
export const mockEvents: Event[] = [
    { title: 'event 1',description:'a', id: 1, eventType: mockEventsTypes[0], color: mockEventsTypes[0].color, start: new Date().getTime().toString(), allDay: true, isInCalendar: false },
    { title: 'event 2',description:'b', id: 2, eventType: mockEventsTypes[1], color: mockEventsTypes[1].color, start: new Date().getTime().toString(), allDay: true, isInCalendar: false },
    { title: 'event 3',description:'c', id: 3, eventType: mockEventsTypes[0], color: mockEventsTypes[0].color, start: new Date().getTime().toString(), allDay: true, isInCalendar: false },
    { title: 'event 4',description:'d',id: 4, eventType: mockEventsTypes[0], color: mockEventsTypes[0].color, start: new Date().getTime().toString(), allDay: true, isInCalendar: false },
    { title: 'event 5',description:'', id: 5, eventType: mockEventsTypes[0], color: mockEventsTypes[0].color, start: new Date().getTime().toString(), allDay: true, isInCalendar: false },
];