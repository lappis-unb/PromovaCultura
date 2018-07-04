import cacheFetch from 'cache-fetch';


export const fetchData = (types, projectSegment = "") => {
    let segmentQuery = "";

    if (projectSegment !== "" && typeof projectSegment === "string") {
        segmentQuery = `(segmento: "${projectSegment}")`;
    }


    let query = `
      query {
    `;

    query += types.map(type => `
        ${type} ${segmentQuery} {
            local,
            quantidade
        }
    `).join("");

    query += "}";

    const queryAsUrl = encodeURI(query);

    const promise = cacheFetch(`https://salic.dev.lappis.rocks/graphql?query=${queryAsUrl}`);

    return promise;
}

export const batchFetch = async (local, segment="") => {
    let types = [
        `projetos_por_${local}`,
        `proponentes_por_${local}`,
        `incentivadores_por_${local}`,
    ];

    let response = await fetchData(types, segment);
    let { data } = await response.json();
    let listOfUfs = {};

    types.forEach(type => {
        listOfUfs[type] = {};

        for (let region of data[type]) {
            listOfUfs[type][region.local] = region.quantidade;
        }
    });

    return listOfUfs;
}

