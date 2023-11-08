<script setup lang="ts">
import OfferCard from "~/components/cards/OfferCard.vue";
import PreviewCardLoading from "~/components/cards/PreviewCardLoading.vue";

const route = useRoute();
const mainStore = useMainStore();
const loading = ref(true);
const getRecommends = async () => {
    const {query} = route;
    if(query.destinationId){
        console.log('query.destinationId', query.destinationId);
        const id = Number(query.destinationId)
        if(!isNaN(id)){
            await mainStore.actGetDestinationPackages(id);
        } else {
            alert(`Destination id is not correct: ${id}`)
        }
    }
    loading.value = false;
}

onMounted(() => {
    getRecommends();
})
</script>

<template>
    <div class="flex flex-col items-center px-5 lg:px-10">
        <div v-if="loading" class="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 max-w-page mt-11">
            <preview-card-loading v-for="idx in 6" :key="idx"/>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 max-w-page w-full mt-11">
            <OfferCard v-for="(pckg, key) in mainStore.destinationPackages" :key="key" :package="pckg" />
        </div>
    </div>
</template>

<style scoped>

</style>
