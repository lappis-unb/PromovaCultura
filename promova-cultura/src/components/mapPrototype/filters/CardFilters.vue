<template>
    <section>
        <div class="card">
            <legend class="card-header">Filtrar</legend>
            <div class="card-body">
                <filters        
                    @updatedSegment="updateSegment"
                    @showProponentes="changeValueProponente"
                    @showIncentivadores="changeValueIncentivadores"
                    @changeLevel="changeLevel"
                />
            </div>
        </div>
    </section>
</template>

<script>
import Filters from "@/components/mapPrototype/filters/Filters"

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