import { createSlice } from '@reduxjs/toolkit'


export const motivoPermisoSlice = createSlice({
    name: 'motivoPermiso',
    initialState: {
        isLoadingMotivo: true,
        activeMotivo: [],
        listMotivo: [],
        inicialMotivo: [],
        mensajeMotivo: null
    },
    reducers: {
        onSetActiveMotivo: (state, { payload }) => {
            state.activeMotivo = payload;
            state.inicialMotivo = [];
            if (state.activeMotivo.length === 1) {
                state.inicialMotivo = payload[0].listMotivo;
            }
        },
        onAddNewMotivo: (state, { payload }) => {
            //state.listMotivo.push(payload);
            state.activeMotivo = [];
            state.inicialMotivo = []
            state.mensajeMotivo = 'Los datos se han guardado correctamente';
        },
        onUpdateMotivo: (state, { payload }) => {
            state.listMotivo = state.listMotivo.map(motivoPermiso => {
                if (motivoPermiso.id === payload.id) {
                    return payload
                }
                return motivoPermiso
            })
            state.mensajeMotivo = 'Los datos se actualizaron correctamente'
        },
        onDeleteMotivo: (state) => {
            const motivoActivo = state.activeMotivo
            for (let i = 0; i < motivoActivo.length; i++) {
                const element = motivoActivo[i].id;
                if (element) {
                    state.listMotivo = state.listMotivo.filter(motivoPermiso => motivoPermiso.id !== element);
                    state.activeMotivo = [];
                    state.inicialMotivo = [];
                    state.mensajeMotivo = 'Los datos se han eliminado correctamente'
                }
            }
        },
        onLoadMotivo: (state, { payload }) => {
            state.isLoadingMotivo = false;
            payload.forEach(motivoPermiso => {
                const exist = state.listMotivo.some(dbmotivoPermiso => dbmotivoPermiso.id === motivoPermiso.id);
                if (!exist) {
                    state.listMotivo.push(motivoPermiso)
                }
            });
        },
        clearMessageMotivo: (state) => {
            state.mensajeMotivo = null;
        }
    }
})

export const { onSetActiveMotivo, onAddNewMotivo, onUpdateMotivo, onDeleteMotivo, onLoadMotivo, clearMessageMotivo } = motivoPermisoSlice.actions

