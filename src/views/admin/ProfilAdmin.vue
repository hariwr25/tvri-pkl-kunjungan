<template>
  <DashboardLayout>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
  <header class="max-w-4xl mx-auto mb-6 lg:mb-8">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-50 mb-2">
      Profil Admin
    </h1>
    <p class="text-slate-400 text-sm lg:text-base">
      Informasi detail akun administrator
    </p>
  </header>
  
  <section class="max-w-4xl mx-auto mb-6 lg:mb-8">
    <div class="relative bg-gradient-to-br from-slate-900/95 via-blue-950/20 to-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/30">
      <!-- Vibrant Background Elements -->
      <div class="absolute inset-0">
        <!-- Colorful gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/10 to-slate-900/30"></div>
        <!-- Dynamic accent elements -->
        <div class="absolute top-8 right-16 w-40 h-40 bg-gradient-to-r from-blue-500/12 to-cyan-500/8 rounded-full blur-2xl"></div>
        <div class="absolute bottom-12 left-20 w-28 h-28 bg-gradient-to-r from-purple-500/8 to-pink-500/6 rounded-full blur-xl"></div>
        <div class="absolute top-20 left-1/3 w-16 h-16 bg-emerald-500/6 rounded-full blur-lg"></div>
        <!-- Subtle pattern overlay -->
        <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0); background-size: 24px 24px;"></div>
      </div>
      
      <div class="relative p-8 lg:p-10">
        <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
          <!-- Refined Avatar with Color -->
          <div class="relative group">
            <!-- Vibrant glow effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-purple-500/12 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <!-- Main avatar with gradient -->
            <div class="relative w-28 h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-slate-700/90 via-blue-600/20 to-slate-700/90 rounded-full flex items-center justify-center text-3xl lg:text-4xl font-bold text-slate-50 shadow-2xl border border-blue-500/20 group-hover:scale-[1.02] transition-all duration-500 ring-2 ring-blue-500/10">
              {{ adminInitials }}
            </div>
            
            <!-- Enhanced status indicator -->
            <div class="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-3 border-slate-800 flex items-center justify-center shadow-lg">
              <div class="w-2.5 h-2.5 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
          
          <!-- Clean Info Section -->
          <div class="flex-1 space-y-4">
            <div>
              <h2 class="text-3xl lg:text-4xl font-bold text-slate-50 mb-3 tracking-tight">
                {{ adminName }}
              </h2>
              <p class="text-slate-300 text-base lg:text-lg flex items-center gap-3">
                <i class="fas fa-envelope text-slate-400 text-sm"></i>
                {{ adminEmail }}
              </p>
            </div>
            
            <div class="flex flex-wrap items-center gap-4">
              <!-- Colorful Role Badge -->
              <span class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-200 border border-blue-500/30 backdrop-blur-sm">
                <i class="fas fa-shield-alt mr-2 text-blue-400 text-xs"></i>
                {{ adminRole }}
              </span>
              
              <!-- Enhanced Online Badge -->
              <div class="flex items-center gap-2 text-emerald-300 text-sm font-medium bg-gradient-to-r from-emerald-500/15 to-green-500/15 px-4 py-2 rounded-xl border border-emerald-400/25 backdrop-blur-sm">
                <div class="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse shadow-sm"></div>
                Online
              </div>
            </div>
          </div>
  
          <!-- Colorful Status Panel -->
          <div class="w-full lg:w-auto bg-gradient-to-br from-slate-800/50 via-purple-900/10 to-slate-800/50 backdrop-blur-sm rounded-xl p-6 lg:p-7 border border-slate-600/30 shadow-xl min-w-[200px] ring-1 ring-purple-500/10">
            <div class="text-center space-y-3">
              <div class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent font-mono">{{ currentTimeDisplay }}</div>
              <div class="text-xs text-slate-400 font-medium">Session: <span class="text-cyan-400">{{ sessionDurationDisplay }}</span></div>
              <div class="text-xs text-slate-300">{{ currentDateDisplay }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="max-w-4xl mx-auto mb-6 lg:mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <!-- Personal Information Card -->
      <div class="bg-gradient-to-br from-slate-900/95 via-blue-950/15 to-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl p-6 lg:p-7 border border-slate-700/30">
        <div class="flex items-center mb-6 lg:mb-7">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 rounded-xl flex items-center justify-center mr-4 border border-blue-500/20">
            <i class="fas fa-user text-blue-300"></i>
          </div>
          <div>
            <h3 class="text-xl lg:text-2xl font-bold text-slate-100">Informasi Personal</h3>
            <p class="text-sm text-slate-400">Data pribadi admin</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-blue-900/20 rounded-lg border border-blue-500/10 backdrop-blur-sm">
            <div class="flex items-center gap-3">
              <i class="fas fa-id-card text-blue-400 text-sm"></i>
              <span class="text-slate-300 text-sm font-medium">Nama Lengkap</span>
            </div>
            <span class="text-slate-100 text-sm font-semibold">{{ adminName }}</span>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-purple-900/20 rounded-lg border border-purple-500/10 backdrop-blur-sm">
            <div class="flex items-center gap-3">
              <i class="fas fa-at text-purple-400 text-sm"></i>
              <span class="text-slate-300 text-sm font-medium">Username</span>
            </div>
            <span class="text-slate-100 text-sm font-semibold">{{ adminUsername }}</span>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-cyan-900/20 rounded-lg border border-cyan-500/10 backdrop-blur-sm">
            <div class="flex items-center gap-3">
              <i class="fas fa-envelope text-cyan-400 text-sm"></i>
              <span class="text-slate-300 text-sm font-medium">Email</span>
            </div>
            <span class="text-slate-100 text-sm font-semibold">{{ adminEmail }}</span>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-indigo-900/20 rounded-lg border border-indigo-500/10 backdrop-blur-sm">
            <div class="flex items-center gap-3">
              <i class="fas fa-hashtag text-indigo-400 text-sm"></i>
              <span class="text-slate-300 text-sm font-medium">ID User</span>
            </div>
            <span class="text-indigo-400 text-sm font-mono font-semibold">#{{ adminId }}</span>
          </div>
        </div>
      </div>
  
      <!-- Account Information Card -->
      <div class="bg-gradient-to-br from-slate-900/95 via-emerald-950/15 to-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl p-6 lg:p-7 border border-slate-700/30">
        <div class="flex items-center mb-6 lg:mb-7">
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-600/30 to-green-600/30 rounded-xl flex items-center justify-center mr-4 border border-emerald-500/20">
            <i class="fas fa-shield-alt text-emerald-300"></i>
          </div>
          <div>
            <h3 class="text-xl lg:text-2xl font-bold text-slate-100">Informasi Akun</h3>
            <p class="text-sm text-slate-400">Status dan aktivitas</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-orange-900/20 rounded-lg border border-orange-500/10 backdrop-blur-sm">
            <div class="flex items-center gap-3">
              <i class="fas fa-user-tag text-orange-400 text-sm"></i>
              <span class="text-slate-300 text-sm font-medium">Role/Jabatan</span>
            </div>
            <span class="text-slate-100 text-sm font-semibold">{{ adminRole }}</span>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-violet-900/20 rounded-lg border border-violet-500/10 backdrop-blur-sm">
            <div class="flex items-center gap-3">
              <i class="fas fa-history text-violet-400 text-sm"></i>
              <span class="text-slate-300 text-sm font-medium">Terakhir Aktif</span>
            </div>
            <span class="text-slate-200 text-sm font-semibold">{{ getLastActiveTime() }}</span>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/15 to-green-500/15 rounded-lg border border-emerald-400/25 backdrop-blur-sm">
            <div class="flex items-center gap-3">
              <i class="fas fa-circle text-emerald-400 animate-pulse text-sm"></i>
              <span class="text-slate-300 text-sm font-medium">Status Akun</span>
            </div>
            <span class="text-emerald-300 text-sm font-semibold">Online - Aktif</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- System Information Section -->
  <section class="max-w-4xl mx-auto mb-6 lg:mb-8">
    <div class="bg-gradient-to-br from-slate-900/95 via-slate-800/50 to-slate-900/95 backdrop-blur-sm rounded-xl shadow-xl p-6 lg:p-7 border border-slate-700/30">
      <div class="flex items-center mb-6 lg:mb-7">
        <div class="w-11 h-11 bg-gradient-to-br from-slate-600/50 to-blue-600/30 rounded-lg flex items-center justify-center mr-4 border border-slate-600/30">
          <i class="fas fa-desktop text-slate-300"></i>
        </div>
        <h3 class="text-xl lg:text-2xl font-bold text-slate-100">Informasi Sistem</h3>
      </div>
      
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-5 bg-gradient-to-br from-slate-800/40 to-orange-900/20 rounded-lg border border-orange-500/15 backdrop-blur-sm hover:border-orange-500/25 transition-all duration-300">
          <i class="fas fa-globe text-orange-400 text-2xl mb-3"></i>
          <p class="text-slate-400 text-xs mb-2 font-medium">Browser</p>
          <p class="text-slate-100 text-sm font-semibold">{{ browserInfo }}</p>
        </div>
        
        <div class="text-center p-5 bg-gradient-to-br from-slate-800/40 to-green-900/20 rounded-lg border border-green-500/15 backdrop-blur-sm hover:border-green-500/25 transition-all duration-300">
          <i class="fas fa-clock text-green-400 text-2xl mb-3"></i>
          <p class="text-slate-400 text-xs mb-2 font-medium">Zona Waktu</p>
          <p class="text-slate-100 text-sm font-semibold">Asia/Jakarta</p>
        </div>
        
        <div class="text-center p-5 bg-gradient-to-br from-slate-800/40 to-blue-900/20 rounded-lg border border-blue-500/15 backdrop-blur-sm hover:border-blue-500/25 transition-all duration-300">
          <i class="fas fa-mobile-alt text-blue-400 text-2xl mb-3"></i>
          <p class="text-slate-400 text-xs mb-2 font-medium">Platform</p>
          <p class="text-slate-100 text-sm font-semibold">{{ platformInfo }}</p>
        </div>
        
        <div class="text-center p-5 bg-gradient-to-br from-slate-800/40 to-purple-900/20 rounded-lg border border-purple-500/15 backdrop-blur-sm hover:border-purple-500/25 transition-all duration-300">
          <i class="fas fa-code text-purple-400 text-2xl mb-3"></i>
          <p class="text-slate-400 text-xs mb-2 font-medium">Versi App</p>
          <p class="text-slate-100 text-sm font-semibold">v1.0.0</p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Action Button - Only Refresh -->
  <section class="max-w-4xl mx-auto mb-6">
    <div class="flex justify-center">
      <button @click="refreshProfile" 
              class="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600/20 to-green-600/20 hover:from-emerald-600/30 hover:to-green-600/30 text-emerald-200 hover:text-emerald-100 rounded-xl font-medium transition-all duration-300 border border-emerald-500/30 hover:border-emerald-400/50 group backdrop-blur-sm">
        <i class="fas fa-sync-alt text-emerald-400 group-hover:text-emerald-300 group-hover:rotate-180 transition-all duration-300"></i>
        <span>Refresh Profil</span>
      </button>
    </div>
  </section>
  
  <!-- Toast Notification -->
  <div v-if="toast.show" 
       class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 max-w-sm backdrop-blur-md"
       :class="toast.type === 'success' ? 'bg-emerald-600/90' : 'bg-red-600/90'"
  >
    <div class="flex items-center space-x-3">
      <i :class="toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
      <span class="text-white flex-1">{{ toast.message }}</span>
      <button @click="hideToast" class="text-white hover:text-slate-200 transition-colors">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
  
  <!-- Loading Overlay -->
  <div v-if="isLoading" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-slate-900/96 rounded-lg p-6 flex items-center space-x-4 border border-slate-700/40 backdrop-blur-md">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="text-slate-100">Memproses...</span>
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
        adminId: '',
        adminName: '',
        adminUsername: '',
        adminEmail: '',
        adminRole: '',
        currentTime: new Date(),
        loginTime: new Date(),
        timeInterval: null,
        todayLoginCount: 1,
        isLoading: false,
        toast: {
          show: false,
          message: '',
          type: 'success'
        }
      }
    },
    computed: {
      adminInitials() {
        if (!this.adminName) return 'A'
        return this.adminName
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase()
          .substring(0, 2)
      },
  
      currentTimeDisplay() {
        return this.currentTime.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      },
  
      currentDateDisplay() {
        return this.currentTime.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      },
  
      sessionDurationDisplay() {
        const diff = this.currentTime - this.loginTime
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
        if (hours > 0) {
          return `${hours}j ${minutes}m ${seconds}d`
        } else if (minutes > 0) {
          return `${minutes}m ${seconds}d`
        } else {
          return `${seconds}d`
        }
      },
  
      browserInfo() {
        const ua = navigator.userAgent
        if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome'
        if (ua.includes('Firefox')) return 'Firefox'
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
        if (ua.includes('Edg')) return 'Edge'
        return 'Unknown'
      },
  
      platformInfo() {
        const ua = navigator.userAgent
        if (ua.includes('Windows')) return 'Windows'
        if (ua.includes('Mac')) return 'macOS'
        if (ua.includes('Linux')) return 'Linux'
        if (ua.includes('Android')) return 'Android'
        return 'Desktop'
      }
    },
    mounted() {
      this.loadProfile()
      this.initializeSession()
  
      this.timeInterval = setInterval(() => {
        this.currentTime = new Date()
      }, 1000)
    },
  
    beforeUnmount() {
      if (this.timeInterval) {
        clearInterval(this.timeInterval)
      }
    },
  
    methods: {
      loadProfile() {
        try {
          const admin = JSON.parse(localStorage.getItem('admin'))
          if (!admin) {
            this.$router.push('/admin')
            return
          }
          
          this.adminId = admin.id || '1'
          this.adminName = admin.nama || admin.name || admin.username || 'Administrator'
          this.adminUsername = admin.username || 'admin'
          this.adminEmail = admin.email || 'admin@tvri.co.id'
          this.adminRole = this.formatRole(admin.role || 'admin')
          
        } catch (error) {
          console.error('Error loading profile:', error)
          this.showToast('Gagal memuat profil', 'error')
        }
      },
  
      initializeSession() {
        const loginTimeStored = localStorage.getItem('loginTime')
        if (loginTimeStored) {
          this.loginTime = new Date(loginTimeStored)
        } else {
          this.loginTime = new Date()
          localStorage.setItem('loginTime', this.loginTime.toISOString())
        }
  
        const today = new Date().toDateString()
        const storedCount = localStorage.getItem(`loginCount_${today}`)
        this.todayLoginCount = storedCount ? parseInt(storedCount) : 1
      },
  
      getLastActiveTime() {
        const now = new Date()
        const diff = now - this.currentTime
  
        if (diff < 30000) {
          return 'Baru saja'
        } else if (diff < 300000) {
          const minutes = Math.floor(diff / 60000)
          return `${minutes} menit lalu`
        } else {
          return 'Sedang aktif'
        }
      },
  
      formatRole(role) {
        const roles = {
          superadmin: 'Super Administrator',
          adminpkl: 'Administrator PKL',
          adminkunjungan: 'Administrator Kunjungan',
          admin: 'Administrator'
        }
        return roles[role] || 'Administrator'
      },
  
      refreshProfile() {
        this.loadProfile()
        this.showToast('Profil berhasil dimuat ulang', 'success')
      },
  
      showToast(message, type = 'success') {
        this.toast.message = message
        this.toast.type = type
        this.toast.show = true
  
        setTimeout(() => {
          this.hideToast()
        }, 3000)
      },
  
      hideToast() {
        this.toast.show = false
      }
    }
  }
  </script>
  
  <style scoped>
  /* Custom scrollbar untuk modal */
  .modal-content::-webkit-scrollbar {
    width: 6px;
  }
  
  .modal-content::-webkit-scrollbar-track {
    background: rgba(51, 65, 85, 0.3);
    border-radius: 3px;
  }
  
  .modal-content::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.5);
    border-radius: 3px;
  }
  
  .modal-content::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.7);
  }
  
  /* Animation untuk toast */
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .toast-enter-active {
    animation: slideInRight 0.3s ease-out;
  }
  
  .toast-leave-active {
    animation: slideInRight 0.3s ease-in reverse;
  }
  
  /* Hover effects untuk cards */
  .info-card {
    transition: all 0.3s ease;
  }
  
  .info-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  
  /* Focus states untuk accessibility */
  button:focus,
  input:focus {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    outline-offset: 2px;
  }
  
  /* Custom pulse animation */
  @keyframes customPulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  .animate-pulse {
    animation: customPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  /* Backdrop blur fallback */
  @supports not (backdrop-filter: blur(8px)) {
    .backdrop-blur-sm {
      background-color: rgba(15, 23, 42, 0.9);
    }
  
    .backdrop-blur-md {
      background-color: rgba(15, 23, 42, 0.95);
    }
  }
  
  /* Custom gradient text */
  .gradient-text {
    background: linear-gradient(135deg, #e2e8f0, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  /* Loading spinner enhancement */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  </style>