<template>
    <div class="products-container mb-6">
      <div class="latest-header">
        <h2 class="is-size-2 has-text-centered mb-4">All Products</h2>
      </div>
      <div class="all-products-container">
        <product-card v-for="product in all_products.results" :key="product.id" :product="product"/>
      </div>
    
      <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
        
          <ul class="pagination-list">
              <li v-for="nbr in pageNumber">
                   <router-link 
                      class="pagination-link" 
                      :to="{name: 'Products', query: { page: nbr } }"
                      :class="{'is-current': nbr === page }"   
                      :key="nbr"
                      >
                      {{nbr}}</router-link>
              </li>
          </ul>
          
          <div class="prev-next">
            <router-link 
              class="pagination-previous"
              :to="{name: 'Products', query: { page: page - 1} }"
              rel="prev"
              v-if="page != 1"
            >
            Previous
          </router-link>

          <router-link 
              class="pagination-next"
              :to="{name: 'Products', query: { page: page + 1} }"
              rel="next"
              v-if="page < pageNumber"
            >
            Next
          </router-link>
          </div>
       </nav>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios';
import { watchEffect } from 'vue';
    export default {
        name: 'all-products',
        props: ['page'],
        components: {
            ProductCard,
        },
        created() {
          watchEffect( ()=> {
            document.title = 'All Products'
            this.$store.dispatch('fetchProducts', this.page) 
          })
        },
        computed:{
            all_products(){
                return this.$store.state.all_products
            }, 
            pageNumber() {
              return Math.ceil(this.$store.state.all_products.count / 4) 
            }
        },
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
.pagination {
 display: flex;
 flex-direction: column-reverse;
 gap: 2rem;
 padding: 2rem;
}
</style>