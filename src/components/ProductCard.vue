<template>
    <router-link class="card" :to="product.get_absolute_url">
        <figure class="prod-image">
            <img :src="product.get_thumbnail">
        </figure>
        <div class="prod-info">
            <h4 class="is-size-6">{{product.name}}</h4>
            <p class="is-size-6 has-text-grey">${{product.price}}</p>
        </div>
    </router-link>
       
</template>

<script>
export default {
    name: 'product-card',
    props: {
        product:{
            type: Object,
            required: true
        } 
    },

}
</script>


<style scoped>
.card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 350px;
    width: 200px;
    transition: transform .3s;
}
.card:hover {
    transform: scale(1.1);
}
.prod-info{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
}
.prod-image{
    display: flex;
    justify-content: center;
}
</style>