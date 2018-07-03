<template>
    <div class="card">
        <legend class="card-header">Legendas</legend>
        <div class="card-body">
            <legend-vertical-scroll-group :legends="legends" :filtersActivate="filtersActivate"/>
        </div>
    </div>
</template>

<script>
import LegendVerticalScrollGroup from "@/components/mapPrototype/legends/LegendVerticalScrollGroup";
export default {
    props: {
        legends: Object,
        filtersActivate: Object,
    },
    components: {
        "legend-vertical-scroll-group": LegendVerticalScrollGroup, 
    },
};
</script>

<style scoped>
    .card-header {
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
    }
</style>