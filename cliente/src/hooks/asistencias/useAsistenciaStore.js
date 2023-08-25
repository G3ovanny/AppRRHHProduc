import { useDispatch, useSelector } from 'react-redux'
import { rhApi } from '../../api';
import { onAddNewAsistencia, onDeleteAsistencia, onLoadAsistencia, onSetActiveAsistencia, onUpdateAsistencia } from '../../store';



export const useAsistenciaStore = () => {
    const dispatch = useDispatch();

    const { listAsistencia, activeAsistencia, clearMessageAsistencia } = useSelector(state => state.asistencia)

    const startLoadingAsistencia = async () => {
        try {
            const { data } = await rhApi.get('/asistencias/asistencia/');
            dispatch(onLoadAsistencia(data))
        } catch (error) {
            console.log(error)
        }
    }
    const startSavingAsistencia = async (asistencia) => {
        if (asistencia.id) {
            await rhApi.put(`/asistencias/asistencia/${asistencia.id}/`, asistencia)
            dispatch(onUpdateAsistencia({ ...asistencia }))
        } else {
            await rhApi.post(`/asistencias/asistencia/`, asistencia);
            dispatch(onAddNewAsistencia({ ...asistencia }))
        }
    }
    const startDeletingAsistencia = async () => {
        try {
            for (let i = 0; i < activeAsistencia.length; i++) {
                const element = activeAsistencia[i].id;
                if (element) {
                    await rhApi.delete(`/asistencias/asistencia/${element}`)
                }
            }
            dispatch(onDeleteAsistencia());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el permiso')
        }
        setTimeout(() => {
            dispatch(clearMessageAsistencia());
        }, 3000);
    }
    const setActiveAsistencia = (asistencia) => {
        dispatch(onSetActiveAsistencia(asistencia))
    }

    return {
        //*Propiedades
        listAsistencia,
        activeAsistencia,
        //*Metodos
        startSavingAsistencia,
        startLoadingAsistencia,
        startDeletingAsistencia,
        setActiveAsistencia,
    }
}

