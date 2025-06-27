<template>
  <DashboardLayout>
<div class="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
  <!-- Header -->
  <header
    class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-4"
  >
    <h1 class="text-4xl font-extrabold tracking-tight text-white">
      Dashboard Admin
    </h1>
    <div class="flex items-center space-x-6">
      <!-- Jam dan Tanggal Digital -->
      <div class="flex flex-col items-end bg-gray-800 rounded-xl shadow-inner border border-gray-700 px-5 py-3">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-mono text-xl font-medium text-white">
            {{ time }}
          </span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="font-sans text-sm font-medium text-gray-300">
            {{ date }}
          </span>
        </div>
      </div>
    </div>
  </header> 

  <!-- Statistik Cards -->
  <section
    class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16"
  >
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
      <h2 class="text-xl font-semibold mb-6 text-white">
        Grafik Data PKL
      </h2>
      <canvas id="chartPkl" class="rounded-md"></canvas>
    </div>
    <div class="bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700">
      <h2 class="text-xl font-semibold mb-6 text-white">
        Grafik Data Kunjungan
      </h2>
      <canvas id="chartKunjungan" class="rounded-md"></canvas>
    </div>
  </section>

  <!-- Tabel Data Pendaftar PKL -->
  <section
    v-if="role === 'superadmin' || role === 'adminpkl'"
    class="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-inner p-6 mb-12 border border-gray-700 overflow-auto"
  >
    <h2 class="text-2xl font-bold mb-6 text-white">Data Pendaftar PKL</h2>
    <table class="min-w-full text-sm text-gray-300">
      <thead>
        <tr>
          <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">
            Nama Lengkap
          </th>
          <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">
            Asal Instansi
          </th>
          <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">
            Tanggal Mulai
          </th>
          <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">
            Tanggal Selesai
          </th>
          <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">
            Status
          </th>
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
        <tr v-if="dataPkl.length === 0">
          <td colspan="5" class="py-6 text-center text-gray-500 italic font-semibold">
            Belum ada data pendaftar PKL
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- Tabel Data Kunjungan -->
  <section
    v-if="role === 'superadmin' || role === 'adminkunjungan'"
    class="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-inner p-6 border border-gray-700 overflow-auto"
  >
    <h2 class="text-2xl font-bold mb-6 text-white">Data Kunjungan</h2>
    <table class="min-w-full text-sm text-gray-300">
      <thead>
        <tr>
          <th class="py-3 px-6 text-left font-semibold tracking-wide border-b border-gray-600">
            Nama Instansi
          </th>
          <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">
            Jumlah Peserta
          </th>
          <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">
            Tanggal Kunjungan
          </th>
          <th class="py-3 px-6 text-center font-semibold tracking-wide border-b border-gray-600">
            Status
          </th>
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
        <tr v-if="dataKunjungan.length === 0">
          <td colspan="4" class="py-6 text-center text-gray-500 italic font-semibold">
            Belum ada data kunjungan
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
  }
},
mounted() {
  const admin = JSON.parse(localStorage.getItem('admin'))
  if (!admin) {
    this.$router.push('/admin')
    return
  }
  this.role = admin.role

  if (this.role === 'superadmin' || this.role === 'adminpkl') {
    axios.get('/api/pkl')
      .then(res => {
        this.dataPkl = res.data
        this.renderChartPkl()
      })
      .catch(err => console.error(err))
  }

  if (this.role === 'superadmin' || this.role === 'adminkunjungan') {
    axios.get('/api/kunjungan')
      .then(res => {
        this.dataKunjungan = res.data
        this.renderChartKunjungan()
      })
      .catch(err => console.error(err))
  }

  this.updateDateTime()
  this.timerInterval = setInterval(this.updateDateTime, 1000)
},
beforeUnmount() {
  if (this.timerInterval) clearInterval(this.timerInterval)
  if (this.chartPkl) this.chartPkl.destroy()
  if (this.chartKunjungan) this.chartKunjungan.destroy()
},
methods: {
  updateDateTime() {
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
  },
  handleLogout() {
    localStorage.removeItem('admin')
    this.$router.push('/admin')
  },
  formatDate(dateStr) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateStr).toLocaleDateString('id-ID', options)
  },
  renderChartPkl() {
    this.$nextTick(() => {
      if (this.chartPkl) this.chartPkl.destroy()
      const canvas = document.getElementById('chartPkl')
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      const countPerInstansi = this.dataPkl.reduce((acc, cur) => {
        acc[cur.asal_instansi] = (acc[cur.asal_instansi] || 0) + 1
        return acc
      }, {})

      this.chartPkl = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(countPerInstansi),
          datasets: [{
            label: 'Jumlah Pendaftar',
            data: Object.values(countPerInstansi),
            backgroundColor: '#6366F1',
            borderRadius: 6,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
              grid: { color: '#4B5563' },
            },
            x: {
              grid: { display: false },
              ticks: { color: '#9CA3AF' },
            },
          },
        },
      })
    })
  },
  renderChartKunjungan() {
    this.$nextTick(() => {
      if (this.chartKunjungan) this.chartKunjungan.destroy()
      const canvas = document.getElementById('chartKunjungan')
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      const pesertaPerInstansi = this.dataKunjungan.reduce((acc, cur) => {
        acc[cur.nama_instansi] = (acc[cur.nama_instansi] || 0) + cur.jumlah_peserta
        return acc
      }, {})

      this.chartKunjungan = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(pesertaPerInstansi),
          datasets: [{
            label: 'Jumlah Peserta',
            data: Object.values(pesertaPerInstansi),
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.25)',
            fill: true,
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, labels: { color: '#D1D5DB' } },
            tooltip: { enabled: true },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: '#1E40AF' },
              ticks: { color: '#D1D5DB' },
            },
            x: {
              grid: { display: false },
              ticks: { color: '#9CA3AF' },
            },
          },
        },
      })
    })
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
color: #D1D5DB; /* Tailwind gray-300 */
}

thead tr {
text-transform: uppercase;
font-weight: 600;
color: #9CA3AF; /* Tailwind gray-400 */
border-bottom: 2px solid #374151; /* Tailwind gray-700 */
}

tbody tr {
background: #1F2937; /* Tailwind gray-800 */
border-radius: 10px;
box-shadow: 0 1px 5px rgb(0 0 0 / 0.3);
transition: all 0.2s ease;
}

tbody tr:hover {
box-shadow: 0 8px 16px rgba(99, 102, 241, 0.5); /* indigo-500 subtle */
transform: translateY(-3px);
}

td,
th {
padding: 1rem 1.25rem;
vertical-align: middle;
text-align: left;
border: none !important;
}
</style>