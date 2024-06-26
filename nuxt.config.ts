// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: [
        '@/assets/styles.css'
    ],
    modules: ['@nuxtjs/tailwindcss', '@nuxt/test-utils/module']
})
