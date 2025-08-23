<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <!-- Header -->
      <header class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-white mb-2">Laporan Data</h1>
          <p class="text-gray-400">Laporan dan analisis data PKL dan Kunjungan</p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Periode Laporan -->
          <div class="flex items-center bg-gray-800 rounded-xl shadow-inner border border-gray-700 px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span class="text-sm font-medium text-gray-300">{{ currentPeriod }}</span>
          </div>
        </div>
      </header>

      <!-- Filter dan Export -->
      <section class="max-w-7xl mx-auto mb-8">
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <!-- Filter Tanggal Mulai -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal Mulai</label>
              <input 
                v-model="filters.startDate"
                type="date"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
            </div>
            
            <!-- Filter Tanggal Akhir -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal Akhir</label>
              <input 
                v-model="filters.endDate"
                type="date"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
            </div>
            
            <!-- Filter Jenis Laporan -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Jenis Laporan</label>
              <select 
                v-model="filters.reportType"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="all">Semua</option>
                <option value="pkl" v-if="canAccessPkl">PKL</option>
                <option value="kunjungan" v-if="canAccessKunjungan">Kunjungan</option>
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
                @click="exportData"
                :disabled="isExporting"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                <i class="fas fa-download text-sm"></i>
                {{ isExporting ? 'Exporting...' : 'Export' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistik Laporan -->
      <section class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-400">Total PKL</p>
              <p class="text-2xl font-bold text-indigo-400">{{ filteredStats.totalPkl }}</p>
            </div>
            <i class="fas fa-clipboard-list text-3xl text-indigo-400"></i>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-400">Total Kunjungan</p>
              <p class="text-2xl font-bold text-green-400">{{ filteredStats.totalKunjungan }}</p>
            </div>
            <i class="fas fa-users text-3xl text-green-400"></i>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-400">PKL Selesai</p>
              <p class="text-2xl font-bold text-blue-400">{{ filteredStats.pklSelesai }}</p>
            </div>
            <i class="fas fa-check-circle text-3xl text-blue-400"></i>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-400">Total Peserta</p>
              <p class="text-2xl font-bold text-purple-400">{{ filteredStats.totalPeserta }}</p>
            </div>
            <i class="fas fa-user-friends text-3xl text-purple-400"></i>
          </div>
        </div>
      </section>

      <!-- Grafik Laporan -->
      <section class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Grafik Trend Bulanan -->
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-6 text-white">Trend Bulanan</h2>
          <div class="relative h-80">
            <canvas ref="trendChart" class="w-full h-full"></canvas>
          </div>
        </div>
        
        <!-- Grafik Status Distribution -->
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-6 text-white">Distribusi Status</h2>
          <div class="relative h-80">
            <canvas ref="statusChart" class="w-full h-full"></canvas>
          </div>
        </div>
      </section>

      <!-- Tabel Laporan PKL -->
      <section 
        v-if="canAccessPkl && (filters.reportType === 'all' || filters.reportType === 'pkl')"
        class="max-w-7xl mx-auto mb-8"
      >
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-white">Laporan Data PKL</h2>
            <span class="text-sm text-gray-400">{{ filteredPklData.length }} data ditemukan</span>
          </div>
          
          <div class="overflow-x-auto">
            <table v-if="filteredPklData.length > 0" class="min-w-full text-sm text-gray-300">
              <thead>
                <tr>
                  <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">No</th>
                  <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">Nama Lengkap</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Asal Instansi</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Tanggal Mulai</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Tanggal Selesai</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Durasi (Hari)</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in filteredPklData"
                  :key="item.id"
                  class="hover:bg-gray-700 transition cursor-default"
                >
                  <td class="py-4 px-6">{{ index + 1 }}</td>
                  <td class="py-4 px-6">{{ item.nama_lengkap }}</td>
                  <td class="py-4 px-6 text-center">{{ item.asal_instansi }}</td>
                  <td class="py-4 px-6 text-center">{{ formatDate(item.tanggal_mulai) }}</td>
                  <td class="py-4 px-6 text-center">{{ formatDate(item.tanggal_selesai) }}</td>
                  <td class="py-4 px-6 text-center">{{ calculateDuration(item.tanggal_mulai, item.tanggal_selesai) }}</td>
                  <td class="py-4 px-6 text-center">
                    <StatusBadge :status="item.status" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="text-center py-8 text-gray-400">
              Tidak ada data PKL yang sesuai dengan filter
            </div>
          </div>
        </div>
      </section>

      <!-- Tabel Laporan Kunjungan -->
      <section 
        v-if="canAccessKunjungan && (filters.reportType === 'all' || filters.reportType === 'kunjungan')"
        class="max-w-7xl mx-auto mb-8"
      >
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-white">Laporan Data Kunjungan</h2>
            <span class="text-sm text-gray-400">{{ filteredKunjunganData.length }} data ditemukan</span>
          </div>
          
          <div class="overflow-x-auto">
            <table v-if="filteredKunjunganData.length > 0" class="min-w-full text-sm text-gray-300">
              <thead>
                <tr>
                  <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">No</th>
                  <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">Nama Instansi</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Jumlah Peserta</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Tanggal Kunjungan</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Waktu</th>
                  <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in filteredKunjunganData"
                  :key="item.id"
                  class="hover:bg-gray-700 transition cursor-default"
                >
                  <td class="py-4 px-6">{{ index + 1 }}</td>
                  <td class="py-4 px-6">{{ item.nama_instansi }}</td>
                  <td class="py-4 px-6 text-center">{{ item.jumlah_peserta }}</td>
                  <td class="py-4 px-6 text-center">{{ formatDate(item.tanggal_kunjungan) }}</td>
                  <td class="py-4 px-6 text-center">{{ item.waktu || '-' }}</td>
                  <td class="py-4 px-6 text-center">
                    <StatusBadge :status="item.status" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="text-center py-8 text-gray-400">
              Tidak ada data kunjungan yang sesuai dengan filter
            </div>
          </div>
        </div>
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
import StatusBadge from '@/components/StatusBadge.vue'
import DashboardLayout from '../../layouts/DashboardLayout.vue'

export default {
  name: 'LaporanAdmin',
  components: { StatusBadge, DashboardLayout },
  data() {
    return {
      role: '',
      dataPkl: [],
      dataKunjungan: [],
      isLoading: false,
      isExporting: false,
      trendChart: null,
      statusChart: null,
      filters: {
        startDate: this.getDefaultStartDate(),
        endDate: this.getDefaultEndDate(),
        reportType: 'all'
      },
      currentPeriod: ''
    }
  },
  computed: {
    canAccessPkl() {
      return this.role === 'superadmin' || this.role === 'adminpkl'
    },
    canAccessKunjungan() {
      return this.role === 'superadmin' || this.role === 'adminkunjungan'
    },
    filteredPklData() {
      if (!this.canAccessPkl) return []
      return this.dataPkl.filter(item => {
        const itemDate = new Date(item.tanggal_mulai)
        const startDate = new Date(this.filters.startDate)
        const endDate = new Date(this.filters.endDate)
        return itemDate >= startDate && itemDate <= endDate
      })
    },
    filteredKunjunganData() {
      if (!this.canAccessKunjungan) return []
      return this.dataKunjungan.filter(item => {
        const itemDate = new Date(item.tanggal_kunjungan)
        const startDate = new Date(this.filters.startDate)
        const endDate = new Date(this.filters.endDate)
        return itemDate >= startDate && itemDate <= endDate
      })
    },
    filteredStats() {
      const pklData = this.filteredPklData
      const kunjunganData = this.filteredKunjunganData
      
      return {
        totalPkl: pklData.length,
        totalKunjungan: kunjunganData.length,
        pklSelesai: pklData.filter(item => item.status === 'selesai').length,
        totalPeserta: kunjunganData.reduce((sum, item) => sum + (parseInt(item.jumlah_peserta) || 0), 0)
      }
    }
  },
  async mounted() {
    await this.initializePage()
  },
  beforeUnmount() {
    this.destroyCharts()
  },
  methods: {
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
        
        await this.$nextTick()
        setTimeout(() => {
          this.renderCharts()
        }, 100)
      } catch (error) {
        console.error('Error initializing laporan:', error)
        this.isLoading = false
      }
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
      } catch (error) {
        console.error('Error fetching PKL data:', error)
        this.dataPkl = []
      }
    },

    async fetchKunjunganData() {
      try {
        const response = await axios.get('/api/kunjungan')
        this.dataKunjungan = response.data || []
      } catch (error) {
        console.error('Error fetching kunjungan data:', error)
        this.dataKunjungan = []
      }
    },

    applyFilters() {
      this.updateCurrentPeriod()
      this.renderCharts()
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

        // Convert to CSV or JSON
        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `laporan-${this.filters.reportType}-${new Date().toISOString().split('T')[0]}.json`
        link.click()
        
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error exporting data:', error)
      }
      this.isExporting = false
    },

    renderCharts() {
      this.destroyCharts()
      this.$nextTick(() => {
        this.renderTrendChart()
        this.renderStatusChart()
      })
    },

    renderTrendChart() {
      const canvas = this.$refs.trendChart
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      
      // Generate monthly trend data
      const monthlyData = this.generateMonthlyTrendData()
      
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
              tension: 0.4
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
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      
      // Generate status distribution data
      const statusData = this.generateStatusData()
      
      // Handle empty data
      if (statusData.values.length === 0) {
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
              '#10B981', // success/selesai
              '#F59E0B', // warning/proses
              '#EF4444', // error/ditolak
              '#6B7280', // gray/lainnya
              '#8B5CF6', // purple
              '#06B6D4'  // cyan
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
      
      // Generate last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const monthStr = date.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
        months.push(monthStr)
        
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        
        // Count PKL data for this month
        const pklCount = this.dataPkl.filter(item => {
          const itemDate = new Date(item.tanggal_mulai)
          return itemDate >= monthStart && itemDate <= monthEnd
        }).length
        pklData.push(pklCount)
        
        // Count Kunjungan data for this month
        const kunjunganCount = this.dataKunjungan.filter(item => {
          const itemDate = new Date(item.tanggal_kunjungan)
          return itemDate >= monthStart && itemDate <= monthEnd
        }).length
        kunjunganData.push(kunjunganCount)
      }
      
      return { labels: months, pkl: pklData, kunjungan: kunjunganData }
    },

    generateStatusData() {
      const statusCounts = {}
      
      // Count PKL statuses
      this.filteredPklData.forEach(item => {
        const status = item.status || 'unknown'
        statusCounts[status] = (statusCounts[status] || 0) + 1
      })
      
      // Count Kunjungan statuses
      this.filteredKunjunganData.forEach(item => {
        const status = item.status || 'unknown'
        statusCounts[status] = (statusCounts[status] || 0) + 1
      })
      
      return {
        labels: Object.keys(statusCounts),
        values: Object.values(statusCounts)
      }
    },

    destroyCharts() {
      if (this.trendChart) {
        this.trendChart.destroy()
        this.trendChart = null
      }
      if (this.statusChart) {
        this.statusChart.destroy()
        this.statusChart = null
      }
    },

    getDefaultStartDate() {
      const date = new Date()
      date.setMonth(date.getMonth() - 1)
      return date.toISOString().split('T')[0]
    },

    getDefaultEndDate() {
      return new Date().toISOString().split('T')[0]
    },

    updateCurrentPeriod() {
      const start = new Date(this.filters.startDate).toLocaleDateString('id-ID')
      const end = new Date(this.filters.endDate).toLocaleDateString('id-ID')
      this.currentPeriod = `${start} - ${end}`
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

.h-80 {
  height: 20rem;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>