import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const EscalaOcupacionalSlice = createSlice({
    name: 'escala',
    initialState: {
        isLoadingEscala: true,
        activeEscala: [],
        listEscala: [],
        inicialEscala: [],
        mensajeEscala: null
    },
    reducers: {
        onSetActiveEscala: (state, { payload }) => {
            state.activeEscala = payload;
            state.inicialEscala = [];
            if (state.activeEscala.length === 1) {
                state.inicialEscala = payload[0].listEscala;
            }
        },
        onAddNewEscala: (state, { payload }) => {
            //state.listEscala.push(payload);
            state.activeEscala = [];
            state.inicialEscala = []
            state.mensajeEscala = 'Los datos se han guardado correctamente';
        },
        onUpdateEscala: (state, { payload }) => {
            state.listEscala = state.listEscala.map(escala => {
                if (escala.id === payload.id) {
                    return payload
                }
                return escala
            })
            state.mensajeEscala = 'Los datos se actualizaron correctamente'
        },
        onDeleteEscala: (state, { payload }) => {
            if (payload.id) {
                state.listEscala = state.listEscala.filter(escala => escala.id !== payload.id);
                state.activeEscala = [];
                state.inicialEscala = [];
                state.mensajeEscala = 'Los datos se han eliminado correctamente'
            }

        },
        onLoadEscala: (state, { payload }) => {
            state.isLoadingEscala = false;
            payload.forEach(escala => {
                const exist = state.listEscala.some(dbescala => dbescala.id === escala.id);
                if (!exist) {
                    state.listEscala.push(escala)
                }
            });
        },
        clearMessageEscala: (state) => {
            state.mensajeEscala = null;
        }
    }
})

export const { onSetActiveEscala, onAddNewEscala, onUpdateEscala, onDeleteEscala, onLoadEscala, clearMessageEscala } = EscalaOcupacionalSlice.actions
