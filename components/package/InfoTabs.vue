<template>
    <ArrowTabs @tab-change="handleTabChange"
               :tabs="tabs"
               :bgTriangle="bgTriangle"
               :active-tab="activeTab"
               class="mb-10"
    />
    <Carousel :slide-classes="['w-full h-full min-h-[230px]']"
              :no-controls="true"
              :current-slide="activeTab"
              :options="tabsContent">
        <template #option="{option}">
            <div class="flex flex-col gap-y-3.5 absolute top-0">
                <div v-for="(tab, idx) in option.content" :key="`${tab.value}-${idx}-inf`" class="flex gap-4 items-center">
                    <nuxt-icon v-if="tab.icon" :name="tab.icon" filled class="text-2xl"/>
                    <div v-else class="min-w-[24px]"/>
                    <div class="font-bold">{{ tab.value }}</div>
                </div>
            </div>
        </template>
    </Carousel>
</template>
<script setup lang="ts">
import {intervalToDuration} from "date-fns";

const {roomBasisInfo, formatDateSQ, formatDurationSQ, displayNights} = useUtils();
const props = defineProps<{ package: FullPackage, bgTriangle?: string }>();
const tabs = ['Të përfshira', 'Hoteli', 'Fluturimi'];

const hotel_data = props.package.hotel_data
const roomBasis = roomBasisInfo(hotel_data.room_basis);
const activeTab = ref(0);

const getFlightInfo = (flight: Flight) => {
    const data = JSON.parse(flight.extra_data);
    const departure = new Date(flight.departure);
    const arrival = new Date(flight.arrival);
    console.log({departure, arrival})
    const duration = formatDurationSQ(intervalToDuration({start: departure, end: arrival}));
    return {
        places: `${data.legs[0].origin.name} ${flight.origin} -> ${data.legs[0].destination.name} ${flight.destination}`,
        time: `${formatDateSQ(departure, 'dd, LLL yyyy -  HH:mm')} - ${formatDateSQ(arrival, 'dd, LLL yyyy -  HH:mm')}`,
        duration
    }
}

const includedTab = computed(() => {
    return [
        {icon: 'calendar', value: `${displayNights(hotel_data.number_of_nights)}, ${formatDateSQ(new Date(hotel_data.check_in_date), 'iiii, d LLLL yyyy')}`},
        {icon: 'backpack', value: 'Bagazh krahu 10 kg'},
        {icon: 'bed', value: JSON.parse(hotel_data.room_details)[0]},
        {icon: 'food', value: roomBasis},
    ]
})

const flightTab = computed(() => {
    const outbound = getFlightInfo(props.package.outbound_flight);
    const inbound = getFlightInfo(props.package.inbound_flight);
    return [
        {icon: 'plane-departure', value: outbound.places},
        {icon: '', value: outbound.time},
        {icon: '', value: outbound.duration},
        {icon: 'plane-arrival', value: inbound.places},
        {icon: '', value: inbound.time},
        {icon: '', value: inbound.duration},
    ]
})

const hotelTab = computed(() => {
    return [
        {icon: 'plane-departure', value: `${formatDateSQ(new Date(hotel_data.check_in_date), 'd LLLL yyyy')} - ${displayNights(hotel_data.number_of_nights)}`},
        {icon: 'plane-arrival', value: '10 kg Bagazh Krahu '},
    ]
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

onMounted(() => {
    console.log('mounteedd infotabs')
})
</script>
<style scoped>

</style>