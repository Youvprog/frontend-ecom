<template>
<div class="product-container" v-if="product">
    <img class="product-image" :src="product.get_image">
    <div class="product-info">
        <h1 class="is-size-3">{{product.name}}</h1>
        <hr/>
        <p><strong>${{product.price}}</strong></p>
        <hr/>
        <p>{{product.description}}</p>
        <hr/>
        <div class="add-btn">
            <button class="button is-black is-outlined" @click="addToCart()">Add to cart</button>
        </div>
        
    </div>
</div>
</template>



<script>
export default {
    props: ['prod_slug'],
    name: 'product-detail',
    created(){ 
        this.$store.dispatch('fetchSingleProd',this.prod_slug)
    },
    mounted() {
        document.title = `${this.$store.state.product.name}`
    },
    computed: {
        product() {
            return this.$store.state.product
        }
    },
    methods: {
        addToCart() {
          this.$store.dispatch('addProdToCart', {prod: this.product, quantity: 1})
        }
    },
}
</script>


<style scoped>
    .product-container{
        display: flex;
        padding: 2rem;
        gap: 100px;
    }
    .product-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .product-image {
        height: 600px;
        width: 400px;
    }
    .add-btn{
        display: flex;
        justify-content: center;
    }
    .add-btn button {
        width: 350px;
    }

</style>