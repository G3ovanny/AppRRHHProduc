import { useDispatch, useSelector } from "react-redux";
import { rhApi } from '../../api'
import { clearErrorMessage, onChecking, onLoging, onLogout } from "../../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLoging = async ({ username, password }) => {
        dispatch(onChecking)
        try {
            const { data } = await rhApi.post('/loging/', { username, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('refresh', data.refresh)
            localStorage.setItem('token-init-date', new Date().getTime());
            localStorage.setItem('username', data.usuario.username);
            dispatch(onLoging({ name: data.nombre, id: data.id }))
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 3000);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh')

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await rhApi.post('api/token/refresh/', { refresh });
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLoging({ name: data.nombre, id: data.id }))
        } catch (error) {
            console.log(error)
            localStorage.clear();
            dispatch(onLogout());
        }
    }


    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //*Metodos
        startLoging,
        startLogout,
        checkAuthToken,
    }
}
