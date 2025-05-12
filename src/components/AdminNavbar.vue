<template>
  <div
    class="dark:bg-gray-900 w-screen flex flex-wrap items-center justify-between h-full p-5 relative"
  >
    <router-link to="/seller-feed">
      <span class="self-center text-2xl font-semibold dark:text-white">Marketplace</span>
    </router-link>
    <h1 class="text-white font-bold text-3xl absolute left-1/2 -translate-x-1/2">Admin</h1>
    <div class="w-full md:block md:w-auto" id="navbar-default ">
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        <li>
          <router-link
            to="/buyer-feed"
            :class="[
              'block py-2 px-3 hover:text-blue-700 bg-transparent md:p-0 cursor-pointer',
              route.path === '/buyer-feed' ? 'text-blue-700' : 'text-white',
            ]"
            aria-current="page"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/listing-panel"
            :class="[
              'block py-2 px-3  md:hover:text-blue-700 md:p-0 cursor-pointer',
              route.path === '/orders' ? 'text-blue-700' : 'text-white',
            ]"
          >
            Listings
          </router-link>
        </li>

        <li>
          <router-link
            to="/orders"
            :class="[
              'block py-2 px-3  md:hover:text-blue-700 md:p-0 cursor-pointer',
              route.path === '/orders' ? 'text-blue-700' : 'text-white',
            ]"
          >
            Orders
          </router-link>
        </li>

        <li>
          <p
            @click="handleSignOut"
            class="block py-2 px-3 text-white rounded-sm md:border-0 md:hover:text-blue-700 md:p-0 cursor-pointer"
          >
            Log out
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSignOut = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.log(error)
  }
}

const route = useRoute()

const props = defineProps({
  username: String,
})

console.log('Username:', props.username)

/* const router = useRouter() */
</script>
