<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <!-- Header -->
      <header class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
        <div class="w-full lg:w-auto">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {{ isSuperAdmin ? 'Manajemen User' : 'Ganti Password' }}
          </h1>
          <p class="text-gray-400 text-sm lg:text-base">
            {{ isSuperAdmin ? 'Kelola data pengguna sistem dan hak akses' : 'Ubah password akun Anda' }}
          </p>
        </div>
        <div class="flex items-center space-x-2 lg:space-x-4 w-full lg:w-auto justify-end">
          <!-- Quick Stats - Hanya untuk superadmin -->
          <div v-if="isSuperAdmin" class="flex items-center bg-gray-800 rounded-xl shadow-inner border border-gray-700 px-3 lg:px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-5 lg:w-5 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
            </svg>
            <span class="text-xs lg:text-sm font-medium text-gray-300">{{ users.length }} User</span>
          </div>

          <!-- Add User Button - Hanya untuk superadmin -->
          <button 
            v-if="isSuperAdmin"
            @click="showAddUserModal = true"
            class="px-3 lg:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center gap-1.5 text-xs lg:text-sm"
          >
            <i class="fas fa-user-plus text-xs"></i>
            <span class="hidden sm:inline">Tambah User</span>
            <span class="sm:hidden">Tambah</span>
          </button>

          <!-- Change Password Button - Untuk non-superadmin -->
          <button 
            v-if="!isSuperAdmin"
            @click="showChangePasswordModal = true"
            class="px-3 lg:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center gap-1.5 text-xs lg:text-sm"
          >
            <i class="fas fa-key text-xs"></i>
            <span class="hidden sm:inline">Ganti Password</span>
            <span class="sm:hidden">Password</span>
          </button>
        </div>
      </header>

      <!-- Tabel User - Hanya untuk superadmin -->
      <section v-if="isSuperAdmin" class="max-w-7xl mx-auto mb-6 lg:mb-8">
        <div class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700">
          <!-- Table Header with Role Filter Pills -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-4">
            <div>
              <h2 class="text-xl lg:text-2xl font-bold text-white">Daftar User</h2>
              <p class="text-xs lg:text-sm text-gray-400 mt-1">
                Menampilkan {{ filteredUsers.length }} dari {{ users.length }} user total
              </p>
            </div>
            
            <!-- Quick Role Filter Pills -->
            <div class="flex items-center gap-2 flex-wrap">
              <button
                v-for="roleOption in roleOptions"
                :key="roleOption.value"
                @click="quickFilterByRole(roleOption.value)"
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium transition-all',
                  currentRoleFilter === roleOption.value 
                    ? roleOption.activeClass 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
              >
                <i :class="roleOption.icon" class="mr-1"></i>
                {{ roleOption.label }}
                <span class="ml-1 opacity-75">({{ getUserCountByRole(roleOption.value === 'all' ? null : roleOption.value) }})</span>
              </button>
            </div>
          </div>
          
          <!-- Mobile Card View -->
          <div class="block lg:hidden space-y-4">
            <div
              v-for="user in paginatedUsers"
              :key="user.id"
              class="bg-gray-700 rounded-lg p-4 border border-gray-600 transition hover:bg-gray-600 hover:border-gray-500"
            >
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <h3 class="font-semibold text-white text-sm lg:text-base">{{ user.nama || user.username }}</h3>
                  <p class="text-xs lg:text-sm text-gray-400">@{{ user.username }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span :class="getRoleBadgeClass(user.role)">
                    {{ formatRole(user.role) }}
                  </span>
                </div>
              </div>
              
              <div class="space-y-2 mb-4">
                <p class="text-xs lg:text-sm text-gray-300 flex items-center gap-2">
                  <i class="fas fa-envelope w-3 h-3 text-gray-400"></i>
                  {{ user.email }}
                </p>
                <div class="flex items-center justify-between text-xs text-gray-400">
                  <span>ID: #{{ user.id }}</span>
                  <!-- ❌ HAPUS BAGIAN TERAKHIR LOGIN -->
                </div>
              </div>
              
              <div class="flex justify-end space-x-2 pt-3 border-t border-gray-600">
                <button 
                  @click="editUser(user)"
                  class="p-2 text-indigo-400 hover:text-indigo-300 transition"
                  title="Edit"
                >
                  <i class="fas fa-edit text-sm"></i>
                </button>
                <button 
                  @click="confirmDelete(user)"
                  class="p-2 text-red-500 hover:text-red-400 transition"
                  title="Hapus"
                  v-if="user.id !== currentUser.id"
                >
                  <i class="fas fa-trash-alt text-sm"></i>
                </button>
              </div>
            </div>
            
            <div v-if="users.length === 0" class="text-center py-12 text-gray-400">
              <div class="bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-users text-3xl text-gray-500"></i>
              </div>
              <h3 class="text-lg font-medium mb-2">Tidak ada user ditemukan</h3>
              <p class="text-sm">Klik tombol Tambah User untuk menambah user baru</p>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto -mx-4 lg:-mx-6">
            <div class="min-w-full inline-block align-middle px-4 lg:px-6">
              <table v-if="users.length > 0" class="min-w-full text-sm text-gray-300">
                <thead>
                  <tr>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-left font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[200px]">
                      User
                    </th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-left font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[200px]">
                      Email
                    </th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[150px]">
                      Role
                    </th>
                    <!-- ❌ HAPUS KOLOM TERAKHIR LOGIN -->
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[150px]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="user in paginatedUsers"
                    :key="user.id"
                    class="hover:bg-gray-700 transition cursor-default"
                  >
                    <td class="py-3 lg:py-4 px-2 lg:px-6">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {{ (user.nama || user.username).charAt(0).toUpperCase() }}
                        </div>
                        <div>
                          <p class="font-medium text-white">{{ user.nama || user.username }}</p>
                          <p class="text-xs text-gray-400">@{{ user.username }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">
                      {{ user.email }}
                    </td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center">
                      <span :class="getRoleBadgeClass(user.role)">
                        <i :class="getRoleIcon(user.role)" class="mr-1"></i>
                        {{ formatRole(user.role) }}
                      </span>
                    </td>
                    <!-- ❌ HAPUS SEL TERAKHIR LOGIN -->
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center">
                      <div class="flex justify-center items-center gap-1">
                        <button 
                          @click="editUser(user)"
                          class="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-gray-600 rounded transition"
                          title="Edit"
                        >
                          <i class="fas fa-edit text-sm"></i>
                        </button>
                        <button 
                          @click="confirmDelete(user)"
                          class="p-2 text-red-500 hover:text-red-400 hover:bg-gray-600 rounded transition"
                          title="Hapus"
                          v-if="user.id !== currentUser.id"
                        >
                          <i class="fas fa-trash-alt text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="text-center py-12 text-gray-400">
                <div class="bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-users text-3xl text-gray-500"></i>
                </div>
                <h3 class="text-lg font-medium mb-2">Tidak ada user ditemukan</h3>
                <p class="text-sm">Klik tombol Tambah User untuk menambah user baru</p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex flex-col sm:flex-row justify-between items-center mt-4 lg:mt-6 gap-4" v-if="filteredUsers.length > 0">
            <div class="text-xs lg:text-sm text-gray-400 order-2 sm:order-1">
              Menampilkan {{ Math.min(itemsPerPage, filteredUsers.length) }} dari {{ filteredUsers.length }} user
            </div>
            <div class="flex items-center space-x-2 order-1 sm:order-2">
              <button 
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 bg-gray-700 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg text-sm transition-colors hover:bg-gray-600"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="flex items-center space-x-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'px-3 py-1 rounded-lg text-sm transition-colors',
                    currentPage === page 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              <button 
                @click="nextPage"
                :disabled="currentPage * itemsPerPage >= filteredUsers.length"
                class="px-3 py-1 bg-gray-700 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg text-sm transition-colors hover:bg-gray-600"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Change Password Section untuk non-superadmin -->
      <section v-if="!isSuperAdmin" class="max-w-2xl mx-auto">
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {{ currentUser.nama?.charAt(0)?.toUpperCase() || currentUser.username?.charAt(0)?.toUpperCase() }}
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">{{ currentUser.nama || currentUser.username }}</h2>
              <p class="text-gray-400 text-sm">@{{ currentUser.username }} • {{ formatRole(currentUser.role) }}</p>
            </div>
          </div>

          <!-- Informasi Keamanan -->
          <div class="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-3">
              <i class="fas fa-shield-alt text-blue-400 text-lg"></i>
              <div>
                <p class="text-white text-sm font-medium">Keamanan Akun</p>
                <p class="text-blue-300 text-xs">Pastikan password baru Anda kuat dan berbeda dari password sebelumnya</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="changeOwnPassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Password Saat Ini</label>
              <div class="relative">
                <input 
                  v-model="passwordForm.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Masukkan password saat ini"
                >
                <button 
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Password Baru</label>
              <div class="relative">
                <input 
                  v-model="passwordForm.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  minlength="6"
                  class="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Minimal 6 karakter"
                >
                <button 
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div class="mt-2 space-y-1">
                <p class="text-xs text-gray-400" :class="{'text-green-400': passwordForm.newPassword.length >= 6}">
                  ✓ Minimal 6 karakter
                </p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Konfirmasi Password Baru</label>
              <div class="relative">
                <input 
                  v-model="passwordForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Ulangi password baru"
                >
                <button 
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <p v-if="passwordForm.newPassword !== passwordForm.confirmPassword && passwordForm.confirmPassword" 
                 class="text-red-400 text-xs mt-1 flex items-center">
                <i class="fas fa-exclamation-circle mr-1"></i>
                Password tidak cocok
              </p>
              <p v-else-if="passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.confirmPassword" 
                 class="text-green-400 text-xs mt-1 flex items-center">
                <i class="fas fa-check-circle mr-1"></i>
                Password cocok
              </p>
            </div>

            <button 
              type="submit"
              :disabled="isLoading || passwordForm.newPassword !== passwordForm.confirmPassword || !passwordForm.currentPassword || !passwordForm.newPassword || passwordForm.newPassword.length < 6"
              class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition flex items-center justify-center"
            >
              <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin mr-2"></i>Memproses...
              </span>
              <span v-else>
                <i class="fas fa-key mr-2"></i>Ganti Password
              </span>
            </button>
          </form>

          <!-- Debug Info -->
          <div v-if="debugMode" class="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 class="text-sm font-medium text-yellow-400 mb-2">Debug Info:</h3>
            <pre class="text-xs text-gray-300">{{ debugInfo }}</pre>
          </div>
        </div>
      </section>

      <!-- Modal Tambah/Edit User - Hanya untuk superadmin -->
      <div v-if="showAddUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-800 rounded-xl shadow-2xl p-4 lg:p-6 w-full max-w-md max-h-screen overflow-y-auto border border-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg lg:text-xl font-bold text-white">
              {{ editingUser ? 'Edit User' : 'Tambah User Baru' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="submitUser">
            <div class="space-y-4">
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                <input 
                  v-model="userForm.nama"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm lg:text-base transition-colors"
                >
              </div>
              
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-300 mb-2">Username</label>
                <input 
                  v-model="userForm.username"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm lg:text-base transition-colors"
                >
              </div>
              
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  v-model="userForm.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm lg:text-base transition-colors"
                >
              </div>
              
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-300 mb-2">Role</label>
                <select 
                  v-model="userForm.role"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm lg:text-base transition-colors"
                >
                  <option value="superadmin">Super Admin</option>
                  <option value="adminpkl">Admin PKL</option>
                  <option value="adminkunjungan">Admin Kunjungan</option>
                </select>
              </div>
              
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-300 mb-2">Password</label>
                <div class="relative">
                  <input 
                    v-model="userForm.password"
                    :type="showPassword ? 'text' : 'password'"
                    :required="!editingUser"
                    class="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm lg:text-base transition-colors"
                  >
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-2.5 lg:top-3 text-gray-400 hover:text-white"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <p class="text-xs text-gray-400 mt-1">
                  {{ editingUser ? 'Kosongkan jika tidak ingin mengubah password' : 'Minimal 6 karakter' }}
                </p>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <button 
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition text-sm lg:text-base"
              >
                Batal
              </button>
              <button 
                type="submit"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition text-sm lg:text-base"
                :disabled="isLoading"
              >
                {{ editingUser ? 'Update' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Ganti Password -->
      <div v-if="showChangePasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-800 rounded-xl shadow-2xl p-4 lg:p-6 w-full max-w-md border border-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg lg:text-xl font-bold text-white">
              Ganti Password
            </h2>
            <button @click="closePasswordModal" class="text-gray-400 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="changePassword">
            <div class="space-y-4">
              <div v-if="!isSuperAdmin">
                <label class="block text-sm font-medium text-gray-300 mb-2">Password Saat Ini</label>
                <div class="relative">
                  <input 
                    v-model="passwordForm.currentPassword"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    required
                    class="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="Masukkan password saat ini"
                  >
                  <button 
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Password Baru</label>
                <div class="relative">
                  <input 
                    v-model="passwordForm.newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    required
                    minlength="6"
                    class="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="Minimal 6 karakter"
                  >
                  <button 
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div class="mt-2 space-y-1">
                  <p class="text-xs text-gray-400" :class="{'text-green-400': passwordForm.newPassword.length >= 6}">
                    ✓ Minimal 6 karakter
                  </p>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Konfirmasi Password Baru</label>
                <div class="relative">
                  <input 
                    v-model="passwordForm.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    required
                    class="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="Ulangi password baru"
                  >
                  <button 
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <p v-if="passwordForm.newPassword !== passwordForm.confirmPassword && passwordForm.confirmPassword" 
                   class="text-red-400 text-xs mt-1 flex items-center">
                  <i class="fas fa-exclamation-circle mr-1"></i>
                  Password tidak cocok
                </p>
                <p v-else-if="passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.confirmPassword" 
                   class="text-green-400 text-xs mt-1 flex items-center">
                  <i class="fas fa-check-circle mr-1"></i>
                  Password cocok
                </p>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <button 
                type="button"
                @click="closePasswordModal"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
              >
                Batal
              </button>
              <button 
                type="submit"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
                :disabled="isLoading || passwordForm.newPassword !== passwordForm.confirmPassword || !passwordForm.newPassword || passwordForm.newPassword.length < 6"
              >
                Ganti Password
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Konfirmasi Hapus -->
      <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-800 rounded-xl shadow-2xl p-4 lg:p-6 w-full max-w-md border border-gray-700">
          <div class="text-center">
            <i class="fas fa-exclamation-triangle text-3xl lg:text-4xl text-red-500 mb-4"></i>
            <h3 class="text-lg lg:text-xl font-bold text-white mb-2">Konfirmasi Hapus User</h3>
            <p class="text-gray-300 mb-6 text-sm lg:text-base">
              Anda yakin ingin menghapus user <span class="font-semibold">{{ userToDelete?.nama || userToDelete?.username }}</span>?
              Aksi ini tidak dapat dibatalkan.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button 
                @click="showDeleteConfirmation = false"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition text-sm lg:text-base"
              >
                Batal
              </button>
              <button 
                @click="deleteUser"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition text-sm lg:text-base"
                :disabled="isLoading"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-gray-800 rounded-lg p-6 flex items-center space-x-4 border border-gray-700">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span class="text-white">Memproses...</span>
        </div>
      </div>

      <!-- Toast Notification -->
      <div v-if="toast.show" 
           :class="[
             'fixed top-4 right-4 z-50 p-3 lg:p-4 rounded-lg shadow-lg transition-all duration-300 max-w-xs lg:max-w-sm',
             toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
           ]"
      >
        <div class="flex items-center space-x-2">
          <i :class="toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="text-sm lg:text-base"></i>
          <span class="text-white text-sm lg:text-base flex-1">{{ toast.message }}</span>
          <button @click="hideToast" class="ml-2 text-white hover:text-gray-200">
            <i class="fas fa-times text-sm"></i>
          </button>
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
      currentRoleFilter: 'all',
      roleOptions: [
        { value: 'all', label: 'Semua', icon: 'fas fa-users', activeClass: 'bg-indigo-600 text-white' },
        { value: 'superadmin', label: 'Super Admin', icon: 'fas fa-crown', activeClass: 'bg-purple-600 text-white' },
        { value: 'adminpkl', label: 'Admin PKL', icon: 'fas fa-clipboard-list', activeClass: 'bg-blue-600 text-white' },
        { value: 'adminkunjungan', label: 'Admin Kunjungan', icon: 'fas fa-user-friends', activeClass: 'bg-green-600 text-white' }
      ],
      showAddUserModal: false,
      showChangePasswordModal: false,
      editingUser: null,
      selectedUser: null,
      userForm: {
        nama: '',
        username: '',
        email: '',
        role: 'adminpkl',
        password: ''
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      showPassword: false,
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      showDeleteConfirmation: false,
      userToDelete: null,
      debugMode: true,
      debugInfo: '',
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    }
  },
  computed: {
    isSuperAdmin() {
      return this.currentUser.role === 'superadmin'
    },
    filteredUsers() {
      if (this.currentRoleFilter === 'all') {
        return this.users
      }
      return this.users.filter(user => user.role === this.currentRoleFilter)
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    },
    visiblePages() {
      const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage)
      const pages = []
      const current = this.currentPage
      
      // Always show first page
      if (totalPages > 0) pages.push(1)
      
      // Show pages around current page
      for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
        if (!pages.includes(i)) pages.push(i)
      }
      
      // Always show last page
      if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages)
      }
      
      return pages.sort((a, b) => a - b)
    }
  },
  async mounted() {
    const admin = JSON.parse(localStorage.getItem('admin'))
    this.currentUser = admin || {}
    console.log('👤 Current user:', this.currentUser)
    
    if (this.isSuperAdmin) {
      await this.loadUsers()
    }
  },
  methods: {
    // Quick filter methods
    quickFilterByRole(role) {
      this.currentRoleFilter = role
      this.currentPage = 1
    },
    
    // Statistics methods
    getUserCountByRole(role) {
      if (role === null) return this.users.length
      return this.users.filter(user => user.role === role).length
    },

    // Icon methods
    getRoleIcon(role) {
      const icons = {
        superadmin: 'fas fa-crown',
        adminpkl: 'fas fa-clipboard-list',
        adminkunjungan: 'fas fa-user-friends'
      }
      return icons[role] || 'fas fa-user'
    },

    // ❌ METHOD INI TIDAK DIPAKAI LAGI - TERAKHIR LOGIN DIHAPUS
    // formatLastLogin(date) {
    //   if (!date) return 'Belum pernah'
    //   return new Date(date).toLocaleDateString('id-ID', {
    //     day: 'numeric',
    //     month: 'short',
    //     year: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit'
    //   })
    // },

    // Toast methods
    showToast(message, type = 'success') {
      this.toast = {
        show: true,
        message,
        type
      }
      setTimeout(() => {
        this.hideToast()
      }, 5000)
    },
    
    hideToast() {
      this.toast.show = false
    },
    
    async loadUsers() {
      this.isLoading = true
      try {
        const response = await axios.get('/api/admin/users')
        this.users = response.data || []
      } catch (error) {
        console.error('Error loading users:', error)
        this.showToast('Gagal memuat data user', 'error')
        this.users = []
      }
      this.isLoading = false
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
        nama: user.nama || '',
        username: user.username,
        email: user.email || '',
        role: user.role,
        password: ''
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
          
          await axios.put(`/api/admin/users/${this.editingUser.id}`, payload)
          this.showToast('User berhasil diupdate')
        } else {
          // Create new user
          const payload = {
            nama: this.userForm.nama,
            username: this.userForm.username,
            email: this.userForm.email,
            role: this.userForm.role,
            password: this.userForm.password
          }
          
          await axios.post('/api/admin/users', payload)
          this.showToast('User baru berhasil ditambahkan')
        }
        
        await this.loadUsers()
        this.closeModal()
      } catch (error) {
        console.error('Error saving user:', error)
        let errorMessage = 'Gagal menyimpan user'
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        }
        this.showToast(errorMessage, 'error')
      } finally {
        this.isLoading = false
      }
    },
    
    async changePassword() {
      try {
        console.log('🔐 Memulai proses ganti password via modal...')
        
        // Validasi
        if (this.passwordForm.newPassword.length < 6) {
          this.showToast('Password baru minimal 6 karakter', 'error')
          return
        }

        if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
          this.showToast('Password baru dan konfirmasi tidak cocok', 'error')
          return
        }

        this.isLoading = true
        
        // ✅ GUNAKAN ENDPOINT YANG BENAR: /api/admin/change-password
        const payload = {
          current_password: this.passwordForm.currentPassword,
          new_password: this.passwordForm.newPassword,
          confirm_password: this.passwordForm.confirmPassword,
          username: this.currentUser.username // ✅ TAMBAHKAN USERNAME
        }

        console.log('📤 Mengirim ke /api/admin/change-password:', {
          ...payload,
          current_password: '***',
          new_password: '***',
          confirm_password: '***'
        })
        
        const response = await axios.put('/api/admin/change-password', payload)
        console.log('✅ Response:', response.data)
        
        this.showToast('Password berhasil diubah!')
        this.closePasswordModal()
        
      } catch (error) {
        console.error('❌ Error changing password:', error)
        
        let errorMessage = 'Gagal mengubah password'
        
        if (error.response?.status === 401) {
          errorMessage = 'Password saat ini salah'
        } else if (error.response?.status === 400) {
          errorMessage = error.response.data?.message || 'Data tidak valid'
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        }
        
        this.showToast(errorMessage, 'error')
      } finally {
        this.isLoading = false
      }
    },
    
    async changeOwnPassword() {
      try {
        console.log('🔐 Memulai proses ganti password...')
        
        // Validasi client-side
        if (!this.passwordForm.currentPassword) {
          this.showToast('Password saat ini harus diisi', 'error')
          return
        }

        if (this.passwordForm.newPassword.length < 6) {
          this.showToast('Password baru minimal 6 karakter', 'error')
          return
        }

        if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
          this.showToast('Password baru dan konfirmasi tidak cocok', 'error')
          return
        }

        this.isLoading = true
        
        // ✅ GUNAKAN ENDPOINT YANG BENAR: /api/admin/change-password
        const payload = {
          current_password: this.passwordForm.currentPassword,
          new_password: this.passwordForm.newPassword,
          confirm_password: this.passwordForm.confirmPassword,
          username: this.currentUser.username // ✅ TAMBAHKAN USERNAME
        }

        console.log('📤 Mengirim ke /api/admin/change-password:', {
          ...payload,
          current_password: '***',
          new_password: '***',
          confirm_password: '***'
        })

        const response = await axios.put('/api/admin/change-password', payload)
        console.log('✅ Response berhasil:', response.data)
        
        this.showToast('Password berhasil diubah!')
        
        // Reset form
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
        this.showCurrentPassword = false
        this.showNewPassword = false
        this.showConfirmPassword = false
        
        // Update debug info
        this.debugInfo = `SUKSES: ${response.data.message}`
        
      } catch (error) {
        console.error('❌ Error change password:', error)
        
        let errorMessage = 'Gagal mengubah password'
        
        if (error.response) {
          console.log('📊 Error response details:', {
            status: error.response.status,
            data: error.response.data
          })
          
          if (error.response.status === 401) {
            errorMessage = 'Password saat ini salah'
          } else if (error.response.status === 400) {
            errorMessage = error.response.data.message || 'Data tidak valid'
          } else if (error.response.status === 404) {
            errorMessage = 'User tidak ditemukan'
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message
          }
        } else if (error.request) {
          console.error('❌ No response received:', error.request)
          errorMessage = 'Tidak ada respon dari server. Periksa koneksi internet.'
        } else {
          console.error('❌ Other error:', error.message)
          errorMessage = 'Terjadi kesalahan: ' + error.message
        }
        
        this.showToast(errorMessage, 'error')
        this.debugInfo = `ERROR: ${errorMessage}`
        
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
        await axios.delete(`/api/admin/users/${this.userToDelete.id}`)
        this.showToast('User berhasil dihapus')
        await this.loadUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
        let errorMessage = 'Gagal menghapus user'
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        }
        this.showToast(errorMessage, 'error')
      } finally {
        this.isLoading = false
        this.showDeleteConfirmation = false
        this.userToDelete = null
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
        password: ''
      }
      this.showPassword = false
    },
    
    closePasswordModal() {
      this.showChangePasswordModal = false
      this.selectedUser = null
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      this.showCurrentPassword = false
      this.showNewPassword = false
      this.showConfirmPassword = false
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
      return `${classes[role] || 'bg-gray-600'} px-2 py-1 rounded-full text-xs flex items-center text-white`
    },

    resetForm() {
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      this.showCurrentPassword = false
      this.showNewPassword = false
      this.showConfirmPassword = false
    }
  }
}
</script>

<style scoped>
/* Responsive table styling */
section > div > div > div > table {
  border-collapse: separate;
  border-spacing: 0 8px;
  width: 100%;
  font-size: 0.85rem;
  color: #D1D5DB;
}

@media (min-width: 1024px) {
  section > div > div > div > table {
    border-spacing: 0 12px;
    font-size: 0.95rem;
  }
}

thead tr {
  text-transform: uppercase;
  font-weight: 600;
  color: #9CA3AF;
  border-bottom: 2px solid #374151;
}

tbody tr {
  background: #1F2937;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: all 0.2s ease;
}

@media (min-width: 1024px) {
  tbody tr {
    border-radius: 10px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 0.3);
  }
}

tbody tr:hover {
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}

@media (min-width: 1024px) {
  tbody tr:hover {
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.5);
    transform: translateY(-3px);
  }
}

td, th {
  padding: 0.75rem 0.5rem;
  vertical-align: middle;
  text-align: left;
  border: none !important;
}

@media (min-width: 1024px) {
  td, th {
    padding: 1rem 1.25rem;
  }
}

/* Mobile card hover effect */
@media (max-width: 1023px) {
  .bg-gray-700:hover {
    background-color: #374151;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
}

/* Ensure proper mobile scrolling */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #4B5563 #1F2937;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #1F2937;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #4B5563;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #6B7280;
}

/* Loading animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Avatar gradient */
.bg-gradient-to-r {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}
</style>