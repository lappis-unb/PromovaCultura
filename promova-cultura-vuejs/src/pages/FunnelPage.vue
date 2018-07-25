<template>
<div class="container">
  <div class="row">

    <div class="col-md-7 order-md-last col-sm-12 order-col-first">
      <div class="funnel-element">
        <funnel-component :weightFunnel="weightFunnel" :canvasData="canvasData" />
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
import vueSlider from "vue-slider-component";
import FunnelCard from "@/components/Funnel/FunnelCard";
import FunnelComponent from "@/components/Funnel/FunnelComponent";

export default {
  name: "Funnel",
  components: {
    vueSlider,
    FunnelComponent,
    FunnelCard,
  },
  data() {
    return {
      weightFunnel: 25,
      canvasData: [321, 231, 132, 123],
      people: {
        proponentes: 25,
        incentivadores: 10
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
        sliderStyle: [{
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
    getData(weight) {
      const propostas = 90 * weight;
      const projetos = 70 * weight;
      const captados = 50 * weight;
      const executados = 40 * weight;

      return [propostas, projetos, captados, executados];
    },
    updateChart() {
      this.weightFunnel =
        (this.slider_data.value[0] + this.slider_data.value[1]) / 2;

      this.canvasData = this.getData(this.weightFunnel);
      this.people.proponentes = this.canvasData[0] / 10;
      this.people.incentivadores = this.canvasData[1] / 10;

      // Update GLOBAL chart data
      window.myChart.data.datasets[0].data = this.canvasData;
      window.myChart.update();
    }
  },
  mounted() {
    window.setTimeout(() => {
      this.showSlider = true;
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
