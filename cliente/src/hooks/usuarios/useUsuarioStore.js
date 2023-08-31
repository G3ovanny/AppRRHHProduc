import { useDispatch, useSelector } from "react-redux";
import { clearMessageUsuario, onAddNewUsuario, onLoadUsuario, onSetActiveUsuario, onUpdateUsuario } from "../../store";
import { rhApi } from '../../api';

export const useUsuarioStore = () => {
    const dispatch = useDispatch();
    const { listUsuario, activeUsuario, mensajeUsuario } = useSelector(state => state.usuarios)

    const startLoadingUsuario = async () => {
        try {
            const { data } = await rhApi.get('/usuarios/usuario/');
            dispatch(onLoadUsuario(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingUsuario = async (usuario) => {
        if (usuario.id) {
            await rhApi.put(`/usuarios/usuario/${usuario.id}/`, usuario)
            dispatch(onUpdateUsuario({ ...usuario }))
        } else {
            await rhApi.post('/usuarios/usuario/', usuario);
            dispatch(onAddNewUsuario({ ...usuario }))
        }
        setTimeout(() => {
            dispatch(clearMessageUsuario());
        }, 3000);
    }

    const startDeletingUsuario = async () => {
        try {
            for (let i = 0; i < activeUsuario.length; i++) {
                const element = activeUsuario[i].id;
                if (element) {
                    await rhApi.delete(`/usuarios/usuario/${element}`)
                }
            }
            dispatch(onDeleteusuario());
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el usuario')
        }

        setTimeout(() => {
            dispatch(clearMessageUsuario());
        }, 3000);
    }

    const setActiveUsuario = (usuario) => {
        dispatch(onSetActiveUsuario(usuario))
    }

    const setChangeMessageUsuario = (mensaje) => {
        dispatch(onChangeMessageUsuario(mensaje))
        setTimeout(() => {
            dispatch(clearMessageUsuario());
        }, 3000);
    }


    return {
        //*Propiedades
        listUsuario,
        activeUsuario,
        mensajeUsuario,
        //*Metodos
        startSavingUsuario,
        startLoadingUsuario,
        startDeletingUsuario,
        setActiveUsuario,
        setChangeMessageUsuario,
    }
}
