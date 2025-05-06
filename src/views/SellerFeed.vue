<template>
  <div class="flex flex-col w-full">
    <!-- Fixed top navbar container -->
    <div class="w-full h-30 sticky top-0 z-50 bg-gray-900">
      <SellerNavbar :username="username" />
    </div>
    <div class="flex items-center flex-col">
      <router-link to="/create-listing">
        <button class="mt-20 rounded-lg border-2 p-2 cursor-pointer">Create a listing</button>
      </router-link>

      <h1 class="text-2xl mt-20">Your listings:</h1>
      <!-- ListingCard s edit gumbom-->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
/* import { updateProfile } from 'firebase/auth' */

import CreateListing from '@/views/CreateListing.vue'
import SellerNavbar from '@/components/SellerNavbar.vue'

const username = ref('')

// kad se userstate promijeni, ako je korisnik ulogiran, user.displayName se postavlja za username
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ulogiran
    username.value = user.displayName
  }
})

const showCreateListing = ref(false)
const showMyOrders = ref(false)
</script>
