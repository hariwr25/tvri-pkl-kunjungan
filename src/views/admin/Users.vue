<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <!-- Header -->
      <header class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-white mb-2">Manajemen User</h1>
          <p class="text-gray-400">Kelola data pengguna sistem</p>
        </div>
        <div class="flex items-center space-x-4">
          <button 
            @click="showAddUserModal = true"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center gap-2"
          >
            <i class="fas fa-plus text-sm"></i>
            Tambah User
          </button>
        </div>
      </header>

      <!-- Filter -->
      <section class="max-w-7xl mx-auto mb-8">
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <!-- Search -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Cari User</label>
              <div class="relative">
                <input 
                  v-model="filters.search"
                  type="text"
                  placeholder="Nama, email, atau username"
                  class="w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
                <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            
            <!-- Filter Role -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <select 
                v-model="filters.role"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="all">Semua Role</option>
                <option value="superadmin">Super Admin</option>
                <option value="adminpkl">Admin PKL</option>
                <option value="adminkunjungan">Admin Kunjungan</option>
              </select>
            </div>
            
            <!-- Actions -->
            <div class="flex space-x-2">
              <button 
                @click="applyFilters"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                <i class="fas fa-filter text-sm"></i>
                Filter
              </button>
              <button 
                @click="resetFilters"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                <i class="fas fa-sync-alt text-sm"></i>
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Tabel User -->
      <section class="max-w-7xl mx-auto mb-8">
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-white">Daftar User</h2>
            <span class="text-sm text-gray-400">{{ filteredUsers.length }} user ditemukan</span>
          </div>
          
          <div class="overflow-x-auto">
            <table v-if="filteredUsers.length > 0" class="min-w-full text-sm text-gray-300">
              <thead>
                <tr>
                  <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">No</th>
                  <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">Nama</th>
                  <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">Username</th>
                  <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">Email</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Role</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Status</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) in filteredUsers"
                  :key="user.id"
                  class="hover:bg-gray-700 transition cursor-default"
                >
                  <td class="py-4 px-6">{{ index + 1 }}</td>
                  <td class="py-4 px-6">{{ user.nama }}</td>
                  <td class="py-4 px-6">{{ user.username }}</td>
                  <td class="py-4 px-6">{{ user.email }}</td>
                  <td class="py-4 px-6 text-center">
                    <span :class="getRoleBadgeClass(user.role)">
                      {{ formatRole(user.role) }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-center">
                    <span :class="user.aktif ? 'bg-green-600' : 'bg-red-600'" class="px-2 py-1 rounded-full text-xs">
                      {{ user.aktif ? 'Aktif' : 'Nonaktif' }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-center">
                    <div class="flex justify-center space-x-2">
                      <button 
                        @click="editUser(user)"
                        class="p-1.5 text-indigo-400 hover:text-indigo-300 transition"
                        title="Edit"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button 
                        @click="confirmToggleStatus(user)"
                        :class="user.aktif ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'"
                        class="p-1.5 transition"
                        :title="user.aktif ? 'Nonaktifkan' : 'Aktifkan'"
                      >
                        <i :class="user.aktif ? 'fas fa-ban' : 'fas fa-check'"></i>
                      </button>
                      <button 
                        @click="confirmDelete(user)"
                        class="p-1.5 text-red-500 hover:text-red-400 transition"
                        title="Hapus"
                        v-if="user.id !== currentUser.id"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="text-center py-8 text-gray-400">
              Tidak ada user yang sesuai dengan filter
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex justify-between items-center mt-6">
            <div class="text-sm text-gray-400">
              Menampilkan {{ filteredUsers.length }} dari {{ users.length }} user
            </div>
            <div class="flex space-x-2">
              <button 
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 bg-gray-700 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              <span class="px-3 py-1 bg-indigo-600 rounded-lg">
                {{ currentPage }}
              </span>
              <button 
                @click="nextPage"
                :disabled="currentPage * itemsPerPage >= filteredUsers.length"
                class="px-3 py-1 bg-gray-700 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal Tambah/Edit User -->
      <div v-if="showAddUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-white">
              {{ editingUser ? 'Edit User' : 'Tambah User Baru' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="submitUser">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                <input 
                  v-model="userForm.nama"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input 
                  v-model="userForm.username"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  v-model="userForm.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select 
                  v-model="userForm.role"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="superadmin">Super Admin</option>
                  <option value="adminpkl">Admin PKL</option>
                  <option value="adminkunjungan">Admin Kunjungan</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input 
                  v-model="userForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  :required="!editingUser"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                >
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="mt-2 text-xs text-gray-400 hover:text-white"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  {{ showPassword ? 'Sembunyikan' : 'Tampilkan' }} password
                </button>
              </div>
              
              <div class="flex items-center">
                <input 
                  v-model="userForm.aktif"
                  type="checkbox"
                  id="aktif"
                  class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                >
                <label for="aktif" class="ml-2 text-sm font-medium text-gray-300">Aktif</label>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button 
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
              >
                Batal
              </button>
              <button 
                type="submit"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
              >
                {{ editingUser ? 'Update' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Konfirmasi Hapus -->
      <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
          <div class="text-center">
            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <h3 class="text-xl font-bold text-white mb-2">Konfirmasi Hapus User</h3>
            <p class="text-gray-300 mb-6">
              Anda yakin ingin menghapus user <span class="font-semibold">{{ userToDelete.nama }}</span>?
              Aksi ini tidak dapat dibatalkan.
            </p>
            
            <div class="flex justify-center space-x-4">
              <button 
                @click="showDeleteConfirmation = false"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
              >
                Batal
              </button>
              <button 
                @click="deleteUser"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-gray-800 rounded-lg p-6 flex items-center space-x-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span class="text-white">Memuat data user...</span>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import axios from 'axios'
import DashboardLayout from '../../layouts/DashboardLayout.vue'

export default {
  name: 'UsersAdmin',
  components: { DashboardLayout },
  data() {
    return {
      users: [],
      currentUser: {},
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 10,
      filters: {
        search: '',
        role: 'all'
      },
      showAddUserModal: false,
      editingUser: null,
      userForm: {
        nama: '',
        username: '',
        email: '',
        role: 'adminpkl',
        password: '',
        aktif: true
      },
      showPassword: false,
      showDeleteConfirmation: false,
      userToDelete: null
    }
  },
  computed: {
    filteredUsers() {
      let result = this.users
      
      // Filter by search
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase()
        result = result.filter(user => 
          user.nama.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        )
      }
      
      // Filter by role
      if (this.filters.role !== 'all') {
        result = result.filter(user => user.role === this.filters.role)
      }
      
      return result
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    }
  },
  async mounted() {
    await this.loadUsers()
    const admin = JSON.parse(localStorage.getItem('admin'))
    this.currentUser = admin || {}
  },
  methods: {
    async loadUsers() {
      this.isLoading = true
      try {
        const response = await axios.get('/api/users')
        this.users = response.data || []
      } catch (error) {
        console.error('Error loading users:', error)
        this.users = []
      }
      this.isLoading = false
    },
    
    applyFilters() {
      this.currentPage = 1
    },
    
    resetFilters() {
      this.filters = {
        search: '',
        role: 'all'
      }
      this.currentPage = 1
    },
    
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.filteredUsers.length) {
        this.currentPage++
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    
    editUser(user) {
      this.editingUser = user
      this.userForm = {
        nama: user.nama,
        username: user.username,
        email: user.email,
        role: user.role,
        password: '',
        aktif: user.aktif
      }
      this.showAddUserModal = true
    },
    
    async submitUser() {
      try {
        this.isLoading = true
        
        if (this.editingUser) {
          // Update user
          const payload = { ...this.userForm }
          if (!payload.password) delete payload.password
          
          await axios.put(`/api/users/${this.editingUser.id}`, payload)
          this.$toast.success('User berhasil diupdate')
        } else {
          // Create new user
          await axios.post('/api/users', this.userForm)
          this.$toast.success('User baru berhasil ditambahkan')
        }
        
        await this.loadUsers()
        this.closeModal()
      } catch (error) {
        console.error('Error saving user:', error)
        this.$toast.error('Gagal menyimpan user: ' + (error.response?.data?.message || error.message))
      } finally {
        this.isLoading = false
      }
    },
    
    confirmDelete(user) {
      this.userToDelete = user
      this.showDeleteConfirmation = true
    },
    
    async deleteUser() {
      try {
        this.isLoading = true
        await axios.delete(`/api/users/${this.userToDelete.id}`)
        this.$toast.success('User berhasil dihapus')
        await this.loadUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
        this.$toast.error('Gagal menghapus user: ' + (error.response?.data?.message || error.message))
      } finally {
        this.isLoading = false
        this.showDeleteConfirmation = false
        this.userToDelete = null
      }
    },
    
    confirmToggleStatus(user) {
  this.userToToggle = user
  this.$toast.question(
    `Anda yakin ingin ${user.aktif ? 'menonaktifkan' : 'mengaktifkan'} user ${user.nama}?`,
    'Konfirmasi',
    {
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'toggle-user',
      zindex: 999,
      position: 'center',
      buttons: [
        ['<button><b>Ya</b></button>', async (instance, toast) => {
          await this.toggleUserStatus()
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
        }, true],
        ['<button>Tidak</button>', function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
        }]
      ] // <<== ini penutup array
    }    // <<== ini penutup objek
  )
},

    
    async toggleUserStatus() {
      try {
        this.isLoading = true
        await axios.patch(`/api/users/${this.userToToggle.id}/toggle-status`)
        this.$toast.success(`User berhasil ${this.userToToggle.aktif ? 'dinonaktifkan' : 'diaktifkan'}`)
        await this.loadUsers()
      } catch (error) {
        console.error('Error toggling user status:', error)
        this.$toast.error('Gagal mengubah status user: ' + (error.response?.data?.message || error.message))
      } finally {
        this.isLoading = false
        this.userToToggle = null
      }
    },
    
    closeModal() {
      this.showAddUserModal = false
      this.editingUser = null
      this.userForm = {
        nama: '',
        username: '',
        email: '',
        role: 'adminpkl',
        password: '',
        aktif: true
      }
      this.showPassword = false
    },
    
    formatRole(role) {
      const roles = {
        superadmin: 'Super Admin',
        adminpkl: 'Admin PKL',
        adminkunjungan: 'Admin Kunjungan'
      }
      return roles[role] || role
    },
    
    getRoleBadgeClass(role) {
      const classes = {
        superadmin: 'bg-purple-600',
        adminpkl: 'bg-indigo-600',
        adminkunjungan: 'bg-green-600'
      }
      return `${classes[role] || 'bg-gray-600'} px-2 py-1 rounded-full text-xs`
    }
  }
}
</script>

<style scoped>
section > table {
  border-collapse: separate;
  border-spacing: 0 12px;
  width: 100%;
  font-size: 0.95rem;
  color: #D1D5DB;
}

thead tr {
  text-transform: uppercase;
  font-weight: 600;
  color: #9CA3AF;
  border-bottom: 2px solid #374151;
}

tbody tr {
  background: #1F2937;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgb(0 0 0 / 0.3);
  transition: all 0.2s ease;
}

tbody tr:hover {
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.5);
  transform: translateY(-3px);
}

td, th {
  padding: 1rem 1.25rem;
  vertical-align: middle;
  text-align: left;
  border: none !important;
}
</style>