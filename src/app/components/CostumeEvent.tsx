import {EventContentArg} from "@fullcalendar/core";
import {store} from "@/lib/store/store";
import React from 'react'
import {Event} from "@/lib/entities/Event"

export function CostumeEvent(data: EventContentArg): React.JSX.Element {

    function extractImgUrl(id: string): string | undefined {
        return store.getState().events.events.find((event: Event) => event.id.toString() === id)?.eventType.iconUrl;
    }

    return (
        <div className={"justify-content-center flex-row"} style={{display: "flex"}}>
            <img src={extractImgUrl(data.event.id)} className={' w-5 h-5'} alt={data.event.title}/>
            <h1>{data.event.title}</h1>
        </div>
    );
}