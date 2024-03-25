"use client"
import {Calendar} from "@/app/components/Calendar";
import {Provider} from "react-redux";
import {store} from "@/lib/store/store";
import {InfoDialog} from "@/app/components/dialogs/InfoDialog";
import React, {useEffect, useState} from "react";
import {SelectedEventContext} from "@/lib/features/SelectedEventContext";
import {Event} from "@/lib/entities/Event";
import {DeleteDialog} from "@/app/components/dialogs/DeleteDialog";

export default function Home() {

    const [selectedEvent, setSelectedEvent] = useState<Event>(
        {title: '', description: '', start: '', end: '', allDay: false, id: 0, eventType: {id: 0, color: "blue", title: "blue team", iconUrl: "https://www.w3schools.com/images/w3schools_green.jpg"}, color: "blue"}
    )

    return (
        <Provider store={store}>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <SelectedEventContext.Provider value={{selectedEvent, setSelectedEvent}}>
                    <Calendar/>
                    <InfoDialog/>
                    <DeleteDialog/>
                </SelectedEventContext.Provider>
            </main>
        </Provider>
    );
}
