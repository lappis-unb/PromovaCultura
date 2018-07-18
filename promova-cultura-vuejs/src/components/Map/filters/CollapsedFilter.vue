<template>
    <div id="accordion">
        <div class="card">
            <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Filtrar
                    </a>
                </h5>
            </div>
            <div id="collapseOne" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <filters
                        @updatedSegment="updateSegment"
                        @showProponentes="changeValueProponente"
                        @showIncentivadores="changeValueIncentivadores"
                        @changeLevel="changeLevel"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Filters from "@/components/Map/filters/Filters"

export default {
    components: {
        "filters": Filters,
    },
    methods: {
        updateSegment: function(selected){
            this.$emit('updatedSegment', selected)
        },
        changeValueProponente: function(proponentesIsActivated){
            this.$emit('showProponentes', proponentesIsActivated)
        },
        changeValueIncentivadores: function(incentivadoresIsActivated){
            this.$emit('showIncentivadores', incentivadoresIsActivated)
        },
        changeLevel: function(level){
            this.$emit('changeLevel', level);
        }
    }
}
</script>
<style scoped>
    .card-header a{
        color: #111;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
    }
</style>
