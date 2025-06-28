<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <!-- Header -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Data PKL</h1>
          <p class="text-gray-400">Kelola data pengajuan Praktik Kerja Lapangan</p>
        </div>
        <div class="flex items-center gap-4">
          <!-- Refresh Button -->
          <button 
            @click="refreshData"
            :disabled="loading"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            title="Refresh Data"
          >
            <i class="fas fa-sync-alt" :class="{'animate-spin': loading}"></i>
            Refresh
          </button>
          
          <!-- Export Button -->
          <button 
            @click="exportData"
            :disabled="filteredData.length === 0"
            class="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            title="Export ke CSV"
          >
            <i class="fas fa-download"></i>
            Export
          </button>
          
          <!-- Filter Status -->
          <select 
            v-model="filterStatus" 
            @change="filterData"
            class="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <!-- Search -->
          <div class="relative">
            <input 
              v-model="searchQuery"
              @input="filterData"
              type="text" 
              placeholder="Cari nama atau instansi..."
              class="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            >
            <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </header>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Total Pengajuan</p>
              <p class="text-2xl font-bold text-white">{{ totalData }}</p>
            </div>
            <i class="fas fa-clipboard-list text-indigo-500 text-2xl"></i>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Pending</p>
              <p class="text-2xl font-bold text-yellow-400">{{ statusCount.pending }}</p>
            </div>
            <i class="fas fa-clock text-yellow-500 text-2xl"></i>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Approved</p>
              <p class="text-2xl font-bold text-green-400">{{ statusCount.approved }}</p>
            </div>
            <i class="fas fa-check-circle text-green-500 text-2xl"></i>
          </div>
        </div>
        
        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Rejected</p>
              <p class="text-2xl font-bold text-red-400">{{ statusCount.rejected }}</p>
            </div>
            <i class="fas fa-times-circle text-red-500 text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-white">Daftar Pengajuan PKL</h2>
          <div class="text-sm text-gray-400">
            Menampilkan {{ filteredData.length }} dari {{ totalData }} data
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span class="ml-3 text-gray-400">Memuat data...</span>
        </div>
        
        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-750">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Nama Lengkap
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Asal Instansi
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Periode PKL
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Berkas
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-800 divide-y divide-gray-700">
              <tr v-for="item in filteredData" :key="item.id" class="hover:bg-gray-700 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                        <span class="text-sm font-medium text-white">{{ getInitials(item.nama_lengkap) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-white">{{ item.nama_lengkap }}</div>
                      <div class="text-sm text-gray-400">{{ item.email }}</div>
                      <div class="text-xs text-gray-500">{{ item.no_hp }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-white">{{ item.asal_instansi }}</div>
                  <div class="text-sm text-gray-400">{{ item.jurusan }}</div>
                  <div class="text-xs text-gray-500">{{ item.nim_nisn }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-white">{{ formatDate(item.tanggal_mulai) }}</div>
                  <div class="text-sm text-gray-400">s/d {{ formatDate(item.tanggal_selesai) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <StatusBadge :status="item.status" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col gap-1">
                    <button 
                      v-if="item.surat_pengantar"
                      @click="viewDocument(item.surat_pengantar, 'Surat Pengantar', 'pkl')"
                      class="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <i class="fas fa-file-pdf"></i>
                      Surat Pengantar
                    </button>
                    <button 
                      v-if="item.cv"
                      @click="viewDocument(item.cv, 'CV', 'pkl')"
                      class="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <i class="fas fa-file-alt"></i>
                      CV
                    </button>
                    <button 
                      v-if="item.nilai_raport_transkrip"
                      @click="viewDocument(item.nilai_raport_transkrip, 'Nilai/Transkrip', 'pkl')"
                      class="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <i class="fas fa-file-text"></i>
                      Nilai/Transkrip
                    </button>
                    <button 
                      v-if="item.kartu_pelajar"
                      @click="viewDocument(item.kartu_pelajar, 'Kartu Pelajar', 'pkl')"
                      class="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <i class="fas fa-id-card"></i>
                      Kartu Pelajar
                    </button>
                    <button 
                      v-if="item.foto_id_card"
                      @click="viewDocument(item.foto_id_card, 'Foto ID Card', 'pkl')"
                      class="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <i class="fas fa-image"></i>
                      Foto ID
                    </button>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <button 
                      @click="viewDetail(item)"
                      class="text-indigo-400 hover:text-indigo-300 transition-colors p-1"
                      title="Lihat Detail"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    <button 
                      v-if="item.status === 'pending'"
                      @click="updateStatus(item.id, 'approved')"
                      :disabled="updating"
                      class="text-green-400 hover:text-green-300 disabled:text-gray-500 transition-colors p-1"
                      title="Approve"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button 
                      v-if="item.status === 'pending'"
                      @click="updateStatus(item.id, 'rejected')"
                      :disabled="updating"
                      class="text-red-400 hover:text-red-300 disabled:text-gray-500 transition-colors p-1"
                      title="Reject"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                    <!-- Loading indicator for status update -->
                    <div v-if="updating && updatingId === item.id" class="text-yellow-400">
                      <i class="fas fa-spinner animate-spin"></i>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-if="filteredData.length === 0 && !loading">
                <td colspan="6" class="px-6 py-12 text-center">
                  <div class="text-gray-400">
                    <i class="fas fa-inbox text-4xl mb-4"></i>
                    <p class="text-lg">Tidak ada data PKL</p>
                    <p class="text-sm">
                      {{ searchQuery || filterStatus ? 'Tidak ada data yang sesuai dengan filter' : 'Data akan muncul setelah ada pengajuan baru' }}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Document Viewer Modal -->
      <div v-if="showDocumentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-700">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-700">
            <h3 class="text-xl font-semibold text-white">{{ documentTitle }}</h3>
            <button @click="closeDocumentModal" class="text-gray-400 hover:text-white">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <!-- Modal Body -->
          <div class="flex-1 p-6 overflow-hidden">
            <div class="h-full flex items-center justify-center bg-gray-900 rounded-lg">
              <iframe 
                v-if="documentUrl"
                :src="documentUrl" 
                class="w-full h-96 md:h-[500px] rounded-lg"
                frameborder="0"
              ></iframe>
              <div v-else class="text-gray-400">
                <i class="fas fa-file-alt text-4xl mb-4"></i>
                <p>Dokumen tidak dapat dimuat</p>
              </div>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="p-6 border-t border-gray-700 flex justify-end gap-3">
            <button 
              @click="downloadDocument"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <i class="fas fa-download"></i>
              Download
            </button>
            <button 
              @click="closeDocumentModal"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>

      <!-- Detail Modal -->
      <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-700">
            <h3 class="text-xl font-semibold text-white">Detail Pengajuan PKL</h3>
            <button @click="closeDetailModal" class="text-gray-400 hover:text-white">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <!-- Modal Body -->
          <div class="p-6 space-y-4" v-if="selectedItem">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Nama Lengkap</label>
                <p class="text-white">{{ selectedItem.nama_lengkap || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <p class="text-white">{{ selectedItem.email || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">No. HP</label>
                <p class="text-white">{{ selectedItem.no_hp || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Asal Instansi</label>
                <p class="text-white">{{ selectedItem.asal_instansi || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">NIM/NISN</label>
                <p class="text-white">{{ selectedItem.nim_nisn || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Jurusan</label>
                <p class="text-white">{{ selectedItem.jurusan || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Jenjang Pendidikan</label>
                <p class="text-white">{{ selectedItem.jenjang_pendidikan || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <StatusBadge :status="selectedItem.status" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Tanggal Mulai</label>
                <p class="text-white">{{ formatDate(selectedItem.tanggal_mulai) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Tanggal Selesai</label>
                <p class="text-white">{{ formatDate(selectedItem.tanggal_selesai) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Unit Kerja</label>
                <p class="text-white">{{ selectedItem.unit_kerja || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Jangka Waktu</label>
                <p class="text-white">{{ selectedItem.jangka_waktu || '-' }}</p>
              </div>
            </div>
            
            <div v-if="selectedItem.deskripsi_diri">
              <label class="block text-sm font-medium text-gray-400 mb-1">Deskripsi Diri</label>
              <p class="text-white bg-gray-700 p-3 rounded-lg">{{ selectedItem.deskripsi_diri }}</p>
            </div>
            
            <div v-if="selectedItem.alasan_pilih_tvri">
              <label class="block text-sm font-medium text-gray-400 mb-1">Alasan Memilih TVRI</label>
              <p class="text-white bg-gray-700 p-3 rounded-lg">{{ selectedItem.alasan_pilih_tvri }}</p>
            </div>
            
            <div v-if="selectedItem.portofolio_link">
              <label class="block text-sm font-medium text-gray-400 mb-1">Portofolio Link</label>
              <a :href="selectedItem.portofolio_link" target="_blank" class="text-indigo-400 hover:text-indigo-300 underline">
                {{ selectedItem.portofolio_link }}
              </a>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="p-6 border-t border-gray-700 flex justify-end">
            <button 
              @click="closeDetailModal"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>

      <!-- Toast Notification Area -->
      <div v-if="showToast" class="fixed bottom-4 right-4 z-50">
        <div :class="toastClass" class="px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <i :class="toastIcon"></i>
          <span>{{ toastMessage }}</span>
          <button @click="hideToast" class="ml-2 text-white hover:text-gray-300">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import axios from 'axios'
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import StatusBadge from '@/components/StatusBadge.vue'

export default {
  name: 'DataPkl',
  components: { 
    DashboardLayout, 
    StatusBadge 
  },
  data() {
    return {
      dataPkl: [],
      filteredData: [],
      loading: true,
      updating: false,
      updatingId: null,
      searchQuery: '',
      filterStatus: '',
      showDocumentModal: false,
      showDetailModal: false,
      documentUrl: '',
      documentTitle: '',
      selectedItem: null,
      // Toast notification
      showToast: false,
      toastMessage: '',
      toastType: 'success', // success, error, info
      toastTimeout: null
    }
  },
  computed: {
    totalData() {
      return this.dataPkl.length
    },
    statusCount() {
      return {
        pending: this.dataPkl.filter(item => item.status === 'pending').length,
        approved: this.dataPkl.filter(item => item.status === 'approved').length,
        rejected: this.dataPkl.filter(item => item.status === 'rejected').length
      }
    },
    toastClass() {
      const baseClass = 'transition-all duration-300 '
      switch (this.toastType) {
        case 'success':
          return baseClass + 'bg-green-600 text-white'
        case 'error':
          return baseClass + 'bg-red-600 text-white'
        case 'info':
          return baseClass + 'bg-blue-600 text-white'
        default:
          return baseClass + 'bg-gray-600 text-white'
      }
    },
    toastIcon() {
      switch (this.toastType) {
        case 'success':
          return 'fas fa-check-circle'
        case 'error':
          return 'fas fa-exclamation-circle'
        case 'info':
          return 'fas fa-info-circle'
        default:
          return 'fas fa-bell'
      }
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    // Toast notification methods
    showToastMessage(message, type = 'success') {
      this.toastMessage = message
      this.toastType = type
      this.showToast = true
      
      // Clear existing timeout
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout)
      }
      
      // Auto hide after 5 seconds
      this.toastTimeout = setTimeout(() => {
        this.hideToast()
      }, 5000)
    },
    
    hideToast() {
      this.showToast = false
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout)
      }
    },

    async fetchData() {
      try {
        this.loading = true
        console.log('Fetching PKL data...')
        
        const response = await axios.get('http://localhost:5050/api/pkl')
        console.log('PKL data received:', response.data)
        
        this.dataPkl = response.data
        this.filteredData = [...this.dataPkl]
        
        console.log('Data PKL loaded:', this.dataPkl.length, 'items')
      } catch (error) {
        console.error('Error fetching PKL data:', error)
        
        if (error.response) {
          console.error('Response error:', error.response.status, error.response.data)
          this.showToastMessage(`Gagal memuat data PKL: ${error.response.data?.message || 'Server error'}`, 'error')
        } else if (error.request) {
          console.error('Network error:', error.request)
          this.showToastMessage('Gagal memuat data PKL: Tidak dapat terhubung ke server', 'error')
        } else {
          console.error('Error message:', error.message)
          this.showToastMessage(`Gagal memuat data PKL: ${error.message}`, 'error')
        }
      } finally {
        this.loading = false
      }
    },
    
    filterData() {
      let filtered = [...this.dataPkl]
      
      // Filter by status
      if (this.filterStatus) {
        filtered = filtered.filter(item => item.status === this.filterStatus)
      }
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(item => 
          item.nama_lengkap?.toLowerCase().includes(query) ||
          item.asal_instansi?.toLowerCase().includes(query) ||
          item.email?.toLowerCase().includes(query) ||
          item.nim_nisn?.toLowerCase().includes(query) ||
          item.jurusan?.toLowerCase().includes(query)
        )
      }
      
      this.filteredData = filtered
      console.log('Filtered data:', this.filteredData.length, 'items')
    },
    
    viewDocument(filename, title, folder) {
      if (!filename) {
        this.showToastMessage('File tidak tersedia', 'error')
        return
      }
      
      this.documentTitle = title
      this.documentUrl = `http://localhost:5050/uploads/${folder}/${filename}`
      this.showDocumentModal = true
      
      console.log('Opening document:', this.documentUrl)
    },
    
    downloadDocument() {
      if (this.documentUrl) {
        try {
          const link = document.createElement('a')
          link.href = this.documentUrl
          link.download = this.documentTitle
          link.target = '_blank'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          console.log('Download initiated:', this.documentUrl)
          this.showToastMessage('Download dimulai', 'success')
        } catch (error) {
          console.error('Download error:', error)
          this.showToastMessage('Gagal mengunduh dokumen', 'error')
        }
      }
    },
    
    closeDocumentModal() {
      this.showDocumentModal = false
      this.documentUrl = ''
      this.documentTitle = ''
    },
    
    viewDetail(item) {
      this.selectedItem = item
      this.showDetailModal = true
      console.log('Viewing detail for:', item.nama_lengkap)
    },
    
    closeDetailModal() {
      this.showDetailModal = false
      this.selectedItem = null
    },
    
    async updateStatus(id, newStatus) {
      // Mencegah multiple request
      if (this.updating) {
        console.log('Update already in progress...')
        return
      }

      try {
        console.log('Attempting to update status:', { id, newStatus })
        
        // Validasi input
        if (!id || !newStatus) {
          this.showToastMessage('Data tidak valid', 'error')
          return
        }

        if (!['approved', 'rejected'].includes(newStatus)) {
          this.showToastMessage('Status tidak valid', 'error')
          return
        }
        
        // Konfirmasi sebelum mengubah status
        const statusText = newStatus === 'approved' ? 'MENYETUJUI' : 'MENOLAK'
        const confirmation = confirm(
          `Apakah Anda yakin ingin ${statusText} pengajuan PKL ini?\n\nTindakan ini tidak dapat dibatalkan.`
        )
        
        if (!confirmation) {
          console.log('User cancelled status update')
          return
        }

        this.updating = true
        this.updatingId = id
        
        // Tampilkan loading state di UI
        this.showToastMessage('Sedang memproses...', 'info')
        
        console.log('Sending request to:', `http://localhost:5050/api/pkl/${id}/status`)
        console.log('Request payload:', { status: newStatus })
        
        const response = await axios.put(`http://localhost:5050/api/pkl/${id}/status`, { 
          status: newStatus 
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        })
        
        console.log('Update response:', response.data)
        
        // Update local data jika berhasil
        const itemIndex = this.dataPkl.findIndex(item => item.id === id)
        if (itemIndex !== -1) {
          const oldStatus = this.dataPkl[itemIndex].status
          this.dataPkl[itemIndex].status = newStatus
          this.filterData() // Re-apply filters
          
          console.log(`Status updated locally: ${oldStatus} -> ${newStatus}`)
        } else {
          console.warn('Item not found in local data for update')
        }
        
        // Show success message
        const successText = newStatus === 'approved' ? 'Disetujui' : 'Ditolak'
        this.showToastMessage(`✅ Status berhasil diubah menjadi ${successText}`, 'success')
        
      } catch (error) {
        console.error('Error updating status:', error)
        
        // Detailed error handling
        if (error.response) {
          const statusCode = error.response.status
          const errorData = error.response.data
          
          console.error('Response error details:', {
            status: statusCode,
            data: errorData,
            headers: error.response.headers
          })
          
          if (statusCode === 404) {
            this.showToastMessage('Data PKL tidak ditemukan', 'error')
          } else if (statusCode === 400) {
            this.showToastMessage(`Input tidak valid: ${errorData?.message || 'Bad request'}`, 'error')
          } else if (statusCode === 500) {
            this.showToastMessage(`Server error: ${errorData?.message || 'Internal server error'}`, 'error')
          } else {
            this.showToastMessage(`Gagal mengubah status: ${errorData?.message || `HTTP ${statusCode}`}`, 'error')
          }
        } else if (error.request) {
          console.error('Network error details:', error.request)
          this.showToastMessage('❌ Tidak dapat terhubung ke server. Periksa koneksi internet Anda.', 'error')
        } else {
          console.error('Request setup error:', error.message)
          this.showToastMessage(`❌ Kesalahan: ${error.message}`, 'error')
        }
        
        // Refresh data untuk memastikan konsistensi
        console.log('Refreshing data after error...')
        await this.fetchData()
        
      } finally {
        this.updating = false
        this.updatingId = null
      }
    },
    
    formatDate(dateStr) {
      if (!dateStr) return '-'
      
      try {
        const options = { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          timeZone: 'Asia/Jakarta'
        }
        return new Date(dateStr).toLocaleDateString('id-ID', options)
      } catch (error) {
        console.error('Date formatting error:', error)
        return dateStr // Return original string if formatting fails
      }
    },
    
    getInitials(name) {
      if (!name) return '??'
      
      try {
        return name
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase()
          .slice(0, 2)
      } catch (error) {
        console.error('Initials generation error:', error)
        return '??'
      }
    },

    // Method untuk refresh data
    async refreshData() {
      console.log('Manual refresh triggered')
      await this.fetchData()
      this.showToastMessage('Data berhasil di-refresh', 'success')
    },

    // Method untuk export data ke CSV
    exportData() {
      try {
        if (this.filteredData.length === 0) {
          this.showToastMessage('Tidak ada data untuk diekspor', 'error')
          return
        }

        const dataToExport = this.filteredData.map(item => ({
          'Nama Lengkap': item.nama_lengkap || '',
          'Asal Instansi': item.asal_instansi || '',
          'NIM/NISN': item.nim_nisn || '',
          'Jurusan': item.jurusan || '',
          'Email': item.email || '',
          'No HP': item.no_hp || '',
          'Tanggal Mulai': this.formatDate(item.tanggal_mulai),
          'Tanggal Selesai': this.formatDate(item.tanggal_selesai),
          'Status': item.status || '',
          'Unit Kerja': item.unit_kerja || '',
          'Jenjang Pendidikan': item.jenjang_pendidikan || ''
        }))

        // Create CSV content
        const headers = Object.keys(dataToExport[0]).join(',')
        const csvContent = dataToExport.map(row => 
          Object.values(row).map(value => 
            `"${String(value).replace(/"/g, '""')}"` // Escape quotes
          ).join(',')
        ).join('\n')
        
        const fullCsv = headers + '\n' + csvContent
        
        // Create and download file
        const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        
        link.setAttribute('href', url)
        link.setAttribute('download', `data_pkl_${new Date().toISOString().slice(0,10)}.csv`)
        link.style.visibility = 'hidden'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        URL.revokeObjectURL(url)

        this.showToastMessage(`Data berhasil diekspor (${this.filteredData.length} baris)`, 'success')
        console.log('Data exported successfully')
      } catch (error) {
        console.error('Export error:', error)
        this.showToastMessage('Gagal mengekspor data', 'error')
      }
    }
  },
  
  // Lifecycle hook untuk cleanup
  beforeUnmount() {
    console.log('Component unmounting, cleaning up...')
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout)
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Smooth transitions */
.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease;
}

/* Table hover effect */
tbody tr:hover {
  background-color: #374151 !important;
}

/* Modal backdrop blur */
.fixed.inset-0 {
  backdrop-filter: blur(4px);
}

/* Button hover effects */
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Animation for toast */
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

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.transition-all {
  animation: slideInRight 0.3s ease-out;
}

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive design improvements */
@media (max-width: 768px) {
  .overflow-x-auto {
    scrollbar-width: thin;
  }
  
  .text-xs {
    font-size: 0.65rem;
  }
  
  .px-3 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>