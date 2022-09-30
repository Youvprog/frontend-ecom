<template>
    <div v-if="cart.length" class="cart-container">
        <div class="cart-prod" v-for="item in cart" :key="item.prod.id">
            <img :src="item.prod.get_thumbnail">
            <p>{{item.prod.name}}</p>
            <p><strong>${{item.prod.price}}</strong></p>
            <div>
                <p> 
                    <button class="button" @click="addQuantity(item)">+</button>
                    {{item.quantity}}
                    <button class="button" @click="reduceQuantity(item)">-</button>
                </p>
           </div>
           <button class="button is-danger" @click="removeProd(item)">DELETE</button>
        </div>
        <div v-if="this.$store.state.isAuthenticated">
          <router-link to="/cart/checkout" class="button is-link checkout-btn">Proceed to Checkout</router-link>
        </div>
        <div v-else>
            <button id="show-modal" class="button is-black" @click="showModal = true">Login to Checkout</button>
            <modal :show="showModal" @close="showModal = false">
                <template #body>
                    <log-in/>
                </template>
            </modal>
        </div>
    </div>
    <div v-else>
        <div class="image-container">
            <h1 class="is-size-2 has-text-centered">Your Loot Bag is Empty !!</h1>
            <img src="../../assets/lootbag.png" alt="">
        </div>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import LogIn from '@/components/LogIn.vue'
export default {
    data() {
        return {
            showModal: false
        }
    },
    components: {
        Modal,
        LogIn
    },
    mounted() {
        document.title = 'Cart'
    },
    computed: {
        cart () {
            return this.$store.state.cart
        },
        totalCart(){
            return this.$store.getters.cartTotal
        }
    },
    methods: {
        addQuantity(item) {
            this.$store.dispatch('addProductQte',item)
        },
        reduceQuantity(item){
            this.$store.dispatch('reduceProductQte', item)
        },
        removeProd(item) {
            this.$store.dispatch('removeProdFromCart', item)
        },
    }
}
</script>

<style scoped>
    .cart-container{
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 2rem;
    }
    .cart-prod{
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .image-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .image-container img{
        width: 30rem;
    }
    .checkout-btn{
        width: 12rem;
    }
</style>