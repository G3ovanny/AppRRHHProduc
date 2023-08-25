import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewMotivo, onDeleteMotivo, onLoadMotivo, onSetActiveMotivo, onUpdateMotivo } from '../../store/permisos/';
import { rhApi } from '../../api';

export const useMotivoPermisoStore = () => {
  const dispatch = useDispatch();
  const { listMotivo, activeMotivo, clearMessageMotivo } = useSelector(state => state.motivoPermiso)


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
  }

  const startDeletingMotivo = async (motivo) => {
    const element = motivo.id
    try {
      if (element) {
        await rhApi.delete(`/permisos/motivo/${element}`)
      }
      dispatch(onDeleteMotivo());
    } catch (error) {
      console.log(error)
      console.log('Error al eliminar el motivo del permiso')
    }

    setTimeout(() => {
      dispatch(clearMessageMotivo());
    }, 3000);
  }

  const setActiveMotivo = (motivo) => {
    dispatch(onSetActiveMotivo(motivo))
  }
  return {
    //*Propiedades
    listMotivo,
    activeMotivo,
    //*Metodos
    startSavingMotivo,
    startLoadingMotivo,
    startDeletingMotivo,
    setActiveMotivo,
  }
}
