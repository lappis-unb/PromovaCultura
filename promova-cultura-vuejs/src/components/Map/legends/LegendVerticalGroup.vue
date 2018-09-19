<template>
    <div>
        <div class="legend-item">
            <h3>Projetos</h3>
            <base-legend :dataLegend="legends.heatMap" :typeOfData="'projetos'" :filtersActivate="filtersActivate" />
        </div>
        <div class="legend-item" v-if="filtersActivate.proponentes">
            <h3>Proponentes</h3>
            <base-legend :dataLegend="legends.proponentes" :typeOfData="'proponentes'" :filtersActivate="filtersActivate" />
        </div>
        <div class="legend-item" v-if="filtersActivate.incentivadores">
            <h3>Incentivadores</h3>
            <base-legend :dataLegend="legends.incentivadores" :typeOfData="'incentivadores'" :filtersActivate="filtersActivate"/>
        </div>
    </div>
</template>

<script>
import Legend from "@/components/Map/legends/Legend";
export default {
    props: {
        legends: Object,
        filtersActivate: Object,
    },
    components: {
        "base-legend": Legend,
    },
};
</script>

<style scoped>
    .legend-item h3 {
        border: none;
        margin-bottom: 20px;
        font-size: 18px;
        display: block;
        border-bottom: 1px dotted #ddd;
        padding-bottom: 5px;
    }

    .legend-item {
        margin-bottom: 30px;
    }
</style>
