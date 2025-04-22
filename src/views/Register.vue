<template>
  <div class="min-h-screen flex justify-center items-center flex-col gap-5">
    <h1 class="text-white text-4xl font-bold">Register</h1>
    <form class="grid grid-cols-2 gap-5">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="border-2 border-white text-white p-2 rounded-md outline-0"
      />
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        required
        class="border-2 border-white text-white p-2 rounded-md outline-0"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="border-2 border-white text-white p-2 rounded-md outline-0"
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm password"
        required
        class="border-2 border-white text-white p-2 rounded-md outline-0"
      />
    </form>
    <div class="text-white text-xl">Choose account type</div>
    <div class="flex gap-5">
      <button
        @click="accountType = 'seller'"
        class="text-white text-l cursor-pointer p-2 rounded-md transition-all"
        :class="accountType === 'seller' ? 'bg-gray-500' : 'bg-[#16324F]'"
      >
        Seller
      </button>
      <button
        @click="accountType = 'buyer'"
        class="text-white text-l cursor-pointer p-2 rounded-md transition-all"
        :class="accountType === 'buyer' ? 'bg-gray-500' : 'bg-[#16324F]'"
      >
        Buyer
      </button>
    </div>
    <div class="text-white text-xl">
      <button
        class="bg-[#18435A] font-bold p-2 rounded-md cursor-pointer mr-3 border-2 border-white hover:bg-white hover:text-[#18435A] transition-all duration-300 ease-in-out"
        @click="handleRegister"
      >
        Continue
      </button>
      Already have an account?
      <span class="underline cursor-pointer" @click="goToLogin">Login</span>
    </div>
    <div class="col-span-2">
      <p
        v-if="errMessage"
        class="text-red-500 mb-2 font-bold animate__animated animate__slideInDown"
      >
        {{ errMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '../supabase.js'

const router = useRouter()
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const errMessage = ref('')
const accountType = ref(null)

const goToLogin = () => {
  router.push('/login')
}

const handleRegister = async () => {
  errMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errMessage.value = 'Passwords do not match'
    return
  }
  if (!email.value || !username.value || !password.value || !accountType.value) {
    errMessage.value = 'All fields are required'
    return
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: username.value,
        account_type: accountType.value,
      },
    },
  })

  if (error) {
    errMessage.value = error.message
  } else {
    console.log('User registered:', data)
    router.push('/login')
  }
}
</script>
