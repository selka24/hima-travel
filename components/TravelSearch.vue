<template>
    <div class="relative">
        <SearchTypes v-if="showTypes"/>
        <div class="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-9 sm:gap-y-4 gap-x-2.5 pt-8 px-5 sm:px-10 bg-gradient-to-r rounded-[20px] from-white/90 to-white/80 w-full backdrop-blur-[3px] relative z-20 ">
            <travel-places class="col-span-2 sm:col-span-6 lg:col-span-5"/>
            <travel-calendar class="col-span-1 sm:col-span-4 lg:col-span-2"/>
            <travel-nights class="col-span-1 sm:col-span-1 lg:col-span-1"/>
            <div class="col-span-2 sm:col-span-1 relative">
                <tooltip class="min-w-max" :trigger="showErrorMessage" :timeout="1000" theme="error" message="Plotesoni te gjitha fushat!"/>
                <button-default @click="handlePackageSearch" class="w-full h-[50px] sm:h-[70px] justify-center items-center mb-12 flex gap-3">
                    <nuxt-icon name="search" class="text-lg" filled/>
                    <div>Kërko</div>
                </button-default>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import TravelPlaces from "~/components/TravelPlaces.vue";
import TravelNights from "~/components/TravelNights.vue";
import ButtonDefault from "~/components/ButtonDefault.vue";
import Tooltip from "~/components/Tooltip.vue";
import TravelCalendar from "~/components/TravelCalendar.vue";
// import SearchTypes from "~/components/SearchTypes.vue";

const SearchTypes = defineAsyncComponent(() => import('./SearchTypes.vue'))
defineProps(['showTypes'])

const mainStore = useMainStore();
const router = useRouter();
const route = useRoute();
const showErrorMessage = ref(0)

const handlePackageSearch = () => {
    if(!mainStore.getSearchParams){
        showErrorMessage.value++;
    } else {
        //refresh param is used to trigger the search page route watcher to get
        //packages when search params are not changed,
        //acting like a refresh
        const {refresh} = route.query;
        let refreshValue = Number(refresh);
        if(!isNaN(refreshValue)){
            refreshValue = refreshValue + 1;
        } else {
            refreshValue = 0;
        }

        router.push({path: '/search', query: {...mainStore.getSearchParams, refresh: refreshValue, page: 1}})
    }
}
</script>

<style scoped>

</style>
