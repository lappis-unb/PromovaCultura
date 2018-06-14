<template>
  <div id="app">
    <link rel="stylesheet" type="text/css" href="../static/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <navbar-menu/>
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarMenu from '@/components/NavbarMenu'

import '../static/bootstrap/bootstrap.min.js'
import "../static/jsmaps/jsmaps.js"
import "../static/jsmaps/jsmaps-panzoom.js"
import "../static/jsmaps/jsmaps-libs.js"
import "../static/jsmaps/lodash.js"


export default {
    name: 'App',
    components: {
      'navbar-menu': NavbarMenu
    }
}
</script>

<style>
  .main-container {
    padding-top: 50px;
  }
</style>
