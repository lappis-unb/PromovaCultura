<template>
    <!-- Desktop filtro aberto e legenda em abas
    Mobile filtro modal e legenda abaixo do funil na vertical -->
    <map-page
        :legendMobile="'card-vertical'"
        :filterMobile="'modal'"
        :legendDesktop="'tab'"
        :filterDesktop="'card'"
        :useMaxWithRanking=false
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
