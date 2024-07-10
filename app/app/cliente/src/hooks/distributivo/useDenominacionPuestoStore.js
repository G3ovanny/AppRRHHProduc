import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewDenominacion, onDeleteDenominacion, onLoadDenominacion, onSetActiveDenominacion, onUpdateDenominacion, clearMessageDenominacion } from "../../store/distributivo";

export const useDenominacionPuestoStore = () => {
    const dispatch = useDispatch();

    const { listDenominacion, activeDenominacion, mensajeDenominacion, isLoadingDenominacion } = useSelector(state => state.denominacionPuesto)

    const startLoadingDenominacion = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/denominacion/');
            dispatch(onLoadDenominacion(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingDenominacion = async (denominacion) => {
        if (denominacion.id) {
            await rhApi.put(`/distributivo/denominacion/${denominacion.id}/`, denominacion)
            dispatch(onUpdateDenominacion({ ...denominacion }))
        } else {
            await rhApi.post('/distributivo/denominacion/', denominacion);
            dispatch(onAddNewDenominacion({ ...denominacion }))
        }
        setTimeout(() => {
            dispatch(clearMessageDenominacion());
        }, 3000);
        startLoadingDenominacion();
    }

    const startDeletingDenominacion = async (denominacion) => {
        try {
            if (denominacion.id) {
                await rhApi.delete(`/distributivo/denominacion/${denominacion.id}`)
            }
            dispatch(onDeleteDenominacion({ ...denominacion }));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el denominacion ocupacional')
        }

        setTimeout(() => {
            dispatch(clearMessageDenominacion());
        }, 3000);
        startLoadingDenominacion();
    }

    const setActiveDenominacion = (denominacion) => {
        dispatch(onSetActiveDenominacion(denominacion))
    }


    return {
        //*Propiedades
        listDenominacion,
        activeDenominacion,
        mensajeDenominacion,
        isLoadingDenominacion,
        //*Metodos
        startSavingDenominacion,
        startLoadingDenominacion,
        startDeletingDenominacion,
        setActiveDenominacion,
    }

}
