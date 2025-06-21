<template>
  <section class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 px-6 sm:px-16 lg:px-24">
      <div class="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <!-- Text -->
        <div class="max-w-xl text-center lg:text-left z-20">
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
            Pendaftaran PKL & Kunjungan <br> TVRI Yogyakarta
          </h1>
          <p class="text-lg sm:text-xl opacity-90 mb-8 leading-relaxed drop-shadow-md">
            Daftarkan dirimu untuk PKL atau ajukan kunjungan edukatif ke TVRI Yogyakarta secara online dan mudah.
          </p>
          <div class="flex justify-center lg:justify-start gap-4 flex-wrap">
            <router-link
              to="/daftar-pkl"
              class="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:shadow-xl transform hover:scale-105 transition"
            >
              Daftar PKL
            </router-link>
            <router-link
              to="/daftar-kunjungan"
              class="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:shadow-xl transform hover:scale-105 transition"
            >
              Daftar Kunjungan
            </router-link>
            <router-link
              to="/status"
              class="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-700 transition"
            >
              Cek Status
            </router-link>
          </div>
        </div>

        <!-- Image -->
        <div class="w-full max-w-md lg:max-w-lg relative h-80 rounded-xl overflow-hidden shadow-xl">
          <img
            :src="images[currentIndex]"
            alt="Slide"
            class="object-cover w-full h-full rounded-xl transition duration-700"
          />
        </div>
      </div>
    </div>

    <!-- Info Boxes -->
    <section class="py-16 px-6 sm:px-16 lg:px-24 bg-white">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Info PKL -->
        <div class="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 class="text-2xl font-semibold text-indigo-700 mb-4">Informasi PKL</h2>
          <p class="text-indigo-900 mb-4">
            TVRI Yogyakarta membuka program PKL bagi siswa dan mahasiswa melalui sistem pendaftaran online.
          </p>
          <ul class="list-disc list-inside text-indigo-800 space-y-2">
            <li>🗓 Jadwal fleksibel sesuai slot tersedia</li>
            <li>📄 Wajib surat pengantar resmi</li>
            <li>👥 Kuota terbatas setiap bulan</li>
          </ul>
        </div>

        <!-- Info Kunjungan -->
        <div class="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 class="text-2xl font-semibold text-blue-700 mb-4">Informasi Kunjungan</h2>
          <p class="text-blue-900 mb-4">
            Kami menerima kunjungan edukatif dari sekolah, universitas, dan komunitas.
          </p>
          <ul class="list-disc list-inside text-blue-800 space-y-2">
            <li>📸 Melihat studio dan proses siaran</li>
            <li>📅 Jadwal diatur oleh tim kami</li>
            <li>👥 Minimal 10 peserta</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-indigo-600 text-white py-6 text-center text-sm mt-auto">
      &copy; 2025 TVRI Yogyakarta – Divisi New Media
    </footer>
  </section>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      images: [
        require('@/assets/podcast1.jpg'),
        require('@/assets/foto.jpg'),
      ],
      currentIndex: 0,
    };
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000);
  },
};
</script>
