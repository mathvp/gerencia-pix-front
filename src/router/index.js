import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import AccountService from '../services/AccountService'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    if (to.name === 'login') {
      next() // login route is always  okay (we could use the requires auth flag below). prevent a redirect loop
    } else if (to.meta && to.meta.requiresAuth === false) {
      next() // requires auth is explicitly set to false
    } else if (await AccountService.isLoggedIn()) {
      next() // i'm logged in. carry on
    } else {
      await AccountService.logout()
      next({ name: 'login', params: { msg: '1' } }) // always put your redirect as the default case
    }
  })

  return Router
}
