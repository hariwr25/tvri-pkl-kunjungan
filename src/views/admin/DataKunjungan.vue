<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <!-- Header -->
      <div class="px-6 py-4">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">Data Kunjungan</h1>
            <p class="text-sm md:text-base text-gray-400">Kelola data kunjungan ke lokasi TVRI</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <!-- Export Button -->
            <button 
              @click="exportData"
              :disabled="filteredData.length === 0"
              class="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
              title="Export ke CSV"
            >
              <i class="fas fa-download"></i>
              <span class="hidden sm:inline">Export</span>
            </button>
            
            <!-- Filter Status -->
            <select 
              v-model="filterStatus" 
              @change="filterData"
              class="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-full md:w-auto"
            >
              <option value="">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="diterima">Diterima</option>
              <option value="ditolak">Ditolak</option>
            </select>
            
            <!-- Search -->
            <div class="relative w-full md:w-48">
              <input 
                v-model="searchQuery"
                @input="filterData"
                type="text" 
                placeholder="Cari nama atau instansi..."
                class="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-sm"
              >
              <i class="fas fa-search absolute right-3 top-2.5 text-gray-400"></i>
            </div>
          </div>
        </header>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div class="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-xs md:text-sm">Total Kunjungan</p>
                <p class="text-xl md:text-2xl font-bold text-white">{{ totalData }}</p>
              </div>
              <i class="fas fa-users text-indigo-500 text-lg md:text-2xl"></i>
            </div>
          </div>
          
          <div class="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-xs md:text-sm">Pending</p>
                <p class="text-xl md:text-2xl font-bold text-yellow-400">{{ statusCount.pending }}</p>
              </div>
              <i class="fas fa-clock text-yellow-500 text-lg md:text-2xl"></i>
            </div>
          </div>
          
          <div class="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-xs md:text-sm">Diterima</p>
                <p class="text-xl md:text-2xl font-bold text-green-400">{{ statusCount.diterima }}</p>
              </div>
              <i class="fas fa-check-circle text-green-500 text-lg md:text-2xl"></i>
            </div>
          </div>
          
          <div class="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-xs md:text-sm">Ditolak</p>
                <p class="text-xl md:text-2xl font-bold text-red-400">{{ statusCount.ditolak }}</p>
              </div>
              <i class="fas fa-times-circle text-red-500 text-lg md:text-2xl"></i>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div class="p-4 md:p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-lg md:text-xl font-semibold text-white">Daftar Kunjungan</h2>
            <div class="text-xs md:text-sm text-gray-400">
              Menampilkan {{ filteredData.length }} dari {{ totalData }} data
            </div>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center py-8 md:py-12">
            <div class="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-indigo-500"></div>
            <span class="ml-3 text-gray-400 text-sm">Memuat data...</span>
          </div>
          
          <!-- Table -->
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-700">
              <thead class="bg-gray-750">
                <tr>
                  <th class="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Kontak Person
                  </th>
                  <th class="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden md:table-cell">
                    Instansi
                  </th>
                  <th class="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                    Tanggal
                  </th>
                  <th class="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th class="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Berkas
                  </th>
                  <th class="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-gray-800 divide-y divide-gray-700">
                <tr v-for="item in filteredData" :key="item.id" class="hover:bg-gray-700 transition-colors">
                  <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8 md:h-10 md:w-10">
                        <div class="h-8 w-8 md:h-10 md:w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                          <span class="text-xs md:text-sm font-medium text-white">{{ getInitials(item.kontak_person) }}</span>
                        </div>
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-white">{{ item.kontak_person }}</div>
                        <div class="text-xs text-gray-400 md:hidden">{{ item.nama_instansi }}</div>
                        <div class="text-xs text-gray-500 hidden md:block">{{ item.email }}</div>
                        <div class="text-xs text-gray-500 hidden lg:block">{{ item.no_hp }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap hidden md:table-cell">
                    <div class="text-sm text-white">{{ item.nama_instansi }}</div>
                    <div v-if="item.surat_pengantar" class="text-xs text-gray-500">
                      <i class="fas fa-paperclip"></i> Surat Pengantar
                    </div>
                  </td>
                  <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap hidden lg:table-cell">
                    <div class="text-sm text-white">{{ formatDate(item.tanggal_kunjungan) }}</div>
                  </td>
                  <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <div class="text-sm text-white">{{ item.jumlah_peserta }} orang</div>
                  </td>
                  <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <StatusBadge :status="item.status" />
                  </td>
                  <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    <div class="flex flex-col gap-1">
                      <button 
                        v-if="item.surat_pengantar"
                        @click="viewDocument(item.surat_pengantar, 'Surat Pengantar')"
                        class="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 md:px-3 md:py-1 rounded-md transition-colors flex items-center gap-1"
                      >
                        <i class="fas fa-file-pdf text-xs"></i>
                        <span class="hidden sm:inline">Surat</span>
                      </button>
                    </div>
                  </td>
                  <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center gap-1 md:gap-2">
                      <button 
                        @click="viewDetail(item)"
                        class="text-indigo-400 hover:text-indigo-300 transition-colors p-1"
                        title="Lihat Detail"
                      >
                        <i class="fas fa-eye text-sm md:text-base"></i>
                      </button>
                      <button 
                        v-if="item.status === 'pending'"
                        @click="updateStatus(item.id, 'diterima')"
                        :disabled="updating"
                        class="text-green-400 hover:text-green-300 disabled:text-gray-500 transition-colors p-1"
                        title="Terima"
                      >
                        <i class="fas fa-check text-sm md:text-base"></i>
                      </button>
                      <button 
                        v-if="item.status === 'pending'"
                        @click="showRejectModal(item)"
                        :disabled="updating"
                        class="text-red-400 hover:text-red-300 disabled:text-gray-500 transition-colors p-1"
                        title="Tolak"
                      >
                        <i class="fas fa-times text-sm md:text-base"></i>
                      </button>
                      <button 
                        @click="deleteData(item.id)"
                        :disabled="updating"
                        class="text-red-400 hover:text-red-300 disabled:text-gray-500 transition-colors p-1"
                        title="Hapus"
                      >
                        <i class="fas fa-trash text-sm md:text-base"></i>
                      </button>
                      <!-- Loading indicator for status update -->
                      <div v-if="updating && updatingId === item.id" class="text-yellow-400">
                        <i class="fas fa-spinner animate-spin text-sm md:text-base"></i>
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Empty State -->
                <tr v-if="filteredData.length === 0 && !loading">
                  <td colspan="7" class="px-6 py-8 md:py-12 text-center">
                    <div class="text-gray-400">
                      <i class="fas fa-inbox text-3xl md:text-4xl mb-3"></i>
                      <p class="text-base md:text-lg">Tidak ada data Kunjungan</p>
                      <p class="text-xs md:text-sm mt-1">
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
            <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
              <h3 class="text-lg md:text-xl font-semibold text-white">{{ documentTitle }}</h3>
              <button @click="closeDocumentModal" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-lg md:text-xl"></i>
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="flex-1 p-4 md:p-6 overflow-hidden">
              <div class="h-full flex items-center justify-center bg-gray-900 rounded-lg">
                <iframe 
                  v-if="documentUrl"
                  :src="documentUrl" 
                  class="w-full h-64 md:h-96 lg:h-[500px] rounded-lg"
                  frameborder="0"
                ></iframe>
                <div v-else class="text-gray-400">
                  <i class="fas fa-file-alt text-3xl md:text-4xl mb-3"></i>
                  <p>Dokumen tidak dapat dimuat</p>
                </div>
              </div>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-4 md:p-6 border-t border-gray-700 flex justify-end gap-2 md:gap-3">
              <button 
                @click="downloadDocument"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <i class="fas fa-download"></i>
                Download
              </button>
              <button 
                @click="closeDocumentModal"
                class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors text-sm"
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
            <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
              <h3 class="text-lg md:text-xl font-semibold text-white">Detail Kunjungan</h3>
              <button @click="closeDetailModal" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-lg md:text-xl"></i>
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-4 md:p-6 space-y-4" v-if="selectedItem">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Kontak Person</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.kontak_person || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.email || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">No. HP</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.no_hp || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Nama Instansi</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.nama_instansi || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Tanggal Kunjungan</label>
                  <p class="text-white text-sm md:text-base">{{ formatDate(selectedItem.tanggal_kunjungan) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Jumlah Peserta</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.jumlah_peserta || '-' }} orang</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <StatusBadge :status="selectedItem.status" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Surat Pengantar</label>
                  <p class="text-white text-sm md:text-base">
                    <span v-if="selectedItem.surat_pengantar" class="text-green-400">
                      <i class="fas fa-check-circle"></i> Ada
                    </span>
                    <span v-else class="text-gray-400">Tidak ada</span>
                  </p>
                </div>
              </div>
              
              <!-- Tombol untuk melihat surat pengantar di modal detail -->
              <div v-if="selectedItem.surat_pengantar" class="mt-4">
                <button 
                  @click="handleViewDocumentFromModal(selectedItem.surat_pengantar, 'Surat Pengantar')"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
                >
                  <i class="fas fa-file-pdf"></i>
                  Lihat Surat Pengantar
                </button>
              </div>
              
              <!-- Surat Balasan jika ada -->
              <div v-if="selectedItem.surat_balasan && selectedItem.status === 'diterima'">
                <label class="block text-sm font-medium text-gray-400 mb-1">Surat Balasan</label>
                <p class="text-white bg-gray-700 p-3 rounded-lg text-sm md:text-base">
                  <i class="fas fa-file-alt mr-2"></i>{{ selectedItem.surat_balasan }}
                </p>
              </div>
              
              <!-- Alasan Penolakan jika ditolak -->
              <div v-if="selectedItem.alasan_penolakan && selectedItem.status === 'ditolak'">
                <label class="block text-sm font-medium text-gray-400 mb-1">Alasan Penolakan</label>
                <p class="text-white bg-red-900/30 p-3 rounded-lg border border-red-700 text-sm md:text-base">
                  {{ selectedItem.alasan_penolakan }}
                </p>
              </div>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-4 md:p-6 border-t border-gray-700 flex justify-end">
              <button 
                @click="closeDetailModal"
                class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>

        <!-- Reject Modal -->
        <div v-if="showRejectModalDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
              <h3 class="text-lg md:text-xl font-semibold text-white">Tolak Kunjungan</h3>
              <button @click="closeRejectModal" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-lg md:text-xl"></i>
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-4 md:p-6">
              <label class="block text-sm font-medium text-gray-400 mb-2">Alasan Penolakan</label>
              <textarea 
                v-model="rejectReason"
                placeholder="Masukkan alasan penolakan..."
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                rows="4"
                required
              ></textarea>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-4 md:p-6 border-t border-gray-700 flex justify-end gap-2">
              <button 
                @click="closeRejectModal"
                class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                Batal
              </button>
              <button 
                @click="confirmReject"
                :disabled="!rejectReason.trim() || updating"
                class="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                Tolak Kunjungan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import StatusBadge from '@/components/StatusBadge.vue'

export default {
  name: 'DataKunjungan',
  components: { 
    DashboardLayout, 
    StatusBadge 
  },
  data() {
    return {
      dataKunjungan: [],
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
      showRejectModalDialog: false,
      rejectingItem: null,
      rejectReason: '',
      apiBaseUrl: 'http://localhost:5050/api'
    }
  },
  computed: {
    totalData() {
      return this.dataKunjungan.length
    },
    statusCount() {
      return {
        pending: this.dataKunjungan.filter(item => item.status === 'pending').length,
        diterima: this.dataKunjungan.filter(item => item.status === 'diterima').length,
        ditolak: this.dataKunjungan.filter(item => item.status === 'ditolak').length
      }
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const response = await axios.get(`${this.apiBaseUrl}/kunjungan`)
        this.dataKunjungan = response.data
        this.filteredData = [...this.dataKunjungan]
      } catch (error) {
        console.error('Error fetching Kunjungan data:', error)
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Data',
          text: 'Terjadi kesalahan saat memuat data Kunjungan',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
      } finally {
        this.loading = false
      }
    },
    
    filterData() {
      let filtered = [...this.dataKunjungan]
      
      if (this.filterStatus) {
        filtered = filtered.filter(item => item.status === this.filterStatus)
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(item => 
          item.kontak_person?.toLowerCase().includes(query) ||
          item.nama_instansi?.toLowerCase().includes(query) ||
          item.email?.toLowerCase().includes(query) ||
          item.no_hp?.toLowerCase().includes(query)
        )
      }
      
      this.filteredData = filtered
    },
    
    viewDocument(filename, title) {
      if (!filename) return
      this.documentTitle = title
      this.documentUrl = `http://localhost:5050/uploads/surat_pengantar/${filename}`
      this.showDocumentModal = true
    },

    handleViewDocumentFromModal(filename, title) {
      this.viewDocument(filename, title)
    },
    
    downloadDocument() {
      if (this.documentUrl) {
        const link = document.createElement('a')
        link.href = this.documentUrl
        link.download = this.documentTitle
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
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
    },
    
    closeDetailModal() {
      this.showDetailModal = false
      this.selectedItem = null
    },

    showRejectModal(item) {
      this.rejectingItem = item
      this.rejectReason = ''
      this.showRejectModalDialog = true
    },

    closeRejectModal() {
      this.showRejectModalDialog = false
      this.rejectingItem = null
      this.rejectReason = ''
    },

    async confirmReject() {
      if (!this.rejectReason.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Alasan diperlukan',
          text: 'Mohon masukkan alasan penolakan',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#f59e0b'
        })
        return
      }

      await this.updateStatus(this.rejectingItem.id, 'ditolak', this.rejectReason)
      this.closeRejectModal()
    },
    
    async updateStatus(id, status, alasanPenolakan = null) {
      try {
        this.updating = true
        this.updatingId = id
        
        const actionText = status === 'diterima' ? 'menerima' : 'menolak'
        
        if (!alasanPenolakan && status === 'diterima') {
          const result = await Swal.fire({
            icon: 'question',
            title: `Konfirmasi Penerimaan`,
            text: `Apakah Anda yakin ingin ${actionText} kunjungan ini?`,
            showCancelButton: true,
            confirmButtonText: `Ya, Terima`,
            cancelButtonText: 'Batal',
            background: '#374151',
            color: '#ffffff',
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280'
          })

          if (!result.isConfirmed) {
            return
          }
        }

        const updateData = { status: status }
        if (alasanPenolakan) {
          updateData.alasan_penolakan = alasanPenolakan
        }

        await axios.put(`${this.apiBaseUrl}/kunjungan/${id}`, updateData)

        Swal.fire({
          icon: 'success',
          title: status === 'diterima' ? 'Berhasil Diterima!' : 'Berhasil Ditolak!',
          text: `Kunjungan telah ${status === 'diterima' ? 'diterima' : 'ditolak'}`,
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: status === 'diterima' ? '#10b981' : '#ef4444'
        })

        await this.fetchData()
        
      } catch (error) {
        console.error('Error updating status:', error)
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memperbarui Status',
          text: 'Terjadi kesalahan saat memperbarui status kunjungan',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
      } finally {
        this.updating = false
        this.updatingId = null
      }
    },
    
    async deleteData(id) {
      try {
        const result = await Swal.fire({
          icon: 'warning',
          title: 'Konfirmasi Hapus',
          text: 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
          showCancelButton: true,
          confirmButtonText: 'Ya, Hapus',
          cancelButtonText: 'Batal',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444',
          cancelButtonColor: '#6b7280'
        })

        if (!result.isConfirmed) {
          return
        }

        this.updating = true
        this.updatingId = id

        await axios.delete(`${this.apiBaseUrl}/kunjungan/${id}`)

        Swal.fire({
          icon: 'success',
          title: 'Berhasil Dihapus!',
          text: 'Data Kunjungan telah berhasil dihapus',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#10b981'
        })

        await this.fetchData()
      } catch (error) {
        console.error('Error deleting data:', error)
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus',
          text: 'Terjadi kesalahan saat menghapus data kunjungan',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
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
        return dateStr
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

    async exportData() {
      try {
        if (this.filteredData.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Tidak ada data',
            text: 'Tidak ada data yang bisa diekspor',
            background: '#374151',
            color: '#ffffff',
            confirmButtonColor: '#3b82f6'
          })
          return
        }

        const dataToExport = this.filteredData.map(item => ({
          'Kontak Person': item.kontak_person || '',
          'Nama Instansi': item.nama_instansi || '',
          'Email': item.email || '',
          'No HP': item.no_hp || '',
          'Tanggal Kunjungan': this.formatDate(item.tanggal_kunjungan),
          'Jumlah Peserta': item.jumlah_peserta || '',
          'Status': item.status || '',
          'Surat Pengantar': item.surat_pengantar ? 'Ada' : 'Tidak Ada',
          'Surat Balasan': item.surat_balasan || '',
          'Alasan Penolakan': item.alasan_penolakan || ''
        }))

        const headers = Object.keys(dataToExport[0]).join(',')
        const csvContent = dataToExport.map(row => 
          Object.values(row).map(value => 
            `"${String(value).replace(/"/g, '""')}"`
          ).join(',')
        ).join('\n')
        
        const fullCsv = headers + '\n' + csvContent
        
        const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        
        link.setAttribute('href', url)
        link.setAttribute('download', `data_kunjungan_${new Date().toISOString().slice(0,10)}.csv`)
        link.style.visibility = 'hidden'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        URL.revokeObjectURL(url)
        
        Swal.fire({
          icon: 'success',
          title: 'Export Berhasil',
          text: 'Data Kunjungan telah berhasil diekspor',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#10b981'
        })
      } catch (error) {
        console.error('Export error:', error)
        Swal.fire({
          icon: 'error',
          title: 'Export Gagal',
          text: 'Terjadi kesalahan saat mengekspor data',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
      }
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

/* SweetAlert2 custom styles */
.swal2-popup {
  font-family: inherit;
}
</style>