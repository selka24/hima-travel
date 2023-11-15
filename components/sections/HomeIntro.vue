<template>
    <div class="min-h-[100vh] relative">
        <nuxt-img format="webp"  width="1920" height="1080" class="w-full h-full max-h-[100vh] object-cover absolute top-0 left-0 z-0"  src="/images/bg-image.png" alt="Background Image"/>
        <div class="bg-gradient-to-r from-black/20 absolute w-full max-h-[100vh] h-full left-0 top-0 z-0"/>
        <div class="flex relative z-10 justify-center px-5 lg:px-10">
            <div class="flex flex-col max-w-page w-full mt-14">
                <div class="text-white">
                    <nuxt-img format="webp"  width="278" height="102" src="/images/white-logo.png" class="max-w-[180px] ml-[-26px] mb-10 lg:mb-44" alt="hima white logo"/>
                    <div class="mt-9 font-bold">
                        <span class="text-[40px] md:text-[50px] lg:text-[62px] leading-[64px]">
                            Zbuloni
                        </span>
                        <span class="text-[30px] md:text-[40px] lg:text-[52px] leading-[64px]">
                            Destinacionet
                        </span>
                    </div>
                    <div class="text-[30px] md:text-[40px] lg:text-[52px] font-bold leading-tight">
                        Rezervoni Aventurat
                    </div>
                    <p class="text-xl mt-1">
                        E Lehtë, e Thjeshtë, e Bukur.
                    </p>
<!--                    <p>Zbuloni ofertat më të mira dhe rezervoni tuajat sot.</p>-->
                </div>
                <travel-search :show-types="true" class="mt-14"/>
            </div>
        </div>
        <Reviews class="absolute bottom-5 z-[10]"/>
    </div>
</template>
<script setup lang="ts">
import TravelSearch from "~/components/TravelSearch.vue";
import Reviews from "~/components/Reviews.vue";
</script>
<style scoped>
</style>
