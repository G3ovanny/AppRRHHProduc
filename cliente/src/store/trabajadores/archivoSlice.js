import { createSlice } from "@reduxjs/toolkit";


export const archivoSlice = createSlice({
  name: 'archivo',
  initialState: {
    isLoadingArchivo: false,
    activeArchivo: [],
    archivos: [],
    inicialArchivo: [],
    mensaje: null
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
      state.mensaje = 'Los datos se han guardado correctamente';
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
      state.mensaje = 'Los datos se actualizaron correctamente'
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
    clearMessage: (state) => {
      state.mensaje = null
    },
  }
})

export const { onSetActiveArchivo, onAddNewArchivo, onUpdateArchivo, onLoadArchivo, clearMessage } = archivoSlice.actions