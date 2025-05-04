<template>
  <div class="flex flex-col w-full">
    <!-- Fixed top navbar container -->
    <div class="w-full h-30 sticky top-0 z-50 bg-gray-900">
      <SellerNavbar :username="username" @open-create-listing="showCreateListing = true" />
    </div>

    <!-- Main content area -->
    <div class="flex-1 p-8 text-white flex justify-center items-center">
      <div v-if="showCreateListing">
        <CreateListing />
      </div>
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
</script>
