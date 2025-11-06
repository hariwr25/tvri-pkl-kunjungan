<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <!-- Header -->
      <header class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
        <div class="w-full lg:w-auto">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">Laporan Data</h1>
          <p class="text-gray-400 text-sm lg:text-base">Laporan dan analisis data PKL dan Kunjungan</p>
        </div>
        <div class="flex items-center space-x-2 lg:space-x-4 w-full lg:w-auto justify-end">
          <!-- Periode Laporan -->
          <div class="flex items-center bg-gray-800 rounded-xl shadow-inner border border-gray-700 px-3 lg:px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-5 lg:w-5 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span class="text-xs lg:text-sm font-medium text-gray-300">{{ currentPeriod }}</span>
          </div>
        </div>
      </header>

      <!-- Filter dan Export -->
      <section class="max-w-7xl mx-auto mb-6 lg:mb-8">
        <div class="bg-gray-800 rounded-xl shadow-inner p-3 lg:p-4 border border-gray-700">
          <!-- Desktop Grid Layout -->
          <div class="hidden lg:grid lg:grid-cols-12 gap-3 items-end">
            <!-- Filter Tanggal Mulai -->
            <div class="lg:col-span-3">
              <label class="block text-xs font-medium text-gray-300 mb-1.5">Tanggal Mulai</label>
              <input 
                v-model="filters.startDate"
                type="date"
                class="w-full px-2.5 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm transition-colors"
              >
            </div>
            
            <!-- Filter Tanggal Akhir -->
            <div class="lg:col-span-3">
              <label class="block text-xs font-medium text-gray-300 mb-1.5">Tanggal Akhir</label>
              <input 
                v-model="filters.endDate"
                type="date"
                class="w-full px-2.5 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm transition-colors"
              >
            </div>
            
            <!-- Filter Jenis Laporan -->
            <div class="lg:col-span-3">
              <label class="block text-xs font-medium text-gray-300 mb-1.5">Jenis Laporan</label>
              <select 
                v-model="filters.reportType"
                class="w-full px-2.5 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm transition-colors"
              >
                <option value="all">Semua</option>
                <option value="pkl" v-if="canAccessPkl">PKL</option>
                <option value="kunjungan" v-if="canAccessKunjungan">Kunjungan</option>
              </select>
            </div>
            
            <!-- Actions Desktop -->
            <div class="lg:col-span-3 flex gap-1.5">
              <button 
                @click="applyFilters"
                class="flex-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1 text-sm"
              >
                <i class="fas fa-filter text-xs"></i>
                <span class="hidden xl:inline">Filter</span>
              </button>
              <button 
                @click="exportData"
                :disabled="isExporting"
                class="flex-1 px-2.5 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1 text-sm"
              >
                <i class="fas fa-download text-xs"></i>
                <span class="hidden xl:inline">Export</span>
              </button>
              <button 
                @click="resetFilters"
                class="px-2.5 py-1.5 bg-transparent border border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center gap-1 text-sm"
              >
                <i class="fas fa-refresh text-xs"></i>
                <span class="hidden xl:inline text-xs">Reset</span>
              </button>
            </div>
          </div>

          <!-- Mobile/Tablet Layout -->
          <div class="lg:hidden space-y-3">
            <!-- Filter Fields -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Filter Tanggal Mulai -->
              <div>
                <label class="block text-xs font-medium text-gray-300 mb-1.5">Tanggal Mulai</label>
                <input 
                  v-model="filters.startDate"
                  type="date"
                  class="w-full px-2.5 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm transition-colors"
                >
              </div>
              
              <!-- Filter Tanggal Akhir -->
              <div>
                <label class="block text-xs font-medium text-gray-300 mb-1.5">Tanggal Akhir</label>
                <input 
                  v-model="filters.endDate"
                  type="date"
                  class="w-full px-2.5 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm transition-colors"
                >
              </div>
            </div>

            <!-- Jenis Laporan Full Width -->
            <div>
              <label class="block text-xs font-medium text-gray-300 mb-1.5">Jenis Laporan</label>
              <select 
                v-model="filters.reportType"
                class="w-full px-2.5 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none text-sm transition-colors"
              >
                <option value="all">Semua</option>
                <option value="pkl" v-if="canAccessPkl">PKL</option>
                <option value="kunjungan" v-if="canAccessKunjungan">Kunjungan</option>
              </select>
            </div>
            
            <!-- Actions Mobile -->
            <div class="grid grid-cols-3 gap-2">
              <button 
                @click="applyFilters"
                class="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 text-sm"
              >
                <i class="fas fa-filter text-xs"></i>
                <span class="hidden sm:inline">Filter</span>
              </button>
              <button 
                @click="exportData"
                :disabled="isExporting"
                class="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 text-sm"
              >
                <i class="fas fa-download text-xs"></i>
                <span class="hidden sm:inline">{{ isExporting ? 'Export...' : 'Export' }}</span>
              </button>
              <button 
                @click="resetFilters"
                class="px-2.5 py-1.5 bg-transparent border border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <i class="fas fa-refresh text-xs"></i>
                <span class="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistik Laporan - Dinamis berdasarkan role -->
      <section 
        v-if="showStatsSection"
        class="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8"
        :class="statsGridClass"
      >
        <!-- Total PKL - Hanya untuk superadmin & adminpkl -->
        <div 
          v-if="canAccessPkl"
          class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs lg:text-sm font-medium text-gray-400">Total PKL</p>
              <p class="text-xl lg:text-2xl font-bold text-indigo-400">{{ filteredStats.totalPkl }}</p>
            </div>
            <i class="fas fa-clipboard-list text-xl lg:text-3xl text-indigo-400"></i>
          </div>
        </div>
        
        <!-- Total Kunjungan - Hanya untuk superadmin & adminkunjungan -->
        <div 
          v-if="canAccessKunjungan"
          class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs lg:text-sm font-medium text-gray-400">Total Kunjungan</p>
              <p class="text-xl lg:text-2xl font-bold text-green-400">{{ filteredStats.totalKunjungan }}</p>
            </div>
            <i class="fas fa-users text-xl lg:text-3xl text-green-400"></i>
          </div>
        </div>
        
        <!-- PKL Diterima - Hanya untuk superadmin & adminpkl -->
        <div 
          v-if="canAccessPkl"
          class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs lg:text-sm font-medium text-gray-400">PKL Diterima</p>
              <p class="text-xl lg:text-2xl font-bold text-blue-400">{{ filteredStats.pklDiterima }}</p>
            </div>
            <i class="fas fa-check-circle text-xl lg:text-3xl text-blue-400"></i>
          </div>
        </div>
        
        <!-- Total Peserta - Hanya untuk superadmin & adminkunjungan -->
        <div 
          v-if="canAccessKunjungan"
          class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs lg:text-sm font-medium text-gray-400">Total Peserta</p>
              <p class="text-xl lg:text-2xl font-bold text-purple-400">{{ filteredStats.totalPeserta }}</p>
            </div>
            <i class="fas fa-user-friends text-xl lg:text-3xl text-purple-400"></i>
          </div>
        </div>
      </section>

      <!-- Grafik Laporan - Dinamis berdasarkan role -->
      <section 
        v-if="showChartSection"
        class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8"
        :class="chartGridClass"
      >
        <!-- Grafik Trend Bulanan -->
        <div 
          v-if="showTrendChart"
          class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700"
        >
          <h2 class="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-white">Trend Bulanan</h2>
          <div class="relative h-64 lg:h-80">
            <canvas ref="trendChart" class="w-full h-full" v-if="chartReady"></canvas>
            <div v-else class="flex items-center justify-center h-full text-gray-400">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <span class="ml-2">Loading chart...</span>
            </div>
          </div>
        </div>
        
        <!-- Grafik Status Distribution -->
        <div 
          v-if="showStatusChart"
          class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700"
        >
          <h2 class="text-lg lg:text-xl font-semibold mb-4 lg:mb-6 text-white">Distribusi Status</h2>
          <div class="relative h-64 lg:h-80">
            <canvas ref="statusChart" class="w-full h-full" v-if="chartReady"></canvas>
            <div v-else class="flex items-center justify-center h-full text-gray-400">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <span class="ml-2">Loading chart...</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tabel Laporan PKL -->
      <section 
        v-if="canAccessPkl && (filters.reportType === 'all' || filters.reportType === 'pkl')"
        class="max-w-7xl mx-auto mb-6 lg:mb-8"
      >
        <div class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-2">
            <h2 class="text-xl lg:text-2xl font-bold text-white">Laporan Data PKL</h2>
            <div class="text-sm text-gray-300">
              Menampilkan {{ getPklPaginationInfo }}
            </div>
          </div>
          
          <div class="overflow-x-auto -mx-4 lg:-mx-6">
            <div class="min-w-full inline-block align-middle px-4 lg:px-6">
              <table v-if="filteredPklData.length > 0" class="min-w-full text-sm text-gray-300">
                <thead>
                  <tr>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-left font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm">No</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-left font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[150px]">Nama Lengkap</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[120px]">Asal Instansi</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[100px]">Tanggal Mulai</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[100px]">Tanggal Selesai</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm">Durasi (Hari)</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in paginatedPklData"
                    :key="item.id"
                    class="hover:bg-gray-700 transition cursor-default"
                  >
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">{{ getPklItemNumber(index) }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">{{ item.nama_lengkap }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center text-xs lg:text-sm">{{ item.asal_instansi }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center text-xs lg:text-sm">{{ formatDate(item.tanggal_mulai) }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center text-xs lg:text-sm">{{ formatDate(item.tanggal_selesai) }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center text-xs lg:text-sm">{{ calculateDuration(item.tanggal_mulai, item.tanggal_selesai) }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center">
                      <span :class="getStatusClass(normalizeStatus(item.status))" class="px-2 py-1 rounded-full text-xs font-medium">
                        {{ normalizeStatus(item.status) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="text-center py-8 text-gray-400 text-sm lg:text-base">
                Tidak ada data PKL yang sesuai dengan filter
              </div>
            </div>
          </div>

          <!-- Pagination untuk PKL -->
          <div v-if="filteredPklData.length > 0" class="flex justify-between items-center p-4 border-t border-gray-700">
            <div class="text-xs text-gray-400">
              Total: {{ filteredPklData.length }} data
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="prevPklPage"
                :disabled="currentPklPage === 1"
                class="px-3 py-1 text-xs bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Sebelumnya
              </button>
              
              <div class="flex space-x-1">
                <button
                  v-for="page in pklPageNumbers"
                  :key="page"
                  @click="goToPklPage(page)"
                  :class="[
                    'px-2 py-1 text-xs rounded-lg transition',
                    currentPklPage === page 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button
                @click="nextPklPage"
                :disabled="currentPklPage >= totalPklPages"
                class="px-3 py-1 text-xs bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Tabel Laporan Kunjungan -->
      <section 
        v-if="canAccessKunjungan && (filters.reportType === 'all' || filters.reportType === 'kunjungan')"
        class="max-w-7xl mx-auto mb-6 lg:mb-8"
      >
        <div class="bg-gray-800 rounded-xl shadow-inner p-4 lg:p-6 border border-gray-700">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-2">
            <h2 class="text-xl lg:text-2xl font-bold text-white">Laporan Data Kunjungan</h2>
            <div class="text-sm text-gray-300">
              Menampilkan {{ getKunjunganPaginationInfo }}
            </div>
          </div>
          
          <div class="overflow-x-auto -mx-4 lg:-mx-6">
            <div class="min-w-full inline-block align-middle px-4 lg:px-6">
              <table v-if="filteredKunjunganData.length > 0" class="min-w-full text-sm text-gray-300">
                <thead>
                  <tr>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-left font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm">No</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-left font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[150px]">Nama Instansi</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm">Jumlah Peserta</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm min-w-[100px]">Tanggal Kunjungan</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm">Waktu</th>
                    <th class="py-2 lg:py-3 px-2 lg:px-6 text-center font-semibold tracking-wide border-b border-gray-600 text-xs lg:text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in paginatedKunjunganData"
                    :key="item.id"
                    class="hover:bg-gray-700 transition cursor-default"
                  >
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">{{ getKunjunganItemNumber(index) }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">{{ item.nama_instansi }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center text-xs lg:text-sm">{{ item.jumlah_peserta }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center text-xs lg:text-sm">{{ formatDate(item.tanggal_kunjungan) }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center text-xs lg:text-sm">{{ item.waktu || '-' }}</td>
                    <td class="py-3 lg:py-4 px-2 lg:px-6 text-center">
                      <span :class="getStatusClass(normalizeStatus(item.status))" class="px-2 py-1 rounded-full text-xs font-medium">
                        {{ normalizeStatus(item.status) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="text-center py-8 text-gray-400 text-sm lg:text-base">
                Tidak ada data kunjungan yang sesuai dengan filter
              </div>
            </div>
          </div>

          <!-- Pagination untuk Kunjungan -->
          <div v-if="filteredKunjunganData.length > 0" class="flex justify-between items-center p-4 border-t border-gray-700">
            <div class="text-xs text-gray-400">
              Total: {{ filteredKunjunganData.length }} data
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="prevKunjunganPage"
                :disabled="currentKunjunganPage === 1"
                class="px-3 py-1 text-xs bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Sebelumnya
              </button>
              
              <div class="flex space-x-1">
                <button
                  v-for="page in kunjunganPageNumbers"
                  :key="page"
                  @click="goToKunjunganPage(page)"
                  :class="[
                    'px-2 py-1 text-xs rounded-lg transition',
                    currentKunjunganPage === page 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button
                @click="nextKunjunganPage"
                :disabled="currentKunjunganPage >= totalKunjunganPages"
                class="px-3 py-1 text-xs bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Pesan jika tidak ada akses -->
      <section 
        v-if="!hasAnyAccess"
        class="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-inner p-8 border border-gray-700 text-center"
      >
        <div class="text-yellow-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Tidak Ada Akses</h3>
        <p class="text-gray-400">
          Role <span :class="roleBadgeClass" class="font-semibold">{{ role }}</span> tidak memiliki akses ke data PKL maupun Kunjungan.
        </p>
      </section>

      <!-- Loading Overlay -->
      <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-gray-800 rounded-lg p-6 flex items-center space-x-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span class="text-white">Memuat data laporan...</span>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js/auto'
import DashboardLayout from '../../layouts/DashboardLayout.vue'

export default {
  name: 'LaporanAdmin',
  components: { DashboardLayout },
  data() {
    return {
      role: '',
      dataPkl: [],
      dataKunjungan: [],
      isLoading: false,
      isExporting: false,
      chartReady: false,
      trendChart: null,
      statusChart: null,
      isFiltered: false,
      chartRetryCount: 0,
      maxRetries: 3,
      filters: {
        startDate: '',
        endDate: '',
        reportType: 'all'
      },
      currentPeriod: 'Semua Data',
      
      // Pagination untuk PKL
      currentPklPage: 1,
      pklPerPage: 5,
      
      // Pagination untuk Kunjungan
      currentKunjunganPage: 1,
      kunjunganPerPage: 5
    }
  },
  computed: {
    // Role Checks
    isSuperAdmin() {
      return this.role === 'superadmin'
    },
    isAdminPkl() {
      return this.role === 'adminpkl'
    },
    isAdminKunjungan() {
      return this.role === 'adminkunjungan'
    },

    // Permission Checks
    canAccessPkl() {
      return this.isSuperAdmin || this.isAdminPkl
    },
    canAccessKunjungan() {
      return this.isSuperAdmin || this.isAdminKunjungan
    },
    hasAnyAccess() {
      return this.canAccessPkl || this.canAccessKunjungan
    },

    // Role Badge Styling
    roleBadgeClass() {
      switch (this.role) {
        case 'superadmin':
          return 'text-purple-400'
        case 'adminpkl':
          return 'text-indigo-400'
        case 'adminkunjungan':
          return 'text-green-400'
        default:
          return 'text-gray-400'
      }
    },

    // Layout dinamis untuk statistik
    showStatsSection() {
      return this.hasAnyAccess
    },
    statsGridClass() {
      const accessibleStats = [this.canAccessPkl, this.canAccessKunjungan].filter(Boolean).length * 2
      
      if (accessibleStats === 4) {
        return 'grid-cols-2 lg:grid-cols-4'
      } else if (accessibleStats === 2) {
        return 'grid-cols-2'
      } else {
        return 'grid-cols-1'
      }
    },

    // Layout dinamis untuk charts
    showChartSection() {
      return this.hasAnyAccess && (this.dataPkl.length > 0 || this.dataKunjungan.length > 0)
    },
    chartGridClass() {
      const accessibleCharts = [this.showTrendChart, this.showStatusChart].filter(Boolean).length
      
      if (accessibleCharts === 2) {
        return 'grid-cols-1 xl:grid-cols-2'
      } else {
        return 'grid-cols-1'
      }
    },
    showTrendChart() {
      return (this.canAccessPkl && this.dataPkl.length > 0) || (this.canAccessKunjungan && this.dataKunjungan.length > 0)
    },
    showStatusChart() {
      return (this.canAccessPkl && this.dataPkl.length > 0) || (this.canAccessKunjungan && this.dataKunjungan.length > 0)
    },

    // Data filtering
    filteredPklData() {
      if (!this.canAccessPkl) return []
      
      if (!this.isFiltered || (!this.filters.startDate && !this.filters.endDate)) {
        return this.dataPkl
      }
      
      return this.dataPkl.filter(item => {
        const itemDate = new Date(item.tanggal_mulai)
        let passFilter = true
        
        if (this.filters.startDate) {
          const startDate = new Date(this.filters.startDate)
          passFilter = passFilter && itemDate >= startDate
        }
        
        if (this.filters.endDate) {
          const endDate = new Date(this.filters.endDate)
          passFilter = passFilter && itemDate <= endDate
        }
        
        return passFilter
      })
    },
    filteredKunjunganData() {
      if (!this.canAccessKunjungan) return []
      
      if (!this.isFiltered || (!this.filters.startDate && !this.filters.endDate)) {
        return this.dataKunjungan
      }
      
      return this.dataKunjungan.filter(item => {
        const itemDate = new Date(item.tanggal_kunjungan)
        let passFilter = true
        
        if (this.filters.startDate) {
          const startDate = new Date(this.filters.startDate)
          passFilter = passFilter && itemDate >= startDate
        }
        
        if (this.filters.endDate) {
          const endDate = new Date(this.filters.endDate)
          passFilter = passFilter && itemDate <= endDate
        }
        
        return passFilter
      })
    },
    filteredStats() {
      const pklData = this.filteredPklData
      const kunjunganData = this.filteredKunjunganData
      
      return {
        totalPkl: pklData.length,
        totalKunjungan: kunjunganData.length,
        pklDiterima: pklData.filter(item => this.normalizeStatus(item.status) === 'Diterima').length,
        totalPeserta: kunjunganData.reduce((sum, item) => sum + (parseInt(item.jumlah_peserta) || 0), 0)
      }
    },

    // Computed untuk PKL Pagination
    totalPklPages() {
      return Math.ceil(this.filteredPklData.length / this.pklPerPage)
    },
    paginatedPklData() {
      const start = (this.currentPklPage - 1) * this.pklPerPage
      const end = start + this.pklPerPage
      return this.filteredPklData.slice(start, end)
    },
    pklPageNumbers() {
      const pages = []
      for (let i = 1; i <= this.totalPklPages; i++) {
        pages.push(i)
      }
      return pages
    },
    getPklPaginationInfo() {
      const start = (this.currentPklPage - 1) * this.pklPerPage + 1
      const end = Math.min(this.currentPklPage * this.pklPerPage, this.filteredPklData.length)
      return `${start}-${end} dari ${this.filteredPklData.length} data`
    },
    
    // Computed untuk Kunjungan Pagination
    totalKunjunganPages() {
      return Math.ceil(this.filteredKunjunganData.length / this.kunjunganPerPage)
    },
    paginatedKunjunganData() {
      const start = (this.currentKunjunganPage - 1) * this.kunjunganPerPage
      const end = start + this.kunjunganPerPage
      return this.filteredKunjunganData.slice(start, end)
    },
    kunjunganPageNumbers() {
      const pages = []
      for (let i = 1; i <= this.totalKunjunganPages; i++) {
        pages.push(i)
      }
      return pages
    },
    getKunjunganPaginationInfo() {
      const start = (this.currentKunjunganPage - 1) * this.kunjunganPerPage + 1
      const end = Math.min(this.currentKunjunganPage * this.kunjunganPerPage, this.filteredKunjunganData.length)
      return `${start}-${end} dari ${this.filteredKunjunganData.length} data`
    }
  },
  async mounted() {
    await this.initializePage()
  },
  beforeUnmount() {
    this.destroyCharts()
  },
  updated() {
    if (this.chartReady && (this.dataPkl.length > 0 || this.dataKunjungan.length > 0)) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.renderCharts()
        }, 100)
      })
    }
  },
  methods: {
    // Methods Pagination untuk PKL
    nextPklPage() {
      if (this.currentPklPage < this.totalPklPages) {
        this.currentPklPage++
      }
    },
    prevPklPage() {
      if (this.currentPklPage > 1) {
        this.currentPklPage--
      }
    },
    goToPklPage(page) {
      this.currentPklPage = page
    },
    getPklItemNumber(index) {
      return (this.currentPklPage - 1) * this.pklPerPage + index + 1
    },
    
    // Methods Pagination untuk Kunjungan
    nextKunjunganPage() {
      if (this.currentKunjunganPage < this.totalKunjunganPages) {
        this.currentKunjunganPage++
      }
    },
    prevKunjunganPage() {
      if (this.currentKunjunganPage > 1) {
        this.currentKunjunganPage--
      }
    },
    goToKunjunganPage(page) {
      this.currentKunjunganPage = page
    },
    getKunjunganItemNumber(index) {
      return (this.currentKunjunganPage - 1) * this.kunjunganPerPage + index + 1
    },

    // Fungsi normalisasi status sesuai dengan database
    normalizeStatus(status) {
      if (!status) return 'Tidak Diketahui';
      
      const statusLower = status.toLowerCase().trim();
      
      // Mapping status sesuai dengan database
      const statusMap = {
        'approved': 'Diterima',
        'rejected': 'Ditolak', 
        'pending': 'Pending'
      };
      
      // Return mapped status atau original jika tidak ada mapping
      return statusMap[statusLower] || status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    },

    getStatusClass(status) {
      const statusClasses = {
        'Diterima': 'bg-green-100 text-green-800 border border-green-200',
        'Ditolak': 'bg-red-100 text-red-800 border border-red-200',
        'Pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        'Tidak Diketahui': 'bg-gray-100 text-gray-600 border border-gray-200'
      };
      
      return statusClasses[status] || 'bg-gray-100 text-gray-600 border border-gray-200';
    },

    async initializePage() {
      try {
        const admin = JSON.parse(localStorage.getItem('admin'))
        if (!admin) {
          this.$router.push('/admin')
          return
        }
        this.role = admin.role
        this.updateCurrentPeriod()

        this.isLoading = true
        await this.loadData()
        this.isLoading = false
        
        await this.setupCharts()
        
      } catch (error) {
        console.error('Error initializing laporan:', error)
        this.isLoading = false
      }
    },

    async setupCharts() {
      await this.$nextTick()
      await this.$nextTick()
      
      this.chartReady = true
      
      await this.$nextTick()
      await this.$nextTick()
      
      setTimeout(() => {
        this.renderChartsWithValidation()
      }, 1000)
    },

    async loadData() {
      const promises = []
      
      if (this.canAccessPkl) {
        promises.push(this.fetchPklData())
      }
      
      if (this.canAccessKunjungan) {
        promises.push(this.fetchKunjunganData())
      }
      
      await Promise.all(promises)
    },

    async fetchPklData() {
      try {
        const response = await axios.get('/api/pkl')
        this.dataPkl = response.data || []
        this.currentPklPage = 1 // Reset ke halaman pertama setelah fetch data
      } catch (error) {
        console.error('Error fetching PKL data:', error)
        this.dataPkl = []
      }
    },

    async fetchKunjunganData() {
      try {
        const response = await axios.get('/api/kunjungan')
        this.dataKunjungan = response.data || []
        this.currentKunjunganPage = 1 // Reset ke halaman pertama setelah fetch data
      } catch (error) {
        console.error('Error fetching kunjungan data:', error)
        this.dataKunjungan = []
      }
    },

    applyFilters() {
      this.isFiltered = true
      this.updateCurrentPeriod()
      this.refreshCharts()
      // Reset pagination ke halaman pertama saat filter diterapkan
      this.currentPklPage = 1
      this.currentKunjunganPage = 1
    },

    resetFilters() {
      this.filters.startDate = ''
      this.filters.endDate = ''
      this.filters.reportType = 'all'
      this.isFiltered = false
      this.currentPeriod = 'Semua Data'
      this.refreshCharts()
      // Reset pagination ke halaman pertama saat filter direset
      this.currentPklPage = 1
      this.currentKunjunganPage = 1
    },

    refreshCharts() {
      this.chartRetryCount = 0
      setTimeout(() => {
        this.renderCharts()
      }, 100)
    },

    async exportData() {
      this.isExporting = true
      try {
        const exportData = {
          pkl: this.filters.reportType === 'all' || this.filters.reportType === 'pkl' ? this.filteredPklData : [],
          kunjungan: this.filters.reportType === 'all' || this.filters.reportType === 'kunjungan' ? this.filteredKunjunganData : [],
          period: this.currentPeriod,
          stats: this.filteredStats,
          exportDate: new Date().toISOString()
        }

        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `laporan-${this.filters.reportType}-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        URL.revokeObjectURL(url)
        
        alert('Data berhasil diekspor!')
      } catch (error) {
        console.error('Error exporting data:', error)
        alert('Gagal mengekspor data!')
      }
      this.isExporting = false
    },

    renderChartsWithValidation() {
      if (!this.validateChartsReady()) {
        console.log('Charts not ready, retrying...')
        setTimeout(() => {
          this.renderChartsWithValidation()
        }, 500)
        return
      }
      
      this.renderCharts()
    },

    validateChartsReady() {
      const trendCanvas = this.$refs.trendChart
      const statusCanvas = this.$refs.statusChart
      
      if (!trendCanvas || !statusCanvas) {
        return false
      }
      
      if (trendCanvas.clientWidth === 0 || trendCanvas.clientHeight === 0) {
        return false
      }
      
      if (statusCanvas.clientWidth === 0 || statusCanvas.clientHeight === 0) {
        return false
      }
      
      try {
        const trendCtx = trendCanvas.getContext('2d')
        const statusCtx = statusCanvas.getContext('2d')
        
        if (!trendCtx || !statusCtx) {
          return false
        }
      } catch (error) {
        console.error('Cannot get canvas context:', error)
        return false
      }
      
      return true
    },

    renderCharts() {
      if (!this.validateChartsReady()) {
        return
      }
      
      this.destroyCharts()
      
      this.$nextTick(() => {
        this.tryRenderChart('trend')
        this.tryRenderChart('status')
      })
    },

    tryRenderChart(chartType) {
      try {
        if (chartType === 'trend') {
          this.renderTrendChart()
        } else if (chartType === 'status') {
          this.renderStatusChart()
        }
      } catch (error) {
        console.error(`Error rendering ${chartType} chart:`, error)
        
        if (this.chartRetryCount < this.maxRetries) {
          this.chartRetryCount++
          console.log(`Retrying ${chartType} chart rendering (attempt ${this.chartRetryCount})`)
          setTimeout(() => {
            this.tryRenderChart(chartType)
          }, 1000)
        } else {
          console.error(`Failed to render ${chartType} chart after ${this.maxRetries} attempts`)
        }
      }
    },

    renderTrendChart() {
      const canvas = this.$refs.trendChart
      if (!canvas) {
        throw new Error('Trend chart canvas not found')
      }

      if (canvas.clientWidth === 0 || canvas.clientHeight === 0) {
        throw new Error('Canvas has invalid dimensions')
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Cannot get 2d context from trend chart canvas')
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const monthlyData = this.generateMonthlyTrendData()
      
      if (!monthlyData.labels.length) {
        console.warn('No data available for trend chart')
        return
      }
      
      this.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: monthlyData.labels,
          datasets: [
            {
              label: 'PKL',
              data: monthlyData.pkl,
              borderColor: '#6366F1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              borderWidth: 2,
              pointBackgroundColor: '#6366F1',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 5,
              tension: 0.4,
              fill: false
            },
            {
              label: 'Kunjungan',
              data: monthlyData.kunjungan,
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 2,
              pointBackgroundColor: '#10B981',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 5,
              tension: 0.4,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0
          },
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#D1D5DB',
                padding: 20,
                usePointStyle: true
              }
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: '#F9FAFB',
              bodyColor: '#D1D5DB',
              borderColor: '#374151',
              borderWidth: 1
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#374151',
                drawBorder: false
              },
              ticks: {
                color: '#9CA3AF',
                stepSize: 1
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#9CA3AF'
              }
            }
          }
        }
      })
    },

    renderStatusChart() {
      const canvas = this.$refs.statusChart
      if (!canvas) {
        throw new Error('Status chart canvas not found')
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Cannot get 2d context from status chart canvas')
      }
      
      const statusData = this.generateStatusData()
      
      if (statusData.values.length === 0 || statusData.values.every(v => v === 0)) {
        statusData.labels = ['Tidak ada data']
        statusData.values = [1]
      }
      
      this.statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: statusData.labels,
          datasets: [{
            data: statusData.values,
            backgroundColor: [
              '#10B981', // Diterima - hijau
              '#EF4444', // Ditolak - merah
              '#F59E0B', // Pending - kuning
              '#6B7280'  // Tidak Diketahui - abu
            ],
            borderWidth: 0,
            hoverBorderWidth: 2,
            hoverBorderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#D1D5DB',
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleColor: '#F9FAFB',
              bodyColor: '#D1D5DB',
              borderColor: '#374151',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0)
                  const percentage = ((context.parsed / total) * 100).toFixed(1)
                  return `${context.label}: ${context.parsed} (${percentage}%)`
                }
              }
            }
          }
        }
      })
    },

    generateMonthlyTrendData() {
      const months = []
      const pklData = []
      const kunjunganData = []
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const monthStr = date.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
        months.push(monthStr)
        
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        
        const pklDataToUse = this.isFiltered ? this.filteredPklData : this.dataPkl
        const pklCount = pklDataToUse.filter(item => {
          const itemDate = new Date(item.tanggal_mulai)
          return itemDate >= monthStart && itemDate <= monthEnd
        }).length
        pklData.push(pklCount)
        
        const kunjunganDataToUse = this.isFiltered ? this.filteredKunjunganData : this.dataKunjungan
        const kunjunganCount = kunjunganDataToUse.filter(item => {
          const itemDate = new Date(item.tanggal_kunjungan)
          return itemDate >= monthStart && itemDate <= monthEnd
        }).length
        kunjunganData.push(kunjunganCount)
      }
      
      return { labels: months, pkl: pklData, kunjungan: kunjunganData }
    },

    generateStatusData() {
      const statusCounts = {}
      
      const pklDataToUse = this.isFiltered ? this.filteredPklData : this.dataPkl
      pklDataToUse.forEach(item => {
        const normalizedStatus = this.normalizeStatus(item.status)
        statusCounts[normalizedStatus] = (statusCounts[normalizedStatus] || 0) + 1
      })
      
      const kunjunganDataToUse = this.isFiltered ? this.filteredKunjunganData : this.dataKunjungan
      kunjunganDataToUse.forEach(item => {
        const normalizedStatus = this.normalizeStatus(item.status)
        statusCounts[normalizedStatus] = (statusCounts[normalizedStatus] || 0) + 1
      })
      
      return {
        labels: Object.keys(statusCounts),
        values: Object.values(statusCounts)
      }
    },

    destroyCharts() {
      if (this.trendChart) {
        try {
          this.trendChart.destroy()
        } catch (error) {
          console.error('Error destroying trend chart:', error)
        }
        this.trendChart = null
      }
      
      if (this.statusChart) {
        try {
          this.statusChart.destroy()
        } catch (error) {
          console.error('Error destroying status chart:', error)
        }
        this.statusChart = null
      }
    },

    updateCurrentPeriod() {
      if (!this.isFiltered || (!this.filters.startDate && !this.filters.endDate)) {
        this.currentPeriod = 'Semua Data'
      } else if (this.filters.startDate && this.filters.endDate) {
        const start = new Date(this.filters.startDate).toLocaleDateString('id-ID')
        const end = new Date(this.filters.endDate).toLocaleDateString('id-ID')
        this.currentPeriod = `${start} - ${end}`
      } else if (this.filters.startDate) {
        const start = new Date(this.filters.startDate).toLocaleDateString('id-ID')
        this.currentPeriod = `Mulai ${start}`
      } else if (this.filters.endDate) {
        const end = new Date(this.filters.endDate).toLocaleDateString('id-ID')
        this.currentPeriod = `Sampai ${end}`
      }
    },

    formatDate(dateStr) {
      try {
        if (!dateStr) return '-'
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateStr).toLocaleDateString('id-ID', options)
      } catch (error) {
        console.error('Error formatting date:', error)
        return dateStr
      }
    },

    calculateDuration(startDate, endDate) {
      try {
        if (!startDate || !endDate) return '-'
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return `${diffDays} hari`
      } catch (error) {
        return '-'
      }
    }
  }
}
</script>

<style scoped>
/* Responsive table styling */
section > table {
  border-collapse: separate;
  border-spacing: 0 8px;
  width: 100%;
  font-size: 0.85rem;
  color: #D1D5DB;
}

@media (min-width: 1024px) {
  section > table {
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

.h-64 {
  height: 16rem;
}

.h-80 {
  height: 20rem;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .min-w-full {
    min-width: 600px;
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
  
  .text-xl {
    font-size: 1.125rem;
  }
}

/* Tablet optimizations */
@media (min-width: 641px) and (max-width: 1023px) {
  td, th {
    padding: 0.875rem 0.75rem;
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

/* Loading animation for charts */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>