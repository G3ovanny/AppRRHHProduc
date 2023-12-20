
import { useDispatch, useSelector } from 'react-redux'
import { rhApi } from '../../api'
import { clearMessageArchivoCron, onAddNewArchivoCron } from '../../store'

export const useArchivoCronogramaStore = () => {
  const dispath = useDispatch()
  const { mensajeArchivoCron } = useSelector(state => state.archivoCron)

  const startSavingArchivoCron = async (archivo = []) => {
    try {
      if (archivo.id) {
        console.log(archivo)
      } else {
        const formData = new FormData();
        formData.append('doc', archivo)
        const responseArchivo = await rhApi.post('/vacaciones/archivo/', formData)
        const mensajeArchivo = responseArchivo.data.mensaje
        dispath(onAddNewArchivoCron(mensajeArchivo));
      }
    } catch (error) {
      const mensajeError = error.response.data.error
      console.log(mensajeError)
      dispath(onAddNewArchivoCron(mensajeError));
    }

  }
  return {
    //*Propiedades
    mensajeArchivoCron,
    //*Metodos
    startSavingArchivoCron,
    clearMessageArchivoCron,
  }
}
