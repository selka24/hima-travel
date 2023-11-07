import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
    const baseURL = runtimeConfig.public.apiBaseUrl;

    let api = axios.create({
        baseURL,
        headers: {
            common: {},
        },
    });

    api.interceptors.response.use(
        (response) => {
            return response?.data || {data: null};
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    return {
        provide: {
            api: api,
        },
    };
});
