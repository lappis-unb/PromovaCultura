<template>
  <div>
  <!-- {{this.canvasData}} -->
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
    canvasData: Array
  },
  mounted() {
    const canvas = document.getElementById("myChart");
    const ctx = canvas.getContext("2d");

    let data = {
      datasets: [
        {
          data: this.canvasData,
          backgroundColor: ["#9EBA36", "#6F8928", "#516610", "#455421"]
        }
      ],
      labels: ["PROJETO", "PROPOSTAS", "CAPTADOS", "EXECUTADOS"]
    };

    // myChart is GLOBAL
    window.myChart = new Chart(ctx, {
      type: "funnel",
      data: data,
      options: {
        title: {
          display: false,
          position: "top",
          text: "Titulo das legendas"
        },
        responsive: true,
        legend: {
          display: false,
          fullWidth: true
        },
        tooltips: {
          enabled: false
        },
        topWidth: this.canvasData[3] / this.canvasData[1] * 125,
        sort: "desc",
        plugins: {
          datalabels: {
            anchor: "center",
            align: "center",
            color: "#FFFFFF",
            font: {
              size: 15
            },
            textAlign: "center",
            formatter(value, context) {
              const label = context.chart.data.labels[context.dataIndex];
              return [value, label];
            }
          }
        }
      }
    });
  }
};
</script>

<style scoped>

</style>
