<template>
  <div class="container">
    {{value}}
    SliderFunnel
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
</template>

<script>
import vueSlider from "vue-slider-component";

export default {
  name: "SliderFunnel",
  components: {
    vueSlider,
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
  props: {
    value: Array,
    canvasData: Array
  },
  methods: {
    updateChart() {
      window.myChart.data.datasets[0].data = this.canvasData;
      this.$emit('updateCanvas', this.slider_data.value)
      window.myChart.update();
    }
  },
  mounted(){
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
