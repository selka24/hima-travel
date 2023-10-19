<script setup lang="ts">
    import {useTrigger} from "~/composables/trigger";

    const {trigger} = useTrigger();
    const testTrigger = () => {
        console.log('I got triggered from a composable')
    }

    watch(trigger, testTrigger)
</script>

<template>
    <div>

    </div>
</template>

<style scoped>

</style>
