<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 text-white">
    <div class="bg-gray-800 shadow-2xl rounded-3xl w-full max-w-2xl p-10 space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-indigo-400 mb-2">Pendaftaran Kunjungan</h1>
        <p class="text-gray-300">Silakan isi formulir di bawah ini untuk mengajukan permohonan kunjungan ke TVRI.</p>
      </div>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="col-span-2">
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
          <input v-model="form.tanggal_kunjungan" type="date" class="input-dark" required />
        </div>

        <div class="col-span-2">
          <label class="label-dark">Upload Surat Pengantar</label>
          <input
            type="file"
            @change="handleFileUpload"
            required
            class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />
        </div>

        <div class="col-span-2">
          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow">
            Kirim Permohonan
          </button>
        </div>
      </form>
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
        surat_pengantar: null,
      },
    }
  },
  methods: {
    handleFileUpload(event) {
      this.form.surat_pengantar = event.target.files[0]
    },
    async submitForm() {
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
          text: 'Permohonan kunjungan berhasil dikirim.',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#6366f1'
        })

        this.resetForm()
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat mengirim data.',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#ef4444'
        })
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
        surat_pengantar: null,
      }
    },
  }
}
</script>

<style scoped>
.input-dark {
  @apply w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition;
}
.label-dark {
  @apply block text-sm font-medium text-gray-300 mb-1;
}
</style>
