import { FetchOptions } from 'ofetch';
import { AsyncDataOptions } from '#app';

import FetchFactory from '../factory';


class OriginsModule extends FetchFactory<Origin[]> {
    private RESOURCE = '/origins';

    /**
     * Return the products as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */

    async getOrigins(
        asyncDataOptions?: AsyncDataOptions<Origin[]>
    ) {

        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call(
                    'GET',
                    `${this.RESOURCE}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
}

export default OriginsModule;
