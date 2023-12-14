import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpen: false,
        nameModal: null
    },

    reducers: {
        onOpenModal: (state, { payload }) => {
            state.isModalOpen = true;
            state.nameModal = payload;
        },
        onCloseModal: (state, { payload }) => {
            state.nameModal = null
            state.isModalOpen = false
        }
    }

})

export const { onOpenModal, onCloseModal } = modalSlice.actions
