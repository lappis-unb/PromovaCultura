<template>
    <div style="margin-top:20px;" class="row">
        <div class="col-sm-6">
            <button type="button" id="modal-button-filter" class="btn btn-sm btn-default" data-toggle="modal" data-target="#exampleModal">
                <i class="fas fa-filter"></i> Filtrar
            </button>

            <brazil-map
              :projects="projects"
              :proponentes="proponentes"
              :incentivadores="incentivadores"
            />
        </div>
        <div class="col-md-4" id="desktop-filters">
            <!-- <controls-filter-map :segmentos="segmentos"/> -->
            <section>
        <link rel="stylesheet" type="text/css" href="../../static/selectize/selectize.css" />
        <div class="card">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <label>Segmento cultural</label>
                    <select v-model="selected" @change="loadSegment()" class="custom-select">
                        <option v-for="segmento in segmentos" :value="segmento" v-bind:key="segmento">
                            {{segmento}}
                        </option>
                    </select>
                </li>
                <li class="list-group-item">
                    <span>Proponentes</span>
                    <label class="switch ">
                        <input type="checkbox" v-on:click="changeValueProponente()" class="default">
                        <span class="slider round"></span>
                    </label>
                </li>
                <li class="list-group-item">
                    <span>Incentivadores</span>
                    <label class="switch ">
                        <input type="checkbox" v-on:click="changeValueIncentivadores()" class="default">
                        <span class="slider round"></span>
                    </label>
                </li>
            </ul>
        </div>
    </section>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Filtro</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- <controls-filter-map :segmentos="segmentos" v-on:update="onChildUpdate"/> -->
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <label>Segmento cultural</label>
                                    <select v-model="selected" @change="loadSegment()" class="custom-select">
                                        <option v-for="segmento in segmentos" :value="segmento" v-bind:key="segmento">
                                            {{segmento}}
                                        </option>
                                    </select>
                                    {{selected}}
                                </li>
                                <li class="list-group-item">
                                    <span>Proponentes</span>
                                    <label class="switch ">
                                        <input type="checkbox" v-on:click="changeValueProponente()" class="default">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <li class="list-group-item">
                                    <span>Incentivadores</span>
                                    <label class="switch ">
                                        <input type="checkbox" v-on:click="changeValueIncentivadores()" class="default">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Filtrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import "selectize";
import segments from "@/util/segments";
import BrazilMap from "@/components/BrazilMapComponent";
//import ControlsFilterBrazilMap from "@/components/ControlsFilterBrazilMap";
//import ControlsFilterBrazilMap from '@/components/ControlsFilterV2'

export default {
  name: "ControlFilterBrazilMap",
  components: {
    //"controls-filter-map": ControlsFilterBrazilMap,
    "brazil-map": BrazilMap
  },

  data() {
    return {
      proponenteTextButton: "+ proponentes",
      incentivadoresTextButton: "+ incentivadores",
      selected: "Todos os segmentos",
      v: false,

      listOfProponentes: [],
      listOfIncentivadores: [],
      proponentesIsActivated: false,
      incentivadoresIsActivated: false,
      segmentos: segments,

      projects: {},
      proponentes: {},
      incentivadores: {}
    };
  },

  mounted() {
    this.fillProjects(this.fetchData("projetos_por_uf"));
  },

  watch: {
    segment() {
      this.fetchProjects();
    },

    proponentesIsActivated() {
      if (this.proponentesIsActivated) {
        this.fetchProponents();
      } else {
        this.proponentes = {};
      }
    },

    incentivadoresIsActivated() {
      if (this.incentivadoresIsActivated) {
        this.fetchIncentivadores();
      } else {
        this.incentivadores = {};
      }
    }
  },

  methods: {
    // Fetch data on the graphql server, filters by segment if given a segment
    fetchData(type = "", projectSegment = "") {
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

      const form = new FormData();
      form.append("query", query);

      const promise = fetch(`http://localhost:5000/graphql`, {
        method: "POST",
        body: form
      });

      return promise;
    },

    getDataFromKey(key) {
      return promise =>
        promise.then(res => res.json()).then(json => {
          const listOfUfs = {};

          for (let region of json.data[key]) {
            listOfUfs[region.local] = region.quantidade;
          }

          return Promise.resolve(listOfUfs);
        });
    },

    // Updates projects with the response from a graphql query
    fillProjects(promise) {
      const projetos_por_uf = this.getDataFromKey("projetos_por_uf")(promise);

      projetos_por_uf.then(listOfUfs => {
        this.projects = listOfUfs;
      });
    },

    fillProponentes(promise) {
      const proponentes_por_uf = this.getDataFromKey("proponentes_por_uf")(
        promise
      );

      proponentes_por_uf.then(listOfUfs => {
        this.proponentes = listOfUfs;
      });
    },

    fillIncentivadores(promise) {
      const incentivadores_por_uf = this.getDataFromKey(
        "incentivadores_por_uf"
      )(promise);

      incentivadores_por_uf.then(listOfUfs => {
        this.incentivadores = listOfUfs;
      });
    },

    changeValueProponente() {
      this.proponentesIsActivated = !this.proponentesIsActivated;
    },

    changeValueIncentivadores() {
      this.incentivadoresIsActivated = !this.incentivadoresIsActivated;
    },

    fetchWithSegment(type) {
      let promise = null;

      if (this.selected === "Todos os segmentos") {
        promise = this.fetchData(type);
      } else {
        promise = this.fetchData(type, this.selected);
      }

      return promise;
    },

    fetchProjects() {
      const promise = this.fetchWithSegment("projetos_por_uf");
      this.fillProjects(promise);
    },

    fetchProponents() {
      const promise = this.fetchWithSegment("proponentes_por_uf");
      this.fillProponentes(promise);
    },

    fetchIncentivadores() {
      const promise = this.fetchWithSegment("incentivadores_por_uf");
      this.fillIncentivadores(promise);
    }
  }
};
</script>


<style>
#modal-button-filter {
  display: block;
  float: right;
  position: relative;
  top: 40px;
  right: 3px;
  z-index: 100;
}

#modal-button-filter i {
  font-size: 11px;
}
/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  #modal-button-filter {
    display: none;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
ul {
  display: inline;
}
li {
  list-style: none;
}
.item-list-control {
  margin: 30px;
}
.list-buttons {
  margin: 5px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  float: right;
}

/* Hide default HTML checkbox */
.switch input {
  display: none;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input.default:checked + .slider {
  background-color: #6eff26;
  -webkit-box-shadow: 1px 1px 5px 1px #6eff26;
  box-shadow: 1px 1px 5px 1px #6eff26;
}
input.primary:checked + .slider {
  background-color: #2196f3;
}
input.success:checked + .slider {
  background-color: #8bc34a;
}
input.info:checked + .slider {
  background-color: #3de0f5;
}
input.warning:checked + .slider {
  background-color: #ffc107;
}
input.danger:checked + .slider {
  background-color: #f44336;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

#desktop-filters {
  display: none;
}

/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  #desktop-filters {
    display: initial;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
</style>
