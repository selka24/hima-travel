<template>
    <div>
        <input-skeleton :class="['relative cursor-pointer !p-0', {'!rounded-b-[0]': show}, {'border border-primary': error}]" v-click-outside="hideNights">
            <div @click="showNights" class="w-full h-full flex items-center justify-center">
                {{ displayNights(mainStore.selectedNights) || 'Netët' }}
            </div>
            <transition name="slide-fade">
                <div v-if="show" class="z-[30] absolute bg-white left-0 top-[50px] sm:top-[70px] w-full shadow-[0_0_5px_0] shadow-gray-normal rounded-b-[10px] flex flex-col text-center pt-2.5 gap-2.5 overflow-auto max-h-[250px]">
                    <div v-for="night in currNights" @click="handleSelect(night)" class="cursor-pointer py-2.5 hover:bg-secondary/20 w-full">
                        {{displayNights(night)}}
                    </div>
                </div>
            </transition>
        </input-skeleton>
        <div :class="`text-primary ${error ? '' : 'invisible'} min-w-max mt-2`">
            {{error}}
        </div>
    </div>
</template>
<script setup lang="ts">
import InputSkeleton from "~/components/InputSkeleton.vue";
import {format} from "date-fns";

const mainStore = useMainStore();
const {displayNights} = useUtils();
const {$api} = useNuxtApp()

const currNights = ref<number[]>([]);
const show = ref(false);
const error = ref('');

const showNights = () => {
    if(mainStore.selectedDate){
        show.value = true;
        error.value = '';
    } else {
        error.value = 'Ju lutem zgjidhni datën!'
        setTimeout(() => {
            error.value = ''
        }, 2000)
    }
}
const hideNights = () => {
    show.value = false;
}
const handleSelect = (night: number) => {
    mainStore.selectedNights = night;
    hideNights();
}

const getAvailableNights = async (newDate: any) => {
    try {
        const response = await $api.post('/packages/available-nights', {
            checkin_date: format(newDate, 'yyyy-MM-dd'),
            origin_id: mainStore.selectedOrigin,
            destination_id: mainStore.selectedDestination
        })

        currNights.value = response.data;
    } catch (e) {
        currNights.value = []
    }
}

watch(() => mainStore.selectedDate, (newDate) => {
    getAvailableNights(newDate)
})
</script>
