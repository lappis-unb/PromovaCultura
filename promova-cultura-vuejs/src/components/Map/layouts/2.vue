<template>
    <!-- Desktop filtro aberto e legenda com scroll vertical
         Mobile filtro modal e legenda modal com scroll vertical -->
    <map-page
        :legendMobile="'modal'"
        :filterMobile="'modal'"
        :legendDesktop="'card-vertical-scroll'"
        :filterDesktop="'card'"
        :useMaxWithRanking=false
    />
</template>
<script>
import MapPage from "@/components/Map/MapPage"

export default {
    components: {
        "map-page": MapPage,
    }
}
</script>
