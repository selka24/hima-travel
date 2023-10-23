<script setup lang="ts">
    defineProps(['disabled'])
</script>

<template>
    <button :disabled="!!disabled" :class="['bg-primary text-white font-bold rounded-[10px] hover:shadow-[0_0_5px_0] hover:shadow-primary/60', {'bg-gray-normal hover:shadow-none': disabled}]">
        <slot>Button</slot>
    </button>
</template>

<style scoped>

</style>
