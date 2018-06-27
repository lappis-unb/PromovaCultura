<template>
  <div class="row">
    <!-- <div class="col-md-7">
      <button type="button" id="modal-button-filter" class="btn btn-sm btn-default" data-toggle="modal" data-target="#modal-filter">
        <i class="fas fa-filter"></i> Filtrar
      </button>
      <brazil-map
          :projects="data.projects"
          :proponentes="data.proponentes"
          :incentivadores="data.incentivadores"
          :legends="legends"
          :maxValues="maxValues"
      />
    </div>
    <div class="col-md-5">
      <legend-tab-group :legends="legends" />
    </div>
    <div class="col-md-5">
      <legend-vertical-group :legends="legends" />
    </div>
    <div class="col-md-4 offset-md-1" id="desktop-filters">
      <filters
        @updatedSegment="updatedSegment"
        @showProponentes="showProponentes"
        @showIncentivadores="showIncentivadores"
      />
    </div>
    <modal-filters
      @updatedSegment="updatedSegment"
      @showProponentes="showProponentes"
      @showIncentivadores="showIncentivadores"
    /> -->
  </div>
</template>

<script>
// import BrazilMap from "@/components/mapPrototype/Map";
// import Filters from "@/components/mapPrototype/filters/Filters"
// import ModalFilters from "@/components/mapPrototype/filters/ModalFilters"
// import LegendTabGroup from "@/components/mapPrototype/legends/LegendTabGroup"
// import LegendVerticalGroup from "@/components/mapPrototype/legends/LegendVerticalGroup"
// import fetchResource from '@/util/apiComunication.js';

// export default {
//   name: "ControlFilterBrazilMap",
//   components: {
//     //"controls-filter-map": ControlsFilterBrazilMap,
//     "brazil-map": BrazilMap,
//     "filters": Filters,
//     "modal-filters": ModalFilters,
//     "legend-tab-group": LegendTabGroup,
//     "legend-vertical-group": LegendVerticalGroup,
//   },
//   data() {
//     return {
//       data: {
//         projects: {},
//         proponentes: {},
//         incentivadores: {},
//       },
//       maxValues: {
//         projects: 0,
//         proponentes: 0,
//         incentivadores: 0,
//       },
//       legends: {
//         heatMap: [],
//         proponentes: [],
//         incentivadores: [],
//       },
//       tmp: {
//         proponentes: {},
//         incentivadores: {}
//       }
//     };
//   },
//   watch:{
//     tmp: {
//         handler(data){
//           this.data.projects = this.tmp.projects;
//           this.maxValues.projects=this.getMaxByUF(this.tmp.projects, "projects");
//           this.maxValues.proponentes=this.getMaxByUF(this.tmp.proponentes, "proponentes");
//           this.maxValues.incentivadores=this.getMaxByUF(this.tmp.incentivadores, "incentivadores");
//           this.generatelegends();
//         },
//         deep: true
//     },
//   },
//   mounted() {
//     fetchResource("projetos_por_uf", this.tmp, this.selected);
//     fetchResource("incentivadores_por_uf", this.tmp, this.selected);
//     fetchResource("proponentes_por_uf", this.tmp, this.selected);
//   },
//   methods: {
//     updatedSegment(segment){
//       this.selected = segment;
//       fetchResource("projetos_por_uf", this.tmp, this.selected);
//       fetchResource("proponentes_por_uf", this.tmp, this.selected);
//       fetchResource("incentivadores_por_uf", this.tmp, this.selected);
//     },
//     showProponentes(show){
//       if (show) {
//         this.data.proponentes=this.tmp.proponentes;
//       } else {
//         this.data.proponentes = {};
//       }
//     },
//     showIncentivadores(show){
//       if (show) {
//         this.data.incentivadores=this.tmp.incentivadores;
//       } else {
//         this.data.incentivadores = {};
//       }
//     },
//     getMaxByUF(data, type) {
//       /*const ufList = Object.keys(data);

//       const max = ufList.reduce((currentMax, uf) => {
//         if (data[uf] > currentMax) {
//           return data[uf];
//         } else {
//           return currentMax;
//         }
//       }, 0);

//       return max;*/
//       let max = 0;

//       Object.keys(data).forEach(uf => {
//         max += data[uf];
//       });

//       /*if (type == "proponentes") {
//         console.log(`TOTAL: ${max}`);

//         Object.keys(data).forEach(uf => {
//           console.log(`${uf}: ${data[uf]/max * 100}`);
//         });
//       }*/

//       return max;
//     },
//     generatelegends(){
//       let imagesListP = [
//         '@/../static/svg-icons/proponente_LVL_1.svg',
//         '@/../static/svg-icons/proponente_LVL_2.svg',
//         '@/../static/svg-icons/proponente_LVL_3.svg',
//         '@/../static/svg-icons/proponente_LVL_4.svg',
//         '@/../static/svg-icons/proponente_LVL_5.svg'
//       ]
//       let imagesListI = [
//         '@/../static/svg-icons/Investidores_LVL_1.svg',
//         '@/../static/svg-icons/Investidores_LVL_2.svg',
//         '@/../static/svg-icons/Investidores_LVL_3.svg',
//         '@/../static/svg-icons/Investidores_LVL_4.svg',
//         '@/../static/svg-icons/Investidores_LVL_5.svg'
//       ]
//       this.legends.proponentes = this.getMaplegend(this.maxValues.proponentes, [0,5,10,20,35,100], imagesListP, true);
//       this.legends.incentivadores = this.getMaplegend(this.maxValues.incentivadores, [0,5,10,20,35,100], imagesListI, true);
//       this.legends.heatMap = this.getMaplegend(this.maxValues.projects);
//     },
//     getMaplegend(maxValue, percentList=[], colorList=[], isImage=false){
//         let legends = []
//         let percents = percentList.length == 0 ? [0,0,1,5,10,20,35,100] : percentList;
//         let colors = colorList.length == 0 ? ["#efe8c6","#daf39d","#b8e844", "#8db824", "#66861a", "#4d6513", "#2c380e"] : colorList;

//         for(let i = 0; i < percents.length-1; i++){
//           let colorBackground = colors[i];
//           legends[i] = {
//             image: isImage,
//             color: colorBackground,
//             min: parseInt((percents[i]/100)*maxValue),
//             max: parseInt((percents[i+1]/100)*maxValue),
//           };
//         }
//         return legends;
//     },
//   },
// };
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
.content-legend {
  padding: 20px;
}
.content-legend p {
  margin-bottom: 10px;
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
