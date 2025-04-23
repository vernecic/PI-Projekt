<template>
  <div class="min-h-screen flex justify-center items-center flex-col gap-5">
    <h1 class="text-white text-4xl font-bold">Login</h1>
    <form @submit.prevent="handleLogin" class="grid grid-cols-2 gap-5">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
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
    </form>

    <div class="text-white text-xl">
      <button
        class="bg-[#18435A] p-2 rounded-md font-bold cursor-pointer mr-3 border-2 border-white hover:bg-white hover:text-[#18435A] transition-all duration-300 ease-in-out"
        @click="handleLogin"
      >
        Login
      </button>

      Don't have an account?
      <span class="underline cursor-pointer" @click="goToRegister">Register</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
/* import { supabase } from '../supabase.js' */
import { auth, db } from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const router = useRouter()

const email = ref('')
const password = ref('')
const errMessage = ref('')

const goToRegister = () => {
  router.push('/register')
}

const handleLogin = async () => {
  errMessage.value = ''

  if (!email.value || !password.value) {
    errMessage.value = 'Please enter both email and password'
    return
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)

    const user = userCredential.user

    const userDoc = await getDoc(doc(db, 'users', user.uid))

    if (userDoc.exists()) {
      const userData = userDoc.data()
      const accountType = userData.account_type

      if (accountType === 'seller') {
        router.push('/seller-feed')
      } else if (accountType === 'buyer') {
        router.push('/buyer-feed')
      } else {
        errMessage.value = 'Error with account type.'
      }
    } else {
      errMessage.value = 'User not found.'
    }
  } catch (error) {
    errMessage.value = error.message
  }
}
</script>
