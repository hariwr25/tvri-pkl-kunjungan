<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-16 px-4 sm:px-10 overflow-hidden">
    <div class="max-w-2xl mx-auto bg-gray-800/80 rounded-2xl shadow-2xl border border-gray-700/50 p-8 backdrop-blur-lg transition-all duration-500 ease-out animate-fade-in">
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform hover:scale-110">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
          Cek Status Permohonan
        </h2>
        <p class="text-gray-300 text-lg">Lacak status pengajuan Anda dengan cepat dan mudah</p>
      </div>

      <form @submit.prevent="checkStatus" class="space-y-6" aria-label="Formulir Cek Status">
        <div class="space-y-3">
          <label for="type" class="block font-medium text-gray-200 text-sm">Jenis Permohonan</label>
          <select
            id="type"
            v-model="type"
            required
            class="form-input transition-all duration-300 ease-in-out"
            aria-describedby="type-error"
          >
            <option value="" disabled>Pilih jenis permohonan</option>
            <option value="pkl">🎓 PKL / Magang</option>
            <option value="kunjungan">🏢 Kunjungan</option>
          </select>
        </div>

        <div class="space-y-3">
          <label for="keyword" class="block font-medium text-gray-200 text-sm">Email / NIM / NISN</label>
          <input
            id="keyword"
            v-model="keyword"
            type="text"
            class="form-input transition-all duration-300 ease-in-out"
            placeholder="Masukkan email atau NIM/NISN"
            required
            aria-describedby="keyword-error"
          >
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 border border-indigo-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span class="flex items-center justify-center">
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            {{ isLoading ? 'Memeriksa...' : 'Cek Status Sekarang' }}
          </span>
        </button>
      </form>

      <div v-if="errorMessage" class="mt-6 p-4 bg-red-900/50 border border-red-700/50 rounded-lg animate-slide-up">
        <p class="text-red-200 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          {{ errorMessage }}
        </p>
      </div>

      <div v-if="statusResult" class="mt-10 border-t border-gray-700/50 pt-6 animate-slide-up">
        <div class="bg-gray-900/80 rounded-xl p-6 border border-gray-600/50 backdrop-blur-sm">
          <h3 class="text-xl font-semibold text-indigo-400 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Hasil Pencarian
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <span class="text-gray-200 font-medium mr-3">Status:</span>
              <span
                :class="{
                  'status-approved': statusResult.status === 'approved',
                  'status-pending': statusResult.status === 'pending',
                  'status-rejected': statusResult.status === 'rejected'
                }"
                class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300"
              >
                {{ formatStatus(statusResult.status) }}
              </span>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-5 border-l-4" :class="{
              'border-indigo-500': statusResult.status === 'approved',
              'border-yellow-500': statusResult.status === 'pending',
              'border-red-500': statusResult.status === 'rejected'
            }">
              <div class="text-gray-200 leading-relaxed text-sm whitespace-pre-line">{{ statusResult.message }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-1/5 left-1/5 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/5 right-1/5 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CekStatus',
  data() {
    return {
      type: 'pkl',
      keyword: '',
      isLoading: false,
      errorMessage: '',
      statusResult: null,
    };
  },
  methods: {
    async checkStatus() {
      this.isLoading = true;
      this.errorMessage = '';
      this.statusResult = null;

      try {
        const apiUrl = 'http://localhost:5050/api/cek-status';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: this.type,
            keyword: this.keyword
          })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Gagal memeriksa status');
        }

        const formattedMessage = this.formatStatusMessage(data.status, data.data);

        this.statusResult = {
          status: data.status,
          message: formattedMessage,
          data: data.data
        };

      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = error.message || 'Terjadi kesalahan saat memeriksa status';
      } finally {
        this.isLoading = false;
      }
    },

    formatStatusMessage(status, data) {
      const honorific = this.getHonorific(data.nama);
      
      const messages = {
        pkl: {
          approved: () => {
            const mulai = this.formatDate(data.tanggal_mulai);
            const selesai = this.formatDate(data.tanggal_selesai);
            
            let unitKerjaLine = '';
            let asalInstansiLine = '';
            
            if (data.unit_kerja && data.unit_kerja.trim() !== '') {
              unitKerjaLine = `• Unit Kerja: ${data.unit_kerja}\n`;
            }
            
            if (data.asal_instansi && data.asal_instansi.trim() !== '') {
              asalInstansiLine = `• Asal Instansi: ${data.asal_instansi}\n`;
            }
            
            return `🎉 Selamat ${honorific} ${data.nama}!

Permohonan PKL Anda telah DISETUJUI oleh tim TVRI. Kami dengan senang hati menyambut Anda dalam program Praktik Kerja Lapangan.

📅 Periode PKL Anda:
• Tanggal Mulai: ${mulai}
• Tanggal Selesai: ${selesai}
${unitKerjaLine}${asalInstansiLine}
📋 Langkah Selanjutnya:
1. Konfirmasi kehadiran H-3 sebelum tanggal mulai
2. Siapkan dokumen yang diperlukan untuk orientasi
3. Hubungi bagian SDM TVRI untuk informasi lebih lanjut
4. Pastikan Anda datang tepat waktu pada hari pertama

Semoga pengalaman PKL di TVRI memberikan manfaat besar untuk pengembangan karir Anda! 🚀

Selamat bergabung dengan keluarga besar TVRI! ✨`;
          },

          rejected: () => {
            let message = `Kepada ${honorific} ${data.nama},

Terima kasih atas minat Anda untuk mengikuti program PKL di TVRI. Setelah melalui proses evaluasi yang cermat, kami mohon maaf harus menyampaikan bahwa permohonan PKL Anda tidak dapat kami setujui pada periode ini.`;

            if (data.alasan_penolakan && data.alasan_penolakan.trim() !== '') {
              message += `\n\n📝 Alasan Penolakan:\n${data.alasan_penolakan}`;
            }

            message += `\n\n💡 Saran untuk Ke Depan:
• Anda dapat mengajukan kembali permohonan PKL di periode berikutnya
• Pastikan semua dokumen persyaratan telah lengkap dan sesuai ketentuan
• Pertimbangkan untuk meningkatkan kualifikasi atau pengalaman yang relevan
• Konsultasikan dengan pihak kampus untuk persiapan yang lebih baik

🌟 Jangan berkecil hati! Kesempatan lain pasti akan datang. Tetap semangat dalam mengejar impian Anda.

Terima kasih atas pengertian dan antusiasme Anda terhadap TVRI. 🙏`;

            return message;
          },

          pending: () => {
            const mulai = this.formatDate(data.tanggal_mulai);
            
            let asalInstansiLine = '';
            let nimNisnLine = '';
            
            if (data.asal_instansi && data.asal_instansi.trim() !== '') {
              asalInstansiLine = `🏢 Asal Instansi: ${data.asal_instansi}\n`;
            }
            
            if (data.nim_nisn && data.nim_nisn.trim() !== '') {
              nimNisnLine = `🆔 NIM/NISN: ${data.nim_nisn}\n`;
            }
            
            return `Kepada ${honorific} ${data.nama},

Terima kasih telah mengajukan permohonan PKL di TVRI. Permohonan Anda saat ini sedang dalam proses REVIEW oleh tim terkait.

📋 Status Saat Ini: SEDANG DIPROSES
${mulai ? `📅 Periode yang Diajukan: Mulai ${mulai}\n` : ''}${asalInstansiLine}${nimNisnLine}
⏰ Estimasi Waktu Proses: 5-7 hari kerja

📬 Kami akan segera menghubungi Anda melalui email yang terdaftar untuk memberikan pemberitahuan hasil evaluasi. Mohon pastikan:
• Email Anda aktif dan dapat diakses
• Periksa folder spam/junk secara berkala
• Nomor telepon yang dapat dihubungi

Terima kasih atas kesabaran Anda menunggu proses evaluasi. 🕒`;
          }
        },

        kunjungan: {
          approved: () => {
            const tanggalKunjungan = this.formatDate(data.tanggal_kunjungan);
            
            return `🎉 Selamat! Permohonan kunjungan dari ${data.nama} telah DISETUJUI.

📅 Detail Kunjungan yang Disetujui:
• Tanggal: ${tanggalKunjungan}
• Jumlah Peserta: ${data.jumlah_peserta} orang
• Instansi: ${data.nama}

📋 Persiapan Kunjungan:
1. Konfirmasi kehadiran H-2 sebelum tanggal kunjungan
2. Bawa identitas resmi (KTP/SIM/Kartu Pelajar) untuk semua peserta
3. Patuhi protokol keamanan dan kesehatan yang berlaku
4. Datang tepat waktu sesuai jadwal yang telah ditentukan
5. Siapkan daftar nama peserta yang akan ikut kunjungan

📞 Kontak Koordinasi:
Hubungi bagian Humas TVRI untuk koordinasi teknis dan konfirmasi detail kunjungan.

🏢 Alamat TVRI:
Jl. Gerbang Pemuda No.8, Senayan, Jakarta Pusat

Kami menantikan kunjungan Anda dan berharap dapat memberikan pengalaman yang berkesan! ✨

Selamat datang di TVRI! 🎬`;
          },

          rejected: () => {
            return `Kepada ${data.nama},

Terima kasih atas minat Anda untuk mengunjungi TVRI. Setelah mempertimbangkan berbagai faktor, kami mohon maaf harus menyampaikan bahwa permohonan kunjungan Anda tidak dapat kami setujui pada waktu yang diminta.

💭 Kemungkinan Penyebab:
• Jadwal yang diminta tidak tersedia atau bertabrakan dengan agenda lain
• Kapasitas kunjungan pada tanggal tersebut sudah terpenuhi
• Persyaratan administratif tertentu belum terpenuhi
• Keterbatasan fasilitas atau SDM pendamping

🔄 Alternatif yang Dapat Anda Lakukan:
• Ajukan permohonan untuk tanggal alternatif yang tersedia
• Hubungi bagian Humas TVRI untuk konsultasi jadwal yang lebih fleksibel
• Pastikan semua persyaratan administrasi sudah lengkap dan sesuai
• Pertimbangkan untuk mengurangi jumlah peserta jika memungkinkan

📞 Untuk informasi lebih lanjut, silakan hubungi:
Bagian Humas TVRI untuk mendiskusikan opsi lain yang tersedia.

Terima kasih atas pengertian Anda. Kami tetap terbuka untuk kerjasama di kesempatan lain. 🙏`;
          },

          pending: () => {
            const tanggalKunjungan = this.formatDate(data.tanggal_kunjungan);
            
            return `Kepada ${data.nama},

Terima kasih telah mengajukan permohonan kunjungan ke TVRI. Permohonan Anda sedang dalam proses EVALUASI oleh tim terkait.

📋 Status Permohonan: SEDANG DIPROSES
📅 Tanggal yang Diajukan: ${tanggalKunjungan}
👥 Jumlah Peserta: ${data.jumlah_peserta} orang
🏢 Nama Instansi: ${data.nama}

⏰ Estimasi Waktu Proses: 3-5 hari kerja

🔍 Proses Evaluasi Meliputi:
• Pengecekan ketersediaan jadwal dan fasilitas
• Koordinasi dengan berbagai divisi terkait
• Persiapan program kunjungan yang optimal
• Penyesuaian dengan agenda operasional TVRI

📬 Pemberitahuan hasil evaluasi akan dikirim melalui email yang terdaftar. Pastikan email Anda aktif dan periksa folder spam secara berkala.

Mohon menunggu konfirmasi lebih lanjut. Terima kasih atas kesabaran Anda! 🕒`;
          }
        }
      };

      return messages[this.type][status]();
    },

    getHonorific(nama) {
      if (!nama) return '';
      const femaleEndings = ['a', 'i', 'e', 'ah', 'ih', 'eh'];
      const nameLower = nama.toLowerCase();
      const isLikelyFemale = femaleEndings.some(ending => nameLower.endsWith(ending));
      return isLikelyFemale ? 'Saudari' : 'Saudara';
    },

    formatStatus(status) {
      const statusMap = {
        'approved': 'Disetujui',
        'pending': 'Sedang Diproses',
        'rejected': 'Ditolak'
      };
      return statusMap[status] || status;
    },

    formatDate(dateString) {
      if (!dateString) return '-';
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Jakarta'
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    }
  }
}
</script>

<style scoped>
/* Font stack modern */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

section {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Form input styling */
.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  background-color: #1F2937;
  border: 2px solid #4B5563;
  border-radius: 0.75rem;
  color: #F9FAFB;
  outline: none;
  transition: all 0.3s ease-in-out;
  font-size: 0.95rem;
}

.form-input:focus {
  border-color: #6366F1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
  background-color: #2D3748;
}

.form-input::placeholder {
  color: #9CA3AF;
}

.form-input option {
  background-color: #1F2937;
  color: #F9FAFB;
}

/* Status badge styling */
.status-approved {
  background: linear-gradient(135deg, #34D399, #059669);
  color: white;
}

.status-pending {
  background: linear-gradient(135deg, #FBBF24, #D97706);
  color: white;
}

.status-rejected {
  background: linear-gradient(135deg, #F87171, #DC2626);
  color: white;
}

/* Custom animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.2; }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out;
}

.animate-pulse-slow {
  animation: pulse-slow 8s infinite ease-in-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1F2937;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #6366F1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #818CF8;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .max-w-2xl {
    padding: 1.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  button {
    padding: 0.75rem;
    font-size: 0.95rem;
  }
}
</style>