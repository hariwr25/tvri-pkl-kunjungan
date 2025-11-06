<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <!-- Header -->
      <header class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 class="text-3xl font-bold text-white">Dashboard Admin</h1>
        <div class="text-sm bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">
          Role: <span :class="roleBadgeClass" class="font-semibold">{{ role }}</span>
        </div>
      </header>

      <!-- Statistik Cards dengan Layout Dinamis -->
      <section 
        class="max-w-7xl mx-auto grid gap-6 mb-12"
        :class="gridCardClass"
      >
        <!-- Card Total Pendaftar PKL -->
        <CardDashboard
          v-if="canAccessPkl"
          title="Total Pendaftar PKL"
          :value="dataPkl.length"
          icon="clipboard-list"
          class="bg-gray-800 text-indigo-400"
        />
        
        <!-- Card Total Kunjungan -->
        <CardDashboard
          v-if="canAccessKunjungan"
          title="Total Kunjungan"
          :value="dataKunjungan.length"
          icon="users"
          class="bg-gray-800 text-green-400"
        />
        
        <!-- Card Waktu & Tanggal - Selalu Tampil -->
        <div class="bg-gray-800 rounded-xl shadow-inner p-5 border border-gray-700 hover:border-purple-500 transition-all duration-300">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-purple-500/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wide">Waktu & Tanggal</h3>
          </div>
          
          <!-- Jam Digital Compact -->
          <div class="mb-3">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span class="text-xs text-gray-400 font-medium">Waktu Saat Ini</span>
            </div>
            <div class="font-mono text-xl font-bold text-white">{{ time }}</div>
          </div>
          
          <!-- Tanggal Compact -->
          <div>
            <div class="flex items-center gap-2 mb-1">
              <div class="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span class="text-xs text-gray-400 font-medium">Tanggal</span>
            </div>
            <div class="text-sm font-medium text-gray-200 leading-tight">{{ date }}</div>
          </div>
        </div>
      </section>

      <!-- Grafik Section - Hanya tampil jika ada akses ke grafik -->
      <section 
        v-if="showChartSection"
        class="max-w-7xl mx-auto grid gap-6 mb-12"
        :class="gridChartClass"
      >
        <!-- Grafik Data PKL -->
        <div 
          v-if="canAccessPkl && dataPkl.length > 0"
          class="bg-gray-800 rounded-xl shadow-inner p-5 border border-gray-700"
        >
          <h2 class="text-lg font-semibold mb-4 text-white">Grafik Data PKL</h2>
          <div class="relative h-64">
            <canvas 
              ref="chartPklCanvas" 
              v-if="shouldRenderPklChart"
              class="w-full h-full"
            ></canvas>
            <div v-else-if="dataPkl.length === 0" class="text-gray-400 italic text-center py-4 flex items-center justify-center h-full">
              Tidak ada data PKL tersedia
            </div>
            <div v-else class="text-gray-400 italic text-center py-4 flex items-center justify-center h-full">
              Memuat grafik...
            </div>
          </div>
        </div>

        <!-- Grafik Data Kunjungan -->
        <div 
          v-if="canAccessKunjungan && dataKunjungan.length > 0"
          class="bg-gray-800 rounded-xl shadow-inner p-5 border border-gray-700"
        >
          <h2 class="text-lg font-semibold mb-4 text-white">Grafik Data Kunjungan</h2>
          <div class="relative h-64">
            <canvas 
              ref="chartKunjunganCanvas" 
              v-if="shouldRenderKunjunganChart"
              class="w-full h-full"
            ></canvas>
            <div v-else-if="dataKunjungan.length === 0" class="text-gray-400 italic text-center py-4 flex items-center justify-center h-full">
              Tidak ada data kunjungan tersedia
            </div>
            <div v-else class="text-gray-400 italic text-center py-4 flex items-center justify-center h-full">
              Memuat grafik...
            </div>
          </div>
        </div>
      </section>

      <!-- Tabel Data Pendaftar PKL -->
      <section
        v-if="canAccessPkl && dataPkl.length > 0"
        class="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-inner p-5 mb-8 border border-gray-700 overflow-auto"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-white">Data Pendaftar PKL</h2>
          <div class="text-sm text-gray-300">
            Menampilkan {{ getPklPaginationInfo }}
          </div>
        </div>
        <table class="min-w-full text-sm text-gray-300">
          <thead>
            <tr>
              <th class="py-3 px-4 text-left font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Nama Lengkap</th>
              <th class="py-3 px-4 text-center font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Asal Instansi</th>
              <th class="py-3 px-4 text-center font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Tanggal Mulai</th>
              <th class="py-3 px-4 text-center font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Tanggal Selesai</th>
              <th class="py-3 px-4 text-center font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedPkl"
              :key="item.id"
              class="hover:bg-gray-700 transition cursor-default"
            >
              <td class="py-3 px-4">{{ item.nama_lengkap }}</td>
              <td class="py-3 px-4 text-center">{{ item.asal_instansi }}</td>
              <td class="py-3 px-4 text-center">{{ formatDate(item.tanggal_mulai) }}</td>
              <td class="py-3 px-4 text-center">{{ formatDate(item.tanggal_selesai) }}</td>
              <td class="py-3 px-4 text-center">
                <StatusBadge :status="item.status" />
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Pagination untuk PKL -->
        <div class="flex justify-between items-center mt-4">
          <div class="text-xs text-gray-400">
            Total: {{ dataPkl.length }} data
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
      </section>

      <!-- Tabel Data Kunjungan -->
      <section
        v-if="canAccessKunjungan && dataKunjungan.length > 0"
        class="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-inner p-5 border border-gray-700 overflow-auto"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-white">Data Kunjungan</h2>
          <div class="text-sm text-gray-300">
            Menampilkan {{ getKunjunganPaginationInfo }}
          </div>
        </div>
        <table class="min-w-full text-sm text-gray-300">
          <thead>
            <tr>
              <th class="py-3 px-4 text-left font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Nama Instansi</th>
              <th class="py-3 px-4 text-center font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Jumlah Peserta</th>
              <th class="py-3 px-4 text-center font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Tanggal Kunjungan</th>
              <th class="py-3 px-4 text-center font-semibold tracking-wide border-b border-gray-600 text-xs uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedKunjungan"
              :key="item.id"
              class="hover:bg-gray-700 transition cursor-default"
            >
              <td class="py-3 px-4">{{ item.nama_instansi }}</td>
              <td class="py-3 px-4 text-center">{{ item.jumlah_peserta }}</td>
              <td class="py-3 px-4 text-center">{{ formatDate(item.tanggal_kunjungan) }}</td>
              <td class="py-3 px-4 text-center">
                <StatusBadge :status="item.status" />
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Pagination untuk Kunjungan -->
        <div class="flex justify-between items-center mt-4">
          <div class="text-xs text-gray-400">
            Total: {{ dataKunjungan.length }} data
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
      </section>

      <!-- Pesan jika tidak ada data sama sekali -->
      <section 
        v-if="hasAnyAccess && !hasAnyData"
        class="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-inner p-8 border border-gray-700 text-center"
      >
        <div class="text-blue-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Belum Ada Data</h3>
        <p class="text-gray-400">
          Saat ini belum ada data yang tersedia untuk ditampilkan.
        </p>
      </section>

      <!-- Pesan jika tidak ada akses sama sekali -->
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
    </div>
  </DashboardLayout>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js/auto'
import CardDashboard from '@/components/CardDashboard.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import DashboardLayout from '../../layouts/DashboardLayout.vue'

export default {
  name: 'DashboardAdmin',
  components: { CardDashboard, StatusBadge, DashboardLayout },
  data() {
    return {
      role: '',
      dataPkl: [],
      dataKunjungan: [],
      time: '',
      date: '',
      timerInterval: null,
      chartPkl: null,
      chartKunjungan: null,
      shouldRenderPklChart: false,
      shouldRenderKunjunganChart: false,
      chartRenderAttempts: {
        pkl: 0,
        kunjungan: 0
      },
      maxRenderAttempts: 5,
      isDestroyed: false,
      
      // Pagination untuk PKL
      currentPklPage: 1,
      pklPerPage: 5,
      
      // Pagination untuk Kunjungan
      currentKunjunganPage: 1,
      kunjunganPerPage: 5
    }
  },
  computed: {
    // Computed untuk hak akses berdasarkan role
    canAccessPkl() {
      return this.role === 'superadmin' || this.role === 'adminpkl'
    },
    canAccessKunjungan() {
      return this.role === 'superadmin' || this.role === 'adminkunjungan'
    },
    hasAnyAccess() {
      return this.canAccessPkl || this.canAccessKunjungan
    },
    hasAnyData() {
      return this.dataPkl.length > 0 || this.dataKunjungan.length > 0
    },

    // Computed untuk styling role badge
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

    // Computed untuk layout dinamis cards
    gridCardClass() {
      const accessibleCards = [this.canAccessPkl, this.canAccessKunjungan].filter(Boolean).length
      const totalCards = accessibleCards + 1 // +1 untuk card waktu & tanggal
      
      if (totalCards === 3) {
        return 'grid-cols-1 sm:grid-cols-3'
      } else if (totalCards === 2) {
        return 'grid-cols-1 sm:grid-cols-2'
      } else {
        return 'grid-cols-1'
      }
    },

    // Tampilkan section grafik hanya jika ada akses ke minimal 1 grafik
    showChartSection() {
      return (this.canAccessPkl && this.dataPkl.length > 0) || 
             (this.canAccessKunjungan && this.dataKunjungan.length > 0)
    },

    // Layout dinamis untuk charts
    gridChartClass() {
      const accessibleCharts = [
        this.canAccessPkl && this.dataPkl.length > 0,
        this.canAccessKunjungan && this.dataKunjungan.length > 0
      ].filter(Boolean).length
      
      if (accessibleCharts === 2) {
        return 'grid-cols-1 md:grid-cols-2'
      } else {
        return 'grid-cols-1'
      }
    },

    // Computed untuk PKL Pagination
    totalPklPages() {
      return Math.ceil(this.dataPkl.length / this.pklPerPage)
    },
    paginatedPkl() {
      const start = (this.currentPklPage - 1) * this.pklPerPage
      const end = start + this.pklPerPage
      return this.dataPkl.slice(start, end)
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
      const end = Math.min(this.currentPklPage * this.pklPerPage, this.dataPkl.length)
      return `${start}-${end} dari ${this.dataPkl.length} data`
    },
    
    // Computed untuk Kunjungan Pagination
    totalKunjunganPages() {
      return Math.ceil(this.dataKunjungan.length / this.kunjunganPerPage)
    },
    paginatedKunjungan() {
      const start = (this.currentKunjunganPage - 1) * this.kunjunganPerPage
      const end = start + this.kunjunganPerPage
      return this.dataKunjungan.slice(start, end)
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
      const end = Math.min(this.currentKunjunganPage * this.kunjunganPerPage, this.dataKunjungan.length)
      return `${start}-${end} dari ${this.dataKunjungan.length} data`
    }
  },
  async mounted() {
    await this.initializeDashboard()
  },
  beforeUnmount() {
    this.isDestroyed = true
    this.cleanupResources()
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

    async initializeDashboard() {
      try {
        // Load user info dari localStorage
        const admin = JSON.parse(localStorage.getItem('admin'))
        if (!admin) {
          this.$router.push('/admin')
          return
        }
        
        this.role = admin.role || 'adminpkl'

        // Start real-time clock
        this.updateDateTime()
        this.timerInterval = setInterval(this.updateDateTime, 1000)

        // Fetch data berdasarkan role
        const loadPromises = []
        
        if (this.canAccessPkl) {
          loadPromises.push(this.fetchPklData())
        }

        if (this.canAccessKunjungan) {
          loadPromises.push(this.fetchKunjunganData())
        }

        await Promise.all(loadPromises)
        
        // Render charts setelah data loaded
        await this.renderChartsWithDelay()
      } catch (error) {
        console.error('Error initializing dashboard:', error)
      }
    },

    async fetchPklData() {
      try {
        const response = await axios.get('/api/pkl')
        this.dataPkl = response.data || []
        this.currentPklPage = 1
      } catch (error) {
        console.error('Error fetching PKL data:', error)
        this.dataPkl = []
      }
    },

    async fetchKunjunganData() {
      try {
        const response = await axios.get('/api/kunjungan')
        this.dataKunjungan = response.data || []
        this.currentKunjunganPage = 1
      } catch (error) {
        console.error('Error fetching kunjungan data:', error)
        this.dataKunjungan = []
      }
    },

    async renderChartsWithDelay() {
      // Tunggu DOM selesai render
      await this.$nextTick()
      
      // Delay untuk memastikan semua element sudah siap
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Render charts dengan validasi
      if (!this.isDestroyed) {
        this.renderCharts()
      }
    },

    renderCharts() {
      // Render grafik PKL hanya jika punya akses DAN ada data
      if (this.dataPkl.length > 0 && this.canAccessPkl) {
        this.shouldRenderPklChart = true
        this.$nextTick(() => {
          setTimeout(() => {
            if (!this.isDestroyed) {
              this.renderChartPkl()
            }
          }, 200)
        })
      }

      // Render grafik Kunjungan hanya jika punya akses DAN ada data
      if (this.dataKunjungan.length > 0 && this.canAccessKunjungan) {
        this.shouldRenderKunjunganChart = true
        this.$nextTick(() => {
          setTimeout(() => {
            if (!this.isDestroyed) {
              this.renderChartKunjungan()
            }
          }, 300)
        })
      }
    },

    renderChartPkl() {
      try {
        if (this.isDestroyed) return

        // Cleanup existing chart
        if (this.chartPkl) {
          this.chartPkl.destroy()
          this.chartPkl = null
        }

        // Validasi canvas
        const canvas = this.$refs.chartPklCanvas
        if (!this.validateCanvas(canvas, 'PKL')) {
          this.retryRenderPkl()
          return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          console.warn('PKL Canvas context not available')
          this.retryRenderPkl()
          return
        }

        // Validasi data
        if (!this.dataPkl || this.dataPkl.length === 0) {
          console.warn('No PKL data available for chart')
          return
        }

        // Process data untuk chart
        const countPerInstansi = this.dataPkl.reduce((acc, cur) => {
          const instansi = cur.asal_instansi || 'Tidak Diketahui'
          acc[instansi] = (acc[instansi] || 0) + 1
          return acc
        }, {})

        if (Object.keys(countPerInstansi).length === 0) {
          console.warn('No processed data for PKL chart')
          return
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Create chart
        this.chartPkl = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(countPerInstansi),
            datasets: [{
              label: 'Jumlah Pendaftar',
              data: Object.values(countPerInstansi),
              backgroundColor: '#6366F1',
              borderColor: '#4F46E5',
              borderWidth: 1,
              borderRadius: 6,
            }]
          },
          options: this.getChartOptions()
        })

        console.log('PKL Chart rendered successfully')
        this.chartRenderAttempts.pkl = 0
      } catch (error) {
        console.error('Error rendering PKL chart:', error)
        this.retryRenderPkl()
      }
    },

    renderChartKunjungan() {
      try {
        if (this.isDestroyed) return

        // Cleanup existing chart
        if (this.chartKunjungan) {
          this.chartKunjungan.destroy()
          this.chartKunjungan = null
        }

        // Validasi canvas
        const canvas = this.$refs.chartKunjunganCanvas
        if (!this.validateCanvas(canvas, 'Kunjungan')) {
          this.retryRenderKunjungan()
          return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          console.warn('Kunjungan Canvas context not available')
          this.retryRenderKunjungan()
          return
        }

        // Validasi data
        if (!this.dataKunjungan || this.dataKunjungan.length === 0) {
          console.warn('No kunjungan data available for chart')
          return
        }

        // Process data untuk chart
        const pesertaPerInstansi = this.dataKunjungan.reduce((acc, cur) => {
          const instansi = cur.nama_instansi || 'Tidak Diketahui'
          acc[instansi] = (acc[instansi] || 0) + (parseInt(cur.jumlah_peserta) || 0)
          return acc
        }, {})

        if (Object.keys(pesertaPerInstansi).length === 0) {
          console.warn('No processed data for kunjungan chart')
          return
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Create chart
        this.chartKunjungan = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(pesertaPerInstansi),
            datasets: [{
              label: 'Jumlah Peserta',
              data: Object.values(pesertaPerInstansi),
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 8,
              pointBackgroundColor: '#10B981',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
            }]
          },
          options: this.getChartOptions()
        })

        console.log('Kunjungan Chart rendered successfully')
        this.chartRenderAttempts.kunjungan = 0
      } catch (error) {
        console.error('Error rendering kunjungan chart:', error)
        this.retryRenderKunjungan()
      }
    },

    validateCanvas(canvas, type) {
      if (!canvas) {
        console.warn(`${type} Canvas element not found`)
        return false
      }

      // Check if canvas is properly mounted in DOM
      if (!canvas.parentNode || !document.contains(canvas)) {
        console.warn(`${type} Canvas not properly mounted in DOM`)
        return false
      }

      // Check canvas dimensions
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        console.warn(`${type} Canvas has zero dimensions`)
        return false
      }

      // Check if canvas is visible
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        console.warn(`${type} Canvas is not visible`)
        return false
      }

      return true
    },

    retryRenderPkl() {
      this.chartRenderAttempts.pkl++
      if (this.chartRenderAttempts.pkl < this.maxRenderAttempts && !this.isDestroyed) {
        const delay = Math.min(1000 * this.chartRenderAttempts.pkl, 5000)
        setTimeout(() => {
          if (!this.isDestroyed) {
            this.renderChartPkl()
          }
        }, delay)
      } else {
        console.error('Max retry attempts reached for PKL chart')
      }
    },

    retryRenderKunjungan() {
      this.chartRenderAttempts.kunjungan++
      if (this.chartRenderAttempts.kunjungan < this.maxRenderAttempts && !this.isDestroyed) {
        const delay = Math.min(1000 * this.chartRenderAttempts.kunjungan, 5000)
        setTimeout(() => {
          if (!this.isDestroyed) {
            this.renderChartKunjungan()
          }
        }, delay)
      } else {
        console.error('Max retry attempts reached for Kunjungan chart')
      }
    },

    getChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 750,
          easing: 'easeInOutQuart'
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#D1D5DB',
              font: {
                size: 12,
                family: 'Inter, sans-serif'
              },
              padding: 15
            }
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            titleColor: '#F9FAFB',
            bodyColor: '#D1D5DB',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 6,
            padding: 10
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#374151',
              drawBorder: false,
              lineWidth: 1
            },
            ticks: {
              color: '#9CA3AF',
              font: {
                size: 11
              },
              stepSize: 1,
              padding: 6
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#9CA3AF',
              font: {
                size: 11
              },
              maxRotation: 45,
              padding: 6
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        onResize: (chart, size) => {
          // Handle resize events safely
          if (chart && chart.canvas && size.width > 0 && size.height > 0) {
            chart.update('none')
          }
        }
      }
    },

    updateDateTime() {
      try {
        if (this.isDestroyed) return
        
        const now = new Date()
        // Format time
        this.time = now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        // Format date
        this.date = now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      } catch (error) {
        console.error('Error updating date/time:', error)
      }
    },

    cleanupResources() {
      // Clear timer
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }

      // Destroy charts safely
      if (this.chartPkl) {
        try {
          this.chartPkl.destroy()
        } catch (e) {
          console.warn('Error destroying PKL chart:', e)
        }
        this.chartPkl = null
      }

      if (this.chartKunjungan) {
        try {
          this.chartKunjungan.destroy()
        } catch (e) {
          console.warn('Error destroying Kunjungan chart:', e)
        }
        this.chartKunjungan = null
      }

      // Reset flags
      this.shouldRenderPklChart = false
      this.shouldRenderKunjunganChart = false
    },

    formatDate(dateStr) {
      try {
        if (!dateStr) return '-'
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateStr).toLocaleDateString('id-ID', options)
      } catch (error) {
        console.error('Error formatting date:', error)
        return dateStr || '-'
      }
    }
  }
}
</script>

<style scoped>
section > table {
  border-collapse: separate;
  border-spacing: 0 8px;
  width: 100%;
  font-size: 0.9rem;
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
  border-radius: 8px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: all 0.2s ease;
}

tbody tr:hover {
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}

td, th {
  padding: 0.75rem 1rem;
  vertical-align: middle;
  text-align: left;
  border: none !important;
}

.relative {
  position: relative;
}

.h-64 {
  height: 16rem;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

/* Loading state untuk canvas */
.chart-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9CA3AF;
  font-style: italic;
  font-size: 0.9rem;
}
</style>