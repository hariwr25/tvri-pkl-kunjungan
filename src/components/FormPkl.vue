<!-- src/components/FormPKL.vue -->
<template>
  <div class="form-container">
    <h2>Form Pendaftaran PKL</h2>
    <form @submit.prevent="submitForm">
      <input v-model="form.nama_lengkap" placeholder="Nama Lengkap" required />
      <input v-model="form.asal_instansi" placeholder="Asal Instansi" required />
      <input v-model="form.nim_nisn" placeholder="NIM/NISN" required />
      <input v-model="form.jurusan" placeholder="Jurusan" required />
      <input v-model="form.no_hp" placeholder="No. HP" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.tanggal_mulai" type="date" required />
      <input v-model="form.tanggal_selesai" type="date" required />
      <input type="file" @change="handleFileUpload" required />

      <button type="submit">Kirim</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        nama_lengkap: '',
        asal_instansi: '',
        nim_nisn: '',
        jurusan: '',
        no_hp: '',
        email: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        surat_pengantar: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.surat_pengantar = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      await axios.post('http://localhost:3000/api/pkl', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Data berhasil dikirim!');
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
}
input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
}
button {
  padding: 10px 20px;
}
</style>
