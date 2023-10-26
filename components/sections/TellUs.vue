<script setup lang="ts">
    import {useTriggerModal} from "~/composables/triggerModal";

    const {toggleTrigger} = useTriggerModal();
</script>

<template>
    <div class="border-gray-normal border min-w-max rounded-[30px] flex gap-1 px-14 bg-white py-4">
        <div>The results are not good?</div>
        <div class="cursor-pointer underline text-primary" @click="toggleTrigger">Tell us!</div>
    </div>
</template>

<style scoped>

</style>
