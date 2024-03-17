import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ModalState} from "@/lib/store/states/ModalState";
// @ts-ignore
import {WritableDraft} from "immer/src/types/types-external";

const initialState: ModalState = {
    filterModal: false,
    infoModal: false,
    deleteModal: false,
    isNew: true
};

const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        updateFilterModal(state: WritableDraft<ModalState>, action: PayloadAction<boolean>) {
            state.filterModal = action.payload
        },
        updateInfoModal(state: WritableDraft<ModalState>, action: PayloadAction<{openInfoModal: boolean, isNew?: boolean}>) {
            state.infoModal = action.payload.openInfoModal
            state.isNew = action.payload.isNew ?? true


        },
        updateDeleteModal(state: WritableDraft<ModalState>, action: PayloadAction<boolean>) {
            state.deleteModal = action.payload
        },
    },
})

export const {updateFilterModal,updateInfoModal,updateDeleteModal} = ModalSlice.actions
export default ModalSlice.reducer