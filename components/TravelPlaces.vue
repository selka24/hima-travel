<template>
    <div class="grid sm:grid-cols-11 sm:gap-3">
            <search-select
                class="sm:col-span-5"
                v-model="originSearch"
                name="origin"
                :filter="true"
                :selected="selectedOrigin"
                :options="allOrigins"
                placeholder="Nisja"
                id="nisja"
                :filterKey="['name', 'country']"
                @select="handleOriginSelect"
                @focus="handleGetOrigins"
                @focusout="handleOriginFocusOut"
            >
                <template #option="{country, name}">
                    <div class="flex justify-between items-center">
                        <div class="font-bold text-lg text-secondary">{{name}}</div>
                        <div class="text-secondary">{{country}}</div>
                    </div>
                </template>
            </search-select>

        <div class="mb-5 hidden sm:flex sm:mt-3 sm:mb-0 sm:col-span-1 flex-col justify-center sm:justify-start items-center">
            <nuxt-icon name="arrow" class="text-primary text-2xl [&>svg]:rotate-180"/>
            <nuxt-icon name="arrow" class="text-gray-normal text-2xl"/>
        </div>
        <search-select
            class="sm:col-span-5"
            :selected="selectedDestination"
            name="destination"
            @select="handleDestinationSelect"
            :options="mainStore.allDestinations"
            :placeholder="selectedDestination?.name || 'Mbërritja'"
            id="mberritja"
            :error="selectedOrigin ? '' : 'Ju lutem zgjidhni nisjen!'"
            :filterKey="['name', 'country']"
            v-model="destinationSearch"
            @focus="handleDestFocus"
            @focusout="handleDestinationFocusOut"
        >
            <template #option="{country, name}">
                <div class="flex justify-between items-center">
                    <div class="font-bold text-lg text-secondary">{{name}}</div>
                    <div class="text-secondary">{{country}}</div>
                </div>
            </template>
        </search-select>
    </div>
</template>
<script setup lang="ts">
import SearchSelect from "~/components/SearchSelect.vue";

const mainStore = useMainStore();
const {$api} = useNuxtApp();
const {handleQueryValidate} = useQueryValidator()

const { selectedOrigin, selectedDestination, originSearch, destinationSearch, allOrigins } = storeToRefs(mainStore)
const { actSetOrigin, actSetDestination, actGetOrigins, actGetDestinations } = mainStore

// const searchOrigin = ref<string>('');
// const searchDestination = ref<string>('');

const handleGetOrigins = async () => {
    if(!mainStore.allOrigins.length) {
        await actGetOrigins();
    }

}

// await handleGetOrigins();
const handleSetDestinations = () => {
    if(selectedOrigin.value)
        actGetDestinations();
        // mainStore.allDestinations = selectedOrigin.value.destinations;
}
const handleOriginSelect = (origin: Origin) => {
    actSetOrigin(origin);
    originSearch.value = origin.name;
    handleSetDestinations();
}

const handleDestinationSelect = (destination: Destination) => {
    actSetDestination(destination);
    destinationSearch.value = destination.name;
}

const handleOriginFocusOut = () => {
    if(selectedOrigin.value)
        originSearch.value = selectedOrigin.value.name;
}

const handleDestFocus = async (e: FocusEvent) => {
    const {y} = e.target.getBoundingClientRect();
    if(y > 0 && window.innerWidth <=640) {
        setTimeout(() => {
            scrollTo({
                top: y - 30,
                behavior: 'smooth'
            })
        },150)
    }
    destinationSearch.value = ''
}
const handleDestinationFocusOut = () => {
    if(selectedDestination.value)
        destinationSearch.value = selectedDestination.value.name;
    else
        destinationSearch.value = '';
}
</script>

<style scoped>

</style>
