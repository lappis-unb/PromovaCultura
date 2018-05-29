import Vue from 'vue'
import Router from 'vue-router'
import BrazilMap from '@/pages/BrazilMap'
import BrazilMapRegion from '@/pages/BrazilMapRegion'
import Funil from '@/pages/Funil'
import Home from '@/pages/Home'
import NaturalLanguageFilterPage from '@/pages/NaturalLanguageFilterPage'
import ControlsBrazilMapPage from '@/pages/ControlsBrazilMapPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/map_state',
      name: 'BrazilMap',
      component: BrazilMap
    },
    {
      path: '/map_region',
      name: 'BrazilMapRegion',
      component: BrazilMapRegion
    },
    {
      path: '/funil',
      name: 'Funil',
      component: Funil
    },
    {
      path: '/nl',
      name: 'NaturalLanguageFilterPage',
      component: NaturalLanguageFilterPage
    },
    {
      path: '/controls',
      name: 'ControlsBrazilMapPage',
      component: ControlsBrazilMapPage
    }
  ]
})
