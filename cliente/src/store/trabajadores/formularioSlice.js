import { createSlice } from '@reduxjs/toolkit';
import React from 'react'

export const formularioSlice = createSlice({
    name: 'formulario',
    initialState: {
        setDatos: true,
        datos: {},
        messageDatos: null
    },
    reducers: {
        onSetDatos: (state, { payload }) => {
            state.setDatos = payload;
            console.log(payload)
        }
    }
})

export const {onSetDatos} = formularioSlice.actions