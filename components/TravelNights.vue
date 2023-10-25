<template>
    <input-skeleton :class="['relative', {'!rounded-b-[0]': show}]" @click="showNights" v-click-outside="hideNights">
        <div class="min-w-max">
            {{ displayNights(mainStore.selectedNights) || 'Netët' }}
        </div>
        <transition name="slide-fade">
            <div v-if="show" class="absolute bg-white top-[70px] w-full shadow-[0_0_5px_0] shadow-gray-normal rounded-b-[10px] flex flex-col text-center pt-2.5 gap-2.5 overflow-auto max-h-[250px]">
                <div v-for="night in maxNights" @click="() => mainStore.selectedNights = night" class="cursor-pointer py-2.5 hover:bg-secondary/20 w-full">
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
const showNights = () => {
    show.value = true;
}
const hideNights = () => {
    show.value = false;
}
</script>
