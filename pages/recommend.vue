<script setup lang="ts">
import OfferCard from "~/components/cards/OfferCard.vue";

const route = useRoute();
const mainStore = useMainStore();
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
}

onMounted(() => {
    getRecommends();
})
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 max-w-page mt-11">
            <OfferCard v-for="(pckg, key) in mainStore.destinationPackages" :key="key" :package="pckg" />
<!--            <div v-for="(key, pckg) in mainStore.destinationPackages" package="">-->
<!--                {{pckg}}-->
<!--            </div>-->
        </div>
    </div>
</template>

<style scoped>

</style>
