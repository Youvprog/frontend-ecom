<template>
    <div class="manga-container mb-6">
      <div class="latest-header">
        <h2 class="is-size-2 has-text-centered mb-4">Manga</h2>
      </div>
      <div class="manga-products-container">
        <product-card v-for="product in  manga_prods" :key="product.id" :product="product"/>
      </div>
    </div>
</template>

<script>
    import ProductCard from '@/components/ProductCard.vue';
    export default {
        name: 'manga-products',
        components: {
            ProductCard,
        },
        created() {
            document.title = 'Manga Products'
            this.$store.dispatch('fetchProductsWithCat', 'manga')
        },
        computed :{
            manga_prods() {
                return this.$store.state.manga_products
            }
        }
    }
</script>

<style scoped>
.manga-container{
    display: flex;
    flex-direction: column;
}
.manga-products-container{
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>