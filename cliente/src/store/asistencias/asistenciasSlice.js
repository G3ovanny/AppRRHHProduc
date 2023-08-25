import { createSlice } from '@reduxjs/toolkit';

export const asistenciasSlice = createSlice({
    name: 'asistencia',
    initialState: {
        isLoadingAsistencia: true,
        activeAsistencia: [],
        listAsistencia: [],
        inicialAsistencia: [],
        mensajeAsistencia: null
    },
    reducers: {
        onSetActiveAsistencia: (state, { payload }) => {
            state.activeAsistencia = payload;
            state.inicialAsistencia = [];
            if (state.activeAsistencia.length === 1) {
                state.inicialAsistencia = payload[0].listAsistencia;
            }
        },
        onAddNewAsistencia: (state, { payload }) => {
            //state.listAsistencia.push(payload);
            state.activeAsistencia = [];
            state.inicialAsistencia = []
            state.mensajeAsistencia = 'Los datos se han guardado correctamente';
        },
        onUpdateAsistencia: (state, { payload }) => {
            state.listAsistencia = state.listAsistencia.map(asistencia => {
                if (asistencia.id === payload.id) {
                    return payload
                }
                return asistencia
            })
            state.mensajeAsistencia = 'Los datos se actualizaron correctamente'

        },
        onDeleteAsistencia: (state) => {
            const asistenciaActiva = state.activeAsistencia
            for (let i = 0; i < asistenciaActiva.length; i++) {
                const element = asistenciaActiva[i].id;
                if (element) {
                    state.listAsistencia = state.listAsistencia.filter(asistencia => asistencia.id !== element);
                    state.activeAsistencia = [];
                    state.inicialAsistencia = [];
                    state.mensajeAsistencia = 'Los datos se han eliminado correctamente'
                }
            }
        },
        onLoadAsistencia: (state, { payload }) => {
            state.isLoadingAsistencia = false;
            payload.forEach(asistencia => {
                const exist = state.listAsistencia.some(dbasistencia => dbasistencia.id === asistencia.id);
                if (!exist) {
                    state.listAsistencia.push(asistencia)
                }
            });
        },
        clearMessageAsistencia: (state) => {
            state.mensajeAsistencia = null;
        }
    }
})

export const { onSetActiveAsistencia, onAddNewAsistencia, onUpdateAsistencia, onDeleteAsistencia, onLoadAsistencia, clearMessageAsistencia } = asistenciasSlice.actions

