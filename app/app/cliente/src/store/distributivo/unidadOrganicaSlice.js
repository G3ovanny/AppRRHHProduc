import { createSlice } from "@reduxjs/toolkit";

export const unidadOrganicaSlice = createSlice({
    name: 'unidadOrganica',
    initialState: {
        isLoadingUnidad: true,
        activeUnidad: [],
        listUnidad: [],
        inicialUnidad: [],
        mensajeUnidad: null
    },
    reducers: {
        onSetActiveUnidad: (state, { payload }) => {
            state.activeUnidad = payload;
            state.inicialUnidad = [];
            if (state.activeUnidad.length === 1) {
                state.inicialUnidad = payload[0].listUnidad;
            }
        },
        onAddNewUnidad: (state, { payload }) => {
            //state.listUnidad.push(payload);
            state.activeUnidad = [];
            state.inicialUnidad = []
            state.mensajeUnidad = 'Los datos se han guardado correctamente';
        },
        onUpdateUnidad: (state, { payload }) => {
            state.listUnidad = state.listUnidad.map(unidadOrganica => {
                if (unidadOrganica.id === payload.id) {
                    return payload
                }
                return unidadOrganica
            })
            state.mensajeUnidad = 'Los datos se actualizaron correctamente'
        },
        onDeleteUnidad: (state, { payload }) => {
            if (payload.id) {
                state.listUnidad = state.listUnidad.filter(unidadOrganica => unidadOrganica.id !== payload.id);
                state.activeUnidad = [];
                state.inicialUnidad = [];
                state.mensajeUnidad = 'Los datos se han eliminado correctamente'
            }
        },
        onLoadUnidad: (state, { payload }) => {
            state.isLoadingUnidad = false;
            payload.forEach(unidadOrganica => {
                const exist = state.listUnidad.some(dbunidadOrganica => dbunidadOrganica.id === unidadOrganica.id);
                if (!exist) {
                    state.listUnidad.push(unidadOrganica)
                }
            });
        },
        clearMessageUnidad: (state) => {
            state.mensajeUnidad = null;
        }
    }
})

export const { onSetActiveUnidad, onAddNewUnidad, onUpdateUnidad, onDeleteUnidad, onLoadUnidad, clearMessageUnidad } = unidadOrganicaSlice.actions