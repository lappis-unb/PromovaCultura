<template>
  <div class="map-container">
    <div class="jsmaps-wrapper" id="brazil-map"/>
    <div style="display:none">{{projects}}</div>
    <div style="display:none">{{proponentes}}</div>
    <div style="display:none">{{incentivadores}}</div>
  </div>
</template>

<script>
import mapActions from "@/util/mapActions";

export default {
  props: {
    projects: Object,
    proponentes: Object,
    incentivadores: Object,
    legends: Object,
    maxValues: Object,
    jsMapsObject: Object,
    map: Object,
  },

  data() {
    return {
      maps: {},
      basePinData: {
        srcWidth: 40,
        srcHeight: 40,
        pinWidth: 40,
        pinHeight: 40
      }
    };
  },

  mounted() {
    mapActions.displayBrazilMap(this.map.name);
  },

  beforeUpdate() {
    mapActions.darkenAllMap(this.map);
    mapActions.makeHeatMap(this.map, this.projects, this.legends);

    mapActions.setProponentesPins(
      this.jsMapsObject,
      this.map,
      this.legends,
      this.basePinData,
      this.proponentes,
    );

    mapActions.setIncentivadoresPins(
      this.incentivadores,
      this.jsMapsObject,
      this.map,
      this.legends,
      this.basePinData,
    );
  }
};
</script>
