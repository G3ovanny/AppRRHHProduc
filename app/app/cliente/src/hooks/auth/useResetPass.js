import React from 'react'
import { rhApi } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { clearMesagesReset, onSendEmail } from '../../store/auth/resetPassSlice'

export const useResetPass = () => {
    const { mensajeResetPass, isCheckingUser } = useSelector(state => state.resetPassword)
    const dispatch = useDispatch();
    const startCheckUser = async (username) => {
        dispatch(onSendEmail)
        try {
            const { data } = await rhApi.post('reset_pass/', { username })
            dispatch(onSendEmail(data.message))
        } catch (error) {
            dispatch(onSendEmail(error.response.data.error))
        }
        setTimeout(() => {
            dispatch(clearMesagesReset());
        }, 20000)
    }

    return {
        //* Propiedades
        mensajeResetPass,
        isCheckingUser,
        //*Metodos
        startCheckUser,
    }
}
