import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewDenominacion, onDeleteDenominacion, onLoadDenominacion, onSetActiveDenominacion, onUpdateDenominacion } from "../../store/distributivo";

export const useDenominacionPuestoStore = () => {
    const dispatch = useDispatch();

    const { listDenominacion, activeDenominacion, clearMessageDenominacion } = useSelector(state => state.denominacionPuesto)

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
    }

    const startDeletingDenominacion = async (denominacion) => {
        const element = denominacion.id
        try {
            if (element) {
                await rhApi.delete(`/distributivo/denominacion/${element}`)
            }
            dispatch(onDeleteDenominacion());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el denominacion ocupacional')
        }

        setTimeout(() => {
            dispatch(clearMessageDenominacion());
        }, 3000);
    }

    const setActiveDenominacion = (denominacion) => {
        dispatch(onSetActiveDenominacion(denominacion))
    }


    return {
        //*Propiedades
        listDenominacion,
        activeDenominacion,
        //*Metodos
        startSavingDenominacion,
        startLoadingDenominacion,
        startDeletingDenominacion,
        setActiveDenominacion,
    }

}
