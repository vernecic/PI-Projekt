import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBm5cr5yyT1EWFFoACq__FSt8PhmhPq4fQ',
  authDomain: 'marketplace-a5710.firebaseapp.com',
  projectId: 'marketplace-a5710',
  storageBucket: 'marketplace-a5710.firebasestorage.app',
  messagingSenderId: '733397861297',
  appId: '1:733397861297:web:fd2954d543c7ccd5b7f390',
  measurementId: 'G-ZF3N731J8P',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
