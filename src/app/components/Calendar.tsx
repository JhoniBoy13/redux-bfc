"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {DateClickArg, EventResizeDoneArg} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import React, {useEffect, useState} from 'react'
import {DateSelectArg, EventChangeArg, EventClickArg, EventDropArg, EventHoveringArg, EventSourceInput} from '@fullcalendar/core/index.js'
import {CostumeEvent} from "@/app/components/CostumeEvent";
import {Event} from "@/lib/entities/Event";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "@/lib/store/store";
import {fetchEventsAsync, resetSelectedEvent, selectEventById, updateEventToStore, updateSelectedEventDate} from "@/lib/store/slices/eventSlice";
import {DateSpan} from "@/lib/entities/DateSpan";
import {updateFilterModal, updateInfoModal} from "@/lib/store/slices/modalSlice";

export function Calendar() {

    const [newDate, setNewDate] = useState<DateSpan>()
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const events: Event[] = useSelector((state: RootState) => state.events.events);
    const selectedEvent: Event = useSelector((state: RootState) => state.events.selectedEvent);
    const dispatch = useDispatch();


    useEffect(() => {
        const filterEventsCopy: Event[] = events.filter(event => (event.eventType?.isFiltered === undefined || event.eventType?.isFiltered === false))
        setFilteredEvents(filterEventsCopy);
    }, [events, store.getState().events.loading]);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchEventsAsync());

    }, []);

    async function handleDateClick(data: DateClickArg) {
        if (newDate) {
            dispatch(updateSelectedEventDate({end: newDate.end, start: newDate.start, allDay: newDate.allDay}));
            console.log("selected Event", selectedEvent);
            dispatch(updateInfoModal({openInfoModal: true, isNew: true}));
        }
    }

    function handleDateSelect(data: DateSelectArg) {
        if (!(newDate && data.start.toISOString() > newDate.start && newDate.end && data.end.toISOString() < newDate.end)) {
            setNewDate({start: data.start.toISOString(), end: data.end.toISOString(), allDay: data.allDay})
        }
    }

    function updateEvent(data: EventChangeArg) {
        dispatch(selectEventById(data.event.id))
        setNewDate({allDay: selectedEvent.allDay, start: selectedEvent.start, end: selectedEvent.end})

        if (newDate) {
            newDate.allDay = data.event.allDay

            if (data.event.start) {
                newDate.start = data.event.start.toISOString()
            }

            if (data.event.end) {
                newDate.end = data.event.end.toISOString()
            }
            console.log('updtaed selected event', selectedEvent)
            dispatch(updateEventToStore({...selectedEvent, ...newDate}))
        }
    }

    function handleEventClick(data: EventClickArg) {
        dispatch(selectEventById(data.event.id))
        console.log("selected Event", selectedEvent);
        dispatch(updateInfoModal({openInfoModal: true, isNew: false}))
    }

    function handleMouseLeave(data: EventHoveringArg) {

        console.log(data, 'handalMouseLeave')
    }

    return (
        <div className="col-span-8">
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                ]}
                customButtons={{
                    filterButton: {
                        text: 'Filter events', click: () => {
                            dispatch(updateFilterModal(true))
                        }
                    }
                }}
                headerToolbar={{
                    left: 'prev,next today, filterButton',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                eventContent={CostumeEvent}
                events={filteredEvents as EventSourceInput}
                nowIndicator={true}
                editable={true}
                droppable={true}
                eventDurationEditable={true}
                selectable={true}
                selectMirror={true}
                eventMouseLeave={(data:EventHoveringArg)=> handleMouseLeave(data)}
                select={(data: DateSelectArg) => handleDateSelect(data)}
                dateClick={(data: DateClickArg) => handleDateClick(data)}
                // drop={(data: DropArg) => addEventToCalendar(data)}
                eventChange={(data: EventChangeArg) => updateEvent(data)}
                eventDrop={(data: EventDropArg) => updateEvent(data)}
                eventResize={(data: EventResizeDoneArg) => updateEvent(data)}
                eventClick={(data: EventClickArg) => handleEventClick(data)}
            />
        </div>
    );
}