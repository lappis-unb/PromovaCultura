<template>
  <div id="app">
    <link rel="stylesheet" type="text/css" href="../static/bootstrap/bootstrap.min.css">
    <navbar-menu/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarMenu from '@/components/NavbarMenu'
import '../static/bootstrap/bootstrap.min.js'
import "../static/jsmaps/jsmaps.js";
import "../static/jsmaps/jsmaps-panzoom.js";
import "../static/jsmaps/jsmaps-libs.js";
import "../static/jsmaps/brazil.js";
import "../static/jsmaps/lodash.js";

export default {
    name: 'App',
    components: {
      'navbar-menu': NavbarMenu
    }
}
</script>

<style>
</style>
