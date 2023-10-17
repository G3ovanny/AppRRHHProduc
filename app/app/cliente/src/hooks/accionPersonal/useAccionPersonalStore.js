import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rhApi } from '../../api';
import { onAddNewAccion, onDeleteAccion, onLoadAccion, onSetActiveAccion, onUpdateAccion, clearMessageAccion } from '../../store/accionPersonal';


export const useAccionPersonalStore = () => {
    const dispatch = useDispatch();

    const { listAccion, activeAccion, mensajeAccion, isLoadingAccion} = useSelector(state => state.accionPersonal)

    const startLoadingAccion = async () => {
        try {
            const { data } = await rhApi.get('/acciones/accion/');
            dispatch(onLoadAccion(data))
        } catch (error) {
            console.log(error)
        }
    }
    const startSavingAccion = async (accion) => {
        if (accion.id) {
            await rhApi.put(`/acciones/accion/${accion.id}/`, accion)
            dispatch(onUpdateAccion({ ...accion }))
        } else {
            await rhApi.post(`/acciones/accion/`, accion);
            dispatch(onAddNewAccion({ ...accion }))
        }
        setTimeout(() => {
            dispatch(clearMessageAccion());
        }, 3000);
    }
    const startDeletingAccion = async () => {
        try {
            for (let i = 0; i < activeAccion.length; i++) {
                const element = activeAccion[i].id;
                if (element) {
                    await rhApi.delete(`/acciones/accion/${element}`)
                }
            }
            dispatch(onDeleteAccion());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el permiso')
        }
        setTimeout(() => {
            dispatch(clearMessageAccion());
        }, 3000);
    }
    const setActiveAccion = (accion) => {
        dispatch(onSetActiveAccion(accion))
    }

    return {
        //*Propiedades
        listAccion,
        activeAccion,
        mensajeAccion,
        isLoadingAccion,
        //*Metodos
        startSavingAccion,
        startLoadingAccion,
        startDeletingAccion,
        setActiveAccion,
    }
}
