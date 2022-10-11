import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import HomeView from '../views/HomeView.vue'
import ProductView from '../views/Products/ProductView.vue'
import MangaProductsView from '../views/Products/MangaProductsView'
import GamesProductsView from '../views/Products/GamesProductsView'
import LoginPage from '../views/User_Log/LoginPage'
import Signup from '../views/User_Log/Signup'
import Cart from '../views/Basket/Cart.vue'
import UserAccount from '../views/User_Log/UserAccount'
import Checkout from '../views/Basket/Checkout'
import AllProducts from '../views/Products/AllProducts'
import SuccessfullPurchase from '../views/Basket/SuccessfullPurchase'
import SearchedProducts from '../views/Products/SearchedProducts'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/products',
    name: 'Products',
    component: AllProducts,
    props: route => ({page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/search',
    name: 'SearchedProducts',
    component: SearchedProducts
  },
  {
    path: '/manga',
    name: 'Manga',
    component: MangaProductsView
  },
  {
    path: '/games',
    name: 'Games',
    component: GamesProductsView
  },
  {
    path: '/log-in',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/my-account',
    name: 'UserAccount',
    component: UserAccount,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/cart',
    name:'Cart',
    component: Cart
  },
  {
    path: '/products/:prod_slug',
    name: 'ProductView',
    props: true,
    component: ProductView,
  },
  {
    path:'/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    // meta: {
    //   requiredLogin: true,
    // }
  },
  {
    path: '/cart/checkout/success',
    name:'Success',
    component: SuccessfullPurchase
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if(to.name === 'Checkout' && !store.state.isAuthenticated) next({ name: 'LoginPage'})
  else if(to.name === 'Checkout' && !store.state.cart.length) next({ name: 'Cart'})
  else next()
})
export default router