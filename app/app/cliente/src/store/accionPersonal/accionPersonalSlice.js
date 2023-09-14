import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const accionPersonalSlice = createSlice({
    name: 'accionPersonal',
    initialState: {
        isLoadingAccion: true,
        activeAccion: [],
        listAccion: [],
        inicialAccion: [],
        mensajeAccion: null
    },
    reducers: {
        onSetActiveAccion: (state, { payload }) => {
            state.activeAccion = payload;
            state.inicialAccion = [];
            if (state.activeAccion.length === 1) {
                state.inicialAccion = payload[0].listAccion;
            }
        },
        onAddNewAccion: (state, { payload }) => {
            //state.listAccion.push(payload);
            state.activeAccion = [];
            state.inicialAccion = []
            state.mensajeAccion = 'Los datos se han guardado correctamente';
        },
        onUpdateAccion: (state, { payload }) => {
            state.listAccion = state.listAccion.map(accionPersonal => {
                if (accionPersonal.id === payload.id) {
                    return payload
                }
                return accionPersonal
            })
            state.mensajeAccion = 'Los datos se actualizaron correctamente'

        },
        onDeleteAccion: (state) => {
            const accionActiva = state.activeAccion
            for (let i = 0; i < accionActiva.length; i++) {
                const element = accionActiva[i].id;
                if (element) {
                    state.listAccion = state.listAccion.filter(accionPersonal => accionPersonal.id !== element);
                    state.activeAccion = [];
                    state.inicialAccion = [];
                    state.mensajeAccion = 'Los datos se han eliminado correctamente'
                }
            }
        },
        onLoadAccion: (state, { payload }) => {
            state.isLoadingAccion = false;
            payload.forEach(accionPersonal => {
                const exist = state.listAccion.some(dbaccionPersonal => dbaccionPersonal.id === accionPersonal.id);
                if (!exist) {
                    state.listAccion.push(accionPersonal)
                }
            });
        },
        clearMessageAccion: (state) => {
            state.mensajeAccion = null;
        }
    }
})

export const { onSetActiveAccion, onAddNewAccion, onUpdateAccion, onDeleteAccion, onLoadAccion, clearMessageAccion } = accionPersonalSlice.actions