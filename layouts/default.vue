<template>
  <div class="layout bg-gray-100">
    <header class="shadow-xl">
      <nuxt-link
        v-for="item in routes"
        :key="item.name"
        :to="item.path"
        class="text-green-500 hover:text-green-300"
      >
        {{ item.name }}
      </nuxt-link>
      <LanguageSelector />
    </header>
    <div class="fix"></div>
    <nuxt />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    mounted() {
      console.log('======= nuxt router =======')
      console.table(this.$route)
      console.log('===========================')
    },
    computed: {
      ...mapGetters({
        locale: 'client/locale',
        subdomain: 'client/subdomain',
        defaultLocale: 'client/defaultLocale'
      }),
      routes() {
        const mins = new Date().getMinutes().toString()
        const seconds = new Date().getSeconds().toString()

        const defaultRoutes = [
          { path: '/', name: 'home' },
          { path: '/about', name: 'about' },
          { path: '/tutors', name: 'tutors' },
          { path: `/tutors/${mins}`, name: 'tutors-2f' },
          { path: `/tutors/${mins}/${seconds}`, name: 'tutors-3f' },
          { path: '/afu', name: 'afu' },
          { path: `/afu/${mins}`, name: 'afu-2f' },
          { path: `/afu/${mins}/${seconds}`, name: 'afu-3f' },
        ]

        if (this.locale === this.defaultLocale) {
          return defaultRoutes
        }

        return defaultRoutes.map(item => ({ ...item, path: `/${this.subdomain}${item.path}`}))
      },
    },
  }
</script>

<style>
  .layout header {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    position: fixed;
    top: 0;
    background: white;
    z-index: 100;
  }

  .layout .fix {
    margin-top: 64px;
  }
</style>
