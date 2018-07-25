<template>
<div class="container">
  <div class="row">
    <div class="col-lg-8 order-lg-last col-md-12 order-md-first">
      <div class="funnel-element">
        <funnel-component :canvasData="canvasData" />
      </div>
    </div>
    <div class="col-lg-4 order-lg-first col-md-12 order-md-last">
      <div class="slider-width">
        <legend class="title-slider">Saúde do Projeto</legend>
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
        <funnel-card class="funnel-card" :people="people" />
      </div>
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
    FunnelCard
  },
  data() {
    return {
      weightFunnel: 25,
      canvasData: [100, 100, 100, 100],
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
    getData(weight) {
      console.log('Entrou aqui', weight)
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
      console.log(this.weightFunnel, this.canvasData)

      // Update GLOBAL chart data
      window.myChart.data.datasets[0].data = this.canvasData;
      console.log(window.myChart.data.datasets[0].data)
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
  font-weight: 600;
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
  .title-slider {
    font-size: 26px;
  }
  .funnel-card{
    margin-top: 80px;
  }
}
/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
}
/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
</style>
