<template>
   <div class="home">
    <div class="hero is-large is-dark mb-6 bg-img">
        <div class="hero-body has-text-centered">
            <p class="title mb-6">
                Welcome to Geek's Store
            </p>
            <p class="subtitle">
                Games? Manga? Pop Culture? Everything you EVER wanted, WE HAVE IT!!
            </p>
        </div>
    </div>

    <div class="columns is-multiline mb-6 plr">
      <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>
      <div class="lastprod-container">
        <product-card
        v-for="product in latest_products"
        :key="product.id"
        :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
  import ProductCard from '@/components/ProductCard.vue'
export default {
  name: 'HomeView',
  components: {
    ProductCard
  },
  created() {
   this.$store.dispatch('fetchLatestProduct')
  },
  mounted() {
    document.title = "Geek's Store"
  },
  computed: {
    latest_products() {
      return this.$store.state.latest_products
    }
  }
}
</script>


<style scoped>
.home {
  width: 100%;
}
.lastprod-container{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.plr {
  justify-content: center;
}
.bg-img {
  background-image: url('../assets/4334829.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>