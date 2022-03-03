# nuxt-i18n-router 

subpath demo 

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

## reset default locale
如果要模擬不同的國家，可以到 `.env` 裡面，把 `DEFAULT_SUBDOMAIN` 修改成你要的國家

```
// <root>.env
DEFAULT_COUNTRY=uk

```

## localize router 

source code 在 `nuxt-modules/localize-router/index.js`

需要注意的是，原本我們就會在 nuxt config 裡面去設定 alias route
為了將 alias route 也套用多語言 subpath

```
// nuxt.config.js
 export default {
   router: {
    prefetchLinks: false,
    middleware: ['setting'],
    extendRoutes(routes, resolve) {
      const aliasRoutes = [
        {
          name: 'custom-route',
          path: '/a/:tag/:campaign?',
          component: resolve(__dirname, 'pages/xxx/xxx.vue'),
        },
      ]

      routes.push(...aliasRoutes)
      sortRoutes(routes)
    },
  }
 }
```

需要改成

```
// nuxt.config.js
import { resolve } from 'path'

export default {
  router: {
    prefetchLinks: false,
    middleware: ['setting']
  },
  aliasRoutes: [
    {
      name: 'custom-route',
      path: '/a/:tag/:campaign?',
      component: resolve(__dirname, 'pages/xxx/xxx.vue'),
    },
  ]
}
```
1. 移除 `router.extendRoutes`
2. `import { resolve } from 'path'`
3. 將 `aliasRoutes` 搬到外層，給 `nuxt-modules/localize-router` 使用

