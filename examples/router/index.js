import Vue from 'vue'
import VueRouter from 'vue-router'
import navConf from '../nav.config.json'

Vue.use(VueRouter)
let routes = []
Object.keys(navConf).forEach(header => {
  routes = routes.concat(navConf[header])
})

const addComponent = router => {
  router.forEach(route => {
    if (route.items) {
      addComponent(route.items)
      routes = routes.concat(route.items)
    } else {
      if (route.type === 'pages') {
        route.component = r =>
          require.ensure([], () => r(require(`@e/views/${route.name}.vue`)))
        return
      }
      route.component = r =>
        require.ensure([], () => r(require(`@d/${route.name}.md`)))
    }
  })
}
addComponent(routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
