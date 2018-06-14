<template>
<div class="container">
  <div class="row">
    <div class="col-md-7">
      <div class="modal-button-group">
        <button type="button" id="modal-button-filter" class="btn btn-sm btn-default" data-toggle="modal" data-target="#modal-filter">
          <i class="fas fa-filter"></i>
        </button>

        <button type="button" id="modal-button-legend" class="btn btn-sm btn-default" data-toggle="modal" data-target="#modal-legend">
          <i class="fas fa-list"></i>
        </button>
      </div>
      <brazil-map
          :projects="data.projects"
          :proponentes="data.proponentes"
          :incentivadores="data.incentivadores"
          :legends="legends"
          :maxValues="maxValues"
          :level="level"
      />
    </div>
    <div class="col-md-4 offset-md-1">
      <div class="d-none d-md-block">
        <collapsed-filters
          @updatedSegment="updatedSegment"
          @showProponentes="showProponentes"
          @showIncentivadores="showIncentivadores"
          @changeLevel="changeLevel"
        />
      </div>
      <!-- <legend-tab-group :legends="legends" class="desktop" /> -->
      <legend-vertical-scroll-group :legends="legends"/>
    </div>
    <modal-filters
      @updatedSegment="updatedSegment"
      @showProponentes="showProponentes"
      @showIncentivadores="showIncentivadores"
      @changeLevel="changeLevel"
    />
    <legend-modal :legends="legends"/>
  </div>
  <!-- <div class="row">
    <legend-horizontal-group :legends="legends" class="d-none d-md-block col-md-12" />
  </div> -->
</div>
</template>

<script>
//import BrazilMapUf from "@/mapPrototype/MapUf";
//import BrazilMapRegion from "@/mapPrototype/MapRegion";
import BrazilMap from "@/components/mapPrototype/Map";
import CardFilters from "@/components/mapPrototype/filters/CardFilters"
import CollapsedFilter from "@/components/mapPrototype/filters/CollapsedFilter"
import ModalFilters from "@/components/mapPrototype/filters/ModalFilters"
import LegendModal from "@/components/mapPrototype/legends/LegendModal"
import LegendTabGroup from "@/components/mapPrototype/legends/LegendTabGroup"
import LegendVerticalGroup from "@/components/mapPrototype/legends/LegendVerticalGroup"
import LegendVerticalScrollGroup from "@/components/mapPrototype/legends/LegendVerticalScrollGroup"
import LegendHorizontalGroup from "@/components/mapPrototype/legends/LegendHorizontalGroup"

import fetchResource from "@/util/apiComunication.js";

export default {
  name: "ControlFilterBrazilMap",
  components: {
    "brazil-map": BrazilMap,
    "card-filters": CardFilters,
    "modal-filters": ModalFilters,
    "legend-modal": LegendModal,
    "collapsed-filters": CollapsedFilter,
    "legend-tab-group": LegendTabGroup,
    "legend-vertical-group": LegendVerticalGroup,
    "legend-vertical-scroll-group": LegendVerticalScrollGroup,
    "legend-horizontal-group": LegendHorizontalGroup,
  },
  data() {
    return {
      data: {
        projects: {},
        proponentes: {},
        incentivadores: {},
      },
      maxValues: {
        projects: 0,
        proponentes: 0,
        incentivadores: 0,
      },
      legends: {
        heatMap: [],
        proponentes: [],
        incentivadores: [],
      },
      tmp: {
        projects: {},
        proponentes: {},
        incentivadores: {},
      },
      level: 'UF'
    };
  },
  watch:{
    tmp: {
        handler(data){
          this.data.projects = this.tmp.projects;
          this.maxValues.projects=this.getMaxByUF(this.tmp.projects, "projects");
          this.maxValues.proponentes=this.getMaxByUF(this.tmp.proponentes, "proponentes");
          this.maxValues.incentivadores=this.getMaxByUF(this.tmp.incentivadores, "incentivadores");
          this.generateLegends();
          if(Object.keys(this.data.incentivadores).length!=0){
            this.data.incentivadores  = this.tmp.incentivadores;
          }
          if(Object.keys(this.data.proponentes).length!=0){
            this.data.proponentes  = this.tmp.proponentes;
          }
        },
        deep: true
    },
    level() {
     console.log("watch level " + this.level)
    },
  },
  mounted() {
    this.fetchAllResources();
  },
  methods: {
    updatedSegment(segment){
      this.selected = segment;
      this.fetchAllResources();
    },
    fetchAllResources(){
      fetchResource("projetos_por_uf", this.tmp, this.selected);
      fetchResource("proponentes_por_uf", this.tmp, this.selected);
      fetchResource("incentivadores_por_uf", this.tmp, this.selected);
    },
    showProponentes(show){
      if (show) {
        this.data.proponentes=this.tmp.proponentes;
      } else {
        this.data.proponentes = {};
      }
    },
    showIncentivadores(show){
      if (show) {
        this.data.incentivadores=this.tmp.incentivadores;
      } else {
        this.data.incentivadores = {};
      }
    },
    changeLevel(level){
      this.level = level
      if(level == "UF"){
        fetchResource("projetos_por_uf", this.tmp, this.selected);
        fetchResource("proponentes_por_uf", this.tmp, this.selected);
        fetchResource("incentivadores_por_uf", this.tmp, this.selected);
      }else{
        fetchResource("projetos_por_regiao", this.tmp, this.selected);
        fetchResource("proponentes_por_regiao", this.tmp, this.selected);
        fetchResource("incentivadores_por_regiao", this.tmp, this.selected);
      }
    },
    getMaxByUF(data, type) {
      const ufList = Object.keys(data);

      const max = ufList.reduce((currentMax, uf) => {
        if (data[uf] > currentMax) {
          return data[uf];
        } else {
          return currentMax;
        }
      }, 0);

      return max;
    },
    generateLegends(){
      let imagesListP = [
        '@/../static/svg-icons/proponente_LVL_1.svg',
        '@/../static/svg-icons/proponente_LVL_2.svg',
        '@/../static/svg-icons/proponente_LVL_3.svg',
        '@/../static/svg-icons/proponente_LVL_4.svg',
        '@/../static/svg-icons/proponente_LVL_5.svg'
      ]
      let imagesListI = [
        '@/../static/svg-icons/Investidores_LVL_1.svg',
        '@/../static/svg-icons/Investidores_LVL_2.svg',
        '@/../static/svg-icons/Investidores_LVL_3.svg',
        '@/../static/svg-icons/Investidores_LVL_4.svg',
        '@/../static/svg-icons/Investidores_LVL_5.svg'
      ]
      this.legends.proponentes = this.getMapLegend(this.maxValues.proponentes, [0,10,20,40,80,100], imagesListP, true);
      this.legends.incentivadores = this.getMapLegend(this.maxValues.incentivadores, [0,10,20,40,80,100], imagesListI, true);
      this.legends.heatMap = this.getMapLegend(this.maxValues.projects);

    },
    getMapLegend(maxValue, percentList=[], colorList=[], isImage=false){
        let legends = []
        //let percents = percentList.length == 0 ? [0,0,7,25,60,100] : percentList;
        let percents = percentList.length == 0 ? [0,0,3,7,25,60,80,100] : percentList;
        //let colors = colorList.length == 0 ? ["#efe8c6","#daf39d","#b8e844", "#8db824", "#66861a"] : colorList;
        let colors = colorList.length == 0 ? ["#efe8c6","#daf39d","#b8e844", "#8db824", "#66861a", "#4d6513", "#2c380e"] : colorList;

        for(let i = 0; i < percents.length-1; i++){
          let colorBackground = colors[i];
          legends[i] = {
            image: isImage,
            color: colorBackground,
            min: parseInt((percents[i]/100)*maxValue),
            max: parseInt((percents[i+1]/100)*maxValue),
          };
        }
        return legends;
    },
  },
};
</script>

<style>
.modal-button-group{
  float: right;
  margin-right: 10px;
}
.modal-button-group button{
  margin-bottom: 10px;
  display: block;
  z-index: 100;
  width: 40px;
  height: 40px;
}

.modal-button-group button,
.modal-button-group button:hover {
  background: #eee;
}

.modal-button-group button i {
  font-size: 16px;
  position: relative;
  top: 3px;
}

.card{
  margin-bottom: 30px;  
}

/* Really small screen */
@media only screen and (min-width: 220px) {
  .map-container {
    display: flex;
    margin-bottom: 30px;
  }  
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
  #modal-button-legend {
    display: none;
  }
}
/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) { 
}
/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}

</style>