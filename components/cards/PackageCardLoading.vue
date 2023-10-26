<script setup lang="ts">

</script>

<template>
    <div class="grid grid-cols-12 border-2 border-gray-normal rounded-[30px] bg-white">
        <div class="p-7 col-span-12 md:col-span-9 lg:col-span-8 xl:col-span-5">
            <div class="animate-pulse bg-gray-light w-full h-full min-h-[384px] rounded-[20px] transition-all"></div>
        </div>
        <div class="p-7 col-span-12 sm:col-span-8 md:order-last md:col-span-11 lg:col-span-10 xl:order-none xl:col-span-4 flex flex-col">
            <div class="rounded-xl h-9 font-bold w-2/3 animate-pulse bg-gray-light mb-10"></div>
            <div class="h-10 w-full bg-gray-light animate-pulse mb-10 rounded-xl"></div>
            <div class="flex flex-col gap-y-3.5">
                <div v-for="idx in 6" class="flex gap-4 items-center">
                    <div class="w-6 h-6 bg-gray-light animate-pulse rounded-lg"></div>
                    <div class="h-5 bg-gray-light animate-pulse rounded-lg text-transparent w-full"></div>
                </div>
            </div>
        </div>
        <div class="flex py-7 sm:py-0 justify-between sm:flex-col sm:justify-center items-center col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-3 px-5 md:bg-gray-lighter/30 rounded-r-[30px]">
            <div class="flex flex-col items-center sm:mt-auto sm:mb-20">
                <div class="h-6 bg-gray-light animate-pulse mb-7 w-24 rounded-lg"></div>
                <div class="h-16 text-[36px] lg:text-[55px] w-full min-w-max text-transparent animate-pulse bg-gray-light rounded-lg">399999</div>
            </div>
            <div class="h-[70px] max-w-[260px] w-full bg-gray-light animate-pulse sm:mb-14 rounded-lg"></div>
        </div>
    </div>
</template>

<style scoped>

</style>
