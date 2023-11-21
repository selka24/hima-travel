<script setup lang="ts">
const triggerInfoPoint = ref(false);
const me = ref<HTMLElement | null>(null)
const parentWidth = ref(260)

const parent = computed(() => {
    return me.value?.parentElement || null;
})

useResizeObserver(parent, () => {
    parentWidth.value = parent.value?.offsetWidth || 260
});

const handleTriggerInfo = (timeout: number, close?: number) => {
    if(close !== 1){
        triggerInfoPoint.value = true;
    }
    if(!isNaN(timeout)){
        setTimeout(() => {
            triggerInfoPoint.value = false
        }, timeout)
    }
}

onMounted(() => {
    parentWidth.value = parent.value?.offsetWidth || 260
})
</script>

<template>
    <div class="font-normal" ref="me">
        <div class="relative">
            <div v-if="triggerInfoPoint" :class="`arrow absolute z-[31] -top-3 left-1/2 -translate-x-1/2 border-b-[15px] border-b-gray-hard`"></div>
            <nuxt-icon @mouseenter="handleTriggerInfo" @mouseleave="handleTriggerInfo(100, 1)" @click="handleTriggerInfo(2000)" name="info" class="text-inherit"/>
        </div>
        <div v-if="triggerInfoPoint" :class="['bg-gray-hard text-white opacity-100 left-0 top-8 absolute z-[30] px-3 py-2 text-sm transition-opacity duration-300 rounded-lg shadow-sm', `w-${parentWidth}`]">
            <div class="max-w-max w-full">
                <slot>Info point message</slot>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
