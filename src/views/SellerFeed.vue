<template>
  <div class="flex flex-col w-full">
    <!-- Fixed top navbar container -->
    <div class="w-full h-30 sticky top-0 z-50 bg-gray-900">
      <SellerNavbar />
    </div>
    <div>
      <h1>Hello, {{ username }}</h1>
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
import { ref, onMounted } from 'vue'
import { auth, db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
/* import { updateProfile } from 'firebase/auth' */

import CreateListing from '@/views/CreateListing.vue'
import SellerNavbar from '@/components/SellerNavbar.vue'

const username = ref(null)

//USERNAME
const fetchUsername = async () => {
  const user = auth.currentUser
  if (!user) return

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      //
      console.log(userDoc.data()) // email, account_type, username
      return userDoc.data().username
    } else {
      return null
    }
  } catch (error) {
    console.error('Error with user:', error)
    return
  }
}

onMounted(async () => {
  username.value = await fetchUsername() // sprema username iz funkcije
})

const showCreateListing = ref(false)
const showMyOrders = ref(false)
</script>
