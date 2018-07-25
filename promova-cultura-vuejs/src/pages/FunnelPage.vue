<template>
<div class="container">
  <div class="row">

    <div class="col-md-7 order-md-last col-sm-12 order-col-first">
      <div class="funnel-element">
        <funnel-component :canvasData="canvasData" />
      </div>
    </div>

    <div class="col-md-5 order-md-first col-sm-12 order-col-last">
      <legend class="title-slider">Saúde do Projeto</legend>

      <vue-slider ref="slider" id="custom-tootip" v-bind="slider_data" v-model="slider_data.value" @drag-end="updateChart" @drag-start="updateChart" v-if="showSlider">
        <template slot="label" slot-scope="{ label, active }">
            <span :class="['custom-label', { active }]">
              {{ label }}
            </span>
          </template>
      </vue-slider>

      <funnel-card class="funnel-card" :people="people" />
    </div>

  </div>
</div>
</template>

<script>
import $ from "jquery";
import "../../static/funnel/chart.js";
import "../../static/funnel/chart.funnel.js";
import "../../static/funnel/chartjs-plugin-datalabels.min.js";
import vueSlider from "vue-slider-component";
import FunnelComponent from "@/components/Funnel/FunnelComponent";
import FunnelCard from "@/components/Funnel/FunnelCard";
export default {
  name: "Funnel",
  components: {
    vueSlider,
    FunnelComponent,
    FunnelCard
  },
  data() {
    return {
      people: {
        proponentes: 0,
        incentivadores: 0
      },
      showSlider: false,
      slider_data: {
        width: "auto",
        min: 0,
        max: 10,
        piecewiseLabel: true,
        value: [0, 10],
        height: 4,
        dotSize: 14,
        interval: 1,
        show: true,
        tooltip: "always",
        piecewise: true,
        tooltipStyle: {
          backgroundColor: "#d8d8d8",
          borderColor: "#d8d8d8",
          color: "#666",
          fontSize: "18px",
          fontWeight: "600",
          padding: "2px 5px 0px 5px"
        },
        tooltipDir: ["bottom", "bottom"],
        sliderStyle: [
          {
            backgroundColor: "#49A0B7",
            boxShadow: "none"
          },
          {
            backgroundColor: "#49A0B7",
            boxShadow: "none"
          }
        ]
      }
    };
  },
  methods: {
    updateChart() {
      // update GLOBAL weight value
      window.weight = (this.slider_data.value[0] + this.slider_data.value[1]) / 2;
      let dataCanvas = this.getData();
      this.people.proponentes = dataCanvas[0] / 10;
      this.people.incentivadores = dataCanvas[1] / 10;

      // Update GLOBAL chart data
      window.myChart.data.datasets[0].data = dataCanvas;
      window.myChart.update();
    },
    dragEnd() {
      this.updateChart();
    },
    dragStart() {
      this.updateChart();
    },
    getData() {
      const propostas = 90 * window.getWeight();
      const projetos = 70 * window.getWeight();
      const captados = 50 * window.getWeight();
      const executados = 40 * window.getWeight();
      return [propostas, projetos, captados, executados];
    }
  },
  mounted() {
    // Re-adjust slider width after 800 milisec because of bootstrap
    window.weight = 5.5; // initial (min + max / 2)
    window.getWeight = () => window.weight + Math.floor(Math.random() * 2);
    const canvas = document.getElementById("myChart");
    const ctx = canvas.getContext("2d");
    const canvasData = this.getData();
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
    window.setTimeout(() => {
      this.showSlider = true;
      this.$refs.slider.refresh();
    }, 200);
  }
};
</script>

<style scoped>
.title-slider {
  margin-bottom: 40px;
  font-size: 24px;
  color: #666;
}

.custom-label {
  position: absolute;
  bottom: 100%;
  left: 0;
  transform: translate(-50%, -12px);
  margin-left: 3px;
  color: #666;
  font-size: 15px;
}

.vue-slider-piecewise .vue-slider-piecewise-item:first-child .custom-label,
.vue-slider-piecewise .vue-slider-piecewise-item:last-child .custom-label {
  font-size: 16px;
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
  color: #666;
}

.custom-label.active::after {
  background-color: #49a0b7;
  width: 2px;
}

.funnel-card {
  margin-top: 15vh;
}

.funnel-element {
  margin-top: 5vh;
}
</style>
