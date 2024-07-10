import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEstructura, onDeleteEstructura, onLoadEstructura, onSetActiveEstructura,clearMessageEstructura, onUpdateEstructura } from '../../store';
import { rhApi } from '../../api';

export const useEstructuraProgramaticaStore = () => {
    const dispatch = useDispatch();

    const { listEstructura, activeEstructura, mensajeEstructura, isLoadingEstructura } = useSelector(state => state.estructura)
    
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
        setTimeout(() => {
            dispatch(clearMessageEstructura());
        }, 3000);
        startLoadingEstructura();
    }

    const startDeletingEstructura = async (estructura) => {
        try {
            if (estructura.id) {
                await rhApi.delete(`/distributivo/estructura/${estructura.id}`)
            }
            dispatch(onDeleteEstructura({...estructura}));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar la estructura presupuestaria')
        }

        setTimeout(() => {
            dispatch(clearMessageEstructura());
        }, 3000);
        startLoadingEstructura();
    }

    const setActiveEstructura = (estructura) => {
        dispatch(onSetActiveEstructura(estructura))
    }


    return {
        //*Propiedades
        listEstructura,
        activeEstructura,
        mensajeEstructura,
        isLoadingEstructura,
        //*Metodos
        startSavingEstructura,
        startLoadingEstructura,
        startDeletingEstructura,
        setActiveEstructura,
    }

}