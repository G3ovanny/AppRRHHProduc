import { createSlice } from '@reduxjs/toolkit';

export const formularioSlice = createSlice({
    name: 'formulario',
    initialState: {
        setDatos: true,
        formularios: [],
        messageDatos: null
    },
    reducers: {
        onKeepDates: (state, { payload }) => {
            state.formularios = payload;
        }
    }
})

export const {onKeepDates} = formularioSlice.actions