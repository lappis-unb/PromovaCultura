<template>
  <!-- <div class="map-container"> -->
  <div>
    <brazil-map-uf
        :projects="projects"
        :proponentes="proponentes"
        :incentivadores="incentivadores"
        :legends="legends"
        :maxValues="maxValues"
        v-if="level=='UF'"
    />
    <brazil-map-region
        :projects="projects"
        :proponentes="proponentes"
        :incentivadores="incentivadores"
        :legends="legends"
        :maxValues="maxValues"
        v-if="level=='Região'"
    />
  </div>
</template>

<script>
import BrazilMapUf from "@/components/mapPrototype/MapUf";
import BrazilMapRegion from "@/components/mapPrototype/MapRegion";

export default {
  props: {
    projects: Object,
    proponentes: Object,
    incentivadores: Object,
    legends: Object,
    maxValues: Object,
    level: String
  },
  components: {
    "brazil-map-region": BrazilMapRegion,
    "brazil-map-uf": BrazilMapUf,
  },
};
</script>
<style scoped>
 /* .map-container{
   margin-bottom: 30px;
 } */
</style>
