import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewArchivo } from "../../store"
import { onClearMessage } from "../../store/trabajadores/archivoSlice"

export const useArchivoStore = () => {
    const dispatch = useDispatch()

    let { mensajeArchivo } = useSelector(state => state.archivo);


    const startSavingArchivo = async (archivo, tipo) => {

        // console.log("Archivo seleccionado:", archivo);
        // console.log("Tipo de archivo seleccionado:", tipo);

        try {
            const formData = new FormData();
            formData.append('doc', archivo);

            switch (tipo) {
                case "distributivo":
                    // console.log('/trabajadores/archivo/', formData)    
                    const responseArchivo = await rhApi.post('/trabajadores/archivo/', formData)
                    const mensajeArchivo = responseArchivo.data.mensaje
                    dispatch(onAddNewArchivo(mensajeArchivo))
                    break;
                case "correos":
                    // console.log('/trabajadores/correos/', formData)    
                    const responseCorreo = await rhApi.post('/trabajadores/correos/', formData)
                    const mensajeCorreo = responseCorreo.data.mensaje
                    dispatch(onAddNewArchivo(mensajeCorreo))
                    break;
                case "vacaciones":
                    // console.log('/trabajadores/vacaciones/', formData)    
                    const responseVacaciones = await rhApi.post('/trabajadores/vacaciones/', formData)
                    const mensajeVacaciones = responseVacaciones.data.mensaje
                    dispatch(onAddNewArchivo(mensajeVacaciones))
                    break;
                default:
                    break;
            }
        } catch (error) {
            // En caso de una excepción al realizar la solicitud, puedes manejarla aquí
            const mensajeError = error.response.data.mensaje
            console.log(mensajeError)
            //console.error('Error al realizar la solicitud POST:', error.response.data.mensaje);
            dispatch(onAddNewArchivo(mensajeError))
        }

        // try {
        //     const formData = new FormData();
        //     formData.append('doc', archivo);
        //     const response =  await rhApi.post('/trabajadores/correos/', formData);
        //     const mensaje = response.data.mensaje
        //     dispatch(onAddNewArchivo(mensaje))
        // } catch (error) {
        //     // En caso de una excepción al realizar la solicitud, puedes manejarla aquí
        //     const mensajeError= error.response.data.mensaje
        //     console.log(mensajeError)
        //     //console.error('Error al realizar la solicitud POST:', error.response.data.mensaje);
        //     dispatch(onAddNewArchivo(mensajeError))}

    }


    return {
        //*Propiedades
        mensajeArchivo,

        //*Metodos
        onClearMessage,
        startSavingArchivo,

    }
}
