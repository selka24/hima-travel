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

    return {
        provide: {
            api: api,
        },
    };
});
