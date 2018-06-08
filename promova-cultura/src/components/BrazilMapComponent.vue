<template>
    <div class="box-mapa">
        <div class="jsmaps-wrapper" id="brazil-map"/>
        <div style="display:none">{{dataValue}}</div>
    </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "BrazilMap",
  props: {
    dataValue: Object
  },
  mounted: function() {
    displayBrazilMap();
    darkenAllMap();

    function displayBrazilMap() {
      $("#brazil-map").JSMaps({
        map: "brazil",
        stateClickAction: "none"
      });
      console.log("Printei o mapa");
    }

    function darkenAllMap() {
      const maps = window.JSMaps.maps;
      console.log("Pintei o mapa");
      for (let state of maps.brazil.paths) {
        state.color = "#efe8c6";
        state.hoverColor = "#efe8c6";
        state.selectedColor = "#efe8c6";
      }

      $("#brazil-map").trigger("reDraw", maps);
    }
  },
  beforeUpdate: function() {
    darkenAllMap();
    setAPIDataToMap(this.dataValue);

    function darkenAllMap() {
      const maps = window.JSMaps.maps;
      console.log("Pintei o mapa");
      for (let state of maps.brazil.paths) {
        state.color = "#efe8c6";
        state.hoverColor = "#efe8c6";
        state.selectedColor = "#efe8c6";
      }
      $("#brazil-map").trigger("reDraw", maps);
    }

    // $.get('http://api.salic.cultura.gov.br/v1/projetos/?limit=100').then(data => {
    //     const projetos = data._embedded.projetos;

    //     const listOfUfs = projetos.reduce((accumulator, project) => {
    //         if (accumulator[project.UF] === undefined) {
    //             accumulator[project.UF] = 1;
    //         } else {
    //             accumulator[project.UF] += 1;
    //         }

    //         return accumulator;
    //     }, {});

    //     global_states = listOfUfs;
    //     setAPIDataToMap(listOfUfs);
    // });

    function setAPIDataToMap(listOfUfs) {
      console.log("Dados do mapa");
      console.log(listOfUfs);

      makeHeatMap(listOfUfs);
    }

    function makeHeatMap(listOfUfs) {
      //console.log("Entrou no make heat")
      const maps = window.JSMaps.maps;
      const ufList = Object.keys(listOfUfs);

      // console.log("Este é o list of us")
      // console.log(listOfUfs)

      // Get the maximum number of projects from the uf list
      const maxNumberOfProjects = ufList.reduce(
        (currentMax, uf) =>
          listOfUfs[uf] > currentMax ? listOfUfs[uf] : currentMax,
        0
      );

      ufList.forEach(uf => {
        let numberOfProjects = listOfUfs[uf];

        for (let state of maps.brazil.paths) {
          if (state.abbreviation === uf) {
            let percentil = numberOfProjects / maxNumberOfProjects * 100;
            let state_color;

            if (percentil <= 3) {
              state_color = "#efe8c6";
            } else if (percentil > 3 && percentil <= 5) {
              state_color = "#daf39d";
            } else if (percentil > 6 && percentil <= 12) {
              state_color = "#b8e844";
            } else if (percentil > 13 && percentil <= 35) {
              state_color = "#8db824";
            } else if (percentil > 36 && percentil <= 60) {
              state_color = "#66861a";
            } else if (percentil > 60 && percentil <= 80) {
              state_color = "#4d6513";
            } else if (percentil > 80 && percentil <= 100) {
              state_color = "#2c380e";
            }

            state.color = state_color;
            state.hoverColor = state_color;
            state.selectedColor = state_color;
            break;
          }
        }
      });

      $("#brazil-map").trigger("reDraw", maps);
    }
  },
  methods: {
    displayBrazilMap: function() {
      $("#brazil-map").JSMaps({
        map: "brazil",
        stateClickAction: "none"
      });
    },

    darkenAllMap: function() {
      const maps = window.JSMaps.maps;
      for (let state of maps.brazil.paths) {
        state.color = "#efe8c6";
        state.hoverColor = "#efe8c6";
        state.selectedColor = "#efe8c6";
      }

      $("#brazil-map").trigger("reDraw", maps);
    },
    setAPIDataToMap: function(listOfUfs) {
      displayBrazilMap();
      makeHeatMap(listOfUfs);
    },
    makeHeatMap: function(listOfUfs) {
      const maps = window.JSMaps.maps;
      const ufList = Object.keys(listOfUfs);
      // Get the maximum number of projects from the uf list
      const maxNumberOfProjects = ufList.reduce(
        (currentMax, uf) =>
          listOfUfs[uf] > currentMax ? listOfUfs[uf] : currentMax,
        0
      );

      ufList.forEach(uf => {
        let numberOfProjects = listOfUfs[uf];

        for (let state of maps.brazil.paths) {
          if (state.abbreviation === uf) {
            let percentil = numberOfProjects / maxNumberOfProjects * 100;
            let state_color;

            if (percentil <= 3) {
              state_color = "#efe8c6";
            } else if (percentil > 3 && percentil <= 5) {
              state_color = "#daf39d";
            } else if (percentil > 6 && percentil <= 12) {
              state_color = "#b8e844";
            } else if (percentil > 13 && percentil <= 35) {
              state_color = "#8db824";
            } else if (percentil > 36 && percentil <= 60) {
              state_color = "#66861a";
            } else if (percentil > 60 && percentil <= 80) {
              state_color = "#4d6513";
            } else if (percentil > 80 && percentil <= 100) {
              state_color = "#2c380e";
            }

            state.color = state_color;
            state.hoverColor = state_color;
            state.selectedColor = state_color;
            break;
          }
        }
      });
      $("#brazil-map").trigger("reDraw", maps);
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
