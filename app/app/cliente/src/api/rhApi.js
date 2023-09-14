import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { VITE_API_URL } = getEnvVariables();

const rhApi = axios.create({
    baseURL: VITE_API_URL
});

rhApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return config
})

export default rhApi;