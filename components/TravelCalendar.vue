<template>
    <input-skeleton class="relative cursor-pointer" v-click-outside="hideCalendar" @click="showCalendar">
        <div>
            {{ mainStore.selectedDate?.toDateString() || 'Data e nisjes'}}
        </div>
        <transition name="slide-fade">
            <div v-if="show" class="absolute top-[80px] z-10">
                <DatePicker v-model="mainStore.selectedDate" mode="date" color="red" :min-date="new Date()"/>
            </div>
        </transition>
    </input-skeleton>
</template>
<script setup lang="ts">
    import {DatePicker} from "v-calendar";
    import 'v-calendar/style.css';

    const mainStore = useMainStore();
    const show = ref<boolean>(false);
    const hideCalendar = () => {
        show.value = false;
        new Date().toLocaleDateString()
    }
    const showCalendar = () => {
        show.value = true;
    }
</script>
<style scoped>

</style>
