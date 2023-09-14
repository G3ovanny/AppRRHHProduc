import { createSlice } from "@reduxjs/toolkit";

export const denominacionPuestoSlice = createSlice({
    name: 'denominacionPuesto',
    initialState: {
        isLoadingDenominacion: true,
        activeDenominacion: [],
        listDenominacion: [],
        inicialDenominacion: [],
        mensajeDenominacion: null
    },
    reducers: {
        onSetActiveDenominacion: (state, { payload }) => {
            state.activeDenominacion = payload;
            state.inicialDenominacion = [];
            if (state.activeDenominacion.length === 1) {
                state.inicialDenominacion = payload[0].listDenominacion;
            }
        },
        onAddNewDenominacion: (state, { payload }) => {
            //state.listDenominacion.push(payload);
            state.activeDenominacion = [];
            state.inicialDenominacion = []
            state.mensajeDenominacion = 'Los datos se han guardado correctamente';
        },
        onUpdateDenominacion: (state, { payload }) => {
            state.listDenominacion = state.listDenominacion.map(denominacionPuesto => {
                if (denominacionPuesto.id === payload.id) {
                    return payload
                }
                return denominacionPuesto
            })
            state.mensajeDenominacion = 'Los datos se actualizaron correctamente'
        },
        onDeleteDenominacion: (state, { payload }) => {
            if (payload.id) {
                state.listDenominacion = state.listDenominacion.filter(denominacionPuesto => denominacionPuesto.id !== payload.id);
                state.activeDenominacion = [];
                state.inicialDenominacion = [];
                state.mensajeDenominacion = 'Los datos se han eliminado correctamente'
            }
        },
        onLoadDenominacion: (state, { payload }) => {
            state.isLoadingDenominacion = false;
            payload.forEach(denominacionPuesto => {
                const exist = state.listDenominacion.some(dbdenominacionPuesto => dbdenominacionPuesto.id === denominacionPuesto.id);
                if (!exist) {
                    state.listDenominacion.push(denominacionPuesto)
                }
            });
        },
        clearMessageDenominacion: (state) => {
            state.mensajeDenominacion = null;
        }
    }
})

export const { onSetActiveDenominacion, onAddNewDenominacion, onUpdateDenominacion, onDeleteDenominacion, onLoadDenominacion, clearMessageDenominacion } = denominacionPuestoSlice.actions
