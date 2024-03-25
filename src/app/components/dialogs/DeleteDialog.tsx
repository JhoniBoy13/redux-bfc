import {BFCDialog} from "@/app/components/shared/BFCDialog";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store/store";
import React from "react";
import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";
import {BFCDialogHeading} from "@/app/components/shared/BFCDialogHeading";
import {ModalView} from "@/lib/entities/ModalView";
import {BFCButton} from "@/app/components/shared/BFCButton";
import {updateDeleteModal, updateInfoModal} from "@/lib/store/slices/modalSlice";
import {deleteEventToStore} from "@/lib/store/slices/eventSlice";


export function DeleteDialog() {

    const deleteModal: boolean = useSelector((state: RootState) => state.modals.deleteModal)
    const id: number = useSelector((state: RootState) => state.events.selectedEvent.id)

    const dispatch = useDispatch();
    const DeleteModalView: ModalView = new ModalView(
        {
            name: 'Delete',
            color: 'red',
            text: 'Are you sure you want to delete this event?'
        });
    async function handleSubmit(data: React.FormEvent<HTMLFormElement>): Promise<void> {
        data.preventDefault();
        dispatch(deleteEventToStore(id))
        closeDeleteModal()
        dispatch(updateInfoModal({openInfoModal: false}))
    }

    function closeDeleteModal() {
        dispatch(updateDeleteModal(false))
    }

    return (
        <BFCDialog showModal={deleteModal} onClose={closeDeleteModal}>
            <BFCDialogHeading
                color={DeleteModalView.color}
                name={DeleteModalView.name}
                text={DeleteModalView.text}
            >
                <ExclamationTriangleIcon className={`h-6 w-6 text-red-600`} aria-hidden="true"/>
            </BFCDialogHeading>
            <form action="submit" onSubmit={handleSubmit}>
                <div className={`mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense  sm:gap-3 sm:grid-cols-2`}>
                    <BFCButton type="submit" text="Delete" extraClass={"bg-red-600 text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2 disabled:opacity-25"}/>
                    <BFCButton text="Cancel" clickFunction={closeDeleteModal} extraClass={"mt-3 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"}/>

                </div>
            </form>
        </BFCDialog>
    );
}