<template>
  <div class="bg-blue-500 w-screen flex flex-wrap items-center justify-between h-full p-5">
    <router-link to="/seller-feed">
      <span class="self-center text-2xl font-semibold dark:text-white">Marketplace</span>
    </router-link>

    <div class="w-full md:block md:w-auto" id="navbar-default ">
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-blue-500"
      >
        <li>
          <router-link
            to="/seller-feed"
            :class="[
              'block bg-transparent py-2 px-3 cursor-pointer font-bold ',
              route.path === '/seller-feed'
                ? 'bg-white text-blue-700 py-2 px-3 rounded-full'
                : 'text-white  hover:text-blue-700',
            ]"
            aria-current="page"
            >Home</router-link
          >
        </li>

        <li>
          <router-link
            to="/orders"
            :class="[
              'block bg-transparent py-2 px-3 cursor-pointer font-bold ',
              route.path === '/orders'
                ? 'bg-white text-blue-700 py-2 px-3 rounded-full'
                : 'text-white  hover:text-blue-700',
            ]"
            aria-current="page"
            >Orders</router-link
          >
        </li>

        <li>
          <router-link
            to="/notifications"
            :class="[
              'block bg-transparent py-2 px-3 cursor-pointer font-bold ',
              route.path === '/notifications'
                ? 'bg-white text-blue-700 py-2 px-3 rounded-full'
                : 'text-white  hover:text-blue-700 ',
            ]"
            aria-current="page"
            >Notifications</router-link
          >
        </li>

        <li>
          <p
            @click="handleSignOut"
            class="block bg-transparent py-2 px-3 cursor-pointer font-bold text-white hover:text-blue-700"
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

/* const router = useRouter() */
</script>
