<template>
    <DashboardLayout>
      <div class="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
        <!-- Header -->
        <header class="max-w-7xl mx-auto mb-8">
          <h1 class="text-4xl font-extrabold tracking-tight text-white mb-2">Pengaturan</h1>
          <p class="text-gray-400">Kelola pengaturan akun dan kata sandi Anda</p>
        </header>
  
        <!-- Profile Settings -->
        <section class="max-w-7xl mx-auto mb-8">
          <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
            <h2 class="text-2xl font-bold text-white mb-6">Pengaturan Profil</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Nama -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                <input
                  v-model="profileForm.name"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Masukkan nama lengkap"
                  :disabled="isProfileLoading"
                >
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
              </div>
              
              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  v-model="profileForm.email"
                  type="email"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Masukkan email"
                  :disabled="isProfileLoading"
                >
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button
                @click="updateProfile"
                :disabled="isProfileLoading"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                <i class="fas fa-save text-sm"></i>
                {{ isProfileLoading ? 'Menyimpan...' : 'Simpan Profil' }}
              </button>
            </div>
          </div>
        </section>
  
        <!-- Change Password -->
        <section class="max-w-7xl mx-auto mb-8">
          <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
            <h2 class="text-2xl font-bold text-white mb-6">Ganti Kata Sandi</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Current Password -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Kata Sandi Saat Ini</label>
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Masukkan kata sandi saat ini"
                  :disabled="isPasswordLoading"
                >
                <p v-if="errors.currentPassword" class="text-red-500 text-sm mt-1">{{ errors.currentPassword }}</p>
              </div>
              
              <!-- New Password -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Kata Sandi Baru</label>
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Masukkan kata sandi baru"
                  :disabled="isPasswordLoading"
                >
                <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">{{ errors.newPassword }}</p>
              </div>
              
              <!-- Confirm New Password -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Konfirmasi Kata Sandi Baru</label>
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Konfirmasi kata sandi baru"
                  :disabled="isPasswordLoading"
                >
                <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button
                @click="changePassword"
                :disabled="isPasswordLoading"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                <i class="fas fa-lock text-sm"></i>
                {{ isPasswordLoading ? 'Mengganti...' : 'Ganti Kata Sandi' }}
              </button>
            </div>
          </div>
        </section>
  
        <!-- Notification Toast -->
        <div
          v-if="notification.message"
          class="fixed bottom-4 right-4 bg-gray-800 border-l-4 p-4 rounded-lg shadow-lg max-w-sm"
          :class="{
            'border-green-500': notification.type === 'success',
            'border-red-500': notification.type === 'error'
          }"
        >
          <div class="flex items-center gap-2">
            <i
              :class="{
                'fas fa-check-circle text-green-500': notification.type === 'success',
                'fas fa-exclamation-circle text-red-500': notification.type === 'error'
              }"
            ></i>
            <p class="text-sm text-gray-200">{{ notification.message }}</p>
          </div>
        </div>
  
        <!-- Loading Overlay -->
        <div v-if="isProfileLoading || isPasswordLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-gray-800 rounded-lg p-6 flex items-center space-x-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <span class="text-white">Memproses...</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  </template>
  
  <script>
  import axios from 'axios'
  import DashboardLayout from '../../layouts/DashboardLayout.vue'
  
  export default {
    name: 'PengaturanAdmin',
    components: { DashboardLayout },
    data() {
      return {
        profileForm: {
          name: '',
          email: ''
        },
        passwordForm: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        errors: {
          name: '',
          email: '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        notification: {
          message: '',
          type: '' // 'success' or 'error'
        },
        isProfileLoading: false,
        isPasswordLoading: false
      }
    },
    async mounted() {
      await this.loadProfile()
    },
    methods: {
      async loadProfile() {
        try {
          const admin = JSON.parse(localStorage.getItem('admin'))
          if (!admin) {
            this.$router.push('/admin')
            return
          }
          this.profileForm.name = admin.name || ''
          this.profileForm.email = admin.email || ''
        } catch (error) {
          console.error('Error loading profile:', error)
          this.showNotification('Gagal memuat data profil', 'error')
        }
      },
  
      async updateProfile() {
        this.clearErrors()
        if (!this.validateProfileForm()) return
  
        this.isProfileLoading = true
        try {
          await axios.put('/api/admin/profile', this.profileForm)
          const updatedAdmin = {
            ...JSON.parse(localStorage.getItem('admin')),
            name: this.profileForm.name,
            email: this.profileForm.email
          }
          localStorage.setItem('admin', JSON.stringify(updatedAdmin))
          this.showNotification('Profil berhasil diperbarui', 'success')
        } catch (error) {
          console.error('Error updating profile:', error)
          this.showNotification('Gagal memperbarui profil', 'error')
        }
        this.isProfileLoading = false
      },
  
      async changePassword() {
        this.clearErrors()
        if (!this.validatePasswordForm()) return
  
        this.isPasswordLoading = true
        try {
          await axios.post('/api/admin/change-password', {
            current_password: this.passwordForm.currentPassword,
            new_password: this.passwordForm.newPassword
          })
          this.showNotification('Kata sandi berhasil diubah', 'success')
          this.clearPasswordForm()
        } catch (error) {
          console.error('Error changing password:', error)
          this.showNotification('Gagal mengubah kata sandi', 'error')
        }
        this.isPasswordLoading = false
      },
  
      validateProfileForm() {
        let isValid = true
        if (!this.profileForm.name) {
          this.errors.name = 'Nama lengkap wajib diisi'
          isValid = false
        }
        if (!this.profileForm.email) {
          this.errors.email = 'Email wajib diisi'
          isValid = false
        } else if (!this.validateEmail(this.profileForm.email)) {
          this.errors.email = 'Format email tidak valid'
          isValid = false
        }
        return isValid
      },
  
      validatePasswordForm() {
        let isValid = true
        if (!this.passwordForm.currentPassword) {
          this.errors.currentPassword = 'Kata sandi saat ini wajib diisi'
          isValid = false
        }
        if (!this.passwordForm.newPassword) {
          this.errors.newPassword = 'Kata sandi baru wajib diisi'
          isValid = false
        } else if (this.passwordForm.newPassword.length < 6) {
          this.errors.newPassword = 'Kata sandi baru minimal 6 karakter'
          isValid = false
        }
        if (!this.passwordForm.confirmPassword) {
          this.errors.confirmPassword = 'Konfirmasi kata sandi wajib diisi'
          isValid = false
        } else if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
          this.errors.confirmPassword = 'Konfirmasi kata sandi tidak cocok'
          isValid = false
        }
        return isValid
      },
  
      validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
      },
  
      clearErrors() {
        this.errors = {
          name: '',
          email: '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      },
  
      clearPasswordForm() {
        this.passwordForm.currentPassword = ''
        this.passwordForm.newPassword = ''
        this.passwordForm.confirmPassword = ''
      },
  
      showNotification(message, type) {
        this.notification.message = message
        this.notification.type = type
        setTimeout(() => {
          this.notification.message = ''
          this.notification.type = ''
        }, 3000)
      }
    }
  }
  </script>
  
  <style scoped>
  section > div {
    transition: all 0.2s ease;
  }
  
  input:disabled, button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  </style>