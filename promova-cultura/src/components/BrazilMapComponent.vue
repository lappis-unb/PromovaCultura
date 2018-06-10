<template>
    <div class="box-mapa">
        <div class="jsmaps-wrapper" id="brazil-map"/>
        <div style="display:none">{{projects}}</div>
        <div style="display:none">{{proponentes}}</div>
        <div style="display:none">{{incentivadores}}</div>
    </div>
</template>

<script>
import $ from "jquery";

// Keep a clean copy o JSMaps.maps. Please never overwrite it
const GLOBAL_CLEAN_MAPS = { ...window.JSMaps.maps };

export default {
  name: "BrazilMap",

  props: {
    projects: Object,
    proponentes: Object,
    incentivadores: Object
  },

  data() {
    return {
      maps: {}
    };
  },

  computed: {
    maxNumberOfProjects() {
      return this.countByUf(this.projects);
    },

    maxNumberOfProponentes() {
      return this.countByUf(this.proponentes);
    }
  },

  mounted() {
    // Make a copy of JSMaps.maps to keep a clea
    this.maps = { ...window.JSMaps.maps };

    this.displayBrazilMap();
    this.darkenAllMap();
  },

  beforeUpdate() {
    console.log("MAKE HEAT !!!");
    this.darkenAllMap();
    this.makeHeatMap();

    this.setProponentesPins();
  },

  methods: {
    countByUf(data) {
      const ufList = Object.keys(data);

      const max = ufList.reduce((currentMax, uf) => {
        if (data[uf] > currentMax) {
          return data[uf];
        } else {
          return currentMax;
        }
      }, 0);

      return max;
    },

    displayBrazilMap() {
      $("#brazil-map").JSMaps({
        map: "brazil",
        onStateClick: function(data) {
          console.log(data.abbreviation + ": ");
          console.log(data);
        }
      });
      console.log("Printei o mapa");
    },

    darkenAllMap() {
      for (let state of this.maps.brazil.paths) {
        state.color = "#efe8c6";
        state.hoverColor = "#efe8c6";
        state.selectedColor = "#efe8c6";
      }

      $("#brazil-map").trigger("reDraw", this.maps);

      console.log("Darken !!!");
    },

    getColorByPercentil(percentil) {
      let stateColor = "#efe8c6"; // <= 3%

      if (percentil > 3 && percentil <= 5) {
        stateColor = "#daf39d";
      } else if (percentil > 6 && percentil <= 12) {
        stateColor = "#b8e844";
      } else if (percentil > 13 && percentil <= 35) {
        stateColor = "#8db824";
      } else if (percentil > 36 && percentil <= 60) {
        stateColor = "#66861a";
      } else if (percentil > 60 && percentil <= 80) {
        stateColor = "#4d6513";
      } else if (percentil > 80 && percentil <= 100) {
        stateColor = "#2c380e";
      }

      return stateColor;
    },

    getProponentesPinByPercentil(percentil) {
      let pinSvg = "proponente_LVL_1"; // <= 20%

      if (percentil > 20 && percentil <= 40) {
        pinSvg = "proponente_LVL_2";
      } else if (percentil > 40 && percentil <= 60) {
        pinSvg = "proponente_LVL_3";
      } else if (percentil > 60 && percentil <= 80) {
        pinSvg = "proponente_LVL_4";
      } else if (percentil > 80) {
        console.log(`ELSE: ${percentil}`);
        // > 80%
        pinSvg = "proponente_LVL_5";
      }

      return pinSvg;
    },

    makeHeatMap() {
      const ufList = Object.keys(this.projects);

      if (ufList.length === 0) {
        console.log("Projects is empty, nothing to heat");
        return;
      }

      ufList.forEach(uf => {
        let numberOfProjects = this.projects[uf];

        for (let state of this.maps.brazil.paths) {
          if (state.abbreviation === uf) {
            let percentil = numberOfProjects / this.maxNumberOfProjects * 100;
            let stateColor = this.getColorByPercentil(percentil);

            state.color = stateColor;
            state.hoverColor = stateColor;
            state.selectedColor = stateColor;

            break; // The is no need to continue if the UF was found
          }
        }
      });

      $("#brazil-map").trigger("reDraw", this.maps);
    },

    setProponentesPins() {
      const ufList = Object.keys(this.proponentes);

      if (ufList.length === 0) {
        console.log("proponentes is empty, no need to display it's pins");

        // Clean pins on display
        this.maps.pins = [];
        $("#brazil-map").trigger("reDraw", this.maps);
        return;
      }

      const pins = [];

      const basePinData = {
        srcWidth: 74,
        srcHeight: 81,
        pinWidth: 40,
        pinHeight: 30
      };

      this.maps.pins = [];

      ufList.forEach(uf => {
        let numberOfProponentes = this.proponentes[uf];

        for (let state of this.maps.brazil.paths) {
          if (state.abbreviation === uf) {
            let percentil =
              numberOfProponentes / this.maxNumberOfProponentes * 100;
            let pinSvg = this.getProponentesPinByPercentil(percentil);

            const pin = {
              ...basePinData,
              xPos: state.textX,
              yPos: state.textY,
              name: `${uf}: ${numberOfProponentes}`,
              src: `../static/svg-icons/${pinSvg}.svg`,
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
/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
  /*.box-mapa {
        display: none;
    }*/
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  /*.box-mapa {
        display: none;
    }*/
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  /*.box-mapa {
        display: none;
    }*/
}
/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
  /*.box-mapa {
        display: none;
    }*/
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
  /*.box-mapa {
        display: none;
    }*/
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  .box-mapa {
    display: block;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
  .box-mapa {
    display: block;
  }
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
  .box-mapa {
    display: block;
  }
}
</style>
