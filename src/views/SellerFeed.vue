<template>
  <div class="min-h-screen flex">
    <SellerSidebar @open-create-listing="showCreateListing = true" />
    <div class="flex-1 p-8 text-white flex justify-center items-center">
      <div v-if="showCreateListing">
        <CreateListing />
      </div>

      <div v-else>
        <p>Select an option from the sidebar.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import CreateListing from '@/components/CreateListing.vue'
import SellerSidebar from '@/components/SellerSidebar.vue'

const showCreateListing = ref(false)
</script>
