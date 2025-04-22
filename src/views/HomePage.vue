<template>
  <div class="min-h-screen flex justify-center items-center flex-col gap-5">
    <h1 class="text-white text-7xl font-bold">WELCOME</h1>
    <div>
      <button
        @click="goToLogin"
        class="cursor-pointer m-2 text-xl border-2 border-white p-2 rounded-md text-white hover:underline font-bold transition-transform duration-300 hover:-translate-y-2"
      >
        Login
      </button>
      <button
        @click="goToRegisteer"
        class="cursor-pointer m-2 text-xl border-2 border-white p-2 rounded-md text-white hover:underline font-bold transition-transform duration-300 hover:-translate-y-2"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegisteer = () => {
  router.push('/register')
}
</script>
