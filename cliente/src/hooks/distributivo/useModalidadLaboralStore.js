import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewModalidad, onDeleteModalidad, onLoadModalidad, onSetActiveModalidad, onUpdateModalidad } from "../../store/distributivo";


export const useModalidadLaboralStore = () => {
    const dispatch = useDispatch();

    const { listModalidad, activeModalidad, clearMessageModalidad } = useSelector(state => state.modalidadLaboral)

    const startLoadingModalidad = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/modalidad/');
            dispatch(onLoadModalidad(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingModalidad = async (modalidad) => {
        if (modalidad.id) {
            await rhApi.put(`/distributivo/modalidad/${modalidad.id}/`, modalidad)
            dispatch(onUpdateModalidad({ ...modalidad }))
        } else {
            await rhApi.post('/distributivo/modalidad/', modalidad);
            dispatch(onAddNewModalidad({ ...modalidad }))
        }
        setTimeout(() => {
            dispatch(clearMessageModalidad());
        }, 3000);
    }

    const startDeletingModalidad = async (modalidad) => {
        try {
            if (modalidad.id) {
                await rhApi.delete(`/distributivo/modalidad/${modalidad.id}`)
            }
            dispatch(onDeleteModalidad({ ...modalidad }));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el modalidad ocupacional')
        }

        setTimeout(() => {
            dispatch(clearMessageModalidad());
        }, 3000);
    }

    const setActiveModalidad = (modalidad) => {
        dispatch(onSetActiveModalidad(modalidad))
    }


    return {
        //*Propiedades
        listModalidad,
        activeModalidad,
        //*Metodos
        startSavingModalidad,
        startLoadingModalidad,
        startDeletingModalidad,
        setActiveModalidad,
    }

}