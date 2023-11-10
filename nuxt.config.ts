// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    // head: {
    //   link: [
    //     {
    //       rel: 'stylesheet',
    //       href: 'https://rsms.me/inter/inter.css',
    //     }
    //   ]
    // },
    rootId: 'selka24',
    layoutTransition: { name: 'page', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-icons',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    'nuxt-speedkit',
    // 'nuxt-api-party',
  ],
  components:{
    dirs: []
  },
  speedkit: {

    detection: {
      performance: true,
      browserSupport: true
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 }
      },
      timing: {
        fcp: 800,
        dcl: 1200
      }
    },
    fonts: [{
      family: 'Inter',
      locals: ['Inter'],
      fallback: ['Inter', 'sans-serif'],
      variances: [
        {
          style: 'normal',
          weight: 300,
          sources: [
            { src: '@/assets/fonts/Inter-Light.woff2', type:'woff2' }
          ]
        },
        {
          style: 'normal',
          weight: 400,
          sources: [
            { src: '@/assets/fonts/Inter-Regular.woff2', type:'woff2' }
          ]
        },
        {
          style: 'normal',
          weight: 500,
          sources: [
            { src: '@/assets/fonts/Inter-Medium.woff2', type:'woff2' }
          ]
        },
        {
          style: 'normal',
          weight: 600,
          sources: [
            { src: '@/assets/fonts/Inter-SemiBold.woff2', type:'woff2' }
          ]
        },
        {
          style: 'normal',
          weight: 700,
          sources: [
            { src: '@/assets/fonts/Inter-Bold.woff2', type:'woff2' }
          ]
        }
      ]
    }],
    targetFormats: ['webp', 'avif', 'jpg|jpeg|png|gif'],
    componentAutoImport: false,
    componentPrefix: undefined,

    /**
     * IntersectionObserver rootMargin for Compoennts and Assets
     */
    lazyOffset: {
      component: '0%',
      asset: '0%'
    }

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
    domains: ['http://biletaautobusi.com', 'img.youtube.com', 'i.vimeocdn.com'],
    quality: 70,
    alias: {
      youtube: 'https://img.youtube.com',
      vimeo: 'https://i.vimeocdn.com',
    },
    screens: {
      default: 320,
      xxs: 480,
      xs: 576,
      sm: 768,
      md: 996,
      lg: 1200,
      xl: 1367,
      xxl: 1600,
      '4k': 1921
    }
  }
})
