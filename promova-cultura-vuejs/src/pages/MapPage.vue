<template>
  <!-- d2 m1 stands for 2 bootstrap columns for desktop and one for mobile -->
  <layout-d2-m1
    :data="data"
    :legends="legends"
    :maxValues="maxValues"
    :level="level"
    :segment="selected"
    @updatedSegment="updatedSegment"
    @showProponentes="showProponentes"
    @showIncentivadores="showIncentivadores"
    @changeLevel="changeLevel"
    :legendMobile="legendMobile"
    :filterMobile="filterMobile"
    :legendDesktop="legendDesktop"
    :filterDesktop="filterDesktop"
    :filtersActivate="filtersActivate"
    :locationInfoShowOn="locationInfoShowOn"
    :proponentMap="proponentMap"
  />
</template>

<script>
import { batchFetch, simpleFetch } from "@/util/apiComunication.js";
import Mapd2m1 from "@/components/Map/layouts/map-d2-m1";
import $ from "jquery";
import Helpers from "@/util/helpers.js";
import LoadingOverlay from "gasparesganga-jquery-loading-overlay";
import { fetchFlask } from "../util/apiComunication";

export default {
  name: "ControlFilterBrazilMap",
  components: {
    "layout-d2-m1": Mapd2m1
  },
  props: {
    legendMobile: String,
    filterMobile: String,
    legendDesktop: String,
    filterDesktop: String,
    useMaxWithRanking: Boolean,
    proponentMap: Boolean,
    proponentData: Object,
    locationInfoShowOn: {
      type: String,
      default: "click"
    }
  },
  data() {
    return {
      data: {
        activeViz: {},
        UF: {investors: {}},
        region: {investors:{}},
        proponentesMap: {},
        raisedAmount: {},
        approvedAmount: {},
        totals: {},
        fields: [
          "UF",
          "QuantidadeDeProponentes",
          "ValorAprovado",
          "ValorCaptado"
        ],
        csv: []
      },
      filtersActivate: {
        proponentes: false,
        incentivadores: false
      },
      maxValues: {
        projects: 0,
        proponents: 0,
        investors: 0
      },
      legends: {
        heatMap: [],
        proponentes: [],
        incentivadores: []
      },
      level: "UF",
      selected: "Todos os segmentos"
    };
  },
  watch: {
    proponentData: {
      handler(data) {
        this.updateValues();
        this.updateChildrenProps();
        this.generateAllLegends();
      },
      deep: true
    },
    level() {
      this.updateChildrenProps();
    }
  },
  mounted() {
    this.fetchAllResources();
    this.updateValues();
    document.title = "Mapa de Calor";
  },
  methods: {
    updateChildrenProps() {
      this.data.activeViz =
        this.level == "UF" ? this.data.UF : this.data.region;

      var tmp = this.data.activeViz;
      this.maxValues.projects = this.getMaxByUF(tmp.projects, "projects");
      this.maxValues.proponentes = this.getMaxByUF(
        tmp.proponents,
        "proponentes"
      );
      this.maxValues.investors = this.getMaxByUF(
        tmp.investors,
        "incentivadores"
      );

      this.showPins();
    },
    updatedSegment(segment) {
      this.selected = segment;
      this.fetchAllResources();
      this.updateValues();
    },

    generateCSV: function() {
      // const object = this.data.approvedAmount;
      var values = [];
      for (const [key, value] of Object.entries(this.data.approvedAmount)) {
        values.push({
          UF: key,
          QuantidadeDeProponentes: this.data.UF.proponents[key],
          ValorAprovado: value,
          ValorCaptado: this.data.raisedAmount[key]
        });
      }

      this.data.csv = values;
    },
    async fetchAllResources() {
      if (!this.proponentMap) {
        console.log(`Fetching API.\nSEGMENT: ${this.selected}`);
        const data = await batchFetch(this.selected);
        this.data.UF = {
          projects: data.projetos_por_uf,
          investors: data.incentivadores_por_uf,
          proponents: data.proponentes_por_uf
        };
        
        this.data.region = {
          projects: data.projetos_por_regiao,
          investors: data.incentivadores_por_regiao,
          proponents: data.proponentes_por_regiao
        };
      }
    },
    updateValues() {
      if (this.proponentMap) {
        this.data.UF.proponents = this.proponentData.proponents;
        this.data.UF.projects = this.proponentData.raisedAmount;

        this.data.approvedAmount = this.proponentData.approvedAmount;
        this.data.raisedAmount = this.proponentData.raisedAmount;
        this.data.totals = this.proponentData.totals;

        this.generateCSV();
        $("#brazil-map").LoadingOverlay("hide");
      }
    },
    calculatePercentage(objeto, total) {
      var totals = {};
      for (var i of Object.keys(objeto)) {
        totals[i] = ((objeto[i] / total) * 100).toFixed(2);
      }
      return totals;
    },
    showProponentes(show) {
      console.log("ASDUHADSDASIJADSIADSASJOGASOGKASOGKASKGASOGKASO")
      if (!this.proponentMap) {
        this.filtersActivate.proponentes = show;
        this.showPins();
      }
    },
    showIncentivadores(show) {
      console.log("ADIJDSIJDASIJSAD")
      this.filtersActivate.incentivadores = show;
      this.showPins();
    },
    changeLevel(level) {
      this.level = level;
    },
    getMaxByUF(data, type) {
      const ufList = Object.keys(data);

      if (this.useMaxWithRanking) {
        const max = ufList.reduce((currentMax, uf) => {
          return data[uf] > currentMax ? data[uf] : currentMax;
        }, 0);
        return max;
      } else {
        let max = 0;
        Object.keys(data).forEach(uf => {
          max += data[uf];
        });

        return max;
      }
    },
    generateAllLegends() {
      this.legends.proponentes = Helpers.generateLegend(
        this.maxValues.proponentes,
        Helpers.proponentIcons
      );
      this.legends.incentivadores = Helpers.generateLegend(
        this.maxValues.investors,
        Helpers.investorIcons
      );
      this.legends.heatMap = Helpers.generateLegend(this.maxValues.projects);
    },
    showPins() {
      console.log(this.filtersActivate)
      if (this.filtersActivate.incentivadores) {
        this.data.activeViz.investors =
          this.level == "UF" ? this.UF.investors : this.region.investors;
      } else {
        this.data.activeViz.investors = {};
      }

      if (this.filtersActivate.proponentes) {
        this.data.activeViz.proponents =
          this.level == "UF"
            ? this.data.UF.proponents
            : this.data.region.proponents;
      } else if (this.proponentMap) {
        console.log("PORRRAA")
        this.data.proponentesMap = this.data.UF.proponents;
      } else {
        this.data.activeViz.proponents = {};
      }
    }
  }
};
</script>
