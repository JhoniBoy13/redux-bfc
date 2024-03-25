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
        updateInfoModal(state: WritableDraft<ModalState>, action: PayloadAction<{ openInfoModal: boolean, isNew?: boolean }>) {
            state.isNew = (action.payload.isNew) ? action.payload.isNew : false
            state.infoModal = action.payload.openInfoModal
        },
        updateDeleteModal(state: WritableDraft<ModalState>, action: PayloadAction<boolean>) {
            state.deleteModal = action.payload
            state.isNew = false
        },
    },
})

export const {updateFilterModal, updateInfoModal, updateDeleteModal} = ModalSlice.actions
export default ModalSlice.reducer