import {format} from 'date-fns'
export const useMainStore = defineStore('main', () => {
    //state
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
            try {
                loadingPackages.value = true;
                const { data, error } = await $myApi('/packages/search', {
                    method: 'POST',
                    body: getSearchParams.value,
                })
                if(error) throw new Error(error);
                console.log(data, 'dataaaaa')
                travelPackages.value = data
            } catch (error: any) {
                console.log({error: error.status}, 'errrorrr')
                if(error.status === 404) {
                    travelPackages.value = null;
                }
            } finally {
                loadingPackages.value = false;
            }
        }
    }

    return {
        allOrigins,
        allDestinations,
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
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
