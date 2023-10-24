import { createSlice } from "@reduxjs/toolkit";

export const grupoSlice = createSlice({
    name: 'grupo',
    initialState: {
        isLoadingGrupo: true,
        activeGrupo: [],
        listGrupo: [],
        inicialGrupo: [],
        mensajeGrupo: null,
    },
    reducers: {
        onLoadGrupo: (state, { payload }) => {
            state.isLoadingGrupo = false;
            payload.forEach(grupo => {
                const exist = state.listGrupo.some(dbgrupo => dbgrupo.id === grupo.id);
                if (!exist) {
                    state.listGrupo.push(grupo)
                }
            })
        },
    }
})

export const { onLoadGrupo } = grupoSlice.actions;