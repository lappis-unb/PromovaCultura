function dropSelect(e) {
  let segment = e.value
  console.log()
  data.forEach(function(element) {
    element.symbolSize = Math.floor(Math.random() * Math.floor(60));
  })

  links.forEach(function(element) {
    element.lineStyle.width = Math.floor(Math.random() * Math.floor(15));
  })
  console.log(links)

  myChart.setOption(option);
}

categories = [{
  'name': 'Norte',
  'itemStyle': {
    'color': "#efa543"
  }
}, {
  'name': 'Nordeste',
  'itemStyle': {
    'color': "#cbd14d"
  }
}, {
  'name': 'Sudeste',
  'itemStyle': {
    'color': "#3fa03f"
  }
}, {
  'name': 'Sul',
  'itemStyle': {
    'color': "#4a98a5"
  }
}, {
  'name': 'Centro-Oeste',
  'itemStyle': {
    'color': "#285177"
  }
}]

ufDict = {
  "Acre": "AC",
  "Amapá": "AP",
  "Amazonas": "AM",
  "Pará": "PA",
  "Rondônia": "RO",
  "Roraima": "RR",
  "Tocantins": "TO",
  "Alagoas": "AL",
  "Bahia": "BA",
  "Ceará": "CE",
  "Maranhão": "MA",
  "Paraíba": "PB",
  "Pernambuco": "PE",
  "Piauí": "PI",
  "Rio Grande do Norte": "RN",
  "Sergipe": "SE",
  "Espírito Santo": "ES",
  "Minas Gerais": "MG",
  "Rio de Janeiro": "RJ",
  "São Paulo": "SP",
  "Paraná": "PR",
  "Rio Grande do Sul": "RS",
  "Santa Catarina": "SC",
  "Distrito Federal": "DF",
  "Goiás": "GO",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
}

ufList = [
  "Acre",
  "Alagoas",
  "Amazonas",
  "Amapá",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rondônia",
  "Rio Grande do Sul",
  "Roraima",
  "Santa Catarina",
  "Sergipe",
  "São Paulo",
  "Tocantins"
]

chartData = [{
  "name": "Acre",
  "x": 0,
  "y": 0,
  "category": "Norte",
  "symbolSize": 15,
  "draggable": "true",
  "value": 27
}, {
  "name": "Amapá",
  "value": 8,
  "symbolSize": 30,
  "category": "Norte",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "Amazonas",
  "symbolSize": 16,
  "category": "Norte",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Pará",
  "symbolSize": 60,
  "category": "Norte",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Rondônia",
  "symbolSize": 15,
  "category": "Norte",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Roraima",
  "value": 60,
  "symbolSize": 60,
  "category": "Norte",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "Tocantins",
  "symbolSize": 50,
  "category": "Norte",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Alagoas",
  "value": 20,
  "symbolSize": 30,
  "category": "Nordeste",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "Bahia",
  "symbolSize": 16,
  "category": "Nordeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Ceará",
  "symbolSize": 16,
  "category": "Nordeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Maranhão",
  "value": 6,
  "symbolSize": 18,
  "category": "Nordeste",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "Paraíba",
  "symbolSize": 15,
  "category": "Nordeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Pernambuco",
  "symbolSize": 16,
  "category": "Nordeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Piauí",
  "value": 6,
  "symbolSize": 18,
  "category": "Nordeste",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "Rio Grande do Norte",
  "symbolSize": 16,
  "category": "Nordeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Sergipe",
  "symbolSize": 16,
  "category": "Nordeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Distrito Federal",
  "value": 5,
  "symbolSize": 40,
  "category": "Centro-Oeste",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "Goiás",
  "symbolSize": 30,
  "category": "Centro-Oeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Mato Grosso",
  "symbolSize": 7,
  "category": "Centro-Oeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Mato Grosso do Sul",
  "value": 4,
  "symbolSize": 18,
  "category": "Centro-Oeste",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "Espírito Santo",
  "symbolSize": 20,
  "category": "Sudeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Minas Gerais",
  "symbolSize": 25,
  "category": "Sudeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Rio de Janeiro",
  "value": 7,
  "symbolSize": 10,
  "category": "Sudeste",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "São Paulo",
  "symbolSize": 75,
  "category": "Sudeste",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Paraná",
  "value": 7,
  "symbolSize": 30,
  "category": "Sul",
  "draggable": "true",
  "x": 0,
  "y": 0,
}, {
  "name": "Rio Grande do Sul",
  "symbolSize": 7,
  "category": "Sul",
  "draggable": "true",
  "value": 7,
  "x": 0,
  "y": 0,
}, {
  "name": "Santa Catarina",
  "value": 30,
  "symbolSize": 30,
  "category": "Sul",
  "draggable": "true",
  "x": 0,
  "y": 0,
}]

_links = [{}]

// var iti = {};
//
// function omelete() {
//   var ligations = {
//     "data": {
//       "deslocamentos": [{
//           "UFOrigem": "Minas Gerais",
//           "UFDestino": "São Paulo"
//         },
//         {
//           "UFOrigem": "Minas Gerais",
//           "UFDestino": "Minas Gerais"
//         },
//         {
//           "UFOrigem": "Rio de Janeiro",
//           "UFDestino": "Minas Gerais"
//         },
//         {
//           "UFOrigem": "Rio de Janeiro",
//           "UFDestino": "Rio Grande do Sul"
//         },
//         {
//           "UFOrigem": "Rio de Janeiro",
//           "UFDestino": "Distrito Federal"
//         },
//         {
//           "UFOrigem": "São Paulo",
//           "UFDestino": "Minas Gerais"
//         },
//         {
//           "UFOrigem": "São Paulo",
//           "UFDestino": "Minas Gerais"
//         },
//         {
//           "UFOrigem": "Minas Gerais",
//           "UFDestino": "São Paulo"
//         },
//       ]
//     }
//   }
//
//   $.each(ligations.data.deslocamentos, function(index, value) {
//     var result = value["UFOrigem"] + " - " + value["UFDestino"];
//     var inverse = value["UFDestino"] + " - " + value["UFOrigem"];
//
//     if (iti[result] !== undefined) {
//       iti[result] += 1;
//     } else {
//       if (iti[inverse] !== undefined) {
//         iti[inverse] += 1;
//       } else {
//         iti[result] = 1;
//       }
//     }
//   });
// }
