<template>
    <div>
        <div class="jsmaps-wrapper" id="brazil-map"/>
        <div style="display:none">{{projects}}</div>
        <div style="display:none">{{proponentes}}</div>
        <div style="display:none">{{incentivadores}}</div>
    </div>
</template>

<script>
import $ from "jquery";
import "@/../static/jsmaps/brazil_region.js";

// Keep a clean copy o JSMaps.maps. Please never overwrite it

export default {
  name: "BrazilMapRegion",

  props: {
    projects: Object,
    proponentes: Object,
    incentivadores: Object,
    legends: Object,
    maxValues: Object,
  },

  data() {
    return {
      maps: {},
      basePinData: {
        srcWidth: 74,
        srcHeight: 81,
        pinWidth: 40,
        pinHeight: 30
      }
    };
  },

  mounted() {
    // Make a copy of JSMaps.maps to keep a clea
    // console.log("regiao")
    this.maps = { ...window.JSMaps.maps };

    this.displayBrazilMap();
    this.darkenAllMap();
  },

  beforeUpdate() {
    this.darkenAllMap();
    this.makeHeatMap();

    this.setProponentesPins();
    this.setIncentivadoresPins();
  },

  methods: {

    displayBrazilMap() {
      $("#brazil-map").JSMaps({
        map: "brazil_region",
        onStateClick: function(data) {
          console.log(data.abbreviation + ": ");
          console.log(data);
        }
      });
    },

    darkenAllMap() {
      for (let path of this.maps.brazil_region.paths) {
        path.color = "#efe8c6";
        path.hoverColor = "#efe8c6";
        path.selectedColor = "#efe8c6";
      }

      $("#brazil-map").trigger("reDraw", this.maps);
    },

    getColorBylegend(qtd, maplegend) {
      var colorSub;
      maplegend.forEach((sub) => {
        if(sub.min < qtd && qtd < sub.max+10){
          colorSub = sub.color;
        }
      })
      return colorSub;
    },

    makeHeatMap() {
      const localsList = Object.keys(this.projects);
      
      if (localsList.length === 0) {
        console.log("Projects is empty, nothing to heat");
        return;
      }

      localsList.forEach(local => {
        let numberOfProjects = this.projects[local];

        for (let path of this.maps.brazil_region.paths) {
          if (path.abbreviation === local) {
            let stateColor = this.getColorBylegend(numberOfProjects, this.legends.heatMap);

            path.color = stateColor;
            path.hoverColor = stateColor;
            path.selectedColor = stateColor;

            break;
          }
        }
      });
      $("#brazil-map").trigger("reDraw", this.maps);
    },

    setProponentesPins() {
      const localsList = Object.keys(this.proponentes);

      if (!this.maps.pins) {
        this.maps.pins = [];
      }

      this.maps.pins = this.maps.pins.filter(pin => pin.type !== "proponente");

      if (localsList.length === 0) { //proponentes is empty, no need to display it's pins
        $("#brazil-map").trigger("reDraw", this.maps);
        return;
      }

      localsList.forEach(local => {
        for (let path of this.maps.brazil_region.paths) {
          if (path.abbreviation === local) {
            const pin = {
              ...this.basePinData,
              xPos: path.textX - 10,
              yPos: path.textY,
              name: `${local}: ${this.proponentes[local]}`,
              src: this.getColorBylegend(this.proponentes[local], this.legends.proponentes),
              type: 'proponente',
            };

            this.maps.pins.push(pin);
            break; // The is no need to continue if the UF was found
          }
        }
      });

      $("#brazil-map").trigger("reDraw", this.maps);
    },

    setIncentivadoresPins() {
      const localsList = Object.keys(this.incentivadores);

      if (!this.maps.pins) {
        this.maps.pins = [];
      }

      this.maps.pins = this.maps.pins.filter(pin => pin.type !== "investidor");

      if (localsList.length === 0) { // incentivadores is empty, no need to display it's pins
        $("#brazil-map").trigger("reDraw", this.maps);
        return;
      }

      localsList.forEach(local => {
        for (let path of this.maps.brazil_region.paths) {
          if (path.abbreviation === local) {
            const pin = {
              ...this.basePinData,
              xPos: path.textX + 10,
              yPos: path.textY,
              name: `${local}: ${this.incentivadores[local]}`,
              src: this.getColorBylegend(this.incentivadores[local], this.legends.incentivadores),
              type: 'investidor',
            };

            this.maps.pins.push(pin);
            break; // The is no need to continue if the UF was found
          }
        }
      });

      $("#brazil-map").trigger("reDraw", this.maps);
    }
  }
};
</script>

<style>
</style>
