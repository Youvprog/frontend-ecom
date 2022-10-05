<template>
   <div id="wrapper">
    <nav-bar/>
    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>
<script>
import axios from 'axios';
import NavBar from './components/NavBar.vue';
export default {
  data() {
    return {
      cart: []
    }
  },
  components: {
    NavBar,
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
}
</script>

<style lang="scss">
@import '../node_modules/bulma';
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

#wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.section {
    flex-grow: 1;
    padding: 0;
    min-height: 100%;
  }
.footer{
    margin-top: auto;
    background-color: black;
  }

</style>
