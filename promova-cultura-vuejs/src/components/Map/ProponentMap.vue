<template>
    <!-- Desktop filtro aberto e legenda horizontal
         Mobile filtro modal e legenda modal com scroll vertical -->
    <map-page
        :proponentMap=true
        :legendMobile="'tab'"
        :legendDesktop="'tab'"
        :useMaxWithRanking=false
        locationInfoShowOn="hover"
    />
</template>
<script>
import MapPage from "@/pages/MapPage";

export default {
  components: {
    "map-page": MapPage
  }
};
</script>
