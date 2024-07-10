import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewPermiso, onDeletePermiso, onLoadPermiso, onSetActivePermiso, onUpdatePermiso, clearMessagePermiso } from '../../store';
import { rhApi } from '../../api';

export const usePermisoStore = () => {
  const dispatch = useDispatch();
  const { listPermiso, activePermiso, mensajePermiso, isLoadingPermiso } = useSelector(state => state.permiso)

  const startLoadingPermiso = async () => {
    try {
      const { data } = await rhApi.get('/permisos/permiso/');
      dispatch(onLoadPermiso(data))
    } catch (error) {
      console.log(error)
    }
  }

  const startSavingPermiso = async (permiso) => {
    if (permiso.id) {
      await rhApi.put(`/permisos/permiso/${permiso.id}/`, permiso)
      dispatch(onUpdatePermiso({ ...permiso }))
    } else {
      await rhApi.post('/permisos/permiso/', permiso);
      dispatch(onAddNewPermiso({ ...permiso }))
    }

    setTimeout(() => {
      dispatch(clearMessagePermiso());
    }, 3000);
    startLoadingPermiso();
  }

  const startDeletingPermiso = async () => {
    try {
      for (let i = 0; i < activePermiso.length; i++) {
        const element = activePermiso[i].id;
        if (element) {
          await rhApi.delete(`/permisos/permiso/${element}`)
        }
      }
      dispatch(onDeletePermiso());
    } catch (error) {
      console.log(error)
      console.log('Error al eliminar el permiso')
    }

    setTimeout(() => {
      dispatch(clearMessagePermiso());
    }, 3000);
    startLoadingPermiso();
  }

  const setActivePermiso = (permiso) => {
    dispatch(onSetActivePermiso(permiso))
  }


  return {
    //*Propiedades
    listPermiso,
    activePermiso,
    mensajePermiso,
    isLoadingPermiso,
    //*Metodos
    startSavingPermiso,
    startLoadingPermiso,
    startDeletingPermiso,
    setActivePermiso,
  }
}
