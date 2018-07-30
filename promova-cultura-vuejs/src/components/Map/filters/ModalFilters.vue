<template>
    <div>
        <div class="modal fade" id="modal-filter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Filtro</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <filters
                        @updatedSegment="updateSegment"
                        @showProponentes="changeValueProponente"
                        @showIncentivadores="changeValueIncentivadores"
                        @changeLevel="changeLevel"
                        />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Filtrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Filters from "@/components/Map/filters/Filters"

export default {
    props: {
        updatedSegment: Function,
        showProponentes: Function,
        showProponentes: Function,
    },
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
