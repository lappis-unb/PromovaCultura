<template>
    <div class="row">
        <div class="col-sm-6">
            <brazil-map />
        </div>
        <div class="col-md-4">
            <natural-filter-language/>
        </div>
    </div>
</template>

<script>
import NaturalLanguageFilter from '@/components/NaturalLanguageFilter/NaturalLanguageFilter'
import BrazilMap from '@/components/ActionMap/BrazilMapComponent'
import $ from "jquery";

export default {
    name: "NaturalLanguageFilter",
    components: {
        'natural-filter-language': NaturalLanguageFilter,
        'brazil-map': BrazilMap
    },
    mounted: function () {
        var self = this;
        // $("#brazil-map").JSMaps({
        //     map: "brazil",
        //     stateClickAction: "none",
        //     onStateClick: function(data) {
        //     },
        // })
    }
}

</script>
