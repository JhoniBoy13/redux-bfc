import {EventContentArg} from "@fullcalendar/core";
import {useDispatch} from "react-redux";
import {store} from "@/lib/store/store";
import {selectEventById} from "@/lib/store/slices/eventSlice";
import React, {useEffect, useState} from 'react'


export function CostumeEvent(data: EventContentArg): JSX.Element {

    function extractImgUrl(id: string): string | undefined {
        return store.getState().events.selectedEvent?.eventType.iconUrl;
    }

    return (
        <div className={"justify-content-center flex-row fc-event"} style={{display: "flex"}}>
            <img src={extractImgUrl(data.event.id)} className={' w-5 h-5'} alt={'t'}/>
            <h1 className={""}>{data.event.title}</h1>
        </div>
    );
}