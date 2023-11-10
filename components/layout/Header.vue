<script setup lang="ts">
  import {headPages} from "~/constants";
  const route = useRoute();
</script>

<template>
    <div class="bg-white flex justify-center px-5 lg:px-10 h-20">
        <div class="flex items-center justify-between max-w-page w-full">
            <nuxt-link to="/" class="max-w-[222px] w-full">
                <nuxt-img format="webp"  src="/images/red-logo.png" alt="red-logo" width="140" height="56" />
            </nuxt-link>
            <div class="flex justify-center items-center gap-12 uppercase">
                <nuxt-link v-for="page in headPages" :to="page.link" :class="[{'font-bold border-b-2 border-primary': route.path === page.link}]">
                    {{page.title}}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
