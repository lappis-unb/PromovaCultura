import Vue from 'vue'
import Router from 'vue-router'
import BrazilMap from '@/pages/BrazilMap'
import BrazilMapRegion from '@/pages/BrazilMapRegion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BrazilMap',
      component: BrazilMap
    },
    {
      path: '/region',
      name: 'BrazilMapRegion',
      component: BrazilMapRegion
    }
  ]
})
