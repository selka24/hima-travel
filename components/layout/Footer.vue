<script setup lang="ts">
    import {contactInfo, pages, socialNetworks} from "~/constants";
</script>

<template>
    <div class="flex justify-center mt-72 px-5 pb-14 pt-20 lg:px-10 bg-white">
        <DevOnly>
            <div class="fixed rounded-full bg-green-600 p-3 text-white top-3 z-[9999]">DEV MODE</div>
        </DevOnly>
        <div class="max-w-page flex justify-between w-full">
            <div class="hidden md:block">
                <nuxt-img format="webp"  src="/images/red-logo.png" alt="red-logo"  width="140" height="56" class="max-w-[222px] w-full"/>
                <div class="text-xl font-bold mt-10">
                    10 VITE Hima TripsTRIPS
                    <br>
                    AGJENSI
                    TURISTIKE TIRANE
                    <br>
                    & BILETA AVIONI
                </div>
            </div>
            <div class="flex flex-wrap justify-between gap-10">
                <div class="flex flex-col gap-7">
                    <div class="text-primary font-bold text-xl">Kontakt</div>
                    <div v-for="info in contactInfo" v-html="info"/>
                </div>
<!--                <div class="flex flex-col gap-7">-->
<!--                    <div class="text-primary font-bold text-xl">Menu</div>-->
<!--                    <div v-for="menu in pages">-->
<!--                        {{menu.title}}-->
<!--                    </div>-->
<!--                </div>-->
                <div class="flex flex-col gap-7">
                    <div class="text-primary font-bold text-xl">Na ndiqni</div>
                    <a v-for="net in socialNetworks" :href="net.link"  target="_blank" class="flex min-w-max gap-1.5">
                        <nuxt-icon :name="net.title" filled class="text-2xl"/>
                        <div>{{net.title}}</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
