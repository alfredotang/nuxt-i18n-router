import _ from 'lodash'
import subdomainConfig from '../../server/config/domain.json'

export default function () {
  const aliasRoutes = this.options.aliasRoutes

  this.options.router.extendRoutes = function (...args) {
    const [routes] = args

    routes.push(...aliasRoutes)

    const i18nAlias = _.flatten(routes.map(route => localizeRouteGenerator(route)))

    routes.push(...i18nAlias)
  }
}

const localizeRouteGenerator = route => {
  const localeKeys = _.keys(subdomainConfig)
  return localeKeys.map(subpath => ({
    ...route,
    path: `/${subpath}${route.path}`,
    name: `${route.name}_${subpath}`,
  }))
}
