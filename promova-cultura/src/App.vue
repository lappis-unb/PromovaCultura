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

export default {
    name: 'App',
    components: {
      'navbar-menu': NavbarMenu
    }
}
</script>

<style>
</style>
