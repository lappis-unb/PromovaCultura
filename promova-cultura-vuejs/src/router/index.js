import Vue from 'vue'
import Router from 'vue-router'
import BrazilMapPage from '@/pages/BrazilMapPage'
import BrazilMapRegionPage from '@/pages/BrazilMapRegionPage'
import FunilPage from '@/components/funilPrototype/funilPage'
import HomePage from '@/pages/HomePage'
import NaturalLanguageFilterPage from '@/pages/NaturalLanguageFilterPage'
import MapPage1 from '@/components/mapPrototype/layouts/1'
import MapPage2 from '@/components/mapPrototype/layouts/2'
import MapPage3 from '@/components/mapPrototype/layouts/3'
import MapPage4 from '@/components/mapPrototype/layouts/4'

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
      path: '/map-prototype-1',
      name: 'MapPage1',
      component: MapPage1
    },
    {
      path: '/map-prototype-2',
      name: 'MapPage2',
      component: MapPage2
    },
    {
      path: '/map-prototype-3',
      name: 'MapPage3',
      component: MapPage3
    },
    {
      path: '/map-prototype-4',
      name: 'MapPage4',
      component: MapPage4
    },
  ]
})
