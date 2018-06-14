import Vue from 'vue'
import Router from 'vue-router'
import BrazilMapPage from '@/pages/BrazilMapPage'
import BrazilMapRegionPage from '@/pages/BrazilMapRegionPage'
import FunilPage from '@/pages/FunilPage'
import HomePage from '@/pages/HomePage'
import NaturalLanguageFilterPage from '@/pages/NaturalLanguageFilterPage'
import MapPage from '@/pages/MapPage'
import MapPageByTotal from '@/components/mapPrototype/MapPageByTotal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/map_state',
      name: 'BrazilMapPage',
      component: BrazilMapPage
    },
    {
      path: '/map_region',
      name: 'BrazilMapRegionPage',
      component: BrazilMapRegionPage
    },
    {
      path: '/funil',
      name: 'FunilPage',
      component: FunilPage
    },
    {
      path: '/nl',
      name: 'NaturalLanguageFilterPage',
      component: NaturalLanguageFilterPage
    },
    {
      path: '/controls',
      name: 'MapPage',
      component: MapPage
    },
    {
      path: '/controls-by-total',
      name: 'MapPageByTotal',
      component: MapPageByTotal
    }
  ]
})
