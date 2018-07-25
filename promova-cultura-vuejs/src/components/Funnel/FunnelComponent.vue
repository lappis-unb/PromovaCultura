<template>
  <div class="container">
    <canvas
      id="myChart"
      width="100"
      height="80"
      data-value='600 32px "Helvetica Neue", "Helvetica", "Arial", sans-serif'
      data-label='600 14px "Helvetica Neue", "Helvetica", "Arial", sans-serif'
    ></canvas>
  </div>
</template>

<script>
import "@/../static/funnel/chart.js";
import "@/../static/funnel/chart.funnel.js";
import "@/../static/funnel/chartjs-plugin-datalabels.min.js";

export default {
  name: "FunnelComponent",
  data() {
    return {
      title: "Promova Cultura"
    };
  },
  props: {
    canvasData: Array,
  },
  mounted() {
    
  }
};
</script>

<style scoped>
</style>
