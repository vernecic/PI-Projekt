<template>
  <div class="w-full h-30 sticky top-0 z-50 bg-gray-900">
    <AdminNavbar />
  </div>
  <div class="flex items-center flex-col mt-20 w-full">
    <div class="text-xl">
      <h1 class="mr-[30rem] mb-5">Pending listings:</h1>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="listing in listings" :key="listing.id" class="mb-4 grid">
          <Listing :listing="listing" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue'
import Listing from '@/components/ListingComponent.vue'
import { onMounted, ref } from 'vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

const listings = ref([])

const fetchListings = async () => {
  const q = query(collection(db, 'listings'), where('approved', '==', false))
  const snapshot = await getDocs(q)
  listings.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

onMounted(() => {
  fetchListings()
})
</script>
