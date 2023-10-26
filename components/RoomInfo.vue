<script setup lang="ts">
const sampleFacilities = [
    'Flat screen television',
    'Wi-fi',
    'Safety deposit box*',
    'Hairdryer',
    'Balcony',
    'Fridge',
    'Kettle',
    'Bathroom containing a shower',
    'Air conditioning',
    'Daily room cleaning service and towel change',
]
</script>

<template>
    <div class="flex flex-wrap justify-between gap-y-5">
        <nuxt-img format="webp" width="575" height="383" src="/package-sample/bed.png"/>
        <div class="flex flex-col gap-y-2">
            <div>Sleeps: Minimum 2 | Maximum 3</div>
            <div class="font-bold">Room facilities include</div>
            <ul class="list-disc pl-6">
                <li v-for="fac in sampleFacilities" class="mb-1.5">
                    {{fac}}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

</style>
