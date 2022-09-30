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

#wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.section {
    flex-grow: 1;
    padding: 0;
  }
.footer{
    flex-shrink: 0;    
    background-color: black;
  }

</style>
