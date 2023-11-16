import {format} from 'date-fns'
export const useMainStore = defineStore('main', () => {
    const {$api, $testApi} = useNuxtApp();
    const runtimeConfig = useRuntimeConfig();
    const {buildStorageUrl} = useUtils()

    //state
    const fromServer = ref(false)
    const currTravelPackage = ref<FullPackage | null>(null);
    const loadingCurrPackage = ref(true);
    const loadingInspiration = ref(true)

    const allOrigins = ref<Origin[]>([]);
    const allDestinations = ref<Destination[]>([]);
    const availableDates = ref<string[]>([])

    const originSearch = ref('');
    const destinationSearch = ref('');

    const selectedOrigin = ref<Origin | null>(null);
    const selectedDestination = ref<Destination | null>(null);
    const selectedDate = ref<Date | null>(null);
    const selectedNights =  ref<number | null>(null);
    const selectedSort = ref<{title: string, value: number}>({title: 'Rekomandimit', value: 1});
    const selectedPage = ref(1);
    const searchTotal = ref(0);
    const priceMode = ref(false);

    const travelPackages = ref<FullPackage[] | null>(null);
    const loadingPackages = ref(true);
    const destinationOffers = ref<TravelOffer[]>([])
    const destinationPackages = ref<{[key: string]: RecommendPackage}>()
    //getters
    const getSearchParams = computed(() => {
        if(selectedNights.value && selectedOrigin.value && selectedDestination.value && selectedDate.value && selectedPage.value) {
            return {
                nights: selectedNights.value,
                checkin_date: format(selectedDate.value, 'yyyy-MM-dd'),
                origin_id: selectedOrigin.value.id,
                destination_id: selectedDestination.value.id,
                page: selectedPage.value
            }
        }
        return undefined;
    })

    const getPackageImages = computed(() => {
        return (pckg: FullPackage | null) => pckg?.hotel_data.hotel?.hotel_photos.map(x => buildStorageUrl(x.file_path)) || [];
    })


    //actions
    const actResetParams = () => {
        originSearch.value = '';
        destinationSearch.value = '';
        selectedDestination.value = null;
        selectedOrigin.value = null;
        selectedDate.value = null;
        selectedNights.value = null;
        selectedPage.value = 1;
    }
    const actSetOrigin = (origin: Origin) => {
        selectedOrigin.value = origin;
    }

    const actSetDestination = (destination: Destination) => {
        selectedDestination.value = destination;
    }

    const actGetPackagesSearch = async () => {
        if(getSearchParams.value) {
            loadingPackages.value = true;
            await $api.post('/packages/search', getSearchParams.value)
                .then((response) => {
                    if(response.data){
                        const {data, total, current_page} = response.data
                        travelPackages.value = data;
                        selectedPage.value = current_page;
                        searchTotal.value = total;
                    }
                }).catch((e) => {
                    travelPackages.value = null;
                    if(e.response){
                        if(e.response?.status === 404) {
                            console.log('No package found')
                        } else {
                            console.error(e, 'errrorrr')
                        }
                    }
                })
            loadingPackages.value = false;
        }
    }

    const actGetPackageById = async (id: any) => {
        loadingCurrPackage.value = true;
        await $api.get(`/packages/${id}`)
            .then((response) => {
                console.log('get by id response', response)
                // if(response?.data){
                    currTravelPackage.value = response.data;
                // }
            })
            .catch((e) => {
                console.log(e, 'get by id errorrr')
            })
        console.log('finished get package')
        loadingCurrPackage.value = false;
    }

    const actGetOrigins = async () => {
        await $api.get('/origins')
            .catch((e) => {
                console.log(e, 'errorrr')
            })
            .then((response) => {
                console.log(response?.data, 'response?.data')
                allOrigins.value = response?.data
            })
    }

    const actGetHomeDestinations = async () => {
        await $api.get('/destinations')
            .then((response) => {
                console.log('response', response)
                destinationOffers.value = response.data
            })
            .catch((e) => {

            })
    }

    const actGetInspiration = async () => {
        try {
            const {data} = await $api.get('/destinations/all')
            destinationOffers.value = data
        } catch (e) {
            console.log(e, 'errrorr')
        } finally {
            loadingInspiration.value = false
        }
            // .then((response) => {
            //     console.log('response', response)
            //     destinationOffers.value = response.data
            // })
            // .catch((e) => {
            //     destinationOffers.value = [];
            // })
    }

    const actGetDestinationPackages = async (destinationID: number) => {
        await $api.get(`destinations/${destinationID}/packages`)
            .then((response) => {
                console.log('package', response.data);
                destinationPackages.value = response.data;
            }).catch((e) => {
                console.log('destination packages', e)
            })
    }

    const actGetAvailableDates = async ({month, year}: any) => {
        const date = selectedDate.value || new Date();
        // const month = date.getMonth() + 1;
        // const year = date.getFullYear();

        console.log({
            origin_id: selectedOrigin.value?.id,
            destination_id: selectedDestination.value?.id,
            month,
            year,
        })
        try {
            const response = await $api.post('/packages/available-dates', {
                origin_id: selectedOrigin.value?.id,
                destination_id: selectedDestination.value?.id,
                month,
                year,
            })
            availableDates.value = response.data;
        } catch (e) {

        } finally {

        }
    }

    return {
        allDestinations,
        allOrigins,
        availableDates,
        currTravelPackage,
        destinationOffers,
        destinationPackages,
        destinationSearch,
        fromServer,
        getPackageImages,
        getSearchParams,
        loadingCurrPackage,
        loadingPackages,
        loadingInspiration,
        originSearch,
        priceMode,
        searchTotal,
        selectedDate,
        selectedDestination,
        selectedNights,
        selectedOrigin,
        selectedPage,
        selectedSort,
        travelPackages,
        actGetAvailableDates,
        actGetDestinationPackages,
        actGetHomeDestinations,
        actGetOrigins,
        actGetInspiration,
        actGetPackageById,
        actGetPackagesSearch,
        actResetParams,
        actSetDestination,
        actSetOrigin,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
