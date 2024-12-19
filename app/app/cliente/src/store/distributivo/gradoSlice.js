import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const gradoSlice = createSlice({
    name: 'grado',
    initialState: {
        isLoadingGrado: true,
        activeGrado: [],
        listGrado: [],
        inicialGrado: [],
        mensajeGrado: null
    },
    reducers: {
        onSetActiveGrado: (state, { payload }) => {
            state.activeGrado = payload;
            state.inicialGrado = [];
            if (state.activeGrado.length === 1) {
                state.inicialGrado = payload[0].listGrado;
            }
        },
        onAddNewGrado: (state, { payload }) => {
            //state.listGrado.push(payload);
            state.activeGrado = [];
            state.inicialGrado = []
            state.mensajeGrado = 'Los datos se han guardado correctamente';
        },
        onUpdateGrado: (state, { payload }) => {
            state.listGrado = state.listGrado.map(grado => {
                if (grado.id === payload.id) {
                    return payload
                }
                return grado
            })
            state.mensajeGrado = 'Los datos se actualizaron correctamente'
        },
        onDeleteGrado: (state, { payload }) => {
            if (payload.id) {
                state.listGrado = state.listGrado.filter(grado => grado.id !== payload.id);
                state.activeGrado = [];
                state.inicialGrado = [];
                state.mensajeGrado = 'Los datos se han eliminado correctamente'
            }

        },
        onLoadGrado: (state, { payload }) => {
            state.isLoadingGrado = false;
            payload.forEach(grado => {
                const exist = state.listGrado.some(dbgrado => dbgrado.id === grado.id);
                if (!exist) {
                    state.listGrado.push(grado)
                }
            });
        },
        clearMessageGrado: (state) => {
            state.mensajeGrado = null;
        }
    }
})

export const { onSetActiveGrado, onAddNewGrado, onUpdateGrado, onDeleteGrado, onLoadGrado, clearMessageGrado } = gradoSlice.actions
