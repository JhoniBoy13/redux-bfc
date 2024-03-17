import React, {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CheckIcon, InformationCircleIcon} from "@heroicons/react/20/solid";
import {EventType} from "@/lib/entities/EventType";
import {Event} from "@/lib/entities/Event";
import {useModalMapHook} from "@/lib/features/hooks/useModalMapHook";
import {BFCButton} from "@/app/components/shared/BFCButton";
import {BFCInput} from "@/app/components/shared/BFCInput";
import {BFCSelect} from "@/app/components/shared/BFCSelect";
import {useDispatch, useSelector} from "react-redux";
import {increment} from "@/lib/store/slices/counterSlice";
import {addEventToStore, resetSelectedEvent, updateEventToStore} from "@/lib/store/slices/eventSlice";
import {RootState, store} from "@/lib/store/store";
import {BFCTextArea} from "@/app/components/shared/BFCTextArea";
import {useEventTypes} from "@/lib/features/hooks/useEventTypesHook";
import {updateDeleteModal, updateInfoModal} from "@/lib/store/slices/modalSlice";

export function InfoDialog(): JSX.Element {

    const {eventTypes} = useEventTypes();
    let event: Event = {...useSelector((state: RootState) => state.events.selectedEvent)}

    const [title, setTitle] = React.useState<string>(event.title);
    const [description, setDescription] = React.useState<string>(event.description);
    const [color, setColor] = React.useState<string>(event.eventType.color);
    const [selectedEventType, setSelectedEventType] = React.useState<EventType>(event.eventType);
    const dispatch = useDispatch();
    const infoModal: boolean = useSelector((state: RootState) => state.modals.infoModal)
    const isNewEvent: boolean = useSelector((state: RootState) => state.modals.isNew)


    function updateEvent(id: number) {
        event.title = title;
        event.eventType = selectedEventType;
        event.color = color;
        event.description = description;
        event.id = id;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        function getNextId(): number {
            dispatch(increment())
            return store.getState().counter.value
        }

        if (isNewEvent) {
            updateEvent(getNextId());
            dispatch(addEventToStore(event))
        }
        else {
            updateEvent(store.getState().counter.value);
            dispatch(updateEventToStore(event))
        }
        closeCreateModal();
    }

    function closeCreateModal() {
        dispatch(resetSelectedEvent())
        dispatch(updateInfoModal({openInfoModal: false}))
    }

    function openDeleteModal() {
        dispatch(updateDeleteModal(true))
    }

    return (
        <Transition.Root show={infoModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeCreateModal()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${isNewEvent ? "bg-green-100" : "bg-blue-100"}`}>
                                        {isNewEvent
                                            ? <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                                            : <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true"/>
                                        }
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            {isNewEvent ? 'Add Event' : 'Event Info'}
                                        </Dialog.Title>
                                        <form action="submit" onSubmit={handleSubmit}>
                                            <BFCInput name="title" text={title} setText={setTitle} placeholder="Title"/>
                                            <BFCSelect options={eventTypes} selected={selectedEventType} color={color} setSelected={setSelectedEventType} setColor={setColor}/>
                                            <BFCTextArea text={description} setText={setDescription} row={4} placeholder={"Description"}/>
                                            <div className={`mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense  sm:gap-3 ${isNewEvent ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                                                <BFCButton type={'submit'} text={isNewEvent ? 'Create' : 'Update'} disabled={title === ''} extraClass={"bg-violet-600 text-white   hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"}/>
                                                {(!isNewEvent) && <BFCButton text="Delete" extraClass={"bg-red-600 text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-3 disabled:opacity-25"} clickFunction={openDeleteModal}/>}
                                                <BFCButton text="Cancel" clickFunction={closeCreateModal} extraClass={"mt-3 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"}/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}