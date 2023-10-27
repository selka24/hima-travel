import {format} from 'date-fns'
export const useMainStore = defineStore('main', () => {
    const {$api, $testApi} = useNuxtApp();
    const runtimeConfig = useRuntimeConfig();
    //state
    const testRes = ref<any>(null)

    const currTravelPackage = ref<FullPackage>({
        id:7200,
        outbound_flight_id:1069,
        inbound_flight_id:1074,
        hotel_data_id:7200,
        commission:"80.00",
        total_price:"266.81",
        created_at:"2023-10-26T01:45:19.000000Z",
        updated_at:"2023-10-26T01:45:19.000000Z",
        package_config_id:8,
        "hotel_data": {
            "id": 7612,
            "hotel_id": 70792,
            "check_in_date": "2023-11-01",
            "number_of_nights": 2,
            "room_basis": "RO",
            "room_details": "[\"classic double room (full double bed) (bed type is subject to availability)\"]",
            "price": "368.00",
            "package_config_id": 9,
            "created_at": "2023-10-27T12:07:32.000000Z",
            "updated_at": "2023-10-27T12:07:32.000000Z",
            "hotel": {
                "id": 70792,
                "hotel_id": 7071,
                "name": "KING ROMA",
                "address": "Via Sistina 131, Rome, IT",
                "phone": "+39 06 488 0878",
                "fax": "39-06-42011388",
                "stars": 3,
                "stars_id": 5,
                "longitude": "12.487061",
                "latitude": "41.904118",
                "is_apartment": 0,
                "giata_code": "15375",
                "city_id": 1661,
                "city": "ROME",
                "iso_code": "IT",
                "country": "ITALY",
                "country_id": 37,
                "destination_id": 2,
                "created_at": "2023-10-11T15:09:29.000000Z",
                "updated_at": "2023-10-11T15:17:21.000000Z",
                "hotel_photos": [
                    {
                        "id": 1,
                        "hotel_id": 70792,
                        "file_path": "gK2CYZTLlNP1RbgNAGSJi7ApaEOqv9-metacGhvdG8zLmpwZWc=-.jpg",
                        "created_at": "2023-10-27T12:09:21.000000Z",
                        "updated_at": "2023-10-27T12:09:21.000000Z"
                    },
                    {
                        "id": 2,
                        "hotel_id": 70792,
                        "file_path": "lp8QOWphyqK0AMFeiHmZkICOr9NEBm-metacGhvdG8yLmpwZWc=-.jpg",
                        "created_at": "2023-10-27T12:09:21.000000Z",
                        "updated_at": "2023-10-27T12:09:21.000000Z"
                    },
                    {
                        "id": 3,
                        "hotel_id": 70792,
                        "file_path": "lqVg7gp7zottF7LeaaDXENqufGBn3u-metacGhvdG8xLmpwZWc=-.jpg",
                        "created_at": "2023-10-27T12:09:21.000000Z",
                        "updated_at": "2023-10-27T12:09:21.000000Z"
                    }
                ]
            }
        },
        "outbound_flight": {
            "id": 1105,
            "origin": "TIA",
            "destination": "FCO",
            "departure": "2023-11-01T16:15:00.000000Z",
            "arrival": "2023-11-01T17:50:00.000000Z",
            "price": "55.97",
            "airline": "Wizz Air Malta",
            "extra_data": "{\"id\": \"16911-2311011615--30596-0-11493-2311011750\", \"legs\": [{\"id\": \"16911-2311011615--30596-0-11493-2311011750\", \"origin\": {\"id\": \"TIA\", \"city\": \"Tirana\", \"name\": \"Tirana\", \"displayCode\": \"TIA\", \"isHighlighted\": false}, \"arrival\": \"2023-11-01T17:50:00\", \"carriers\": {\"marketing\": [{\"id\": -30596, \"name\": \"Wizz Air Malta\", \"logoUrl\": \"https:\/\/logos.skyscnr.com\/images\/airlines\/favicon\/I*.png\"}], \"operationType\": \"fully_operated\"}, \"segments\": [{\"id\": \"16911-11493-2311011615-2311011750--30596\", \"origin\": {\"name\": \"Tirana\", \"type\": \"Airport\", \"parent\": {\"name\": \"Tirana\", \"type\": \"City\", \"displayCode\": \"TIA\", \"flightPlaceId\": \"TIRA\"}, \"displayCode\": \"TIA\", \"flightPlaceId\": \"TIA\"}, \"arrival\": \"2023-11-01T17:50:00\", \"departure\": \"2023-11-01T16:15:00\", \"destination\": {\"name\": \"Rome Fiumicino\", \"type\": \"Airport\", \"parent\": {\"name\": \"Rome\", \"type\": \"City\", \"displayCode\": \"ROM\", \"flightPlaceId\": \"ROME\"}, \"displayCode\": \"FCO\", \"flightPlaceId\": \"FCO\"}, \"flightNumber\": \"3887\", \"marketingCarrier\": {\"id\": -30596, \"name\": \"Wizz Air Malta\", \"allianceId\": 0, \"alternateId\": \"I*\", \"displayCode\": \"\"}, \"operatingCarrier\": {\"id\": -30596, \"name\": \"Wizz Air Malta\", \"allianceId\": 0, \"alternateId\": \"I*\", \"displayCode\": \"\"}, \"durationInMinutes\": 95}], \"departure\": \"2023-11-01T16:15:00\", \"stopCount\": 0, \"destination\": {\"id\": \"FCO\", \"city\": \"Rome\", \"name\": \"Rome Fiumicino\", \"displayCode\": \"FCO\", \"isHighlighted\": false}, \"isSmallestStops\": false, \"timeDeltaInDays\": 0, \"durationInMinutes\": 95}], \"tags\": [\"shortest\"], \"price\": {\"raw\": 55.97, \"formatted\": \"56 \u20ac\"}, \"score\": 0.999, \"isMashUp\": false, \"farePolicy\": {\"isChangeAllowed\": false, \"isCancellationAllowed\": false, \"isPartiallyChangeable\": false, \"isPartiallyRefundable\": false}, \"fareAttributes\": [], \"isSelfTransfer\": false, \"hasFlexibleOptions\": false, \"isProtectedSelfTransfer\": false}",
            "created_at": null,
            "updated_at": null,
            "package_config_id": 9
        },
        "inbound_flight": {
            "id": 1110,
            "origin": "FCO",
            "destination": "TIA",
            "departure": "2023-11-03T23:10:00.000000Z",
            "arrival": "2023-11-04T00:45:00.000000Z",
            "price": "28.00",
            "airline": "Wizz Air Malta",
            "extra_data": "{\"id\": \"11493-2311032310--30596-0-16911-2311040045\", \"legs\": [{\"id\": \"11493-2311032310--30596-0-16911-2311040045\", \"origin\": {\"id\": \"FCO\", \"city\": \"Rome\", \"name\": \"Rome Fiumicino\", \"displayCode\": \"FCO\", \"isHighlighted\": false}, \"arrival\": \"2023-11-04T00:45:00\", \"carriers\": {\"marketing\": [{\"id\": -30596, \"name\": \"Wizz Air Malta\", \"logoUrl\": \"https:\/\/logos.skyscnr.com\/images\/airlines\/favicon\/I*.png\"}], \"operationType\": \"fully_operated\"}, \"segments\": [{\"id\": \"11493-16911-2311032310-2311040045--30596\", \"origin\": {\"name\": \"Rome Fiumicino\", \"type\": \"Airport\", \"parent\": {\"name\": \"Rome\", \"type\": \"City\", \"displayCode\": \"ROM\", \"flightPlaceId\": \"ROME\"}, \"displayCode\": \"FCO\", \"flightPlaceId\": \"FCO\"}, \"arrival\": \"2023-11-04T00:45:00\", \"departure\": \"2023-11-03T23:10:00\", \"destination\": {\"name\": \"Tirana\", \"type\": \"Airport\", \"parent\": {\"name\": \"Tirana\", \"type\": \"City\", \"displayCode\": \"TIA\", \"flightPlaceId\": \"TIRA\"}, \"displayCode\": \"TIA\", \"flightPlaceId\": \"TIA\"}, \"flightNumber\": \"3888\", \"marketingCarrier\": {\"id\": -30596, \"name\": \"Wizz Air Malta\", \"allianceId\": 0, \"alternateId\": \"I*\", \"displayCode\": \"\"}, \"operatingCarrier\": {\"id\": -30596, \"name\": \"Wizz Air Malta\", \"allianceId\": 0, \"alternateId\": \"I*\", \"displayCode\": \"\"}, \"durationInMinutes\": 95}], \"departure\": \"2023-11-03T23:10:00\", \"stopCount\": 0, \"destination\": {\"id\": \"TIA\", \"city\": \"Tirana\", \"name\": \"Tirana\", \"displayCode\": \"TIA\", \"isHighlighted\": false}, \"isSmallestStops\": false, \"timeDeltaInDays\": 1, \"durationInMinutes\": 95}], \"tags\": [\"cheapest\", \"second_shortest\"], \"price\": {\"raw\": 28, \"formatted\": \"28 \u20ac\"}, \"score\": 0.893602, \"isMashUp\": false, \"farePolicy\": {\"isChangeAllowed\": false, \"isCancellationAllowed\": false, \"isPartiallyChangeable\": false, \"isPartiallyRefundable\": false}, \"fareAttributes\": [], \"isSelfTransfer\": false, \"hasFlexibleOptions\": false, \"isProtectedSelfTransfer\": false}",
            "created_at": null,
            "updated_at": null,
            "package_config_id": 9
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

    const travelPackages = ref<FullPackage[] | null>(null)
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
        return (pckg: FullPackage) => pckg?.hotel_data.hotel.hotel_photos.map(x => `${runtimeConfig.public.storageUrl}/${x.file_path}`) || [];
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

    const actGetPackageById = async (id: any) => {
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
