<template>
  <div class="w-full h-30 flex gap-5 justify-between items-center sticky top-0 z-50">
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
import { supabase } from '@/supabase.js'

const listings = ref([])

const fetchListings = async () => {
  const q = query(collection(db, 'listings'), where('approved', '==', false))

  const snapshot = await getDocs(q)
  console.log(snapshot.docs)

  listings.value = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const listingData = { ...doc.data(), id: doc.id }

      const { data, error } = await supabase.storage
        .from('listing-images')
        .getPublicUrl(listingData.imagePath)

      if (error) {
        console.error('Error fetching image URL:', error)
      } else {
        listingData.imageUrl = data.publicUrl
      }

      return listingData
    }),
  )
}

onMounted(() => {
  fetchListings()
})
</script>
