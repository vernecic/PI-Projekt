<template>
  <div class="w-full h-30 flex gap-5 justify-between items-center sticky top-0 z-50">
    <BuyerNavbar />
  </div>
  <div class="m-10">
    <div class="flex gap-2 items-center text-center mb-2">
      <h1 class="text-xl">Balance:</h1>
      <p class="text-xl">{{ balance }}€</p>
    </div>
    <div class="flex gap-2">
      <input type="number" class="border p-1 rounded-lg outline-0 w-[80px]" v-model="deposit" />
      <button
        class="bg-blue-500 p-1 rounded-lg text-white shadow-md cursor-pointer"
        @click="handleDeposit"
      >
        Deposit
      </button>
    </div>

    <div v-if="isSuccesfull && depositSubmitted">
      <p class="text-green-500">Deposit succesfull</p>
    </div>
    <div v-if="!isSuccesfull && depositSubmitted">
      <p class="text-red-500">Deposit unsuccessfull</p>
    </div>
  </div>
</template>

<script setup>
import BuyerNavbar from '@/components/BuyerNavbar.vue'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'

import { ref, onMounted } from 'vue'

const deposit = ref('')
const balance = ref(0)
const isSuccesfull = ref(null)
const depositSubmitted = ref(false)

const fetchBalance = async () => {
  const user = auth.currentUser
  if (!user) return

  const userRef = doc(db, 'users', user.uid)

  const userDoc = await getDoc(userRef)
  if (userDoc.exists()) {
    console.log(userDoc.data())
    balance.value = userDoc.data().balance
  }
}

const handleDeposit = async () => {
  depositSubmitted.value = true
  isSuccesfull.value = true
  const amount = parseFloat(deposit.value)

  if (amount > 0) {
    const user = auth.currentUser
    if (!user) {
      console.log('There is no user')
      return
    }

    const userRef = doc(db, 'users', user.uid)

    try {
      await updateDoc(userRef, { balance: balance.value + amount })

      balance.value += amount
      isSuccesfull.value = true
      deposit.value = ''
    } catch (error) {
      console.log('Error: ', error)
      isSuccesfull.value = false
    }
  } else {
    console.log('Deposit must be over 0')
    isSuccesfull.value = false
  }

  setTimeout(() => {
    depositSubmitted.value = false
    isSuccesfull.value = null
  }, 5000)
}

onMounted(() => {
  fetchBalance()
})
</script>
