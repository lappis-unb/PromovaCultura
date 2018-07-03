<template>
    <div class="legend-group-scroll">
        <legend-vertical-group :legends="legends" :filtersActivate="filtersActivate"/>
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
    .legend-group-scroll {
        overflow: scroll;
        overflow-x: hidden;
        /* min-height: 500px; */
    }

    /* Small Devices, Tablets */
    @media only screen and (min-width: 768px) {
        .legend-group-scroll {
            height: 230px;
        }
    }
    /* Really small screen */
    @media only screen and (min-width: 220px) {
        .legend-group-scroll{
            height: 76vh;
        }  
    }
</style>