import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BuyerFeed from '../views/BuyerFeed.vue'
import SellerFeed from '../views/SellerFeed.vue'
import CreateListing from '@/components/CreateListing.vue'
import MyOrders from '@/components/MyOrders.vue'
import Notifications from '@/components/Notifications.vue'
import AdminPage from '@/views/AdminPage.vue'

const routes = [
  { path: '/', name: 'welcome', component: WelcomePage },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/buyer-feed',
    name: 'buyer-feed',
    component: BuyerFeed,
  },
  {
    path: '/seller-feed',
    name: 'seller-feed',
    component: SellerFeed,
  },
  {
    path: '/create-listing',
    name: 'create-listing',
    component: CreateListing,
  },
  {
    path: '/orders',
    name: 'orders',
    component: MyOrders,
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
  },
  {
    path: '/admin-page',
    name: 'admin-page',
    component: AdminPage,
  },
  /*  { path: '/create-listing', name: 'CreateListing', component: CreateListing }, */
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
