<template>
  <layout-d2-m1
    :data="data"
    :legends="legends"
    :maxValues="maxValues"
    :level="level"
    @updatedSegment="updatedSegment"
    @showProponentes="showProponentes"
    @showIncentivadores="showIncentivadores"
    @changeLevel="changeLevel"

    :legendMobile="legendMobile"
    :filterMobile="filterMobile"
    :legendDesktop="legendDesktop"
    :filterDesktop="filterDesktop"
 />
</template>

<script>
import fetchResource from "@/util/apiComunication.js";
import Mapd2m1 from "@/components/mapPrototype/layouts/map-d2-m1"

export default {
  name: "ControlFilterBrazilMap",
  components: {
    "layout-d2-m1": Mapd2m1,
  },
  props: {
    legendMobile: String,
    filterMobile: String,
    legendDesktop: String,
    filterDesktop: String,
    useMaxWithRanking: Boolean,
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
      if(this.useMaxWithRanking){
        const max = ufList.reduce((currentMax, uf) => {
          if (data[uf] > currentMax) {
            return data[uf];
          } else {
            return currentMax;
          }
        }, 0);
        return max;
      } else{
        let max = 0;
        Object.keys(data).forEach(uf => {
          max += data[uf];
        });
        return max;
      }
      
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
      this.legends.proponentes = this.getMapLegend(this.maxValues.proponentes, [0,5,10,20,35,100], imagesListP, true);
      this.legends.incentivadores = this.getMapLegend(this.maxValues.incentivadores, [0,5,10,20,35,100], imagesListI, true);
      this.legends.heatMap = this.getMapLegend(this.maxValues.projects);
    },
    getMapLegend(maxValue, percentList=[], colorList=[], isImage=false){
        let legends = []
        let percents = percentList.length == 0 ? [0,0,1,5,10,20,35,100] : percentList;
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