import {$fetch, FetchOptions} from 'ofetch';

import OriginsModule from "~/repository/modules/origins";

interface IApiInstance {
    origins: OriginsModule
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const fetchOptions: FetchOptions = {
        baseURL: config.public.apiBaseUrl
    }

    // Create a new instance of $fecther with custom option
    const apiFetcher = $fetch.create(fetchOptions);

    // An object containing all repositories we need to expose
    const modules: IApiInstance = {
        origins: new OriginsModule(apiFetcher),
    };

    return {
        provide: {
            api: modules
        }
    };
})
