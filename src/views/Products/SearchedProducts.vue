<template>
    <div class="games-container mb-6">
      <div class="latest-header">
        <h2 class="is-size-2 has-text-centered mb-4">Searched: {{query}}</h2>
      </div>
      <div class="games-products-container">
        <product-card v-for="product in products" :key="product.id" :product="product"/>
      </div>
    </div>
</template>

<script>
    import ProductCard from '@/components/ProductCard.vue';
    import axios from 'axios';
    export default {
        name: 'searched-products',
        components:{
            ProductCard,
        },
        data() {
            return{
                query: '',
                products: []
            }
        },
        mounted() {
            let uri = window.location.search.substring(1)
            let params = new URLSearchParams(uri)
            if(params.get('query')) {
                this.query = params.get('query')
                this.searchProds()
            }
        },
        methods: {
           async searchProds() {
            await axios
                    .post('/api/v1/products/search/', {'query': this.query})
                    .then(response => {
                        this.products = response.data
                    })
                    .catch(error =>{
                        console.log(error)
                    })
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
  flex-wrap: wrap;
}
</style>