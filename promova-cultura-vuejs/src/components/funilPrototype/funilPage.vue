<template>
  <div>
    <button v-on:click="increase_number">Aumenta</button>
    <funil-card :people="people" />
  </div>
</template>

<script>
import FunilCard from "@/components/funilPrototype/funilCard"

export default {
  name: "FunilPage",
  components: {
    "funil-card": FunilCard,
  },
  props: {
  },
  data() {
    return {
        people: {
            proponentes: 50,
            incentivadores: 50
        }
    }
  },
  methods: {
    increase_number() {
      this.people.proponentes = this.people.proponentes + 23;
      this.people.incentivadores = this.people.incentivadores + 25;
    }
  }
};
</script>
