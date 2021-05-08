import axios from "axios";
import {PREFIX} from "hooks/useLocalStorage";

const isLocalTunnel = false;

const axiosInstance = axios.create({
    baseURL: isLocalTunnel 
        ? process.env.REACT_APP_SERVER_URL_LOCALTUNNEL + "/api"
        : process.env.REACT_APP_SERVER_URL + "/api"
})

axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem(PREFIX + "accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
}, 
    err => Promise.reject(err)
)

export default axiosInstance;