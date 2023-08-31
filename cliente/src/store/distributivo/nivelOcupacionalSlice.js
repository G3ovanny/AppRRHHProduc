import { createSlice } from "@reduxjs/toolkit";

export const nivelOcupacionalSlice = createSlice({
    name: 'nivelOcupacional',
    initialState: {
        isLoadingNivel: true,
        activeNivel: [],
        listNivel: [],
        inicialNivel: [],
        mensaje: null
    },
    reducers: {
        onSetActiveNivel: (state, { payload }) => {
            state.activeNivel = payload;
            state.inicialNivel = [];
            if (state.activeNivel.length === 1) {
                state.inicialNivel = payload[0].listNivel;
            }
        },
        onAddNewNivel: (state, { payload }) => {
            //state.listNivel.push(payload);
            state.activeNivel = [];
            state.inicialNivel = []
            state.mensaje = 'Los datos se han guardado correctamente';
        },
        onUpdateNivel: (state, { payload }) => {
            state.listNivel = state.listNivel.map(nivelOcupacional => {
                if (nivelOcupacional.id === payload.id) {
                    return payload
                }
                return nivelOcupacional
            })
            state.mensaje = 'Los datos se actualizaron correctamente'
        },
        onDeleteNivel: (state, { payload }) => {
            if (payload.id) {
                state.listNivel = state.listNivel.filter(nivelOcupacional => nivelOcupacional.id !== payload.id);
                state.activeNivel = [];
                state.inicialNivel = [];
                state.mensaje = 'Los datos se han eliminado correctamente'
            }
        },
        onLoadNivel: (state, { payload }) => {
            state.isLoadingNivel = false;
            payload.forEach(nivelOcupacional => {
                const exist = state.listNivel.some(dbnivelOcupacional => dbnivelOcupacional.id === nivelOcupacional.id);
                if (!exist) {
                    state.listNivel.push(nivelOcupacional)
                }
            });
        },
        clearMessageNivel: (state) => {
            state.mensaje = null;
        }
    }
})

export const { onSetActiveNivel, onAddNewNivel, onUpdateNivel, onDeleteNivel, onLoadNivel, clearMessageNivel } = nivelOcupacionalSlice.actions