<template>
    <div class="relative">
        <LazySearchTypes v-if="showTypes"/>
        <div class="grid sm:grid-cols-6 lg:grid-cols-9 gap-y-4 gap-x-2.5 pt-8 px-10 bg-gradient-to-r rounded-[20px] from-white/70 to-white/20 w-full backdrop-blur-[3px] relative z-20 ">
            <travel-places class="sm:col-span-6 lg:col-span-5"/>
            <travel-calendar class="sm:col-span-4 lg:col-span-2"/>
            <travel-nights class="sm:col-span-1 lg:col-span-1"/>
            <div class="col-span-1 relative">
                <tooltip class="min-w-max" :trigger="showErrorMessage" :timeout="1000" theme="error" message="Plotesoni te gjitha fushat!"/>
                <button-default @click="handlePackageSearch" class="w-full h-[70px] mb-12">Kërko</button-default>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import TravelPlaces from "~/components/TravelPlaces.vue";
import TravelNights from "~/components/TravelNights.vue";

defineProps(['showTypes'])

const mainStore = useMainStore()
const {actGetPackagesSearch} = mainStore;
const router = useRouter();
const showErrorMessage = ref(0)

const handlePackageSearch = async () => {
    if(!mainStore.getSearchParams){
        showErrorMessage.value++;
    } else {
        // if(useRoute().path === '/search') {
            await actGetPackagesSearch();
        // }
        console.log('teest')
        router.push({path: '/search', query: mainStore.getSearchParams})
    }
}
</script>

<style scoped>

</style>
