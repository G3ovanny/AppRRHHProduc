import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const datosPersonalesSlice = createSlice({
    name: 'datosdatosTrab',
    initialState: {
        isLoadingDatos: true,
        activeDatos: [],
        datosTrab: [],
        inicialDatos: [],
        mensajeDatos: null
    },
    reducers: {
        onSetActiveDatos: (state, { payload }) => {
            state.activeDatos = payload;
            state.inicialDatos = [];
            if (state.activeDatos.length === 1) {
                state.inicialDatos = payload[0].datosTrab;
            }
        },
        onAddNewDatos: (state, { payload }) => {
            //state.datosTrab.push(payload);
            state.activeDatos = [];
            state.inicialDatos = []
            state.mensajeDatos = 'Los datos se han guardado correctamente';
        },
        onUpdateDatos: (state, { payload }) => {
            state.datosTrab = state.datosTrab.map(datosTrab => {
                if (datosTrab.id === payload.id) {
                    return payload
                }
                return datosTrab
            })
            state.mensajeDatos = 'Los datos se actualizaron correctamente'
        },
        onDeleteDatos: (state) => {
            const trabActivo = state.activeDatos
            for (let i = 0; i < trabActivo.length; i++) {
                const element = trabActivo[i].id;
                if (element) {
                    state.datosTrab = state.datosTrab.filter(datosTrab => datosTrab.id !== element);
                    state.activeDatos = [];
                    state.inicialDatos = [];
                    state.mensajeDatos = 'Los datos se han eliminado correctamente'
                }
            }
        },
        onLoadDatos: (state, { payload }) => {
            state.isLoadingDatos = false;
            payload.forEach(datosTrab => {
                const exist = state.datosTrab.some(dbdatosTrab => dbdatosTrab.id === datosTrab.id);
                if (!exist) {
                    state.datosTrab.push(datosTrab)
                }
            });
        },
        clearMessageDatos: (state) => {
            state.mensajeDatos = null;
        }
    }
})

export const { onSetActiveDatos, onAddNewDatos, onUpdateDatos, onDeleteDatos, onLoadDatos, clearMessageDatos } = datosPersonalesSlice.actions