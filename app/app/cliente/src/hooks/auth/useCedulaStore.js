import { useDispatch, useSelector } from "react-redux"
import { rhApi } from "../../api";
import { clearErrorMessageCed, onCheckingCed, onUnlinkedingCed, onlinkedingCed } from "../../store/auth/cedulaSlice";

export const useCedulaStore = () => {
  const { estadoCed, trabCed, errorMessageCed } = useSelector(state => state.cedula)
  const dispatch = useDispatch();

  const startLinkeding = async (numero_identificacion) => {
    dispatch(onCheckingCed)
    try {
      const { data } = await rhApi.post('/formulario/', { numero_identificacion });
      localStorage.setItem('numero_identificacion', data.numero_identificacion);
      dispatch(onlinkedingCed({ numero_identificacion: data.numero_identificacion }))
    } catch (error) {
      dispatch(onUnlinkedingCed('Número de cedula no encontrado'));
      setTimeout(() => {
        dispatch(clearErrorMessageCed());
      }, 3000);
    }
  }

  const checkCedula = async () => {
    const cedula = localStorage.getItem('numero_identificacion');
    if (!cedula) {
      dispatch(onUnlinkedingCed());
    } else {
      dispatch(onlinkedingCed())
    }
  }

  const onunlinkeding = () => {
    localStorage.clear();
    dispatch(onUnlinkedingCed())
  }
  return {
    //*Propiedades
    estadoCed,
    trabCed,
    errorMessageCed,
    //*Metodos
    startLinkeding,
    onunlinkeding,
    checkCedula,
  }
}
