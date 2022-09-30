<template>
    <div class="games-container mb-6">
      <div class="latest-header">
        <h2 class="is-size-2 has-text-centered">All Products</h2>
      </div>
      <div class="games-products-container">
        <product-card v-for="product in games_prods" :key="product.id" :product="product"/>
      </div>
    </div>
</template>

<script>
    import ProductCard from '@/components/ProductCard.vue';
    export default {
        name: 'games-products',
        components:{
            ProductCard,
        },
        created() {
          document.title = 'Games Products'
            this.$store.dispatch('fetchProductsWithCat', 'games')
        },
        computed :{
            games_prods() {
                return this.$store.state.games_products
            }
        }
    }
</script>

<style scoped> 
.games-container{
    display: flex;
    flex-direction: column;
}
.games-products-container{
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>