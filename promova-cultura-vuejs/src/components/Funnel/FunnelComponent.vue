<template>
  <div>
  <!-- {{this.canvasData}} -->
  <!--  -->
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
    // canvasData: Array
  },
  mounted() {
    
  }
};
</script>

<style scoped>

</style>
