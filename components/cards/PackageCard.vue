<template>
    <div class="grid grid-cols-12 border-2 border-gray-normal rounded-[30px] bg-white">
        <div class="p-7 col-span-12 md:col-span-9 lg:col-span-8 xl:col-span-5 md:bg-gray-lighter/30 xl:bg-transparent">
            <div class="relative w-full h-full min-h-[384px] rounded-[20px] overflow-hidden">
                <CornerInfo/>
                <Carousel :slide-classes="['w-full h-full']" :options="packageImages">
                    <template #option="{option}">
                        <nuxt-img loading="lazy" format="webp" class="w-full h-full object-cover" :src="option" :alt="option"/>
                    </template>
                    <template #empty>
                        Nuk ka imazhe per këtë hotel
                    </template>
                </Carousel>
            </div>
        </div>
        <div class="p-7 col-span-12 sm:col-span-8 md:order-last md:col-span-11 lg:col-span-10 xl:order-none xl:col-span-4 flex flex-col">
            <div class="text-3xl font-bold mb-10">HOTEL {{package.hotel_data.hotel.name}}</div>
            <ArrowTabs @tab-change="handleTabChange"
                       :tabs="tabs"
                       :active-tab="activeTab"
                       class="mb-10"
            />
            <div class="flex flex-col gap-y-3.5">
                <div v-for="(tab, idx) in includedTab" class="flex gap-4 items-center">
                    <nuxt-icon :name="tab.icon" filled class="text-2xl"/>
                    <div class="font-bold">{{ tab.value }}</div>
                </div>
            </div>
        </div>
        <div class="flex py-7 gap-5 sm:gap-0- sm:py-0 justify-between sm:flex-col sm:justify-center items-center col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-3 px-5 md:bg-gray-lighter/30">
            <div class="flex flex-col items-center sm:mt-auto sm:mb-20">
                <div class="mb-2 text-lg text-gray-normal">Për person</div>
                <div class="font-bold text-[36px] min-w-max lg:text-[55px]">{{ package?.total_price }} €</div>
            </div>
            <nuxt-link :to="`/package/${package.id}`" class="max-w-[260px] w-full">
                <button-default class="h-[70px] w-full sm:mb-14 font-normal">Më shumë</button-default>
            </nuxt-link>
        </div>
    </div>
</template>
<script setup lang="ts">
const {displayNights, formatDateSQ, roomBasisInfo} = useUtils();
const props = defineProps<{ package: FullPackage }>();
const tabs = ['Të përfshira', 'Hoteli', 'Fluturimi'];
const sampleInfo = [
    '5 Netë, e Mar, 20 Shtator 2022',
    'Valixhe deri në 22 kg',
    'Çanë shpine deri në 22 kg',
    '1 x Dhomë dyshe',
    'Mëngjesi i përfshirë',
    'Info',
]
const activeTab = ref(0);
const mainStore = useMainStore()
const packageImages = mainStore.getPackageImages(props.package);

const hotel_data = props.package.hotel_data

const includedTab = computed(() => {
    return [
        {icon: 'calendar', value: `${formatDateSQ(new Date(hotel_data.check_in_date), 'd LLLL yyyy')} - ${displayNights(hotel_data.number_of_nights)}`},
        {icon: 'backpack', value: '10 kg Bagazh Krahu '},
        {icon: 'bed', value: JSON.parse(hotel_data.room_details)[0]},
        {icon: 'food', value: roomBasisInfo(hotel_data.room_basis)},
    ]
})

const tabsContent = computed(() => {
    const included = [
        {icon: 'calendar', key: ''},
        {icon: 'suitcase', key: ''},
    ]

    const hotel = [
        {icon: '', key: ''}
    ]

    const flight = [
        {icon: '', key: ''}
    ]
})

const handleTabChange = (tab: number) => {
    activeTab.value = tab;
}

const icons = ['calendar', 'suitcase', 'backpack', 'bed', 'food', 'info']
</script>

<style scoped>

</style>
