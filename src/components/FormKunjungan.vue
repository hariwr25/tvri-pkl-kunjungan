<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-6 sm:py-8 text-white">
    <div class="w-full max-w-2xl space-y-6">
      <!-- Header di luar container -->
      <div class="text-center">
        <div class="flex items-center justify-center gap-3 sm:gap-4 mb-2">
          <div class="h-16 w-16 sm:h-20 sm:w-20">
            <img :src="require('@/assets/logo.png')" alt="TVRI Logo" class="w-full h-full object-contain" />
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-indigo-400">Pendaftaran Kunjungan</h1>
        </div>
        <p class="text-gray-300 text-sm sm:text-base px-2">Silahkan isi formulir di bawah ini untuk mengajukan permohonan kunjungan ke TVRI.</p>
        <p class="text-yellow-400 text-xs sm:text-sm mt-2">
          <i class="fas fa-info-circle mr-1"></i>
          Kunjungan hanya dilaksanakan hari Senin - Jumat
        </p>
      </div>

      <!-- Container Form -->
      <div class="bg-gray-800 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 space-y-4 sm:space-y-6">
        <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6">
          <div>
            <label class="label-dark">Nama Instansi</label>
            <input v-model="form.nama_instansi" type="text" class="input-dark" placeholder="Contoh: SMA Negeri 1 Yogyakarta" required />
          </div>

          <div>
            <label class="label-dark">Kontak Person</label>
            <input v-model="form.kontak_person" type="text" class="input-dark" placeholder="Nama penanggung jawab" required />
          </div>

          <div>
            <label class="label-dark">Email</label>
            <input v-model="form.email" type="email" class="input-dark" placeholder="Email aktif" required />
          </div>

          <div>
            <label class="label-dark">Nomor HP</label>
            <input v-model="form.no_hp" type="text" class="input-dark" placeholder="08xxxxxxxxxx" required />
          </div>

          <div>
            <label class="label-dark">Jumlah Peserta</label>
            <input v-model="form.jumlah_peserta" type="number" class="input-dark" placeholder="Misal: 35" required />
          </div>

          <div>
            <label class="label-dark">Tanggal Kunjungan</label>
            <input 
              v-model="form.tanggal_kunjungan" 
              type="date" 
              class="input-dark" 
              :min="minDate"
              @change="onDateChange"
              required 
            />
            <div v-if="dateError" class="text-red-400 text-xs mt-1">
              <i class="fas fa-exclamation-triangle mr-1"></i>
              {{ dateError }}
            </div>
          </div>

          <div>
            <label class="label-dark">Waktu Kunjungan</label>
            <select v-model="form.waktu" class="input-dark" required :disabled="!form.tanggal_kunjungan">
              <option value="" disabled>
                {{ !form.tanggal_kunjungan ? 'Pilih tanggal terlebih dahulu' : 'Pilih sesi kunjungan' }}
              </option>
              <option 
                value="sesi1" 
                :disabled="sessionStatus.sesi1.isFull"
                :class="{ 'text-red-400': sessionStatus.sesi1.isFull }"
              >
                Sesi 1 (09.00-12.00) 
                {{ sessionStatus.sesi1.isFull ? '- PENUH' : sessionStatus.sesi1.count > 0 ? `- ${sessionStatus.sesi1.count} terdaftar` : '' }}
              </option>
              <option 
                value="sesi2" 
                :disabled="sessionStatus.sesi2.isFull"
                :class="{ 'text-red-400': sessionStatus.sesi2.isFull }"
              >
                Sesi 2 (13.00-15.00) 
                {{ sessionStatus.sesi2.isFull ? '- PENUH' : sessionStatus.sesi2.count > 0 ? `- ${sessionStatus.sesi2.count} terdaftar` : '' }}
              </option>
            </select>
            
            <!-- Peringatan jika kedua sesi penuh -->
            <div v-if="bothSessionsFull" class="bg-red-900 border border-red-700 rounded-lg p-3 mt-2">
              <div class="text-red-300 text-xs sm:text-sm">
                <i class="fas fa-exclamation-circle mr-2"></i>
                <strong>Tanggal ini sudah penuh!</strong>
                <p class="mt-1">Silahkan pilih tanggal lain. Kedua sesi (Sesi 1 dan Sesi 2) sudah terisi penuh.</p>
              </div>
            </div>
            
            <!-- Info ketersediaan sesi -->
            <div v-if="form.tanggal_kunjungan && !bothSessionsFull && hasPartialBooking" class="bg-yellow-900 border border-yellow-700 rounded-lg p-3 mt-2">
              <div class="text-yellow-300 text-xs sm:text-sm">
                <i class="fas fa-info-circle mr-2"></i>
                <strong>Informasi Ketersediaan:</strong>
                <p class="mt-1">
                  Beberapa sesi sudah terisi. Silahkan pilih sesi yang masih tersedia atau pilih tanggal lain.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label class="label-dark">Upload Surat Pengantar</label>
            <input
              type="file"
              @change="handleFileUpload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              required
              class="block w-full text-xs sm:text-sm text-gray-300 file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
            <p class="text-gray-400 text-xs mt-1">Format yang diizinkan: PDF, DOC, DOCX, JPG, JPEG, PNG (Max: 5MB)</p>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isSubmitting || bothSessionsFull"
              class="w-full font-semibold py-3 text-sm sm:text-base rounded-lg transition duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed"
              :class="bothSessionsFull ? 'bg-gray-600 text-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white'"
            >
              <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
              {{ isSubmitting ? 'Mengirim...' : bothSessionsFull ? 'Tanggal Penuh - Pilih Tanggal Lain' : 'Kirim Permohonan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      form: {
        nama_instansi: '',
        kontak_person: '',
        email: '',
        no_hp: '',
        jumlah_peserta: '',
        tanggal_kunjungan: '',
        waktu: '',
        surat_pengantar: null,
      },
      sessionStatus: {
        sesi1: {
          count: 0,
          isFull: false
        },
        sesi2: {
          count: 0,
          isFull: false
        }
      },
      dateError: '',
      isSubmitting: false,
    }
  },
  computed: {
    minDate() {
      // Tanggal minimum adalah hari ini
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    bothSessionsFull() {
      return this.sessionStatus.sesi1.isFull && this.sessionStatus.sesi2.isFull
    },
    hasPartialBooking() {
      return (this.sessionStatus.sesi1.count > 0 || this.sessionStatus.sesi2.count > 0) && !this.bothSessionsFull
    }
  },
  methods: {
    isWeekday(date) {
      const day = new Date(date).getDay()
      return day >= 1 && day <= 5 // Senin = 1, Jumat = 5
    },
    
    async checkSessionAvailability(date) {
      if (!date) return
      
      try {
        const response = await axios.get(`http://localhost:5050/api/kunjungan/check-availability/${date}`)
        this.sessionStatus = response.data.sessionStatus
      } catch (error) {
        console.error('Error checking availability:', error)
        // Reset session status jika terjadi error
        this.sessionStatus = {
          sesi1: { count: 0, isFull: false },
          sesi2: { count: 0, isFull: false }
        }
      }
    },
    
    async onDateChange() {
      this.dateError = ''
      this.form.waktu = '' // Reset pilihan waktu
      
      if (!this.form.tanggal_kunjungan) return
      
      // Validasi hari kerja
      if (!this.isWeekday(this.form.tanggal_kunjungan)) {
        this.dateError = 'Kunjungan hanya dapat dilakukan pada hari Senin - Jumat'
        this.form.tanggal_kunjungan = ''
        return
      }
      
      // Validasi tanggal tidak boleh hari yang sudah lewat
      const selectedDate = new Date(this.form.tanggal_kunjungan)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        this.dateError = 'Tidak dapat memilih tanggal yang sudah lewat'
        this.form.tanggal_kunjungan = ''
        return
      }
      
      // Cek ketersediaan sesi
      await this.checkSessionAvailability(this.form.tanggal_kunjungan)
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        // Validasi ukuran file (5MB)
        if (file.size > 5 * 1024 * 1024) {
          Swal.fire({
            icon: 'error',
            title: 'File Terlalu Besar!',
            text: 'Ukuran file tidak boleh lebih dari 5MB.',
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#ef4444'
          })
          event.target.value = ''
          return
        }
        
        // Validasi tipe file
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png']
        if (!allowedTypes.includes(file.type)) {
          Swal.fire({
            icon: 'error',
            title: 'Format File Tidak Didukung!',
            text: 'Hanya file PDF, DOC, DOCX, JPG, JPEG, PNG yang diizinkan.',
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#ef4444'
          })
          event.target.value = ''
          return
        }
        
        this.form.surat_pengantar = file
      }
    },

    async submitForm() {
      // Validasi final
      if (this.bothSessionsFull) {
        Swal.fire({
          icon: 'warning',
          title: 'Tanggal Penuh!',
          text: 'Silahkan pilih tanggal lain karena kedua sesi sudah penuh.',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#f59e0b'
        })
        return
      }
      
      if (!this.isWeekday(this.form.tanggal_kunjungan)) {
        Swal.fire({
          icon: 'error',
          title: 'Tanggal Tidak Valid!',
          text: 'Kunjungan hanya dapat dilakukan pada hari Senin - Jumat.',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#ef4444'
        })
        return
      }

      this.isSubmitting = true
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }

      try {
        await axios.post('http://localhost:5050/api/kunjungan', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Permohonan kunjungan berhasil dikirim. Kami akan menghubungi Anda segera.',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#6366f1'
        })

        this.resetForm()
      } catch (error) {
        console.error(error)
        let errorMessage = 'Terjadi kesalahan saat mengirim data.'
        
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: errorMessage,
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#ef4444'
        })
      } finally {
        this.isSubmitting = false
      }
    },

    resetForm() {
      this.form = {
        nama_instansi: '',
        kontak_person: '',
        email: '',
        no_hp: '',
        jumlah_peserta: '',
        tanggal_kunjungan: '',
        waktu: '',
        surat_pengantar: null,
      }
      
      this.sessionStatus = {
        sesi1: { count: 0, isFull: false },
        sesi2: { count: 0, isFull: false }
      }
      
      this.dateError = ''
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) fileInput.value = ''
    },
  }
}
</script>

<style scoped>
.input-dark {
  @apply w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition;
}

.input-dark:disabled {
  @apply bg-gray-800 text-gray-500 cursor-not-allowed;
}

.label-dark {
  @apply block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-1;
}

option:disabled {
  background-color: #374151;
  color: #9ca3af;
}
</style>