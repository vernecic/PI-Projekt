<template>
  <div class="flex flex-col w-full">
    <!-- Fixed top navbar container -->
    <div class="w-full h-30 sticky top-0 z-50 bg-gray-900">
      <SellerNavbar :username="username" />
    </div>
    <div class="flex items-center mt-20 flex-col">
      <h1 class="font-bold text-3xl">Your listings:</h1>
      <router-link to="/create-listing">
        <button class="mt-20 rounded-lg border-2 p-2 cursor-pointer">Create a listing</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
/* import { updateProfile } from 'firebase/auth' */

import CreateListing from '@/components/CreateListing.vue'
import SellerNavbar from '@/components/SellerNavbar.vue'
import MyOrders from '@/components/MyOrders.vue'

const username = ref('')

// kad se userstate promijeni, ako je korisnik ulogiran, user.displayName se postavlja za username
onAuthStateChanged(auth, (user) => {
  console.log('User:', user)

  if (user) {
    // ulogiran
    username.value = user.displayName
  }
})

const showCreateListing = ref(false)
const showMyOrders = ref(false)
</script>
