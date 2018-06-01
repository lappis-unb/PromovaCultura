(function ($) {
  "use strict";

  const colors = {
    "Centro-Oeste": {
      color: "rgb(0, 180, 0)",
      members: ["Goiás", "Distrito Federal", "Mato Grosso", "Mato Grosso do Sul"],
      totalOfProjects: 0,
    },
    "Norte": {
      color: "rgb(0, 180, 0)",
      members: ["Acre", "Amazonas", "Roraima", "Rondônia", "Amapá", "Pará", "Tocantins"],
      totalOfProjects: 0,
    },
    "Sudeste": {
      color: "rgb(0, 180, 0)",
      members: ["São Paulo", "Rio de Janeiro", "Espírito Santo", "Minas Gerais"],
      totalOfProjects: 0,
    },
    "Sul": {
      color: "rgb(0, 180, 0)",
      members: ["Rio Grande do Sul", "Santa Catarina", "Paraná"],
      totalOfProjects: 0,
    },
    "Nordeste": {
      color: "rgb(0, 180, 0)",
      members: ["Maranhão", "Piauí", "Pernambuco", "Ceará", "Rio Grande do Norte", "Paraíba", "Alagoas", "Sergipe", "Bahia"],
      totalOfProjects: 0,
    },
  };


  function displayBrazilMap(listOfUfs, colors) {
    $('#brazil-map').html("");

    $('#brazil-map').JSMaps({
      map: 'brazil',
      stateClickAction: 'none',
      onStateClick: (data) => {
        let result = listOfUfs[data.abbreviation] == undefined ? 0 : listOfUfs[data.abbreviation];
        $('.content')[0].textContent = "Quantidade de projetos de " + data.name + ": " + result
        console.log("Quantidade de projetos de " + data.name + ": " + listOfUfs[data.abbreviation])
      },
      groups: [
        {
          enable: true,
          name: "Centro-Oeste",
          members: colors['Centro-Oeste'].members,
          color: colors['Centro-Oeste'].color,
          hoverColor: "rgb(0, 100, 0)",
          text: "Beireleibe"
        },
        {
          enable: true,
          name: "Norte",
          members: colors['Norte'].members,
          color: colors['Norte'].colors,
          hoverColor: "rgb(0, 100, 0)",
          text: "Beireleibe"
        },
        {
          enable: true,
          name: "Sudeste",
          members: colors['Sudeste'].members,
          color: colors['Sudeste'].color,
          hoverColor: "rgb(0, 100, 0)",
          text: "Beireleibe"
        },
        {
          enable: true,
          name: "Sul",
          members: colors['Sul'].members,
          color: colors['Sul'].color,
          hoverColor: "rgb(0, 100, 0)",
          text: "Beireleibe"
        },
        {
          enable: true,
          name: "Nordeste",
          members: colors['Nordeste'].members,
          color: colors['Nordeste'].color,
          hoverColor: "rgb(0, 100, 0)",
          text: "Beireleibe"
        }
      ]
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

  displayBrazilMap({}, colors);

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
    let newColors = makeHeatMap(listOfUfs);
    displayBrazilMap(listOfUfs, newColors);
  }

  function getMaxNumberOfProjects(colors, regionList) {
    const maxNumberOfProjects = regionList.reduce((currentMax, region) => {
      if (colors[region].totalOfProjects > currentMax) {
        return colors[region].totalOfProjects;
      } else {
        return currentMax;
      }
    }, 0);

    return maxNumberOfProjects;
  }

  function makeHeatMap(listOfUfs) {
    const newColors = { ...colors };
    const maps = window.JSMaps.maps;

    const regionList = Object.keys(newColors);


    regionList.forEach(regionKey => {
      let region = newColors[regionKey];

      for (let state of maps.brazil.paths) {
        if (region.members.includes(state.name) && listOfUfs[state.abbreviation] !== undefined) {
          region.totalOfProjects += listOfUfs[state.abbreviation];
        }
      }
    });

    // Get the maximum number of projects from the uf list
    const maxNumberOfProjects = getMaxNumberOfProjects(newColors, regionList);

    regionList.forEach(regionKey => {
      const region = newColors[regionKey];

      let redShade = 180 * (region.totalOfProjects / maxNumberOfProjects);
      redShade = 180 - redShade;

      if (redShade < 30) {
        redShade = 30;
      }

      region.color = `rgb(0, ${redShade}, 0)`;
    });


    console.log(newColors);

    return newColors;
  }
})(jQuery);
