import { useDispatch, useSelector } from 'react-redux'
//import { rhApi } from '../../api'
import { onKeepDates } from '../../store/trabajadores/formularioSlice'

export const useFormularioStore = () => {
    const dispatch = useDispatch()
    const { formularios } = useSelector( state => state.formularios)

    const startSavingDatos = async (datos) => {
        //await rhApi.post('formulario/', datos)
        dispatch(onKeepDates)
    }

    const startKeepingDates = async (datos) => {
        console.log(datos)
        dispatch(onKeepDates(datos))
    }

    return {
        startSavingDatos,
        startKeepingDates,
        formularios,
    }
}
