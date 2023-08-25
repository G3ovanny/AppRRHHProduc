
import { createSlice } from '@reduxjs/toolkit';

//*InicialState

const initialState = {
    openItem: ['trabajadores'],
    openComponent: 'buttons',
    isOpenMenu: false,
    componentDrawerOpen: false
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        onOpenMenu: (state) => {
            state.isOpenMenu = true
        },
        onCloseMenu: (state) => {
            state.isOpenMenu = false
        },

        onOpenItem: (state, { payload }) => {
            state.openItem = payload.openItem
        }

    }
})
// Action creators are generated for each case reducer function
export const { onOpenMenu, onCloseMenu, onOpenItem } = menuSlice.actions