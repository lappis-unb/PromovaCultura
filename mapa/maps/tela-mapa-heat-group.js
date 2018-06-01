(function ($) {
  // @ts-check
  "use strict"; // make JS do not accept variables without var, let or const

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
      const UF = e.target.value;
      const result = listOfUfs[UF] == undefined ? 0 : listOfUfs[uf];

      $('#brazil-map').trigger('stateClick', UF);
      $('.content')[0].textContent = "Quantidade de projetos de " + UF + ": " + result;

      console.log(UF, listOfUfs);
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

      let redShade = 180 * (region.totalOfProjects / maxTotalOfProjects);
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
