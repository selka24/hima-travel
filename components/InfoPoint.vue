<script setup lang="ts">
const triggerInfoPoint = ref(false);
const handleTriggerInfo = (timeout: number, close?: number) => {
    if(close !== 1){
        triggerInfoPoint.value = true;
    }
    console.log(timeout, 'timeout')
    if(!isNaN(timeout)){
        setTimeout(() => {
            triggerInfoPoint.value = false
        }, timeout)
    }
}
</script>

<template>
    <div class="font-normal">
        <div class="relative">
            <div v-if="triggerInfoPoint" :class="`arrow absolute z-[31] -top-2 left-1/2 -translate-x-1/2 border-b-[15px] border-b-gray-hard`"></div>
            <nuxt-icon @mouseenter="handleTriggerInfo" @mouseleave="handleTriggerInfo(500, 1)" @click="handleTriggerInfo(2000)" name="info" class="text-inherit"/>
            <div v-if="triggerInfoPoint" :class="['min-w-[260px] max-w-max bg-gray-hard text-white w-full opacity-100 left-1/2 -translate-x-1/3 top-9 absolute z-[30] px-3 py-2 text-sm transition-opacity duration-300 rounded-lg shadow-sm']">
                <slot>Info point message</slot>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
