import { useDispatch, useSelector } from "react-redux"
import { onChecking, onUnlinkeding } from "../../store/auth/cedulaSlice";
import { rhApi } from "../../api";

export const useCedulaStore = () => {
  const { estadoCed, trabCed, errorMessageCed } = useSelector(state => state.cedula)
  const dispatch = useDispatch();

  const startLinkeding = async ({ numero_identificacion }) => {
    dispatch(onChecking)
    console.log(numero_identificacion)
    try {
      const {data} = await rhApi.post('/formulario/', {numero_identificacion});
      console.log(data)
    } catch (error) {

    }
  }
  const onunlinkeding = () => {
    dispatch(onUnlinkeding)
  }
  return {
    //*Propiedades
    estadoCed,
    trabCed,
    errorMessageCed,
    //*Metodos
    startLinkeding,
  }
}
