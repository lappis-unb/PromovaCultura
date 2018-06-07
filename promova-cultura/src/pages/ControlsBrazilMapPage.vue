<template>
    <div class="row">
        <div class="col-sm-6">
            <brazil-map/>
        </div>
        <div class="col-md-4">
            <controls-filter-map/>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import BrazilMap from '@/components/BrazilMapComponent'
import ControlsFilterBrazilMap from '@/components/ControlsFilterBrazilMap'
//import ControlsFilterBrazilMap from '@/components/ControlsFilterV2'

export default {
    name: "ControlFilterBrazilMap",
    components: {
        'controls-filter-map': ControlsFilterBrazilMap,
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
