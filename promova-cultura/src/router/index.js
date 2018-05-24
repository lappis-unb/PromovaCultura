import Vue from 'vue'
import Router from 'vue-router'
import BrazilMap from '@/pages/BrazilMap'
import BrazilMapRegion from '@/pages/BrazilMapRegion'
import Funil from '@/pages/Funil'

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
    },
    {
      path: '/funil',
      name: 'Funil',
      component: Funil
    }
  ]
})
