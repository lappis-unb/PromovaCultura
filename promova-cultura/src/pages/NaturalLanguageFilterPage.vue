<template>
    <div class="row">
        <!--<div class="col-md-4">-->
        <natural-filter-language/>
        <!--</div>-->
    </div>
</template>

<script>
import NaturalLanguageFilter from '@/components/NaturalLanguageFilter'
import BrazilMap from '@/pages/BrazilMap.vue'

export default {
    name: "NaturalLanguageFilter",
    components: {
        'natural-filter-language': NaturalLanguageFilter,
        'brazil-map': BrazilMap
    }
}

</script>
