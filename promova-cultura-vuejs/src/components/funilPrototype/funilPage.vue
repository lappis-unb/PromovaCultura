<template>
    <funil-card :people="people"/>
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
            proponentes: 10000000,
            incentivadores: 1000000
        }
    }
  }
};
</script>
