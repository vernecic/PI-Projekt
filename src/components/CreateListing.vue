<template>
  <div class="bg-[#13293D] w-2xl flex p-2 rounded-md justify-center items-center flex-col">
    <h2 class="text-2xl">Create a listing</h2>
    <div class="flex flex-row mt-5">
      <label for="image-upload" class="cursor-pointer">
        <div
          class="w-[200px] h-[200px] bg-gray-300 flex justify-center items-center rounded-md mr-5"
        >
          <span v-if="!selectedImage" class="text-white">Upload Image</span>
          <img
            v-if="selectedImage"
            :src="selectedImage"
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
      />

      <div class="flex flex-col">
        <input
          type="text"
          class="border-2 rounded-md p-1 mt-2 w-[300px]"
          placeholder="Product title"
        />
        <textarea
          type="text"
          class="border-2 rounded-md p-1 mt-2 w-[300px] h-[100px]"
          placeholder="Product description"
        />
        <input
          type="number"
          class="border-2 rounded-md p-1 mt-2 w-[300px] mb-5"
          placeholder="Price (€)"
        />
      </div>
    </div>
    <button class="bg-gray-500 p-2 rounded-md font-bold cursor-pointer">Add listing</button>
    <div class="text-gray-500 text-xs mt-3">
      Note: After creating a listing, you need to wait for admin's approval before seeing your
      listing on the marketplace
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedImage = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImage.value = URL.createObjectURL(file)
    console.log('Image selected:', selectedImage.value)
  }
}
// sljedeće: handleAddListing,
</script>
