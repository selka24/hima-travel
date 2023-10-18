<script setup lang="ts">
    import {contactInfo, pages} from "~/constants";
</script>

<template>
    <div class="flex justify-center mt-72 px-5 lg:px-10">
        <div class="max-w-screen-2xl grid grid-cols-5 h-[500px] w-full">
            <div class="col-span-2">
                <nuxt-img src="/images/red-logo.png"  width="140" height="56" class="max-w-[222px] w-full"/>
                <div class="text-xl font-bold mt-10">
                    10 VITE HIMA TRAVEL AGJENSI
                    <br>
                    TURISTIKE TIRANE & BILETA AVIONI
                </div>
            </div>
            <div class="col-span-1 flex flex-col gap-7">
                <div class="text-primary font-bold text-xl">Kontakt</div>
                <div v-for="info in contactInfo" v-html="info"/>
            </div>
            <div class="col-span-1 flex flex-col gap-7">
                <div class="text-primary font-bold text-xl">Menu</div>
                <div v-for="menu in pages">
                    {{menu.title}}
                </div>
            </div>
            <div class="col-span-1 flex flex-col gap-7">
                <div class="text-primary font-bold text-xl">Na ndiqni</div>
                <div v-for="menu in pages">
                    {{menu.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
