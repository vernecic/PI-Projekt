import { createRouter, createWebHistory } from 'vue-router'
import { auth, db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'

import WelcomePage from '../views/WelcomePage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BuyerFeed from '../views/BuyerFeed.vue'
import SellerFeed from '../views/SellerFeed.vue'
import CreateListing from '@/views/CreateListing.vue'
import MyOrders from '@/views/MyOrders.vue'
import Notifications from '@/views/Notifications.vue'
import AdminPage from '@/views/AdminPage.vue'
import ListingPanel from '@/views/ListingPanel.vue'

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
  {
    path: '/listing-panel',
    component: ListingPanel,
  },
  /*  { path: '/create-listing', name: 'CreateListing', component: CreateListing }, */
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = auth.currentUser
  if (to.path === '/register' || to.path === '/login') {
    next()
    return
  }
  if (!user) {
    next('/login')
    return
  }
  const userDoc = await getDoc(doc(db, 'users', user.uid))
  if (!userDoc.exists()) {
    console.log('No user')
    next('/login')
    return
  }

  const role = userDoc.data().account_type

  if (to.path === '/seller-feed' && role !== 'seller') {
    next('/buyer-feed')
    return
  }
  if (to.path === '/buyer-feed' && role !== 'buyer') {
    next('seller-feed')
    return
  }

  next()
})

export default router
