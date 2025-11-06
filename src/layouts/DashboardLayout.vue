<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <aside :class="['flex flex-col bg-gray-800 border-r border-gray-700 transition-all duration-300', collapsed ? 'w-20' : 'w-64']">
      <!-- Brand + Toggle -->
      <div class="flex justify-between items-center px-4 py-5 border-b border-gray-700">
        <div class="flex items-center gap-2">
          <div class="w-14 h-14 flex items-center justify-center">
            <img :src="require('@/assets/logo.png')" alt="TVRI Logo" class="w-full h-full object-contain">
          </div>
          <span v-if="!collapsed" class="text-2xl font-bold text-indigo-400">Yogyakarta</span>
        </div>
        <button @click="toggleSidebar" class="text-gray-400 hover:text-white">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- Menu Utama -->
      <div v-if="!collapsed" class="px-6 pt-6 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Utama</div>
      <nav class="px-2 space-y-1 text-sm font-medium">
        <router-link to="/admin/dashboard" class="menu-link">
          <i class="fas fa-home"></i>
          <span v-if="!collapsed">Dashboard</span>
        </router-link>
      </nav>

      <!-- Menu Data -->
      <div v-if="!collapsed && hasDataMenu" class="px-6 pt-6 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Data</div>
      <nav class="px-2 space-y-1 text-sm font-medium">
        <!-- Data PKL - Hanya untuk SuperAdmin & AdminPKL -->
        <router-link 
          v-if="canAccessPkl" 
          to="/admin/pkl" 
          class="menu-link"
        >
          <i class="fas fa-clipboard-list"></i>
          <span v-if="!collapsed">Data PKL</span>
        </router-link>

        <!-- Data Kunjungan - Hanya untuk SuperAdmin & AdminKunjungan -->
        <router-link 
          v-if="canAccessKunjungan" 
          to="/admin/kunjungan" 
          class="menu-link"
        >
          <i class="fas fa-users"></i>
          <span v-if="!collapsed">Data Kunjungan</span>
        </router-link>

        <!-- Laporan - Semua role bisa akses -->
        <router-link 
          to="/admin/laporan" 
          class="menu-link"
        >
          <i class="fas fa-chart-bar"></i>
          <span v-if="!collapsed">Laporan</span>
        </router-link>
      </nav>

      <!-- Menu Pengaturan - Tampil untuk semua role -->
      <div v-if="!collapsed" class="px-6 pt-6 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Pengaturan</div>
      <nav class="px-2 space-y-1 text-sm font-medium mb-4">
        <!-- User Management - Tampil untuk semua role -->
        <router-link to="/admin/users" class="menu-link">
          <i class="fas fa-user-cog"></i>
          <span v-if="!collapsed">User Management</span>
        </router-link>
      </nav>

      <!-- Footer Sederhana -->
      <div v-if="!collapsed" class="mt-auto p-4 border-t border-gray-700">
        <div class="text-center space-y-3">
          <!-- Informasi Web -->
          <div class="text-xs text-gray-400 leading-relaxed">
            <div class="font-semibold text-indigo-300 mb-1">Sistem Pendaftaran</div>
            <div>PKL & Kunjungan</div>
            <div class="text-indigo-400 font-medium">TVRI Yogyakarta</div>
          </div>
          
          <!-- Copyright -->
          <div class="text-xs text-gray-500 pt-2 border-t border-gray-600">
            &copy; 2024 TVRI Yogyakarta
          </div>
        </div>
      </div>

      <!-- Footer Minimal ketika sidebar collapsed -->
      <div v-else class="mt-auto p-3 border-t border-gray-700">
        <div class="text-center">
          <i class="fas fa-tv text-indigo-400 text-lg mb-1"></i>
          <div class="text-xs text-gray-400">TVRI</div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col bg-gray-900">
      <!-- Topbar -->
      <div class="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800 shadow-md">
        <!-- Page Title -->
        <div class="text-lg font-semibold">
          {{ currentPageTitle }}
        </div>

        <!-- Right Side: Notifications & Profile -->
        <div class="flex items-center gap-4">
          <!-- Notification -->
          <div class="relative">
            <button @click="toggleNotification" class="relative text-gray-300 hover:text-white">
              <i class="fas fa-bell text-xl"></i>
              <span v-if="notifications.length" class="absolute -top-1 -right-1 bg-red-600 text-xs px-1 rounded-full">{{ notifications.length }}</span>
            </button>
            <div v-if="showNotifications" class="absolute right-0 mt-2 w-64 bg-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
              <div v-if="notifications.length" class="divide-y divide-gray-600 max-h-64 overflow-y-auto">
                <div v-for="note in notifications" :key="note.id" class="px-4 py-3 hover:bg-gray-600">
                  <p class="text-sm">{{ note.pesan }}</p>
                  <p class="text-xs text-gray-400">{{ formatTanggal(note.waktu) }}</p>
                </div>
              </div>
              <div v-else class="p-4 text-sm text-center text-gray-400">Tidak ada notifikasi</div>
            </div>
          </div>

          <!-- Profile -->
          <div class="relative">
            <button @click="toggleProfileDropdown" class="flex items-center gap-2 hover:text-white focus:outline-none">
              <i class="fas fa-user-circle text-2xl"></i>
              <span class="hidden md:inline">{{ userInfo.name || 'Admin' }}</span>
              <i class="fas fa-chevron-down text-xs"></i>
            </button>
            <div v-if="showProfileDropdown" class="absolute right-0 mt-2 w-44 bg-gray-700 rounded-md shadow-lg z-50">
              <div class="px-4 py-2 text-xs text-gray-400 border-b border-gray-600">
                Logged in as <strong>{{ currentRole }}</strong>
              </div>
              <router-link to="/admin/profil" class="block px-4 py-2 text-sm hover:bg-gray-600">Lihat Profil</router-link>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm hover:bg-red-600">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Slot -->
      <div class="p-6 overflow-y-auto flex-1">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  name: 'DashboardLayout',
  data() {
    return {
      collapsed: false,
      showProfileDropdown: false,
      showNotifications: false,
      notifications: [],
      socket: null,
      userInfo: {},
      currentRole: ''
    }
  },
  computed: {
    // Role Checks
    isSuperAdmin() {
      return this.currentRole === 'superadmin'
    },
    isAdminPkl() {
      return this.currentRole === 'adminpkl'
    },
    isAdminKunjungan() {
      return this.currentRole === 'adminkunjungan'
    },

    // Permission Checks
    canAccessPkl() {
      return this.isSuperAdmin || this.isAdminPkl
    },
    canAccessKunjungan() {
      return this.isSuperAdmin || this.isAdminKunjungan
    },
    hasDataMenu() {
      return this.canAccessPkl || this.canAccessKunjungan
    },

    // Current Page Title
    currentPageTitle() {
      const routeName = this.$route.name
      const titles = {
        'DashboardAdmin': 'Dashboard',
        'DataPKL': 'Data PKL',
        'DataKunjungan': 'Data Kunjungan',
        'Laporan': 'Laporan',
        'Users': 'User Management',
        'ProfilAdmin': 'Profil'
      }
      return titles[routeName] || 'Admin Panel'
    }
  },
  mounted() {
    this.loadUserInfo()
    this.initSocket()
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  },
  methods: {
    loadUserInfo() {
      try {
        const adminData = JSON.parse(localStorage.getItem('admin'))
        if (adminData) {
          this.userInfo = adminData
          this.currentRole = adminData.role || 'adminpkl'
        } else {
          // Fallback ke logout jika tidak ada data user
          this.handleLogout()
        }
      } catch (error) {
        console.error('Error loading user info:', error)
        this.handleLogout()
      }
    },

    initSocket() {
      this.socket = io('http://localhost:5050')

      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket.id)
      })

      this.socket.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected:', reason)
      })

      this.socket.io.on('reconnect_attempt', () => {
        console.log('🔄 Socket reconnecting...')
      })

      this.socket.on('init-notifikasi', (data) => {
        this.notifications = data.sort((a, b) => new Date(b.waktu) - new Date(a.waktu))
      })

      this.socket.on('notifikasi-baru', (notif) => {
        this.notifications.unshift(notif)
      })
    },

    toggleSidebar() {
      this.collapsed = !this.collapsed
    },

    handleLogout() {
      localStorage.removeItem('admin')
      localStorage.removeItem('token')
      this.$router.push('/admin')
    },

    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown
      this.showNotifications = false
    },

    toggleNotification() {
      this.showNotifications = !this.showNotifications
      this.showProfileDropdown = false
    },

    formatTanggal(waktu) {
      const d = new Date(waktu)
      return d.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.menu-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #e5e7eb;
  transition: background-color 0.2s;
}
.menu-link:hover {
  background-color: #4f46e5;
  color: white;
}
.router-link-active {
  background-color: #4f46e5 !important;
  color: white !important;
}
</style>