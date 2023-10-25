<script setup lang="ts">

</script>

<template>
    <div class="grid grid-cols-12 border-2 border-gray-normal rounded-[30px] bg-white">
        <div class="p-7 col-span-12 lg:col-span-5 xl:col-span-5">
            <div class="animate-pulse bg-gray-light w-full h-full rounded-[20px] transition-all"></div>
        </div>
        <div class="p-7 col-span-8 lg:col-span-5 xl:col-span-4 flex flex-col">
            <div class="rounded-xl h-9 font-bold w-2/3 animate-pulse bg-gray-light mb-10"></div>
            <div class="h-10 w-full bg-gray-light animate-pulse mb-10 rounded-xl"></div>
            <div class="flex flex-col gap-y-6">
                <div v-for="idx in 6" class="flex gap-4 items-center">
                    <div class="w-6 h-6 bg-gray-light animate-pulse rounded-lg"></div>
                    <div class="h-5 bg-gray-light animate-pulse rounded-lg text-transparent w-full"></div>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center col-span-4 lg:col-span-2 xl:col-span-3 px-5 bg-gray-lighter/30 rounded-r-[30px]">
            <div class="h-6 mt-auto bg-gray-light animate-pulse mb-2 w-20 rounded-lg"></div>
            <div class="h-16 w-full max-w-[140px] text-transparent mb-20 animate-pulse bg-gray-light rounded-lg">399€</div>
            <div class="h-[70px] w-full bg-gray-light animate-pulse mb-14 rounded-lg"></div>
        </div>
    </div>
</template>

<style scoped>

</style>
