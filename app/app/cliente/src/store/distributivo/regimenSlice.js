import { createSlice } from "@reduxjs/toolkit";


export const regimenSlice = createSlice({
    name: 'regimen',
    initialState: {
        isLoadingReg: true,
        activeReg: [],
        listReg: [],
        inicialReg: [],
        mensaje: null
    },
    reducers: {
        onSetActiveReg: (state, { payload }) => {
            state.activeReg = payload;
            state.inicialReg = [];
            if (state.activeReg.length === 1) {
                state.inicialReg = payload[0].listReg;
            }
        },
        onAddNewReg: (state, { payload }) => {
            //state.listReg.push(payload);
            state.activeReg = [];
            state.inicialReg = []
            state.mensaje = 'Los datos se han guardado correctamente';
        },
        onUpdateReg: (state, { payload }) => {
            state.listReg = state.listReg.map(regimen => {
                if (regimen.id === payload.id) {
                    return payload
                }
                return regimen
            })
            state.mensaje = 'Los datos se actualizaron correctamente'
        },
        onDeleteReg: (state, { payload }) => {
            if (payload.id) {
                state.listReg = state.listReg.filter(regimen => regimen.id !== payload.id);
                state.activeReg = [];
                state.inicialReg = [];
                state.mensaje = 'Los datos se han eliminado correctamente'
            }
        },
        onLoadReg: (state, { payload }) => {
            state.isLoadingReg = false;
            payload.forEach(regimen => {
                const exist = state.listReg.some(dbregimen => dbregimen.id === regimen.id);
                if (!exist) {
                    state.listReg.push(regimen)
                }
            });
        },
        clearMessage: (state) => {
            state.mensaje = null;
        }
    }
})

export const { onSetActiveReg, onAddNewReg, onUpdateReg, onDeleteReg, onLoadReg, clearMessage } = regimenSlice.actions