getData()

var externalDisplacements = {}
var internalDisplacements = {}


var option = {
  title: {
    show: false,
    text: "Grafo De Deslocamento",
    subtext: "Por Estado/Região",
    top: "top",
    left: "left"
  },
  tooltip: {
    formatter: function(data) {
      if (data.dataType == "edge") {
        return "Deslocamentos:" + data.data.value
      } else {
        return data.seriesName + "<br />" + data.data.name + ": " + data.data.value
      }
    },
  },
  legend: [{
    tooltip: {
      show: false
    },
    top: "auto",
    data: ['Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste']
  }],
  series: [{
    name: 'Deslocamentos Internos',
    type: 'graph',
    data: circleData,
    links: linkData,
    categories: categories,
    focusNodeAdjacency: true, // Show links of the hover state
    hoverAnimation: false, // Disables popping of circle on hover
    roam: true, // Lets the user xoom in and move the graph
    label: {
      normal: {
        color: '#ffffff',
        show: true,
        position: 'inside',
        fontWeight: 'bold'
      }
    },
    lineStyle: {
      color: "#dddddd",
      curveness: 0.3,
      opacity: 1,
    }
  }]
};

function getData() {
  $.ajax({
    url: "http://saliapi.lappis.rocks/graphiql?query=%7B%0A%20%20deslocamentos(limit%3A9999999)%20%7B%0A%20%20%20%20UFOrigem%0A%20%20%20%20UFDestino%0A%20%20%7D%0A%20%20%0A%7D",
    type: "GET",
    success: function(data) {
      buildGraph(data)
      $("#graph").LoadingOverlay("hide")
    },
    error: function(error) {
      $("#graph").LoadingOverlay("hide")

      $("#graph").LoadingOverlay("show", {
        background: "rgba(255, 255, 255, 1)",
        image: "",
        text: "Conexão falhou. Tente reiniciar a página.",
        textResizeFactor: 0.17,
        textAutoResize: false,
        textColor: "#ff0000"
      });
    }
  });
}


function buildGraph(data) {
  data.data.deslocamentos.forEach(function(deslocamento) {
    if (deslocamento.UFOrigem == deslocamento.UFDestino) {
      populateInternalDisplacement(deslocamento)
      return;
    }
    populateExternalDisplacement(deslocamento["UFOrigem"], deslocamento["UFDestino"])
  })
  populateLinks()
  populateCircles()

  mediaQuery(middle, big, small) // Call listener function at run time
  middle.addListener(mediaQuery) // Attach listener function on state changes
  big.addListener(mediaQuery) // Attach listener function on state changes
  small.addListener(mediaQuery) // Attach listener function on state changes
  // myChart.setOption(option)
}

function populateInternalDisplacement(deslocamento) {

  if (internalDisplacements[deslocamento.UFOrigem] !== undefined) {
    internalDisplacements[deslocamento.UFOrigem] += 1
  } else {
    internalDisplacements[deslocamento.UFOrigem] = 1
  }
}

function populateExternalDisplacement(origem, destino) {

  let result = origem + " - " + destino;
  let inverse = destino + " - " + origem;

  if (externalDisplacements[result] !== undefined) {
    externalDisplacements[result] += 1;
  } else {
    if (externalDisplacements[inverse] !== undefined) {
      externalDisplacements[inverse] += 1;
    } else {
      externalDisplacements[result] = 1;
    }
  }
}

function populateLinks() {
  Object.keys(externalDisplacements).forEach(function(element) {
    linkData.push({
      source: ufDict[element.substr(0, element.indexOf(' -'))],
      target: ufDict[element.substring(element.indexOf("- ") + 2)],
      lineStyle: {
        width: calculateLinkWidth(externalDisplacements[element]),
      },
      value: externalDisplacements[element],
      emphasis: {
        lineStyle: {
          color: "#555555",
        }
      }
    })
  })
}

function calculateLinkWidth(amountOfLinks) {
  if (amountOfLinks >= 0 && amountOfLinks <= 50) {
    width = 1
  } else if (amountOfLinks >= 51 && amountOfLinks <= 150) {
    width = 3
  } else if (amountOfLinks >= 151 && amountOfLinks <= 600) {
    width = 6
  } else if (amountOfLinks >= 601 && amountOfLinks <= 1500) {
    width = 8
  } else {
    width = 10
  }
  return width
}

function populateCircles() {
  circleData.forEach(function(element) {
    element.value = internalDisplacements[element.name]
    element.symbolSize = calculateSybolSize(internalDisplacements[element.name])
    element.name = ufDict[element.name]
  })
}

function calculateSybolSize(amountOfDisplacements) {
  if (amountOfDisplacements >= 0 && amountOfDisplacements <= 50) {
    symbolSize = 25
  } else if (amountOfDisplacements >= 51 && amountOfDisplacements <= 150) {
    symbolSize = 50
  } else if (amountOfDisplacements >= 151 && amountOfDisplacements <= 600) {
    symbolSize = 75
  } else if (amountOfDisplacements >= 601 && amountOfDisplacements <= 1500) {
    symbolSize = 90
  } else {
    symbolSize = 120
  }
  return symbolSize
}
