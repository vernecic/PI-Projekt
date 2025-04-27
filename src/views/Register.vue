<template>
  <div class="min-h-screen flex justify-center items-center flex-col gap-5">
    <h1 class="text-[#16324F] text-4xl font-bold">Register</h1>
    <form class="grid grid-cols-2 gap-5">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="border-2 border-[#16324F] text-[#16324F] p-2 rounded-md outline-0"
      />
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        required
        class="border-2 border-[#16324F] text-[#16324F] p-2 rounded-md outline-0"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="border-2 border-[#16324F] text-[#16324F] p-2 rounded-md outline-0"
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm password"
        required
        class="border-2 border-[#16324F] text-[#16324F] p-2 rounded-md outline-0"
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
    <div class="text-white text-xl flex items-center">
      <button
        class="bg-[#18435A] font-bold p-2 rounded-md cursor-pointer mr-3 border-2 border-[#16324F] hover:bg-white hover:text-[#18435A] transition-all duration-300 ease-in-out"
        @click="handleRegister"
      >
        Continue
      </button>
      <p class="text-[#16324F] mr-2">Already have an account?</p>
      <span class="underline cursor-pointer text-[#16324F]" @click="goToLogin">Login</span>
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
/* import { supabase } from '../supabase.js' */
import { auth, db } from '../firebase.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const router = useRouter()

// podatci
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const accountType = ref(null)

const errMessage = ref('')

const goToLogin = () => {
  router.push('/login')
}

const handleRegister = async () => {
  errMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errMessage.value = 'Passwords do not match'
    return
  }

  if (!email.value || !username.value || !password.value) {
    errMessage.value = 'Please fill in all fields'
    return
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    /*  console.log(userCredential) */

    const user = userCredential.user
    /* console.log(user) */

    await updateProfile(user, {
      displayName: username.value,
    })

    await user.reload()

    await setDoc(doc(db, 'users', user.uid), {
      username: username.value,
      email: user.email,
      account_type: accountType.value,
    })

    router.push('/login')
  } catch (error) {
    errMessage.value = error.message
  }
}

//////
</script>
