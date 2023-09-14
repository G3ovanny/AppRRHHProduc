import { createSlice } from '@reduxjs/toolkit';
import React from 'react'

export const archivoAccionesSlice = createSlice({
    name: 'archivoAcciones',
    initialState: {
        isLoadingArchivoAcc: false,
        activeArchivoAcc: [],
        archivosAcc: [],
        inicialArchivoAcc: [],
        mensajeArchivoAcc: null
    },
    reducers: {
        onSetActiveArchivoAcc: (state, { payload }) => {
            state.activeArchivoAcc = payload;
            state.inicialArchivoAcc = [];
            if (state.activeArchivoAcc.length === 1) {
                state.inicialArchivoAcc = payload[0].archivosAcc
            }
        },
        onAddNewArchivoAcc: (state, { payload }) => {
            state.archivosAcc.push(payload);
            state.mensajeArchivoAcc = 'Los datos se han guardado correctamente';
            state.activeArchivoAcc = [];
            state.inicialArchivoAcc = []
        },
        onUpdateArchivoAcc: (state, { payload }) => {
            state.archivosAcc = state.archivosAcc.map(archivoAcc => {
                if (archivoAcc.id === payload.id) {
                    return payload
                }
                return archivoAcc
            })
            state.mensajeArchivoAcc = 'Los datos se actualizaron correctamente'
        },
        onLoadArchivoAcc: (state, { payload }) => {
            state.isLoadingArchivoAcc = true;
            payload.forEach(archivoAcc => {
                const exist = state.archivosAcc.some(dbArchivoAcc => dbArchivoAcc.id === archivo.id);
                if (!exist) {
                    state.archivosAcc.push(archivoAcc)
                }
            });
        },
        clearMessageArchivoAcc: (state) => {
            state.mensajeArchivoAcc = null
        },
    }
})

export const { onSetActiveArchivoAcc, onAddNewArchivoAcc, onUpdateArchivoAcc, onLoadArchivoAcc, clearMessageArchivoAcc } = archivoAccionesSlice.actions