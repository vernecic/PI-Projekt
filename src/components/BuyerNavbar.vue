<template>
  <div class="dark:bg-gray-900 w-screen flex flex-wrap items-center justify-between h-full p-5">
    <span class="self-center text-2xl font-semibold dark:text-white">Marketplace</span>

    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    ></button>
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
          <router-link
            to="/notifications"
            :class="[
              'block py-2 px-3  md:hover:text-blue-700 md:p-0 cursor-pointer',
              route.path === '/notifications' ? 'text-blue-700' : 'text-white',
            ]"
            >Notifications</router-link
          >
        </li>

        <li>
          <a
            href="#"
            class="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >Log out</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  username: String,
})

console.log('Username:', props.username)

/* const router = useRouter() */
</script>
