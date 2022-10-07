<template>
    <div class="container">
        <h2 class="is-size-2">Sign Un</h2>
        <div class="control">
            <form @submit.prevent="submitForm">
                <div class="field">
                    <label>Username</label>
                    <div class="control">
                        <input class="input" type="text" v-model="username" placeholder="username required">
                    </div>
                    <p class="is-size-7 has-text-danger" v-if="errors.includes('The username is missing')">*Username required</p>
                </div>

                <div class="field">
                    <label>Password</label>
                    <div class="control">
                        <input class="input" type="password" v-model="password1" placeholder="password required">
                    </div>
                    <p class="is-size-7 has-text-danger" v-if="errors.includes('The password is missing')">*Password required</p>
                </div>
                
                <div class="field">
                    <label>Repeat Password</label>
                    <div class="control">
                        <input class="input" type="password" v-model="password2" placeholder="repeated password required">
                    </div>
                    <p class="is-size-7 has-text-danger" v-if="errors.length">*Repeated Password required</p>
                </div>

                <div class="notification is-danger" v-if="errors.length">
                    <p v-for="error in errors" :key="error"> {{error}}</p>
                </div>

                <button class="button is-black">Sign Up</button>

                <hr>
                <p>You already have an account? <router-link to="/log-in">click here</router-link> to log in</p>
            </form>
        </div>
    </div>
</template>

<script>
    import { toast } from 'bulma-toast'
    import axios from 'axios'
    export default {
        name: 'Signup',
        data() {
            return {
                username: '',
                password1: '',
                password2: '',
                errors : []
            }
        },
        methods: {
            submitForm() {
                this.errors = []
                if (this.username === '') {
                    this.errors.push('The username is missing')
                }
                if (this.password1 === '') {
                    this.errors.push('The password is missing')
                }
                if (this.password1 !== this.password2) {
                    this.errors.push('The passwords dont match')
                }
                if(!this.errors.length) {
                    const formData = {
                    username: this.username,
                    password: this.password1
                } 
                axios
                    .post('/api/v1/users/', formData)
                    .then(response => {
                    this.$router.push('/log-in')
                    toast({
                        message: 'Your account was created successfully!',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        position: 'top-center',
                        duration: 4000
                        })
                    })
                    .catch(error =>{
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
}
</script>

<style scoped>
 .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
    }
</style>