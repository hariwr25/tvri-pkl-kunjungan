<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Mobile Overlay -->
    <div 
      v-if="!collapsed && isMobile" 
      @click="collapsed = true"
      class="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'flex flex-col bg-gray-800 border-r border-gray-700 transition-all duration-300 z-50 overflow-hidden',
        // Desktop: Normal behavior
        'lg:relative lg:translate-x-0',
        // Mobile: Sliding drawer
        'fixed top-0 left-0 h-full',
        collapsed 
          ? 'w-0 lg:w-20 -translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100' 
          : 'w-64 translate-x-0 opacity-100'
      ]"
    >
      <!-- Brand + Toggle -->
      <div class="border-b border-gray-700 flex-shrink-0">
        <!-- Expanded State -->
        <div v-if="!collapsed" class="flex justify-between items-center px-4 py-5 h-20">
          <div class="flex items-center gap-2 min-w-0">
            <div class="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img :src="require('@/assets/logo.png')" alt="TVRI Logo" class="w-full h-full object-contain">
            </div>
            <span class="text-xl font-bold text-indigo-400 truncate">Yogyakarta</span>
          </div>
          <button 
            @click="toggleSidebar" 
            class="text-gray-400 hover:text-white transition-colors flex-shrink-0 p-2 hover:bg-gray-700 rounded-lg"
            title="Tutup sidebar"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <!-- Collapsed State (Desktop Only) -->
        <div v-else class="hidden lg:flex flex-col items-center justify-center h-20 px-2">
          <button 
            @click="toggleSidebar" 
            class="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            title="Buka sidebar"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Menu Utama -->
      <div v-if="!collapsed" class="px-4 pt-6 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Utama
      </div>
      <nav class="flex-shrink-0" :class="collapsed ? 'px-2 pt-4' : 'px-3'">
        <router-link 
          to="/admin/dashboard" 
          class="menu-link"
          @click="handleMobileMenuClick"
        >
          <i class="fas fa-home" :class="collapsed ? 'text-xl' : 'text-base'"></i>
          <span v-if="!collapsed" class="truncate">Dashboard</span>
        </router-link>
      </nav>

      <!-- Menu Data -->
      <div v-if="!collapsed && hasDataMenu" class="px-4 pt-6 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Data
      </div>
      <nav class="flex-shrink-0" :class="collapsed ? 'px-2 pt-2' : 'px-3'">
        <!-- Data PKL -->
        <router-link 
          v-if="canAccessPkl" 
          to="/admin/pkl" 
          class="menu-link"
          @click="handleMobileMenuClick"
        >
          <i class="fas fa-clipboard-list" :class="collapsed ? 'text-xl' : 'text-base'"></i>
          <span v-if="!collapsed" class="truncate">Data PKL</span>
        </router-link>

        <!-- Data Kunjungan -->
        <router-link 
          v-if="canAccessKunjungan" 
          to="/admin/kunjungan" 
          class="menu-link"
          @click="handleMobileMenuClick"
        >
          <i class="fas fa-users" :class="collapsed ? 'text-xl' : 'text-base'"></i>
          <span v-if="!collapsed" class="truncate">Data Kunjungan</span>
        </router-link>

        <!-- Laporan -->
        <router-link 
          to="/admin/laporan" 
          class="menu-link"
          @click="handleMobileMenuClick"
        >
          <i class="fas fa-chart-bar" :class="collapsed ? 'text-xl' : 'text-base'"></i>
          <span v-if="!collapsed" class="truncate">Laporan</span>
        </router-link>
      </nav>

      <!-- Menu Pengaturan -->
      <div v-if="!collapsed" class="px-4 pt-6 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Pengaturan
      </div>
      <nav class="flex-shrink-0 mb-4" :class="collapsed ? 'px-2 pt-2' : 'px-3'">
        <router-link 
          to="/admin/users" 
          class="menu-link" 
          @click="handleMobileMenuClick"
        >
          <i class="fas fa-user-cog" :class="collapsed ? 'text-xl' : 'text-base'"></i>
          <span v-if="!collapsed" class="truncate">User Management</span>
        </router-link>
      </nav>

      <!-- Footer -->
      <div v-if="!collapsed" class="mt-auto p-4 border-t border-gray-700 flex-shrink-0">
        <div class="text-center space-y-2">
          <div class="text-xs text-gray-400 leading-relaxed">
            <div class="font-semibold text-indigo-300 mb-1">Sistem Pendaftaran</div>
            <div>PKL & Kunjungan</div>
            <div class="text-indigo-400 font-medium">TVRI Yogyakarta</div>
          </div>
          <div class="text-xs text-gray-500 pt-2 border-t border-gray-600">
            &copy; 2025 TVRI Yogyakarta
          </div>
        </div>
      </div>

      <!-- Footer Minimal (collapsed) -->
      <div v-else class="mt-auto p-3 border-t border-gray-700 hidden lg:flex flex-col items-center flex-shrink-0">
        <i class="fas fa-tv text-indigo-400 text-xl"></i>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col bg-gray-900 min-w-0 w-full lg:w-auto">
      <!-- Topbar -->
      <div class="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800 shadow-md">
        <!-- Hamburger Menu (Mobile) / Toggle Sidebar (Desktop when collapsed) + Page Title -->
        <div class="flex items-center gap-3">
          <!-- Mobile Hamburger -->
          <button 
            v-if="isMobile"
            @click="toggleSidebar" 
            class="lg:hidden text-gray-300 hover:text-white p-2 -ml-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Buka menu"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>
          
          <!-- Desktop Toggle (when sidebar collapsed) -->
          <button 
            v-if="!isMobile && collapsed"
            @click="toggleSidebar" 
            class="hidden lg:block text-gray-300 hover:text-white p-2 -ml-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Buka sidebar"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>
          
          <div class="text-base md:text-lg font-semibold truncate">
            {{ currentPageTitle }}
          </div>
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-2 md:gap-4">
          <!-- Notification -->
          <div class="relative">
            <button @click="toggleNotification" class="relative text-gray-300 hover:text-white p-2">
              <i class="fas fa-bell text-lg md:text-xl"></i>
              <span v-if="notifications.length" class="absolute top-0 right-0 bg-red-600 text-xs px-1 rounded-full min-w-[18px] text-center">
                {{ notifications.length > 9 ? '9+' : notifications.length }}
              </span>
            </button>
            <div 
              v-if="showNotifications" 
              class="absolute right-0 mt-2 w-64 md:w-72 bg-gray-700 rounded-md shadow-lg z-50 overflow-hidden"
            >
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
            <button @click="toggleProfileDropdown" class="flex items-center gap-2 hover:text-white focus:outline-none p-2">
              <i class="fas fa-user-circle text-xl md:text-2xl"></i>
              <span class="hidden md:inline text-sm">{{ userInfo.name || 'Admin' }}</span>
              <i class="fas fa-chevron-down text-xs hidden md:inline"></i>
            </button>
            <div v-if="showProfileDropdown" class="absolute right-0 mt-2 w-44 bg-gray-700 rounded-md shadow-lg z-50">
              <div class="px-4 py-2 text-xs text-gray-400 border-b border-gray-600">
                Logged in as <strong>{{ currentRole }}</strong>
              </div>
              <router-link to="/admin/profil" class="block px-4 py-2 text-sm hover:bg-gray-600" @click="showProfileDropdown = false">
                Lihat Profil
              </router-link>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm hover:bg-red-600">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Slot Content -->
      <div class="p-4 md:p-6 overflow-y-auto flex-1">
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
      collapsed: false, // Default expanded untuk desktop
      showProfileDropdown: false,
      showNotifications: false,
      notifications: [],
      socket: null,
      userInfo: {},
      currentRole: '',
      isMobile: false,
      hasBeenInitialized: false // Track initialization
    }
  },
  computed: {
    isSuperAdmin() {
      return this.currentRole === 'superadmin'
    },
    isAdminPkl() {
      return this.currentRole === 'adminpkl'
    },
    isAdminKunjungan() {
      return this.currentRole === 'adminkunjungan'
    },
    canAccessPkl() {
      return this.isSuperAdmin || this.isAdminPkl
    },
    canAccessKunjungan() {
      return this.isSuperAdmin || this.isAdminKunjungan
    },
    hasDataMenu() {
      return this.canAccessPkl || this.canAccessKunjungan
    },
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
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
    window.removeEventListener('resize', this.checkMobile)
    // Cleanup body overflow
    document.body.style.overflow = ''
  },
  methods: {
    checkMobile() {
      const wasMobile = this.isMobile
      this.isMobile = window.innerWidth < 1024
      
      // Hanya auto-collapse/expand saat pertama kali load atau saat resize melewati breakpoint
      if (!this.hasBeenInitialized) {
        // First load: collapse di mobile, expand di desktop
        this.collapsed = this.isMobile
        this.hasBeenInitialized = true
      } else if (wasMobile !== this.isMobile) {
        // Saat resize melewati breakpoint (mobile <-> desktop)
        this.collapsed = this.isMobile
      }
      // Jika user sudah manual toggle, biarkan state-nya tetap
    },

    handleMobileMenuClick() {
      // Auto-close sidebar setelah klik menu di mobile
      if (this.isMobile) {
        this.collapsed = true
        document.body.style.overflow = ''
      }
    },

    loadUserInfo() {
      try {
        const adminData = JSON.parse(localStorage.getItem('admin'))
        if (adminData) {
          this.userInfo = adminData
          this.currentRole = adminData.role || 'adminpkl'
        } else {
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
      
      // Jika di mobile dan sidebar dibuka, prevent body scroll
      if (this.isMobile && !this.collapsed) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
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
/* Menu Link Styles */
.menu-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 0.5rem;
  color: #e5e7eb;
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

/* Expanded menu link */
aside:not(.w-20):not(.w-0) .menu-link {
  justify-content: flex-start;
}

/* Collapsed menu link - centered icon */
aside.w-20 .menu-link {
  justify-content: center;
  gap: 0;
  padding: 0.875rem 0.5rem;
}

aside.w-20 .menu-link i {
  margin: 0;
}

/* Hover effects */
.menu-link:hover {
  background-color: #4f46e5;
  color: white;
}

/* Active state */
.router-link-active {
  background-color: #4f46e5 !important;
  color: white !important;
  font-weight: 500;
}

.router-link-active i {
  color: white !important;
}

/* Prevent text overflow */
.menu-link span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Icon sizing */
.menu-link i {
  flex-shrink: 0;
  width: 1.25rem;
  text-align: center;
}

/* Smooth transitions */
aside {
  transition: width 0.3s ease-in-out, transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

/* Backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Scrollbar styling */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>