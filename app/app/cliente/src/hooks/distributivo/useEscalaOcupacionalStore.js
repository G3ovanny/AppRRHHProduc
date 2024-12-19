import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveEscala, onAddNewEscala, onUpdateEscala, onDeleteEscala, onLoadEscala, clearMessageEscala } from '../../store';
import { rhApi } from '../../api';

export const useEscalaOcupacionalStore = () => {
    const dispatch = useDispatch();

    const { listEscala, activeEscala, mensajeEscala, isLoadingEscala } = useSelector(state => state.escalaOcupacional)
    
    const startLoadingEscala = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/escala/');
            dispatch(onLoadEscala(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingEscala = async (escala) => {
        if (escala.id) {
            await rhApi.put(`/distributivo/escala/${escala.id}/`, escala)
            dispatch(onUpdateEscala({ ...escala }))
        } else {
            await rhApi.post('/distributivo/escala/', escala);
            dispatch(onAddNewEscala({ ...escala }))
        }
        setTimeout(() => {
            dispatch(clearMessageEscala());
        }, 3000);
        startLoadingEscala();
    }

    const startDeletingEscala = async (escala) => {
        try {
            if (escala.id) {
                await rhApi.delete(`/distributivo/escala/${escala.id}`)
            }
            dispatch(onDeleteEscala({...escala}));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar la escala ocupacional')
        }

        setTimeout(() => {
            dispatch(clearMessageEscala());
        }, 3000);
        startLoadingEscala();
    }

    const setActiveEscala = (escala) => {
        dispatch(onSetActiveEscala(escala))
    }


    return {
        //*Propiedades
        listEscala,
        activeEscala,
        mensajeEscala,
        isLoadingEscala,
        //*Metodos
        startSavingEscala,
        startLoadingEscala,
        startDeletingEscala,
        setActiveEscala,
    }

}