import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const permisotrabSlice = createSlice({
  name: 'permisoTrab',
  initialState: {
    isLoadingPermisoTrab: true,
    activeTrab: [],
    activePermisoTrab: [],
    listPermisoTrab: [],
    listVacacionestrab:[],
    inicialPermisoTrab: [],
    mensajePermisoTrab: null,
  },
  reducers: {
    onSetActivePermisoTrab: (state, { payload }) => {
      state.activePermisoTrab= payload;
      if (state.activePermisoTrab.length === 1) {
        state.inicialPermisoTrab = payload[0].listPermisoTrab;
      }
    },
    onAddNewPermisoTrab: (state, { payload }) => {
      state.activePermisoTrab= [];
      state.inicialPermisoTrab = [];
      state.mensajePermisoTrab = 'Los datos se han guardado correctamente';
      //state.listPermisoTrab.push(payload);
    },
    onUpdatePermisoTrab: (state, { payload }) => {
      state.listPermisoTrab = state.listPermisoTrab.map(permisoTrab=> {
        if (permiso.id === payload.id) {
          return payload
        }
        return permiso
      })
      state.mensajePermisoTrab = 'Los datos se actualizaron correctamente'
    },
    onDeletePermisoTrab: (state) => {
      const permisoActivoTrab = state.activePermisoTrab
      for (let i = 0; i < permisoActivoTrab.length; i++) {
        const element = permisoActivoTrab[i].id;
        if (element) {
          state.listPermisoTrab = state.listPermisoTrab.filter(permisoTrab=> permisoTrab.id !== element);
          state.activePermisoTrab= [];
          state.inicialPermisoTrab = [];
          state.mensajePermisoTrab = 'Los datos se han eliminado correctamente'
        }
      }
    },
    onLoadPermisoTrab: (state, { payload }) => {
      const listaPermi = payload.permisos
      listaPermi.forEach(permisoTrab=> {
        const exist = state.listPermisoTrab.some(dbpermisoTrab=> dbpermisoTrab.id === permisoTrab.id);
        if (!exist) {
          state.listPermisoTrab.push(permisoTrab)
        }
      });
    },

    clearMessagePermisoTrab: (state) => {
      state.mensajePermisoTrab = null;
    }
  }
})

export const { onSetActivePermisoTrab, onAddNewPermisoTrab, onUpdatePermisoTrab, onDeletePermisoTrab, onLoadPermisoTrab, clearMessagePermisoTrab } = permisotrabSlice.actions

