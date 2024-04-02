import axios from 'axios';
import { userStore } from '../store/user.store';
import { API_BASE_URL } from '../utils/url';

export default function createAxiosInstance(baseURL) {
    /*
     * Axios configuration for the API
     */
    const axiosInstance = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    axiosInstance.interceptors.request.use(
        function fullFilled(resp) {
            return resp;
        },
        function reject(err) {
            return new Promise((_, reject) => {
                if (err.name === 'CanceledError') {
                    throw reject(err);
                }
                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // unauthorized - clear session and redirect to sign-in
                    userStore.signOut();
                }
                if (err.response.status === 403) {
                    // acces denied - redirect to forbidden page
                }
                if (err.response.status === 404) {
                    // page not found - redirect to not found page
                }
                throw reject(err);
            });
        }
    )
    return axiosInstance;
}

export const baseInstance = createAxiosInstance(API_BASE_URL);