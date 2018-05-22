import Vue from 'vue'
import Router from 'vue-router'
import BrazilMap from '@/pages/BrazilMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BrazilMap',
      component: BrazilMap
    }
  ]
})
