<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-sm-push-4">
        <canvas id="myChart" height="300"></canvas>
      </div>

      <div class="col-sm-4 col-sm-pull-8">
        <div class="title-slider">
          <b>Saúde do projeto</b>
        </div>
        <div id="slider"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarMenu",
  data() {
    return {
      title: "Promova Cultura"
    };
  }
};
</script>

<style scoped>


</style>
