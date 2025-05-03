<template>
  <div
    v-if="!listingCreated"
    class="bg-white w-2xl flex p-2 rounded-md justify-center items-center flex-col"
  >
    <h2 class="text-2xl text-[#13293D]">Create a listing</h2>
    <div class="flex flex-row mt-5">
      <label for="image-upload" class="cursor-pointer">
        <div
          class="w-[200px] h-[200px] bg-gray-300 flex justify-center items-center rounded-md mr-5"
        >
          <span v-if="!slika" class="text-[#13293D]">Upload Image</span>
          <img
            v-if="slika"
            :src="slika"
            alt=""
            class="w-[200px] h-[200px] object-cover rounded-md"
          />
        </div>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleImageUpload"
        required
      />

      <div class="flex flex-col">
        <input
          v-model="naslov"
          type="text"
          class="border-2 rounded-md p-1 mt-2 w-[300px] text-[#13293D]"
          placeholder="Product title"
          required
        />
        <textarea
          v-model="opis"
          class="border-2 rounded-md p-1 mt-2 w-[300px] h-[100px] text-[#13293D]"
          placeholder="Product description"
          required
        />
        <input
          v-model="cijena"
          type="number"
          class="border-2 rounded-md p-1 mt-2 w-[300px] mb-5 text-[#13293D]"
          placeholder="Price (€)"
          required
        />
      </div>
    </div>
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer"
    >
      Submit listing
    </button>

    <div class="text-gray-500 text-xs mt-3">
      Note: After creating a listing, you need to wait for admin's approval before seeing your
      listing on the marketplace
    </div>
  </div>

  <div v-else class="text-center text-white mt-4 text-lg">Listing created, awaiting approval</div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase.js'
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'

const opis = ref('')
const naslov = ref('')
const cijena = ref('')
const listingCreated = ref(false)

const slika = ref(null)

const uploadSlika = ref(null)

// Lokalni preview za uploadanu sliku
const handleImageUpload = (event) => {
  console.log(event)
  console.log('image uploaded')
  const file = event.target.files[0]
  uploadSlika.value = file
  if (file) {
    slika.value = URL.createObjectURL(file)
  }
}
</script>
