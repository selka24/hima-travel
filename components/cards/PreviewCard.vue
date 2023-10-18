<script setup lang="ts">
    const props = defineProps<{
        travelPackage: Package
    }>()
</script>

<template>
    <div class="border border-gray-normal rounded-[30px] p-7 relative">
        <div class="relative group overflow-hidden rounded-[10px]  text-5xl text-white font-bold ">
            <nuxt-img class="transition-all ease-in duration-300 group-hover:scale-110 object-cover w-full min-h-[442px]" width="385" height="442" :src="`/images/${travelPackage.image}`" alt="roma preview"/>
            <div class="flex flex-col justify-end items-center transition-all ease-in duration-300 opacity-0 group-hover:opacity-100 absolute w-full h-full bg-primary/70  backdrop-blur-[1px] top-0 rounded-[10px]">
                <nuxt-icon :name="travelPackage.logo" filled class="text-[150px] mb-8"/>
                <div class="mb-40">
                    {{travelPackage.offers}} OFERTA
                </div>
            </div>
            <div class="transition-all ease-in duration-300 uppercase absolute bottom-1/2 left-1/2 -translate-x-1/2 group-hover:bottom-24">
                {{travelPackage.country}}
            </div>
        </div>
        <div class="flex mt-11 items-center">
            <div>
                <div class="text-2xl font-bold">{{travelPackage.country}}</div>
                <div class="text-gray-normal">{{travelPackage.offers}} Oferta</div>
            </div>
            <div class="ml-auto text-right">
                <div class="text-5xl font-bold">{{travelPackage.price}}€</div>
                <div class="text-gray-normal">personi</div>
            </div>
        </div>
        <div class="mt-11 font-bold text-lg mb-12">
            {{travelPackage.description}}
        </div>
        <button-default class="uppercase px-8 py-4 font-normal absolute left-1/2 -translate-x-1/2">zbulo ofertën</button-default>
    </div>
</template>

<style scoped>

</style>
