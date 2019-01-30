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
        projects: {},
        proponentes: {},
        proponentesMap: {},
        incentivadores: {},
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
        proponentes: 0,
        incentivadores: 0
      },
      legends: {
        heatMap: [],
        proponentes: [],
        incentivadores: []
      },
      tmp: {
        projectsUF: {},
        proponentesUF: {},
        incentivadoresUF: {},
        projectsRegion: {},
        proponentesRegion: {},
        incentivadoresRegion: {},
        raisedAmountUF: {},
        approvedAmountUF: {}
      },
      level: "UF",
      selected: "Todos os segmentos"
    };
  },
  watch: {
      proponentData:{
        handler(data){
            this.updateValues()
            this.updateChildrenProps();
        },
        deep:true,
      },
    tmp: {
      handler(data) {
        this.updateChildrenProps();
        this.generateLegends();
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
      if (this.level == "UF") {
        this.data.projects = this.tmp.projectsUF;
        this.maxValues.projects = this.getMaxByUF(
          this.tmp.projectsUF,
          "projects"
        );
        this.maxValues.proponentes = this.getMaxByUF(
          this.tmp.proponentesUF,
          "proponentes"
        );
        this.maxValues.incentivadores = this.getMaxByUF(
          this.tmp.incentivadoresUF,
          "incentivadores"
        );
      } else {
        this.data.projects = this.tmp.projectsRegion;
        this.maxValues.projects = this.getMaxByUF(
          this.tmp.projectsRegion,
          "projects"
        );
        this.maxValues.proponentes = this.getMaxByUF(
          this.tmp.proponentesRegion,
          "proponentes"
        );
        this.maxValues.incentivadores = this.getMaxByUF(
          this.tmp.incentivadoresRegion,
          "incentivadores"
        );
      }
      this.showPins();
    },
    updatedSegment(segment) {
      this.selected = segment;
      this.fetchAllResources();
      this.updateValues()
    },

    generateCSV: function() {
      // const object = this.data.approvedAmount;
      var values = [];
      for (const [key, value] of Object.entries(this.data.approvedAmount)) {
        values.push({
          UF: key,
          QuantidadeDeProponentes: this.tmp.proponentesUF[key],
          ValorAprovado: value,
          ValorCaptado: this.data.raisedAmount[key]
        });
      }

      this.data.csv = values;
    },
    async fetchAllResources() {
      if(!this.proponentMap) {
        console.log(`Fetching API.\nSEGMENT: ${this.selected}`);
        const data = await batchFetch(this.selected);
        // console.log("Data fetched: ", JSON.stringify(data));
        this.tmp.projectsUF = data.projetos_por_uf;
        this.tmp.proponentesUF = data.proponentes_por_uf;
        this.tmp.incentivadoresUF = data.incentivadores_por_uf;
        this.tmp.projectsRegion = data.projetos_por_regiao;
        this.tmp.proponentesRegion = data.proponentes_por_regiao;
        this.tmp.incentivadoresRegion = data.incentivadores_por_regiao;
      }
    },
      updateValues(){
          if (this.proponentMap) {
              this.tmp.proponentesUF = this.proponentData.proponents;
              this.data.approvedAmount = this.proponentData.approvedAmount;
              this.tmp.projectsUF = this.proponentData.raisedAmount;
              this.data.raisedAmount = this.proponentData.raisedAmount;

              this.data.totals = this.proponentData.totals;
              console.log(this.data)
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
      if (!this.proponentMap) {
        this.filtersActivate.proponentes = show;
        this.showPins();
      }
    },
    showIncentivadores(show) {
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
          if (data[uf] > currentMax) {
            return data[uf];
          } else {
            return currentMax;
          }
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
    generateLegends() {
      let imagesListP = [
        "@/../static/svg-icons/proponente_LVL_1.svg",
        "@/../static/svg-icons/proponente_LVL_2.svg",
        "@/../static/svg-icons/proponente_LVL_3.svg",
        "@/../static/svg-icons/proponente_LVL_4.svg",
        "@/../static/svg-icons/proponente_LVL_5.svg"
      ];
      let imagesListI = [
        "@/../static/svg-icons/Investidores_LVL_1.svg",
        "@/../static/svg-icons/Investidores_LVL_2.svg",
        "@/../static/svg-icons/Investidores_LVL_3.svg",
        "@/../static/svg-icons/Investidores_LVL_4.svg",
        "@/../static/svg-icons/Investidores_LVL_5.svg"
      ];
      this.legends.proponentes = this.getMapLegend(
        this.maxValues.proponentes,
        [0, 5, 10, 20, 100],
        imagesListP,
        true
      );
      this.legends.incentivadores = this.getMapLegend(
        this.maxValues.incentivadores,
        [0, 5, 10, 20, 100],
        imagesListI,
        true
      );
      this.legends.heatMap = this.getMapLegend(this.maxValues.projects);
    },
    getMapLegend(maxValue, percentList = [], colorList = [], isImage = false) {
      let legends = [];
      let percents =
        percentList.length == 0 ? [0, 0, 0.12, 1.4, 10.2, 20.3, 100] : percentList;
      let colors =
        colorList.length == 0
          ? [
              "#dadada",
              "#75CC75",
              "#3AA53A",
              "#1F661F",
              "#1A3D1A",
              "#0B230B"
            ]
          : colorList;

      let min = 0;
      let max = 0;

      for (let i = 0; i < percents.length - 1; i++) {
        let colorBackground = colors[i];

        min = max == 0 ? 0 : max + 1;
        max = parseInt((percents[i + 1] / 100) * maxValue);
        legends[i] = {
          image: isImage,
          color: colorBackground,
          min: max != 0 && min == 0 ? 1 : min,
          max: max
        };
      }
      return legends;
    },

    showPins() {
      if (this.filtersActivate.incentivadores) {
        this.data.incentivadores =
          this.level == "UF"
            ? this.tmp.incentivadoresUF
            : this.tmp.incentivadoresRegion;
      } else {
        this.data.incentivadores = {};
      }

      if (this.filtersActivate.proponentes) {
        this.data.proponentes =
          this.level == "UF"
            ? this.tmp.proponentesUF
            : this.tmp.proponentesRegion;
      } else if (this.proponentMap) {
        this.data.proponentesMap = this.tmp.proponentesUF;
      } else {
        this.data.proponentes = {};
      }
    }
  }
};
</script>
