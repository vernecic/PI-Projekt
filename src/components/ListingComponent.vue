<template>
  <div class="bg-[#393e461a] rounded w-[225px] shadow-lg">
    <img :src="listing.imageUrl" class="w-full h-[200px]" />
    <div class="p-4">
      <h3 class="text-2xl font-bold">{{ listing.title }}</h3>
      <p class="text-sm w-[200px]">{{ listing.description }}</p>
      <p class="text-md text-gray-600">Seller: {{ listing.username }}</p>
      <p class="font-[400]">€{{ listing.price }}</p>
      <p class="text-sm"><span class="font-bold">ID:</span> {{ listing.listingId }}</p>
      <div class="mt-2 flex gap-2">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { auth } from '@/firebase'

const props = defineProps({
  listing: Object,
})
</script>
