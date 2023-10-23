<script setup lang="ts">
    import {useTrigger} from "~/composables/trigger";

    const {trigger} = useTrigger();
    const testTrigger = () => {
        console.log('I got triggered from a composable')
    }


    // const testModal = () => resolveComponent('ModalsTestModal');


    watch(trigger, testTrigger)
</script>

<template>
    <div>
        <div class="fixed top-0 bottom-0 right-0 left-0 bg-gray-normal/80 z-[20] blur-sm">

        </div>
        <div class="rounded-[30px] px-8 py-14 fixed z-[30] top-[100px] left-1/2 -translate-x-1/2 bg-white">
<!--            <component :is="testModal"/>-->
        </div>
    </div>
</template>

<style scoped>

</style>
