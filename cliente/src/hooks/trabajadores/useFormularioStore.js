import { useDispatch } from 'react-redux'
import { rhApi } from '../../api'
import { onSetDatos } from '../../store/trabajadores/formularioSlice'

export const useFormularioStore = () => {
    const dispatch = useDispatch()

    const startSavingDatos = async (datos) => {
        await rhApi.post('formulario/', datos)
        dispatch(onSetDatos)
    }
    return {

        startSavingDatos,
    }
}
