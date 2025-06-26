<template>
  <div class="min-h-screen bg-gray-950 text-white overflow-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-amber-400/20 shadow-lg">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
              <span class="text-white font-bold">TV</span>
            </div>
            <span class="text-xl font-bold text-amber-400">TVRI Yogyakarta</span>
          </div>
          <div class="hidden md:flex items-center gap-6">
            <a href="#home" class="hover:text-amber-300 transition-colors font-medium hover:scale-105">Beranda</a>
            <a href="#info" class="hover:text-emerald-300 transition-colors font-medium hover:scale-105">Info</a>
            <a href="#program" class="hover:text-rose-300 transition-colors font-medium hover:scale-105">Program</a>
            <a href="#kontak" class="hover:text-sky-300 transition-colors font-medium hover:scale-105">Kontak</a>
            <router-link 
              to="/cek-status" 
              class="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-amber-400/40 flex items-center gap-2 font-medium hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
              </svg>
              Cek Status
            </router-link>
          </div>
          <button class="md:hidden text-gray-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center pt-20">
      <!-- Animated Background -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute top-3/4 left-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="text-center lg:text-left">
          <div class="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-emerald-400/30 shadow-lg animate-pulse">
            <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-emerald-300">Pendaftaran Online Tersedia</span>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            <span class="text-amber-400">
              Bergabung
            </span>
            <br>
            <span class="text-white">dengan TVRI</span>
            <br>
            <span class="text-2xl lg:text-4xl font-normal text-amber-300">Yogyakarta</span>
          </h1>
          
          <p class="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
            Wujudkan impianmu di dunia broadcasting melalui program PKL dan kunjungan edukatif bersama stasiun televisi publik terdepan.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              @click="scrollToSection('pkl')"
              class="group relative px-8 py-4 bg-amber-500 hover:bg-amber-400 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-amber-400/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span class="relative z-10">📚 Daftar PKL</span>
            </button>
            
            <button
              @click="scrollToSection('kunjungan')"
              class="group relative px-8 py-4 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-2xl font-semibold text-lg hover:bg-emerald-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg"
            >
              <span class="relative z-10">🏛️ Kunjungan Edukatif</span>
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 text-center">
            <div class="bg-amber-900/40 backdrop-blur-sm rounded-xl p-4 border border-amber-400/30 shadow-lg hover:border-amber-400/60 transition-all">
              <div class="text-2xl font-bold text-amber-400">{{ stats.students }}+</div>
              <div class="text-sm text-amber-200">Peserta PKL</div>
            </div>
            <div class="bg-emerald-900/40 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/30 shadow-lg hover:border-emerald-400/60 transition-all">
              <div class="text-2xl font-bold text-emerald-400">{{ stats.visits }}+</div>
              <div class="text-sm text-emerald-200">Kunjungan</div>
            </div>
            <div class="bg-rose-900/40 backdrop-blur-sm rounded-xl p-4 border border-rose-400/30 shadow-lg hover:border-rose-400/60 transition-all">
              <div class="text-2xl font-bold text-rose-400">{{ stats.years }}</div>
              <div class="text-sm text-rose-200">Tahun Pengalaman</div>
            </div>
          </div>
        </div>

        <!-- Visual Content -->
        <div class="relative">
          <!-- Main Image Container -->
          <div class="relative w-full max-w-lg mx-auto">
            <div class="aspect-square rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border-2 border-amber-400/30 hover:border-rose-400/50">
              <img
                :src="currentImage"
                :alt="'Slide ' + (currentImageIndex + 1)"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            </div>
            
            <!-- Floating Cards -->
            <div class="absolute -top-4 -right-4 bg-amber-600/80 backdrop-blur-sm rounded-xl p-4 border border-amber-400/30 animate-bounce shadow-lg">
              <div class="text-2xl">🎬</div>
              <div class="text-xs text-amber-100">Live Studio</div>
            </div>
            
            <div class="absolute -bottom-4 -left-4 bg-rose-600/80 backdrop-blur-sm rounded-xl p-4 border border-rose-400/30 animate-bounce shadow-lg" style="animation-delay: 1s;">
              <div class="text-2xl">📺</div>
              <div class="text-xs text-rose-100">Broadcasting</div>
            </div>
          </div>

          <!-- Image Indicators -->
          <div class="flex justify-center gap-2 mt-6">
            <button
              v-for="(image, index) in images"
              :key="index"
              @click="currentImageIndex = index"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                currentImageIndex === index ? 'bg-amber-400 w-8' : 'bg-gray-500'
              ]"
            ></button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-amber-400/30 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section id="info" class="py-20 px-6 bg-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6">
            <span class="text-amber-400">
              Program Unggulan
            </span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Pilih program yang sesuai dengan kebutuhan dan minatmu dalam dunia broadcasting
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- PKL Card -->
          <div id="pkl" class="group relative bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-amber-400/30 hover:border-amber-400/60 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 shadow-xl hover:shadow-amber-500/30">
            <div class="absolute inset-0 bg-amber-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-pulse">
                  🎓
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Program PKL</h3>
                  <p class="text-amber-300 font-medium">Praktik Kerja Lapangan</p>
                </div>
              </div>

              <p class="text-gray-300 mb-6 leading-relaxed">
                Dapatkan pengalaman langsung di industri broadcasting dengan bimbingan profesional dari tim TVRI Yogyakarta.
              </p>

              <div class="space-y-4 mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span class="text-gray-300">Durasi: Minimal 3 bulan (fleksibel)</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span class="text-gray-300">Tersedia untuk siswa SMA/SMK & mahasiswa</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span class="text-gray-300">Sertifikat resmi dari TVRI</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span class="text-gray-300">Bimbingan mentor berpengalaman</span>
                </div>
              </div>

              <div class="bg-gray-800/60 rounded-2xl p-4 mb-6 border border-gray-700 shadow-inner">
                <h4 class="font-semibold text-amber-300 mb-2">Bidang yang Tersedia:</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-amber-600/30 text-amber-300 rounded-full text-sm border border-amber-400/30">Produksi</span>
                  <span class="px-3 py-1 bg-amber-600/30 text-amber-300 rounded-full text-sm border border-amber-400/30">Penyiaran</span>
                  <span class="px-3 py-1 bg-amber-600/30 text-amber-300 rounded-full text-sm border border-amber-400/30">Teknik</span>
                  <span class="px-3 py-1 bg-amber-600/30 text-amber-300 rounded-full text-sm border border-amber-400/30">Jurnalistik</span>
                </div>
              </div>

              <router-link
                to="/daftar-pkl"
                class="block w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-amber-500/40"
              >
                Daftar PKL Sekarang
              </router-link>
            </div>
          </div>

          <!-- Kunjungan Card -->
          <div id="kunjungan" class="group relative bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 shadow-xl hover:shadow-emerald-500/30">
            <div class="absolute inset-0 bg-emerald-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-pulse">
                  🏛️
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Kunjungan Edukatif</h3>
                  <p class="text-emerald-300 font-medium">Study Tour & Field Trip</p>
                </div>
              </div>

              <p class="text-gray-300 mb-6 leading-relaxed">
                Jelajahi dunia broadcasting melalui kunjungan edukatif yang informatif dan menyenangkan untuk sekolah dan komunitas.
              </p>

              <div class="space-y-4 mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span class="text-gray-300">Durasi: 2 jam per kunjungan</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span class="text-gray-300">Minimal 10 peserta per grup</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span class="text-gray-300">Tour studio dan fasilitas</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span class="text-gray-300">Presentasi dari tim ahli</span>
                </div>
              </div>

              <div class="bg-gray-800/60 rounded-2xl p-4 mb-6 border border-gray-700 shadow-inner">
                <h4 class="font-semibold text-emerald-300 mb-2">Fasilitas Tour:</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-sm border border-emerald-400/30">Studio TV</span>
                  <span class="px-3 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-sm border border-emerald-400/30">Ruang Kontrol</span>
                  <span class="px-3 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-sm border border-emerald-400/30">Editing Room</span>
                  <span class="px-3 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-sm border border-emerald-400/30">Museum</span>
                </div>
              </div>

              <router-link
                to="/daftar-kunjungan"
                class="block w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-emerald-500/40"
              >
                Ajukan Kunjungan
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dokumen Section -->
<section id="dokumen" class="py-16 px-6 bg-gray-900/50">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4 text-amber-400">
        Persyaratan Dokumen
      </h2>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">
        Siapkan dokumen-dokumen berikut sebelum mendaftar
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Dokumen PKL -->
      <div class="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30 hover:border-amber-400/60 transition-all">
        <div class="text-4xl mb-4 text-amber-400">📄</div>
        <h3 class="text-xl font-bold mb-3">PKL (Siswa/Mahasiswa)</h3>
        <ul class="space-y-2 text-gray-300">
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Surat Pengantar dari Sekolah/Kampus</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>CV/Riwayat Pendidikan</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Fotokopi KTP/Kartu Pelajar</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Pas Foto 3x4 (Latar Merah)</span>
          </li>
        </ul>
      </div>

      <!-- Dokumen Kunjungan -->
      <div class="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 hover:border-emerald-400/60 transition-all">
        <div class="text-4xl mb-4 text-emerald-400">📑</div>
        <h3 class="text-xl font-bold mb-3">Kunjungan Edukatif</h3>
        <ul class="space-y-2 text-gray-300">
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Surat Permohonan Resmi</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Daftar Peserta (Min. 10 Orang)</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Fotokopi Identitas Pendamping</span>
          </li>
        </ul>
      </div>

      <!-- Contoh Dokumen -->
      <div class="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-sky-400/30 hover:border-sky-400/60 transition-all">
        <div class="text-4xl mb-4 text-sky-400">📝</div>
        <h3 class="text-xl font-bold mb-3">Contoh Dokumen</h3>
        <div class="space-y-3">
          <a href="#" class="flex items-center gap-2 text-sky-300 hover:text-sky-200 group">
            <svg class="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Contoh Surat Pengantar PKL</span>
          </a>
          <a href="#" class="flex items-center gap-2 text-sky-300 hover:text-sky-200 group">
            <svg class="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Template Daftar Peserta</span>
          </a>
          <a href="#" class="flex items-center gap-2 text-sky-300 hover:text-sky-200 group">
            <svg class="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Panduan Pengisian Formulir</span>
          </a>
        </div>
      </div>

      <!-- Upload Guidelines -->
      <div class="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-400/30 hover:border-rose-400/60 transition-all">
        <div class="text-4xl mb-4 text-rose-400">⚠️</div>
        <h3 class="text-xl font-bold mb-3">Panduan Upload</h3>
        <ul class="space-y-2 text-gray-300">
          <li class="flex items-start gap-2">
            <div class="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0">•</div>
            <span>Format file: PDF/JPG/PNG (max. 2MB)</span>
          </li>
          <li class="flex items-start gap-2">
            <div class="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0">•</div>
            <span>Nama file: NAMA_JENIS_DOKUMEN (contoh: ANDI_SURAT_PENGANTAR.pdf)</span>
          </li>
          <li class="flex items-start gap-2">
            <div class="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0">•</div>
            <span>Dokumen harus terbaca jelas</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Proses Pendaftaran Responsif - TVRI Yogyakarta -->
<section id="proses" class="py-12 px-4 sm:px-6 bg-gradient-to-b from-gray-800 to-gray-900">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-3">
        Proses Pendaftaran TVRI Yogyakarta
      </h2>
      <div class="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
    </div>

    <!-- Mobile Timeline (horizontal) -->
    <div class="md:hidden overflow-x-auto pb-6">
      <div class="flex w-[700px] min-w-full space-x-8 px-4">
        <!-- Step 1 -->
        <div class="flex-shrink-0 w-64 bg-gray-700 p-6 rounded-xl shadow-md border border-gray-600">
          <div class="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-blue-300 font-bold mb-4">1</div>
          <h3 class="text-lg font-semibold text-white mb-2">Isi Formulir Online</h3>
          <p class="text-gray-300 text-sm mb-3">Lengkapi data diri dan pilih program</p>
          <div class="text-xs text-blue-400">Waktu: ±15 menit</div>
        </div>
        
        <!-- Step 2 -->
        <div class="flex-shrink-0 w-64 bg-gray-700 p-6 rounded-xl shadow-md border border-gray-600">
          <div class="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center text-amber-300 font-bold mb-4">2</div>
          <h3 class="text-lg font-semibold text-white mb-2">Upload Dokumen</h3>
          <p class="text-gray-300 text-sm mb-3">Format: PDF/JPG (max. 2MB)</p>
          <div class="text-xs text-amber-400">Resolusi min. 300dpi</div>
        </div>
        
        <!-- Step 3 -->
        <div class="flex-shrink-0 w-64 bg-gray-700 p-6 rounded-xl shadow-md border border-gray-600">
          <div class="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center text-green-300 font-bold mb-4">3</div>
          <h3 class="text-lg font-semibold text-white mb-2">Verifikasi Admin</h3>
          <p class="text-gray-300 text-sm mb-3">Proses: 1-3 hari kerja</p>
          <div class="text-xs text-green-400">Cek email</div>
        </div>
        
        <!-- Step 4 -->
        <div class="flex-shrink-0 w-64 bg-gray-700 p-6 rounded-xl shadow-md border border-gray-600">
          <div class="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center text-purple-300 font-bold mb-4">4</div>
          <h3 class="text-lg font-semibold text-white mb-2">Keputusan</h3>
          <p class="text-gray-300 text-sm mb-3">Notifikasi real-time</p>
          <div class="text-xs text-purple-400">Unduh surat</div>
        </div>
      </div>
    </div>

    <!-- Desktop Timeline (vertical) -->
    <div class="hidden md:block relative">
      <!-- Timeline line -->
      <div class="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 via-amber-400 to-purple-400 transform -translate-x-1/2 z-0"></div>

      <div class="space-y-16">
        <!-- Step 1 -->
        <div class="relative flex justify-between items-center">
          <div class="w-5/12 bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-600 mr-6">
            <h3 class="text-xl font-bold text-blue-400 mb-3">Isi Formulir Online</h3>
            <p class="text-gray-300 mb-4">Lengkapi data diri secara lengkap dan pilih program</p>
            <div class="text-sm text-blue-400 font-medium">⏳ Waktu: ±15 menit</div>
          </div>
          
          <div class="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-800 border-4 border-blue-500 flex items-center justify-center text-blue-400 font-bold text-xl z-10 shadow-lg">
            1
          </div>
          
          <div class="w-5/12 bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-600 ml-6">
            <h4 class="text-lg font-semibold text-white mb-3">PERSYARATAN:</h4>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Scan KTP/Kartu Pelajar
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Surat pengantar institusi
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                CV terbaru (format PDF)
              </li>
            </ul>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="relative flex justify-between items-center">
          <div class="w-5/12 bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-600 mr-6">
            <h3 class="text-xl font-bold text-amber-400 mb-3">Upload Dokumen</h3>
            <p class="text-gray-300 mb-4">Unggah persyaratan dokumen sesuai ketentuan</p>
            <div class="text-sm text-amber-400 font-medium">📁 Format: PDF/JPG (max. 2MB)</div>
          </div>
          
          <div class="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-800 border-4 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-xl z-10 shadow-lg">
            2
          </div>
          
          <div class="w-5/12 bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-600 ml-6">
            <h4 class="text-lg font-semibold text-white mb-3">TIPS UPLOAD:</h4>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Gunakan resolusi minimal 300dpi
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Pastikan dokumen terbaca jelas
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Nama file sesuai jenis dokumen
              </li>
            </ul>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="relative flex justify-between items-center">
          <div class="w-5/12 bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-600 mr-6">
            <h3 class="text-xl font-bold text-green-400 mb-3">Verifikasi Admin</h3>
            <p class="text-gray-300 mb-4">Tim kami akan memverifikasi kelengkapan dokumen</p>
            <div class="text-sm text-green-400 font-medium">⏱️ Proses: 1-3 hari kerja</div>
          </div>
          
          <div class="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-800 border-4 border-green-500 flex items-center justify-center text-green-400 font-bold text-xl z-10 shadow-lg">
            3
          </div>
          
          <div class="w-5/12 bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-600 ml-6">
            <h4 class="text-lg font-semibold text-white mb-3">YANG DIPERIKSA:</h4>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Kelengkapan dokumen persyaratan
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Validitas dan keaslian dokumen
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Kesesuaian dengan program
              </li>
            </ul>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="relative flex justify-between items-center">
          <div class="w-5/12 bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-600 mr-6">
            <h3 class="text-xl font-bold text-purple-400 mb-3">Keputusan Penerimaan</h3>
            <p class="text-gray-300 mb-4">Hasil verifikasi via halaman cek status</p>
            <div class="text-sm text-purple-400 font-medium">🔔 Status update real-time</div>
          </div>
          
          <div class="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-800 border-4 border-purple-500 flex items-center justify-center text-purple-400 font-bold text-xl z-10 shadow-lg">
            4
          </div>
          
          <div class="w-5/12 bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-600 ml-6">
            <h4 class="text-lg font-semibold text-white mb-3">JIKA DITERIMA:</h4>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Unduh surat penerimaan
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Konfirmasi kehadiran
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Terima panduan peserta
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Divisi Section -->
<section id="divisi" class="py-16 px-6 bg-gray-900/50">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4 text-amber-400">
        Divisi PKL Tersedia
      </h2>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">
        Pilih divisi yang sesuai dengan minat dan kompetensi Anda
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Produksi (PROGRAM) -->
      <div class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30 hover:border-amber-400/60 transition-all hover:shadow-lg hover:shadow-amber-500/20">
        <div class="text-4xl mb-4 text-amber-400 group-hover:animate-bounce">🎬</div>
        <h3 class="text-xl font-bold mb-2">Program</h3>
        <p class="text-gray-400 mb-4">Berfokus pada produksi program televisi dalam dan luar studio yang membutuhkan keahlian broadcasting dan pengelolaan tayangan.</p>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-amber-900/40 text-amber-300 text-xs rounded-full">Produksi</span>
          <span class="px-2 py-1 bg-amber-900/40 text-amber-300 text-xs rounded-full">Broadcast</span>
          <span class="px-2 py-1 bg-amber-900/40 text-amber-300 text-xs rounded-full">Studio</span>
        </div>
      </div>

      <!-- Jurnalistik (BERITA) -->
      <div class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 hover:border-emerald-400/60 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
        <div class="text-4xl mb-4 text-emerald-400 group-hover:animate-bounce">📰</div>
        <h3 class="text-xl font-bold mb-2">Berita</h3>
        <p class="text-gray-400 mb-4">Produksi berita dalam dan luar studio yang membutuhkan pengalaman jurnalistik dan komunikasi yang baik.</p>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-emerald-900/40 text-emerald-300 text-xs rounded-full">Jurnalistik</span>
          <span class="px-2 py-1 bg-emerald-900/40 text-emerald-300 text-xs rounded-full">Newsroom</span>
          <span class="px-2 py-1 bg-emerald-900/40 text-emerald-300 text-xs rounded-full">Peliputan</span>
        </div>
      </div>

      <!-- Teknik -->
      <div class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-sky-400/30 hover:border-sky-400/60 transition-all hover:shadow-lg hover:shadow-sky-500/20">
        <div class="text-4xl mb-4 text-sky-400 group-hover:animate-bounce">📡</div>
        <h3 class="text-xl font-bold mb-2">Teknik</h3>
        <p class="text-gray-400 mb-4">Fokus pada operasional produksi studio serta editing video dan pengetahuan teknis broadcasting.</p>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-sky-900/40 text-sky-300 text-xs rounded-full">Transmisi</span>
          <span class="px-2 py-1 bg-sky-900/40 text-sky-300 text-xs rounded-full">MCR</span>
          <span class="px-2 py-1 bg-sky-900/40 text-sky-300 text-xs rounded-full">Editing</span>
        </div>
      </div>

      <!-- Digital Media (KONTEN MEDIA BARU) -->
      <div class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 hover:border-purple-400/60 transition-all hover:shadow-lg hover:shadow-purple-500/20">
        <div class="text-4xl mb-4 text-purple-400 group-hover:animate-bounce">💻</div>
        <h3 class="text-xl font-bold mb-2">Konten Media Baru</h3>
        <p class="text-gray-400 mb-4">Pengelolaan konten di media sosial dan produksi luar studio sesuai dengan SOP yang berlaku.</p>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-full">Instagram</span>
          <span class="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-full">YouTube</span>
          <span class="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-full">Website</span>
        </div>
      </div>

      <!-- Tata Artistik (Pindah ke PROMO) -->
      <div class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30 hover:border-red-400/60 transition-all hover:shadow-lg hover:shadow-red-500/20">
        <div class="text-4xl mb-4 text-red-400 group-hover:animate-bounce">🎨</div>
        <h3 class="text-xl font-bold mb-2">Promo</h3>
        <p class="text-gray-400 mb-4">Pengelolaan promosi konten TV melalui siaran maupun media sosial TVRI Yogyakarta.</p>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-red-900/40 text-red-300 text-xs rounded-full">Promosi</span>
          <span class="px-2 py-1 bg-red-900/40 text-red-300 text-xs rounded-full">Konten</span>
          <span class="px-2 py-1 bg-red-900/40 text-red-300 text-xs rounded-full">Media Sosial</span>
        </div>
      </div>

      <!-- Keuangan -->
      <div class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30 hover:border-green-400/60 transition-all hover:shadow-lg hover:shadow-green-500/20">
        <div class="text-4xl mb-4 text-green-400 group-hover:animate-bounce">💰</div>
        <h3 class="text-xl font-bold mb-2">Keuangan</h3>
        <p class="text-gray-400 mb-4">Mengelola anggaran, pelaporan, arsip dokumen penting, dan aplikasi keuangan lembaga.</p>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-green-900/40 text-green-300 text-xs rounded-full">Anggaran</span>
          <span class="px-2 py-1 bg-green-900/40 text-green-300 text-xs rounded-full">Laporan</span>
          <span class="px-2 py-1 bg-green-900/40 text-green-300 text-xs rounded-full">Kearsipan</span>
        </div>
      </div>

      <!-- SDM (UMUM) -->
      <div class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/60 transition-all hover:shadow-lg hover:shadow-yellow-500/20">
        <div class="text-4xl mb-4 text-yellow-400 group-hover:animate-bounce">👥</div>
        <h3 class="text-xl font-bold mb-2">Umum</h3>
        <p class="text-gray-400 mb-4">Unit SDM & BMN, melayani administrasi kepegawaian, IT, dan pengelolaan barang milik negara.</p>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-yellow-900/40 text-yellow-300 text-xs rounded-full">Kepegawaian</span>
          <span class="px-2 py-1 bg-yellow-900/40 text-yellow-300 text-xs rounded-full">Aplikasi</span>
          <span class="px-2 py-1 bg-yellow-900/40 text-yellow-300 text-xs rounded-full">IT</span>
        </div>
      </div>

      <!-- Sekretariat (PENGEMBANGAN USAHA) -->
      <div class="group bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-teal-400/30 hover:border-teal-400/60 transition-all hover:shadow-lg hover:shadow-teal-500/20">
        <div class="text-4xl mb-4 text-teal-400 group-hover:animate-bounce">📝</div>
        <h3 class="text-xl font-bold mb-2">Pengembangan Usaha</h3>
        <p class="text-gray-400 mb-4">Mengelola kerjasama siaran & non-siaran, baik dari klien pemerintah maupun non-pemerintah.</p>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-teal-900/40 text-teal-300 text-xs rounded-full">Kerjasama</span>
          <span class="px-2 py-1 bg-teal-900/40 text-teal-300 text-xs rounded-full">Usaha</span>
          <span class="px-2 py-1 bg-teal-900/40 text-teal-300 text-xs rounded-full">Relasi</span>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- Gallery Section -->
<section id="gallery" class="py-16 px-6 bg-gray-950">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4 text-rose-400">
        Gallery Kegiatan
      </h2>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">
        Dokumentasi kegiatan PKL dan kunjungan sebelumnya
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Item 1 - PKL 1 -->
      <div class="group relative aspect-square overflow-hidden rounded-xl hover:rounded-none transition-all duration-300">
        <img :src="require('@/assets/pkl01.jpg')" alt="PKL 1" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 class="font-bold text-white">Sesi Pelatihan Kamera</h3>
            <p class="text-gray-300 text-sm">Angkatan PKL 2024</p>
          </div>
        </div>
      </div>
      
      <!-- Item 2 - Kunjungan 1 -->
      <div class="group relative aspect-square overflow-hidden rounded-xl hover:rounded-none transition-all duration-300">
        <img :src="require('@/assets/kunjungan1.jpg')" alt="Kunjungan 1" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 class="font-bold text-white">Tour Studio TV</h3>
            <p class="text-gray-300 text-sm">SMKN 1 Yogyakarta</p>
          </div>
        </div>
      </div>
      
      <!-- Item 3 - PKL 2 -->
      <div class="group relative aspect-square overflow-hidden rounded-xl hover:rounded-none transition-all duration-300">
        <img :src="require('@/assets/pkl2.jpg')" alt="PKL 2" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 class="font-bold text-white">Praktik Live Reporting</h3>
            <p class="text-gray-300 text-sm">PKL Jurnalistik</p>
          </div>
        </div>
      </div>
      
      <!-- Item 4 - Kunjungan 2 -->
      <div class="group relative aspect-square overflow-hidden rounded-xl hover:rounded-none transition-all duration-300">
        <img :src="require('@/assets/kunjungan2.jpg')" alt="Kunjungan 2" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 class="font-bold text-white">Demo Peralatan</h3>
            <p class="text-gray-300 text-sm">Siswa SMP</p>
          </div>
        </div>
      </div>
      
      <!-- Video Preview -->
      <div class="group relative aspect-square overflow-hidden rounded-xl hover:rounded-none transition-all duration-300 col-span-2">
        <img :src="require('@/assets/video-thumbnail.jpg')" alt="Video Testimoni" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 group-hover:opacity-80 transition-opacity duration-300">
          <div class="w-16 h-16 bg-rose-500/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <div class="absolute inset-0 flex items-end p-4">
          <div>
            <h3 class="font-bold text-white">Testimoni Peserta PKL</h3>
            <p class="text-gray-300 text-sm">Tonton pengalaman mereka</p>
          </div>
        </div>
      </div>
      
      <!-- Item 5 - PKL 3 -->
      <div class="group relative aspect-square overflow-hidden rounded-xl hover:rounded-none transition-all duration-300">
        <img :src="require('@/assets/pkl3.jpg')" alt="PKL 3" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 class="font-bold text-white">Editing Video</h3>
            <p class="text-gray-300 text-sm">Workshop Post-Produksi</p>
          </div>
        </div>
      </div>
      
      <!-- Item 6 - Kunjungan 3 -->
      <div class="group relative aspect-square overflow-hidden rounded-xl hover:rounded-none transition-all duration-300">
        <img :src="require('@/assets/kunjungan3.jpg')" alt="Kunjungan 3" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 class="font-bold text-white">Sesi Tanya Jawab</h3>
            <p class="text-gray-300 text-sm">Dengan Tim Produksi</p>
          </div>
        </div>
      </div>
      
      <!-- Item 7 - PKL 4 -->
      <div class="group relative aspect-square overflow-hidden rounded-xl hover:rounded-none transition-all duration-300">
        <img :src="require('@/assets/pkl5.jpg')" alt="PKL 4" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 class="font-bold text-white">Penyerahan Sertifikat</h3>
            <p class="text-gray-300 text-sm">Wisuda PKL 2024</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <button class="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-medium rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-rose-500/30 flex items-center gap-2 mx-auto">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        Lihat Lebih Banyak Foto
      </button>
    </div>
  </div>
</section>

    <!-- Why Choose Us Section -->
    <section id="program" class="py-20 px-6 bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6">
            <span class="text-amber-400">
              Mengapa Memilih Kami?
            </span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            TVRI Yogyakarta telah dipercaya sebagai tempat pembelajaran terbaik di industri broadcasting
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-amber-400/60 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-2 shadow-lg hover:shadow-amber-500/20"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-300 leading-relaxed">{{ feature.description }}</p>
            
            <div class="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>

   <!-- Testimonial Section -->
<section id="testimoni" class="py-28 px-6 bg-gray-800 relative overflow-hidden">
  <!-- Floating decorative elements -->
  <div class="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
  <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
  
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="text-center mb-16">
      <h2 class="text-4xl lg:text-6xl font-bold mb-6">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
          Apa Kata Mereka?
        </span>
      </h2>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">
        Pengalaman nyata dari peserta yang telah merasakan program kami
      </p>
    </div>

    <!-- Modern Testimonial Carousel -->
    <div class="relative">
      <!-- Testimonial Cards Container -->
      <div class="relative h-[500px] md:h-[400px] w-full overflow-hidden rounded-3xl">
        <!-- Testimonial Cards -->
        <div 
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :class="[
            'absolute inset-0 transition-all duration-700 ease-in-out transform',
            currentSlide === index ? 'opacity-100 translate-x-0' : 
            (index > currentSlide ? 'opacity-0 translate-x-full' : 'opacity-0 -translate-x-full')
          ]"
        >
          <div :class="`relative h-full w-full bg-gradient-to-br from-gray-800/60 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-${testimonial.color}-400/30 overflow-hidden`">
            <!-- Floating avatar -->
            <div :class="`absolute -top-8 -left-8 w-32 h-32 bg-${testimonial.color}-500/20 rounded-full z-0`"></div>
            
            <!-- Content -->
            <div class="relative z-10 h-full flex flex-col">
              <!-- Header with rating -->
              <div class="flex items-start gap-6 mb-6">
                <div :class="`w-20 h-20 bg-${testimonial.color}-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg`">
                  {{ testimonial.initials }}
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">{{ testimonial.name }}</h3>
                  <p :class="`text-${testimonial.color}-300 text-sm`">{{ testimonial.role }}</p>
                  <div class="flex mt-2">
                    <span v-for="i in 5" :key="i" class="text-xl">
                      <span :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-500'">★</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Testimonial text with animated quote marks -->
              <div class="relative flex-1">
                <span class="absolute -left-2 -top-4 text-7xl text-amber-400/10 font-serif">"</span>
                <p class="text-gray-300 mb-6 leading-relaxed text-lg italic relative pl-8 z-10">
                  {{ testimonial.content }}
                </p>
                <span class="absolute bottom-0 right-0 text-7xl text-amber-400/10 font-serif">"</span>
              </div>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mt-4">
                <span 
                  v-for="(tag, tagIndex) in testimonial.tags" 
                  :key="tagIndex"
                  :class="`px-3 py-1.5 bg-${testimonial.color}-600/30 text-${testimonial.color}-300 rounded-full text-sm border border-${testimonial.color}-400/30`"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation Arrows -->
      <button 
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-900/80 hover:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-900/80 hover:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Indicators -->
      <div class="flex justify-center gap-2 mt-8">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-3 h-3 rounded-full transition-all duration-300',
            currentSlide === index ? `bg-${testimonial.color}-400 w-6` : 'bg-gray-500'
          ]"
        ></button>
      </div>
    </div>

    <!-- Video Testimonials CTA -->
    <div class="mt-16 text-center">
      <div class="inline-block relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
      </div>
    </div>
  </div>
</section>

    <!-- Footer -->
<footer class="py-16 px-6 border-t border-gray-800 bg-gray-900/90 backdrop-blur-sm">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
      <!-- Logo & Description -->
      <div class="col-span-1 md:col-span-2">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
            <span class="text-white font-bold text-lg">TV</span>
          </div>
          <span class="text-2xl font-bold text-amber-400">TVRI Yogyakarta</span>
        </div>
        <p class="text-gray-400 max-w-md mb-6">
          Stasiun televisi publik yang berkomitmen pada pendidikan dan pengembangan sumber daya manusia di bidang broadcasting dan media.
        </p>
        
        <!-- Social Media -->
        <div class="flex items-center gap-4">
          <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors duration-300 group">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors duration-300 group">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors duration-300 group">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300 group">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Program Links -->
      <div>
        <h3 class="font-semibold text-white mb-4 text-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          Program
        </h3>
        <div class="space-y-3 text-gray-400">
          <a href="#" class="block hover:text-amber-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            PKL Broadcasting
          </a>
          <a href="#" class="block hover:text-emerald-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Kunjungan Edukatif
          </a>
          <a href="#" class="block hover:text-rose-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Workshop
          </a>
          <a href="#" class="block hover:text-sky-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Pelatihan
          </a>
        </div>
      </div>
      
      <!-- Quick Links -->
      <div>
        <h3 class="font-semibold text-white mb-4 text-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
          </svg>
          Links
        </h3>
        <div class="space-y-3 text-gray-400">
          <a href="#" class="block hover:text-amber-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Tentang Kami
          </a>
          <a href="#" class="block hover:text-emerald-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Berita
          </a>
          <router-link to="/cek-status" class="block hover:text-rose-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Cek Status
          </router-link>
          <a href="#kontak" class="block hover:text-sky-300 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Kontak
          </a>
        </div>
      </div>
      
      <!-- Contact Info -->
      <div>
        <h3 class="font-semibold text-white mb-4 text-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          Kontak
        </h3>
        <div class="space-y-3 text-gray-400">
          <div class="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span>Jl. Magelang KM 4, Sinduadi, Mlati, Sleman, Yogyakarta 55284</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>(0274) 868844</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>tvri.yogyakarta@tvri.go.id</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Copyright & Additional Links -->
    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-500 text-sm mb-4 md:mb-0">
        &copy; 2025 TVRI Yogyakarta - Divisi New Media. All rights reserved.
      </p>
      <div class="flex gap-6">
        <a href="#" class="text-gray-500 hover:text-amber-400 text-sm transition-colors">Privacy Policy</a>
        <a href="#" class="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
        <a href="#" class="text-gray-500 hover:text-sky-400 text-sm transition-colors">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
  </div>
</template>

<script>
export default {
  name: 'ModernTVRILanding',
  data() {
    return {
      stats: {
        students: 500,
        visits: 150,
        years: 25
      },
      images: [
        require('@/assets/foto.jpg'),
        require('@/assets/kunjungan3.jpeg'),
        require('@/assets/pkl1.jpg'),
        require('@/assets/pkl2.jpg')
      ],
      currentImageIndex: 0,
      currentSlide: 0,
      testimonials: [
        {
          initials: "AS",
          name: "Andi Setiawan",
          role: "Peserta PKL 2024",
          rating: 5,
          content: "Pengalaman PKL di TVRI Yogya sangat berkesan! Saya belajar banyak tentang produksi berita langsung dari praktisi berpengalaman. Fasilitasnya lengkap dan mentor sangat membantu.",
          tags: ["Produksi", "Jurnalistik"],
          color: "amber"
        },
        {
          initials: "SD",
          name: "Siti Dewi",
          role: "Guru Pendamping",
          rating: 5,
          content: "Kunjungan edukatif ke TVRI memberikan wawasan baru bagi siswa kami tentang dunia broadcasting. Tim sangat ramah dan penjelasannya mudah dipahami. Sangat direkomendasikan untuk sekolah!",
          tags: ["Study Tour", "Edukasi"],
          color: "emerald"
        },
        {
          initials: "RF",
          name: "Rizal Fahmi",
          role: "Mahasiswa Broadcasting",
          rating: 4,
          content: "PKL di TVRI Yogya melengkapi teori yang saya dapat di kampus dengan praktik langsung. Saya bahkan berkesempatan ikut produksi siaran langsung. Pengalaman yang sangat berharga!",
          tags: ["Teknik", "Live Production"],
          color: "rose"
        },
        {
          initials: "DA",
          name: "Dian Ayu",
          role: "Siswa SMK",
          rating: 5,
          content: "Program PKL di TVRI Yogya sangat profesional. Saya mendapatkan pengalaman nyata dalam produksi televisi dan jaringan profesional yang bermanfaat untuk karir saya kedepannya.",
          tags: ["Editing", "Post Production"],
          color: "sky"
        }
      ],
      features: [
        {
          icon: '🎥',
          title: 'Studio Modern',
          description: 'Fasilitas studio dengan teknologi broadcasting terdepan dan peralatan profesional untuk pengalaman belajar optimal.'
        },
        {
          icon: '👨‍🏫',
          title: 'Mentor Berpengalaman',
          description: 'Dibimbing langsung oleh profesional media berpengalaman dengan track record di industri broadcasting nasional.'
        },
        {
          icon: '📜',
          title: 'Sertifikat Resmi',
          description: 'Dapatkan sertifikat resmi dari TVRI yang diakui industri dan dapat mendukung pengembangan karir Anda.'
        },
        {
          icon: '🌐',
          title: 'Network Luas',
          description: 'Bangun jaringan profesional dengan sesama peserta dan praktisi media dari berbagai latar belakang.'
        },
        {
          icon: '🎓',
          title: 'Kurikulum Lengkap',
          description: 'Program pembelajaran komprehensif yang mencakup teori dan praktik langsung di lapangan.'
        },
        {
          icon: '💼',
          title: 'Peluang Karir',
          description: 'Kesempatan untuk berkarir di TVRI atau jaringan mitra setelah menyelesaikan program dengan baik.'
        }
      ]
    };
  },
  
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    }
  },
  mounted() {
    // Auto-rotate images
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 4000);

    // Animate stats counter
    this.animateStats();
  },
  
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    animateStats() {
      const counters = [
        { key: 'students', target: 500, current: 0 },
        { key: 'visits', target: 150, current: 0 },
        { key: 'years', target: 25, current: 0 }
      ];

      counters.forEach(counter => {
        const increment = counter.target / 100;
        const timer = setInterval(() => {
          counter.current += increment;
          if (counter.current >= counter.target) {
            counter.current = counter.target;
            clearInterval(timer);
          }
          this.stats[counter.key] = Math.floor(counter.current);
        }, 20);
      });
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    }
  }
};
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Hover effects */
.hover-lift {
  transition: all 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* Responsive design enhancements */
@media (max-width: 768px) {
  .text-7xl {
    font-size: 3rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
}
</style>