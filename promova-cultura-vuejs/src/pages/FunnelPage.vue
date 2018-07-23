<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <div class="title-slider">
          <vue-slider ref="slider" id="custom-tootip"
            v-bind="slider_data"
            v-model="slider_data.value"
            @click="this.dragEnd()"
            @drag-end="dragEnd"
          >    
            <template slot="label" slot-scope="{ label, active }">
              <span :class="['custom-label', { active }]">
                {{ label }}
              </span>
            </template>
          </vue-slider>
        </div>
      </div>
      <div class="col-sm-8">
        <canvas id="myChart" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "../../static/funnel/chart.js";
import "../../static/funnel/chart.funnel.js";
import "../../static/funnel/chartjsPluginDatalabels.js";
import vueSlider from "vue-slider-component";

export default {
  name: "Funnel",
  components: {
    vueSlider
  },
  data() {
    return {
      slider_data: {
        width: "100%",
        min: 0,
        max: 10,
        piecewiseLabel: true,
        value: [0, 10],
        width: "100%",
        height: 4,
        dotSize: 14,
        interval: 1,
        show: true,
        tooltip: "always",
        piecewise: true,
        tooltipStyle: {
          backgroundColor: "#666",
          borderColor: "#666"
        }
      }
    };
  },
  methods: {
    updateChart() {
      // console.log('mexendo', this.slider_data.value[0], this.slider_data.value[1])
      // update GLOBAL weight value
      window.weight =
        (this.slider_data.value[0] + this.slider_data.value[1]) / 2;

      // Update GLOBAL chart data
      window.myChart.data.datasets[0].data = getData();
      window.myChart.update();
    },
    dragEnd() {
      this.updateChart();
    }
  }
};

window.weight = 5.5; // initial (min + max / 2)
window.getWeight = () => window.weight + Math.floor(Math.random() * 2);

function getData() {
  const propostas = 90 * window.getWeight();
  const projetos = 70 * window.getWeight();
  const captados = 50 * window.getWeight();
  const executados = 40 * window.getWeight();

  return [propostas, projetos, captados, executados];
}

// Chart encapsulation.
// NO ACCIDENTAL GLOBALS, if you want a global, make it explicit, ex: window.my_global = 123456;
$(function() {
  const canvas = document.getElementById("myChart");
  const ctx = canvas.getContext("2d");
  const canvasData = getData();

  let data = {
    datasets: [
      {
        data: canvasData,
        backgroundColor: ["#9EBA36", "#6F8928", "#516610", "#455421"]
      }
    ],
    labels: ["Projetos", "Propostas", "Captados", "Executados"]
  };

  const fontSize = canvasData[3] / canvasData[1] * 125;
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
      topWidth: fontSize,
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
});
</script>

<style scoped>
title-slider{

}
.custom-label {
  position: absolute;
  bottom: 100%;
  left: 0;
  transform: translate(-50%, -12px);
  margin-left: 3px;
}
.custom-label::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 5px);
  width: 1px;
  height: 5px;
  background-color: #000;
}
.custom-label.active {
  color: #4a9fb6;
  font-weight: bold;
}
.custom-label.active::after {
  background-color: #4a9fb6;
  width: 2px;
}
</style>
