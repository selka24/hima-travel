import {format} from 'date-fns'
export const useMainStore = defineStore('main', () => {
    const {$api, $testApi} = useNuxtApp();

    //state
    const testRes = ref<any>(null)

    const currTravelPackage = ref<Package>({
        id:7200,
        outbound_flight_id:1069,
        inbound_flight_id:1074,
        hotel_data_id:7200,
        commission:"80.00",
        total_price:"266.81",
        created_at:"2023-10-26T01:45:19.000000Z",
        updated_at:"2023-10-26T01:45:19.000000Z",
        package_config_id:8,
        hotel_data:{
            id:7200,
            hotel_id:67006,
            check_in_date:"2024-01-14",
            number_of_nights:2,
            room_basis:"RO",
            room_details:"['standard double room (twin beds)']",
            price:"169.00",
            package_config_id:8,
            created_at:"2023-10-26T01:45:19.000000Z",
            updated_at:"2023-10-26T01:45:19.000000Z",
        }
    })

    const allOrigins = ref<Origin[]>([])
    const allDestinations = ref<Destination[]>([])

    const originSearch = ref('');
    const destinationSearch = ref('');

    const selectedOrigin = ref<Origin | null>(null);
    const selectedDestination = ref<Destination | null>(null);
    const selectedDate = ref<Date | null>(null);
    const selectedNights =  ref<number | null>(null);

    const travelPackages = ref<Package[] | null>(null)
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
                        if(e.respopnse?.status === 404) {
                            console.log('No package found')
                        } else {
                            console.log(e, 'errrorrr')
                        }
                    }
                })
            loadingPackages.value = false;
        }
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
        allDestinations,
        currTravelPackage,
        selectedOrigin,
        selectedDestination,
        selectedDate,
        selectedNights,
        originSearch,
        destinationSearch,
        travelPackages,
        loadingPackages,
        getSearchParams,
        actSetOrigin,
        actSetDestination,
        actGetPackagesSearch,
        actResetParams,
        actGetOrigins,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
