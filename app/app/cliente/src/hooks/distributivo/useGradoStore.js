import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveGrado, onAddNewGrado, onUpdateGrado, onDeleteGrado, onLoadGrado, clearMessageGrado } from '../../store';
import { rhApi } from '../../api';

export const useGradoStore = () => {
    const dispatch = useDispatch();

    const { listGrado, activeGrado, mensajeGrado, isLoadingGrado } = useSelector(state => state.grados)
    
    const startLoadingGrado = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/grado/');
            dispatch(onLoadGrado(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingGrado = async (grado) => {
        if (grado.id) {
            await rhApi.put(`/distributivo/grado/${grado.id}/`, grado)
            dispatch(onUpdateGrado({ ...grado }))
        } else {
            await rhApi.post('/distributivo/grado/', grado);
            dispatch(onAddNewGrado({ ...grado }))
        }
        setTimeout(() => {
            dispatch(clearMessageGrado());
        }, 3000);
        startLoadingGrado();
    }

    const startDeletingGrado = async (grado) => {
        try {
            if (grado.id) {
                await rhApi.delete(`/distributivo/grado/${grado.id}`)
            }
            dispatch(onDeleteGrado({...grado}));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar la grado presupuestaria')
        }

        setTimeout(() => {
            dispatch(clearMessageGrado());
        }, 3000);
        startLoadingGrado();
    }

    const setActiveGrado = (grado) => {
        dispatch(onSetActiveGrado(grado))
    }


    return {
        //*Propiedades
        listGrado,
        activeGrado,
        mensajeGrado,
        isLoadingGrado,
        //*Metodos
        startSavingGrado,
        startLoadingGrado,
        startDeletingGrado,
        setActiveGrado,
    }

}