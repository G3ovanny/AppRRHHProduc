import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const estructuraProgramaticaSlice = createSlice({
    name: 'estructura',
    initialState: {
        isLoadinEstructura: true,
        activeEstructura: [],
        listEstructura: [],
        inicialEstructura: [],
        mensajeEstructura: null
    },
    reducers: {
        onSetActiveEstructura: (state, { payload }) => {
            state.activeEstructura = payload;
            state.inicialEstructura = [];
            if (state.activeEstructura.length === 1) {
                state.inicialEstructura = payload[0].listEstructura;
            }
        },
        onAddNewEstructura: (state, { payload }) => {
            //state.listEstructura.push(payload);
            state.activeEstructura = [];
            state.inicialEstructura = []
            state.mensajeEstructura = 'Los datos se han guardado correctamente';
        },
        onUpdateEstructura: (state, { payload }) => {
            state.listEstructura = state.listEstructura.map(estructuraProgramatica => {
                if (estructuraProgramatica.id === payload.id) {
                    return payload
                }
                return estructuraProgramatica
            })
            state.mensajeEstructura = 'Los datos se actualizaron correctamente'
        },
        onDeleteEstructura: (state, { payload }) => {
            if (payload.id) {
                state.listEstructura = state.listEstructura.filter(estructuraProgramatica => estructuraProgramatica.id !== payload.id);
                state.activeEstructura = [];
                state.inicialEstructura = [];
                state.mensajeEstructura = 'Los datos se han eliminado correctamente'
            }

        },
        onLoadEstructura: (state, { payload }) => {
            state.isLoadinEstructura = false;
            payload.forEach(estructuraProgramatica => {
                const exist = state.listEstructura.some(dbestructuraProgramatica => dbestructuraProgramatica.id === estructuraProgramatica.id);
                if (!exist) {
                    state.listEstructura.push(estructuraProgramatica)
                }
            });
        },
        clearMessageEstructura: (state) => {
            state.mensajeEstructura = null;
        }
    }
})

export const { onSetActiveEstructura, onAddNewEstructura, onUpdateEstructura, onDeleteEstructura, onLoadEstructura, clearMessageEstructura } = estructuraProgramaticaSlice.actions
