<script setup lang="ts">
import OfferCard from "~/components/cards/OfferCard.vue";
import PreviewCardLoading from "~/components/cards/PreviewCardLoading.vue";

const route = useRoute();
const mainStore = useMainStore();
const loading = ref(true);
const getRecommends = async () => {
    const {query} = route;
    if(query.destinationId){
        const id = Number(query.destinationId)
        if(!isNaN(id)){
            await mainStore.actGetDestinationPackages(id);
        } else {
            alert(`Destination id is not correct: ${id}`)
        }
    }
    loading.value = false;
}

const destination = computed(() => {
    const allDestination = mainStore.allOrigins[0]?.destinations;
    if(allDestination){
        return  allDestination.find(x => x.id === Number(route.query?.destinationId));
    }
    return null
})

onMounted(() => {
    getRecommends();
})
</script>

<template>
    <div class="flex flex-col items-center px-3.5 sm:px-5 lg:px-10 mt-11">
        <div class="flex items-center">
            <div class="text-3xl">Udhëtim në</div>
            <div class="text-primary text-4xl ml-3 font-bold">{{ destination?.name || 'Destinacioni nuk ekziston' }}</div>
        </div>
        <div v-if="loading" class="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 max-w-page mt-11">
            <PreviewCardLoading v-for="idx in 6" :key="idx + 'rec'"/>
        </div>
        <div v-else class="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 max-w-page w-full mt-11">
            <OfferCard v-for="(pckg, date) in mainStore.destinationPackages" :key="date" :date="date" :package="pckg" :sqDestination="destination?.name"/>
        </div>
    </div>
</template>

<style scoped>

</style>
