<template>
  <div class="w-full h-30 sticky top-0 z-50 bg-gray-900">
    <AdminNavbar />
    <div class="flex items-center flex-col">
      <h1 class="text-2xl mt-20">Approved listings:</h1>
      <!-- ListingCard s remove gumbom-->
      <div class="grid grid-cols-2 gap-3">
        <div v-for="listing in listings" :key="listing.id" class="mb-4">
          <!-- Render Listing Component for each listing -->
          <Listing :listing="listing">
            <template #buttons>
              <button class="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">Remove</button>
            </template>
          </Listing>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue'
import Listing from '@/components/ListingComponent.vue'
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

const listings = ref([])

const fetchListings = async () => {
  const q = query(collection(db, 'listings'), where('approved', '==', true))

  const snapshot = await getDocs(q)
  listings.value = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
}

onMounted(() => {
  fetchListings()
})
</script>
