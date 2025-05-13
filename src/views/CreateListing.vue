<template>
  <div class="w-full h-30 sticky top-0 z-50 bg-gray-900">
    <SellerNavbar></SellerNavbar>
  </div>

  <div v-if="!listingCreated">
    <div class="w-full mt-50 flex rounded-md justify-center items-center flex-col">
      <h2 class="text-2xl text-[#13293D] mb-4">Create a listing</h2>

      <div class="flex flex-row">
        <!-- Image Upload -->
        <label for="image-upload" class="cursor-pointer">
          <div
            class="w-[200px] h-[200px] bg-gray-300 flex justify-center items-center rounded-md mr-5"
          >
            <span v-if="!slika" class="text-[#13293D]">Upload Image</span>
            <img
              v-if="slika"
              :src="slika"
              alt="Uploaded Preview"
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
          required
        />

        <!-- Listing Info -->
        <div class="flex flex-col">
          <input
            v-model="naslov"
            type="text"
            class="border-2 rounded-md p-2 mt-2 w-[300px] text-[#13293D]"
            placeholder="Product title"
            required
          />
          <textarea
            v-model="opis"
            class="border-2 rounded-md p-2 mt-2 w-[300px] h-[100px] text-[#13293D]"
            placeholder="Product description"
            required
          />
          <input
            v-model="cijena"
            type="number"
            class="border-2 rounded-md p-2 mt-2 w-[300px] text-[#13293D]"
            placeholder="Price (€)"
            required
          />
        </div>
      </div>

      <button
        type="button"
        class="mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer"
        @click="submitListing"
      >
        Submit listing
      </button>

      <div class="text-gray-500 text-xs mt-3 text-center">
        Note: After creating a listing, you need to wait for admin's approval before seeing your
        listing on the marketplace.
      </div>
    </div>
  </div>

  <div
    v-else
    class="w-full flex justify-center items-center mt-80 text-center text-[#13293D] text-lg flex-col"
  >
    Listing created, awaiting approval.
    <router-link to="/seller-feed">
      <button class="mt-10 border rounded-lg p-2 cursor-pointer">
        Create another
      </button></router-link
    >
  </div>
</template>

<script setup>
import SellerNavbar from '@/components/SellerNavbar.vue'
import { collection, addDoc, serverTimestamp, getDoc, doc } from '@firebase/firestore'
import { auth, db } from '@/firebase.js'
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase'

const opis = ref('')
const naslov = ref('')
const cijena = ref('')
const listingCreated = ref(false)

const slika = ref(null)
const uploadSlika = ref(null)
const username = ref(null)

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

/* const handleImageUpload = (event) => {
  const file = event.target.files[0]
  uploadSlika.value = file
  if (file) {
    slika.value = URL.createObjectURL(file)
  }
} */

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  uploadSlika.value = file
  if (file) {
    slika.value = URL.createObjectURL(file)
  }
}

const imageSupabase = async (file, path) => {
  const { data, error } = await supabase.storage.from('listing-images').upload(path, file)
  if (error) throw error
  return data.path
}

//id za listing
const generateListingId = () => {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

// submit Listing
const submitListing = async () => {
  if (!naslov.value || !opis.value || !cijena.value || !uploadSlika.value) {
    alert('All fields including image are required.')
    return
  }

  const user = auth.currentUser
  if (!user) {
    console.error('User not logged in')
    return
  }

  try {
    const userId = user.uid
    if (!username.value) username.value = await fetchUsername()

    const uniqueFileName = `${Date.now()}-${uploadSlika.value.name}`
    const imagePath = `uploads/${uniqueFileName}`

    await imageSupabase(uploadSlika.value, imagePath)

    const { data: publicUrlData } = supabase.storage.from('listing-images').getPublicUrl(imagePath)

    const publicUrl = publicUrlData.publicUrl

    await addDoc(collection(db, 'listings'), {
      title: naslov.value,
      description: opis.value,
      price: parseFloat(cijena.value),
      createdAt: serverTimestamp(),
      approved: false,
      status: false,
      userId,
      username: username.value,
      listingId: generateListingId(),
      imagePath,
      imageUrl: publicUrl,
    })

    listingCreated.value = true
  } catch (error) {
    console.error('Error submitting listing:', error.message)
  }
}
</script>
