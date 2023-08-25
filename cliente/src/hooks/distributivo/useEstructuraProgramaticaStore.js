import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEstructura, onDeleteEstructura, onLoadEstructura, onSetActiveEstructura, onUpdateEstructura } from '../../store';
import { rhApi } from '../../api';

export const useEstructuraProgramaticaStore = () => {
    const dispatch = useDispatch();

    const { listEstructura, activeEstructura, clearMessageEstructura } = useSelector(state => state.estructura)

    const startLoadingEstructura = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/estructura/');
            dispatch(onLoadEstructura(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingEstructura = async (estructura) => {
        if (estructura.id) {
            await rhApi.put(`/distributivo/estructura/${estructura.id}/`, estructura)
            dispatch(onUpdateEstructura({ ...estructura }))
        } else {
            await rhApi.post('/distributivo/estructura/', estructura);
            dispatch(onAddNewEstructura({ ...estructura }))
        }
    }

    const startDeletingEstructura = async (estructura) => {
        const element = estructura.id
        try {
            if (element) {
                await rhApi.delete(`/distributivo/estructura/${element}`)
            }
            dispatch(onDeleteEstructura());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar la estructura presupuestaria')
        }

        setTimeout(() => {
            dispatch(clearMessageEstructura());
        }, 3000);
    }

    const setActiveEstructura = (estructura) => {
        dispatch(onSetActiveEstructura(estructura))
    }


    return {
        //*Propiedades
        listEstructura,
        activeEstructura,
        //*Metodos
        startSavingEstructura,
        startLoadingEstructura,
        startDeletingEstructura,
        setActiveEstructura,
    }

}