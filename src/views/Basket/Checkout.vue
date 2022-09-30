<template>
    <div class="checkout-container">
        <h1>Checkout</h1>
        <p>Total of your cart is: {{Totalcart}}</p>
        <p>number of items you have: {{TotalCartItems}}</p>
                <div class="column is-12 box">
                    <h2 class="subtitle">Shipping details</h2>

                    <p class="has-text-grey mb-4">* All fields are required</p>

                    <div class="columns is-multiline">
                        <div class="column is-6">
                            <div class="field">
                                <label>First name*</label>
                                <div class="control">
                                    <input type="text" class="input" v-model="first_name">
                                </div>
                            </div>

                            <div class="field">
                                <label>Last name*</label>
                                <div class="control">
                                    <input type="text" class="input" v-model="last_name">
                                </div>
                            </div>

                            <div class="field">
                                <label>E-mail*</label>
                                <div class="control">
                                    <input type="email" class="input" v-model="email">
                                </div>
                            </div>

                            <div class="field">
                                <label>Phone*</label>
                                <div class="control">
                                    <input type="text" class="input" v-model="phone">
                                </div>
                            </div>
                        </div>

                        <div class="column is-6">
                            <div class="field">
                                <label>Address*</label>
                                <div class="control">
                                    <input type="text" class="input" v-model="address">
                                </div>
                            </div>

                            <div class="field">
                                <label>Zip code*</label>
                                <div class="control">
                                    <input type="text" class="input" v-model="zipcode">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="button is-dark" @click="submitedForm">Confirme</button>
    </div>
</template>


<script>
import axios from 'axios'


    export default {
        name: 'checkout',
        data() {
            return {
                cart: [],
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                address: '',
                zipcode: '',
                errors: []
            }
        },
        mounted() {
            document.title = 'Checkout'
            this.cart = this.$store.state.cart
        },
        methods: {
            async submitedForm() {
                this.errors = []
                if (this.first_name === '') {
                this.errors.push('The first name field is missing!')
                }
                if (this.last_name === '') {
                    this.errors.push('The last name field is missing!')
                }
                if (this.email === '') {
                    this.errors.push('The email field is missing!')
                }
                if (this.phone === '') {
                    this.errors.push('The phone field is missing!')
                }
                if (this.address === '') {
                    this.errors.push('The address field is missing!')
                }
                if (this.zipcode === '') {
                    this.errors.push('The zip code field is missing!')
                }
                if (this.place === '') {
                    this.errors.push('The place field is missing!')
                }
                if(!this.errors.length) {
                    let items = []
                    for (let i=0; i<this.cart.length; i++) {
                        let item = this.cart[i]
                        let obj = {
                            product: item.prod.id,
                            quantity: item.quantity
                        }
                        items.push(obj)
                    }
                    const data = {
                    'first_name': this.first_name,
                    'last_name': this.last_name,
                    'email': this.email,
                    'address': this.address,
                    'zipcode': this.zipcode,
                    'phone': this.phone,
                    'total_price': this.Totalcart,
                    'items': items,
                    }
                    await axios
                        .post('/api/v1/checkout/', data)
                        .then(response => {
                            console.log(response.data)
                            this.$store.commit('CLEAR_CART')
                            this.$router.push('/')
                        })
                        .catch(error => {
                            console.log(error)
                        })

                }
            },

        },
        computed: {
            Totalcart() {
                return this.$store.getters.cartTotal
            },
            TotalCartItems(){
                return this.cart.length
            }
        }
    }
</script>


<style scoped>
.checkout-container{
    padding: 2rem;
}
</style>