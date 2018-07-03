<template>
    <div class="container">
        <link href="../../static/jsmaps/jsmaps.css" rel="stylesheet" type="text/css" />
        <div class="row">
            <div class="col-sm-6">
                <div id="brazil-map">
                </div>
            </div>
            <div class="col-sm-4">
                <natural-filter-language/>
            </div>
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
        $("#brazil-map").JSMaps({
            map: "brazil",
            stateClickAction: "none",
            onStateClick: function(data) {
            },
        })
    }
}

</script>
