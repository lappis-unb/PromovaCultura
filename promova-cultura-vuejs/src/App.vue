<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <navbar-menu/>
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarMenu from "@/components/NavbarMenu";
import "@babel/polyfill"
import "bootstrap"
import 'whatwg-fetch'


import "./static/jsmaps/jsmaps.js";
import "./static/jsmaps/jsmaps-panzoom.js";
import "./static/jsmaps/jsmaps-libs.js";

export default {
  name: "App",
  components: {
    "navbar-menu": NavbarMenu
  }
};
</script>

<style>
.main-container {
  padding-top: 50px;
}
@media only screen and (max-width: 991px) {
  .main-container {
    margin: 0 3.5% 3.5% 3.5%;
  }
}
</style>
