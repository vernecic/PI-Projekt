<template>
  <div class="border p-4 rounded w-[250px] shadow-lg">
    <img :src="listing.imageUrl" class="w-[200px] h-[200px]" />
    <h3 class="text-2xl font-bold">{{ listing.title }}</h3>
    <p class="text-sm w-[200px]">{{ listing.description }}</p>
    <p class="text-sm text-gray-600">By: {{ listing.username }}</p>
    <p class="font-[400]">€{{ listing.price }}</p>
    <p class="text-sm">Id: {{ listing.listingId }}</p>
    <div class="mt-2 flex gap-2">
      <slot name="buttons" />
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
