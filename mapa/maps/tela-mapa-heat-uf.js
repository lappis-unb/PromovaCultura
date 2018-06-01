(function ($) {
  "use strict";

  function displayBrazilMap(listOfUfs) {
    $('#brazil-map').JSMaps({
      map: 'brazil',
      stateClickAction: 'none',
      onStateClick: (data) => {
        let result = listOfUfs[data.abbreviation] == undefined ? 0 : listOfUfs[data.abbreviation];
        $('.content')[0].textContent = "Quantidade de projetos de " + data.name + ": " + result
        console.log("Quantidade de projetos de " + data.name + ": " + listOfUfs[data.abbreviation])
      },
    });

    $("#estados-brasil").on("change", (e) => {
      selectCombo(e.target.value);
    });
  }

  function selectCombo(uf) {
    let result = listOfUfs[uf] == undefined ? 0 : listOfUfs[uf];

    $('#brazil-map').trigger('stateClick', uf);
    $('.content')[0].textContent = "Quantidade de projetos de " + uf + ": " + result;

    console.log(uf, listOfUfs);
  }

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

    setAPIDataToMap(listOfUfs);
  });

  function darkenAllMap() {
    const maps = window.JSMaps.maps;

    for (let state of maps.brazil.paths) {
      state.color = "rgb(0, 180, 0)";
    }

    $('#brazil-map').trigger('reDraw', maps);
  }


  function setAPIDataToMap(listOfUfs) {
    displayBrazilMap(listOfUfs);
    darkenAllMap();
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
          let redShade = 180 * (numberOfProjects / maxNumberOfProjects);
          redShade = 180 - redShade;

          if (redShade < 30) {
            redShade = 30;
          }

          state.color = `rgb(0, ${redShade}, 0)`;
          break;
        }
      }
    });

    $('#brazil-map').trigger('reDraw', maps);
  }
})(jQuery);
