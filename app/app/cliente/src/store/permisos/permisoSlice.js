import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const permisoSlice = createSlice({
  name: 'permiso',
  initialState: {
    isLoadingPermiso: true,
    activePermiso: [],
    listPermiso: [],
    inicialPermiso: [],
    mensajePermiso: null,
  },
  reducers: {
    onSetActivePermiso: (state, { payload }) => {
      state.activePermiso = payload;
      state.inicialPermiso = [];
      if (state.activePermiso.length === 1) {
        state.inicialPermiso = payload[0].listPermiso;
      }
    },
    onAddNewPermiso: (state, { payload }) => {
      state.activePermiso = [];
      state.inicialPermiso = [];
      state.mensajePermiso = 'Los datos se han guardado correctamente';
      //state.listPermiso.push(payload);
    },
    onUpdatePermiso: (state, { payload }) => {
      state.listPermiso = state.listPermiso.map(permiso => {
        if (permiso.id === payload.id) {
          return payload
        }
        return permiso
      })
      state.mensajePermiso = 'Los datos se actualizaron correctamente'
    },
    onDeletePermiso: (state) => {
      const permisoActivo = state.activePermiso
      for (let i = 0; i < permisoActivo.length; i++) {
        const element = permisoActivo[i].id;
        if (element) {
          state.listPermiso = state.listPermiso.filter(permiso => permiso.id !== element);
          state.activePermiso = [];
          state.inicialPermiso = [];
          state.mensajePermiso = 'Los datos se han eliminado correctamente'
        }
      }
    },
    onLoadPermiso: (state, { payload }) => {
      state.isLoadingPermiso = false;
      //state.listPermiso = payload
      payload.forEach(permiso => {
        const exist = state.listPermiso.some(dbpermiso => dbpermiso.id === permiso.id);
        if (!exist) {
          state.listPermiso.push(permiso)
        }
      });
    },

    clearMessagePermiso: (state) => {
      state.mensajePermiso = null;
    }
  }
})

export const { onSetActivePermiso, onAddNewPermiso, onUpdatePermiso, onDeletePermiso, onLoadPermiso, clearMessagePermiso } = permisoSlice.actions

