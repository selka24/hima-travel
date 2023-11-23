<template>
    <div :class="['relative flex flex-col max-h-[750px]']" :style="{height: height}">
        <nuxt-img format="webp"  width="1920" height="1080" class="w-full h-full object-cover absolute top-0 left-0 z-0 max-h-[750px]" :style="{'height': height}"  src="/images/bg4.png" alt="Background Image"/>
        <div class="bg-gradient-to-r from-black/20 absolute w-full h-full left-0 top-0 z-0" :style="{'max-height': height}" />
        <div class="flex flex-1 relative z-10 justify-center px-3.5 sm:px-5 lg:px-10">
            <div class="flex flex-col max-w-page w-full mt-5 sm:mt-4">
                <div class="text-white">
                    <nuxt-img format="webp"  width="278" height="102" src="/images/white-logo.png" class="max-w-[180px] ml-[-26px] mb-4 sm:mb-7" alt="hima white logo"/>
                    <h1 class="font-bold text-[30px] sm:text-[40px] md:text-[70px] leading-[1.1]">
                        Rezervo aventurat
                        <br>
                        me HimaTrips
                    </h1>
                    <p class="text-xl mt-4">
                        Lehtë, Thjeshtë, Bukur.
                    </p>
                </div>
                <travel-search :show-types="true" class="mt-[70px] z-[20]"/>
            </div>
        </div>
        <Reviews class="z-[10] mb-5"/>
    </div>
</template>
<script setup lang="ts">
import TravelSearch from "~/components/TravelSearch.vue";
import Reviews from "~/components/Reviews.vue";

const height = ref('100dvh');

onMounted(() => {
    if(process.client){
        height.value = window.innerHeight + 'px';
    }
})

</script>
<style scoped>
</style>
