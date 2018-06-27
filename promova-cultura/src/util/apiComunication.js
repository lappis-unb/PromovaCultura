import cacheFetch from 'cache-fetch';


function fetchData(type = "", projectSegment = "") {
    let segmentQuery = "";

    if (projectSegment !== "" && typeof projectSegment === "string") {
        segmentQuery = `(segmento: "${projectSegment}")`;
    }

    const query = `
        query {
            ${type} ${segmentQuery} {
                local,
                quantidade
            }
        }
    `;

    const queryAsUrl = encodeURI(query);

    const promise = cacheFetch(`http://192.168.1.221:5000/graphql?query=${queryAsUrl}`);

    return promise;
}

function getDataFromKey(key) {
    return promise =>
        promise.then(res => res.json()).then(json => {
            const listOfUfs = {};

            for (let region of json.data[key]) {
                listOfUfs[region.local] = region.quantidade;
            }

            return Promise.resolve(listOfUfs);
        });
}

// Updates projects with the response from a graphql query
function fillProjects(resourceName, promise, projects) {
    const projetos_por_uf = getDataFromKey(resourceName)(promise);

    projetos_por_uf.then(listOfUfs => {
        projects.projects = listOfUfs;
    });
}

function fillProponentes(resourceName, promise, proponentes) {
    const proponentes_por_uf = getDataFromKey(resourceName)(
        promise
    );

    proponentes_por_uf.then(listOfUfs => {
        proponentes.proponentes = listOfUfs;
    });
}

function fillIncentivadores(resourceName, promise, incentivadores) {
    const incentivadores_por_uf = getDataFromKey(
        resourceName
    )(promise);

    incentivadores_por_uf.then(listOfUfs => {
        incentivadores.incentivadores = listOfUfs;
    });
}

function fetchResource(resourceName, out, segment) {
    switch (resourceName.substring(0, 7)) {
        case "projeto":
            fetchProjects(resourceName, out, segment);
            break;
        case "propone":
            fetchProponents(resourceName, out, segment);
            break;
        case "incenti":
            fetchIncentivadores(resourceName, out, segment);
            break;
    }
}

function fetchProjects(resourceName, projects, segment) {
    const promise = fetchWithSegment(resourceName, segment);
    fillProjects(resourceName, promise, projects);
}

function fetchProponents(resourceName, proponentes, segment) {
    const promise = fetchWithSegment(resourceName, segment);
    fillProponentes(resourceName, promise, proponentes);
}

function fetchIncentivadores(resourceName, incentivadores, segment) {
    const promise = fetchWithSegment(resourceName, segment);
    fillIncentivadores(resourceName, promise, incentivadores);
}

function fetchWithSegment(type, segment) {
    let promise = null;

    if (segment === "Todos os segmentos") {
        promise = fetchData(type);
    } else {
        promise = fetchData(type, segment);
    }

    return promise;
}

export default fetchResource;