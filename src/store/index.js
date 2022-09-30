import ProductsService from '@/service/ProductsService'
import { createStore } from 'vuex'
import { toast } from 'bulma-toast'

export default createStore({
  state: {
    latest_products: [],
    all_products: [],
    manga_products: [],
    games_products: [],
    product: {},
    cart: [],
    token: '',
    isAuthenticated: false
  },
  //////////////////////////////////////////////////
  getters: {
    cartTotal(state){
      let total = 0
      state.cart.forEach(item =>{
        total += item.prod.price * item.quantity
      })
      return total.toFixed(2)
    }
  },
  /////////////////////////////////////////////////
  mutations: {
    SET_LATEST_PRODUCTS(state, products) {
      state.latest_products = products
    },
    SET_PRODUCTS(state, allproducts) {
      state.all_products = allproducts
    },
    SET_PROD(state, product) {
      state.product = product
    },
    ADD_TO_CART(state, {prod, quantity}) {
      state.cart.push({prod, quantity})
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    CLEAR_CART(state) {
      state.cart = []
      localStorage.removeItem('cart')
    },
    ADD_PROD_QTE(state, item){
      let index = state.cart.indexOf(item)
      state.cart[index].quantity += 1
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart[index].quantity += 1
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    REDUCE_PROD_QTE(state, item) {
      let index = state.cart.indexOf(item)
      if(state.cart[index].quantity === 1) {
        toast({
          message: '<strong>The quantity cannot go under 1</strong>',
          type: 'is-warning',
          dismissible: true,
          position: 'top-center',
          duration: 4000
        })
      } else {
        state.cart[index].quantity -= 1
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart[index].quantity -= 1
        localStorage.setItem('cart', JSON.stringify(cart))
      }
    },
    REMOVE_PROD(state, item) {
      let index = state.cart.indexOf(item)
      state.cart.splice(index,1)
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart.splice(index,1)
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    SET_MANGA_PRODS(state, manga_products){
      state.manga_products = manga_products
    },
    SET_GAMES_PRODS(state, games_products){
      state.games_products = games_products
    },
    initializeStore(state){
      if(localStorage.getItem('cart')){
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      // if(document.cookie){
      //   state.token = document.cookie
      //   state.isAuthenticated = true
      // } else {
      //   state.token = ''
      //   state.isAuthenticated = false
      // }
      if(localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    SET_TOKEN(state,token){
      state.token = token
      state.isAuthenticated = true
    },
    REMOVE_TOKEN(state){
      state.token = ''
      state.isAuthenticated = false
    }
  },
  //////////////////////////////////////////////////////////////////////
  actions: {
    fetchProductsWithCat({commit}, cat_slug){
      ProductsService.getCatProds(cat_slug)
      .then(response =>{
        if (cat_slug === 'manga') {
          commit('SET_MANGA_PRODS', response.data)
        } else if(cat_slug === 'games') {
          commit('SET_GAMES_PRODS', response.data)
        }
      })
      .catch(error =>{
        console.log(error)
      })
    },
    fetchProducts({commit}, Prods) {
      ProductsService.getProds(Prods)
      .then(response =>{
        if ( Prods === 'latest-products') {
          commit('SET_LATEST_PRODUCTS', response.data)
        } else if (Prods === 'products') {
          commit('SET_PRODUCTS', response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchSingleProd({commit},prod_slug) {
      const existingProd = this.state.all_products.find(product => product.slug === prod_slug)
      if(existingProd) {
        commit('SET_PROD',existingProd)
      } else {
        ProductsService.getSingleProd(prod_slug)
        .then(response =>{
          console.log(response.data)
          commit('SET_PROD', response.data)
        })
        .catch(error => {
          console.log(error)
        })
        }
      },
      addProdToCart({commit}, {prod, quantity}){
        const existProdInCart = this.state.cart.find(item => item.prod.id === prod.id)
        if(existProdInCart){
          toast({
            message: 'The product is already in your cart',
            type: 'is-danger',
            dismissible: true,
            position: 'top-center',
            duration: 3000
          })
        } else {
          commit('ADD_TO_CART', {prod, quantity})
          toast({
            message: 'The product was added successfully to your cart',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            position: 'top-center',
            duration: 3000
          })
        }
      },
      addProductQte({commit}, item){
        commit('ADD_PROD_QTE', item)
      },
      reduceProductQte({commit}, item) {
        commit('REDUCE_PROD_QTE', item)
      },
      removeProdFromCart({commit}, item) {
        commit('REMOVE_PROD', item)
      }
    },
    /////////////////////////////////////////////////////////////////
  modules: {
  }
})
