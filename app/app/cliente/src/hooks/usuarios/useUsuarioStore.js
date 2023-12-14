import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageUsuario,
    onAddNewUsuario,
    onChangeMessageUsuario,
    onDeleteUsuario,
    onLoadUsuario,
    onSetActiveUsuario,
    onUpdateUsuario,
    onChangeErrorMessageUser,
} from "../../store";
import { rhApi } from '../../api';

export const useUsuarioStore = () => {
    const dispatch = useDispatch();
    const { listUsuario, activeUsuario, mensajeUsuario, mensajeErrorUsuario, isLoadingUsuario } = useSelector(state => state.usuarios)

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
    const startChangePassUsuario = async (usuario) => {
        try {
            if (usuario.id) {
                //console.log(usuario)
                const responseUsuario = await rhApi.post(`/usuarios/usuario/${usuario.id}/set_pass/`, usuario)
                console.log(responseUsuario)
                dispatch(onUpdateUsuario({ ...usuario }))
            }
        } catch (error) {
            dispatch(onChangeErrorMessageUser(error.response.data.message))
        }
        setTimeout(() => {
            dispatch(clearMessageUsuario());
        }, 5000);
    }

    const startDeletingUsuario = async () => {
        try {
            for (let i = 0; i < activeUsuario.length; i++) {
                const element = activeUsuario[i].id;
                if (element) {
                    await rhApi.delete(`/usuarios/usuario/${element}`)
                }
            }
            dispatch(onDeleteUsuario());
        } catch (error) {
            console.log(error)
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
        mensajeErrorUsuario,
        isLoadingUsuario,
        //*Metodos
        startSavingUsuario,
        startLoadingUsuario,
        startDeletingUsuario,
        setActiveUsuario,
        setChangeMessageUsuario,
        startChangePassUsuario,
    }
}
