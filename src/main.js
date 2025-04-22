import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createClient } from '@supabase/supabase-js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
