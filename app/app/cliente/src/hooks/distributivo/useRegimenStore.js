import { useDispatch, useSelector } from "react-redux"
import { clearMessage, onAddNewReg, onDeleteReg, onLoadReg, onSetActiveReg, onUpdateReg } from "../../store/distributivo"
import { rhApi } from "../../api"

export const useRegimenStore = () => {
    const dispatch = useDispatch()
    const { listReg, activeReg, mensaje, isLoadingReg } = useSelector(state => state.regimen)

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
        startLoadingReg();
    }

    const startDeletingReg = async (regimen) => {
        try {
            if (regimen.id) {
                await rhApi.delete(`/distributivo/regimen/${regimen.id}`)
            }
            dispatch(onDeleteReg({...regimen}));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el régimen')
        }

        setTimeout(() => {
            dispatch(clearMessage());
        }, 3000);
        startLoadingReg();

    }

    const setActiveReg = (regimen) => {
        dispatch(onSetActiveReg(regimen))
    }


    return {
        //*Propiedades
        listReg,
        activeReg,
        mensaje,
        isLoadingReg,
        //*Metodos
        startSavingReg,
        startLoadingReg,
        startDeletingReg,
        setActiveReg,
    }
}
