import { createSlice } from '@reduxjs/toolkit';

export const alertDialogSlice = createSlice({
    name: 'alertDialog',
    initialState: {
        isAlertDialogOpen: false,
    },

    reducers: {
        onOpenAlertDialog: (state) => {
            state.isAlertDialogOpen = true;
        },
        onCloseAlertDialog: (state) => {
            state.isAlertDialogOpen = false
        }
    }

})

export const { onOpenAlertDialog, onCloseAlertDialog } = alertDialogSlice.actions

