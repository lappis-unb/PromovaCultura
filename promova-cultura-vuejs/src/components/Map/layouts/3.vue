<template>
    <!-- Desktop filtro fechado e legenda vertical
         Mobile filtro modal e legenda vertical -->
    <map-page
        :legendMobile="'card-vertical'"
        :filterMobile="'modal'"
        :legendDesktop="'card-vertical'"
        :filterDesktop="'collapsed'"
        :useMaxWithRanking=true
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
