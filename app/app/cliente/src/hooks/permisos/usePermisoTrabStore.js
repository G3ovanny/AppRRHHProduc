import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onLoadPermisoTrab } from '../../store';
import { rhApi } from '../../api';

export const usePermisoTrabStore = () => {
    const dispatch = useDispatch();
    const { listPermisoTrab } = useSelector(state => state.permisoTrab)


    const startLoadingPermisoTrab = async (id_trabajador) => {
        try {
            const { data } = await rhApi.get(`/permisos/permisos/?id_trabajador=${id_trabajador}`);
            dispatch(onLoadPermisoTrab(data))
        } catch (error) {
            console.log(error);
        }
    }
    return {
        //*Propiedades
        listPermisoTrab,
        //*Metodos
        startLoadingPermisoTrab,
    }
}
