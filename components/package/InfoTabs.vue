<template>
    <ArrowTabs @tab-change="handleTabChange"
               :tabs="tabs"
               :bgTriangle="bgTriangle"
               :active-tab="activeTab"
               class="mb-8">
        <template #default="{tab}">
            <div class="flex items-center gap-3 text-sm sm:text-base">
                <nuxt-icon :name="tab.icon" class="text-xl hidden md:block"/>
                {{tab.title}}
            </div>
            <nuxt-icon class="hidden text-xl" :name="tab.icon" />
        </template>
    </ArrowTabs>
    <Carousel :slide-classes="['w-full min-h-[200px]']"
              :no-controls="true"
              @slideChange="handleTabChange"
              :current-slide="activeTab"
              :options="tabsContent">
        <template #option="{option}">
            <div class="absolute top-0 w-full">
                <div v-if="option.value === 1" v-html="option.content" class="hotelDscr"/>
                <div v-else class="flex flex-col gap-y-3.5 w-full">
                    <div v-for="(tab, idx) in option.content" :key="`${tab.value}-${idx}-inf`">
                        <div class="flex gap-4 items-center w-full relative text-sm sm:text-base">
                            <nuxt-icon v-if="tab.icon" :name="tab.icon" class="text-lg sm:text-2xl text-gray-normal"/>
                            <div v-else class="min-w-[24px]"/>
                            <div class="font-semibold" v-html="tab.value"/>
                            <info-point v-if="tab.infoPoint" class="text-gray-normal">
                                {{ tab.infoPoint }}
                            </info-point>
                        </div>
                    </div>
                    <div v-if="option.value === 2" class="italic text-xs mt-2">
                        Fluturime Alternative mund te perzgjidhni ne hapin tjeter
                    </div>
                </div>
            </div>
        </template>
    </Carousel>
</template>
<script setup lang="ts">
import Carousel from "~/components/Carousel.vue";
import ArrowTabs from "~/components/ArrowTabs.vue";
import InfoPoint from "~/components/InfoPoint.vue";

const {roomBasisInfo, formatDateSQ, displayNights} = useUtils();
const linkFlight = ref<HTMLElement | null>(null)
const props = defineProps<{ package: FullPackage, bgTriangle?: string }>();
const tabs = [
    {title: 'Të përfshira', icon: 'info'},
    {title: 'Hoteli', icon: 'bed'},
    {title: 'Fluturimi', icon: 'plane-departure'},
];

const hotel_data = props.package.hotel_data
const roomBasis = roomBasisInfo(hotel_data.room_basis);
const activeTab = ref(0);
const triggerInfoPoint = ref(false);

const handleTriggerInfo = (timeout: number, close?: number) => {
    if(close !== 1){
        triggerInfoPoint.value = true;
    }
    console.log(timeout, 'timeout')
    if(!isNaN(timeout)){
        setTimeout(() => {
            triggerInfoPoint.value = false
        }, timeout)
    }
}

const getFlightInfo = (flight: Flight) => {
    const data = JSON.parse(flight.extra_data);
    const departure = new Date(flight.departure);
    const arrival = new Date(flight.arrival);
    // const duration = formatDurationSQ(intervalToDuration({start: departure, end: arrival}));
    return {
        places: `${data.legs[0].origin.name} ${flight.origin} -> ${data.legs[0].destination.name} ${flight.destination}`,
        time: `${formatDateSQ(departure, 'dd, LLL yyyy -  HH:mm')} - ${formatDateSQ(arrival, 'HH:mm')}`,
        // duration
    }
}

const calendarDate = computed(() => {
    const date1 = new Date(hotel_data.check_in_date);
    const date2 = new Date(props.package.inbound_flight.departure);
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    if(month1 !== month2){
        return `${formatDateSQ(date1, 'd LLLL')} - ${formatDateSQ(date2, 'd LLLL')}`
    }
    return `${formatDateSQ(date1, 'd')} - ${formatDateSQ(date2, 'd LLLL')}`
})

const includedTab = computed(() => {
    return [
        {icon: 'calendar', value: `${displayNights(hotel_data.number_of_nights)}, ${calendarDate.value}`},
        {icon: 'backpack', value: 'Çantë dore 10 kg', infoPoint: 'Për të shtuar një bagazh, kontaktoni me operatorët tanë'},
        {icon: 'bed', value: JSON.parse(hotel_data.room_details)[0]},
        {icon: 'food', value: roomBasis, ...(props.package.hotel_data.room_basis === 'RO' ? {infoPoint: 'Për të shtuar vaktet e ushqimit kontaktoni me operatorët tanë'} : {})},
        {icon: 'plane-departure', value: `
            <span>Udhëtim V/A nga Tirana<span>
            &nbsp
            <span id="flight-${props.package.id}" class="underline cursor-pointer text-sm font-medium text-primary">
                Shiko më shumë
            </span>`
        }
    ]
})

const flightTab = computed(() => {
    const outbound = getFlightInfo(props.package.outbound_flight);
    const inbound = getFlightInfo(props.package.inbound_flight);
    return [
        {icon: 'plane-departure', value: outbound.places},
        {icon: '', value: outbound.time},
        // {icon: '', value: outbound.duration},
        {icon: 'plane-arrival', value: inbound.places},
        {icon: '', value: inbound.time},
        // {icon: '', value: inbound.duration},
    ]
})

const hotelTab = computed(() => {
    return props.package.hotel_data.hotel.description;
})


const tabsContent = computed(() => {
    return [
        {value: 0, content: includedTab.value},
        {value: 1, content: hotelTab.value},
        {value: 2, content: flightTab.value},
    ]
})

const handleTabChange = (tab: number) => {
    activeTab.value = tab;
}

const goToFlightTab = () => {
    activeTab.value = 2;
}

const linkFlightClick = () => {
    linkFlight.value = document.getElementById(`flight-${props.package.id}`);
    linkFlight.value?.addEventListener('click', goToFlightTab);
}

onMounted(() => {
    linkFlightClick();
})

onBeforeUnmount(() => {
    linkFlight.value?.removeEventListener('click', goToFlightTab);
})
</script>
<style>
.hotelDscr p{
    margin-left: 20px;
    line-height: 35px;
    font-weight: 600;
}

@media only screen and (max-width: 640px) {
    .hotelDscr p{
        margin-left: 20px;
        font-size: 14px;
        line-height: 35px;
        font-weight: 600;
    }
}
</style>
