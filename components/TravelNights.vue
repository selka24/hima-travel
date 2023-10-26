<template>
    <input-skeleton :class="['relative cursor-pointer px-0', {'!rounded-b-[0]': show}]" v-click-outside="hideNights">
        <div class="min-w-max w-full h-full flex items-center justify-center" @click="toggleNights">
            {{ displayNights(mainStore.selectedNights) || 'Netët' }}
        </div>
        <transition name="slide-fade">
            <div v-if="show" class="z-[30] absolute bg-white top-[70px] w-full shadow-[0_0_5px_0] shadow-gray-normal rounded-b-[10px] flex flex-col text-center pt-2.5 gap-2.5 overflow-auto max-h-[250px]">
                <div v-for="night in maxNights" @click="handleSelect(night)" class="cursor-pointer py-2.5 hover:bg-secondary/20 w-full">
                    {{displayNights(night)}}
                </div>
            </div>
        </transition>
    </input-skeleton>
</template>
<script setup lang="ts">
const mainStore = useMainStore();
const maxNights = 10;

const show = ref(false);
const displayNights = (nights: number) => {
    if(!nights) return '';
    return nights + (nights > 1 ? ' Netë' : ' Natë')
}
const toggleNights = () => {
    show.value = !show.value;
    console.log('toggle Nights ', (show.value ? 'opened' : 'closed'))
}
const hideNights = () => {
    show.value = false;
}
const handleSelect = (night: number) => {
    mainStore.selectedNights = night;
    hideNights();
}
</script>
