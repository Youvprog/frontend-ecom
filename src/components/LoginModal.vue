<template>
    <h1 class="is-size-4 has-text-centered mb-4">Log In</h1>
    <div class="login-container">
        <div class="control">
            <form  @submit.prevent="submitForm">
                <div class="field">
                    <label>Username</label>
                    <div class="control">
                        <input class="input" type="text" v-model="username">
                    </div>
                </div>
                
                <div class="field">
                    <label>Password</label>
                    <div class="control">
                        <input class="input" type="password" v-model="password">
                    </div>
                </div>

                <div class="notification is-danger" v-if="errors.length">
                    <p v-for="error in errors" :key="error">{{error}}</p>
                </div>

                <button class="button is-black">Login</button>

                <hr>
                <p>You dont have an account? <router-link to="/sign-up">click here</router-link> to create one.</p>
            </form>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'login-modal',
    data() {
            return {
                username: '',
                password: '',
                errors: []
            }
        },
        methods: {
            async submitForm() {
                axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem('token')

                const formData = {
                    username : this.username,
                    password: this.password
                }
                await axios
                    .post('api/v1/token/login/', formData)
                    .then(response => {
                        const token = response.data.auth_token
                        this.$store.commit('SET_TOKEN', token)
                        axios.defaults.headers.common['Authorization'] = 'Token ' + token
                        localStorage.setItem('token', token)
                        //document.cookie = `token=${token}; max-age=86400`
                        this.$router.push('/cart/checkout')
                    })
                    .catch(error => {
                        if (error.response) {
                            for(const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                            console.log(JSON.stringify(error.reponse.data))
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again')
                            console.log(JSON.stringify(error))
                        }
                    })

            }
        }
}
</script>

<style scoped>


</style>