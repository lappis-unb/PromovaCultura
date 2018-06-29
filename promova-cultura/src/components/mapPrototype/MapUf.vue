<template>
    <div class="map-container">
        <div class="jsmaps-wrapper" id="brazil-map"/>
        <div style="display:none">{{projects}}</div>
        <div style="display:none">{{proponentes}}</div>
        <div style="display:none">{{incentivadores}}</div>
    </div>
</template>

<script>
import $ from "jquery";
import "@/../static/jsmaps/brazil.js";
import mapActions from '@/util/map-actions';

export default {
  name: "BrazilMap",

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
        pinWidth: 20,
        pinHeight: 15
      }
    };
  },

  mounted() {
    // Make a copy of JSMaps.maps to keep a clea
    // console.log("uf")
    this.maps = { ...window.JSMaps.maps };

    mapActions.displayBrazilMap("brazil");
    // this.displayBrazilMap();
    mapActions.darkenAllMap(this.maps.brazil);
    // this.darkenAllMap();
  },

  beforeUpdate() {
    mapActions.darkenAllMap(this.maps.brazil);
    // this.darkenAllMap();
    mapActions.makeHeatMap(this.maps, this.maps.brazil, this.projects, this.legends);
    // this.makeHeatMap();

    mapActions.setProponentesPins(
      this.maps,
      this.maps.brazil,
      this.legends,
      this.basePinData,
      this.proponentes
    );

    mapActions.setIncentivadoresPins(
      this.incentivadores,
      this.maps,
      this.maps.brazil,
      this.legends,
      this.basePinData,
    );
    // this.setProponentesPins();
    // this.setIncentivadoresPins();
  },

  methods: {
    /*
    displayBrazilMap() {
      $("#brazil-map").JSMaps({
        map: "brazil",
        onStateClick: function(data) {
          console.log(data.abbreviation + ": ");
          console.log(data);
        }
      });
      console.log("Map printed");
    },
    */

    /*
    darkenAllMap() {
      for (let state of this.maps.brazil.paths) {
        state.color = "#efe8c6";
        state.hoverColor = "#efe8c6";
        state.selectedColor = "#efe8c6";
      }

      $("#brazil-map").trigger("reDraw", this.maps);
    },
    */

    getColorBylegend(qtd, maplegend) {
      var colorSub;
      maplegend.forEach((sub) => {
        if(sub.min < qtd && qtd < sub.max+10){
          colorSub = sub.color;
        }
      })
      return colorSub;
    },

    // makeHeatMap() {
    //   const ufList = Object.keys(this.projects);

    //   if (ufList.length === 0) {
    //     console.log("Projects is empty, nothing to heat");
    //     return;
    //   }
    //   ufList.forEach(uf => {
    //     let numberOfProjects = this.projects[uf];

    //     for (let state of this.maps.brazil.paths) {
    //       if (state.abbreviation === uf) {
    //         let stateColor = this.getColorBylegend(numberOfProjects, this.legends.heatMap);

    //         state.color = stateColor;
    //         state.hoverColor = stateColor;
    //         state.selectedColor = stateColor;

    //         break; // The is no need to continue if the UF was found
    //       }
    //     }
    //   });
    //   $("#brazil-map").trigger("reDraw", this.maps);
    // },

    /*
    setProponentesPins() {
      const ufList = Object.keys(this.proponentes);

      if (!this.maps.pins) {
        this.maps.pins = [];
      }

      this.maps.pins = this.maps.pins.filter(pin => pin.type !== "proponente");

      if (ufList.length === 0) { //proponentes is empty, no need to display it's pins
        $("#brazil-map").trigger("reDraw", this.maps);
        return;
      }

      ufList.forEach(uf => {
        for (let state of this.maps.brazil.paths) {
          if (state.abbreviation === uf) {
            const pin = {
              ...this.basePinData,
              xPos: state.textX - 10,
              yPos: state.textY,
              name: `${uf}: ${this.proponentes[uf]}`,
              src: this.getColorBylegend(this.proponentes[uf], this.legends.proponentes),
              type: 'proponente',
            };

            this.maps.pins.push(pin);
            break; // The is no need to continue if the UF was found
          }
        }
      });

      $("#brazil-map").trigger("reDraw", this.maps);
    },
    */

    // setIncentivadoresPins() {
    //   const ufList = Object.keys(this.incentivadores);

    //   if (!this.maps.pins) {
    //     this.maps.pins = [];
    //   }

    //   this.maps.pins = this.maps.pins.filter(pin => pin.type !== "investidor");

    //   if (ufList.length === 0) { // incentivadores is empty, no need to display it's pins
    //     $("#brazil-map").trigger("reDraw", this.maps);
    //     return;
    //   }

    //   ufList.forEach(uf => {
    //     for (let state of this.maps.brazil.paths) {
    //       if (state.abbreviation === uf) {
    //         const pin = {
    //           ...this.basePinData,
    //           xPos: state.textX + 10,
    //           yPos: state.textY,
    //           name: `${uf}: ${this.incentivadores[uf]}`,
    //           src: this.getColorBylegend(this.incentivadores[uf], this.legends.incentivadores),
    //           type: 'investidor',
    //         };

    //         this.maps.pins.push(pin);
    //         break; // The is no need to continue if the UF was found
    //       }
    //     }
    //   });

    //   $("#brazil-map").trigger("reDraw", this.maps);
    // }
  }
};
</script>
