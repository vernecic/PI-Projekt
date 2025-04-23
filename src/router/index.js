import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BuyerFeed from '../views/BuyerFeed.vue'
import SellerFeed from '../views/SellerFeed.vue'
import CreateListing from '@/components/CreateListing.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/buyer-feed', name: 'buyer-feed', component: BuyerFeed },
  { path: '/seller-feed', name: 'seller-feed', component: SellerFeed },
  /*  { path: '/create-listing', name: 'CreateListing', component: CreateListing }, */
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
