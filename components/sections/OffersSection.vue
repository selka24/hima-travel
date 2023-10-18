<script setup lang="ts">
import PreviewCard from "~/components/cards/PreviewCard.vue";

const samplePackage: Package = {
    id: null,
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
    <div class="flex flex-col items-center px-5 lg:px-10">
        <div class="flex items-center max-w-screen-2xl">
            <div class="text-[32px]">Ofertat më poshtë janë me nisje nga</div>
            <div class="text-primary text-4xl ml-7 font-bold">Tirana</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-screen-2xl">
            <preview-card v-for="idx in 9" :key="idx + 'prw-card'" :travel-package="samplePackage"/>
        </div>
        <nuxt-link to="/" class="mt-44 font-normal border border-primary px-36 py-5 rounded-[10px]">VIEW ALL DEALS</nuxt-link>
    </div>
</template>

<style scoped>

</style>
