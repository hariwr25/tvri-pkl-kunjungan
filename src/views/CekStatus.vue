<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-16 px-4 sm:px-10">
    <div class="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 backdrop-blur-sm">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Cek Status Permohonan
        </h2>
        <p class="text-gray-400">Periksa status pengajuan Anda dengan mudah</p>
      </div>

      <form @submit.prevent="checkStatus" class="space-y-6">
        <div class="space-y-2">
          <label class="block font-medium text-gray-300 mb-2">Jenis Permohonan</label>
          <select v-model="type" required class="form-input">
            <option value="" disabled>Pilih jenis permohonan</option>
            <option value="kunjungan">🏢 Kunjungan</option>
            <option value="pkl">🎓 PKL / Magang</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="block font-medium text-gray-300 mb-2">Email / NIM / NISN</label>
          <input 
            v-model="keyword" 
            type="text" 
            class="form-input" 
            placeholder="Masukkan email atau NIM/NISN" 
            required
          >
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 border border-blue-500"
        >
          <span class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Cek Status Sekarang
          </span>
        </button>
      </form>

      <div v-if="statusResult" class="mt-8 border-t border-gray-700 pt-6">
        <div class="bg-gray-900 rounded-xl p-6 border border-gray-600">
          <h3 class="text-xl font-semibold text-blue-400 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Hasil Pencarian
          </h3>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="text-gray-300 font-medium mr-3">Status:</span>
              <span 
                :class="statusResult.status === 'Disetujui' ? 'status-approved' : 'status-pending'"
                class="px-3 py-1 rounded-full text-sm font-semibold"
              >
                {{ statusResult.status }}
              </span>
            </div>
            
            <div v-if="statusResult.message" class="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
              <p class="text-gray-300 leading-relaxed">{{ statusResult.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CekStatus',
  data() {
    return {
      type: '',
      keyword: '',
      statusResult: null,
    };
  },
  methods: {
    checkStatus() {
      // 🔧 Simulasi hasil pencarian
      if (this.keyword.toLowerCase().includes('valid')) {
        this.statusResult = {
          status: 'Disetujui',
          message: 'Selamat! Permohonan Anda telah disetujui. Silakan cek email Anda untuk informasi selanjutnya dan instruksi lebih lanjut.',
        };
      } else {
        this.statusResult = {
          status: 'Sedang Diproses',
          message: 'Permohonan Anda masih dalam tahap review oleh admin. Kami akan mengirimkan notifikasi melalui email ketika ada update status.',
        };
      }

      // 🔁 Jika pakai backend, bisa gunakan:
      // axios.post('/api/status-check', { type: this.type, keyword: this.keyword }).then(res => { ... })
    }
  }
};
</script>

<style scoped>
.form-input {
  width: 100%;
  padding: 1rem;
  background-color: #374151;
  border: 2px solid #4B5563;
  border-radius: 0.75rem;
  color: #F9FAFB;
  outline: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.form-input:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #4B5563;
}

.form-input::placeholder {
  color: #9CA3AF;
}

.form-input option {
  background-color: #374151;
  color: #F9FAFB;
}

.status-approved {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
}

.status-pending {
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: white;
}

/* Custom scrollbar untuk dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1F2937;
}

::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}
</style>