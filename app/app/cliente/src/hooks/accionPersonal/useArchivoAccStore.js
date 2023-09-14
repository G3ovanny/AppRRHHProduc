import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearMessageArchivoAcc, onAddNewArchivoAcc } from '../../store';
import { rhApi } from '../../api';

export const useArchivoAccStore = () => {
    const dispatch = useDispatch()

    const { mensajeArchivoAcc } = useSelector(state => state.archivoAcc);
    const startSavingArchivoAcc = async (archivo = []) => {

        if (archivo.id) {
            console.log(archivo)
        } else {
            const formData = new FormData();
            formData.append('doc', archivo)
            const { data } = await rhApi.post('/acciones/archivo/', formData);
            dispatch(onAddNewArchivoAcc(data));
        }
        setTimeout(() => {
            dispatch(clearMessageArchivoAcc());
        }, 3000);
    }
    return {
        //*Propiedades
        mensajeArchivoAcc,

        //*Metodos
        startSavingArchivoAcc,

    }
}