import { createSlice } from '@reduxjs/toolkit'

export const cedulaSlice = createSlice({
    name: 'cedula',
    initialState: {
        estadoCed: 'checkingCedula',
        trabCed: {},
        errorMessageCed: undefined,
    },
    reducers: {
        onCheckingCed: (state) => {
            state.estadoCed = 'checkingCedula';
            state.trabCed = {};
            state.errorMessageCed = undefined;
        },
        onlinkedingCed: (state, { payload }) => {
            state.estadoCed = 'linked';
            state.trabCed = payload;
            state.errorMessageCed = undefined;
        },
        onUnlinkedingCed: (state, { payload }) => {
            state.estadoCed = 'not-linked';
            state.trabCed = {};
            state.errorMessageCed = payload;
        },
        clearErrorMessageCed: (state) => {
            state.errorMessageCed = undefined;
        }
    }
})
export const { onCheckingCed, onlinkedingCed, onUnlinkedingCed, clearErrorMessageCed } = cedulaSlice.actions