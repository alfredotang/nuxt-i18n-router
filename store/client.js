import config from '~/server/config/domain.json'

const defaultCountry = process.env.DEFAULT_COUNTRY

const defaultLocale = config[defaultCountry].locale

export const state = () => ({
  locale: defaultLocale,
  subdomain: defaultCountry,
  defaultLocale: defaultLocale,
})

export const mutations = {
  SET_LOCALE(state, payload) {
    state.locale = payload
  },
  SET_SUBDOMAIN(state, payload) {
    state.subdomain = payload
  },
}

export const actions = {
  setLocale({ commit }, payload) {
    commit('SET_LOCALE', payload)
  },
  setSubdomain({ commit }, payload) {
    commit('SET_SUBDOMAIN', payload)
  },
}

export const getters = {
  locale(state) {
    return state.locale
  },
  subdomain(state) {
    return state.subdomain
  },
  defaultLocale(state) {
    return state.defaultLocale
  },
}
