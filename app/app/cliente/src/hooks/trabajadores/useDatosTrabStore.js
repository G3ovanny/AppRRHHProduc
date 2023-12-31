import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessageDatos, onAddNewDatos, onDeleteDatos, onLoadDatos, onSetActiveDatos, onUpdateDatos } from '../../store'
import { rhApi } from '../../api'

export const useDatosTrabStore = () => {

    const dispatch = useDispatch()

    const { activeDatos, inicialDatos, datosTrab, isLoadingDatos } = useSelector(state => state.datosTrabajadores)
    
    const setActiveDatosTrab = (datosTrab) => {
        dispatch(onSetActiveDatos(datosTrab))
    }

    const startSavingDatosTrab = async (datosTrab) => {
        console.log(datosTrab)
        let url;
        for (let i = 0; i < datosTrab.length; i++) {
            const element = datosTrab[i];
            console.log(element)
            if (element.id) {
                url = `/trabajadores/datos_trabajador/${element.id}/`
                await rhApi.put(url, element)
                dispatch(onUpdateDatos({ ...element }))
            } else {
                url = '/trabajadores/datos_trabajador/'
                await rhApi.post(url, element);
                dispatch(onAddNewDatos({ ...element }))
            }
        }

    }

    const startSavingListDatosTrab = async (datosTrab = []) => {
        for (let i = 0; i < datosTrab.length; i++) {
            const datoTrab = datosTrab[i];
            if (datoTrab.id) {
                await rhApi.put(`/trabajadores/datos_trabajador/${datoTrab.id}/`, datoTrab)
                dispatch(onUpdateDatos({ ...datoTrab }))
            } else {
                await rhApi.post('/trabajadores/datos_trabajador/', datoTrab);
                dispatch(onAddNewDatos({ ...datoTrab }))
            }
        }
    }

    const startLoadingDatosTrab = async () => {
        try {
            const { data } = await rhApi.get('/trabajadores/datos_trabajador/');
            dispatch(onLoadDatos(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startDeletingDatosTrab = async () => {
        try {
            for (let i = 0; i < activeDatos.length; i++) {
                const element = activeDatos[i].id;
                if (element) {
                    await rhApi.delete(`/trabajadores/datos_trabajador/${element}`)
                }
            }
            dispatch(onDeleteDatos());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar los datos del servidor')
        }
        setTimeout(() => {
            dispatch(clearMessageDatos());
        }, 3000);
    }

    return {
        //*Propiedades
        inicialDatos,
        datosTrab,
        activeDatos,
        isLoadingDatos,
        //*Metodos
        setActiveDatosTrab,
        startSavingDatosTrab,
        startLoadingDatosTrab,
        startDeletingDatosTrab,
        startSavingListDatosTrab,
    }
}