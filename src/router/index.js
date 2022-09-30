import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import HomeView from '../views/HomeView.vue'
import ProductView from '../views/Products/ProductView.vue'
import MangaProductsView from '../views/Products/MangaProductsView'
import GamesProductsView from '../views/Products/GamesProductsView'
import Login from '../views/User_Log/Login'
import Signup from '../views/User_Log/Signup'
import Cart from '../views/Basket/Cart.vue'
import UserAccount from '../views/User_Log/UserAccount'
import Checkout from '../views/Basket/Checkout'
import AllProducts from '../views/Products/AllProducts'
import SuccessfullPurchase from '../views/Basket/SuccessfullPurchase'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/products',
    name: 'Products',
    component: AllProducts
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
    name: 'Login',
    component: Login
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
    meta: {
      requiredLogin: true
    }
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
  if(to.matched.some(record => record.meta.requiredLogin) && !store.state.isAuthenticated){
    next({name: 'Login', query: {to:to.path}})
  } else {
    next()
  }
})


export default router
