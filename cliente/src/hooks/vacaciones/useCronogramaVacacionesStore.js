import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewCronograma, onDeleteCronograma, onLoadCronograma, onSetActiveCronograma, onUpdateCronograma, onChangeMessageCreonograma, clearMessageCronograma } from '../../store';
import { rhApi } from '../../api';

export const useCronogramaVacacionesStore = () => {
    const dispatch = useDispatch();
    const { listCronograma, activeCronograma, mensajeCronograma } = useSelector(state => state.cronograma)

    const startLoadingCronograma = async () => {
        try {
            const { data } = await rhApi.get('/vacaciones/cronograma/');
            dispatch(onLoadCronograma(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingCronograma = async (cronograma) => {
        if (cronograma.id) {
            await rhApi.put(`/vacaciones/cronograma/${cronograma.id}/`, cronograma)
            dispatch(onUpdateCronograma({ ...cronograma }))
        } else {
            await rhApi.post('/vacaciones/cronograma/', cronograma);
            dispatch(onAddNewCronograma({ ...cronograma }))
        }
        setTimeout(() => {
            dispatch(clearMessageCronograma());
        }, 3000);
    }

    const startDeletingCrongrama = async () => {
        try {
            for (let i = 0; i < activeCronograma.length; i++) {
                const element = activeCronograma[i].id;
                if (element) {
                    await rhApi.delete(`/vacaciones/cronograma/${element}`)
                }
            }
            dispatch(onDeleteCronograma());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el cronograma')
        }

        setTimeout(() => {
            dispatch(clearMessageCronograma());
        }, 3000);
    }

    const setActiveCronograma = (cronograma) => {
        dispatch(onSetActiveCronograma(cronograma))
    }

    const setChangeMessageCronograma = (mensaje) => {
        dispatch(onChangeMessageCreonograma(mensaje))
        setTimeout(() => {
            dispatch(clearMessageCronograma());
        }, 3000);
    }


    return {
        //*Propiedades
        listCronograma,
        activeCronograma,
        mensajeCronograma,
        //*Metodos
        startSavingCronograma,
        startLoadingCronograma,
        startDeletingCrongrama,
        setActiveCronograma,
        setChangeMessageCronograma,
    }
}
