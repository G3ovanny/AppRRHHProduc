import { createSlice } from '@reduxjs/toolkit'



export const procesoSlice =createSlice({
    name: 'proceso',
    initialState: {
        isLoginProceso : true,
        activeProceso: [],
        listProceso: [],
        inicialProceso: [],
        mensajeProceso: null,
        mensajeError: null
    },
    reducers: {
        onSetActiveProceso: (state, { payload }) => {
            state.activeProceso = payload;
            state.inicialProceso = [];
            if (state.activeProceso.length === 1) {
                state.inicialProceso = payload[0].listProceso;
            }
        },
        onAddNewProceso: (state, { payload }) => {
            //state.activeProceso.push(payload);
            state.activeProceso = [];
            state.inicialProceso = []
            state.mensajeProceso = 'Los datos se han guardado correctamente';
        },
        onUpdateProceso: (state, { payload }) => {
            state.listProceso= state.listProceso.map(proceso =>{
                if (proceso.id === payload.id) {
                    return payload
                }
                return proceso
            })
            state.mensajeProceso = 'Los datos se actualizaron correctamente'
        },
        onDeleteProceso: (state, { payload }) => {
            if(payload.id){
                state.listProceso = state.listProceso.filter(proceso => proceso.id)
                state.activeProceso = [];
                state.inicialProceso = [];
                state.mensajeProceso = 'Los datos se han eliminado correctamente'
            }
        },
        onLoadProceso: (state, { payload }) => {
            state.isLoginProceso = false;
            payload.forEach(proceso => {
                const exist = state.listProceso.some(dbproceso => dbproceso.id === proceso.id);
                if (!exist) {
                    state.listProceso.push(proceso)
                }
            });
        },
        onErrorProceso: (state, { payload }) => {
            state.mensajeError = payload
        },
        onClearMessageProceso: (state) =>{
            state.mensajeProceso = null;
            state.mensajeError = null;
        },
    }
})

export const { onSetActiveProceso, onAddNewProceso, onUpdateProceso, onDeleteProceso, onLoadProceso, onErrorProceso, onClearMessageProceso } = procesoSlice.actions
