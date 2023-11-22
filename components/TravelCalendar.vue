<template>
    <div>
        <input-skeleton :class="['relative cursor-pointer', {'border border-primary': error}]" v-click-outside="hideCalendar" @click="showCalendar">
            <div>
                {{ mainStore.selectedDate?.toDateString() || 'Data e nisjes'}}
            </div>
            <transition name="slide-fade">
                <div v-if="show" :class="['absolute top-[60px] sm:top-[80px] z-20 w-full']">
<!--                    <div v-if="loadingAvailableDates" class="rounded-md absolute w-full h-full animate-pulse bg-gray-normal opacity-20 z-[10]"></div>-->
                    <CDatePicker
                        v-model="mainStore.selectedDate"
                        ref="travelCalendar"
                        :expanded="true"
                        :attributes="attributes"
                        mode="date"
                        color="red"
                        :min-date="minDate"
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
    const currMonth = ref<number | null>(null);
    const currYear = ref<number | null>(null);
    const error = ref('');
    const travelCalendar = ref(null);
    const minDate = ref(new Date())
    const hideCalendar = () => {
        show.value = false;
        new Date().toLocaleDateString()
    }

    const moveToAvailable = () => {
        if(mainStore.availableDates.length){
            const currAvail = new Date(mainStore.availableDates[0]);
            minDate.value = currAvail;
            const month = currAvail.getMonth() + 1;
            const year = currAvail.getFullYear();
            currMonth.value = month;
            currYear.value = year;
            // travelCalendar.value?.move({month, year});
        }
    }
    const showCalendar = async () => {
        if(mainStore.selectedDestination) {
            if(show.value) return;
            loadingAvailableDates.value = true;
            await mainStore.actGetAvailableDates({});
            moveToAvailable();
            show.value = true;
            loadingAvailableDates.value = false;
        } else {
            error.value = 'Ju lutem zgjidhni destinacionin!'
            setTimeout(() => {
                error.value = '';
            }, 2000)
        }
    }


    const attributes = computed(() => {
        return mainStore.availableDates.map((d) => {
            return {
                highlight: {
                    color: 'green',
                    fillMode: 'light',
                },
                dates: new Date(d),
            }
        })
    })

    const disabledDates = computed(() => {
        if(currYear.value && currMonth.value){
            const datesOfMonth = getAllDatesInMonth(currYear.value, currMonth.value);
            if(mainStore.availableDates.length && currYear.value && currMonth.value){
                return datesOfMonth.filter((date) => {
                    return mainStore.availableDates.findIndex(d => new Date(d).getDate() === date.getDate()) < 0;
                })
            }
            return datesOfMonth;
        }
        const today = new Date();
        return getAllDatesInMonth(today.getFullYear(), today.getMonth() + 1);
    })
    const handlePageUpdate = async (page: any) => {
        const {month, year} = page[0];
        if(month !== currMonth.value || year !== currYear.value){
            currMonth.value = month;
            currYear.value = year;
            // loadingAvailableDates.value = true;
            await mainStore.actGetAvailableDates({month, year});
            // loadingAvailableDates.value = false;
        }
    }
</script>
<style scoped></style>
