<template>
    <div class="user-info-container mb-6 ml-6">
        <h1>{{username}}'s profile</h1>
        <br/>
        <div v-if="orders.length > 0">
            <h1>My Orders</h1>
            <br/>
            <orders v-for="order in orders" 
                    :key="order.id"
                    :order="order"/>
        </div>
        <br/>
        <button class="button is-danger" @click="logout">Log out</button>
    </div>
</template>

<script>
import axios from 'axios';
import Orders from '@/components/Orders.vue';
    export default{
        name: 'UserAccount',
        data() {
            return {
                user_info: '',
                username: '',
                orders: []        
            }
        },
        components: {
            Orders
        },
        mounted() {
            document.title = 'Profile'
            this.get_user()
            this.get_orders()
        },
        methods: {
            logout() {
                axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('userid')

                this.$store.commit('REMOVE_TOKEN')
                this.$router.push('/log-in')
            },
            get_user() {
                axios
                    .get('/api/v1/users/me/')
                    .then(response => {
                        this.user_info = response.data
                        this.username = this.user_info.username.charAt(0).toUpperCase() + this.user_info.username.slice(1)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            get_orders() {
                axios
                    .get('api/v1/orders/')
                    .then(response => {
                        this.orders = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        }
    }
</script>

<style scoped0>



</style>