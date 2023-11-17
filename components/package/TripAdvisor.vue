<script setup lang="ts">
defineProps<{mobile?:boolean}>()
</script>

<template>
    <div class="flex gap-1 sm:flex-col items-center text-xs sm:base-text text-center font-semibold">
        <div class="flex gap-1 sm:gap-2">
            <nuxt-icon name="tripadvisor" :class="`${mobile ? 'text-3xl' : 'text-5xl'}`"/>
            <div class="hidden 2xs:flex items-center gap-1">
                <div v-for="idx in 5" class="flex rounded-[50%] border border-green-700 w-3 h-3 sm:w-4 sm:h-4 overflow-hidden" :key="idx">
                    <div :class="['bg-green-700 inline-block', `${idx === 5 ? 'w-1.5 h-3 sm:w-2 sm:h-4' : 'w-3 h-3 sm:w-4 sm:h-4'}`]"/>
                </div>
            </div>
        </div>
        <div class="hidden md:block">
            {{ 'Vlerësuar 5/5' }}
        </div>
        <div class="block md:hidden">
            {{ '4.5/5'}}
        </div>
        <div class="hidden lg:block">
            {{'Bazuar ne 1971 Reviews'}}
        </div>
        <div class="block lg:hidden">
            {{ '1971 Reviews'}}
        </div>
    </div>
</template>

<style scoped>
</style>
