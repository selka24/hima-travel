import {format} from 'date-fns'
export const useMainStore = defineStore('main', () => {
    const {$api, $testApi} = useNuxtApp();
    const runtimeConfig = useRuntimeConfig();
    //state
    const testRes = ref<any>(null)
    const fromServer = ref(false);
    const fetchedPackageFromServer = ref(false);

    const currTravelPackage = ref<FullPackage | null>(null);
    const loadingCurrPackage = ref(true);

    const allOrigins = ref<Origin[]>([]);
    const allDestinations = ref<Destination[]>([]);

    const originSearch = ref('');
    const destinationSearch = ref('');

    const selectedOrigin = ref<Origin | null>(null);
    const selectedDestination = ref<Destination | null>(null);
    const selectedDate = ref<Date | null>(null);
    const selectedNights =  ref<number | null>(null);
    const selectedSort = ref<{title: string, value: number}>({title: 'Rekomandimit', value: 1});
    const priceMode = ref(false);

    const travelPackages = ref<FullPackage[] | null>(null);
    const loadingPackages = ref(true);

    //getters
    const getSearchParams = computed(() => {
        if(selectedNights.value && selectedOrigin.value && selectedDestination.value && selectedDate.value) {
            return {
                nights: selectedNights.value,
                checkin_date: format(selectedDate.value, 'yyyy-MM-dd'),
                origin_id: selectedOrigin.value.id,
                destination_id: selectedDestination.value.id
            }
        }
        return undefined;
    })

    const getPackageImages = computed(() => {
        return (pckg: FullPackage | null) => pckg?.hotel_data.hotel.hotel_photos.map(x => `${runtimeConfig.public.storageUrl}/${x.file_path}`) || [];
    })


    //actions

    const actResetParams = () => {
        originSearch.value = '';
        destinationSearch.value = '';
        selectedDestination.value = null;
        selectedOrigin.value = null;
        selectedDate.value = null;
        selectedNights.value = null;
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
                    travelPackages.value = response.data.data
                }).catch((e) => {
                    if(e.response){
                        travelPackages.value = null;
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
                console.log('get by id response', response.data?.data.id)
                if(response?.data?.data){
                    currTravelPackage.value = response.data?.data;
                }
            })
            .catch((e) => {
                console.log(e, 'get by id errorrr')
            })
        loadingCurrPackage.value = false;
    }

    const actGetOrigins = async () => {
        await $api.get('/origins')
            .catch((e) => {
                console.log(e, 'errorrr')
            })
            .then((response) => {
                allOrigins.value = response?.data?.data
            })
    }

    return {
        allOrigins,
        testRes,
        fromServer,
        fetchedPackageFromServer,
        allDestinations,
        currTravelPackage,
        loadingCurrPackage,
        selectedOrigin,
        selectedDestination,
        selectedDate,
        selectedNights,
        selectedSort,
        priceMode,
        originSearch,
        destinationSearch,
        travelPackages,
        loadingPackages,
        getSearchParams,
        getPackageImages,
        actSetOrigin,
        actGetPackageById,
        actSetDestination,
        actGetPackagesSearch,
        actResetParams,
        actGetOrigins,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
