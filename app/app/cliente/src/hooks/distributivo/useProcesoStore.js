import { useDispatch, useSelector } from 'react-redux'
import { onAddNewProceso, onClearMessageProceso, onDeleteProceso, onLoadProceso, onSetActiveProceso, onUpdateProceso } from '../../store/distributivo/procesoSlice'
import { rhApi } from '../../api'

export const useProcesoStore = () => {
    const dispatch = useDispatch()
    const { listProceso, activeProceso, mensajeProceso, isLoadingProceso } = useSelector(state => state.proceso)
    
    const startLoadingProceso = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/proceso/');
            dispatch(onLoadProceso(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingProceso = async (proceso) => {
        if (proceso.id) {
            await rhApi.put(`/distributivo/proceso/${proceso.id}/`, proceso)
            dispatch(onUpdateProceso({ ...proceso }))
        } else {
            await rhApi.post('/distributivo/proceso/', proceso);
            dispatch(onAddNewProceso({ ...proceso }))
        }
        setTimeout(() => {
            dispatch(onClearMessageProceso());
        }, 3000);
        
        startLoadingProceso();
    }

    const startDeletingProceso = async (proceso) => {
        try {
            if (proceso.id) {
                await rhApi.delete(`/distributivo/proceso/${proceso.id}`)
            }
            dispatch(onDeleteProceso({ ...proceso }));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el proceso')
        }
        setTimeout(() => {
            dispatch(onClearMessageProceso());
        }, 3000);

        startLoadingProceso();
    }

    const setActiveProceso = (proceso) => {
        dispatch(onSetActiveProceso(proceso))
    }
    return {

        //*PROPIEDADES
        listProceso,
        activeProceso,
        mensajeProceso,
        isLoadingProceso,

        //*METODOS
        startSavingProceso,
        startLoadingProceso,
        startDeletingProceso,
        setActiveProceso,

    }
}
