import { useDispatch, useSelector } from "react-redux"
import { clearMessage, onAddNewReg, onDeleteReg, onLoadReg, onSetActiveReg, onUpdateReg } from "../../store/distributivo"
import { rhApi } from "../../api"

export const useRegimenStore = () => {
    const dispatch = useDispatch()
    const { listReg, activeReg, mensaje } = useSelector(state => state.regimen)

    const startLoadingReg = async () => {
        try {
            const { data } = await rhApi.get('/distributivo/regimen/');
            dispatch(onLoadReg(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingReg = async (regimen) => {
        if (regimen.id) {
            await rhApi.put(`/distributivo/regimen/${regimen.id}/`, regimen)
            dispatch(onUpdateReg({ ...regimen }))
        } else {
            await rhApi.post('/distributivo/regimen/', regimen);
            dispatch(onAddNewReg({ ...regimen }))
        }
        setTimeout(() => {
            dispatch(clearMessage());
        }, 3000);

    }

    const startDeletingReg = async () => {
        try {
            if (element) {
                await rhApi.delete(`/distributivo/regimen/${element}`)
            }
            dispatch(onDeleteReg());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el régimen')
        }
        setTimeout(() => {
            dispatch(clearMessage());
        }, 3000);

    }

    const setActiveReg = (regimen) => {
        dispatch(onSetActiveReg(regimen))
    }


    return {
        //*Propiedades
        listReg,
        activeReg,
        mensaje,
        //*Metodos
        startSavingReg,
        startLoadingReg,
        startDeletingReg,
        setActiveReg,
    }
}
