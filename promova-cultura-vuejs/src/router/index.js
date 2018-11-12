import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import BrazilMapPage from '@/pages/BrazilMapPage'
import MapPage1 from '@/components/Map/layouts/1'
import MapPage2 from '@/components/Map/layouts/2'
import MapPage3 from '@/components/Map/layouts/3'
import MapPage4 from '@/components/Map/layouts/4'
import MapPage5 from '@/components/Map/layouts/5'
import ProponentMap from '@/components/Map/ProponentMap'
import MobileProponentMap from '@/components/Map/info/ProponentMobileInfo'
import Funnel from '@/pages/FunnelPage'
import BrazilMapRegionPage from '@/pages/BrazilMapRegionPage'
import NaturalLanguageFilterPage from '@/pages/NaturalLanguageFilterPage'
import NestedPie from '@/pages/NestedPie'

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
    {
      path: '/funnel',
      name: 'Funnel',
      component: Funnel
    },
    {
      path: '/projects-per-year',
      name: 'ProjectsInTime',
      component: NestedPie
    },
    {
      path: '/map-prototype-5',
      name: 'MapPage5',
      component: MapPage5
    },
    // {
    //   path: '/proponent-map',
    //   name: 'ProponentMap',
    //   component: ProponentMap
    // },
    {
      path: '/proponent-map',
      name: 'ProponentMap',
      component: MobileProponentMap
    },
  ]
})
