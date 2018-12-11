import $ from "jquery";
import cacheFetch from 'cache-fetch';
import LoadingOverlay from "gasparesganga-jquery-loading-overlay";

export const simpleFetch = async (endpoint) => {
  let query = "query {";
  query += endpoint
  query += "}";
  const queryAsUrl = encodeURI(query);

  const promise = await cacheFetch(`https://salicapi.lappis.rocks/graphql?query=${queryAsUrl}`);

  return promise.json()
};

export const fetchData = (types, projectSegment = "") => {
  let segmentQuery = "";

    $("#brazil-map").LoadingOverlay("show", {
        background: "rgba(255, 255, 255, 1)",
        image: "",
        fontawesome: "fa fa-circle-notch fa-spin",
        fontawesomeColor: "#565656"
    });

    if (projectSegment !== "" && projectSegment != "Todos os segmentos" && typeof projectSegment === "string") {
        segmentQuery = `(segmento: "${projectSegment}")`;
    }

  let query = "query {";
  query += types.map(type => `${type} ${segmentQuery}\n`).join("");
  query += "}";

  const queryAsUrl = encodeURI(query);
  const promise = cacheFetch(`https://salicapi.lappis.rocks/graphql?query=${queryAsUrl}`);
  return promise;
}

export const batchFetch = async (segment = "") => {
  let types = [
    "projetos_por_uf",
    "proponentes_por_uf",
    "incentivadores_por_uf",

    "projetos_por_regiao",
    "proponentes_por_regiao",
    "incentivadores_por_regiao",
  ];

  try {
    var response = await fetchData(types, segment);
    $("#brazil-map").LoadingOverlay("hide")

  } catch (err) {
    $("#brazil-map").LoadingOverlay("hide")


    $("#brazil-map").LoadingOverlay("show", {
      background: "rgba(255, 255, 255, 1)",
      image: "",
      text: "Conexão falhou. Tente reiniciar a página.",
      textResizeFactor: 0.17,
      textAutoResize: false,
      textColor: "#ff0000"
    });
  }

  let {data} = await response.json();
  let listOfUfs = {};

  types.forEach(type => {
    listOfUfs[type] = {};

    for (let region of Object.keys(data[type])) {
      listOfUfs[type][region] = data[type][region]; // { "AC": 123, "AM": 456, ...}
    }
  });

  return listOfUfs;
}
