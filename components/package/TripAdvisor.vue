<script setup lang="ts">
defineProps<{mobile:boolean}>()
</script>

<template>
    <div class="flex gap-1 sm:flex-col items-center text-sm text-center">
        <div class="flex gap-1 sm:gap-2">
            <nuxt-icon name="tripadvisor" :class="`${mobile ? 'text-3xl' : 'text-5xl'}`"/>
            <div class="flex items-center gap-1">
                <div v-for="idx in 5" class="rounded-full border border-green-700 w-3 h-3 sm:w-4 sm:h-4 relative overflow-hidden" :key="idx">
                    <div :class="['bg-green-700 absolute top-0 left-0', `${idx === 5 ? 'w-1.5 h-3 sm:w-3 sm:h-4 rounded-[6px_0_0_6px]' : 'w-3 h-3 sm:w-4 sm:h-4 rounded-full'}`]"/>
                </div>
            </div>
        </div>
        <div class="text-xs sm:base-text">
            {{ mobile ? '4.5/5' : 'Vlerësuar 5/5' }}
        </div>
        <div class="text-xs sm:base-text">
            {{ mobile ? '1971 Reviews' : 'Bazuar ne 1971 Reviews' }}
        </div>
    </div>
</template>

<style scoped>

</style>
