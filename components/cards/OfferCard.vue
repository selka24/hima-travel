<script setup lang="ts">
    const props = defineProps<{package: FullPackage}>()
</script>

<template>
    <div class="bg-white relative p-7 text-secondary rounded-[30px] border border-gray-normal">
        <div class="relative rounded-[10px] overflow-hidden">
            <nuxt-img src="images/roma.png" width="383" height="400"/>
            <div class="font-bold text-5xl absolute-center text-white">ROME</div>
        </div>
        <div class="mt-7 items-center flex justify-between">
            <div>
                <div class="text-2xl font-bold">Rome</div>
                <div class="text-gray-normal">nga Tirana</div>
            </div>
            <div class="ml-auto text-right">
                <div class="text-5xl font-bold">299€</div>
                <div class="text-gray-normal">personi</div>
            </div>
        </div>
        <div class="border-y border-primary mt-4 mb-5 py-3">
            <div class="text-lg font-bold">Bileta udhëtimi + Hotel me 3 yje + Hyrje në Muze</div>
            <div class="mt-4 flex justify-between">
                <div>
                    <div class="text-[#55C7F8]">Nisja</div>
                    <div class="text-gray-normal">
                        22/08/2023
                    </div>
                </div>
                <div>
                    <div class="text-[#55C7F8]">Nisja</div>
                    <div class="text-gray-normal">
                        23/08/2023
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-2 mb-10">
            <span class="text-[#55C7F8]">Ofert Skadon:</span>
            <span class="text-primary">8 Ore / 20 Minuta / 54 Sekonda</span>
        </div>
        <button-default class="uppercase px-8 py-4 font-normal absolute left-1/2 -translate-x-1/2">më shumë</button-default>
    </div>
</template>

<style scoped>

</style>
