<template>
  <div class="w-full h-30 flex gap-5 justify-between items-center sticky top-0 z-50">
    <AdminNavbar />
  </div>
  <div class="flex items-center flex-col mt-20 w-full">
    <div class="text-xl">
      <h1 class="mr-[30rem] mb-5">Pending listings:</h1>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="listing in listings" :key="listing.id" class="mb-4 grid">
          <Listing :listing="listing">
            <template #buttons>
              <button
                class="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                @click="handleApprove(listing.id)"
              >
                Approve
              </button>
              <button class="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">Reject</button>
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
import { onMounted, ref } from 'vue'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'

const listings = ref([])

const fetchListings = async () => {
  const q = query(collection(db, 'listings'), where('approved', '==', false))

  const snapshot = await getDocs(q)
  console.log(snapshot.docs)

  listings.value = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
}

const handleApprove = async (listingId) => {
  const user = auth.currentUser
  if (!user) {
    return
  }

  const listingRef = doc(db, 'listings', listingId)

  try {
    await updateDoc(listingRef, {
      approved: true,
    })
    console.log('Listing approved!')
  } catch (error) {
    console.error('Error approving listing:', error.message)
  }
}

onMounted(() => {
  fetchListings()
})
</script>
