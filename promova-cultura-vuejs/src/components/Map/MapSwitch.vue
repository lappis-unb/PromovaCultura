<template>
  <!-- <div class="map-container"> -->
  <div>
    <brazil-map
        :projects="projects"
        :proponentes="proponentes"
        :incentivadores="incentivadores"
        :legends="legends"
        :map="this.maps.brazil"
        :jsMapsObject="this.maps"
        v-if="level=='UF'"
    />
    <brazil-map
        :projects="projects"
        :proponentes="proponentes"
        :incentivadores="incentivadores"
        :legends="legends"
        :map="this.maps.brazil_region"
        :jsMapsObject="this.maps"
        v-else
    />
  </div>
</template>

<script>
import BrazilMap from "@/components/Map/MapComponent";
import "@/../src/static/jsmaps/brazil_region.js";
import "@/../src/static/jsmaps/brazil.js";

export default {
  props: {
    projects: Object,
    proponentes: Object,
    incentivadores: Object,
    legends: Object,
    level: String
  },
  data() {
    return {
      maps: { ...window.JSMaps.maps }
    }
  },
  components: {
    "brazil-map": BrazilMap,
  },
};
</script>
<style scoped>
 /* .map-container{
   margin-bottom: 30px;
 } */
</style>
