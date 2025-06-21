import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { io } from 'socket.io-client'

// 🔌 Koneksi ke server socket.io
const socket = io('http://localhost:5050')  // pastikan port sama seperti di server.js

const app = createApp(App)

// Inject ke globalProperties agar bisa diakses di semua komponen via this.$socket
app.config.globalProperties.$socket = socket

app.use(router).mount('#app')
