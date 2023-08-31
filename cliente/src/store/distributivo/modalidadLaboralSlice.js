import { createSlice } from "@reduxjs/toolkit";

export const modalidadLaboralSlice = createSlice({
    name: 'modalidadLaboral',
    initialState: {
        isLoadingModalidad: true,
        activeModalidad: [],
        listModalidad: [],
        inicialModalidad: [],
        mensajeModalidad: null
    },
    reducers: {
        onSetActiveModalidad: (state, { payload }) => {
            state.activeModalidad = payload;
            state.inicialModalidad = [];
            if (state.activeModalidad.length === 1) {
                state.inicialModalidad = payload[0].listModalidad;
            }
        },
        onAddNewModalidad: (state, { payload }) => {
            //state.listModalidad.push(payload);
            state.activeModalidad = [];
            state.inicialModalidad = []
            state.mensajeModalidad = 'Los datos se han guardado correctamente';
        },
        onUpdateModalidad: (state, { payload }) => {
            state.listModalidad = state.listModalidad.map(modalidadLaboral => {
                if (modalidadLaboral.id === payload.id) {
                    return payload
                }
                return modalidadLaboral
            })
            state.mensajeModalidad = 'Los datos se actualizaron correctamente'
        },
        onDeleteModalidad: (state, { payload }) => {
            if (payload.id) {
                state.listModalidad = state.listModalidad.filter(modalidadLaboral => modalidadLaboral.id !== payload.id);
                state.activeModalidad = [];
                state.inicialModalidad = [];
                state.mensajeModalidad = 'Los datos se han eliminado correctamente'
            }

        },
        onLoadModalidad: (state, { payload }) => {
            state.isLoadingModalidad = false;
            payload.forEach(modalidadLaboral => {
                const exist = state.listModalidad.some(dbmodalidadLaboral => dbmodalidadLaboral.id === modalidadLaboral.id);
                if (!exist) {
                    state.listModalidad.push(modalidadLaboral)
                }
            });
        },
        clearMessageModalidad: (state) => {
            state.mensajeModalidad = null;
        }
    }
})

export const { onSetActiveModalidad, onAddNewModalidad, onUpdateModalidad, onDeleteModalidad, onLoadModalidad, clearMessageModalidad } = modalidadLaboralSlice.actions