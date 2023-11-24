// https://nuxt.com/docs/api/configuration/nuxt-config
import axios from 'axios';

const getDestinations = async () => {
  const response = await axios.get(
      `${process.env.API_BASE_URL}/destinations/1`
  );
  // return the array of routes
  return response?.data?.data.map((dest: Destination) => `/recommendations-${dest.id}`);
};

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'sq_AL'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    rootId: 'selka24',
    layoutTransition: { name: 'page', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
      // fetch the routes from our function above
      const slugs = await getDestinations();
      // add the routes to the nitro config
      nitroConfig.prerender.routes.push(...slugs);
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-icons',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    '@vueuse/nuxt',    // 'nuxt-api-party',
  ],
  components:{
    dirs: []
  },
  // apiParty: {
  //   endpoints: {
  //     myApi: {
  //       url: process.env.API_BASE_URL!,
  //       // Global headers sent with each request
  //       // headers: {
  //       //   Authorization: `Bearer ${process.env.API_BASE_URL!}`
  //       // }
  //     }
  //   }
  // },
  css:[
      '~/assets/css/transitions.css',
      '~/assets/css/main.css',
      '~/assets/css/fonts.css'
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      storageUrl: process.env.STORAGE_URL,
      prodUrl: process.env.PROD_URL
    }
  },
  image: {
    domains: ['http://biletaautobusi.com'],
    quality: 70
  }
})
