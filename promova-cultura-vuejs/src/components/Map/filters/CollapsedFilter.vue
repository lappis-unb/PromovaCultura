<template>
<div class="card" id="accordion">
  <legend class="card-header">
    <a href="#" class="btn-filters btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <span class="title-filter">Filtrar</span>
        <span class="icon-filter">
            <i class="fa" aria-hidden="true"></i>
        </span>
    </a>
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
  content: "\f078";
}

[data-toggle="collapse"].collapsed .fa:before {
  content: "\f054";
}

.card-header a {
  color: #111;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;

}

.btn-filters {
    display: block;
    text-align: left;
}

.btn-link.focus, .btn-link:focus {
    text-decoration: none;
}

.btn-filters:hover {
    text-decoration: none;
}

.icon-filter {
    float: right;
}

.title-filter {
    float: left;
}

</style>
