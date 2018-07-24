<template>
  <div class="container">
    {{value}}
    FunnelComponent
  </div>
</template>

<script>
export default {
  name: "FunnelComponent",
  data() {
    return {
      title: "Promova Cultura"
    };
  },
  props: {
    value: Array
  }
};
</script>

<style scoped>


</style>
