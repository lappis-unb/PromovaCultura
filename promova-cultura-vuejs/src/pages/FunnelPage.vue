<template>
  <div class="container">
    <div class="row">
      <funnel-component :value="slider_data.value"/>
      <slider-funnel :value="slider_data.value"/>
      <div class="col-sm-4">
        <legend class="title-slider">Saúde do Projeto</legend>
          <vue-slider ref="slider" id="custom-tootip"
            v-bind="slider_data"
            v-model="slider_data.value"
            @drag-end="updateChart"
            @drag-start="updateChart"
          >    
            <template slot="label" slot-scope="{ label, active }">
              <span :class="['custom-label', { active }]">
                {{ label }}
              </span>
            </template>
          </vue-slider>
      </div>
      <div class="col-sm-8">
        <canvas
          id="myChart"
          width="100"
          height="80"
          data-value='600 32px "Helvetica Neue", "Helvetica", "Arial", sans-serif'
          data-label='600 14px "Helvetica Neue", "Helvetica", "Arial", sans-serif'
        ></canvas>
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
import SliderFunnel from "@/components/Funnel/SliderFunnel";

export default {
  name: "Funnel",
  components: {
    vueSlider,
    FunnelComponent,
    SliderFunnel
  },
  data() {
    return {
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
        tooltipDir: "bottom",
        sliderStyle: {
          backgroundColor: "#49A0B7",
          boxShadow: "none"
        }
      }
    };
  },
  methods: {
    updateChart() {
      window.myChart.data.datasets[0].data = this.getData();
      window.myChart.update();
    },
    getWeight() {
      let weight = (this.slider_data.value[0] + this.slider_data.value[1]) / 2;
      return (weight || 5.5) + Math.floor(Math.random() * 2);
    },
    getData() {
      const propostas = 90 * this.getWeight();
      const projetos = 70 * this.getWeight();
      const captados = 50 * this.getWeight();
      const executados = 40 * this.getWeight();

      return [propostas, projetos, captados, executados];
    }
  },
  mounted() {
    // Re-adjust slider width after 800 milisec because of bootstrap
    const canvas = document.getElementById("myChart");
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

    // myChart is GLOBAL
    window.myChart = new Chart(canvas.getContext("2d"), {
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
        topWidth: canvasData[3] / canvasData[1] * 125,
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
      this.$refs.slider.refresh();
    }, 800);
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
</style>
