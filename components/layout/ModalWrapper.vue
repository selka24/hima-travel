<template>
    <div v-show="triggerModal" class="px-5">
        <div class="fixed top-0 bottom-0 right-0 left-0 bg-gray-normal/80 z-[500] backdrop-blur-[5px]">
        </div>
        <div class="rounded-[30px] p-8 fixed z-[600] top-[80px] left-1/2 -translate-x-1/2 bg-white w-full max-w-[540px]">
            <div @click="toggleTrigger"
                 class="absolute -right-9 -top-9 cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                <nuxt-icon name="close" class="text-xl" filled/>
            </div>
            <component :is="TellUsModal"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useTriggerModal} from "~/composables/triggerModal";
import TellUsModal from "~/components/modals/TellUsModal.vue";

const {triggerModal, toggleTrigger} = useTriggerModal();
const testTrigger = () => {
    console.log('I got triggered from a composable')
}


// const testModal = () => resolveComponent('ModalsTestModal');


watch(triggerModal, testTrigger)
</script>

<style scoped>

</style>
