// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Cookbook4All',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'description',
          content: 'Simple recipes for those who loves to cook :D',
        },
        { property: 'og:title', content: 'Cookbook4All' },
        {
          property: 'og:image',
          content:
            'https://res.cloudinary.com/dwgni1x3t/image/upload/v1673260047/poc-cookbook-api/logo_j3mirp.png',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    POC_COOKBOOK_API: process.env.POC_COOKBOOK_API,
    public: {
      API: process.env.POC_COOKBOOK_API,
    },
  },
})
