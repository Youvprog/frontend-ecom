<template>
    <div v-if="cart.length">
        <h2 class="is-size-2 has-text-centered">Your Cart</h2>
        <div  class="cart-container">
            <div class="card cart-prod" v-for="item in cart" :key="item.prod.id">
                <img :src="item.prod.get_thumbnail">
                <div class="prod-info-option">
                    <h4 class="is-size-6">{{item.prod.name}}</h4>
                    <p class="is-size-6"><strong>${{item.prod.price}}</strong></p>
                    <div class="btn-qte">
                        <button class="button" @click="addQuantity(item)">+</button>
                        <p>{{item.quantity}}</p>
                        <div v-if="item.quantity === 1">
                            <button class="button" disabled>-</button>
                        </div>
                        <div v-else>
                            <button class="button" @click="reduceQuantity(item)">-</button>
                        </div>
                    </div>
                    <button class="button is-danger" @click="removeProd(item)">DELETE</button>
                </div>
            </div>
        </div>
        <div class="btn-container" v-if="this.$store.state.isAuthenticated">
            <router-link to="/cart/checkout" class="button is-black checkout-btn">Proceed to Checkout</router-link>
        </div>
        <div class="btn-container" v-else>
            <button id="show-modal" class="button is-black" @click="showModal = true">Login to Checkout</button>
            <modal :show="showModal" @close="showModal = false">
                <template #body>
                    <login-modal/>
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
import LoginModal from '@/components/LoginModal.vue'
export default {
    data() {
        return {
            showModal: false
        }
    },
    components: {
        Modal,
        LoginModal
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
    .prod-info-option{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }
    .btn-qte{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .checkout-btn{
        width: 12rem;
    }
    .btn-container {
        padding: 2rem;
    }

    @media screen and (max-width: 690px){
        .prod-info-option{
            display: flex;
            flex-direction: column;
            padding: 1rem;
            gap: 10px;
        }
    }
    @media screen and (max-width: 429px) {
        .cart-container{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 2rem;
        }
        .cart-prod{
        display: flex;
        flex-direction: column;
        }
        .prod-info-option{
        display: flex;
        flex-direction: column;
        }
        .btn-container{
            display: flex;
            justify-content: center;
        }
    }
</style>