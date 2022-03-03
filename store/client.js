import config from '~/server/config/domain.json'

const defaultSubdomain = process.env.DEFAULT_SUBDOMAIN

const defaultLocale = config[defaultSubdomain].locale

export const state = () => ({
  locale: defaultLocale,
  subdomain: defaultSubdomain,
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
