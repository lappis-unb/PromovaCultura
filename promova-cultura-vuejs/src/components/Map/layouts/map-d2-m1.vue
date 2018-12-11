<template>
  <div class="container">
    <div class="row">
      <div class="col-12" style="text-align:center; margin-bottom: 50px; color:#666;">
        <h1 v-if="proponentMap">Captação de recurso por UF desde 1992</h1>
        <h1 v-else>Mapa de Calor da Cultura</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-7">
        <div class="modal-button-group">
          <button type="button" id="modal-button-filter" class="btn btn-sm btn-default" data-toggle="modal"
                  data-target="#modal-filter"
                  v-if="filterMobile=='modal' || filterDesktop=='modal'">
            <i class="fas fa-filter"></i>
          </button>
          <button type="button" id="modal-button-legend" class="btn btn-sm btn-default" data-toggle="modal"
                  data-target="#modal-legend"
                  v-if="legendMobile=='modal' || legendDesktop=='modal'">
            <i class="fas fa-list"></i>
          </button>
        </div>
        <div class="map">
          <location-info
            v-if="!proponentMap"
            :showOn="locationInfoShowOn"
            :projects="data.projects"
            :proponents="data.proponentes"
            :incentivators="data.incentivadores"
            :segment="segment"
          />
          <proponent-info
            v-if="proponentMap"
            :showOn="locationInfoShowOn"
            :segment="segment"
            :proponentMap=proponentMap
            :data="data"
          />
          <brazil-map
            :projects="data.projects"
            :proponentes="data.proponentes"
            :incentivadores="data.incentivadores"
            :legends="legends"
            :maxValues="maxValues"
            :level="level"
            :proponentMap=proponentMap
          />
        </div>
      </div>
      <div class="col-lg-4 offset-lg-1">
        <div class="d-none d-lg-block"> <!-- Shows in desktop Hides in mobile platform -->
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
            v-if="legendDesktop=='card-vertical-scroll'"
            :filtersActivate="filtersActivate"/>
          <legend-card-vertical-group
            :legends="legends"
            v-if="legendDesktop=='card-vertical'"
            :filtersActivate="filtersActivate"/>
          <legend-tab
            :legends="legends"
            :proponentMap=proponentMap
            v-if="legendMobile!='tab' && legendDesktop=='tab'"
            :filtersActivate="filtersActivate"/>
          <totals-card
            :data="data"
            :legends="legends"
            :proponentMap="proponentMap"
            :filtersActivate="filtersActivate"
            v-if="proponentMap"
          />
          <vue-csv-downloader v-if="proponentMap"
                              :data="data.csv"
                              :fields="data.fields" class="btn btn-success csv-button">
            Exportar Dados
          </vue-csv-downloader>
        </div>
        <div class="d-lg-none"> <!-- Shows in mobile Hides in desktop platform -->
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
            v-if="legendMobile=='card-vertical-scroll'"
            :filtersActivate="filtersActivate"/>
          <legend-card-vertical-group
            :legends="legends"
            v-if="legendMobile=='card-vertical'"
            :filtersActivate="filtersActivate"/>
          <legend-tab
            :legends="legends"
            :filtersActivate="filtersActivate"
            v-if="legendMobile=='tab' && legendDesktop!='tab'"/>
        </div>
        <legend-tab
          :legends="legends"
          v-if="legendMobile=='tab' && legendDesktop=='tab'"
          :filtersActivate="filtersActivate"/>
      </div>
      <modal-filters @updatedSegment="updateSegment" @showProponentes="showProponentes"
                     @showIncentivadores="showIncentivadores" @changeLevel="changeLevel"/>
      <legend-modal :legends="legends" :filtersActivate="filtersActivate"/>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="d-none d-lg-block"> <!-- Shows in desktop Hides in mobile platform -->
          <legend-horizontal :legends="legends" :filtersActivate="filtersActivate"
                             v-if="legendDesktop=='horizontal'"/>
        </div>
        <div class="d-lg-none"> <!-- Shows in mobile Hides in desktop platform -->
          <legend-horizontal :legends="legends" :filtersActivate="filtersActivate"
                             v-if="legendMobile=='horizontal'"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import BrazilMap from "@/components/Map/MapSwitch";
  import CardFilters from "@/components/Map/filters/CardFilters"
  import ModalFilters from "@/components/Map/filters/ModalFilters"
  import CollapsedFilters from "@/components/Map/filters/CollapsedFilter"

  import LegendModal from "@/components/Map/legends/LegendModal"
  import LegendCardVerticalGroup from "@/components/Map/legends/LegendCardVerticalGroup"
  import LegendCardVerticalScrollGroup from "@/components/Map/legends/LegendCardVerticalScrollGroup"
  import LegendTabGroup from "@/components/Map/legends/LegendTabGroup"
  import LegendHorizontalGroup from "@/components/Map/legends/LegendHorizontalGroup"

  import LocationInfo from "@/components/Map/info/LocationInfo"
  import ProponentInfo from "@/components/Map/info/ProponentBarCard"
  import TotalsCard from "@/components/Map/info/TotalsCard"
  import VueCsvDownloader from 'vue-csv-downloader';


  export default {
    props: {
      legends: Object,
      data: Object,
      level: String,
      maxValues: Object,
      legendDesktop: String,
      legendMobile: String,
      filterDesktop: String,
      filterMobile: String,
      filtersActivate: Object,
      locationInfoShowOn: String,
      segment: String,
      proponentMap: Boolean,
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
      "location-info": LocationInfo,
      "proponent-info": ProponentInfo,
      "totals-card": TotalsCard,
      VueCsvDownloader
    },
    methods: {
      updateSegment: function (selected) {
        this.$emit('updatedSegment', selected)
      },
      showProponentes: function (proponentesIsActivated) {
        this.$emit('showProponentes', proponentesIsActivated)
      },
      showIncentivadores: function (incentivadoresIsActivated) {
        this.$emit('showIncentivadores', incentivadoresIsActivated)
      },
      changeLevel: function (level) {
        this.$emit('changeLevel', level);
      },
    },
    mounted() {
      if (this.locationInfoShowOn == 'click')
        window.JSMaps.maps.brazil.config['disableTooltip'] = true;
    },
  }
</script>

<style>
  .active {
    font-weight: bold;
  }

  .active span {
    font-weight: normal;
  }

  .modal-button-group {
    float: right;
    margin-right: 10px;
  }

  .modal-button-group button {
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

  .csv-button {
    margin-top: 20px;
    margin-left: 30.64%;
  }

  .card {
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
  }

  /* Medium Devices, Desktops */

  @media only screen and (min-width: 992px) {
    #modal-button-filter {
      display: none;
    }

    #modal-button-legend {
      display: none;
    }

    .map {
      display: inline-block;
    }
  }

  /* Large Devices, Wide Screens */

  @media only screen and (min-width: 1200px) {
    .map {
      display: inline-block;
    }
  }
</style>
