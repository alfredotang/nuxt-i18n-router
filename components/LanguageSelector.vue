<template>
  <div class="flex">
    <select @change="handleSelectedLocale">
      <option
        v-for="({key, value}) in localeList"
        :key="key"
        :value="value.locale"
        :selected="value.locale === locale"
      >
        {{ value.name }}
      </option>
    </select>
    <button @click="handleChangeRouteBase">afu</button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { keys, map, pipe } from 'lodash/fp'
  import config from '~/server/config/domain.json'

  export default {
    computed: {
      ...mapGetters({
        locale: 'client/locale',
        subdomain: 'client/subdomain',
        defaultLocale: 'client/defaultLocale'
      }),
      localeList() {
        return pipe(
          keys,
          map(item => ({ key: item, value: config[item] }))
        )(config)
      },
      subpath() {
        const [, subpath] = this.$route.path.split('/')
        return subpath
      },
      currentLocale() {
        return this.locale
      },
      currentSubdomain() {
        return this.subdomain
      },
      defaultLocaleLowCase() {
        return this.defaultLocale.toLowerCase()
      },
    },
    methods: {
      ...mapActions({
        setLocale: 'client/setLocale',
        setSubdomain: 'client/setSubdomain',
      }),
      handleSelectedLocale(event) {
        const value = event.target.value
        if (value === this.currentLocale) return
        const { subdomain } = this.localeToKey(value)
        const nextPath = this.mapNextPath(value, subdomain)

        document.documentElement.setAttribute('lang', value)
        this.setLocale(value)
        this.setSubdomain(subdomain)
        this.$router.push(nextPath)
      },
      localeToKey(value) {
        return this.localeList.find(item => item.value.locale === value).value
      },
      mapNextPath(value, subdomain) {
        const fullPath = this.$route.fullPath.replace(`/${this.subdomain}`, '')
        return this.defaultLocaleLowCase === value.toLowerCase() ? fullPath : `/${subdomain}${fullPath}`
      },
      handleChangeRouteBase() {
        this.$router.base = '/afu'
      },
    },
  }
</script>
