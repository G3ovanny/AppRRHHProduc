import { useDispatch, useSelector } from 'react-redux';
import { rhApi } from '../../api';
import { onLoadGrupo } from '../../store/grupos';

export const useGrupoStore = () => {
  const dispatch = useDispatch();
  const { listGrupo } = useSelector(state => state.grupos)

  const startLoadingGrupo = async () => {
    try {
      const { data } = await rhApi.get('/usuarios/grupos/');
      dispatch(onLoadGrupo(data))
    } catch (error) {
      console.log(error)
    }
  }
  return {
    //*Propiedades
    listGrupo,
    //*Metodos
    startLoadingGrupo,
  }
}
