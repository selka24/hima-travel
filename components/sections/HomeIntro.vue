<template>
    <div class="min-h-[100vh]">
        <nuxt-img format="webp"  width="1920" height="1080" class="w-full h-full max-h-[100vh] object-cover absolute top-0 left-0 z-0"  src="/images/bg-image.png" />
        <div class="bg-gradient-to-r from-black/20 absolute w-full max-h-[100vh] h-full left-0 top-0 z-0"/>
        <div class="flex relative z-10 justify-center px-5 lg:px-10">
            <div class="flex flex-col max-w-page w-full mt-28 xl:mt-36">
                <div class="text-white">
                    <nuxt-img format="webp"  width="278" height="102" src="/images/white-logo.png" class="max-w-[278px] ml-[-35px]" alt="hima white logo"/>
                    <h1 class="mt-9">Udhëtimi juaj fillon këtu!</h1>
                    <p class="base-text mt-1">
                        Bashkojuni mbi 16,000 klientëve që na besojnë çdo vit udhëtimet e tyre.
                    </p>
                    <p>Zbuloni ofertat më të mira dhe rezervoni tuajat sot.</p>
                </div>
                <TravelSearch :show-types="true" class="mt-[90px]"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
</style>
