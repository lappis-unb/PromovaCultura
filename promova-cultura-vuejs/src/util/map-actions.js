import $ from "jquery";
import "@/../static/jsmaps/brazil.js";
import "@/../static/jsmaps/brazil_region.js";

function displayBrazilMap(mapType) {
  $("#brazil-map").JSMaps({
    map: mapType,
    onStateClick: function (data) {
      console.log(data.abbreviation + ": ");
      console.log(data);
    }
  });
}

function darkenAllMap(brazilMap) {
  for (let state of brazilMap.paths) {
    state.color = "#dadada";
    state.hoverColor = "#dadada";
    state.selectedColor = "#dadada";
  }

  $("#brazil-map").trigger("reDraw", brazilMap);
}

function getColorBylegend(qtd, maplegend) {
  let colorSub;
  for (let i = 0; i < maplegend.length; i++) {
    if(maplegend[i].min <= qtd && qtd <= maplegend[i].max){
      colorSub = maplegend[i].color;
      break;
    }
  }

  return colorSub;
}

function makeHeatMap(brazilMap, projects, legends) {
    const localList = Object.keys(projects);

    if (localList.length === 0) {
      console.log("Projects is empty, nothing to heat");
      return;
    }
    localList.forEach(local => {
      let numberOfProjects = projects[local];

      for (let state of brazilMap.paths) {
        if (state.abbreviation === local) {
          let stateColor = getColorBylegend(numberOfProjects, legends.heatMap);

          state.color = stateColor;
          state.hoverColor = stateColor;
          state.selectedColor = stateColor;

          break; // There is no need to continue if the local was found
        }
      }
    });
    $("#brazil-map").trigger("reDraw", brazilMap);
}

function setProponentesPins(maps, brazilMap, legends, basePinData, proponentes) {
  const localList = Object.keys(proponentes);

  if (!maps.pins) {
    maps.pins = [];
  }

  maps.pins = maps.pins.filter(pin => pin.type !== "proponente");

  if (localList.length === 0) { //proponentes is empty, no need to display it's pins
    $("#brazil-map").trigger("reDraw", maps);
    return;
  }

  localList.forEach(local => {
    for (let state of brazilMap.paths) {
      if (state.abbreviation === local) {
        const pin = {
          ...basePinData,
          xPos: state.textX - 10,
          yPos: state.textY,
          name: `${local}: ${proponentes[local]}`,
          src: getColorBylegend(proponentes[local], legends.proponentes),
          type: 'proponente',
        };

        maps.pins.push(pin);
        break; // The is no need to continue if the local was found
      }
    }
  });

  $("#brazil-map").trigger("reDraw", maps);
}

function setIncentivadoresPins(incentivadores, maps, brazilMap, legends, basePinData) {
  const ufList = Object.keys(incentivadores);

  if (!maps.pins) {
    maps.pins = [];
  }

  maps.pins = maps.pins.filter(pin => pin.type !== "investidor");

  if (ufList.length === 0) { // incentivadores is empty, no need to display it's pins
    $("#brazil-map").trigger("reDraw", maps);
    return;
  }

  ufList.forEach(uf => {
    for (let state of brazilMap.paths) {
      if (state.abbreviation === uf) {
        const pin = {
          ...basePinData,
          xPos: state.textX + 10,
          yPos: state.textY,
          name: `${uf}: ${incentivadores[uf]}`,
          src: getColorBylegend(incentivadores[uf], legends.incentivadores),
          type: 'investidor',
        };

        maps.pins.push(pin);
        break; // The is no need to continue if the UF was found
      }
    }
  });

  $("#brazil-map").trigger("reDraw", maps);
}

export default {
  displayBrazilMap,
  darkenAllMap,
  makeHeatMap,
  setProponentesPins,
  setIncentivadoresPins,
};
