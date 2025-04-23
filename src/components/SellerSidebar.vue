<template>
  <div class="bg-[#13293D] w-64 h-screen p-3">
    <h1 class="text-white text-4xl mt-3 p-2 mb-10">Seller Dashboard</h1>
    <!--  <div
      class="text-white text-xl flex p-2 gap-2 mb-5 mt-10 cursor-pointer hover:bg-[#415A77] rounded-md"
    >
      <img src="@/images/person.svg" alt="" />Profile
    </div> -->
    <div
      class="text-white text-xl flex p-2 gap-2 mb-5 cursor-pointer hover:bg-[#415A77] rounded-md"
    >
      <img src="@/images/list.svg" alt="" />Listings
    </div>
    <div
      class="text-white text-xl flex p-2 gap-2 mb-5 cursor-pointer hover:bg-[#415A77] rounded-md"
    >
      <img src="@/images/orders.svg" alt="" />Orders
    </div>
    <div
      class="text-white text-xl flex p-2 gap-2 mb-5 cursor-pointer hover:bg-[#415A77] rounded-md"
    >
      <img src="@/images/noti.svg" alt="" />Notifications
    </div>
    <div
      class="text-white text-xl flex p-2 gap-2 mb-5 cursor-pointer hover:bg-[#415A77] rounded-md"
    >
      <img src="@/images/logout.svg" alt="" />Log out
    </div>
    <button
      @click="$emit('open-create-listing')"
      class="text-[#13293D] text-xl flex gap-2 items-center ml-5 mb-5 p-2 bg-white rounded-md cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#13293D"
      >
        <path
          d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
        />
      </svg>
      Create a listing
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const emit = defineEmits(['open-create-listing'])

const router = useRouter()
</script>
