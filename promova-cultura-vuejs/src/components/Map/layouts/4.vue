<template>
    <!-- Desktop filtro aberto e legenda horizontal
         Mobile filtro modal e legenda modal com scroll vertical -->
    <map-page
        :legendMobile="'modal'"
        :filterMobile="'modal'"
        :legendDesktop="'horizontal'"
        :filterDesktop="'card'"
        :useMaxWithRanking=true
        locationInfoShowOn="hover"
    />
</template>
<script>
import MapPage from "@/pages/MapPage"

export default {
    components: {
        "map-page": MapPage,
    }
}
</script>
