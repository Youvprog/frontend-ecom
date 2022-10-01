<template>
    <nav class="navbar is-black">
        <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>Geek's Store</strong></router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        </div>

        <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
        <div class="navbar-start">
            <div class="navbar-item">
            <form method="get" action="/search">
                <div class="field has-addons">
                <div class="control">
                    <input type="text" class="input" placeholder="What BOY ?" name="query">
                </div>

                <div class="control">
                    <button class="button is-link">
                        <span class="icon">
                        <i class="fas fa-search"></i>
                        </span>
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>

        <div class="navbar-end">
            <router-link to="/manga" class="navbar-item">Manga</router-link>
            <router-link to="/games" class="navbar-item">Games</router-link>
            <router-link to="/products" class="navbar-item">All Products</router-link>

            <div class="navbar-item">
            <div class="buttons">
                <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light">Profile</router-link>
                </template>

                <template v-else>
                <router-link to="/log-in" class="button is-light">Log in</router-link>
                </template>

                <router-link to="/cart" class="button is-link">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Loot ({{this.$store.state.cart.length}})</span>
                </router-link>
            </div>
            </div>
        </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'nav-bar',
    data() {
        return {
        showMobileMenu: false,

        }
    }
}
</script>

<style scoped>
</style>