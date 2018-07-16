<template>
    <div class="card">
        <legend class="card-header">Legendas</legend>
        <div class="card-body">
            <legend-vertical-group :legends="legends" :filtersActivate="filtersActivate"/>
        </div>
    </div>
</template>

<script>
import LegendVerticalGroup from "@/components/mapPrototype/legends/LegendVerticalGroup";
export default {
    props: {
        legends: Object,
        filtersActivate: Object,
    },
    components: {
        "legend-vertical-group": LegendVerticalGroup,
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