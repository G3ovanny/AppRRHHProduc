import { createSlice } from '@reduxjs/toolkit'

export const archivoCronogramaSlice = createSlice({
    name: 'archivoCronograma',
    initialState: {
        isLoadingArchivoCron: false,
        activeArchivoCron: [],
        archivosCron: [],
        inicialArchivoCron: [],
        mensajeArchivoCron: null
    },
    reducers: {
        onSetActiveArchivoCron: (state, { payload }) => {
            state.activeArchivoCron = payload;
            state.inicialArchivoCron = [];
            if (state.activeArchivoCron.length === 1) {
                state.inicialArchivoCron = payload[0].archivosCron
            }
        },
        onAddNewArchivoCron: (state, { payload }) => {
            state.archivosCron.push(payload);
            state.mensajeArchivoCron = payload;
            state.activeArchivoCron = [];
            state.inicialArchivoCron = []
        },
        onUpdateArchivoCron: (state, { payload }) => {
            state.archivosCron = state.archivosCron.map(archivoCron => {
                if (archivoCron.id === payload.id) {
                    return payload
                }
                return archivoCron
            })
            state.mensajeArchivoCron = 'Los datos se actualizaron correctamente'
        },
        onLoadArchivoCron: (state, { payload }) => {
            state.isLoadingArchivoCron = true;
            payload.forEach(archivoCron => {
                const exist = state.archivosCron.some(dbArchivoCron => dbArchivoCron.id === archivo.id);
                if (!exist) {
                    state.archivosCron.push(archivoCron)
                }
            });
        },
        clearMessageArchivoCron: (state) => {
            state.mensajeArchivoCron = null
        },
    }
})

export const { onSetActiveArchivoCron, onAddNewArchivoCron, onUpdateArchivoCron, onLoadArchivoCron, clearMessageArchivoCron } = archivoCronogramaSlice.actions