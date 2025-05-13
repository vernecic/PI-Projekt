<template>
  <div class="w-full h-30 flex gap-5 justify-between items-center sticky top-0 z-50">
    <BuyerNavbar />
  </div>
  <div class="mt-10 flex">
    <div class="ml-10">
      <div class="flex flex-col">
        <h1>Hello, {{ username }}</h1>
        <div class="flex gap-2 items-center text-center mb-2">
          <h1 class="text-xl">Balance:</h1>
          <p class="text-xl">{{ balance }}€</p>
        </div>
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
    <div class="grid grid-cols-3 gap-3 ml-100">
      <div v-for="listing in listings" :key="listing.id" class="mb-4 grid">
        <Listing :listing="listing">
          <template #buttons>
            <button class="bg-green-500 text-white px-2 py-1 rounded cursor-pointer">Buy</button>
          </template>
        </Listing>
      </div>
    </div>
  </div>
</template>

<script setup>
import BuyerNavbar from '@/components/BuyerNavbar.vue'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Listing from '@/components/ListingComponent.vue'

import { ref, onMounted } from 'vue'

const listings = ref([])
const username = ref(null)

const deposit = ref('')
const balance = ref(0)
const isSuccesfull = ref(null)
const depositSubmitted = ref(false)

const fetchListings = async () => {
  const q = query(collection(db, 'listings'), where('approved', '==', true))

  const snapshot = await getDocs(q)
  console.log(snapshot.docs)

  listings.value = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
}

// NOVAC - BALANCE
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
// NOVAC - DEPOSIT
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

//USERNAME
const fetchUsername = async () => {
  const user = auth.currentUser
  if (!user) return

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      //
      console.log(userDoc.data()) // email, account_type, username
      return userDoc.data().username
    } else {
      return null
    }
  } catch (error) {
    console.error('Error with user:', error)
    return
  }
}

onMounted(async () => {
  username.value = await fetchUsername() // sprema username iz funkcije
})

onMounted(() => {
  fetchBalance()
  fetchListings()
})
</script>
