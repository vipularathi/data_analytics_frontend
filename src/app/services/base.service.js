import axios from 'axios';

export class BaseApi {
    axiosInstance;
    constructor(baseUrl) {
        const axiosInstance = axios.create({
            baseURL: baseUrl,
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

        this.axiosInstance = axiosInstance;
    }
}