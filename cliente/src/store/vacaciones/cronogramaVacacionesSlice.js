import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const cronogramaVacacionesSlice = createSlice({
    name: 'cronogramaVacaciones',
    initialState: {
        isLoadingCronograma: true,
        activeCronograma: [],
        listCronograma: [],
        inicialCronograma: [],
        mensajeCronograma: null
    },
    reducers: {
        onSetActiveCronograma: (state, { payload }) => {
            state.activeCronograma = payload;
            state.inicialCronograma = [];
            if (state.activeCronograma.length === 1) {
                state.inicialCronograma = payload[0].listCronograma;
            }
        },
        onAddNewCronograma: (state, { payload }) => {
            //state.listCronograma.push(payload);
            state.activeCronograma = [];
            state.inicialCronograma = []
            state.mensajeCronograma = 'Los datos se han guardado correctamente';
        },
        onUpdateCronograma: (state, { payload }) => {
            state.listCronograma = state.listCronograma.map(cronograma => {
                if (cronograma.id === payload.id) {
                    return payload
                }
                return cronograma
            })
            state.mensajeCronograma = 'Los datos se actualizaron correctamente'
        },
        onDeleteCronograma: (state) => {
            const cronogramaActivo = state.activeCronograma
            for (let i = 0; i < cronogramaActivo.length; i++) {
                const element = cronogramaActivo[i].id;
                if (element) {
                    state.listCronograma = state.listCronograma.filter(cronograma => cronograma.id !== element);
                    state.activeCronograma = [];
                    state.inicialCronograma = [];
                    state.mensajeCronograma = 'Los datos se han eliminado correctamente'
                }
            }
        },
        onLoadCronograma: (state, { payload }) => {
            state.isLoadingCronograma = false;
            payload.forEach(cronograma => {
                const exist = state.listCronograma.some(dbcronograma => dbcronograma.id === cronograma.id);
                if (!exist) {
                    state.listCronograma.push(cronograma)
                }
            });
        },
        clearMessageCronograma: (state) => {
            state.mensajeCronograma = null;
        }
    }
})

export const { onSetActiveCronograma, onAddNewCronograma, onUpdateCronograma, onDeleteCronograma, onLoadCronograma, clearMessageCronograma } = cronogramaVacacionesSlice.actions
