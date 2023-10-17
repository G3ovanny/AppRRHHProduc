import { useDispatch, useSelector } from 'react-redux'
import { rhApi } from '../../api'
import { onAddNewTrab, onDeleteTrab, onLoadTrab, onSetActiveTrab, onUpdateTrab, onSendEmailDates, onClearMessage } from '../../store/trabajadores/trabajadorSlice'


export const useTrabStore = () => {

    const dispatch = useDispatch()

    const { activeTrab, inicialTrab, trabajadores, isLoadingTrab, mensaje, mensajesError } = useSelector(state => state.trabajador)

    const setActiveTrab = (trabajador) => {
        dispatch(onSetActiveTrab(trabajador))
    }

    const startSavingTrab = async (trabajador) => {
        if (trabajador.id) {
            await rhApi.put(`/trabajadores/trabajador/${trabajador.id}/`, trabajador)
            dispatch(onUpdateTrab({ ...trabajador }))
        } else {
            await rhApi.post('/trabajadores/trabajador/', trabajador);
            dispatch(onAddNewTrab({ ...trabajador }))
        }
        setTimeout(() => {
            dispatch(onClearMessage());
        }, 3000);
    }

    const startSavingListTrab = async (trabajadores = []) => {
        for (let i = 0; i < trabajadores.length; i++) {
            const trabajador = trabajadores[i];
            if (trabajador.id) {
                await rhApi.put(`/trabajadores/trabajador/${trabajador.id}/`, trabajador)
                dispatch(onUpdateTrab({ ...trabajador }))
            } else {
                await rhApi.post('/trabajadores/trabajador/', trabajador);
                dispatch(onAddNewTrab({ ...trabajador }))
            }
        }
    }

    const startLoadingTrab = async () => {
        try {
            const { data } = await rhApi.get('/trabajadores/trabajador/');
            dispatch(onLoadTrab(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startDeletingTrab = async () => {
        try {
            for (let i = 0; i < activeTrab.length; i++) {
                const element = activeTrab[i].id;
                if (element) {
                    await rhApi.delete(`/trabajadores/trabajador/${element}`)
                }
            }
            dispatch(onDeleteTrab());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar al trabajador')
        }
        setTimeout(() => {
            dispatch(onClearMessage());
        }, 3000);
    }

    const startSendEmailTrab = async () => {
        try {
            for (let i = 0; i < activeTrab.length; i++) {
                const id = activeTrab[i].id;
                if (id) {
                    await rhApi.post('/link/', {id})
                }
            }
            dispatch(onSendEmailDates());
        } catch (error) {
            const mensajeError = error.response.data.mensaje
            dispatch(onSendEmailDates(mensajeError));
        }
        setTimeout(() => {
            dispatch(onClearMessage());
        }, 3000);
    }
    return {
        //*Propiedades
        inicialTrab,
        trabajadores,
        activeTrab,
        isLoadingTrab,
        mensaje,
        mensajesError,
        //*Metodos
        setActiveTrab,
        startSavingTrab,
        startLoadingTrab,
        startDeletingTrab,
        startSavingListTrab,
        startSendEmailTrab,
    }
}
