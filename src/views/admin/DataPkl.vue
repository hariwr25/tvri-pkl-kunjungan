<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-900 text-gray-100 font-sans overflow-x-hidden">
      <!-- Header -->
      <div class="px-4 md:px-6 py-4">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div class="min-w-0">
            <h1 class="text-4xl font-extrabold tracking-tight text-white">Data PKL</h1>
            <p class="text-sm md:text-base text-gray-400 truncate">Kelola data pengajuan Praktik Kerja Lapangan</p>
          </div>
          <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <!-- Export Button -->
            <button 
              @click="exportData"
              :disabled="filteredData.length === 0"
              class="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm flex-shrink-0"
              title="Export ke CSV"
            >
              <i class="fas fa-download"></i>
              <span class="hidden sm:inline">Export</span>
            </button>
            
            <!-- Filter Status -->
            <select 
              v-model="filterStatus" 
              @change="filterData"
              class="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-full md:w-auto flex-shrink-0"
            >
              <option value="">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Diterima</option>
              <option value="rejected">Ditolak</option>
            </select>
            
            <!-- Search -->
            <div class="relative w-full md:w-48 flex-shrink-0">
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
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div class="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-xs md:text-sm">Total Pengajuan</p>
                <p class="text-xl md:text-2xl font-bold text-white">{{ totalData }}</p>
              </div>
              <i class="fas fa-clipboard-list text-indigo-500 text-lg md:text-2xl"></i>
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
                <p class="text-xl md:text-2xl font-bold text-green-400">{{ statusCount.approved }}</p>
              </div>
              <i class="fas fa-check-circle text-green-500 text-lg md:text-2xl"></i>
            </div>
          </div>
          
          <div class="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-xs md:text-sm">Ditolak</p>
                <p class="text-xl md:text-2xl font-bold text-red-400">{{ statusCount.rejected }}</p>
              </div>
              <i class="fas fa-times-circle text-red-500 text-lg md:text-2xl"></i>
            </div>
          </div>
        </div>

        <!-- Data Table Container -->
        <div class="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div class="p-4 md:p-6 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 class="text-lg md:text-xl font-semibold text-white">Daftar Pengajuan PKL</h2>
            <div class="text-xs md:text-sm text-gray-300">
              Menampilkan {{ getPaginationInfo }}
            </div>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center py-8 md:py-12">
            <div class="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-indigo-500"></div>
            <span class="ml-3 text-gray-400 text-sm">Memuat data...</span>
          </div>
          
          <!-- Table -->
          <div v-else class="overflow-x-auto">
            <table class="w-full divide-y divide-gray-700">
              <thead class="bg-gray-750">
                <tr>
                  <th class="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider whitespace-nowrap">
                    Nama Lengkap
                  </th>
                  <th class="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                    Instansi
                  </th>
                  <th class="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                    Periode
                  </th>
                  <th class="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th class="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider whitespace-nowrap">
                    Berkas
                  </th>
                  <th class="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider whitespace-nowrap">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-gray-800 divide-y divide-gray-700">
                <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-700 transition-colors">
                  <td class="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                    <div class="flex items-center min-w-0">
                      <div class="flex-shrink-0 h-8 w-8 md:h-10 md:w-10">
                        <div class="h-8 w-8 md:h-10 md:w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                          <span class="text-xs md:text-sm font-medium text-white">{{ getInitials(item.nama_lengkap) }}</span>
                        </div>
                      </div>
                      <div class="ml-3 min-w-0">
                        <div class="text-sm font-medium text-white truncate">{{ item.nama_lengkap }}</div>
                        <div class="text-xs text-gray-400 md:hidden truncate">{{ item.asal_instansi }}</div>
                        <div class="text-xs text-gray-500 hidden md:block truncate">{{ item.email }}</div>
                        <div class="text-xs text-gray-500 hidden lg:block truncate">{{ item.no_hp }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap hidden md:table-cell">
                    <div class="text-sm text-white truncate">{{ item.asal_instansi }}</div>
                    <div class="text-sm text-gray-400 truncate">{{ item.jurusan }}</div>
                    <div class="text-xs text-gray-500 truncate">{{ item.nim_nisn }}</div>
                  </td>
                  <td class="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap hidden lg:table-cell">
                    <div class="text-sm text-white">{{ formatDate(item.tanggal_mulai) }}</div>
                    <div class="text-sm text-gray-400">s/d {{ formatDate(item.tanggal_selesai) }}</div>
                  </td>
                  <td class="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                    <StatusBadge :status="item.status" />
                    <!-- Tampilkan alasan penolakan jika ditolak -->
                    <div v-if="item.status === 'rejected' && item.alasan_penolakan" class="mt-1">
                      <button 
                        @click="showRejectionReasonModal(item.alasan_penolakan)"
                        class="text-xs text-red-400 hover:text-red-300 underline cursor-pointer"
                        title="Lihat alasan penolakan"
                      >
                        Lihat alasan
                      </button>
                    </div>
                  </td>
                  <td class="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                    <div class="relative inline-block text-left">
                      <button 
                        @click.stop="toggleDocumentDropdown(item.id)"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg whitespace-nowrap"
                        :class="{ 'bg-indigo-700 shadow-lg': dropdownOpen === item.id }"
                      >
                        <i class="fas fa-folder-open text-sm"></i>
                        <span class="hidden sm:inline">Berkas</span>
                        <span class="bg-indigo-800 px-1.5 py-0.5 rounded-full text-xs font-semibold min-w-[20px] text-center">
                          {{ getDocumentCount(item) }}
                        </span>
                        <i class="fas fa-chevron-down text-xs transition-transform duration-200" 
                           :class="{ 'rotate-180': dropdownOpen === item.id }"></i>
                      </button>
                      
                      <!-- Dropdown Overlay (Fixed Positioning) -->
                      <div v-if="dropdownOpen === item.id" 
                           class="fixed inset-0 z-40"
                           @click="closeAllDropdowns()">
                      </div>

                      <!-- Dropdown Menu - Fixed Position -->
                      <div v-if="dropdownOpen === item.id" 
                           class="fixed bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-80 max-w-[90vw]"
                           :style="getDropdownPosition($event)"
                           @click.stop>
                        
                        <!-- Header -->
                        <div class="bg-gray-50 px-4 py-3 border-b border-gray-100">
                          <h4 class="text-sm font-semibold text-gray-800 truncate">
                            {{ item.nama_lengkap }}
                          </h4>
                          <p class="text-xs text-gray-500 mt-0.5">
                            {{ getDocumentCount(item) }} dokumen tersedia
                          </p>
                        </div>

                        <!-- Document List -->
                        <div class="p-3 max-h-96 overflow-y-auto">
                          <div class="space-y-1">
                            <!-- Surat Pengantar -->
                            <div v-if="item.surat_pengantar"
                                 @click="viewDocumentFromDropdown(item.surat_pengantar, 'Surat Pengantar', 'pkl', item.id)"
                                 class="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group">
                              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-file-pdf text-blue-600 text-sm"></i>
                              </div>
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">Surat Pengantar</p>
                                <p class="text-xs text-gray-500 truncate">Dokumen resmi institusi</p>
                              </div>
                              <i class="fas fa-external-link-alt text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>

                            <!-- CV -->
                            <div v-if="item.cv"
                                 @click="viewDocumentFromDropdown(item.cv, 'CV', 'pkl', item.id)"
                                 class="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 cursor-pointer transition-colors group">
                              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-file-alt text-green-600 text-sm"></i>
                              </div>
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">Curriculum Vitae</p>
                                <p class="text-xs text-gray-500 truncate">Riwayat hidup & pengalaman</p>
                              </div>
                              <i class="fas fa-external-link-alt text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>

                            <!-- Nilai/Transkrip -->
                            <div v-if="item.nilai_raport_transkrip"
                                 @click="viewDocumentFromDropdown(item.nilai_raport_transkrip, 'Nilai/Transkrip', 'pkl', item.id)"
                                 class="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors group">
                              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-file-text text-purple-600 text-sm"></i>
                              </div>
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">Nilai & Transkrip</p>
                                <p class="text-xs text-gray-500 truncate">Dokumen akademik</p>
                              </div>
                              <i class="fas fa-external-link-alt text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>

                            <!-- Kartu Pelajar -->
                            <div v-if="item.kartu_pelajar"
                                 @click="viewDocumentFromDropdown(item.kartu_pelajar, 'Kartu Pelajar', 'pkl', item.id)"
                                 class="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 cursor-pointer transition-colors group">
                              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-id-card text-yellow-600 text-sm"></i>
                              </div>
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">Kartu Pelajar</p>
                                <p class="text-xs text-gray-500 truncate">Identitas mahasiswa/siswa</p>
                              </div>
                              <i class="fas fa-external-link-alt text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>

                            <!-- Foto ID -->
                            <div v-if="item.foto_id_card"
                                 @click="viewDocumentFromDropdown(item.foto_id_card, 'Foto ID Card', 'pkl', item.id)"
                                 class="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors group">
                              <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-image text-orange-600 text-sm"></i>
                              </div>
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">Foto ID Card</p>
                                <p class="text-xs text-gray-500 truncate">Foto identitas diri</p>
                              </div>
                              <i class="fas fa-external-link-alt text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Footer Actions -->
                        <div class="bg-gray-50 px-4 py-3 border-t border-gray-100 flex gap-2">
                          <button 
                            v-if="getDocumentCount(item) > 1"
                            @click="downloadAllDocuments(item)"
                            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <i class="fas fa-download text-xs"></i>
                            <span>Download Semua</span>
                          </button>
                          <button 
                            @click="closeAllDropdowns()"
                            class="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                            title="Tutup"
                          >
                            <i class="fas fa-times text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-sm font-medium">
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
                        @click="updateStatus(item.id, 'approved')"
                        :disabled="updating"
                        class="text-green-400 hover:text-green-300 disabled:text-gray-500 transition-colors p-1"
                        title="Approve"
                      >
                        <i class="fas fa-check text-sm md:text-base"></i>
                      </button>
                      <button 
                        v-if="item.status === 'pending'"
                        @click="updateStatus(item.id, 'rejected')"
                        :disabled="updating"
                        class="text-red-400 hover:text-red-300 disabled:text-gray-500 transition-colors p-1"
                        title="Reject"
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
                  <td colspan="6" class="px-6 py-8 md:py-12 text-center">
                    <div class="text-gray-400">
                      <i class="fas fa-inbox text-3xl md:text-4xl mb-3"></i>
                      <p class="text-base md:text-lg">Tidak ada data PKL</p>
                      <p class="text-xs md:text-sm mt-1">
                        {{ searchQuery || filterStatus ? 'Tidak ada data yang sesuai dengan filter' : 'Data akan muncul setelah ada pengajuan baru' }}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination untuk PKL -->
          <div v-if="filteredData.length > 0" class="flex justify-between items-center p-4 border-t border-gray-700">
            <div class="text-xs text-gray-400">
              Total: {{ filteredData.length }} data
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-xs bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Sebelumnya
              </button>
              
              <div class="flex space-x-1">
                <button
                  v-for="page in pageNumbers"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-2 py-1 text-xs rounded-lg transition',
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
                :disabled="currentPage >= totalPages"
                class="px-3 py-1 text-xs bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>

        <!-- Modal Input Alasan Penolakan -->
        <div v-if="showRejectionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             @click.self="closeRejectionModal">
          <div class="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700"
               @click.stop>
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-times-circle text-red-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white">Tolak Pengajuan</h3>
                  <p class="text-sm text-gray-400">Berikan alasan penolakan</p>
                </div>
              </div>
              <button @click="closeRejectionModal" class="text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-4 md:p-6">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Alasan Penolakan <span class="text-red-400">*</span>
                </label>
                <textarea 
                  v-model="rejectionReason"
                  placeholder="Masukkan alasan penolakan pengajuan PKL ini..."
                  rows="4"
                  class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  :class="{ 'border-red-500': rejectionError }"
                ></textarea>
                <div v-if="rejectionError" class="mt-2 text-red-400 text-sm">
                  {{ rejectionError }}
                </div>
                <div class="mt-2 text-xs text-gray-400">
                  Alasan ini akan dikirim ke pemohon dan akan ditampilkan di cek status.
                </div>
              </div>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-4 md:p-6 border-t border-gray-700 flex justify-end gap-3">
              <button 
                @click="closeRejectionModal"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                :disabled="submittingRejection"
              >
                Batal
              </button>
              <button 
                @click="submitRejection"
                :disabled="submittingRejection || !rejectionReason.trim()"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm flex items-center gap-2"
              >
                <i v-if="submittingRejection" class="fas fa-spinner animate-spin text-sm"></i>
                <i v-else class="fas fa-times text-sm"></i>
                {{ submittingRejection ? 'Memproses...' : 'Tolak Pengajuan' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Modal Tampilkan Alasan Penolakan -->
        <div v-if="showRejectionReasonViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             @click.self="closeRejectionReasonViewModal">
          <div class="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700"
               @click.stop>
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-info-circle text-red-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white">Alasan Penolakan</h3>
                  <p class="text-sm text-gray-400">Detail alasan pengajuan ditolak</p>
                </div>
              </div>
              <button @click="closeRejectionReasonViewModal" class="text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-4 md:p-6">
              <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-800 text-sm leading-relaxed">{{ viewingRejectionReason }}</p>
              </div>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-4 md:p-6 border-t border-gray-700 flex justify-end">
              <button 
                @click="closeRejectionReasonViewModal"
                class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>

        <!-- Document Viewer Modal -->
        <div v-if="showDocumentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             @click.self="closeDocumentModal">
          <div class="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-700"
               @click.stop>
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
              <div class="flex items-center gap-3">
                <h3 class="text-lg md:text-xl font-semibold text-white">{{ documentTitle }}</h3>
                <span v-if="returnToDropdown" 
                      class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  Dari List Berkas
                </span>
              </div>
              <button @click="closeDocumentModal" class="text-gray-400 hover:text-white transition-colors">
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
                class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                :class="{ 'bg-blue-600 hover:bg-blue-700': returnToDropdown }"
                :title="returnToDropdown ? 'Kembali ke List Berkas' : 'Tutup'"
              >
                <i :class="returnToDropdown ? 'fas fa-arrow-left' : 'fas fa-times'"></i>
                <span>{{ returnToDropdown ? 'Kembali ke List' : 'Tutup' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Detail Modal -->
        <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
              <h3 class="text-lg md:text-xl font-semibold text-white">Detail Pengajuan PKL</h3>
              <button @click="closeDetailModal" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-lg md:text-xl"></i>
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-4 md:p-6 space-y-4" v-if="selectedItem">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Nama Lengkap</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.nama_lengkap || '-' }}</p>
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
                  <label class="block text-sm font-medium text-gray-400 mb-1">Asal Instansi</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.asal_instansi || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">NIM/NISN</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.nim_nisn || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Jurusan</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.jurusan || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Jenjang Pendidikan</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.jenjang_pendidikan || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <StatusBadge :status="selectedItem.status" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Tanggal Mulai</label>
                  <p class="text-white text-sm md:text-base">{{ formatDate(selectedItem.tanggal_mulai) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Tanggal Selesai</label>
                  <p class="text-white text-sm md:text-base">{{ formatDate(selectedItem.tanggal_selesai) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Unit Kerja</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.unit_kerja || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Jangka Waktu</label>
                  <p class="text-white text-sm md:text-base">{{ selectedItem.jangka_waktu || '-' }}</p>
                </div>
              </div>
              
              <div v-if="selectedItem.deskripsi_diri">
                <label class="block text-sm font-medium text-gray-400 mb-1">Deskripsi Diri</label>
                <p class="text-white bg-gray-700 p-3 rounded-lg text-sm md:text-base">{{ selectedItem.deskripsi_diri }}</p>
              </div>
              
              <div v-if="selectedItem.alasan_pilih_tvri">
                <label class="block text-sm font-medium text-gray-400 mb-1">Alasan Memilih TVRI</label>
                <p class="text-white bg-gray-700 p-3 rounded-lg text-sm md:text-base">{{ selectedItem.alasan_pilih_tvri }}</p>
              </div>
              
              <!-- Tampilkan Alasan Penolakan jika ada -->
              <div v-if="selectedItem.status === 'rejected' && selectedItem.alasan_penolakan">
                <label class="block text-sm font-medium text-red-400 mb-1">Alasan Penolakan</label>
                <div class="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded-lg">
                  <p class="text-red-300 text-sm md:text-base">{{ selectedItem.alasan_penolakan }}</p>
                </div>
              </div>
              
              <div v-if="selectedItem.portofolio_link">
                <label class="block text-sm font-medium text-gray-400 mb-1">Portofolio Link</label>
                <a :href="selectedItem.portofolio_link" target="_blank" class="text-indigo-400 hover:text-indigo-300 underline text-sm md:text-base">
                  {{ selectedItem.portofolio_link }}
                </a>
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
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import DashboardLayout from '../../layouts/DashboardLayout.vue';
import StatusBadge from '@/components/StatusBadge.vue';

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
      dropdownOpen: null,
      returnToDropdown: null,
      // Data untuk modal alasan penolakan
      showRejectionModal: false,
      rejectionReason: '',
      rejectionItemId: null,
      rejectionError: '',
      submittingRejection: false,
      // Data untuk modal view alasan penolakan
      showRejectionReasonViewModal: false,
      viewingRejectionReason: '',
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 5,
      
      apiBaseUrl: 'http://localhost:5050/api'
    };
  },
  computed: {
    totalData() {
      return this.dataPkl.length;
    },
    statusCount() {
      return {
        pending: this.dataPkl.filter(item => item.status === 'pending').length,
        approved: this.dataPkl.filter(item => item.status === 'approved').length,
        rejected: this.dataPkl.filter(item => item.status === 'rejected').length
      };
    },
    
    // Computed untuk Pagination
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredData.slice(start, end)
    },
    pageNumbers() {
      const pages = []
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i)
      }
      return pages
    },
    getPaginationInfo() {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1
      const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length)
      return `${start}-${end} dari ${this.filteredData.length} data`
    }
  },
  async mounted() {
    await this.fetchData();
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.relative.inline-block')) {
        this.closeAllDropdowns();
      }
    });
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.closeAllDropdowns);
  },
  methods: {
    // Methods Pagination
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    goToPage(page) {
      this.currentPage = page
    },

    async fetchData() {
      try {
        this.loading = true;
        const response = await axios.get(`${this.apiBaseUrl}/pkl`);
        this.dataPkl = response.data;
        this.filteredData = [...this.dataPkl];
        this.currentPage = 1 // Reset ke halaman pertama setelah fetch data
      } catch (error) {
        console.error('Error fetching PKL data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Data',
          text: 'Terjadi kesalahan saat memuat data PKL',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        this.loading = false;
      }
    },
    
    filterData() {
      let filtered = [...this.dataPkl];
      
      if (this.filterStatus) {
        filtered = filtered.filter(item => item.status === this.filterStatus);
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(item => 
          item.nama_lengkap?.toLowerCase().includes(query) ||
          item.asal_instansi?.toLowerCase().includes(query) ||
          item.email?.toLowerCase().includes(query) ||
          item.nim_nisn?.toLowerCase().includes(query) ||
          item.jurusan?.toLowerCase().includes(query)
        );
      }
      
      this.filteredData = filtered;
      this.currentPage = 1 // Reset ke halaman pertama setelah filter
    },
    
    viewDocument(filename, title, folder) {
      if (!filename) return;
      this.documentTitle = title;
      this.documentUrl = `http://localhost:5050/uploads/${folder}/${filename}`;
      this.showDocumentModal = true;
      this.returnToDropdown = null;
    },

    viewDocumentFromDropdown(filename, title, folder, itemId) {
      if (!filename) return;
      
      this.documentTitle = title;
      this.documentUrl = `http://localhost:5050/uploads/${folder}/${filename}`;
      this.returnToDropdown = itemId;
      
      this.closeAllDropdowns();
      
      setTimeout(() => {
        this.showDocumentModal = true;
      }, 100);
    },
    
    downloadDocument() {
      if (this.documentUrl) {
        const link = document.createElement('a');
        link.href = this.documentUrl;
        link.download = this.documentTitle;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    
    closeDocumentModal() {
      this.showDocumentModal = false;
      this.documentUrl = '';
      this.documentTitle = '';
      
      if (this.returnToDropdown) {
        setTimeout(() => {
          this.dropdownOpen = this.returnToDropdown;
          this.returnToDropdown = null;
        }, 150);
      }
    },
    
    viewDetail(item) {
      this.selectedItem = item;
      this.showDetailModal = true;
    },
    
    closeDetailModal() {
      this.showDetailModal = false;
      this.selectedItem = null;
    },
    
    // Method untuk menangani status update
    async updateStatus(id, status) {
      try {
        if (status === 'rejected') {
          // Buka modal input alasan penolakan
          this.rejectionItemId = id;
          this.rejectionReason = '';
          this.rejectionError = '';
          this.showRejectionModal = true;
          return;
        }

        // Untuk approve langsung
        this.updating = true;
        this.updatingId = id;
        
        const result = await Swal.fire({
          icon: 'question',
          title: 'Konfirmasi Persetujuan',
          text: 'Apakah Anda yakin ingin menyetujui pengajuan ini?',
          showCancelButton: true,
          confirmButtonText: 'Ya, Setujui',
          cancelButtonText: 'Batal',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#10b981',
          cancelButtonColor: '#6b7280'
        });

        if (!result.isConfirmed) {
          return;
        }

        await axios.put(`${this.apiBaseUrl}/pkl/${id}`, { 
          status: status 
        });

        Swal.fire({
          icon: 'success',
          title: 'Berhasil Disetujui!',
          text: 'Pengajuan PKL telah disetujui',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#10b981'
        });

        await this.fetchData();
        
      } catch (error) {
        console.error('Error updating status:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memperbarui Status',
          text: 'Terjadi kesalahan saat memperbarui status pengajuan',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        this.updating = false;
        this.updatingId = null;
      }
    },

    // Method untuk submit penolakan dengan alasan
    async submitRejection() {
      try {
        if (!this.rejectionReason.trim()) {
          this.rejectionError = 'Alasan penolakan harus diisi';
          return;
        }

        if (this.rejectionReason.trim().length < 10) {
          this.rejectionError = 'Alasan penolakan minimal 10 karakter';
          return;
        }

        this.submittingRejection = true;
        this.rejectionError = '';

        await axios.put(`${this.apiBaseUrl}/pkl/${this.rejectionItemId}`, { 
          status: 'rejected',
          alasan_penolakan: this.rejectionReason.trim()
        });

        Swal.fire({
          icon: 'success',
          title: 'Pengajuan Berhasil Ditolak!',
          text: 'Pengajuan PKL telah ditolak dengan alasan yang diberikan',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        });

        this.closeRejectionModal();
        await this.fetchData();
        
      } catch (error) {
        console.error('Error rejecting application:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menolak Pengajuan',
          text: 'Terjadi kesalahan saat menolak pengajuan',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        this.submittingRejection = false;
      }
    },

    // Method untuk menutup modal penolakan
    closeRejectionModal() {
      this.showRejectionModal = false;
      this.rejectionReason = '';
      this.rejectionItemId = null;
      this.rejectionError = '';
      this.submittingRejection = false;
    },

    // Method untuk menampilkan alasan penolakan
    showRejectionReasonModal(reason) {
      this.viewingRejectionReason = reason;
      this.showRejectionReasonViewModal = true;
    },

    // Method untuk menutup modal view alasan penolakan
    closeRejectionReasonViewModal() {
      this.showRejectionReasonViewModal = false;
      this.viewingRejectionReason = '';
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
        });

        if (!result.isConfirmed) {
          return;
        }

        this.updating = true;
        this.updatingId = id;

        await axios.delete(`${this.apiBaseUrl}/pkl/${id}`);

        Swal.fire({
          icon: 'success',
          title: 'Berhasil Dihapus!',
          text: 'Data PKL telah berhasil dihapus',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#10b981'
        });

        await this.fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus',
          text: 'Terjadi kesalahan saat menghapus data PKL',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        this.updating = false;
        this.updatingId = null;
      }
    },
    
    formatDate(dateStr) {
      if (!dateStr) return '-';
      try {
        const options = { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          timeZone: 'Asia/Jakarta'
        };
        return new Date(dateStr).toLocaleDateString('id-ID', options);
      } catch (error) {
        console.error('Date formatting error:', error);
        return dateStr;
      }
    },
    
    getInitials(name) {
      if (!name) return '??';
      try {
        return name
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase()
          .slice(0, 2);
      } catch (error) {
        console.error('Initials generation error:', error);
        return '??';
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
          });
          return;
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
          'Alasan Penolakan': item.alasan_penolakan || ''
        }));

        const headers = Object.keys(dataToExport[0]).join(',');
        const csvContent = dataToExport.map(row => 
          Object.values(row).map(value => 
            `"${String(value).replace(/"/g, '""')}"`
          ).join(',')
        ).join('\n');
        
        const fullCsv = headers + '\n' + csvContent;
        
        const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `data_pkl_${new Date().toISOString().slice(0,10)}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        Swal.fire({
          icon: 'success',
          title: 'Export Berhasil',
          text: 'Data PKL telah berhasil diekspor',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#10b981'
        });
      } catch (error) {
        console.error('Export error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Export Gagal',
          text: 'Terjadi kesalahan saat mengekspor data',
          background: '#374151',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        });
      }
    },

    toggleDocumentDropdown(itemId) {
      this.dropdownOpen = this.dropdownOpen === itemId ? null : itemId;
    },
    
    closeAllDropdowns() {
      this.dropdownOpen = null;
    },
    
    getDocumentCount(item) {
      let count = 0;
      if (item.surat_pengantar) count++;
      if (item.cv) count++;
      if (item.nilai_raport_transkrip) count++;
      if (item.kartu_pelajar) count++;
      if (item.foto_id_card) count++;
      return count;
    },

    getDropdownPosition() {
      if (window.innerWidth < 768) {
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
      } else {
        return {
          top: '20%',
          right: '10%'
        };
      }
    },
    
    async downloadAllDocuments(item) {
      const documents = [];
      if (item.surat_pengantar) documents.push({ url: `http://localhost:5050/uploads/pkl/${item.surat_pengantar}`, name: 'Surat_Pengantar' });
      if (item.cv) documents.push({ url: `http://localhost:5050/uploads/pkl/${item.cv}`, name: 'CV' });
      if (item.nilai_raport_transkrip) documents.push({ url: `http://localhost:5050/uploads/pkl/${item.nilai_raport_transkrip}`, name: 'Nilai_Transkrip' });
      if (item.kartu_pelajar) documents.push({ url: `http://localhost:5050/uploads/pkl/${item.kartu_pelajar}`, name: 'Kartu_Pelajar' });
      if (item.foto_id_card) documents.push({ url: `http://localhost:5050/uploads/pkl/${item.foto_id_card}`, name: 'Foto_ID' });
      
      documents.forEach((doc, index) => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = doc.url;
          link.download = `${item.nama_lengkap}_${doc.name}`;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, index * 500);
      });
      
      this.closeAllDropdowns();
      
      Swal.fire({
        icon: 'success',
        title: 'Download Dimulai',
        text: `Mengunduh ${documents.length} dokumen...`,
        background: '#374151',
        color: '#ffffff',
        confirmButtonColor: '#10b981',
        timer: 2000
      });
    }
  }
};
</script>

<style scoped>
/* Custom scrollbar for modal and dropdowns */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Smooth transitions */
.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease;
}

.transition-transform {
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Dropdown overlay to prevent body scroll */
body.dropdown-open {
  overflow: hidden;
}

/* Fixed dropdown positioning */
.fixed.z-50 {
  animation: dropdownSlide 0.15s ease-out;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Enhanced shadow for dropdown */
.shadow-2xl {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

/* Table hover effect */
tbody tr:hover {
  background-color: #374151 !important;
}

/* Modal backdrop blur */
.fixed.inset-0 {
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.1);
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

  /* Mobile dropdown adjustments */
  .w-80 {
    width: calc(100vw - 2rem);
    max-width: 20rem;
  }

  .fixed.z-50 {
    top: 50% !important;
    left: 50% !important;
    right: auto !important;
    transform: translate(-50%, -50%) !important;
  }
}

@media (max-width: 640px) {
  /* Extra small screens */
  .w-80 {
    width: calc(100vw - 1rem);
    max-width: 18rem;
  }
}

/* Text truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.min-w-0 {
  min-width: 0;
}

/* Space utility */
.space-y-1 > * + * {
  margin-top: 0.25rem;
}

/* Hover effects for document items */
.group:hover .fas.fa-external-link-alt {
  opacity: 1;
}

/* SweetAlert2 custom styles */
.swal2-popup {
  font-family: inherit;
}

/* Custom styles for rejection reason modal */
.bg-red-50 {
  background-color: #fef2f2;
}

.border-red-200 {
  border-color: #fecaca;
}

.text-red-800 {
  color: #991b1b;
}

.border-red-500 {
  border-color: #ef4444;
}

.focus\:ring-red-500:focus {
  --tw-ring-color: #ef4444;
}

.focus\:border-red-500:focus {
  border-color: #ef4444;
}

/* Animation for modal entrance */
@keyframes modalSlide {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.fixed.inset-0 .bg-gray-800 {
  animation: modalSlide 0.2s ease-out;
}

/* Textarea resize handle styling */
textarea.resize-none::-webkit-resizer {
  display: none;
}

/* Custom button loading state */
.disabled\:bg-gray-600:disabled {
  background-color: #4b5563;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

/* Enhanced focus styles for accessibility */
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* Rejection reason display styles */
.bg-red-900 {
  background-color: #7f1d1d;
}

.bg-opacity-20 {
  background-opacity: 0.2;
}

.text-red-300 {
  color: #fca5a5;
}

.border-red-600 {
  border-color: #dc2626;
}

.text-red-400 {
  color: #f87171;
}

/* Underline animation */
.underline {
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  transition: text-decoration-color 0.2s ease;
}

.underline:hover {
  text-decoration-thickness: 2px;
}

/* Status badge container adjustment */
td .mt-1 {
  margin-top: 0.25rem;
}

/* Mobile responsive adjustments for rejection modal */
@media (max-width: 768px) {
  .max-w-md {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
  
  .p-4.md\:p-6 {
    padding: 1rem;
  }
  
  textarea {
    font-size: 14px;
  }
}

/* Loading state for buttons */
.flex.items-center.gap-2 i.animate-spin {
  margin-right: 0.25rem;
}

/* Enhanced hover states */
.hover\:bg-red-700:hover {
  background-color: #b91c1c;
}

.hover\:text-red-300:hover {
  color: #fca5a5;
}

/* Smooth scrolling for modal content */
.overflow-y-auto {
  scroll-behavior: smooth;
}

/* Custom focus ring for textarea */
textarea:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Badge spacing adjustments */
.StatusBadge + div {
  margin-top: 0.375rem;
}
</style>