(function ($) {
  // @ts-check
  "use strict"; // make JS do not accept variables without var, let or const

  const colors = {
    "Centro-Oeste": {
      color: "#efe8c6",
      members: ["Goiás", "Distrito Federal", "Mato Grosso", "Mato Grosso do Sul"],
      totalOfProjects: 0,
      hoverColor: "#efe8c6",
    },
    "Sudeste": {
      color: "#efe8c6",
      members: ["São Paulo", "Rio de Janeiro", "Espírito Santo", "Minas Gerais"],
      totalOfProjects: 0,
      hoverColor: "#efe8c6",
    },
    "Norte": {
      color: "#efe8c6",
      members: ["Amapá", "Acre", "Amazonas", "Rondônia", "Pará", "Tocantins"],
      totalOfProjects: 0,
      hoverColor: "#efe8c6",
    },
    "Sul": {
      color: "#efe8c6",
      members: ["Rio Grande do Sul", "Santa Catarina", "Paraná"],
      totalOfProjects: 0,
      hoverColor: "#efe8c6",
    },
    "Nordeste": {
      color: "#efe8c6",
      members: ["Maranhão", "Piauí", "Pernambuco", "Ceará", "Rio Grande do Norte", "Paraíba", "Alagoas", "Sergipe", "Bahia"],
      totalOfProjects: 0,
      hoverColor: "#efe8c6",
    },
  };


  // Initialize all functions and in its proper execution order
  (function initialize() {
    displayBrazilMap({}, colors);
    fetchApiData();
  })();


  function displayBrazilMap(listOfUfs, colors) {
    $('#brazil-map').html("");

    $('#brazil-map').JSMaps({
      map: 'brazil',
      stateClickAction: 'none',
      groups: [
        {
          enable: true,
          name: "Centro-Oeste",
          members: colors['Centro-Oeste'].members,
          color: colors['Centro-Oeste'].color,
          hoverColor: colors['Centro-Oeste'].hoverColor,
          selectedColor: colors['Centro-Oeste'].hoverColor,
          text: "Beireleibe"
        },
        {
          enable: true,
          name: "Norte",
          members: ['Tocantins', 'Amapá', 'Roraima', 'Amazonas', 'Pará', 'Acre', 'Rondônia'],
          color: colors['Norte'].color,
          hoverColor: colors['Norte'].hoverColor,
          selectedColor: colors['Norte'].hoverColor,
          text: "Beireleibe"

        },
        {
          enable: true,
          name: "Sudeste",
          members: colors['Sudeste'].members,
          color: colors['Sudeste'].color,
          hoverColor: colors['Sudeste'].hoverColor,
          selectedColor: colors['Sudeste'].hoverColor,
          text: "Beireleibe"
        },
        {
          enable: true,
          name: "Sul",
          members: colors['Sul'].members,
          color: colors['Sul'].color,
          hoverColor: colors['Sul'].hoverColor,
          selectedColor: colors['Sul'].hoverColor,
          text: "Beireleibe"
        },
        {
          enable: true,
          name: "Nordeste",
          members: colors['Nordeste'].members,
          color: colors['Nordeste'].color,
          hoverColor: colors['Nordeste'].hoverColor,
          selectedColor: colors['Nordeste'].hoverColor,
          text: "Beireleibe"
        }
      ]
    });
  }

  function fetchApiData() {
    console.log("Calling API");
    console.time("API data fetched in");

    $.get('http://api.salic.cultura.gov.br/v1/projetos/?limit=100').then(data => {
      console.timeEnd("API data fetched in");

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
  }

  function setAPIDataToMap(listOfUfs) {
    let newColors = makeHeatMap(listOfUfs);
    displayBrazilMap(listOfUfs, newColors);
  }

  function makeHeatMap(listOfUfs) {
    const newColors = { ...colors };
    const maps = window.JSMaps.maps;
    const regionKeys = Object.keys(newColors);
    let maxTotalOfProjects = 0;

    // Set the totalOfProjects for each region
    regionKeys.forEach(regionKey => {
      const region = newColors[regionKey];

      for (let state of maps.brazil.paths) {
        // If the API does not have the state go for the next one
        if (listOfUfs[state.abbreviation] === undefined) {
          continue;
        }

        // If state it is a member of the current region
        // update the totalOfProjects of that region
        if (region.members.includes(state.name)) {
          region.totalOfProjects += listOfUfs[state.abbreviation];

          // Update maxTotalOfProjects if current region has more projects
          if (region.totalOfProjects > maxTotalOfProjects) {
            maxTotalOfProjects = region.totalOfProjects;
          }
        }
      }
    });

    // Updates the value of each region based on the totalOfProjects / maxTotalOfProjects
    regionKeys.forEach(regionKey => {
      const region = newColors[regionKey];
      let percentil = (region.totalOfProjects / maxTotalOfProjects) * 100;
      let region_color;

      if (percentil <= 20) {
        region_color = "#efe8c6"
      } else if (percentil > 20 && percentil <= 40) {
        region_color = "#daf39d"
      } else if (percentil > 40 && percentil <= 60) {
        region_color = "#acd941"
      } else if (percentil > 60 && percentil <= 80) {
        region_color = "#73971d"
      } else if (percentil > 80 && percentil <= 100) {
        region_color = "#4d6513"
      }

      region.color = region_color;
      region.hoverColor = region_color;
    });

    return newColors;
  }
})(jQuery);
