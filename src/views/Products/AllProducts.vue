<template>
    <div class="products-container mb-6">
      <div class="latest-header">
        <h2 class="is-size-2 has-text-centered">All Products</h2>
      </div>
      <div class="all-products-container">
        <product-card v-for="product in all_products" :key="product.id" :product="product"/>
      </div>
    </div>
</template>

<script>
    import ProductCard from '@/components/ProductCard.vue';

    export default {
        name: 'all-products',
        components: {
            ProductCard,
        },
        created() {
            document.title = 'All Products'
            this.$store.dispatch('fetchProducts', 'products')
        },
        computed:{
            all_products(){
                return this.$store.state.all_products
            }
        }
    }
</script>

<style scoped>
.products-container{
    display: flex;
    flex-direction: column;
}
.all-products-container{
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>