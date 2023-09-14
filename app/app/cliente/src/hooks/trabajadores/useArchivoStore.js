import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api"
import { onAddNewArchivo } from "../../store"
import { clearMessage } from "../../store/trabajadores/archivoSlice"

export const useArchivoStore = () => {
    const dispatch = useDispatch()

    const { mensaje } = useSelector(state => state.archivo);
    const startSavingArchivo = async (archivo = []) => {
       
        if (archivo.id) {
            console.log(archivo)
        } else {
            const formData = new FormData();
            formData.append('doc', archivo)
            const { data } = await rhApi.post('/trabajadores/archivo/', formData);
            dispatch(onAddNewArchivo(data));
        }
        setTimeout(() => {
            dispatch(clearMessage());
        }, 3000);
    }
    return {
        //*Propiedades
        mensaje,

        //*Metodos
        startSavingArchivo,

    }
}
