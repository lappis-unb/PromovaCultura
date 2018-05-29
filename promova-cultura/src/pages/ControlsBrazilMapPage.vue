<template>
    <div class="row">
        <!--<div class="col-md-4">-->
        <controls-filter-map/>
        <!--</div>-->
    </div>
</template>

<script>
import ControlsFilterBrazilMap from '@/components/ControlsFilterBrazilMap'

export default {
    name: "ControlFilterBrazilMap",
    components: {
        'controls-filter-map': ControlsFilterBrazilMap,
    }
}

</script>
