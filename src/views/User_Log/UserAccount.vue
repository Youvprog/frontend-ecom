<template>
    <div class="container-user">
        <user-dashboard :method="logout" :showOrders="showOrders" :showUser="showUser" :showDash="showDash"/>
        <div class="dashboard" v-show="dashShow">
            <h4 class="is-size-4 has-text-centered">Welcome to your Dashboard</h4> 
        </div>
        <div class="orders" v-show="orderOpen">
            <orders v-for=" order in orders" :order="order"/>
        </div>
        <div class="user-info" v-show="userShow">
            <h4 class="is-size-4 has-text-centered">{{username}}'s Profile</h4>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Orders from '@/components/Orders.vue';
import UserDashboard from '@/components/UserDashboard.vue';
    export default{
        name: 'UserAccount',
        data() {
            return {
                user_info: '',
                username: '',
                orders: [],
                orderOpen: false,
                userShow: false,  
                dashShow: true,    
            }
        },
        components: {
            Orders,
            UserDashboard
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
            showDash() {
                this.dashShow = true
                this.userShow = false
                this.orderOpen = false
            },
            showOrders() {
            this.orderOpen = true
            this.userShow = false
            this.dashShow = false
            },
            showUser() {
                this.userShow = true
                this.orderOpen = false
                this.dashShow = false
            }
        }
    }
</script>

<style scoped>
.container-user {
    display:flex;
    flex-direction: column;
    gap: 2rem;
}
</style>