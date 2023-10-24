<template>
    <div class="flex flex-col justify-center items-center">
        <div class="relative bg-right-bottom bg-cover pt-28 pb-10 px-5 lg:px-10 w-full" :style="backgroundStyles">
<!--            <nuxt-img format="webp"  width="1920" height="1080" class="w-full h-full object-cover absolute top-0 left-0 z-0"  src="/images/bg-image.png" />-->
            <div class="bg-gradient-to-r from-black/20 absolute w-full h-full left-0 top-0 z-0"/>
            <div class="flex justify-center">
                <TravelSearch class="max-w-screen-2xl w-full"/>
            </div>
        </div>
        <div class="flex justify-center w-full px-5 lg:px-10">
            <div class="flex flex-col gap-10 max-w-screen-2xl w-full mt-10">
                <TellUs/>
<!--                <div class="flex flex-col">-->
<!--                    <div>Parameters are {{invalid ? 'invalid' : 'valid'}}</div>-->
<!--                    <div v-if="errors.length">-->
<!--                        ERRORS:-->
<!--                        <ul>-->
<!--                            <li class="text-primary" v-for="err in errors">-->
<!--                                {{err}}-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
                <transition-group name="fade">
                    <div v-if="mainStore.loadingPackages" class="flex flex-col gap-y-10">
                        <PackageCardLoading v-for="idx in 4" :key="idx + 'load'"/>
                    </div>
                    <div v-else-if="mainStore.travelPackages" class="flex flex-col gap-y-10">
                        <div v-for="travelPackage in mainStore.travelPackages" :key="travelPackage.id">
                            <PackageCard :package="travelPackage"/>
                        </div>
                        <client-only>
                            <json-viewer
                                :value="mainStore.travelPackages"
                                :expand-depth=5
                                copyable
                                boxed
                                sort></json-viewer>
                        </client-only>
                    </div>
                    <h1 v-else>
                        There are no packages
                    </h1>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script setup>
import {useQueryValidator} from "~/composables/queryValidator.js";
import JsonViewer from 'vue-json-viewer'
import PackageCardLoading from "~/components/cards/PackageCardLoading.vue";
import PackageCard from "~/components/cards/PackageCard.vue";
import TellUs from "~/components/sections/TellUs.vue";

const {errors, invalid, validParams, handleQueryValidate} = useQueryValidator()

const route = useRoute();

const mainStore = useMainStore();
const img = useImage();

const {nights, checkin_date, origin_id, destination_id} = route.query

console.log({nights, checkin_date, origin_id, destination_id})
const setSearchValues = async () => {
    console.log(errors.value, 'errrorrs');
    handleQueryValidate();

    if(invalid.value) {
        mainStore.loadingPackages = false;
    } else {
        await mainStore.actGetOrigins();

        mainStore.selectedDate = validParams.checkin_date;
        mainStore.selectedNights = validParams.nights;

        const origin = mainStore.allOrigins.find(o => o.id === validParams.origin_id);
        console.log({origin})
        if(origin){
            mainStore.actSetOrigin(origin);
            mainStore.originSearch = origin.name
            mainStore.allDestinations = origin.destinations;
        }

        const destination = mainStore.allDestinations.find(o => o.id === validParams.destination_id);

        if(destination){
            mainStore.actSetDestination(destination || null)
            mainStore.destinationSearch = destination.name
        }
        await mainStore.actGetPackagesSearch();
    }
}

// onMounted(() => {
if(process.server){
    console.log('getting from server the packages')
    await setSearchValues();
}
// })


const backgroundStyles = computed(() => {
    const imgUrl = img('/images/bg-image2.png', { width: 1999, height:290 })
    return { backgroundImage: `url('${imgUrl}')` }
})

</script>

<style scoped>

</style>
