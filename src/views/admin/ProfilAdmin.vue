<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <!-- Header -->
      <header class="max-w-7xl mx-auto mb-8">
        <h1 class="text-4xl font-extrabold tracking-tight text-white mb-2">Profil Admin</h1>
        <p class="text-gray-400">Dashboard administratur sistem</p>
      </header>

      <!-- Welcome Card -->
      <section class="max-w-7xl mx-auto mb-8">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-8 text-white">
          <div class="flex items-center gap-6">
            <!-- Avatar -->
            <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
              {{ getInitials(profile.name) }}
            </div>
            
            <!-- Welcome Text -->
            <div>
              <h2 class="text-3xl font-bold mb-2">Selamat datang, {{ profile.name }}!</h2>
              <p class="text-indigo-100 text-lg">Anda login sebagai Administrator</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Admin Dashboard Cards -->
      <section class="max-w-7xl mx-auto mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Profile Management -->
          <div class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-colors cursor-pointer"
               @click="goToSettings">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">Kelola Profil</h3>
              <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-user-cog text-white text-xl"></i>
              </div>
            </div>
            <p class="text-gray-400 mb-4">Ubah informasi profil dan kata sandi</p>
            <div class="flex items-center text-indigo-400 text-sm font-medium">
              <span>Buka Pengaturan</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </div>
          </div>

          <!-- System Status -->
          <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">Status Sistem</h3>
              <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-check-circle text-white text-xl"></i>
              </div>
            </div>
            <p class="text-gray-400 mb-2">Sistem berjalan normal</p>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span class="text-green-400 text-sm font-medium">Online</span>
            </div>
          </div>

          <!-- Session Info -->
          <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">Sesi Login</h3>
              <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-clock text-white text-xl"></i>
              </div>
            </div>
            <p class="text-gray-400 mb-2">Login saat ini</p>
            <p class="text-blue-400 text-sm font-medium">{{ getCurrentTime() }}</p>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="max-w-7xl mx-auto mb-8">
        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 class="text-2xl font-bold text-white mb-6">Aksi Cepat</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button 
              @click="goToSettings"
              class="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left group">
              <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <i class="fas fa-cog text-white"></i>
              </div>
              <div>
                <p class="text-white font-medium">Pengaturan</p>
                <p class="text-gray-400 text-sm">Kelola profil</p>
              </div>
            </button>

            <button 
              @click="refreshPage"
              class="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left group">
              <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <i class="fas fa-sync-alt text-white"></i>
              </div>
              <div>
                <p class="text-white font-medium">Refresh</p>
                <p class="text-gray-400 text-sm">Muat ulang data</p>
              </div>
            </button>

            <button 
              @click="showSystemInfo"
              class="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left group">
              <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <i class="fas fa-info-circle text-white"></i>
              </div>
              <div>
                <p class="text-white font-medium">Info Sistem</p>
                <p class="text-gray-400 text-sm">Detail aplikasi</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      <!-- System Info Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
           @click="closeModal">
        <div class="bg-gray-800 rounded-xl p-6 m-4 max-w-md w-full border border-gray-700"
             @click.stop>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-white">Informasi Sistem</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Nama Aplikasi:</span>
              <span class="text-white">Admin Dashboard</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Versi:</span>
              <span class="text-white">1.0.0</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Admin:</span>
              <span class="text-white">{{ profile.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Browser:</span>
              <span class="text-white">{{ getBrowserInfo() }}</span>
            </div>
          </div>
          <div class="mt-6">
            <button @click="closeModal" 
                    class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../layouts/DashboardLayout.vue'

export default {
  name: 'ProfilAdmin',
  components: { DashboardLayout },
  data() {
    return {
      profile: {
        name: ''
      },
      showModal: false
    }
  },
  mounted() {
    this.loadProfile()
  },
  methods: {
    loadProfile() {
      // Load profile from localStorage
      const admin = JSON.parse(localStorage.getItem('admin'))
      if (!admin) {
        this.$router.push('/admin')
        return
      }
      
      this.profile = {
        name: admin.name || 'Admin User'
      }
    },
    
    getInitials(name) {
      if (!name) return 'A'
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2)
    },
    
    getCurrentTime() {
      return new Date().toLocaleString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    
    getBrowserInfo() {
      const ua = navigator.userAgent
      if (ua.includes('Chrome')) return 'Chrome'
      if (ua.includes('Firefox')) return 'Firefox'
      if (ua.includes('Safari')) return 'Safari'
      if (ua.includes('Edge')) return 'Edge'
      return 'Unknown'
    },
    
    goToSettings() {
      this.$router.push('/admin/pengaturan')
    },
    
    refreshPage() {
      window.location.reload()
    },
    
    showSystemInfo() {
      this.showModal = true
    },
    
    closeModal() {
      this.showModal = false
    },
     }
}
</script>

<style scoped>
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>