import cacheFetch from 'cache-fetch';


export const fetchData = (types, projectSegment = "") => {
    let segmentQuery = "";

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

export const batchFetch = async (segment="") => {
    let types = [
        "projetos_por_uf",
        "proponentes_por_uf",
        "incentivadores_por_uf",

        "projetos_por_regiao",
        "proponentes_por_regiao",
        "incentivadores_por_regiao",
    ];

    let response = await fetchData(types, segment);
    let { data } = await response.json();
    let listOfUfs = {};

    types.forEach(type => {
        listOfUfs[type] = {};

        for (let region of Object.keys(data[type])) {
          listOfUfs[type][region] = data[type][region]; // { "AC": 123, "AM": 456, ...}
        }
    });

    return listOfUfs;
}

