import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewUnidad, onDeleteUnidad, onLoadUnidad, onSetActiveUnidad, onUpdateUnidad, onErrorUnidad, clearMessageUnidad } from "../../store/distributivo";


export const useUnidadOrganicaStore = () => {
    const dispatch = useDispatch();

    const { listUnidad, activeUnidad, mensajeUnidad, isLoadingUnidad, mensajeError } = useSelector(state => state.unidadOrganica)

    const startLoadingUnidad = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/unidad/');
            dispatch(onLoadUnidad(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingUnidad = async (unidad) => {
        try {
            if (unidad.id) {
                await rhApi.put(`/distributivo/unidad/${unidad.id}/`, unidad)
                dispatch(onUpdateUnidad({ ...unidad }))
            } else {
                await rhApi.post('/distributivo/unidad/', unidad);
                dispatch(onAddNewUnidad({ ...unidad }))
            }
            setTimeout(() => {
                dispatch(clearMessageUnidad());
            }, 3000);
        } catch (error) {
            console.log(error)
            dispatch(onErrorUnidad(error.response.data.mensaje));
            setTimeout(() => {
                dispatch(clearMessageUnidad());
            }, 3000);
        }
    }

    const startDeletingUnidad = async (unidad) => {
        try {
            if (unidad.id) {
                await rhApi.delete(`/distributivo/unidad/${unidad.id}`)
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
        mensajeUnidad,
        mensajeError,
        isLoadingUnidad,
        //*Metodos
        startSavingUnidad,
        startLoadingUnidad,
        startDeletingUnidad,
        setActiveUnidad,
    }

}
