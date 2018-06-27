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
            <brazil-map :projects="data.projects" :proponentes="data.proponentes" :incentivadores="data.incentivadores" :legends="legends" :maxValues="maxValues" :level="level" />
        </div>
        <div class="col-md-4 offset-md-1">
            <div class="d-none d-md-block">
                <collapsed-filters @updatedSegment="updateSegment" @showProponentes="showProponentes" @showIncentivadores="showIncentivadores" @changeLevel="changeLevel" />
                <legend-card-vertical-scroll-group :legends="legends" />
            </div>
        </div>
        <modal-filters @updatedSegment="updateSegment" @showProponentes="showProponentes" @showIncentivadores="showIncentivadores" @changeLevel="changeLevel" />
        <legend-modal :legends="legends"/>
    </div>
</div>
</template>

<script>
import BrazilMap from "@/components/mapPrototype/Map";
import CollapsedFilter from "@/components/mapPrototype/filters/CollapsedFilter"
import ModalFilters from "@/components/mapPrototype/filters/ModalFilters"
import LegendModal from "@/components/mapPrototype/legends/LegendModal"
import LegendCardVerticalScrollGroup from "@/components/mapPrototype/legends/LegendCardVerticalScrollGroup"

export default {
    props:{
        legends: Object,
        data: Object,
        level: String,
        maxValues: Object,
    },
    components: {
    "brazil-map": BrazilMap,
    "modal-filters": ModalFilters,
    "legend-modal": LegendModal,
    "collapsed-filters": CollapsedFilter,
    "legend-card-vertical-scroll-group": LegendCardVerticalScrollGroup,
  },
  methods: {
    updateSegment: function(selected){
      this.$emit('updatedSegment', selected)
    },
   showProponentes: function(proponentesIsActivated){
      this.$emit('showProponentes', proponentesIsActivated)
    },
    showIncentivadores: function(incentivadoresIsActivated){
      this.$emit('showIncentivadores', incentivadoresIsActivated)
    },
    changeLevel: function(level){
      this.$emit('changeLevel', level);
    }
  }
}
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