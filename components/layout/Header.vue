<script setup lang="ts">
  import {headPages} from "~/constants";
</script>

<template>
    <div class="bg-white flex justify-center px-5 lg:px-10 h-20">
        <div class="flex items-center justify-between max-w-page w-full">
            <nuxt-link to="/">
                <nuxt-img format="webp"  src="/images/red-logo.png"  width="140" height="56" class="max-w-[222px] w-full"/>
            </nuxt-link>
            <div class="flex justify-center items-center gap-12 uppercase">
                <nuxt-link v-for="page in headPages" :to="page.link">
                    {{page.title}}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
