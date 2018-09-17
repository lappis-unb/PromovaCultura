<template>
<div class="card" id="accordion">
  <legend class="card-header">
    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <i class="fa" aria-hidden="true"></i>
        Filtrar
      </button>
  </legend>
  <div id="collapseOne" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
    <div class="card-body">
      <filters @updatedSegment="updateSegment" @showProponentes="changeValueProponente" @showIncentivadores="changeValueIncentivadores" @changeLevel="changeLevel" />
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
    updateSegment: function(selected) {
      this.$emit('updatedSegment', selected)
    },
    changeValueProponente: function(proponentesIsActivated) {
      this.$emit('showProponentes', proponentesIsActivated)
    },
    changeValueIncentivadores: function(incentivadoresIsActivated) {
      this.$emit('showIncentivadores', incentivadoresIsActivated)
    },
    changeLevel: function(level) {
      this.$emit('changeLevel', level);
    }
  }
}
</script>
<style scoped>

[data-toggle="collapse"] .fa:before {
  content: "\f139";
}

[data-toggle="collapse"].collapsed .fa:before {
  content: "\f13a";
}

.card-header a {
  color: #111;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
