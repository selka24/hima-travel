<script setup lang="ts">
import PreviewCard from "~/components/cards/PreviewCard.vue";
import ZbuloBoten from "~/components/sections/ZbuloBoten.vue";
import PreviewCardLoading from "~/components/cards/PreviewCardLoading.vue";
const mainStore = useMainStore();
const loadingPackage = ref(true)

const getPackageInspiration = async () => {
    await mainStore.actGetInspiration();
    loadingPackage.value = false;

}

onMounted(() => {
    // if(!mainStore.fromServer)
    getPackageInspiration()
    // mainStore.fromServer = false;
})
</script>

<template>
    <div class="flex justify-center px-5 lg:px-10">
        <div class="max-w-page w-full">
            <section class="flex justify-center items-end mt-24 mb-16">
                <div class="text-3xl">
                    Ofertat më poshtë janë me nisje nga
                </div>
                <div class="text-primary text-4xl font-bold ml-3">Tirana</div>
            </section>
                <section v-if="loadingPackage" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-page relative">
                    <preview-card-loading v-for="idx in 10" :key="idx + 'load'"/>
                </section>
                <section v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-page relative">
                    <preview-card v-for="offer in mainStore.destinationOffers" :key="offer.id + 'prw-card'" :travel-package="offer"/>
                </section>
            <section class="mt-40">
                <ZbuloBoten class="w-full"/>
            </section>
        </div>
    </div>
</template>

<style scoped>

</style>
