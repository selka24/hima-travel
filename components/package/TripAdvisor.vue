<script setup lang="ts">
const props = defineProps<{mobile?:boolean, score: string | null, count: number | null}>()

const numberScore = computed(() => {
    if(!props.score) return 0;
    const num = Number(props.score);
    return Number(num.toFixed(1));
})

const displayCount = computed(() => {
    return props.count || 0
})
</script>

<template>
    <div class="flex gap-1 sm:flex-col items-center text-xs sm:base-text text-center font-semibold">
        <div class="flex gap-1 sm:gap-2">
            <nuxt-icon name="tripadvisor" :class="`${mobile ? 'text-3xl' : 'text-5xl'}`"/>
            <div class="hidden 2xs:flex items-center gap-1">
                <div v-for="idx in 5" class="flex rounded-[50%] border border-green-700 w-3 h-3 sm:w-4 sm:h-4 overflow-hidden" :key="idx">
                    <div :class="['inline-block', `${numberScore > idx-1 && numberScore < idx ? 'w-1.5 h-3 sm:w-2 sm:h-4' : 'w-3 h-3 sm:w-4 sm:h-4'}`, {'bg-green-700': idx <= Math.ceil(numberScore) }]"/>
                </div>
            </div>
        </div>
        <div class="hidden md:block">
            {{ `Vlerësuar ${numberScore}/5` }}
        </div>
        <div class="block md:hidden">
            {{ `${numberScore}/5`}}
        </div>
        <div class="hidden lg:block">
            {{`Bazuar ne ${displayCount} Reviews`}}
        </div>
        <div class="block lg:hidden">
            {{ `${displayCount} Reviews`}}
        </div>
    </div>
</template>
<style scoped>
</style>
