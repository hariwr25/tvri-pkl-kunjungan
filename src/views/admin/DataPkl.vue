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
                    <button 
                      v-if="item.surat_balasan"
                      @click="viewDocument(item.surat_balasan, 'Surat Balasan', 'pkl')"
                      class="text-xs bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <i class="fas fa-reply"></i>
                      Surat Balasan
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
                      @click="openResponseLetterModal(item.id, 'approved')"
                      :disabled="updating"
                      class="text-green-400 hover:text-green-300 disabled:text-gray-500 transition-colors p-1"
                      title="Approve"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button 
                      v-if="item.status === 'pending'"
                      @click="openResponseLetterModal(item.id, 'rejected')"
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

       <!-- Surat Balasan Modal -->
       <div v-if="showResponseLetterModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-700">
            <h3 class="text-xl font-semibold text-white">
              {{ actionType === 'approved' ? 'Kirim Surat Balasan Persetujuan' : 'Konfirmasi Penolakan' }}
            </h3>
            <button @click="closeResponseLetterModal" class="text-gray-400 hover:text-white">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <!-- Modal Body -->
          <div class="p-6 space-y-4">
            <div v-if="actionType === 'approved'">
              <label class="block text-sm font-medium text-gray-400 mb-2">Upload Surat Balasan (PDF)</label>
              <input 
                type="file" 
                ref="responseLetterInput"
                accept=".pdf"
                @change="handleFileUpload"
                class="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-600 file:text-white
                  hover:file:bg-indigo-700
                  cursor-pointer
                  bg-gray-700 rounded-lg"
              />
              <p class="mt-1 text-xs text-gray-500">Format file: PDF (maks. 5MB)</p>
              
              <div v-if="selectedFileName" class="bg-gray-700 p-3 rounded-lg mt-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-white">{{ selectedFileName }}</span>
                  <button 
                    @click="removeSelectedFile"
                    class="text-red-400 hover:text-red-300"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
              <div class="flex items-start">
                <i class="fas fa-exclamation-circle text-yellow-400 mt-1 mr-2"></i>
                <p class="text-yellow-300 text-sm">
                  Anda akan menolak pengajuan ini. Pastikan Anda telah berkomunikasi dengan pemohon
                  sebelum melakukan penolakan.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="p-6 border-t border-gray-700 flex justify-end gap-3">
            <button 
              @click="closeResponseLetterModal"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button 
              @click="submitStatusUpdate"
              :disabled="actionType === 'approved' && !selectedFile"
              class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <i class="fas fa-paper-plane"></i>
              {{ actionType === 'approved' ? 'Kirim Surat Balasan' : 'Konfirmasi Penolakan' }}
            </button>    </div>
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
      // Data untuk surat balasan
      showResponseLetterModal: false,
      selectedFile: null,
      selectedFileName: '',
      actionType: '', // 'approved' atau 'rejected'
      currentItemId: null
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
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const response = await axios.get('http://localhost:5050/api/pkl')
        this.dataPkl = response.data
        this.filteredData = [...this.dataPkl]
      } catch (error) {
        console.error('Error fetching PKL data:', error)
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Data',
          text: 'Terjadi kesalahan saat memuat data PKL',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
      } finally {
        this.loading = false
      }
    },
    
    filterData() {
      let filtered = [...this.dataPkl]
      
      if (this.filterStatus) {
        filtered = filtered.filter(item => item.status === this.filterStatus)
      }
      
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
    },
    
    viewDocument(filename, title, folder) {
      if (!filename) return
      this.documentTitle = title
      this.documentUrl = `http://localhost:5050/uploads/${folder}/${filename}`
      this.showDocumentModal = true
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
        } catch (error) {
          console.error('Download error:', error)
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
    },
    
    closeDetailModal() {
      this.showDetailModal = false
      this.selectedItem = null
    },
    
    openResponseLetterModal(id, actionType) {
      this.currentItemId = id
      this.actionType = actionType
      this.showResponseLetterModal = true
      this.selectedFile = null
      this.selectedFileName = ''
      if (this.$refs.responseLetterInput) {
        this.$refs.responseLetterInput.value = ''
      }
    },
    
    closeResponseLetterModal() {
      this.showResponseLetterModal = false
      this.selectedFile = null
      this.selectedFileName = ''
      this.actionType = ''
      this.currentItemId = null
    },
    
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File terlalu besar',
          text: 'Ukuran file maksimal 5MB',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
        return
      }
      
      if (file.type !== 'application/pdf') {
        Swal.fire({
          icon: 'error',
          title: 'Format tidak valid',
          text: 'Hanya file PDF yang diperbolehkan',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
        return
      }
      
      this.selectedFile = file
      this.selectedFileName = file.name
    },
    
    removeSelectedFile() {
      this.selectedFile = null
      this.selectedFileName = ''
      if (this.$refs.responseLetterInput) {
        this.$refs.responseLetterInput.value = ''
      }
    },
    
    async submitStatusUpdate() {
      try {
        this.updating = true
        
        if (this.actionType === 'approved') {
          await this.submitApproval()
        } else {
          await this.submitRejection()
        }
        
        await this.fetchData()
        
      } catch (error) {
        console.error('Error updating status:', error)
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memperbarui Status',
          text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui status',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
      } finally {
        this.updating = false
        this.closeResponseLetterModal()
      }
    },
    
    async submitApproval() {
      if (!this.selectedFile) {
        throw new Error('Surat balasan wajib diunggah untuk persetujuan')
      }

      const formData = new FormData()
      formData.append('surat_balasan', this.selectedFile)
      formData.append('status', 'approved')

      await axios.put(
  `http://localhost:5050/api/pkl/${this.currentItemId}/approve-with-letter`, 
  formData,
  { headers: { 'Content-Type': 'multipart/form-data'
          }
        }
      )

      Swal.fire({
        icon: 'success',
        title: 'Berhasil Disetujui!',
        text: 'Pengajuan PKL telah disetujui dan surat balasan telah dikirim',
        background: '#374151',
        color: '#ffffff',
        confirmButtonColor: '#10b981'
      })
    },
    
    async submitRejection() {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Konfirmasi Penolakan',
        text: 'Apakah Anda yakin ingin menolak pengajuan ini?',
        showCancelButton: true,
        confirmButtonText: 'Ya, Tolak',
        cancelButtonText: 'Batal',
        background: '#374151',
        color: '#ffffff',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280'
      })

      if (!result.isConfirmed) {
        throw new Error('Penolakan dibatalkan')
      }

      await axios.put(
        `http://localhost:5050/api/pkl/${this.currentItemId}/status`,
        { status: 'rejected' }
      )

      Swal.fire({
        icon: 'success',
        title: 'Berhasil Ditolak!',
        text: 'Pengajuan PKL telah ditolak',
        background: '#374151',
        color: '#ffffff',
        confirmButtonColor: '#ef4444'
      })
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
          'Jenjang Pendidikan': item.jenjang_pendidikan || '',
          'Surat Balasan': item.surat_balasan ? 'Ada' : 'Tidak Ada'
        }))

        // Create CSV content
        const headers = Object.keys(dataToExport[0]).join(',')
        const csvContent = dataToExport.map(row => 
          Object.values(row).map(value => 
            `"${String(value).replace(/"/g, '""')}"`
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
        
        Swal.fire({
          icon: 'success',
          title: 'Export Berhasil',
          text: 'Data PKL telah berhasil diekspor',
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