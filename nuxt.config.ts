// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Cookbook4All',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'description',
          content: 'Simple recipes for those who loves to cook :D',
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
