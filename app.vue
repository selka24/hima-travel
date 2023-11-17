<template>
    <div>
        <ModalWrapper/>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import ModalWrapper from "~/components/layout/ModalWrapper.vue";
const mainStore = useMainStore();

if(process.server){
    await mainStore.actGetOrigins();
}
</script>
<style scoped>

</style>
