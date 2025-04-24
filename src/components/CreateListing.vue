<template>
  <div
    v-if="!listingCreated"
    class="bg-[#13293D] w-2xl flex p-2 rounded-md justify-center items-center flex-col"
  >
    <h2 class="text-2xl">Create a listing</h2>
    <div class="flex flex-row mt-5">
      <label for="image-upload" class="cursor-pointer">
        <div
          class="w-[200px] h-[200px] bg-gray-300 flex justify-center items-center rounded-md mr-5"
        >
          <span v-if="!slika" class="text-white">Upload Image</span>
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
          class="border-2 rounded-md p-1 mt-2 w-[300px]"
          placeholder="Product title"
          required
        />
        <textarea
          v-model="opis"
          class="border-2 rounded-md p-1 mt-2 w-[300px] h-[100px]"
          placeholder="Product description"
          required
        />
        <input
          v-model="cijena"
          type="number"
          class="border-2 rounded-md p-1 mt-2 w-[300px] mb-5"
          placeholder="Price (€)"
          required
        />
      </div>
    </div>
    <button class="bg-gray-500 p-2 rounded-md font-bold cursor-pointer" @click="handleAddListing">
      Add listing
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

const opis = ref('')
const naslov = ref('')
const cijena = ref('')
const listingCreated = ref(false)

const slika = ref(null)

// Preview za uploadanu sliku
const handleImageUpload = (event) => {
  console.log(event)
  const file = event.target.files[0]
  if (file) {
    slika.value = URL.createObjectURL(file)
  }
}

const handleAddListing = async () => {
  if (!opis.value || !naslov.value || !cijena.value || !slika.value) {
    console.log('All fields required')
    return
  }
  try {
    listingCreated.value = true
    await saveListing(opis.value, naslov.value, cijena.value, slika.value)
    console.log('Listing uspješan')
  } catch (error) {
    console.log('Listing neuspješan, jer: ', error)
  }
}
</script>
