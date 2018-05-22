<template>
    <div class="card">
        <h5 class="card-header">{{titleCard}}</h5>
        <div class="card-body">
            <h5 class="card-title">{{contentCard}}</h5>
            <p class="card-text"></p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CardBrazil',
  props: {
    titleCard: String,
    contentCard: String,
  }
}

</script>

<style scoped>
</style>
