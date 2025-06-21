<template>
    <section class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-10">
      <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center text-indigo-700 mb-6">Cek Status Permohonan</h2>
  
        <form @submit.prevent="checkStatus" class="space-y-6">
          <div>
            <label class="block font-medium text-gray-700 mb-1">Jenis Permohonan</label>
            <select v-model="type" required class="form-input">
              <option value="" disabled>Pilih jenis permohonan</option>
              <option value="kunjungan">Kunjungan</option>
              <option value="pkl">PKL / Magang</option>
            </select>
          </div>
  
          <div>
            <label class="block font-medium text-gray-700 mb-1">Email / NIM / NISN</label>
            <input v-model="keyword" type="text" class="form-input" placeholder="Masukkan email atau NIM/NISN" required>
          </div>
  
          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition">
            Cek Status
          </button>
        </form>
  
        <div v-if="statusResult" class="mt-8 border-t pt-6">
          <h3 class="text-xl font-semibold text-indigo-800 mb-2">Hasil Pencarian:</h3>
          <p class="text-gray-800"><strong>Status:</strong> {{ statusResult.status }}</p>
          <p v-if="statusResult.message" class="text-sm text-gray-600 mt-2">{{ statusResult.message }}</p>
        </div>
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
            message: 'Silakan cek email Anda untuk informasi selanjutnya.',
          };
        } else {
          this.statusResult = {
            status: 'Sedang Diproses',
            message: 'Permohonan Anda masih dalam tahap review oleh admin.',
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
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus {
    border-color: #6366f1;
  }
  </style>
  