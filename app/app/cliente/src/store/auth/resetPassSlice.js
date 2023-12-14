import { createSlice } from '@reduxjs/toolkit'

export const resetPassSlice = createSlice({
    name: 'resetPass',
    initialState: {
        isCheckingUser: false,
        usuario: {},
        mensajeResetPass: undefined,
    },
    reducers: {
        onSendEmail: (state, { payload }) => {
            state.isCheckingUser = true
            state.mensajeResetPass = payload;
        },
        clearMesagesReset: (state) => {
            state.isCheckingUser = false
            state.mensajeResetPass = undefined;
        },

    },
})
export const { onSendEmail, clearMesagesReset }=resetPassSlice.actions