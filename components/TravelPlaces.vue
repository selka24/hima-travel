<script setup lang="ts">
const {$api} = useNuxtApp();
const searchOrigin = ref<string>('');
const searchDestination = ref<string>('');
const originList = ref<Origin[]>([])
const destinationList = ref<Destination[]>([])
const handleGetOrigins = async () => {
    if(!originList.value.length) {
        const {data, error} = await $api.origins.getOrigins();
        if(error.value) {
            console.log(error, 'error error')
            return;
        }

        const {value: {data: list} } = data
        originList.value = list;
    }
}

const handleOriginSelect = (origin: Origin) => {
    console.log(origin, 'origin')
    searchOrigin.value = origin.name;
    destinationList.value = origin.destinations;
}

const handleDestinationSelect = (destination: Destination) => {
    searchDestination.value = destination.name;
}
</script>

<template>
    <div class="flex gap-x-3 justify-center items-center">
<!--        <input-skeleton @click="handleGetOrigins">-->
            <search-select
                @focus="handleGetOrigins"
                name="origin"
                :filter="true"
                @select="handleOriginSelect"
                :options="originList"
                placeholder="Nisja"
                id="nisja"
                display-key="name"
                v-model="searchOrigin"
            >
                <template #option="{country, name}">
                    <div class="flex justify-between items-center">
                        <div class="font-bold text-lg text-secondary">{{name}}</div>
                        <div class="text-secondary">{{country}}</div>
                    </div>
                </template>
            </search-select>
        <div class="">
            <nuxt-icon name="arrow" class="text-gray-normal [&>svg]:rotate-180"/>
            <nuxt-icon name="arrow" class="text-primary"/>
        </div>
        <search-select
            :filter="true"
            name="destination"
            @select="handleDestinationSelect"
            :options="destinationList"
            placeholder="Mberritja"
            id="mberritja"
            display-key="name"
            v-model="searchDestination"
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

<style scoped>

</style>
