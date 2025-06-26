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
                  <span class="text-gray-300">Durasi: 1-3 bulan (fleksibel)</span>
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
                  <span class="text-gray-300">Durasi: 2-4 jam per kunjungan</span>
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
<section id="testimoni" class="py-20 px-6 bg-gray-800 relative">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl lg:text-5xl font-bold mb-6">
        <span class="text-amber-400">
          Apa Kata Mereka?
        </span>
      </h2>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">
        Pengalaman peserta PKL dan kunjungan edukatif di TVRI Yogyakarta
      </p>
    </div>

    <!-- Testimonial Slider Container -->
    <div class="relative overflow-hidden">
      <!-- Slider Track -->
      <div class="flex transition-transform duration-500 ease-in-out" 
           :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <!-- Testimonial 1 -->
        <div class="w-full flex-shrink-0 px-4">
          <div class="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30 hover:border-amber-400/60 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 shadow-lg hover:shadow-amber-500/20">
            <div class="absolute -top-4 -left-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-xl shadow-lg">
              <span class="text-white font-bold">AS</span>
            </div>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">Andi Setiawan</h3>
                <p class="text-amber-300 text-sm">Peserta PKL 2024</p>
              </div>
              <div class="text-yellow-400 text-2xl">★★★★★</div>
            </div>
            <p class="text-gray-300 italic mb-4">
              "Pengalaman PKL di TVRI Yogya sangat berkesan! Saya belajar banyak tentang produksi berita langsung dari praktisi berpengalaman. Fasilitasnya lengkap dan mentor sangat membantu."
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-amber-600/30 text-amber-300 rounded-full text-xs border border-amber-400/30">Produksi</span>
              <span class="px-2 py-1 bg-amber-600/30 text-amber-300 rounded-full text-xs border border-amber-400/30">Jurnalistik</span>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="w-full flex-shrink-0 px-4">
          <div class="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 shadow-lg hover:shadow-emerald-500/20">
            <div class="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl shadow-lg">
              <span class="text-white font-bold">SD</span>
            </div>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">Siti Dewi</h3>
                <p class="text-emerald-300 text-sm">Guru Pendamping</p>
              </div>
              <div class="text-yellow-400 text-2xl">★★★★★</div>
            </div>
            <p class="text-gray-300 italic mb-4">
              "Kunjungan edukatif ke TVRI memberikan wawasan baru bagi siswa kami tentang dunia broadcasting. Tim sangat ramah dan penjelasannya mudah dipahami. Sangat direkomendasikan untuk sekolah!"
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-xs border border-emerald-400/30">Study Tour</span>
              <span class="px-2 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-xs border border-emerald-400/30">Edukasi</span>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="w-full flex-shrink-0 px-4">
          <div class="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-400/30 hover:border-rose-400/60 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 shadow-lg hover:shadow-rose-500/20">
            <div class="absolute -top-4 -left-4 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-xl shadow-lg">
              <span class="text-white font-bold">RF</span>
            </div>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">Rizal Fahmi</h3>
                <p class="text-rose-300 text-sm">Mahasiswa Broadcasting</p>
              </div>
              <div class="text-yellow-400 text-2xl">★★★★☆</div>
            </div>
            <p class="text-gray-300 italic mb-4">
              "PKL di TVRI Yogya melengkapi teori yang saya dapat di kampus dengan praktik langsung. Saya bahkan berkesempatan ikut produksi siaran langsung. Pengalaman yang sangat berharga!"
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-rose-600/30 text-rose-300 rounded-full text-xs border border-rose-400/30">Teknik</span>
              <span class="px-2 py-1 bg-rose-600/30 text-rose-300 rounded-full text-xs border border-rose-400/30">Live Production</span>
            </div>
          </div>
        </div>

        <!-- Testimonial 4 -->
        <div class="w-full flex-shrink-0 px-4">
          <div class="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-sky-400/30 hover:border-sky-400/60 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 shadow-lg hover:shadow-sky-500/20">
            <div class="absolute -top-4 -left-4 w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-xl shadow-lg">
              <span class="text-white font-bold">DA</span>
            </div>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">Dian Ayu</h3>
                <p class="text-sky-300 text-sm">Siswa SMK</p>
              </div>
              <div class="text-yellow-400 text-2xl">★★★★★</div>
            </div>
            <p class="text-gray-300 italic mb-4">
              "Program PKL di TVRI Yogya sangat profesional. Saya mendapatkan pengalaman nyata dalam produksi televisi dan jaringan profesional yang bermanfaat untuk karir saya kedepannya."
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-sky-600/30 text-sky-300 rounded-full text-xs border border-sky-400/30">Editing</span>
              <span class="px-2 py-1 bg-sky-600/30 text-sky-300 rounded-full text-xs border border-sky-400/30">Post Production</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slider Controls -->
    <div class="flex justify-center items-center mt-8 gap-4">
      <button 
        @click="prevSlide"
        class="w-12 h-12 rounded-full bg-gray-700 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-amber-500/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Slider Indicators -->
      <div class="flex gap-2">
        <button
          v-for="(_, index) in testimonials"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-3 h-3 rounded-full transition-all duration-300',
            currentSlide === index ? 'bg-amber-400 w-6' : 'bg-gray-500'
          ]"
        ></button>
      </div>
      
      <button 
        @click="nextSlide"
        class="w-12 h-12 rounded-full bg-gray-700 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-amber-500/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
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