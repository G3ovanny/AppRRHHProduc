import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewUnidad, onDeleteUnidad, onLoadUnidad, onSetActiveUnidad, onUpdateUnidad } from "../../store/distributivo";


export const useUnidadOrganicaStore = () => {
    const dispatch = useDispatch();

    const { listUnidad, activeUnidad, clearMessageUnidad } = useSelector(state => state.unidadOrganica)

    const startLoadingUnidad = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/unidad/');
            dispatch(onLoadUnidad(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingUnidad = async (unidad) => {
        if (unidad.id) {
            await rhApi.put(`/distributivo/unidad/${unidad.id}/`, unidad)
            dispatch(onUpdateUnidad({ ...unidad }))
        } else {
            await rhApi.post('/distributivo/unidad/', unidad);
            dispatch(onAddNewUnidad({ ...unidad }))
        }
    }

    const startDeletingUnidad = async (unidad) => {
        const element = unidad.id
        try {
            if (element) {
                await rhApi.delete(`/distributivo/unidad/${element}`)
            }
            dispatch(onDeleteUnidad());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar la unidad organica')
        }

        setTimeout(() => {
            dispatch(clearMessageUnidad());
        }, 3000);
    }

    const setActiveUnidad = (unidad) => {
        dispatch(onSetActiveUnidad(unidad))
    }


    return {
        //*Propiedades
        listUnidad,
        activeUnidad,
        //*Metodos
        startSavingUnidad,
        startLoadingUnidad,
        startDeletingUnidad,
        setActiveUnidad,
    }

}
