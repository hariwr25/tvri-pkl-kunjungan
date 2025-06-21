<!-- src/components/FormKunjungan.vue -->
<template>
  <div class="form-container">
    <h2>Form Pendaftaran Kunjungan</h2>
    <form @submit.prevent="submitForm">
      <input v-model="form.nama_instansi" placeholder="Nama Instansi" required />
      <input v-model="form.kontak_person" placeholder="Kontak Person" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.no_hp" placeholder="No. HP" required />
      <input v-model="form.jumlah_peserta" type="number" placeholder="Jumlah Peserta" required />
      <input v-model="form.tanggal_kunjungan" type="date" required />
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
        nama_instansi: '',
        kontak_person: '',
        email: '',
        no_hp: '',
        jumlah_peserta: '',
        tanggal_kunjungan: '',
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
      await axios.post('http://localhost:3000/api/kunjungan', formData, {
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
