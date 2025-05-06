<template>
  <div class="border p-4 rounded w-[400px]">
    <h3 class="text-2xl font-bold">{{ listing.title }}</h3>
    <p class="text-sm w-[200px]">{{ listing.description }}</p>
    <p class="text-sm text-gray-600">By: {{ listing.username }}</p>
    <p class="font-[400]">€{{ listing.price }}</p>
    <div class="mt-2 flex gap-2">
      <button class="bg-green-500 text-white px-2 py-1 rounded cursor-pointer">Approve</button>
      <button class="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">Reject</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  listing: Object,
})
</script>
