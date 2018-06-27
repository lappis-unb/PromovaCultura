<template>
<div class="container">
    <div class="row">
        <div class="col-md-7">
            <div class="modal-button-group">
                <button type="button" id="modal-button-filter" class="btn btn-sm btn-default" data-toggle="modal" data-target="#modal-filter"
                  v-if="filterMobile=='modal' || filterDesktop=='modal'">
                    <i class="fas fa-filter"></i>
                </button>
                <button type="button" id="modal-button-legend" class="btn btn-sm btn-default" data-toggle="modal" data-target="#modal-legend"
                v-if="legendMobile=='modal' || legendDesktop=='modal'">
                    <i class="fas fa-list"></i>
                </button>
            </div>
            <brazil-map :projects="data.projects" :proponentes="data.proponentes" :incentivadores="data.incentivadores" :legends="legends" :maxValues="maxValues" :level="level" />
        </div>
        <div class="col-md-4 offset-md-1">
            <div class="d-none d-md-block"> <!-- Shows in desktop Hides in mobile platform -->
              <card-filters 
                @updatedSegment="updateSegment"
                @showProponentes="showProponentes"
                @showIncentivadores="showIncentivadores"
                @changeLevel="changeLevel"
                v-if="filterDesktop=='card'"/>
              <collapsed-filters 
                @updatedSegment="updateSegment"
                @showProponentes="showProponentes"
                @showIncentivadores="showIncentivadores"
                @changeLevel="changeLevel"
                v-if="filterDesktop=='collapsed'"/>
              
              <legend-card-vertical-scroll-group
                :legends="legends" 
                v-if="legendDesktop=='card-vertical-scroll'"/>
              <legend-card-vertical-group
                :legends="legends"
                v-if="legendDesktop=='card-vertical'"/>
              <legend-tab 
                :legends="legends"
                v-if="legendDesktop=='tab'"/>
            </div>
            <div class="d-md-none"> <!-- Shows in mobile Hides in desktop platform -->
              <card-filters 
                @updatedSegment="updateSegment"
                @showProponentes="showProponentes"
                @showIncentivadores="showIncentivadores"
                @changeLevel="changeLevel"
                v-if="filterMobile=='card'"/>
              <collapsed-filters 
                @updatedSegment="updateSegment"
                @showProponentes="showProponentes"
                @showIncentivadores="showIncentivadores"
                @changeLevel="changeLevel"
                v-if="filterMobile=='collapsed'"/>
              
              <legend-card-vertical-scroll-group
                :legends="legends" 
                v-if="legendMobile=='card-vertical-scroll'"/>
              <legend-card-vertical-group
                :legends="legends"
                v-if="legendMobile=='card-vertical'"/>
              <legend-tab 
                :legends="legends"
                v-if="legendMobile=='tab'"/>
            </div>
        </div>
        <modal-filters @updatedSegment="updateSegment" @showProponentes="showProponentes" @showIncentivadores="showIncentivadores" @changeLevel="changeLevel" />
        <legend-modal :legends="legends"/>
    </div>
    <div class="row">
        <div class="col-md-12">
            <legend-horizontal :legends="legends"
            v-if="legendMobile=='tab' || legendDesktop=='horizontal'"/>
        </div>
    </div>
</div>
</template>

<script>
import BrazilMap from "@/components/mapPrototype/Map";
import CardFilters from "@/components/mapPrototype/filters/CardFilters"
import ModalFilters from "@/components/mapPrototype/filters/ModalFilters"
import CollapsedFilters from "@/components/mapPrototype/filters/CollapsedFilter"

import LegendModal from "@/components/mapPrototype/legends/LegendModal"
import LegendCardVerticalGroup from "@/components/mapPrototype/legends/LegendCardVerticalGroup"
import LegendCardVerticalScrollGroup from "@/components/mapPrototype/legends/LegendCardVerticalScrollGroup"
import LegendTabGroup from "@/components/mapPrototype/legends/LegendTabGroup"
import LegendHorizontalGroup from "@/components/mapPrototype/legends/LegendHorizontalGroup"

export default {
  props:{
      legends: Object,
      data: Object,
      level: String,
      maxValues: Object,
      legendDesktop: String,
      legendMobile: String,
      filterDesktop: String,
      filterMobile: String,
  },
  components: {
    "brazil-map": BrazilMap,
    "card-filters": CardFilters,
    "modal-filters": ModalFilters,
    "collapsed-filters": CollapsedFilters,
    "legend-modal": LegendModal,
    "legend-horizontal": LegendHorizontalGroup,
    "legend-tab": LegendTabGroup,
    "legend-card-vertical-scroll-group": LegendCardVerticalScrollGroup,
    "legend-card-vertical-group": LegendCardVerticalGroup,
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