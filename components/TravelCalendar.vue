<template>
    <div>
        <input-skeleton :class="['relative cursor-pointer', {'border border-primary': error}]" v-click-outside="hideCalendar" @click="showCalendar">
            <div>
                {{ mainStore.selectedDate?.toDateString() || 'Data e nisjes'}}
            </div>
            <transition name="slide-fade">
                <div v-if="show" :class="['absolute top-[60px] sm:top-[80px] z-10 w-full']">
                    <div v-show="loadingAvailableDates" class="rounded-md absolute w-full h-full animate-pulse bg-gray-normal opacity-20 z-[10]"></div>
                    <CDatePicker
                        v-model="mainStore.selectedDate"
                        :expanded="true"
                        mode="date"
                        color="red"
                        :min-date="new Date()"
                        :disabled-dates="disabledDates"
                        @update:pages="handlePageUpdate"
                    />
                </div>
            </transition>
        </input-skeleton>
        <div :class="`text-primary ${error ? '' : 'invisible'} min-w-max mt-2`">
            {{error || 'Here will be displayed an error'}}
        </div>
    </div>
</template>
<script setup lang="ts">
    import 'v-calendar/style.css';
    import InputSkeleton from "~/components/InputSkeleton.vue";
    const CDatePicker = defineAsyncComponent(() => import("v-calendar").then(({DatePicker}) => {
        return DatePicker;
    }))

    const {getAllDatesInMonth} = useUtils();
    const mainStore = useMainStore();
    const show = ref<boolean>(false);
    const loadingAvailableDates = ref(false);
    const currMonth = ref(null);
    const currYear = ref(null);
    const error = ref('');
    const hideCalendar = () => {
        show.value = false;
        new Date().toLocaleDateString()
    }
    const showCalendar = () => {
        if(mainStore.selectedOrigin) {
            show.value = true;
        } else {
            error.value = 'Ju lutem zgjidhni destinacionin!'
            setTimeout(() => {
                error.value = '';
            }, 2000)
        }
    }

    const disabledDates = computed(() => {
        if(currYear.value && currMonth.value){
            const datesOfMonth = getAllDatesInMonth(currYear.value, currMonth.value);
            if(mainStore.availableDates.length){
                return datesOfMonth.filter((date) => {
                    return mainStore.availableDates.findIndex(d => new Date(d).getDate() === date.getDate()) < 0;
                })
            }
            return datesOfMonth;
        }
        return [];
    })
    const handlePageUpdate = async (page: any) => {
        const {month, year} = page[0];
        if(month !== currMonth.value || year !== currYear.value){
            currMonth.value = month;
            currYear.value = year;

            loadingAvailableDates.value = true;

            await mainStore.actGetAvailableDates({month, year});

            loadingAvailableDates.value = false;
        }
    }
</script>
<style scoped>

</style>
