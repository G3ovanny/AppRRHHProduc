import { createSlice } from "@reduxjs/toolkit";

export const trabajadorSlice = createSlice({
    name: 'trabajador',
    initialState: {
        isLoadingTrab: true,
        activeTrab: [],
        trabajadores: [],
        inicialTrab: [],
        mensaje: null,
        mensajesError: null
    },
    reducers: {
        onSetActiveTrab: (state, { payload }) => {
            state.activeTrab = payload;
            state.inicialTrab = [];
            if (state.activeTrab.length === 1) {
                state.inicialTrab = payload[0].trabajadores;
            }
        },
        onAddNewTrab: (state, { payload }) => {
            //state.trabajadores.push(payload);
            state.activeTrab = [];
            state.inicialTrab = []
            state.mensaje = 'Los datos se han guardado correctamente';
        },
        onUpdateTrab: (state, { payload }) => {
            state.trabajadores = state.trabajadores.map(trabajador => {
                if (trabajador.id === payload.id) {
                    return payload
                }
                return trabajador
            })
            state.mensaje = 'Los datos se actualizaron correctamente'
        },
        onDeleteTrab: (state) => {
            const trabActivo = state.activeTrab
            for (let i = 0; i < trabActivo.length; i++) {
                const element = trabActivo[i].id;
                if (element) {
                    state.trabajadores = state.trabajadores.filter(trabajador => trabajador.id !== element);
                    state.activeTrab = [];
                    state.inicialTrab = [];
                    state.mensaje = 'Los datos se han eliminado correctamente'
                }
            }
        },
        onLoadTrab: (state, { payload }) => {
            state.isLoadingTrab = false;
            payload.forEach(trabajador => {
                const exist = state.trabajadores.some(dbTrabajador => dbTrabajador.id === trabajador.id);
                if (!exist) {
                    state.trabajadores.push(trabajador)
                }
            });
        },
        onSendEmailDates: (state, { payload }) => {
            console.log(state.mensajesError = payload)
        },
        onClearMessage: (state) => {
            state.mensaje = null;
            state.mensajesError = null;
        }

    }
})

export const { onSetActiveTrab, onAddNewTrab, onUpdateTrab, onDeleteTrab, onLoadTrab, onSendEmailDates, onClearMessage } = trabajadorSlice.actions