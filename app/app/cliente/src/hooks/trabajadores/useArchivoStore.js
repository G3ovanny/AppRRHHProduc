import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewArchivo } from "../../store"
import { onClearMessage } from "../../store/trabajadores/archivoSlice"

export const useArchivoStore = () => {
    const dispatch = useDispatch()

    let { mensajeArchivo } = useSelector(state => state.archivo);
    const startSavingArchivo = async (archivo = []) => {

        try {
            const formData = new FormData();
            formData.append('doc', archivo);
            await rhApi.post('/trabajadores/archivo/', formData);
        } catch (error) {
            // En caso de una excepción al realizar la solicitud, puedes manejarla aquí
            const mensajeError= error.response.data.mensaje
            console.log(mensajeError)
            //console.error('Error al realizar la solicitud POST:', error.response.data.mensaje);
            dispatch(onAddNewArchivo(mensajeError))
        }
    }
    return {
        //*Propiedades
        mensajeArchivo,

        //*Metodos
        onClearMessage,
        startSavingArchivo,

    }
}
