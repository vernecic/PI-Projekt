<template>
  <div class="min-h-screen flex">
    <SellerSidebar :username="username" @open-create-listing="showCreateListing = true" />
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
import SellerSidebar from '@/components/SellerSidebar.vue'

const username = ref('')

// kad se userstate promijeni, ako je korisnik ulogiran, user.displayName se postavlja za username
onAuthStateChanged(auth, (user) => {
  console.log('User:', user)

  if (user) {
    username.value = user.displayName
  }
})

const showCreateListing = ref(false)
</script>
