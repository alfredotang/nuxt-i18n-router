import path from 'path'
import localizeRouter from './nuxt-modules/localize-router'

/** @type {import('@nuxt/types')} */
export default {
  env: {
    DEFAULT_SUBDOMAIN: process.env.DEFAULT_SUBDOMAIN,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-i18n-router',
    htmlAttrs: {
      lang: 'zh-TW',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [localizeRouter],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  router: {
    prefetchLinks: false,
  },
  generateAliasRoutes(nuxtRouteResolve) {
    return [
      {
        name: 'afu-tutors',
        path: '/afu/:language?/:tag?',
        component: nuxtRouteResolve(__dirname, 'pages/tutors/_language/_tag.vue'),
      },
    ]
  },
  aliasRoutes: [
    {
      name: 'afu-tutors',
      path: '/afu/:language?/:tag?',
      component: path.resolve(__dirname, 'pages/tutors/_language/_tag.vue'),
    },
  ],
}
