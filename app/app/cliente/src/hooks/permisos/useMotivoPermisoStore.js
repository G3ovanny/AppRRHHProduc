import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewMotivo, onDeleteMotivo, onLoadMotivo, onSetActiveMotivo, onUpdateMotivo, clearMessageMotivo } from '../../store/permisos/';
import { rhApi } from '../../api';

export const useMotivoPermisoStore = () => {
    const dispatch = useDispatch();
    const { listMotivo, activeMotivo, isLoadingMotivo, mensajeMotivo } = useSelector(state => state.motivoPermiso)


    const startLoadingMotivo = async () => {
        try {
            const { data } = await rhApi.get('/permisos/motivo/');
            dispatch(onLoadMotivo(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingMotivo = async (motivo) => {
        if (motivo.id) {
            await rhApi.put(`/permisos/motivo/${motivo.id}/`, motivo)
            dispatch(onUpdateMotivo({ ...motivo }))
        } else {
            await rhApi.post('/permisos/motivo/', motivo);
            dispatch(onAddNewMotivo({ ...motivo }))
        }
        setTimeout(() => {
            dispatch(clearMessageMotivo());
        }, 3000);
        startLoadingMotivo();
    }

    const startDeletingMotivo = async (motivo) => {
        try {
            if (motivo.id) {
                await rhApi.delete(`/permisos/motivo/${motivo.id}`)
            }
            dispatch(onDeleteMotivo({ ...motivo }));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el motivo del permiso')
        }
        setTimeout(() => {
            dispatch(clearMessageMotivo());
        }, 3000);
        startLoadingMotivo();
    }

    const setActiveMotivo = (motivo) => {
        dispatch(onSetActiveMotivo(motivo))
    }
    return {
        //*Propiedades
        listMotivo,
        activeMotivo,
        mensajeMotivo,
        isLoadingMotivo,
        //*Metodos
        startSavingMotivo,
        startLoadingMotivo,
        startDeletingMotivo,
        setActiveMotivo,
    }
}
