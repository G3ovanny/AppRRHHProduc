import { createSlice } from '@reduxjs/toolkit'

export const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: {
        isLoadingUsuario: true,
        activeUsuario: [],
        listUsuario: [],
        inicialUsuario: [],
        mensajeUsuario: null,
        mensajeErrorUsuario: null,
    },
    reducers: {
        onSetActiveUsuario: (state, { payload }) => {
            state.activeUsuario = payload;
            state.inicialUsuario = [];
            if (state.activeUsuario.length === 1) {
                state.inicialUsuario = payload[0].listUsuario;
            }
        },

        onAddNewUsuario: (state, { payload }) => {
            //state.listUsuario.push(payload);
            state.activeUsuario = [];
            state.inicialUsuario = []
            state.mensajeUsuario = 'Los datos se han guardado correctamente';
        },

        onUpdateUsuario: (state, { payload }) => {
            state.listUsuario = state.listUsuario.map(usuario => {
                if (usuario.id === payload.id) {
                    return payload
                }
                return usuario
            })
            state.mensajeUsuario = 'Los datos se actualizaron correctamente'
        },

        onDeleteUsuario: (state) => {
            const usuarioActivo = state.activeUsuario
            for (let i = 0; i < usuarioActivo.length; i++) {
                const element = usuarioActivo[i].id;
                if (element) {
                    state.listUsuario = state.listUsuario.filter(usuario => usuario.id !== element);
                    state.activeUsuario = [];
                    state.inicialUsuario = [];
                    state.mensajeUsuario = 'Los datos se han eliminado correctamente'
                }
            }
        },

        onLoadUsuario: (state, { payload }) => {
            state.isLoadingUsuario = false;
            //state.listUsuario = payload
            payload.forEach(usuario => {
                const exist = state.listUsuario.some(dbusuario => dbusuario.id === usuario.id);
                if (!exist) {
                    state.listUsuario.push(usuario)
                }
            });
        },

        onChangeMessageUsuario: (state, { payload }) => {
            state.mensajeUsuario = payload
        },
        onChangeErrorMessageUser: (state, { payload }) => {
            state.mensajeErrorUsuario = payload
        },

        clearMessageUsuario: (state) => {
            state.mensajeUsuario = null;
            state.mensajeErrorUsuario = null;
        }
    }
})
export const {
    onSetActiveUsuario,
    onAddNewUsuario,
    onUpdateUsuario,
    onDeleteUsuario,
    onLoadUsuario,
    onChangeMessageUsuario,
    clearMessageUsuario,
    onChangeErrorMessageUser,
} = usuariosSlice.actions
