import { createSlice } from "@reduxjs/toolkit";


export const archivoSlice = createSlice({
  name: 'archivo',
  initialState: {
    isLoadingArchivo: false,
    activeArchivo: [],
    archivos: [],
    inicialArchivo: [],
    mensajeArchivo: null
  },
  reducers: {
    onSetActiveArchivo: (state, { payload }) => {
      state.activeArchivo = payload;
      state.inicialArchivo = [];
      if (state.activeArchivo.length === 1) {
        state.inicialArchivo = payload[0].archivos
      }
    },
    onAddNewArchivo: (state, { payload }) => {
      state.archivos.push(payload);
      state.mensajeArchivo = payload;
      state.activeArchivo = [];
      state.inicialArchivo = []
    },
    onUpdateArchivo: (state, { payload }) => {
      state.archivos = state.archivos.map(archivo => {
        if (archivo.id === payload.id) {
          return payload
        }
        return archivo
      })
      state.mensajeArchivo = 'Los datos se actualizaron correctamente'
    },
    onLoadArchivo: (state, { payload }) => {
      state.isLoadingArchivo = true;
      payload.forEach(archivo => {
        const exist = state.archivos.some(dbArchivo => dbArchivo.id === archivo.id);
        if (!exist) {
          state.archivos.push(archivo)
        }
      });
    },
    onClearMessage: (state) => {
      state.mensajeArchivo = null
    },
  }
})

export const { onSetActiveArchivo, onAddNewArchivo, onUpdateArchivo, onLoadArchivo, onClearMessage } = archivoSlice.actions