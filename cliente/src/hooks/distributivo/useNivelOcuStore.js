import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewNivel, onDeleteNivel, onLoadNivel, onSetActiveNivel, onUpdateNivel } from "../../store/distributivo"


export const useNivelOcuStore = () => {
    const dispatch = useDispatch()
    const { listNivel, activeNivel, clearMessageNivel } = useSelector(state => state.nivelOcupacional)

    const startLoadingNivel = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/nivel/');
            dispatch(onLoadNivel(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingNivel = async (nivel) => {
        if (nivel.id) {
            await rhApi.put(`/distributivo/nivel/${nivel.id}/`, nivel)
            dispatch(onUpdateNivel({ ...nivel }))
        } else {
            await rhApi.post('/distributivo/nivel/', nivel);
            dispatch(onAddNewNivel({ ...nivel }))
        }
    }

    const startDeletingNivel = async (nivel) => {
        const element = nivel.id
        try {
            if (element) {
                await rhApi.delete(`/distributivo/nivel/${element}`)
            }
            dispatch(onDeleteNivel());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el nivel ocupacional')
        }

        setTimeout(() => {
            dispatch(clearMessageNivel());
        }, 3000);
    }

    const setActiveNivel = (nivel) => {
        dispatch(onSetActiveNivel(nivel))
    }


    return {
        //*Propiedades
        listNivel,
        activeNivel,
        //*Metodos
        startSavingNivel,
        startLoadingNivel,
        startDeletingNivel,
        setActiveNivel,
    }
}
