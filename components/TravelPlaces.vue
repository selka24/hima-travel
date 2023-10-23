<template>
    <div class="grid sm:grid-cols-11 gap-3">
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

        <div class="mb-5 sm:mt-5 sm:mb-0 sm:col-span-1 flex flex-col justify-center sm:justify-start items-center">
            <nuxt-icon name="arrow" class="text-primary [&>svg]:rotate-180"/>
            <nuxt-icon name="arrow" class="text-gray-normal"/>
        </div>
        <search-select
            class="sm:col-span-5"
            :selected="selectedDestination"
            name="destination"
            @select="handleDestinationSelect"
            :options="mainStore.allDestinations"
            placeholder="Mbërritja"
            id="mberritja"
            :error="selectedOrigin ? '' : 'Ju lutem zgjidhni nisjen!'"
            :filterKey="['name', 'country']"
            v-model="destinationSearch"
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
const mainStore = useMainStore();
const {$api} = useNuxtApp();
const {handleQueryValidate} = useQueryValidator()

const { selectedOrigin, selectedDestination, originSearch, destinationSearch, allOrigins } = storeToRefs(mainStore)
const { actSetOrigin, actSetDestination } = mainStore

// const searchOrigin = ref<string>('');
// const searchDestination = ref<string>('');

const handleGetOrigins = async () => {
    if(!mainStore.allOrigins.length) {
        await $api.get('/origins')
            .catch((e) => {
                console.log(e, 'responsee')
            })
            .then((response) => {
                mainStore.allOrigins = response?.data?.data
            })
    }
}

await handleGetOrigins();
const handleSetDestinations = () => {
    if(selectedOrigin.value)
        mainStore.allDestinations = selectedOrigin.value.destinations;
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
const handleDestinationFocusOut = () => {
    if(selectedDestination.value)
        destinationSearch.value = selectedDestination.value.name;
}
</script>

<style scoped>

</style>
