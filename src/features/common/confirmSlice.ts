import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ConfirmModalState {
    display: boolean;
    onConfirm: () => void;
}

const initialState: ConfirmModalState = {
    display: false,
    onConfirm: () => { },
};

export const confirmSlice = createSlice({
    name: "confirmModal",
    initialState,
    reducers: {
        setConfirmModal: (state, action: PayloadAction<ConfirmModalState>) => {
            state.display = action.payload.display;
            state.onConfirm = action.payload.onConfirm;
        },
    },
});

export const { setConfirmModal } = confirmSlice.actions;

export const selectDisplayModal = (state: RootState) => state.confirmModal.display;
export const selectOnConfirm = (state: RootState) => state.confirmModal.onConfirm;

export default confirmSlice.reducer;


