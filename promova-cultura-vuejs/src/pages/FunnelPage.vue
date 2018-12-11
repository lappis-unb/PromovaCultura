<template>
<div class="container">
  <div class="row">
    <div class="col-12" style="text-align:center; margin-bottom: 50px; color:#666;">
      <h3>Projetos por Índice de Saúde</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-7 order-lg-last col-md-12 order-md-first">
      <div class="funnel-element">
        <canvas
          id="myChart"
          width="100"
          height="80"
          data-value='600 32px "Helvetica Neue", "Helvetica", "Arial", sans-serif'
          data-label='600 14px "Helvetica Neue", "Helvetica", "Arial", sans-serif'
        ></canvas>
      </div>
    </div>
    <div class="col-lg-5 order-lg-first col-md-12 order-md-last">
      <div class="slider-width">
        <legend class="title-slider">Saúde do Projeto</legend>
        <div class="slider-container">
          <vue-slider
            ref="slider"
            id="custom-tootip"
            v-bind="slider_data"
            v-model="slider_data.value"
            @drag-end="updateChart"
            @drag-start="updateChart"
            v-if="showSlider"
          >
            <template slot="label" slot-scope="{ label, active }">
                <span :class="['custom-label', { active }]">
                  {{ label }}
                </span>
              </template>
          </vue-slider>
        </div>
        <funnel-card class="funnel-card" :people="people" />
      </div>
    </div>

  </div>
</div>
</template>

<script>
import $ from "jquery";
import "../static/funnel/chart.js";
import "../static/funnel/chart.funnel.js";
import "../static/funnel/chartjs-plugin-datalabels.min.js";
import vueSlider from "vue-slider-component";
import FunnelCard from "@/components/Funnel/FunnelCard";
export default {
  name: "Funnel",
  components: {
    vueSlider,
    FunnelCard
  },
  data() {
    return {
      people: {
        proponentes: 50,
        incentivadores: 23
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
          backgroundColor: "#49a0b7",
          borderColor: "#49a0b7",
          color: "white",
          fontSize: "18px",
          fontWeight: "600",
          padding: "2px 5px 0px 5px"
        },
        //tooltipDir: ["bottom", "bottom"],
        sliderStyle: {
          backgroundColor: "#49A0B7",
          boxShadow: "none",
          width: "18px",
          height: "18px"
        },
        processStyle: {
          backgroundColor: "#49A0B7"
        }
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
    document.title = "Índice de Saúde"
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
      labels: ["Propostas", "Projetos", "Captados", "Executados"]
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
    }, 200);
  }
};
</script>

<style scoped>
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
  color: #49a0b7;
}

.custom-label.active::after {
  background-color: #49a0b7;
  width: 2px;
}

.funnel-card {
  margin-top: 75px;
}

.funnel-element {
  margin-bottom: 50px;
}

.slider-width {
  padding: 0 30px;
}

.title-slider {
  color: #666;
}

/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
  .title-slider {
    margin-bottom: 40px;
    font-size: 20px;
  }
}
/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
  .title-slider {
    margin-bottom: 40px;
    font-size: 20px;
  }
}
/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  .funnel-card{
    margin-top: 80px;
  }
}
/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
  .title-slider {
    margin-bottom: 50px;
    font-size: 24px;
  }
  .funnel-card{
    margin-top: 80px;
  }
  .slider-container {
    margin-right: 20px;
    padding: 5px;
  }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
</style>
