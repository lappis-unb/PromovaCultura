(function ($) {
  "use strict";
  var global_states;

  function displayBrazilMap(listOfUfs) {
    $('#brazil-map').JSMaps({
      map: 'brazil',
      stateClickAction: 'none',
      onStateClick: (data) => {
        let result = listOfUfs[data.abbreviation] == undefined ? 0 : listOfUfs[data.abbreviation];
        $('.content')[0].textContent = "Quantidade de projetos de " + data.name + ": " + result
      },
    });
  }5

  darkenAllMap();
  displayBrazilMap({});

  $.get('http://api.salic.cultura.gov.br/v1/projetos/?limit=100').then(data => {
    const projetos = data._embedded.projetos;

    const listOfUfs = projetos.reduce((accumulator, project) => {
      if (accumulator[project.UF] === undefined) {
        accumulator[project.UF] = 1;
      } else {
        accumulator[project.UF] += 1;
      }

      return accumulator;
    }, {});


    global_states = listOfUfs;
    setAPIDataToMap(listOfUfs);
  });

  function darkenAllMap() {
    const maps = window.JSMaps.maps;

    for (let state of maps.brazil.paths) {
      state.color = "#efe8c6";
      state.hoverColor = "#efe8c6";
      state.selectedColor = "#efe8c6";
    }

    $('#brazil-map').trigger('reDraw', maps);
  }


  function setAPIDataToMap(listOfUfs) {
    displayBrazilMap(listOfUfs);
    makeHeatMap(listOfUfs);
  }

  function makeHeatMap(listOfUfs) {
    const ufList = Object.keys(listOfUfs);
    const maps = window.JSMaps.maps;

    // Get the maximum number of projects from the uf list
    const maxNumberOfProjects = ufList.reduce((currentMax, uf) =>
      listOfUfs[uf] > currentMax ? listOfUfs[uf] : currentMax, 0);

    ufList.forEach(uf => {
      let numberOfProjects = listOfUfs[uf];

      for (let state of maps.brazil.paths) {
        if (state.abbreviation === uf) {
          let percentil = (numberOfProjects / maxNumberOfProjects) * 100;
          let state_color;

          if(percentil <= 20){
            state_color = "#efe8c6"
          }else if(percentil > 20 && percentil <= 40){
            state_color = "#daf39d"
          }else if(percentil > 40 && percentil <= 60){
            state_color = "#acd941"
          }else if (percentil > 60 && percentil <= 80){
            state_color = "#73971d"
          }else if (percentil > 80 && percentil <= 100){
            state_color = "#4d6513"
          }

          state.color = state_color;
          state.hoverColor = state_color;
          state.selectedColor = state_color;
          break;
        }
      }
    });

    $('#brazil-map').trigger('reDraw', maps);
  }
})(jQuery);
