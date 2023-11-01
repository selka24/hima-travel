<script setup lang="ts">
import PreviewCard from "~/components/cards/PreviewCard.vue";
const samplePackage: Package = {
    id: -1,
    image: 'roma.png',
    country: 'Roma',
    price: 299,
    currency: 'eur',
    description: 'Oferta për Paketa Turistike - Pushime në Romë Itali 2023',
    logo: 'roma',
    offers: 6
}
</script>

<template>
    <div class="flex justify-center">
        <div class="max-w-page w-full">
            <div class="flex justify-center items-end mt-24 mb-16">
                <div class="text-3xl">
                    Ofertat më poshtë janë me nisje nga
                </div>
                <div class="text-primary text-4xl font-bold ml-3">Tirana</div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-page">
                <preview-card v-for="idx in 9" :key="idx + 'prw-card'" :travel-package="samplePackage"/>
            </div>
            <div></div>
        </div>
    </div>
</template>

<style scoped>

</style>
