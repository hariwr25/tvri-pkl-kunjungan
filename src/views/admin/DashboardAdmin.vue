<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <!-- Header -->
      <header class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <h1 class="text-4xl font-extrabold tracking-tight text-white">Dashboard Admin</h1>
        <div class="flex items-center space-x-6">
          <!-- Jam dan Tanggal Digital -->
          <div class="flex flex-col items-end bg-gray-800 rounded-xl shadow-inner border border-gray-700 px-5 py-3">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-mono text-xl font-medium text-white">{{ time }}</span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
              <span class="font-sans text-sm font-medium text-gray-300">{{ date }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Statistik Cards -->
      <section class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        <CardDashboard
          title="Total Pendaftar PKL"
          :value="dataPkl.length"
          icon="clipboard-list"
          class="bg-gray-800 text-indigo-400"
        />
        <CardDashboard
          title="Total Kunjungan"
          :value="dataKunjungan.length"
          icon="users"
          class="bg-gray-800 text-green-400"
        />
        <CardDashboard
          title="Role Anda"
          :value="role"
          icon="user-shield"
          :capitalize="true"
          class="bg-gray-800 text-purple-400"
        />
      </section>

      <!-- Grafik -->
      <section class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-6 text-white">Grafik Data PKL</h2>
          <div class="relative h-80">
            <canvas 
              ref="chartPklCanvas" 
              v-if="shouldRenderPklChart"
              class="w-full h-full"
            ></canvas>
          </div>
          <div v-if="dataPkl.length === 0" class="text-gray-400 italic text-center py-4">
            Tidak ada data PKL tersedia
          </div>
        </div>
        <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-6 text-white">Grafik Data Kunjungan</h2>
          <div class="relative h-80">
            <canvas 
              ref="chartKunjunganCanvas" 
              v-if="shouldRenderKunjunganChart"
              class="w-full h-full"
            ></canvas>
          </div>
          <div v-if="dataKunjungan.length === 0" class="text-gray-400 italic text-center py-4">
            Tidak ada data kunjungan tersedia
          </div>
        </div>
      </section>

      <!-- Tabel Data Pendaftar PKL -->
      <section
        v-if="(role === 'superadmin' || role === 'adminpkl') && dataPkl.length > 0"
        class="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-inner p-6 mb-12 border border-gray-700 overflow-auto"
      >
        <h2 class="text-2xl font-bold mb-6 text-white">Data Pendaftar PKL</h2>
        <table class="min-w-full text-sm text-gray-300">
          <thead>
            <tr>
              <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">Nama Lengkap</th>
              <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Asal Instansi</th>
              <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Tanggal Mulai</th>
              <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Tanggal Selesai</th>
              <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in dataPkl"
              :key="item.id"
              class="hover:bg-gray-700 transition cursor-default"
            >
              <td class="py-4 px-6">{{ item.nama_lengkap }}</td>
              <td class="py-4 px-6 text-center">{{ item.asal_instansi }}</td>
              <td class="py-4 px-6 text-center">{{ formatDate(item.tanggal_mulai) }}</td>
              <td class="py-4 px-6 text-center">{{ formatDate(item.tanggal_selesai) }}</td>
              <td class="py-4 px-6 text-center">
                <StatusBadge :status="item.status" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Tabel Data Kunjungan -->
      <section
        v-if="(role === 'superadmin' || role === 'adminkunjungan') && dataKunjungan.length > 0"
        class="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700 overflow-auto"
      >
        <h2 class="text-2xl font-bold mb-6 text-white">Data Kunjungan</h2>
        <table class="min-w-full text-sm text-gray-300">
          <thead>
            <tr>
              <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">Nama Instansi</th>
              <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Jumlah Peserta</th>
              <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Tanggal Kunjungan</th>
              <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in dataKunjungan"
              :key="item.id"
              class="hover:bg-gray-700 transition cursor-default"
            >
              <td class="py-4 px-6">{{ item.nama_instansi }}</td>
              <td class="py-4 px-6 text-center">{{ item.jumlah_peserta }}</td>
              <td class="py-4 px-6 text-center">{{ formatDate(item.tanggal_kunjungan) }}</td>
              <td class="py-4 px-6 text-center">
                <StatusBadge :status="item.status" />
              </td>
            </tr>
          </tbody>
        </table>
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
      chartRenderAttempts: 0,
      maxRenderAttempts: 3
    }
  },
  async mounted() {
    await this.initializeDashboard()
  },
  beforeUnmount() {
    this.cleanupResources()
  },
  methods: {
    async initializeDashboard() {
      try {
        const admin = JSON.parse(localStorage.getItem('admin'))
        if (!admin) {
          this.$router.push('/admin')
          return
        }
        this.role = admin.role

        this.updateDateTime()
        this.timerInterval = setInterval(this.updateDateTime, 1000)

        const loadPromises = []
        
        if (this.role === 'superadmin' || this.role === 'adminpkl') {
          loadPromises.push(this.fetchPklData())
        }

        if (this.role === 'superadmin' || this.role === 'adminkunjungan') {
          loadPromises.push(this.fetchKunjunganData())
        }

        await Promise.all(loadPromises)
        
        // Render charts after data is loaded
        await this.renderChartsWithDelay()
      } catch (error) {
        console.error('Error initializing dashboard:', error)
      }
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

    async renderChartsWithDelay() {
      // Wait for DOM to be fully rendered
      await this.$nextTick()
      
      // Add small delay to ensure canvas is ready
      setTimeout(() => {
        this.renderCharts()
      }, 100)
    },

    renderCharts() {
      // Enable chart rendering
      if (this.dataPkl.length > 0 && (this.role === 'superadmin' || this.role === 'adminpkl')) {
        this.shouldRenderPklChart = true
        this.$nextTick(() => {
          this.renderChartPkl()
        })
      }

      if (this.dataKunjungan.length > 0 && (this.role === 'superadmin' || this.role === 'adminkunjungan')) {
        this.shouldRenderKunjunganChart = true
        this.$nextTick(() => {
          this.renderChartKunjungan()
        })
      }
    },

    renderChartPkl() {
      try {
        if (this.chartPkl) {
          this.chartPkl.destroy()
          this.chartPkl = null
        }

        const canvas = this.$refs.chartPklCanvas
        if (!canvas) {
          console.warn('PKL Canvas not found')
          return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          console.warn('PKL Canvas context not available')
          return
        }

        // Validate data
        if (!this.dataPkl || this.dataPkl.length === 0) {
          console.warn('No PKL data available for chart')
          return
        }

        const countPerInstansi = this.dataPkl.reduce((acc, cur) => {
          const instansi = cur.asal_instansi || 'Tidak Diketahui'
          acc[instansi] = (acc[instansi] || 0) + 1
          return acc
        }, {})

        // Ensure we have data to render
        if (Object.keys(countPerInstansi).length === 0) {
          console.warn('No processed data for PKL chart')
          return
        }

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
      } catch (error) {
        console.error('Error rendering PKL chart:', error)
        this.chartRenderAttempts++
        
        // Retry rendering if under max attempts
        if (this.chartRenderAttempts < this.maxRenderAttempts) {
          setTimeout(() => {
            this.renderChartPkl()
          }, 500)
        }
      }
    },

    renderChartKunjungan() {
      try {
        if (this.chartKunjungan) {
          this.chartKunjungan.destroy()
          this.chartKunjungan = null
        }

        const canvas = this.$refs.chartKunjunganCanvas
        if (!canvas) {
          console.warn('Kunjungan Canvas not found')
          return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          console.warn('Kunjungan Canvas context not available')
          return
        }

        // Validate data
        if (!this.dataKunjungan || this.dataKunjungan.length === 0) {
          console.warn('No kunjungan data available for chart')
          return
        }

        const pesertaPerInstansi = this.dataKunjungan.reduce((acc, cur) => {
          const instansi = cur.nama_instansi || 'Tidak Diketahui'
          acc[instansi] = (acc[instansi] || 0) + (parseInt(cur.jumlah_peserta) || 0)
          return acc
        }, {})

        // Ensure we have data to render
        if (Object.keys(pesertaPerInstansi).length === 0) {
          console.warn('No processed data for kunjungan chart')
          return
        }

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
      } catch (error) {
        console.error('Error rendering kunjungan chart:', error)
        this.chartRenderAttempts++
        
        // Retry rendering if under max attempts
        if (this.chartRenderAttempts < this.maxRenderAttempts) {
          setTimeout(() => {
            this.renderChartKunjungan()
          }, 500)
        }
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
                size: 13,
                family: 'Inter, sans-serif'
              },
              padding: 20
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
            cornerRadius: 8,
            padding: 12
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
                size: 12
              },
              stepSize: 1,
              padding: 8
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
                size: 12
              },
              maxRotation: 45,
              padding: 8
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    },

    updateDateTime() {
      try {
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
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
      if (this.chartPkl) {
        this.chartPkl.destroy()
        this.chartPkl = null
      }
      if (this.chartKunjungan) {
        this.chartKunjungan.destroy()
        this.chartKunjungan = null
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

.relative {
  position: relative;
}

.h-80 {
  height: 20rem;
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
}
</style>