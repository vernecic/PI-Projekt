<template>
  <div class="border p-4 rounded w-[400px]">
    <img :src="listing.imageUrl" class="w-[200px] h-[200px]" />
    <h3 class="text-2xl font-bold">{{ listing.title }}</h3>
    <p class="text-sm w-[200px]">{{ listing.description }}</p>
    <p class="text-sm text-gray-600">By: {{ listing.username }}</p>
    <p class="font-[400]">€{{ listing.price }}</p>
    <p class="text-sm">Id: {{ listing.listingId }}</p>
    <div class="mt-2 flex gap-2">
      <button
        class="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
        @click="handleApprove(listing.id)"
      >
        Approve
      </button>
      <button class="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">Reject</button>
    </div>
  </div>
</template>

<script setup>
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { auth } from '@/firebase'

const handleApprove = async (listingId) => {
  const user = auth.currentUser
  if (!user) {
    console.error('User is not logged in')
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

const props = defineProps({
  listing: Object,
})

//  approve - udpdate approved: true

//  reject - izbrisati
</script>
