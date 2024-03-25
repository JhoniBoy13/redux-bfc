"use client"
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "@/lib/store/store";
import {ModalView} from "@/lib/entities/ModalView";
import {BFCDialogHeading} from "@/app/components/shared/BFCDialogHeading";
import {BFCButton} from "@/app/components/shared/BFCButton";
import {BFCDialog} from "@/app/components/shared/BFCDialog";
import React, {useEffect, useState} from "react";
import {increment} from "@/lib/store/slices/counterSlice";
import {updateDeleteModal, updateInfoModal} from "@/lib/store/slices/modalSlice";
import {CheckIcon, InformationCircleIcon} from "@heroicons/react/20/solid";
import {BFCInput} from "@/app/components/shared/BFCInput";
import {BFCSelect} from "@/app/components/shared/BFCSelect";
import {BFCTextArea} from "@/app/components/shared/BFCTextArea";
import {EventType} from "@/lib/entities/EventType";
import {Event} from "@/lib/entities/Event";
import {useEventTypes} from "@/lib/features/hooks/useEventTypesHook";
import {addEventToStore, resetSelectedEvent, updateEventToStore, updateSelectedEventMetaData} from "@/lib/store/slices/eventSlice";

export function InfoDialog() {
    const infoModal: boolean = useSelector((state: RootState) => state.modals.infoModal);
    const isNewEvent: boolean = useSelector((state: RootState) => state.modals.isNew);
    const UpdateModalView: ModalView = new ModalView({name: 'Update', color: 'blue', text: ''});
    const CreateModalView: ModalView = new ModalView({name: 'Create', color: 'green', text: ''});
    const selectedEvent: Event = useSelector((state: RootState) => state.events.selectedEvent);
    const [eventType, setEventType] = useState<EventType>(selectedEvent.eventType);
    const [title, setTitle] = useState<string>(selectedEvent.title);
    const [id, setId] = useState<number>(selectedEvent.id);
    const [description, setDescription] = useState<string>(selectedEvent.description);
    const [color, setColor] = useState<string>(selectedEvent.eventType.color);
    const {eventTypes} = useEventTypes();
    const dispatch = useDispatch();

    useEffect(() => {
        if (infoModal){
            isNewEvent ? getNextId().then(setId) : setId(selectedEvent.id)
            isNewEvent ? setTitle('') : setTitle(selectedEvent.title)
            isNewEvent ? setDescription('') : setDescription(selectedEvent.description)
            isNewEvent ? setEventType(eventTypes[0]) : setEventType(selectedEvent.eventType)
            isNewEvent ? setColor(eventTypes[0].color) : setColor(selectedEvent.color)
        }
    }, [infoModal]);

    async function getNextId(): Promise<number> {
        dispatch(increment());
        return store.getState().counter.value;
    }

    async function handleSubmit(data: React.FormEvent<HTMLFormElement>): Promise<void> {
        data.preventDefault();
        dispatch(updateSelectedEventMetaData({id, title, eventType, color, description}));
        dispatch(isNewEvent ? addEventToStore({...selectedEvent, id, title, eventType, color, description}) : updateEventToStore({...selectedEvent}));
        closeInfoModal()
    }

    async function closeInfoModal() {
        if (!store.getState().modals.deleteModal){
            dispatch(updateInfoModal({openInfoModal: false}))
            dispatch(resetSelectedEvent());
        }
    }

    function openDeleteModal() {
        dispatch(updateDeleteModal(true))
    }


    return (
        <BFCDialog showModal={infoModal} onClose={closeInfoModal}>

            <BFCDialogHeading
                color={isNewEvent ? CreateModalView.color : UpdateModalView.color}
                name={isNewEvent ? CreateModalView.name : UpdateModalView.name}
                text={''}
            >
                {isNewEvent
                    ? <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                    : <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true"/>
                }
            </BFCDialogHeading>
            <form action="submit" onSubmit={handleSubmit}>
                <BFCInput name="title" text={title} setText={setTitle} placeholder="Title"/>
                <BFCSelect options={eventTypes} selected={eventType} color={color} setSelected={setEventType} setColor={setColor}/>
                <BFCTextArea text={description} setText={setDescription} row={4} placeholder={"Description"}/>
                <div className={`mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense  sm:gap-3 ${isNewEvent ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                    <BFCButton type={'submit'} text={isNewEvent ? 'Create' : 'Update'} disabled={title === ''} extraClass={"bg-violet-600 text-white   hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"}/>
                    {(!isNewEvent) && <BFCButton text="Delete" extraClass={"bg-red-600 text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-3 disabled:opacity-25"} clickFunction={openDeleteModal}/>}
                    <BFCButton text="Cancel" clickFunction={closeInfoModal} extraClass={"mt-3 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"}/>
                </div>
            </form>
        </BFCDialog>);
}