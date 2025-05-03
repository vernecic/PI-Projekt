<template>
  <div class="bg-[#13293D] w-screen h-25 p-3 flex gap-5 justify-between items-center">
    <h1 class="text-white text-3xl mt-10 p-2 mb-2">Marketplace</h1>
    <!--  <div
      class="text-white text-xl flex p-2 gap-2 cursor-pointer hover:bg-[#415A77] rounded-md items-center"
    >
      Hello, {{ username }}
    </div> -->
    <div class="flex gap-5 mt-10 font-bold justify-center items-center mr-5">
      <div
        class="text-white text-l flex p-2 gap-2 mb-5 cursor-pointer hover:bg-[#415A77] rounded-md"
      >
        Home
      </div>
      <button
        @click="$emit('open-create-listing')"
        class="text-[#13293D] text-l flex gap-2 items-center mb-5 p-2 bg-white rounded-md cursor-pointer"
      >
        Create a listing
      </button>
      <div
        class="text-white text-l flex p-2 gap-2 mb-5 cursor-pointer hover:bg-[#415A77] rounded-md"
      >
        Orders
      </div>
      <div
        class="text-white text-l flex p-2 gap-2 mb-5 cursor-pointer hover:bg-[#415A77] rounded-md"
      >
        Notifications
      </div>
      <div
        class="text-white text-l flex p-2 gap-2 mb-5 cursor-pointer hover:bg-[#415A77] rounded-md"
      >
        Log out
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const emit = defineEmits(['open-create-listing'])

const props = defineProps({
  username: String,
})

console.log('Username:', props.username)

/* const router = useRouter() */
</script>
